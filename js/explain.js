// Turns C# error messages into pupil-friendly explanations.
// Explain.error({ kind, message, line }, code, ctx) -> { title, what, fixes: [html], example?: {before, after} }
// ctx.checking = true when the error happened during Check (affects the advice about input).
(function (root) {
  "use strict";

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const c = (s) => `<code>${esc(s)}</code>`;

  const KNOWN = ["Console", "Convert", "Math", "Random", "List", "File", "String", "DateTime", "Main", "WriteLine", "Write", "ReadLine", "Parse", "TryParse", "Length", "Count", "Add", "ToUpper", "ToLower", "Substring", "Contains"];
  const KEYWORDS = new Set("abstract as base bool break case catch char class const continue decimal default do double else enum false finally float for foreach if in int interface is long namespace new null object out override private protected public ref return static string switch this throw true try using var virtual void while get set value".split(" "));

  function lev(a, b) {
    a = a.toLowerCase(); b = b.toLowerCase();
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  // Names the pupil declared or used in their own code, so we can suggest the one they probably meant.
  function namesIn(code) {
    const set = new Set();
    const noStrings = (code || "").replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/\/\/.*$/gm, "");
    for (const m of noStrings.matchAll(/\b[A-Za-z_]\w*\b/g)) if (!KEYWORDS.has(m[0])) set.add(m[0]);
    KNOWN.forEach((k) => set.add(k));
    return [...set];
  }
  function closest(name, code) {
    let best = null, score = 99;
    for (const n of namesIn(code)) {
      if (n === name) continue;
      const d = lev(n, name);
      if (d < score && d <= Math.max(1, Math.floor(name.length / 3))) { best = n; score = d; }
    }
    return best;
  }
  function lineOf(code, n) { return n ? ((code || "").split("\n")[n - 1] || "") : ""; }

  // ---------- compile errors ----------
  const COMPILE = [
    [/^; expected/, (m, e, code) => ({
      title: "Missing semicolon",
      what: `Every C# statement must end with a semicolon ${c(";")}, like a full stop at the end of a sentence. C# reached the end of a statement on line ${e.line} and didn't find one.`,
      fixes: [`Look at the end of line ${e.line} and add ${c(";")} after the last bracket or value.`, "If that line already has one, check the line just above it. C# often notices a missing semicolon one line late.", `Lines that start a block, like ${c("if (...)")}, ${c("for (...)")} or ${c("class Program")}, do <strong>not</strong> get a semicolon.`],
      example: { before: 'Console.WriteLine("Hello")', after: 'Console.WriteLine("Hello");' },
    })],
    [/^\) expected/, (m, e) => ({
      title: "Missing closing bracket )",
      what: `Every opening bracket ${c("(")} needs a closing bracket ${c(")")}. On line ${e.line}, C# was still waiting for one.`,
      fixes: [`Count the ${c("(")} and ${c(")")} on line ${e.line}. They should be equal.`, `In an ${c("if")} or loop, the closing ${c(")")} goes straight after the condition, before the ${c("{")}.`, `Check text in quotes is closed too: a missing ${c('"')} can swallow the bracket.`],
      example: { before: "if (score > 50 {", after: "if (score > 50) {" },
    })],
    [/^\} expected/, (m, e) => ({
      title: "Missing closing curly bracket }",
      what: `Every ${c("{")} needs a matching ${c("}")}. C# reached the end of your code (around line ${e.line}) and some blocks were never closed.`,
      fixes: [`Count your ${c("{")} and ${c("}")}. A program with a class and a ${c("Main")} method needs at least two ${c("}")} at the very end.`, `Neat indenting helps: each ${c("}")} should line up under the line that opened its block.`, "If you added an if or a loop, make sure you closed its block before carrying on."],
    })],
    [/extra \}|end-of-file expected/, (m, e) => ({
      title: "One } too many",
      what: `There's a closing curly bracket ${c("}")} on line ${e.line} that doesn't match any opening ${c("{")}. It ends a block too early.`,
      fixes: [`Delete the extra ${c("}")} on line ${e.line}, or find the block above that is missing its ${c("{")}.`, `Check you didn't close ${c("Main")} before your last few lines of code.`],
    })],
    [/Newline in constant/, (m, e) => ({
      title: "Text that isn't closed",
      what: `Text (a string) must start and end with double quotes ${c('"')}. On line ${e.line} the text starts but never finishes, so C# thinks the rest of the line is text.`,
      fixes: [`Add the closing ${c('"')} at the end of the text on line ${e.line}, before the ${c(")")}.`, `To show a quote mark inside text, write ${c('\\"')}.`],
      example: { before: 'Console.WriteLine("Hello);', after: 'Console.WriteLine("Hello");' },
    })],
    [/The name '(\w+)' does not exist in the current context/, (m, e, code) => {
      const name = m[1];
      const near = closest(name, code);
      const caseOnly = near && near.toLowerCase() === name.toLowerCase();
      const fixes = [];
      if (near) fixes.push(caseOnly ? `C# is <strong>case sensitive</strong>: ${c(name)} and ${c(near)} are different. Change it to ${c(near)}.` : `Did you mean ${c(near)}? Check the spelling on line ${e.line}.`);
      fixes.push(`If ${c(name)} is a variable, declare it before you use it, with its type: ${c(`int ${name} = 0;`)}`);
      fixes.push(`If you declared it inside other curly brackets (an if, a loop or another method), it only exists in there. Move the declaration higher up.`);
      const quoteFix = `If you meant it as text to print, put it in double quotes: ${c(`"${name}"`)}`;
      if (new RegExp("Write(Line)?\\s*\\([^\"]*\\b" + name + "\\b").test(lineOf(code, e.line)) && !near) fixes.unshift(quoteFix);
      else if (/^[A-Z]?[a-z]+$/.test(name) && !near) fixes.push(quoteFix);
      return {
        title: `C# doesn't know what '${name}' is`,
        what: `On line ${e.line} you used ${c(name)}, but nothing with that exact name exists at that point in your program.`,
        fixes,
      };
    }],
    [/does not contain a definition for '(\w+)'(?:\. Did you mean '(\w+)'\?)?/, (m, e) => ({
      title: `'${m[1]}' isn't a real command here`,
      what: `On line ${e.line}, ${c(m[1])} isn't something this object or class can do. It's usually a spelling or capital-letter slip.`,
      fixes: [m[2] ? `Change ${c(m[1])} to ${c(m[2])}.` : "Check the spelling and capital letters against the lesson's example.", `C# is case sensitive: ${c("WriteLine")} works, ${c("Writeline")} doesn't.`],
    })],
    [/Cannot implicitly convert type 'string' to '(int|double|decimal|long|float)'/, (m, e) => ({
      title: "Text can't go straight into a number variable",
      what: `On line ${e.line} you're putting text (a ${c("string")}) into a ${c(m[1])} variable. ${c("Console.ReadLine()")} always gives you text, even if the user types digits, so it has to be converted first.`,
      fixes: [`Wrap the text in a conversion: ${c(m[1] === "int" ? "int.Parse(...)" : m[1] + ".Parse(...)")} or ${c(m[1] === "int" ? "Convert.ToInt32(...)" : m[1] === "double" ? "Convert.ToDouble(...)" : "Convert.ToDecimal(...)")}.`, "Or store it in a string variable first, then convert that variable."],
      example: (() => {
        const ln = lineOf(code, e.line).trim();
        const mm = ln.match(/^(?:\w+\s+)?(\w+)\s*=\s*(Console\.ReadLine\(\)|[\w.]+)\s*;\s*$/);
        if (mm) return { before: ln, after: ln.replace(mm[2], `${m[1]}.Parse(${mm[2]})`) };
        return { before: `${m[1]} age = Console.ReadLine();`, after: `${m[1]} age = ${m[1]}.Parse(Console.ReadLine());` };
      })(),
    })],
    [/Cannot implicitly convert type 'double' to '(int|long)'/, (m, e) => ({
      title: "A decimal number won't fit in a whole-number variable",
      what: `On line ${e.line}, the value has a decimal part (it's a ${c("double")}), but the variable is an ${c(m[1])}, which can only hold whole numbers. C# won't throw away the decimal part without being told.`,
      fixes: [`If you need the decimal part, make the variable a ${c("double")}.`, `If you really want a whole number, cast it: ${c("(int)value")} (this chops off the decimals) or use ${c("(int)Math.Round(value)")}.`],
      example: { before: "int average = total / 3.0;", after: "double average = total / 3.0;" },
    })],
    [/Cannot implicitly convert type '(\w+)' to 'string'/, (m, e) => ({
      title: "That value isn't text",
      what: `On line ${e.line} you're putting a ${c(m[1])} into a ${c("string")} variable.`,
      fixes: [`If it's meant to be text, put it in double quotes: ${c('"5"')}.`, `To turn a value into text, use ${c(".ToString()")} or string interpolation ${c('$"{value}"')}.`],
    })],
    [/Cannot implicitly convert type '(\w+)' to 'bool'/, (m, e, code) => {
      const ln = lineOf(code, e.line);
      const single = /\bif\s*\([^=!<>]*[^=!<>]=[^=]/.test(ln) || /\bwhile\s*\([^=!<>]*[^=!<>]=[^=]/.test(ln);
      return {
        title: single ? "Use == to compare, not =" : "A condition must be true or false",
        what: single ? `On line ${e.line}, a single ${c("=")} <em>stores</em> a value. To <em>compare</em> two values in a condition you need a double ${c("==")}.` : `Conditions in ${c("if")} and loops must give ${c("true")} or ${c("false")}. On line ${e.line} the condition gives a ${c(m[1])} instead.`,
        fixes: single ? [`Change ${c("=")} to ${c("==")} inside the brackets on line ${e.line}.`] : [`Compare the value with something, for example ${c("score > 50")} or ${c('answer == "yes"')}.`],
        example: single ? { before: "if (guess = target)", after: "if (guess == target)" } : undefined,
      };
    }],
    [/Cannot implicitly convert type '(\w+)' to '(\w+)'/, (m, e) => ({
      title: "Those types don't match",
      what: `On line ${e.line} you're storing a ${c(m[1])} in a variable (or returning it from a method) that is meant to hold a ${c(m[2])}.`,
      fixes: [`Change the variable's type to ${c(m[1])}, or convert the value to ${c(m[2])}.`, "Check you're using the variable you meant to."],
    })],
    [/method group/, (m, e) => ({
      title: "Missing brackets after a method",
      what: `On line ${e.line} you named a method but didn't run it. Methods need brackets ${c("()")} after their name to run, even when nothing goes inside.`,
      fixes: [`Add ${c("()")} after the method name.`],
      example: { before: "string name = Console.ReadLine;", after: "string name = Console.ReadLine();" },
    })],
    [/Non-invocable member '[\w.]+' cannot be used like a method/, (m, e) => ({
      title: "Remove the brackets",
      what: `On line ${e.line} you put ${c("()")} after something that is a property, not a method. Properties like ${c("Length")} and ${c("Count")} don't take brackets.`,
      fixes: [`Delete the ${c("()")}.`],
      example: { before: "int n = name.Length();", after: "int n = name.Length;" },
    })],
    [/named '(\w+)' is already defined in this scope/, (m, e) => ({
      title: `'${m[1]}' is declared twice`,
      what: `You can only create (declare) a variable once. On line ${e.line} you wrote a type in front of ${c(m[1])} again, which tries to make a second variable with the same name.`,
      fixes: [`To change the existing variable, leave the type off: write ${c(`${m[1]} = ...;`)} instead of ${c(`int ${m[1]} = ...;`)}.`, "If you really need two different variables, give the new one a different name."],
    })],
    [/Use of unassigned local variable '(\w+)'/, (m, e) => ({
      title: `'${m[1]}' has no value yet`,
      what: `On line ${e.line} you use ${c(m[1])} before it has been given a value. C# won't guess a starting value for a local variable.`,
      fixes: [`Give it a starting value where you declare it, e.g. ${c(`int ${m[1]} = 0;`)} or ${c(`string ${m[1]} = "";`)}.`, "Running totals and counters almost always start at 0."],
    })],
    [/left-hand side of an assignment/, (m, e) => ({
      title: "You can't change that",
      what: `On line ${e.line} you try to store a value in something that can't be changed: usually a ${c("const")} (constant), or a calculation rather than a variable.`,
      fixes: ["Constants are fixed for the whole program. If it needs to change, make it a normal variable (remove the word const).", `Check the left of ${c("=")} is a single variable name.`],
    })],
    [/'(\w+)\.(\w+)' is inaccessible due to its protection level/, (m, e) => ({
      title: `'${m[2]}' is private`,
      what: `${c(m[2])} is marked ${c("private")} inside the ${c(m[1])} class, so code outside that class (line ${e.line}) isn't allowed to use it. This is <strong>encapsulation</strong>: the class protects its own data.`,
      fixes: [`Use a public method or property of ${c(m[1])} instead, if it has one.`, `If outside code really should read it, add a public property, e.g. ${c(`public string Name { get; private set; }`)}.`],
    })],
    [/abstract type '(\w+)'/, (m, e) => ({
      title: `You can't create a '${m[1]}' directly`,
      what: `${c(m[1])} is an <strong>abstract</strong> class: a template for other classes, not something you make objects from (line ${e.line}).`,
      fixes: [`Create an object of one of its child classes instead, e.g. ${c(`${m[1]} s = new Circle(2);`)}.`],
    })],
    [/An object reference is required for the non-static [\w ,]+ '([\w.]+)\(?/, (m, e) => ({
      title: "Missing 'static' (or an object)",
      what: `${c("Main")} is ${c("static")}, so it can only call other ${c("static")} methods directly. ${c(m[1])} isn't static (line ${e.line}).`,
      fixes: [`In the Program class, add ${c("static")} to the method: ${c("static void Greet()")}.`, `If it belongs to another class, create an object first with ${c("new")} and call it on that object.`],
    })],
    [/not all code paths return a value/, (m, e) => ({
      title: "The method doesn't always return an answer",
      what: `A method with a return type (not ${c("void")}) must finish with ${c("return")} on every possible route through it. Around line ${e.line}, there's a way to reach the end without returning.`,
      fixes: [`Add a ${c("return")} at the very end of the method.`, `If you return inside an ${c("if")}, add an ${c("else")} that returns too.`],
    })],
    [/There is no argument given that corresponds to the required parameter '(\w+)' of '([^']+)'/, (m, e) => ({
      title: "Not enough values passed to the method",
      what: `On line ${e.line} you call ${c(m[2].split("(")[0])} but don't give it a value for its parameter ${c(m[1])}.`,
      fixes: [`Look at the method's definition: ${c(m[2])}. Pass one value for each parameter, in the same order.`],
    })],
    [/No overload for method '(\w+)' takes (\d+) arguments/, (m, e) => ({
      title: "Wrong number of values passed",
      what: `On line ${e.line} you call ${c(m[1])} with ${m[2]} value(s), but it doesn't take that many.`,
      fixes: [`Check the method's definition and pass exactly the values it asks for, separated by commas.`],
    })],
    [/does not implement inherited abstract member '([^']+)'/, (m, e) => ({
      title: "A required method is missing",
      what: `The parent class says every child must have ${c(m[1])}, but this class (line ${e.line}) doesn't include it.`,
      fixes: [`Add the method to this class with the word ${c("override")}, e.g. ${c(`public override ${/\(\)/.test(m[1]) ? "void " + m[1].split(".").pop() : m[1]} { ... }`)}.`],
    })],
    [/'else' without a matching 'if'/, (m, e) => ({
      title: "This 'else' has no 'if'",
      what: `An ${c("else")} must come straight after the closing ${c("}")} of an ${c("if")} block (line ${e.line}).`,
      fixes: [`Check there is no ${c(";")} straight after ${c("if (...)")}.`, `Check the ${c("if")} block's curly brackets are closed just before the ${c("else")}.`],
      example: { before: "if (age >= 18); { ... } else { ... }", after: "if (age >= 18) { ... } else { ... }" },
    })],
    [/fall through from one case label/, (m, e) => ({
      title: "A case is missing its break",
      what: `In a ${c("switch")}, every ${c("case")} must end with ${c("break;")} (or return). Around line ${e.line} one doesn't.`,
      fixes: [`Add ${c("break;")} as the last line of that case.`],
    })],
    [/Operator '([^']+)' cannot be applied to operands of type '(\w+)' and '(\w+)'/, (m, e) => ({
      title: "Comparing two different types",
      what: `On line ${e.line}, ${c(m[1])} is used between a ${c(m[2])} and a ${c(m[3])}. C# can't compare or combine those directly.`,
      fixes: [m[2] === "string" || m[3] === "string" ? `If the text is a number, convert it first with ${c("int.Parse(...)")}. If you meant to compare with text, put the value in quotes: ${c('"1"')}.` : "Convert one value so both sides are the same type."],
    })],
    [/not supported in this course/, (m, e) => ({
      title: "Not used in this course",
      what: `Line ${e.line} uses a C# feature that this course's in-browser runner doesn't support. It's beyond what the GCSE needs.`,
      fixes: ["Use the approach shown in the lesson instead. Check the lesson's examples or the hints."],
    })],
    [/expected/, (m, e) => ({
      title: "C# expected something different here",
      what: `On line ${e.line}, C# was expecting a particular symbol and found something else. The message says what it wanted: ${c(e.message.replace(/^Line \d+:\s*/, ""))}.`,
      fixes: [`Check brackets ${c("( )")}, curly brackets ${c("{ }")}, quotes ${c('" "')} and semicolons on line ${e.line} and the line above.`, "Compare your line carefully with the lesson's example."],
    })],
  ];

  // ---------- run-time errors ----------
  const RUNTIME = [
    [/FormatException: The input string '([^']*)'/, (m, e, code, ctx) => ({
      title: "Couldn't turn that text into a number",
      what: `Your program tried to convert ${m[1] === "" ? "an empty answer" : c(m[1])} into a number on line ${e.line}, but it isn't a valid number. ${c("int.Parse")} and ${c("Convert.ToInt32")} only accept whole numbers like ${c("42")}.`,
      fixes: ctx.checking
        ? [`This check typed ${c(m[1])} on purpose. Your program needs to cope with it: use ${c("int.TryParse")} and ask again if it fails (see Module 10).`, "Or check you're converting the right answer: count the questions your program asks against the inputs the check types."]
        : ["When you test, type a whole number (no spaces, letters or decimal point).", `To stop bad input crashing the program, use ${c("int.TryParse")} (Module 10).`, `If you need decimals, use ${c("double.Parse")} and a ${c("double")} variable.`],
    })],
    [/FormatException/, (m, e) => ({
      title: "That value was in the wrong format",
      what: `On line ${e.line} the program tried to convert a value that isn't in the right format (for example, a word where a number or true/false was expected).`,
      fixes: ["Print the value just before this line to see what it really is.", `Use ${c("TryParse")} to check before converting.`],
    })],
    [/DivideByZeroException/, (m, e) => ({
      title: "Dividing by zero",
      what: `On line ${e.line} the program divided a whole number by 0, which has no answer.`,
      fixes: ["Find what you divide by and check how it could be 0 (an empty list, a counter that never went up, a 0 typed in).", `Guard it: ${c("if (count > 0) { average = total / count; }")}`],
    })],
    [/IndexOutOfRangeException/, (m, e) => ({
      title: "That position isn't in the array",
      what: `On line ${e.line} the program used an index that doesn't exist. Arrays start at index ${c("0")}, so an array of 5 items has indexes 0 to 4.`,
      fixes: [`In a loop, use ${c("i < array.Length")}, not ${c("<=")}.`, `The last item is ${c("array[array.Length - 1]")}.`, "Print the index just before this line to see what value it had."],
      example: { before: "for (int i = 0; i <= marks.Length; i++)", after: "for (int i = 0; i < marks.Length; i++)" },
    })],
    [/ArgumentOutOfRangeException: Index was out of range/, (m, e) => ({
      title: "That position isn't in the list",
      what: `On line ${e.line} the program used an index that isn't in the list. Lists start at index ${c("0")}, and the last index is ${c("list.Count - 1")}. An empty list has no indexes at all.`,
      fixes: [`Loop with ${c("i < list.Count")}.`, `Check the list isn't empty: ${c("if (list.Count > 0)")}.`],
    })],
    [/ArgumentOutOfRangeException/, (m, e) => ({
      title: "Asked for part of the text that isn't there",
      what: `On line ${e.line}, a start position or length goes past the end of the text. For example, ${c('"abc".Substring(5)')} fails because "abc" only has 3 characters.`,
      fixes: [`Check the numbers you pass to ${c("Substring")}, ${c("Remove")} or ${c("Insert")} against ${c(".Length")}.`, "Remember positions start at 0."],
    })],
    [/NullReferenceException/, (m, e, code, ctx) => ({
      title: "Something was empty (null)",
      what: `On line ${e.line} the program used a variable that holds nothing (${c("null")}), so there was nothing to call the method or property on.`,
      fixes: [
        ctx.checking && ctx.ranOut ? `Your program asked for more input than this check types, so ${c("Console.ReadLine()")} gave back nothing. Check you only ask the questions in the instructions.` : null,
        `If it's an object, make sure you created it with ${c("new")} before using it.`,
        "If it's a field, check the constructor gives it a value.",
      ].filter(Boolean),
    })],
    [/FileNotFoundException: Could not find file '([^']+)'/, (m, e) => ({
      title: `The file '${m[1]}' doesn't exist`,
      what: `On line ${e.line} the program tried to read ${c(m[1])}, but there's no file with that name yet.`,
      fixes: [`Check the spelling of the file name (open the <strong>Files</strong> tab under the editor to see what exists).`, `Check it exists first: ${c(`if (File.Exists("${m[1]}"))`)}.`, "Or write the file before you read it."],
    })],
    [/Stack overflow/, (m, e) => ({
      title: "A method kept calling itself",
      what: `Around line ${e.line}, a method calls itself over and over with no way to stop. This often happens by accident in a property that returns itself.`,
      fixes: ["If it's recursion, add a base case that returns without calling itself.", `If it's a property like ${c("public int Score { get { return Score; } }")}, return the private field (${c("score")}) instead.`],
    })],
    [/Unhandled exception\. System\.Exception: (.*)/, (m, e) => ({
      title: "Your program threw an exception",
      what: `On line ${e.line}, your code ran ${c("throw")}, with the message: ${c(m[1])}.`,
      fixes: [`Wrap the code that can fail in ${c("try { ... } catch (Exception ex) { ... }")} to handle it.`, "Or check why that throw was reached."],
    })],
    [/Unhandled exception\. ([\w.]+): (.*)/, (m, e) => ({
      title: "Your program crashed",
      what: `On line ${e.line} a ${c(m[1].split(".").pop())} happened: ${esc(m[2])}`,
      fixes: [`Use ${c("try")} / ${c("catch")} to handle it, or check the values used on that line.`],
    })],
  ];

  function timeoutExplain(e, ctx) {
    return {
      title: "Your program never finished",
      what: "The program ran for a very long time, so it was stopped. Usually a loop's condition never becomes false, so it repeats forever.",
      fixes: [
        ctx.checking && ctx.ranOut ? `Your program kept asking for input after the check ran out of answers to type. Check your loop stops when the right answer is entered, and that you aren't asking extra questions.` : null,
        `Check that the variable in the loop's condition changes inside the loop, e.g. ${c("count++")}.`,
        `A ${c("while (true)")} loop needs a ${c("break;")} that will definitely be reached.`,
        `Check you didn't put a ${c(";")} straight after ${c("while (...)")} or ${c("for (...)")}.`,
      ].filter(Boolean),
    };
  }

  function error(e, code, ctx) {
    ctx = ctx || {};
    const msg = String(e.message || "").replace(/^Line \d+:\s*/, "");
    const err = Object.assign({}, e, { message: msg });
    if (e.kind === "timeout") return Object.assign({ line: e.line, raw: msg }, timeoutExplain(err, ctx));
    const table = e.kind === "compile" || (!e.kind && !/exception/i.test(msg)) ? COMPILE : RUNTIME.concat(COMPILE);
    for (const [re, fn] of table) {
      const m = msg.match(re);
      if (m) return Object.assign({ line: e.line, raw: msg, code: lineOf(code, e.line) }, fn(m, err, code, ctx));
    }
    return { line: e.line, raw: msg, code: lineOf(code, e.line), title: e.kind === "compile" ? "There's a mistake in your code" : "Your program crashed", what: esc(msg), fixes: [`Look carefully at line ${e.line || "?"} and compare it with the lesson's example.`] };
  }

  // Extra advice when an output check fails although the program ran.
  function nearMiss(expected, output) {
    if (!expected) return null;
    const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9£]+/g, "");
    const out = String(output || "");
    if (!out.trim()) return "Your program didn't print anything for this check.";
    if (out.toLowerCase().includes(String(expected).toLowerCase())) return null;
    if (norm(out).includes(norm(expected))) return "So close! The words are there, but the spaces, punctuation or capital letters don't match exactly. Compare them character by character.";
    const words = String(expected).toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    const found = words.filter((w) => out.toLowerCase().includes(w));
    if (words.length > 2 && found.length >= words.length / 2) return "Some of the right words are there, but not in exactly the right form. Check spelling, spacing and the order of the words.";
    return null;
  }

  const Explain = { error, nearMiss, closest };
  root.Explain = Explain;
  if (typeof module !== "undefined" && module.exports) module.exports = Explain;
})(typeof window !== "undefined" ? window : globalThis);
