// Module 9: Methods
(function () {
  function prog(body, opts) {
    opts = opts || {};
    const ind = (s, n) => s.replace(/^\n+/, "").replace(/\s+$/, "").split("\n")
      .map(l => (l.trim() ? " ".repeat(n) + l : "")).join("\n");
    let src = (opts.usings || "using System;") + "\n\nclass Program\n{\n";
    if (opts.before) src += ind(opts.before, 4) + "\n\n";
    src += "    static void Main(string[] args)\n    {\n" + ind(body, 8) + "\n    }\n";
    if (opts.after) src += "\n" + ind(opts.after, 4) + "\n";
    return src + "}\n";
  }
  const count = (s, sub) => s.split(sub).length - 1;
  // Returns the text between the braces of the named method, or null.
  function methodBody(code, name) {
    const m = new RegExp("\\b" + name + "\\s*\\([^)]*\\)\\s*\\{").exec(code);
    if (!m) return null;
    let depth = 1, i = m.index + m[0].length;
    const start = i;
    for (; i < code.length && depth > 0; i++) {
      if (code[i] === "{") depth++;
      else if (code[i] === "}") depth--;
    }
    return depth === 0 ? code.slice(start, i - 1) : null;
  }

  COURSE.addModule({
    id: "m09",
    title: "Methods",
    icon: "function",
    summary: "Break programs into procedures and functions with parameters and return values.",
    lessons: [
      // ---------------------------------------------------------------- l1
      {
        id: "m09-l1",
        title: "Why methods? Your first procedure",
        type: "code",
        learn: `
<p>As programs grow, <code>Main</code> gets long and hard to follow. Professional programmers split a big problem into smaller, named chunks. This is called <strong>decomposition</strong>.</p>
<div class="key"><strong>Decomposition</strong> breaking a problem down into smaller sub-problems that are easier to solve.</div>
<p>In C#, each chunk is a <strong>method</strong>. Benefits:</p>
<ul>
<li><strong>Reuse</strong>: write the code once, call it as many times as you like.</li>
<li><strong>Readability</strong>: <code>ShowMenu();</code> tells you what's happening.</li>
<li><strong>Testing</strong>: you can check each method on its own.</li>
<li><strong>Teamwork</strong>: different people can write different methods.</li>
</ul>
<h3>A procedure</h3>
<p>A method that just <em>does</em> something (and doesn't give a value back) is a <strong>procedure</strong>. In C# its return type is <code>void</code>.</p>
<pre><code class="cs">class Program
{
    static void Main(string[] args)
    {
        PrintBanner();      // call the method
        Console.WriteLine("Welcome to sports day!");
        PrintBanner();      // call it again
    }

    static void PrintBanner()
    {
        Console.WriteLine("==========");
    }
}</code></pre>
<p>The method is <strong>defined</strong> inside <code>class Program</code> but <em>outside</em> <code>Main</code>. Writing its name with brackets, <code>PrintBanner();</code>, <strong>calls</strong> it: the program jumps into the method, runs it, then comes back.</p>
<div class="warn">For now, every method needs the word <code>static</code>, just like <code>Main</code>. You'll learn why in the classes module.</div>
<div class="tip">C# method names use <strong>PascalCase</strong>: each word starts with a capital, like <code>ShowMenu</code> or <code>PrintBanner</code>.</div>`,
        instructions: [
          "Write a procedure <code>static void ShowLogo()</code> that prints three lines: <code>+--------+</code>, <code>| PIZZA! |</code>, <code>+--------+</code>",
          "In <code>Main</code>, call <code>ShowLogo()</code>, then print <code>Today's special: Margherita</code>, then call <code>ShowLogo()</code> again."
        ],
        starter: prog(`
// TODO: call ShowLogo()

Console.WriteLine("Today's special: Margherita");

// TODO: call ShowLogo() again`, { after: `
// TODO: write static void ShowLogo() here
// It should print +--------+  then  | PIZZA! |  then  +--------+` }),
        solution: prog(`
ShowLogo();
Console.WriteLine("Today's special: Margherita");
ShowLogo();`, { after: `
static void ShowLogo()
{
    Console.WriteLine("+--------+");
    Console.WriteLine("| PIZZA! |");
    Console.WriteLine("+--------+");
}` }),
        tests: [
          { type: "fn", fn: (out) => count(out, "| PIZZA! |") === 2 && count(out, "+--------+") === 4, msg: "The logo (3 lines) should be printed twice.", help: "The checker wants the 3-line logo printed twice. Call <code>ShowLogo();</code> two times in <code>Main</code>, and check the logo lines are typed exactly." },
          { type: "outputRegex", pattern: "PIZZA! \\|\\s*\\n\\+-+\\+\\s*\\nToday's special: Margherita\\s*\\n\\+", msg: "The special should be printed between the two logos.", help: "The special should be printed between the two logos. Put one <code>ShowLogo();</code> before the special line and one after it." },
          { type: "code", pattern: "static\\s+void\\s+ShowLogo\\s*\\(\\s*\\)", msg: "Define static void ShowLogo().", help: "The checker looks for <code>static void ShowLogo()</code> in your code. Check the spelling, capitals and the word <code>static</code>." },
          { type: "fn", fn: (out, code) => count(code, "| PIZZA! |") === 1, msg: "Only write the logo lines once, inside the method, and call it twice.", help: "The checker wants the <code>| PIZZA! |</code> line to appear only once in your code. Write the logo inside the method and call it, rather than copying the lines." }
        ],
        hint: "Put static void ShowLogo() { ... } after the closing } of Main but before the final } of class Program.",
        goal: "The program prints a pizza logo, then today's special, then the logo again, using one method that is called twice.",
        steps: [
          "Find <code>// TODO: write static void ShowLogo() here</code> near the bottom, below <code>Main</code>'s closing bracket.",
          "Type the method header <code>static void ShowLogo()</code> with a pair of curly brackets under it.",
          "Inside those brackets, add three <code>Console.WriteLine</code> lines: <code>+--------+</code>, <code>| PIZZA! |</code> and <code>+--------+</code>.",
          "Back in <code>Main</code>, replace the first TODO with the call <code>ShowLogo();</code>. Press <strong>Run</strong>: the logo should appear above the special.",
          "Replace the second TODO in <code>Main</code> with another <code>ShowLogo();</code>. Run again to see the logo twice."
        ],
        hints: [
          "Write the logo once inside a method, then call that method whenever you want the logo.",
          "The method goes inside <code>class Program</code> but outside <code>Main</code>. Call it by writing its name with brackets and a semicolon.",
          "<code>static void ShowLogo()\n{\n    Console.WriteLine(\"+--------+\");\n    Console.WriteLine(\"| PIZZA! |\");\n    Console.WriteLine(\"+--------+\");\n}</code>"
        ],
        mistakes: [
          { wrong: "Putting the method inside <code>Main</code>'s curly brackets.", fix: "Methods sit side by side inside <code>class Program</code>. Put it after <code>Main</code>'s closing <code>}</code>." },
          { wrong: "Missing <code>static</code>: <code>void ShowLogo()</code>.", fix: "<code>Main</code> is static, so methods it calls need <code>static</code> too." },
          { wrong: "Writing <code>ShowLogo;</code> without brackets.", fix: "A call needs brackets: <code>ShowLogo();</code>." },
          { wrong: "Copying the three logo lines into <code>Main</code> as well.", fix: "Only write them once, inside the method. Main should just call <code>ShowLogo()</code>." }
        ]
      },

      // ---------------------------------------------------------------- l2
      {
        id: "m09-l2",
        title: "Parameters and arguments",
        type: "code",
        learn: `
<p>A method becomes far more useful if you can give it some information to work with. Values passed into a method are listed in its brackets.</p>
<pre><code class="cs">static void Greet(string name, int age)
{
    Console.WriteLine($"Hi {name}, you are {age}!");
}

// in Main:
Greet("Aoife", 14);
Greet("Ben", 15);</code></pre>
<pre><code>Hi Aoife, you are 14!
Hi Ben, you are 15!</code></pre>
<div class="key"><strong>Parameter</strong> a variable in the method's definition that receives a value, e.g. <code>string name</code>.</div>
<div class="key"><strong>Argument</strong> the actual value passed in when the method is called, e.g. <code>"Aoife"</code>.</div>
<p>Rules:</p>
<ul>
<li>Each parameter needs a <strong>type</strong> and a <strong>name</strong>, separated by commas.</li>
<li>Arguments must be given in the <strong>same order</strong> and be the right types. <code>Greet(14, "Aoife")</code> is a compile error.</li>
<li>Arguments can be variables or expressions: <code>Greet(pupil, age + 1);</code></li>
</ul>
<p>Inside the method, parameters behave just like local variables that already have a value. You can use them in calculations, loops and if statements.</p>
<div class="tip">The parameter names inside the method don't have to match the variable names you pass in. <code>Greet(myFriend, years)</code> works fine.</div>`,
        instructions: [
          "Write a procedure <code>static void DrawLine(char symbol, int length)</code> that prints <code>symbol</code> <code>length</code> times on one line (use a loop and <code>Console.Write</code>), then ends the line.",
          "Write a procedure <code>static void Scoreline(string home, int homeScore, string away, int awayScore)</code> that prints e.g. <code>Lions 24 - 17 Tigers</code>",
          "In <code>Main</code>: call <code>DrawLine('=', 20)</code>, then <code>Scoreline(\"Lions\", 24, \"Tigers\", 17)</code>, then <code>Scoreline(\"Eagles\", 12, \"Hawks\", 30)</code>, then <code>DrawLine('-', 10)</code>."
        ],
        starter: prog(`
// TODO: call DrawLine('=', 20)
// TODO: call Scoreline twice
// TODO: call DrawLine('-', 10)`, { after: `
// TODO: static void DrawLine(char symbol, int length)

// TODO: static void Scoreline(string home, int homeScore, string away, int awayScore)` }),
        solution: prog(`
DrawLine('=', 20);
Scoreline("Lions", 24, "Tigers", 17);
Scoreline("Eagles", 12, "Hawks", 30);
DrawLine('-', 10);`, { after: `
static void DrawLine(char symbol, int length)
{
    for (int i = 0; i < length; i++)
    {
        Console.Write(symbol);
    }
    Console.WriteLine();
}

static void Scoreline(string home, int homeScore, string away, int awayScore)
{
    Console.WriteLine($"{home} {homeScore} - {awayScore} {away}");
}` }),
        tests: [
          { type: "outputRegex", pattern: "(^|\\n)={20}\\s*\\n", msg: "DrawLine('=', 20) should print exactly 20 = signs on a line.", help: "The checker wants a line of exactly 20 <code>=</code> signs. Check your loop uses <code>i &lt; length</code> and you call <code>DrawLine('=', 20)</code>." },
          { type: "outputRegex", pattern: "(^|\\n)-{10}\\s*(\\n|$)", msg: "DrawLine('-', 10) should print exactly 10 - signs on a line.", help: "The checker wants a line of exactly 10 <code>-</code> signs. Call <code>DrawLine('-', 10)</code> at the end of Main." },
          { type: "fn", fn: (out) => out.includes("Lions 24 - 17 Tigers") && out.includes("Eagles 12 - 30 Hawks"), msg: "Print Lions 24 - 17 Tigers and Eagles 12 - 30 Hawks", help: "The checker wants <code>Lions 24 - 17 Tigers</code> and <code>Eagles 12 - 30 Hawks</code>. Check the order inside your Scoreline message." },
          { type: "code", pattern: "static\\s+void\\s+DrawLine\\s*\\(\\s*char\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)", msg: "Define static void DrawLine(char symbol, int length).", help: "The checker looks for <code>static void DrawLine(char ..., int ...)</code>. Check the parameter types and their order." },
          { type: "code", pattern: "static\\s+void\\s+Scoreline\\s*\\(\\s*string\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*,\\s*string\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)", msg: "Define Scoreline with four parameters: string, int, string, int.", help: "The checker looks for Scoreline with four parameters: <code>string</code>, <code>int</code>, <code>string</code>, <code>int</code>. Check each one has a type and a name, separated by commas." }
        ],
        hint: "Inside DrawLine: for (int i = 0; i < length; i++) { Console.Write(symbol); } then Console.WriteLine();",
        goal: "The program draws lines of symbols and prints two match scorelines, using methods that take parameters.",
        steps: [
          "Under <code>// TODO: static void DrawLine</code>, write <code>static void DrawLine(char symbol, int length)</code> with curly brackets.",
          "Inside, write a loop <code>for (int i = 0; i &lt; length; i++)</code> that does <code>Console.Write(symbol);</code>, then after the loop add <code>Console.WriteLine();</code>.",
          "In <code>Main</code>, call <code>DrawLine('=', 20);</code> and <code>DrawLine('-', 10);</code> in the right places. Press <strong>Run</strong> to see two lines.",
          "Under the Scoreline TODO, write <code>static void Scoreline(string home, int homeScore, string away, int awayScore)</code> with curly brackets.",
          "Inside, print <code>$\"{home} {homeScore} - {awayScore} {away}\"</code>.",
          "In <code>Main</code>, between the two lines, call <code>Scoreline(\"Lions\", 24, \"Tigers\", 17);</code> and <code>Scoreline(\"Eagles\", 12, \"Hawks\", 30);</code>. Run it."
        ],
        hints: [
          "Parameters let you hand values into a method. The method then uses them like normal variables.",
          "<code>DrawLine</code> needs a loop that runs <code>length</code> times. <code>Scoreline</code> just prints one line using its four parameters. Note the away score comes before the away team name.",
          "<code>static void DrawLine(char symbol, int length)\n{\n    for (int i = 0; i &lt; length; i++)\n    {\n        Console.Write(symbol);\n    }\n    Console.WriteLine();\n}</code>"
        ],
        mistakes: [
          { wrong: "Using <code>Console.WriteLine(symbol)</code> in the loop, so each symbol is on its own line.", fix: "Use <code>Console.Write</code> inside the loop and one <code>Console.WriteLine()</code> after it." },
          { wrong: "Passing arguments in the wrong order, like <code>DrawLine(20, '=')</code>.", fix: "Arguments must match the parameter order: the char first, then the int." },
          { wrong: "Using double quotes for the symbol: <code>DrawLine(\"=\", 20)</code>.", fix: "A <code>char</code> uses single quotes: <code>'='</code>." },
          { wrong: "Printing <code>{home} {homeScore} - {away} {awayScore}</code>.", fix: "The format is <code>Lions 24 - 17 Tigers</code>: the away score comes before the away team." }
        ]
      },

      // ---------------------------------------------------------------- l3
      {
        id: "m09-l3",
        title: "Functions and return values",
        type: "code",
        learn: `
<p>A <strong>function</strong> is a method that works something out and <strong>returns</strong> a value to the code that called it. Instead of <code>void</code>, you write the type of value it gives back.</p>
<pre><code class="cs">static double CircleArea(double radius)
{
    double area = Math.PI * radius * radius;
    return area;
}

// in Main:
double a = CircleArea(3);
Console.WriteLine($"Area: {a:F1}");                    // Area: 28.3
Console.WriteLine($"Double: {CircleArea(1) * 2:F2}");  // Double: 6.28</code></pre>
<div class="key"><strong>Return value</strong> the value a function sends back to where it was called, using <code>return</code>.</div>
<ul>
<li>The <strong>return type</strong> (<code>double</code> here) must match the type of value returned.</li>
<li><code>return</code> ends the method immediately.</li>
<li>Use the result: store it in a variable, print it, or use it in a calculation. Calling <code>CircleArea(3);</code> on its own throws the answer away!</li>
</ul>
<h3>Procedure or function?</h3>
<table>
<tr><th>Procedure</th><th>Function</th></tr>
<tr><td><code>static void Show(...)</code></td><td><code>static int Add(...)</code></td></tr>
<tr><td>Does a job (e.g. prints)</td><td>Calculates and returns a value</td></tr>
<tr><td>Called as a statement: <code>Show();</code></td><td>Used in an expression: <code>int t = Add(2, 3);</code></td></tr>
</table>
<div class="tip">Good functions usually <em>don't</em> print anything. They just return the answer and let <code>Main</code> decide what to do with it. That makes them easier to reuse.</div>`,
        instructions: [
          "Write a function <code>static double CelsiusToFahrenheit(double c)</code> that returns <code>c * 9 / 5 + 32</code>.",
          "Write a function <code>static int RugbyPoints(int tries, int conversions, int penalties)</code> that returns tries × 5 + conversions × 2 + penalties × 3.",
          "In <code>Main</code>, ask <code>Temperature in C: </code>, then print <code>That's 68 F</code> using your function. Then print <code>Lions scored 29 points</code> using <code>RugbyPoints(4, 3, 1)</code>."
        ],
        starter: prog(`
Console.Write("Temperature in C: ");
double c = Convert.ToDouble(Console.ReadLine());

// TODO: call CelsiusToFahrenheit and print That's ... F

// TODO: print Lions scored ... points using RugbyPoints(4, 3, 1)`, { after: `
// TODO: static double CelsiusToFahrenheit(double c)

// TODO: static int RugbyPoints(int tries, int conversions, int penalties)` }),
        solution: prog(`
Console.Write("Temperature in C: ");
double c = Convert.ToDouble(Console.ReadLine());

double f = CelsiusToFahrenheit(c);
Console.WriteLine($"That's {f} F");

Console.WriteLine($"Lions scored {RugbyPoints(4, 3, 1)} points");`, { after: `
static double CelsiusToFahrenheit(double c)
{
    return c * 9 / 5 + 32;
}

static int RugbyPoints(int tries, int conversions, int penalties)
{
    return tries * 5 + conversions * 2 + penalties * 3;
}` }),
        stdin: ["20"],
        tests: [
          { type: "output", stdin: ["20"], includes: "That's 68 F", msg: "20 C should print That's 68 F", help: "When <code>20</code> is entered, your program should print <code>That's 68 F</code>. Check the formula <code>c * 9 / 5 + 32</code> and that you print the value returned." },
          { type: "output", stdin: ["-10"], includes: "That's 14 F", msg: "-10 C should print That's 14 F", help: "When <code>-10</code> is entered, your program should print <code>That's 14 F</code>. Make sure you pass <code>c</code> into the function, not a fixed number." },
          { type: "output", stdin: ["37.5"], includes: "That's 99.5 F", msg: "37.5 C should print That's 99.5 F", help: "When <code>37.5</code> is entered, your program should print <code>That's 99.5 F</code>. Use <code>double</code> for the parameter and return type so decimals aren't lost." },
          { type: "output", stdin: ["20"], includes: "Lions scored 29 points", msg: "RugbyPoints(4, 3, 1) is 20 + 6 + 3: print Lions scored 29 points", help: "The checker wants <code>Lions scored 29 points</code>. Check <code>RugbyPoints</code> returns tries × 5 + conversions × 2 + penalties × 3 and you call it with <code>(4, 3, 1)</code>." },
          { type: "code", pattern: "static\\s+double\\s+CelsiusToFahrenheit\\s*\\([\\s\\S]*return", msg: "CelsiusToFahrenheit should be a double function with a return statement.", help: "The checker looks for <code>static double CelsiusToFahrenheit(</code> with a <code>return</code>. Write it as a function that returns the answer." },
          { type: "code", pattern: "static\\s+int\\s+RugbyPoints\\s*\\(", msg: "Define static int RugbyPoints(...).", help: "The checker looks for <code>static int RugbyPoints(</code>. Check the spelling and that it returns an <code>int</code>." }
        ],
        hint: "static double CelsiusToFahrenheit(double c) { return c * 9 / 5 + 32; }",
        goal: "The program converts a Celsius temperature you type into Fahrenheit and works out the Lions' rugby score, using functions that return values.",
        steps: [
          "Under <code>// TODO: static double CelsiusToFahrenheit</code>, write <code>static double CelsiusToFahrenheit(double c)</code> with curly brackets.",
          "Inside, write <code>return c * 9 / 5 + 32;</code>.",
          "In <code>Main</code>, store the answer: <code>double f = CelsiusToFahrenheit(c);</code> and print <code>$\"That's {f} F\"</code>. Press <strong>Run</strong> and type 20.",
          "Under the RugbyPoints TODO, write <code>static int RugbyPoints(int tries, int conversions, int penalties)</code> that returns <code>tries * 5 + conversions * 2 + penalties * 3</code>.",
          "In <code>Main</code>, print <code>$\"Lions scored {RugbyPoints(4, 3, 1)} points\"</code>. Run again."
        ],
        hints: [
          "A function works something out and hands the answer back with <code>return</code>. Main then uses that answer.",
          "Put the return type (<code>double</code> or <code>int</code>) before the method name instead of <code>void</code>. In Main, store or print the result of the call.",
          "<code>static int RugbyPoints(int tries, int conversions, int penalties)\n{\n    return tries * 5 + conversions * 2 + penalties * 3;\n}</code>"
        ],
        mistakes: [
          { wrong: "Calling <code>CelsiusToFahrenheit(c);</code> on its own line and ignoring the answer.", fix: "The returned value is thrown away. Store it (<code>double f = ...</code>) or use it inside the print." },
          { wrong: "Using <code>void</code> as the return type.", fix: "A function that returns a value needs that type: <code>static double</code> or <code>static int</code>." },
          { wrong: "Printing inside the function instead of returning.", fix: "Use <code>return</code> to send the answer back, and print it in Main." },
          { wrong: "Missing <code>static</code> on the methods.", fix: "Methods called from Main need <code>static</code>." }
        ]
      },

      // ---------------------------------------------------------------- l4
      {
        id: "m09-l4",
        title: "Boolean functions",
        type: "code",
        learn: `
<p>A function that returns <code>bool</code> answers a yes/no question. Name it like a question, such as <code>IsEven</code> or <code>IsValidAge</code>, and it reads beautifully inside an <code>if</code>.</p>
<pre><code class="cs">static bool IsEven(int n)
{
    return n % 2 == 0;
}

static bool IsValidAge(int age)
{
    if (age &lt; 11 || age &gt; 18)
    {
        return false;
    }
    return true;
}

// in Main:
if (IsEven(10))
{
    Console.WriteLine("10 is even");
}
if (!IsValidAge(42))
{
    Console.WriteLine("That age isn't valid for a pupil");
}</code></pre>
<p>Notice <code>return n % 2 == 0;</code>. The comparison already gives <code>true</code> or <code>false</code>, so you can return it directly. No if needed!</p>
<div class="tip">Every path through a function must <code>return</code> something. If a <code>return</code> is only inside an <code>if</code>, C# complains <em>not all code paths return a value</em>.</div>
<h3>Validation loops</h3>
<p>Boolean functions make validation loops very readable:</p>
<pre><code class="cs">while (!IsValidAge(age))
{
    Console.Write("Try again: ");
    age = Convert.ToInt32(Console.ReadLine());
}</code></pre>`,
        instructions: [
          "Write <code>static bool IsValidMark(int mark)</code> that returns <code>true</code> if the mark is from 0 to 100.",
          "Write <code>static bool IsPass(int mark)</code> that returns <code>true</code> if the mark is 40 or more.",
          "In <code>Main</code>, ask <code>Enter mark: </code>. While the mark isn't valid, print <code>Invalid mark</code> and ask again. Then print <code>Pass</code> or <code>Fail</code> using <code>IsPass</code>."
        ],
        starter: prog(`
Console.Write("Enter mark: ");
int mark = Convert.ToInt32(Console.ReadLine());

// TODO: while (!IsValidMark(mark)) { print Invalid mark, ask again }

// TODO: if IsPass(mark) print Pass, else print Fail`, { after: `
// TODO: static bool IsValidMark(int mark)

// TODO: static bool IsPass(int mark)` }),
        solution: prog(`
Console.Write("Enter mark: ");
int mark = Convert.ToInt32(Console.ReadLine());

while (!IsValidMark(mark))
{
    Console.WriteLine("Invalid mark");
    Console.Write("Enter mark: ");
    mark = Convert.ToInt32(Console.ReadLine());
}

if (IsPass(mark))
{
    Console.WriteLine("Pass");
}
else
{
    Console.WriteLine("Fail");
}`, { after: `
static bool IsValidMark(int mark)
{
    return mark >= 0 && mark <= 100;
}

static bool IsPass(int mark)
{
    return mark >= 40;
}` }),
        stdin: ["55"],
        tests: [
          { type: "fn", stdin: ["55"], fn: (out) => /\bPass\b/.test(out) && !/Invalid/.test(out), msg: "55 is valid and should print Pass", help: "When <code>55</code> is entered, your program should print <code>Pass</code> with no Invalid mark. Check <code>IsValidMark</code> returns true for 0 to 100 and the while uses <code>!</code>." },
          { type: "fn", stdin: ["39"], fn: (out) => /\bFail\b/.test(out), msg: "39 should print Fail", help: "When <code>39</code> is entered, your program should print <code>Fail</code>. Check <code>IsPass</code> returns <code>mark &gt;= 40</code> and you have an <code>else</code>." },
          { type: "fn", stdin: ["40"], fn: (out) => /\bPass\b/.test(out), msg: "40 is exactly the pass mark, so it should print Pass", help: "When <code>40</code> is entered, your program should print <code>Pass</code>. Use <code>&gt;=</code>, not <code>&gt;</code>." },
          { type: "fn", stdin: ["150", "-5", "100"], fn: (out) => count(out, "Invalid mark") === 2 && /\bPass\b/.test(out), msg: "150 and -5 should each print Invalid mark; then 100 should print Pass", help: "When the inputs are <code>150</code>, <code>-5</code>, <code>100</code>, it should print <code>Invalid mark</code> twice then <code>Pass</code>. Use <code>&amp;&amp;</code> in IsValidMark and read a new mark inside the loop." },
          { type: "code", pattern: "static\\s+bool\\s+IsValidMark\\s*\\(\\s*int", msg: "Define static bool IsValidMark(int mark).", help: "The checker looks for <code>static bool IsValidMark(int ...)</code>. Check the spelling and the <code>bool</code> return type." },
          { type: "code", pattern: "static\\s+bool\\s+IsPass\\s*\\(\\s*int", msg: "Define static bool IsPass(int mark).", help: "The checker looks for <code>static bool IsPass(int ...)</code>. Check the spelling and the <code>bool</code> return type." }
        ],
        hint: "static bool IsPass(int mark) { return mark >= 40; }",
        goal: "The program asks for a mark, keeps asking until it's between 0 and 100, then says Pass or Fail, using two true/false functions.",
        steps: [
          "Under <code>// TODO: static bool IsValidMark</code>, write <code>static bool IsValidMark(int mark)</code> with <code>return mark &gt;= 0 &amp;&amp; mark &lt;= 100;</code> inside.",
          "Under the next TODO, write <code>static bool IsPass(int mark)</code> with <code>return mark &gt;= 40;</code> inside.",
          "In <code>Main</code>, write <code>while (!IsValidMark(mark))</code> with curly brackets.",
          "Inside the loop, print <code>Invalid mark</code>, ask <code>Enter mark: </code> again and read a new <code>mark</code>. Press <strong>Run</strong> and try 150.",
          "After the loop, write <code>if (IsPass(mark))</code> that prints <code>Pass</code>, with an <code>else</code> that prints <code>Fail</code>. Run with 55, 39 and 40."
        ],
        hints: [
          "A <code>bool</code> function answers a yes/no question with <code>true</code> or <code>false</code>. You can use it straight inside an <code>if</code> or <code>while</code>.",
          "You can return a comparison directly, like <code>return mark &gt;= 40;</code>. The <code>!</code> in <code>while (!IsValidMark(mark))</code> means \"while it is not valid\".",
          "<code>while (!IsValidMark(mark))\n{\n    Console.WriteLine(\"Invalid mark\");\n    Console.Write(\"Enter mark: \");\n    mark = Convert.ToInt32(Console.ReadLine());\n}</code>"
        ],
        mistakes: [
          { wrong: "Using <code>||</code> in IsValidMark: <code>mark &gt;= 0 || mark &lt;= 100</code>.", fix: "Every number passes that. A valid mark must be both, so use <code>&amp;&amp;</code>." },
          { wrong: "Using <code>mark &gt; 40</code>, so exactly 40 fails.", fix: "40 is a pass, so use <code>mark &gt;= 40</code>." },
          { wrong: "Only returning inside an <code>if</code>, giving <em>not all code paths return a value</em>.", fix: "Every path must return something. Returning the comparison directly avoids this." },
          { wrong: "Forgetting the <code>!</code> in the while loop.", fix: "You want to loop while the mark is <em>not</em> valid: <code>while (!IsValidMark(mark))</code>." }
        ]
      },

      // ---------------------------------------------------------------- l5
      {
        id: "m09-l5",
        title: "Local and global variables",
        type: "code",
        learn: `
<p>Where you declare a variable decides where it can be used. This is called its <strong>scope</strong>.</p>
<div class="key"><strong>Local variable</strong> declared inside a method. It only exists while that method runs and can't be seen by other methods.</div>
<div class="key"><strong>Global variable</strong> declared at class level, outside every method. All methods in the class can use it. In C# this is a <code>static</code> field.</div>
<pre><code class="cs">class Program
{
    static int lives = 3;          // global (class-level)

    static void Main(string[] args)
    {
        int bonus = 10;            // local to Main
        LoseLife();
        LoseLife();
        Console.WriteLine(lives);  // 1
    }

    static void LoseLife()
    {
        lives--;                   // fine: lives is global
        // bonus++;                // error! bonus is local to Main
    }
}</code></pre>
<h3>Which should you use?</h3>
<p>Globals are handy for values that the whole program shares, like a score in a game. But they can be changed from <em>anywhere</em>, which makes bugs hard to track down. Good practice is:</p>
<ul>
<li>Prefer <strong>local</strong> variables and pass values in as <strong>parameters</strong>.</li>
<li>Use a global only when lots of methods really need to share the same data.</li>
</ul>
<div class="tip">Two methods can each have their own local variable called <code>total</code>. They are completely separate variables that just happen to share a name.</div>`,
        instructions: [
          "Declare a global <code>static int score = 0;</code> at class level (inside <code>class Program</code>, outside <code>Main</code>).",
          "Write <code>static void AddPoints(int points)</code> that adds <code>points</code> to <code>score</code> and prints <code>+5 points</code> (using the value of points).",
          "Write <code>static void ShowScore()</code> that prints <code>Score: 15</code>.",
          "In <code>Main</code>, call <code>AddPoints(5)</code>, <code>AddPoints(10)</code>, <code>ShowScore()</code>, <code>AddPoints(3)</code>, <code>ShowScore()</code>."
        ],
        starter: `using System;

class Program
{
    // TODO: declare the global variable score here

    static void Main(string[] args)
    {
        // TODO: call AddPoints(5), AddPoints(10), ShowScore(), AddPoints(3), ShowScore()
    }

    // TODO: static void AddPoints(int points)

    // TODO: static void ShowScore()
}
`,
        solution: `using System;

class Program
{
    static int score = 0;

    static void Main(string[] args)
    {
        AddPoints(5);
        AddPoints(10);
        ShowScore();
        AddPoints(3);
        ShowScore();
    }

    static void AddPoints(int points)
    {
        score += points;
        Console.WriteLine($"+{points} points");
    }

    static void ShowScore()
    {
        Console.WriteLine($"Score: {score}");
    }
}
`,
        tests: [
          { type: "fn", fn: (out) => out.includes("+5 points") && out.includes("+10 points") && out.includes("+3 points"), msg: "Print +5 points, +10 points and +3 points", help: "The checker wants <code>+5 points</code>, <code>+10 points</code> and <code>+3 points</code>. Print <code>$\"+{points} points\"</code> inside AddPoints and call it with 5, 10 and 3." },
          { type: "outputRegex", pattern: "Score: 15[\\s\\S]*Score: 18", msg: "Print Score: 15 and then Score: 18", help: "The checker wants <code>Score: 15</code> and later <code>Score: 18</code>. Make sure <code>score</code> is a single global variable and AddPoints adds to it." },
          { type: "code", pattern: "static\\s+int\\s+score", msg: "Declare score as a global: static int score = 0; at class level.", help: "The checker looks for <code>static int score</code>. Declare it inside <code>class Program</code> but outside every method." },
          { type: "code", pattern: "static\\s+void\\s+AddPoints\\s*\\(\\s*int", msg: "Define static void AddPoints(int points).", help: "The checker looks for <code>static void AddPoints(int ...)</code>. Check the spelling and the parameter." },
          { type: "code", pattern: "static\\s+void\\s+ShowScore\\s*\\(\\s*\\)", msg: "Define static void ShowScore().", help: "The checker looks for <code>static void ShowScore()</code>. Check the spelling and empty brackets." }
        ],
        hint: "The global goes straight after class Program {, before static void Main. Inside AddPoints: score += points;",
        goal: "The program keeps a global score, adds points to it through a method, and shows the score twice as it grows.",
        steps: [
          "Find <code>// TODO: declare the global variable score here</code> (inside <code>class Program</code>, above <code>Main</code>) and type <code>static int score = 0;</code>.",
          "Below <code>Main</code>, write <code>static void AddPoints(int points)</code> with curly brackets.",
          "Inside, add <code>score += points;</code> and print <code>$\"+{points} points\"</code>.",
          "Write <code>static void ShowScore()</code> with curly brackets that prints <code>$\"Score: {score}\"</code>.",
          "In <code>Main</code>, call <code>AddPoints(5);</code>, <code>AddPoints(10);</code>, <code>ShowScore();</code>, <code>AddPoints(3);</code>, <code>ShowScore();</code>. Press <strong>Run</strong>: you should see Score: 15 then Score: 18."
        ],
        hints: [
          "A global variable is declared at class level, so every method in the class can see and change it.",
          "Declare <code>static int score = 0;</code> outside any method. <code>AddPoints</code> changes it; <code>ShowScore</code> prints it.",
          "<code>static void AddPoints(int points)\n{\n    score += points;\n    Console.WriteLine($\"+{points} points\");\n}</code>"
        ],
        mistakes: [
          { wrong: "Declaring <code>int score = 0;</code> inside <code>Main</code>.", fix: "Then the other methods can't see it. Move it to class level and add <code>static</code>." },
          { wrong: "Declaring <code>int score = 0;</code> inside <code>AddPoints</code>.", fix: "That makes a new local variable each time, so the global never changes. Just use <code>score += points;</code>." },
          { wrong: "Missing <code>static</code> on the global or the methods.", fix: "Everything used from <code>Main</code> needs <code>static</code> for now." },
          { wrong: "Printing <code>+points points</code> as plain text.", fix: "Use an interpolated string: <code>$\"+{points} points\"</code>." }
        ]
      },

      // ---------------------------------------------------------------- l6
      {
        id: "m09-l6",
        title: "ref and out parameters",
        type: "code",
        learn: `
<p>Normally an argument is <strong>copied</strong> into the parameter (<strong>by value</strong>). If the method changes the parameter, the original variable in <code>Main</code> doesn't change.</p>
<pre><code class="cs">static void Double(int n) { n = n * 2; }

int x = 5;
Double(x);
Console.WriteLine(x);   // still 5!</code></pre>
<h3>ref: pass by reference</h3>
<p>With <code>ref</code>, the method works on the <em>original</em> variable. You must write <code>ref</code> in both places:</p>
<pre><code class="cs">static void Double(ref int n) { n = n * 2; }

int x = 5;
Double(ref x);
Console.WriteLine(x);   // 10</code></pre>
<h3>out: extra results</h3>
<p>A function can only <code>return</code> one value. An <code>out</code> parameter lets it hand back more. The method <strong>must</strong> set every <code>out</code> parameter before it finishes.</p>
<pre><code class="cs">static bool TryLogin(string user, string pass, out string message)
{
    if (user == "admin" &amp;&amp; pass == "1234")
    {
        message = "Welcome back!";
        return true;
    }
    message = "Wrong details.";
    return false;
}

// in Main:
bool ok = TryLogin("admin", "1234", out string msg);
Console.WriteLine(msg);</code></pre>
<p>You've used this pattern already: <code>int.TryParse(text, out int n)</code> returns <code>true</code>/<code>false</code> <em>and</em> gives you the number through <code>out</code>.</p>`,
        instructions: [
          "Write <code>static void Swap(ref int a, ref int b)</code> that swaps the two values (use a temp variable).",
          "Write <code>static bool TryLogin(string user, string pin, out string message)</code>: if user is <code>niamh</code> and pin is <code>2468</code>, set message to <code>Welcome, niamh!</code> and return true; otherwise set message to <code>Login failed.</code> and return false.",
          "<code>Main</code> is mostly written for you: complete the <code>Swap</code> and <code>TryLogin</code> calls. It should print <code>After swap: 9 and 4</code>, then the message, then <code>Unlocked: True</code> or <code>Unlocked: False</code>."
        ],
        starter: prog(`
int first = 4;
int second = 9;
// TODO: call Swap with ref first and ref second
Console.WriteLine($"After swap: {first} and {second}");

Console.Write("User: ");
string user = Console.ReadLine();
Console.Write("PIN: ");
string pin = Console.ReadLine();

bool ok = false;
string message = "";
// TODO: replace the two lines above with: bool ok = TryLogin(user, pin, out string message);
Console.WriteLine(message);
Console.WriteLine($"Unlocked: {ok}");`, { after: `
// TODO: static void Swap(ref int a, ref int b)

// TODO: static bool TryLogin(string user, string pin, out string message)` }),
        solution: prog(`
int first = 4;
int second = 9;
Swap(ref first, ref second);
Console.WriteLine($"After swap: {first} and {second}");

Console.Write("User: ");
string user = Console.ReadLine();
Console.Write("PIN: ");
string pin = Console.ReadLine();

bool ok = TryLogin(user, pin, out string message);
Console.WriteLine(message);
Console.WriteLine($"Unlocked: {ok}");`, { after: `
static void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}

static bool TryLogin(string user, string pin, out string message)
{
    if (user == "niamh" && pin == "2468")
    {
        message = "Welcome, niamh!";
        return true;
    }
    message = "Login failed.";
    return false;
}` }),
        stdin: ["niamh", "2468"],
        tests: [
          { type: "output", stdin: ["niamh", "2468"], includes: "After swap: 9 and 4", msg: "Swap should change the variables in Main: After swap: 9 and 4", help: "The checker wants <code>After swap: 9 and 4</code>. Use <code>ref</code> in both the method and the call, and swap using a temp variable." },
          { type: "fn", stdin: ["niamh", "2468"], fn: (out) => out.includes("Welcome, niamh!") && out.includes("Unlocked: True"), msg: "niamh / 2468 should print Welcome, niamh! and Unlocked: True", help: "When the inputs are <code>niamh</code> and <code>2468</code>, it should print <code>Welcome, niamh!</code> and <code>Unlocked: True</code>. Make sure Main uses the value returned by <code>TryLogin</code>." },
          { type: "fn", stdin: ["niamh", "1111"], fn: (out) => out.includes("Login failed.") && out.includes("Unlocked: False"), msg: "A wrong PIN should print Login failed. and Unlocked: False", help: "When the inputs are <code>niamh</code> and <code>1111</code>, it should print <code>Login failed.</code> and <code>Unlocked: False</code>. Set the message and return false when the details don't match." },
          { type: "code", pattern: "static\\s+void\\s+Swap\\s*\\(\\s*ref\\s+int\\s+\\w+\\s*,\\s*ref\\s+int", msg: "Define Swap with two ref int parameters.", help: "The checker looks for <code>static void Swap(ref int ..., ref int ...)</code>. Put <code>ref</code> before both parameters." },
          { type: "code", pattern: "static\\s+bool\\s+TryLogin\\s*\\([^)]*out\\s+string", msg: "TryLogin should return bool and have an out string parameter.", help: "The checker looks for <code>static bool TryLogin(... out string ...)</code>. Check the return type is <code>bool</code> and the last parameter is <code>out string message</code>." },
          { type: "code", pattern: "TryLogin\\s*\\([^)]*out\\s+", msg: "Call TryLogin with out.", help: "The checker looks for a call to <code>TryLogin</code> that uses <code>out</code>. Write <code>TryLogin(user, pin, out string message)</code> in Main." }
        ],
        hint: "Swap(ref first, ref second);  and inside Swap: int temp = a; a = b; b = temp;",
        goal: "The program swaps two numbers using ref, then checks a username and PIN with a function that hands back a message through out.",
        steps: [
          "Under <code>// TODO: static void Swap</code>, write <code>static void Swap(ref int a, ref int b)</code> with curly brackets.",
          "Inside, swap with a temp: <code>int temp = a;</code>, <code>a = b;</code>, <code>b = temp;</code>.",
          "In <code>Main</code>, replace the Swap TODO with <code>Swap(ref first, ref second);</code>. Press <strong>Run</strong>: you should see After swap: 9 and 4.",
          "Under the TryLogin TODO, write <code>static bool TryLogin(string user, string pin, out string message)</code>. Inside, if user is <code>niamh</code> and pin is <code>2468</code>, set <code>message = \"Welcome, niamh!\";</code> and <code>return true;</code>.",
          "After that <code>if</code>, set <code>message = \"Login failed.\";</code> and <code>return false;</code>.",
          "In <code>Main</code>, delete the two lines <code>bool ok = false;</code> and <code>string message = \"\";</code> and put <code>bool ok = TryLogin(user, pin, out string message);</code> in their place. Run it."
        ],
        hints: [
          "<code>ref</code> lets a method change the caller's variable. <code>out</code> lets a method hand back an extra result.",
          "Write <code>ref</code> in both the method header and the call. For <code>out</code>, the method must set <code>message</code> on every path before it returns.",
          "<code>static bool TryLogin(string user, string pin, out string message)\n{\n    if (user == \"niamh\" &amp;&amp; pin == \"2468\")\n    {\n        message = \"Welcome, niamh!\";\n        return true;\n    }\n    message = \"Login failed.\";\n    return false;\n}</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>Swap(first, second);</code> without <code>ref</code>.", fix: "C# gives an error. Write <code>ref</code> in the call too: <code>Swap(ref first, ref second);</code>." },
          { wrong: "Swapping without a temp: <code>a = b; b = a;</code>.", fix: "Both end up as 9. Save <code>a</code> in <code>temp</code> first." },
          { wrong: "Only setting <code>message</code> inside the <code>if</code>.", fix: "An <code>out</code> parameter must be set on every path. Set it before <code>return false;</code> too." },
          { wrong: "Keeping <code>string message = \"\";</code> and also writing <code>out string message</code>.", fix: "That declares <code>message</code> twice. Delete the old two lines first." }
        ]
      },

      // ---------------------------------------------------------------- l7
      {
        id: "m09-l7",
        title: "Method overloading",
        type: "code",
        learn: `
<p>Sometimes you want the same action to work with different inputs. C# lets you write several methods with the <strong>same name</strong> as long as their <strong>parameter lists are different</strong> (a different number of parameters, or different types). This is called <strong>overloading</strong>.</p>
<pre><code class="cs">static int Area(int side)
{
    return side * side;              // square
}

static int Area(int width, int height)
{
    return width * height;           // rectangle
}

static double Area(double radius)
{
    return Math.PI * radius * radius;  // circle
}

// in Main:
Console.WriteLine(Area(4));          // 16  (one int)
Console.WriteLine(Area(3, 5));       // 15  (two ints)
Console.WriteLine(Area(1.0));        // 3.14159... (one double)</code></pre>
<p>C# looks at the arguments you pass and picks the matching version automatically.</p>
<div class="tip">You've been using overloading all along! <code>Console.WriteLine</code> has versions for <code>string</code>, <code>int</code>, <code>double</code>, <code>bool</code> and more, plus one with no parameters at all.</div>
<div class="warn">Changing only the <em>return type</em> isn't enough. The parameters must be different, or C# can't tell which one you mean.</div>`,
        instructions: [
          "Write two overloaded procedures called <code>Welcome</code>: one takes <code>(string name)</code> and prints <code>Welcome, Grace!</code>; the other takes <code>(string name, string house)</code> and prints <code>Welcome, Grace of Lions house!</code>",
          "Write two overloaded functions called <code>Total</code>: <code>static int Total(int a, int b)</code> returns a + b and <code>static int Total(int a, int b, int c)</code> returns a + b + c.",
          "In <code>Main</code>: call <code>Welcome(\"Grace\")</code>, <code>Welcome(\"Oisín\", \"Eagles\")</code>, then print <code>Total(4, 5)</code> and <code>Total(4, 5, 6)</code> like <code>Two scores: 9</code> and <code>Three scores: 15</code>."
        ],
        starter: prog(`
// TODO: call Welcome("Grace") and Welcome("Oisín", "Eagles")

// TODO: print Two scores: ... using Total(4, 5)
// TODO: print Three scores: ... using Total(4, 5, 6)`, { after: `
// TODO: two Welcome procedures

// TODO: two Total functions` }),
        solution: prog(`
Welcome("Grace");
Welcome("Oisín", "Eagles");

Console.WriteLine($"Two scores: {Total(4, 5)}");
Console.WriteLine($"Three scores: {Total(4, 5, 6)}");`, { after: `
static void Welcome(string name)
{
    Console.WriteLine($"Welcome, {name}!");
}

static void Welcome(string name, string house)
{
    Console.WriteLine($"Welcome, {name} of {house} house!");
}

static int Total(int a, int b)
{
    return a + b;
}

static int Total(int a, int b, int c)
{
    return a + b + c;
}` }),
        tests: [
          { type: "output", includes: "Welcome, Grace!", msg: "Welcome(\"Grace\") should print Welcome, Grace!", help: "The checker wants <code>Welcome, Grace!</code>. Write <code>Welcome(string name)</code> and call it with <code>\"Grace\"</code>." },
          { type: "output", includes: "Welcome, Oisín of Eagles house!", msg: "Welcome(\"Oisín\", \"Eagles\") should print Welcome, Oisín of Eagles house!", help: "The checker wants <code>Welcome, Oisín of Eagles house!</code>. Write the two-parameter <code>Welcome</code> and check the wording, including the word house." },
          { type: "fn", fn: (out) => out.includes("Two scores: 9") && out.includes("Three scores: 15"), msg: "Print Two scores: 9 and Three scores: 15", help: "The checker wants <code>Two scores: 9</code> and <code>Three scores: 15</code>. Make sure each Total returns the sum and you print the result." },
          { type: "fn", fn: (out, code) => (code.match(/static\s+void\s+Welcome\s*\(/g) || []).length === 2, msg: "Write two methods both called Welcome.", help: "The checker wants exactly two methods called <code>static void Welcome(</code>. Use the same name for both, with different parameters." },
          { type: "fn", fn: (out, code) => (code.match(/static\s+int\s+Total\s*\(/g) || []).length === 2, msg: "Write two methods both called Total.", help: "The checker wants exactly two methods called <code>static int Total(</code>. Use the same name for both, one with two ints and one with three." }
        ],
        hint: "Both Welcome methods have exactly the same name; only the brackets differ: (string name) and (string name, string house).",
        goal: "The program welcomes two pupils and adds up two sets of scores, using pairs of methods that share the same name but take different parameters.",
        steps: [
          "Under <code>// TODO: two Welcome procedures</code>, write <code>static void Welcome(string name)</code> that prints <code>$\"Welcome, {name}!\"</code>.",
          "Below it, write a second <code>static void Welcome(string name, string house)</code> that prints <code>$\"Welcome, {name} of {house} house!\"</code>.",
          "In <code>Main</code>, call <code>Welcome(\"Grace\");</code> and <code>Welcome(\"Oisín\", \"Eagles\");</code>. Press <strong>Run</strong>.",
          "Under the Total TODO, write <code>static int Total(int a, int b)</code> returning <code>a + b</code>, and <code>static int Total(int a, int b, int c)</code> returning <code>a + b + c</code>.",
          "In <code>Main</code>, print <code>$\"Two scores: {Total(4, 5)}\"</code> and <code>$\"Three scores: {Total(4, 5, 6)}\"</code>. Run again."
        ],
        hints: [
          "Overloading means writing several methods with exactly the same name, as long as their brackets hold different parameters.",
          "Write <code>Welcome</code> twice (one parameter, then two) and <code>Total</code> twice (two ints, then three). C# picks the right one from the arguments you pass.",
          "<code>static int Total(int a, int b)\n{\n    return a + b;\n}\n\nstatic int Total(int a, int b, int c)\n{\n    return a + b + c;\n}</code>"
        ],
        mistakes: [
          { wrong: "Giving them different names like <code>Welcome2</code> or <code>Total3</code>.", fix: "Overloads must share exactly the same name. Only the parameters differ." },
          { wrong: "Giving both methods the same parameters.", fix: "C# can't tell them apart. One must have a different number or type of parameters." },
          { wrong: "Forgetting <code>house</code> in the message: <code>Welcome, Oisín of Eagles!</code>.", fix: "The exact text is <code>Welcome, {name} of {house} house!</code>." },
          { wrong: "Calling <code>Total(4, 5);</code> on its own line.", fix: "The answer is thrown away. Use the call inside your print." }
        ]
      },

      // ---------------------------------------------------------------- l8
      {
        id: "m09-l8",
        title: "Mini-project: refactor the tuck shop",
        type: "code",
        learn: `
<p>Ciarán wrote a tuck shop program all in <code>Main</code>. It works, but it's long and repeats itself. Your job is to <strong>refactor</strong> it: keep exactly the same behaviour, but split it into methods.</p>
<div class="key"><strong>Refactoring</strong> restructuring code to make it clearer without changing what it does.</div>
<h3>The original (all in Main)</h3>
<pre><code class="cs">Console.WriteLine("1. Crisps   £0.80");
Console.WriteLine("2. Juice    £1.20");
Console.WriteLine("3. Cookie   £0.95");
Console.Write("Item number: ");
int item = Convert.ToInt32(Console.ReadLine());
Console.Write("Quantity: ");
int qty = Convert.ToInt32(Console.ReadLine());
double price;
if (item == 1) price = 0.80;
else if (item == 2) price = 1.20;
else price = 0.95;
double cost = price * qty;
if (qty &gt;= 5) cost = cost * 0.9;     // 10% off 5 or more
Console.WriteLine($"Total: £{cost:F2}");</code></pre>
<h3>Plan the decomposition</h3>
<table>
<tr><th>Method</th><th>Kind</th><th>Job</th></tr>
<tr><td><code>ShowMenu()</code></td><td>procedure</td><td>prints the three menu lines</td></tr>
<tr><td><code>AskNumber(string prompt)</code></td><td>function → <code>int</code></td><td>prints the prompt, reads and returns a whole number</td></tr>
<tr><td><code>GetPrice(int item)</code></td><td>function → <code>double</code></td><td>returns the price of an item</td></tr>
<tr><td><code>CalculateCost(double price, int qty)</code></td><td>function → <code>double</code></td><td>returns the cost, with the discount</td></tr>
</table>
<p>Then <code>Main</code> becomes a short, readable summary of the program:</p>
<pre><code class="cs">ShowMenu();
int item = AskNumber("Item number: ");
// ...</code></pre>
<div class="tip">Notice <code>AskNumber</code> is used <em>twice</em> with different prompts. That's reuse in action.</div>`,
        instructions: [
          "Write the four methods from the table: <code>ShowMenu</code>, <code>AskNumber</code>, <code>GetPrice</code> and <code>CalculateCost</code>, with the same menu text, prompts and rules as the original.",
          "Make <code>Main</code> use them so the program behaves exactly as before, ending with e.g. <code>Total: £3.60</code>.",
          "<code>Main</code> must not contain <code>Console.ReadLine</code> itself; all input goes through <code>AskNumber</code>."
        ],
        starter: prog(`
// TODO: call ShowMenu()
// TODO: int item = AskNumber("Item number: ");
// TODO: int qty = AskNumber("Quantity: ");
// TODO: double price = GetPrice(item);
// TODO: double cost = CalculateCost(price, qty);

double cost = 0; // TODO: remove this line when you've written the line above
Console.WriteLine($"Total: £{cost:F2}");`, { after: `
// TODO: static void ShowMenu()

// TODO: static int AskNumber(string prompt)

// TODO: static double GetPrice(int item)

// TODO: static double CalculateCost(double price, int qty)` }),
        solution: prog(`
ShowMenu();
int item = AskNumber("Item number: ");
int qty = AskNumber("Quantity: ");
double price = GetPrice(item);
double cost = CalculateCost(price, qty);
Console.WriteLine($"Total: £{cost:F2}");`, { after: `
static void ShowMenu()
{
    Console.WriteLine("1. Crisps   £0.80");
    Console.WriteLine("2. Juice    £1.20");
    Console.WriteLine("3. Cookie   £0.95");
}

static int AskNumber(string prompt)
{
    Console.Write(prompt);
    return Convert.ToInt32(Console.ReadLine());
}

static double GetPrice(int item)
{
    if (item == 1)
    {
        return 0.80;
    }
    else if (item == 2)
    {
        return 1.20;
    }
    return 0.95;
}

static double CalculateCost(double price, int qty)
{
    double cost = price * qty;
    if (qty >= 5)
    {
        cost = cost * 0.9;
    }
    return cost;
}` }),
        stdin: ["2", "3"],
        tests: [
          { type: "fn", stdin: ["2", "3"], fn: (out) => out.includes("1. Crisps") && out.includes("3. Cookie") && out.includes("Total: £3.60"), msg: "Show the menu; 3 juices should give Total: £3.60", help: "When the inputs are <code>2</code> and <code>3</code>, it should show the menu and print <code>Total: £3.60</code>. Check ShowMenu prints the three lines and GetPrice returns 1.20 for item 2." },
          { type: "output", stdin: ["1", "5"], includes: "Total: £3.60", msg: "5 crisps is £4.00 minus 10%: Total: £3.60", help: "When the inputs are <code>1</code> and <code>5</code>, it should print <code>Total: £3.60</code>. Five crisps get 10% off, so use <code>qty &gt;= 5</code> and <code>cost * 0.9</code>." },
          { type: "output", stdin: ["3", "10"], includes: "Total: £8.55", msg: "10 cookies is £9.50 minus 10%: Total: £8.55", help: "When the inputs are <code>3</code> and <code>10</code>, it should print <code>Total: £8.55</code>. Check GetPrice returns 0.95 for item 3 and the discount is applied." },
          { type: "code", pattern: "static\\s+void\\s+ShowMenu\\s*\\(\\s*\\)", msg: "Write static void ShowMenu().", help: "The checker looks for <code>static void ShowMenu()</code>. Check the spelling and empty brackets." },
          { type: "code", pattern: "static\\s+int\\s+AskNumber\\s*\\(\\s*string", msg: "Write static int AskNumber(string prompt).", help: "The checker looks for <code>static int AskNumber(string ...)</code>. It should take the prompt as a string and return an int." },
          { type: "code", pattern: "static\\s+double\\s+GetPrice\\s*\\(\\s*int[\\s\\S]*static\\s+double\\s+CalculateCost\\s*\\(|static\\s+double\\s+CalculateCost\\s*\\([\\s\\S]*static\\s+double\\s+GetPrice\\s*\\(\\s*int", msg: "Write GetPrice and CalculateCost as double functions.", help: "The checker looks for <code>static double GetPrice(int ...)</code> and <code>static double CalculateCost(</code>. Both must return a <code>double</code>." },
          { type: "fn", fn: (out, code) => { const body = methodBody(code, "Main"); return body !== null && !/ReadLine/.test(body); }, msg: "Main shouldn't call Console.ReadLine directly; use AskNumber.", help: "Main must not call <code>Console.ReadLine</code> itself. Get both numbers through <code>AskNumber</code>." }
        ],
        hint: "AskNumber: Console.Write(prompt); return Convert.ToInt32(Console.ReadLine());  CalculateCost: work out price * qty, apply * 0.9 if qty >= 5, then return it.",
        goal: "The tuck shop program shows a menu, asks for an item and a quantity, and prints the total cost with a discount for 5 or more, now split into tidy methods.",
        steps: [
          "Under <code>// TODO: static void ShowMenu()</code>, write the method so it prints the three menu lines exactly as in the original code.",
          "Write <code>static int AskNumber(string prompt)</code>. Inside: <code>Console.Write(prompt);</code> then <code>return Convert.ToInt32(Console.ReadLine());</code>.",
          "Write <code>static double GetPrice(int item)</code> that returns <code>0.80</code> for item 1, <code>1.20</code> for item 2 and <code>0.95</code> otherwise.",
          "Write <code>static double CalculateCost(double price, int qty)</code>: work out <code>price * qty</code>, multiply by <code>0.9</code> if <code>qty &gt;= 5</code>, then return it.",
          "In <code>Main</code>, turn each TODO into real code: <code>ShowMenu();</code>, <code>int item = AskNumber(\"Item number: \");</code> and so on.",
          "Delete the line <code>double cost = 0; // TODO: remove this line...</code>. Press <strong>Run</strong> with 2 and 3: you should see Total: £3.60."
        ],
        hints: [
          "Each method does one job from the original program. Main just calls them in order.",
          "<code>ShowMenu</code> is a procedure (<code>void</code>). The other three are functions that <code>return</code> a value. All input goes through <code>AskNumber</code>, so <code>ReadLine</code> only appears there.",
          "<code>static double CalculateCost(double price, int qty)\n{\n    double cost = price * qty;\n    if (qty &gt;= 5)\n    {\n        cost = cost * 0.9;\n    }\n    return cost;\n}</code>"
        ],
        mistakes: [
          { wrong: "Leaving the line <code>double cost = 0;</code> as well as your new <code>double cost = CalculateCost(...)</code>.", fix: "That declares <code>cost</code> twice. Delete the placeholder line." },
          { wrong: "Calling <code>Console.ReadLine()</code> in Main.", fix: "The checker doesn't allow it. Use <code>AskNumber(\"Quantity: \")</code> instead." },
          { wrong: "Calling <code>CalculateCost(price, qty);</code> without storing the answer.", fix: "Store it: <code>double cost = CalculateCost(price, qty);</code>." },
          { wrong: "Using <code>qty &gt; 5</code>, so exactly 5 items get no discount.", fix: "The rule is 5 or more: <code>qty &gt;= 5</code>." }
        ]
      },

      // ---------------------------------------------------------------- quiz
      {
        id: "m09-quiz",
        title: "Checkpoint: methods",
        type: "quiz",
        questions: [
          { q: "What is <strong>decomposition</strong>?",
            options: ["Deleting unused code", "Breaking a problem into smaller sub-problems", "Converting a string to a number", "Running a program step by step"],
            answer: 1, explain: "Decomposition splits a big problem into smaller parts, which in code often become methods." },
          { q: "What is the difference between a <strong>procedure</strong> and a <strong>function</strong>?",
            options: ["A function returns a value; a procedure doesn't", "A procedure has parameters; a function doesn't", "Functions must be static; procedures mustn't", "There is no difference"],
            answer: 0, explain: "A procedure (void) performs a task; a function returns a value with return." },
          { q: "In <code>Greet(\"Ben\", 15);</code>, what are <code>\"Ben\"</code> and <code>15</code>?",
            options: ["Parameters", "Arguments", "Return values", "Global variables"],
            answer: 1, explain: "The values passed in a call are arguments. The variables in the method definition that receive them are parameters." },
          { q: "What is the return type of <code>static bool IsEven(int n)</code>?",
            options: ["int", "void", "bool", "n"],
            answer: 2, explain: "The word before the method name is the return type: bool." },
          { q: "A variable declared inside a method is…",
            options: ["global", "local to that method", "available to every method", "a constant"],
            answer: 1, explain: "Local variables only exist inside the method where they are declared." },
          { q: "What does this print?", code: "static void AddOne(int n) { n++; }\n// in Main:\nint x = 5;\nAddOne(x);\nConsole.WriteLine(x);",
            options: ["5", "6", "0", "A compile error"],
            answer: 0, explain: "x is passed by value, so the method only changes its own copy. You'd need ref to change x." },
          { q: "Which pair of methods is a valid <strong>overload</strong>?",
            options: ["int Add(int a, int b) and double Add(int a, int b)", "int Add(int a, int b) and int Add(int a, int b, int c)", "void Show() and void Show()", "int add(int a) and int Add(int a)"],
            answer: 1, explain: "Overloads need different parameter lists. Changing only the return type isn't allowed; different capitalisation just makes a different method." }
        ]
      }
    ]
  });
})();
