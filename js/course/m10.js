// Module 10: Validation and errors
(function () {
  const cs = String.raw;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const trim = (s) => s.replace(/^\n+/, "").replace(/\s+$/, "");
  const pre = (s) => `<pre><code class="cs">${esc(trim(s))}</code></pre>`;
  const out = (s) => `<pre><code>${esc(trim(s))}</code></pre>`;
  // Wraps a Main body (and optional extra Program members) in the full Program shape.
  function prog(body, opts) {
    opts = opts || {};
    const ind = (s, n) => trim(s).split("\n").map((l) => (l.trim() ? " ".repeat(n) + l : "")).join("\n");
    let src = (opts.usings || "using System;") + "\n\n";
    if (opts.classes) src += trim(opts.classes) + "\n\n";
    src += "class Program\n{\n";
    if (opts.before) src += ind(opts.before, 4) + "\n\n";
    src += "    static void Main(string[] args)\n    {\n" + ind(body, 8) + "\n    }\n";
    if (opts.after) src += "\n" + ind(opts.after, 4) + "\n";
    return src + "}\n";
  }
  const count = (s, sub) => s.toLowerCase().split(sub.toLowerCase()).length - 1;

  COURSE.addModule({
    id: "m10",
    title: "Validation and errors",
    icon: "shield",
    summary: "Stop bad data getting in with validation, find and fix the three kinds of error, catch exceptions and plan your testing.",
    lessons: [
      // ------------------------------------------------------------------ l1
      {
        id: "m10-l1",
        title: "Types of validation",
        type: "code",
        learn: cs`
<p>Users make mistakes. They leave boxes empty, type <code>fourteen</code> instead of <code>14</code>, or enter an age of 140. If your program trusts everything it's given, it will crash or store rubbish. The rule programmers use is <strong>garbage in, garbage out</strong>.</p>
<div class="key"><strong>Validation</strong> an automatic check, done by the program, that input is sensible and reasonable before it is used. It cannot tell whether the data is <em>correct</em>, only that it is <em>allowed</em>.</div>
<h3>The six checks you need to know</h3>
<table>
<tr><th>Check</th><th>What it tests</th><th>Example</th></tr>
<tr><td>Presence</td><td>Something has been entered</td><td>Username is not blank</td></tr>
<tr><td>Length</td><td>The number of characters is within limits</td><td>Password has at least 8 characters</td></tr>
<tr><td>Range</td><td>A number lies between a lower and upper limit</td><td>Age is from 11 to 18</td></tr>
<tr><td>Type</td><td>The data is the right data type</td><td>Age is a whole number, not <code>ten</code></td></tr>
<tr><td>Format</td><td>The data follows a pattern</td><td>A postcode like <code>BT74 6AB</code></td></tr>
<tr><td>Lookup</td><td>The value is in a list of allowed values</td><td>Year group is one of 8, 9, 10, 11, 12</td></tr>
</table>
<p>Here's a presence check and a length check on a team name:</p>
${pre(cs`
Console.Write("Team name: ");
string team = Console.ReadLine();

if (team == "")
{
    Console.WriteLine("Error: team name cannot be blank.");
}
else if (team.Length > 20)
{
    Console.WriteLine("Error: team name is too long.");
}
else
{
    Console.WriteLine("Team saved.");
}`)}
<div class="tip"><strong>Validation vs verification.</strong> Verification checks that data has been entered or copied <em>accurately</em>, for example typing a new password twice (double entry) or reading it back to the user (visual check). Validation checks it is <em>reasonable</em>. You'll use both in the final project.</div>`,
        instructions: [
          "The starter asks for a username. Add a <strong>presence check</strong>: if it is empty (<code>\"\"</code>) print <code>Error: username cannot be blank.</code>",
          "Otherwise add a <strong>length check</strong>: if it has fewer than 3 or more than 12 characters print <code>Error: username must be 3 to 12 characters.</code>",
          "Otherwise print <code>Username accepted.</code>"
        ],
        starter: prog(cs`
Console.Write("Choose a username: ");
string username = Console.ReadLine();

// TODO: presence check, then length check, then accept`),
        solution: prog(cs`
Console.Write("Choose a username: ");
string username = Console.ReadLine();

if (username == "")
{
    Console.WriteLine("Error: username cannot be blank.");
}
else if (username.Length < 3 || username.Length > 12)
{
    Console.WriteLine("Error: username must be 3 to 12 characters.");
}
else
{
    Console.WriteLine("Username accepted.");
}`),
        stdin: ["Oisin"],
        tests: [
          { type: "output", stdin: ["Oisin"], includes: "Username accepted.", msg: "Oisin is a valid username, so print Username accepted.", help: "With the input <code>Oisin</code>, your program should print <code>Username accepted.</code> Check your <code>else</code> branch and its spelling." },
          { type: "output", stdin: [""], includes: "Error: username cannot be blank.", msg: "An empty username should print Error: username cannot be blank.", help: "With an empty input (just Enter), it should print <code>Error: username cannot be blank.</code> Make sure your first check is <code>username == \"\"</code>." },
          { type: "fn", stdin: ["al"], fn: (o) => o.includes("Error: username must be 3 to 12 characters.") && !/accepted/i.test(o), msg: "al is too short: print the length error (and not Username accepted.).", help: "With the input <code>al</code> it should print the length error and <strong>not</strong> <code>Username accepted.</code> Use <code>else if</code>/<code>else</code> so only one message prints." },
          { type: "output", stdin: ["ciaran_the_great"], includes: "Error: username must be 3 to 12 characters.", msg: "ciaran_the_great has 16 characters, which is too long.", help: "With a 16-character name, it should print <code>Error: username must be 3 to 12 characters.</code> Check that you test <code>username.Length &gt; 12</code>." },
          { type: "output", stdin: ["abcdefghijkl"], includes: "Username accepted.", msg: "Exactly 12 characters is allowed (it's a boundary value).", help: "With exactly 12 characters (<code>abcdefghijkl</code>) the name should be accepted. Use <code>&gt; 12</code>, not <code>&gt;= 12</code>." }
        ],
        hint: "if (username == \"\") { ... } else if (username.Length < 3 || username.Length > 12) { ... } else { ... }",
        goal: "The program asks for a username and tells you whether it's blank, the wrong length, or accepted.",
        steps: [
          "Find <code>// TODO: presence check, then length check, then accept</code> under the line that reads <code>username</code>.",
          "Start an <code>if</code> that checks for an empty username: <code>if (username == \"\")</code>. Inside it, print <code>Error: username cannot be blank.</code>",
          "Run it and just press Enter when asked. You should see the blank error.",
          "Add an <code>else if</code> for the length check: <code>username.Length &lt; 3 || username.Length &gt; 12</code>. Inside, print <code>Error: username must be 3 to 12 characters.</code>",
          "Add a final <code>else</code> that prints <code>Username accepted.</code>",
          "Run it a few times with <code>al</code>, <code>Oisin</code> and a 12-letter name to test each branch, then press Check."
        ],
        hints: [
          "There are three possible outcomes, and only one should ever print. Which C# structure picks exactly one of several options?",
          "Use <code>if</code> / <code>else if</code> / <code>else</code>. The presence check goes first, then the length check using <code>username.Length</code>, then the accept message.",
          "<code>else if (username.Length &lt; 3 || username.Length &gt; 12)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\"Error: username must be 3 to 12 characters.\");<br>}</code>"
        ],
        mistakes: [
          { wrong: "Using three separate <code>if</code> statements, so <code>al</code> prints the length error <em>and</em> <code>Username accepted.</code>", fix: "Join them with <code>else if</code> and <code>else</code> so only one message can ever print." },
          { wrong: "Writing <code>&amp;&amp;</code> instead of <code>||</code> in the length check, e.g. <code>username.Length &lt; 3 &amp;&amp; username.Length &gt; 12</code>.", fix: "A name can't be both too short and too long at once. Use <code>||</code> (or) so either problem triggers the error." },
          { wrong: "Using <code>&lt;= 12</code> or <code>&gt;= 12</code> so a 12-character name is rejected.", fix: "12 is allowed. The error is only for <code>&gt; 12</code> and <code>&lt; 3</code>." },
          { wrong: "Typing the message slightly differently, e.g. missing the full stop.", fix: "Copy the messages from the instructions exactly, including capital letters and the full stop." }
        ]
      },

      // ------------------------------------------------------------------ l2
      {
        id: "m10-l2",
        title: "Validation loops with TryParse",
        type: "code",
        learn: cs`
<p>Printing an error message is a start, but a good program <strong>asks again</strong> until it gets valid data. That needs a loop.</p>
<p>There's another problem. If someone types <code>ten</code> when you use <code>int.Parse</code> or <code>Convert.ToInt32</code>, the program crashes with a <code>FormatException</code>. The fix is <code>int.TryParse</code>. It <em>tries</em> to convert the text and returns <code>true</code> or <code>false</code> instead of crashing. If it works, the number is put into the <code>out</code> variable.</p>
${pre(cs`
int goals;
bool ok = int.TryParse("7", out goals);     // ok is true,  goals is 7
ok = int.TryParse("seven", out goals);      // ok is false, goals is 0`)}
<h3>A validation loop</h3>
<p>Put the type check and the range check in one <code>while</code> condition. The loop keeps going while the input is <em>not</em> a number <strong>or</strong> it's out of range:</p>
${pre(cs`
int squad;
Console.Write("Squad size (15-23): ");
while (!int.TryParse(Console.ReadLine(), out squad) || squad < 15 || squad > 23)
{
    Console.Write("Please enter a whole number from 15 to 23: ");
}
Console.WriteLine($"Squad size set to {squad}");`)}
${out(cs`
Squad size (15-23): twenty
Please enter a whole number from 15 to 23: 30
Please enter a whole number from 15 to 23: 22
Squad size set to 22`)}
<div class="tip">The order matters. <code>||</code> stops as soon as one side is true, so if <code>TryParse</code> fails the range checks are skipped. That's called <strong>short-circuit evaluation</strong>.</div>
<div class="tip">You can do the same with <code>double.TryParse</code> for decimal numbers.</div>`,
        instructions: [
          "The starter crashes if you type letters. Replace <code>Convert.ToInt32</code> with a validation loop that uses <code>int.TryParse</code>.",
          "Keep asking with <code>Please enter a whole number from 11 to 18: </code> until the age is a whole number from 11 to 18.",
          "Then print <code>Age accepted: </code> followed by the age, e.g. <code>Age accepted: 14</code>"
        ],
        starter: prog(cs`
Console.Write("Enter your age (11-18): ");
int age = Convert.ToInt32(Console.ReadLine());

// TODO: replace the line above with a validation loop using int.TryParse

Console.WriteLine($"Age accepted: {age}");`),
        solution: prog(cs`
int age;
Console.Write("Enter your age (11-18): ");
while (!int.TryParse(Console.ReadLine(), out age) || age < 11 || age > 18)
{
    Console.Write("Please enter a whole number from 11 to 18: ");
}

Console.WriteLine($"Age accepted: {age}");`),
        stdin: ["14"],
        tests: [
          { type: "output", stdin: ["14"], includes: "Age accepted: 14", msg: "Typing 14 should print Age accepted: 14", help: "With the input <code>14</code>, your program should print <code>Age accepted: 14</code>. Make sure the final line still prints <code>age</code>." },
          { type: "output", stdin: ["fourteen", "25", "10", "18"], includes: "Age accepted: 18", msg: "After fourteen, 25 and 10 are rejected, 18 should be accepted (no crash!).", help: "This feeds in <code>fourteen</code>, <code>25</code>, <code>10</code> then <code>18</code>. It should not crash and should finish with <code>Age accepted: 18</code>. Replace <code>Convert.ToInt32</code> with the TryParse loop and check both range limits." },
          { type: "fn", stdin: ["fourteen", "25", "10", "18"], fn: (o) => count(o, "Please enter a whole number from 11 to 18") === 3, msg: "Print Please enter a whole number from 11 to 18: once for each of the 3 invalid inputs.", help: "With those same four inputs, the re-ask message should appear exactly 3 times (once per bad input). Print it only inside the loop, using <code>Console.Write</code>, with the exact wording." },
          { type: "output", stdin: ["11"], includes: "Age accepted: 11", msg: "11 is a boundary value and should be accepted.", help: "<code>11</code> is the lowest allowed age and must be accepted. Use <code>age &lt; 11</code>, not <code>age &lt;= 11</code>." },
          { type: "code", pattern: "int\\.TryParse", msg: "Use int.TryParse.", help: "This check looks for <code>int.TryParse</code> in your code. Use it in the <code>while</code> condition." }
        ],
        hint: "while (!int.TryParse(Console.ReadLine(), out age) || age < 11 || age > 18) { ask again }. Declare int age; before the loop.",
        goal: "The program keeps asking for your age until you type a whole number from 11 to 18, then confirms it.",
        steps: [
          "Find the line <code>int age = Convert.ToInt32(Console.ReadLine());</code> and delete it.",
          "Above the prompt, declare the variable on its own: <code>int age;</code>",
          "Under the prompt, start the loop: <code>while (!int.TryParse(Console.ReadLine(), out age) || age &lt; 11 || age &gt; 18)</code>",
          "Inside the loop's <code>{ }</code>, write the re-ask message with <code>Console.Write(\"Please enter a whole number from 11 to 18: \");</code>",
          "Leave the <code>Age accepted:</code> line at the end. Run it and type <code>fourteen</code>, then <code>25</code>, then <code>14</code> to see the loop working."
        ],
        hints: [
          "<code>Convert.ToInt32</code> crashes on letters. You need a method that <em>tries</em> to convert and tells you if it worked, inside a loop that repeats while the input is bad.",
          "Use <code>int.TryParse(text, out age)</code> in a <code>while</code> condition. Put <code>!</code> in front so the loop runs while it <em>fails</em>, and add the two range checks with <code>||</code>.",
          "<code>int age;<br>Console.Write(\"Enter your age (11-18): \");<br>while (!int.TryParse(Console.ReadLine(), out age) || age &lt; 11 || age &gt; 18)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.Write(\"Please enter a whole number from 11 to 18: \");<br>}</code>"
        ],
        mistakes: [
          { wrong: "Leaving <code>Convert.ToInt32</code> in the code as well as the loop, so <code>fourteen</code> still crashes.", fix: "Delete the old line completely. <code>TryParse</code> does the reading and converting for you." },
          { wrong: "Forgetting the <code>!</code>, so the loop runs when the input is <em>valid</em> and stops when it's bad.", fix: "The loop should keep going while TryParse <strong>fails</strong>: <code>while (!int.TryParse(...) || ...)</code>." },
          { wrong: "Using <code>&amp;&amp;</code> between the checks instead of <code>||</code>.", fix: "Any one problem (not a number, too small, too big) should make it ask again, so join them with <code>||</code>." },
          { wrong: "Writing <code>int age;</code> inside the loop, or declaring it twice.", fix: "Declare <code>int age;</code> once, before the <code>while</code>, so it still exists after the loop for the final message." }
        ]
      },

      // ------------------------------------------------------------------ l3
      {
        id: "m10-l3",
        title: "A reusable GetIntInRange method",
        type: "code",
        learn: cs`
<p>Programs ask for numbers all the time: menu choices, scores, ages. Writing a fresh validation loop every time is repetitive and easy to get wrong. Instead, write the loop <strong>once</strong> inside a method and call it whenever you need a number.</p>
${pre(cs`
static int GetIntInRange(string prompt, int min, int max)
{
    int value;
    Console.Write(prompt);
    while (!int.TryParse(Console.ReadLine(), out value) || value < min || value > max)
    {
        Console.Write($"Please enter a whole number from {min} to {max}: ");
    }
    return value;
}`)}
<p>Now one line gets you a validated number:</p>
${pre(cs`
int choice = GetIntInRange("Choose 1-4: ", 1, 4);
int seats = GetIntInRange("How many seats? ", 1, 10);`)}
<p>The <strong>parameters</strong> make it flexible: the prompt, the lowest and the highest allowed value change each time, but the logic stays the same. If you find a bug you fix it in one place. You'll use this exact method in the final quiz project for the menus.</p>
<div class="key"><strong>Reusable code</strong> a subroutine written once and called from many places. It makes programs shorter, easier to test and easier to maintain.</div>
<p>Rugby union scoring: a try is worth 5 points, a conversion 2 and a penalty 3.</p>`,
        instructions: [
          "Finish the <code>GetIntInRange</code> method so it keeps asking (with <code>Please enter a whole number from {min} to {max}: </code>) until it gets a whole number in range, then returns it.",
          "In <code>Main</code>, use it three times to read the tries, conversions and penalties, each from 0 to 20, with the prompts <code>Tries: </code>, <code>Conversions: </code> and <code>Penalties: </code>",
          "Print <code>Total points: </code> and the total (try 5, conversion 2, penalty 3), e.g. <code>Total points: 22</code>"
        ],
        starter: prog(cs`
int tries = Convert.ToInt32(Console.ReadLine());
int conversions = Convert.ToInt32(Console.ReadLine());
int penalties = Convert.ToInt32(Console.ReadLine());

// TODO: use GetIntInRange for each input instead

int total = tries * 5 + conversions * 2 + penalties * 3;
Console.WriteLine($"Total points: {total}");`, {
          after: cs`
static int GetIntInRange(string prompt, int min, int max)
{
    // TODO: show the prompt, then loop until the input is a whole number from min to max
    return 0;
}`
        }),
        solution: prog(cs`
int tries = GetIntInRange("Tries: ", 0, 20);
int conversions = GetIntInRange("Conversions: ", 0, 20);
int penalties = GetIntInRange("Penalties: ", 0, 20);

int total = tries * 5 + conversions * 2 + penalties * 3;
Console.WriteLine($"Total points: {total}");`, {
          after: cs`
static int GetIntInRange(string prompt, int min, int max)
{
    int value;
    Console.Write(prompt);
    while (!int.TryParse(Console.ReadLine(), out value) || value < min || value > max)
    {
        Console.Write($"Please enter a whole number from {min} to {max}: ");
    }
    return value;
}`
        }),
        stdin: ["3", "2", "1"],
        tests: [
          { type: "output", stdin: ["3", "2", "1"], includes: "Total points: 22", msg: "3 tries, 2 conversions and 1 penalty is 22 points.", help: "With the inputs <code>3</code>, <code>2</code>, <code>1</code>, your program should print <code>Total points: 22</code>. If you get 0, check your method ends with <code>return value;</code>" },
          { type: "output", stdin: ["3", "2", "1"], includes: "Conversions:", msg: "Use the prompt Conversions: for the second number.", help: "The second prompt should be <code>Conversions: </code>. Pass that exact text as the first argument to <code>GetIntInRange</code>." },
          { type: "output", stdin: ["three", "3", "-2", "25", "2", "1"], includes: "Total points: 22", msg: "Invalid inputs (three, -2, 25) should be rejected without crashing.", help: "This feeds in <code>three</code>, <code>3</code>, <code>-2</code>, <code>25</code>, <code>2</code>, <code>1</code>. The bad ones should be rejected without crashing, so put the TryParse loop with the <code>min</code>/<code>max</code> checks inside the method." },
          { type: "fn", stdin: ["three", "3", "-2", "25", "2", "1"], fn: (o) => count(o, "Please enter a whole number from 0 to 20") === 3, msg: "Print Please enter a whole number from 0 to 20: for each invalid input.", help: "With those same inputs, <code>Please enter a whole number from 0 to 20</code> should appear 3 times. Use <code>$\"...{min} to {max}...\"</code> inside the loop." },
          { type: "fn", fn: (o, code) => count(code, "GetIntInRange(") >= 4, msg: "Call GetIntInRange three times in Main.", help: "This check counts calls to <code>GetIntInRange(</code> in your code (the method itself plus three calls). Use it for tries, conversions and penalties." }
        ],
        hint: "Copy the validation loop from the last lesson into the method, using min and max instead of 11 and 18, then return value. In Main: int tries = GetIntInRange(\"Tries: \", 0, 20);",
        goal: "The program asks for tries, conversions and penalties (rejecting anything that isn't 0 to 20) and prints the rugby score.",
        steps: [
          "Scroll down to the <code>GetIntInRange</code> method and find <code>// TODO: show the prompt...</code>",
          "Inside the method, declare <code>int value;</code> and print the prompt with <code>Console.Write(prompt);</code>",
          "Add the validation loop from the last lesson, but use <code>min</code> and <code>max</code> instead of 11 and 18. The message is <code>$\"Please enter a whole number from {min} to {max}: \"</code>.",
          "Change <code>return 0;</code> to <code>return value;</code>",
          "Go back up to <code>Main</code>. Replace each <code>Convert.ToInt32(Console.ReadLine())</code> with a call, e.g. <code>GetIntInRange(\"Tries: \", 0, 20)</code>.",
          "Do the same for <code>Conversions: </code> and <code>Penalties: </code>. Run it with <code>3</code>, <code>2</code>, <code>1</code>: you should get <code>Total points: 22</code>."
        ],
        hints: [
          "You already wrote this loop in the last lesson. The only difference is that the limits and the prompt come in as parameters.",
          "In the method, swap the fixed numbers for <code>min</code> and <code>max</code> and finish with <code>return value;</code>. In <code>Main</code>, each input becomes one call to <code>GetIntInRange</code>.",
          "<code>int value;<br>Console.Write(prompt);<br>while (!int.TryParse(Console.ReadLine(), out value) || value &lt; min || value &gt; max)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.Write($\"Please enter a whole number from {min} to {max}: \");<br>}<br>return value;</code>"
        ],
        mistakes: [
          { wrong: "Leaving <code>return 0;</code> at the end, so every total is 0.", fix: "Return the number the user typed: <code>return value;</code>" },
          { wrong: "Writing the message without the <code>$</code>, so it literally prints <code>{min}</code> and <code>{max}</code>.", fix: "Put <code>$</code> in front of the string so the values are filled in." },
          { wrong: "Still using <code>Convert.ToInt32(Console.ReadLine())</code> in <code>Main</code>.", fix: "Replace all three lines with calls like <code>int tries = GetIntInRange(\"Tries: \", 0, 20);</code>" },
          { wrong: "Forgetting <code>Console.Write(prompt);</code>, so <code>Tries:</code> never appears.", fix: "Show the prompt once, before the <code>while</code> loop." }
        ]
      },

      // ------------------------------------------------------------------ l4
      {
        id: "m10-l4",
        title: "Syntax, logic and run-time errors",
        type: "code",
        learn: cs`
<p>Every programmer writes bugs. What matters is spotting which <em>kind</em> of error you have, because each one is found and fixed differently.</p>
<table>
<tr><th>Error</th><th>What happens</th><th>Example</th></tr>
<tr><td><strong>Syntax</strong></td><td>The code breaks the rules of the language, so it won't compile or run at all. The compiler tells you the line.</td><td>Missing <code>;</code>, misspelt <code>Consle</code>, missing <code>}</code></td></tr>
<tr><td><strong>Logic</strong></td><td>The program runs but gives the <em>wrong answer</em>. No error message appears, so these are the hardest to find.</td><td><code>&gt;</code> instead of <code>&gt;=</code>, wrong brackets in a sum</td></tr>
<tr><td><strong>Run-time</strong></td><td>The program compiles but crashes while running, when something impossible happens.</td><td>Dividing by zero, converting <code>abc</code> to an int, an array index that doesn't exist</td></tr>
</table>
<h3>Spot the logic errors</h3>
${pre(cs`
int a = 6, b = 8, c = 10;
double average = a + b + c / 3;    // gives 17, not 8
if (average > 8)                  // should 8 count?`)}
<p>Two problems. First, <strong>BIDMAS</strong>: division happens before addition, so only <code>c</code> is divided by 3. Second, <code>c / 3</code> is <code>int</code> divided by <code>int</code>, which throws away the remainder. The fix is brackets and dividing by <code>3.0</code>:</p>
${pre(cs`
double average = (a + b + c) / 3.0;   // 8`)}
<p>Then think about the boundary. If 8 should count, the condition must be <code>&gt;= 8</code>, not <code>&gt; 8</code>. Testing with values right on the boundary is how you catch this.</p>
<div class="tip">To find logic errors, work out the expected answer by hand first, then compare it with what the program prints. A <strong>trace table</strong> helps you follow the values line by line.</div>`,
        instructions: [
          "The starter runs, but it has <strong>two logic errors</strong>. A pupil passes if their average mark is <strong>50 or more</strong>.",
          "Fix the average so it is the correct mean of the three marks (marks 50, 60 and 56 should give <code>Average: 55.3</code>).",
          "Fix the condition so an average of exactly 50 prints <code>Result: Pass</code>. Below 50 should print <code>Result: Fail</code>."
        ],
        starter: prog(cs`
Console.Write("Mark 1: ");
int mark1 = Convert.ToInt32(Console.ReadLine());
Console.Write("Mark 2: ");
int mark2 = Convert.ToInt32(Console.ReadLine());
Console.Write("Mark 3: ");
int mark3 = Convert.ToInt32(Console.ReadLine());

double average = mark1 + mark2 + mark3 / 3;
Console.WriteLine($"Average: {average:F1}");

if (average > 50)
{
    Console.WriteLine("Result: Pass");
}
else
{
    Console.WriteLine("Result: Fail");
}`),
        solution: prog(cs`
Console.Write("Mark 1: ");
int mark1 = Convert.ToInt32(Console.ReadLine());
Console.Write("Mark 2: ");
int mark2 = Convert.ToInt32(Console.ReadLine());
Console.Write("Mark 3: ");
int mark3 = Convert.ToInt32(Console.ReadLine());

double average = (mark1 + mark2 + mark3) / 3.0;
Console.WriteLine($"Average: {average:F1}");

if (average >= 50)
{
    Console.WriteLine("Result: Pass");
}
else
{
    Console.WriteLine("Result: Fail");
}`),
        stdin: ["50", "60", "56"],
        tests: [
          { type: "output", stdin: ["50", "60", "56"], includes: "Average: 55.3", msg: "Marks 50, 60 and 56 should give Average: 55.3 (check the brackets and the int division).", help: "With marks <code>50</code>, <code>60</code>, <code>56</code>, it should print <code>Average: 55.3</code>. Add brackets round the three marks and divide by <code>3.0</code>." },
          { type: "output", stdin: ["40", "45", "47"], includes: "Result: Fail", msg: "Marks 40, 45 and 47 average 44.0, which is a Fail.", help: "With marks <code>40</code>, <code>45</code>, <code>47</code> (average 44.0) it should print <code>Result: Fail</code>. Fix the average calculation first; the wrong formula gives a huge number that always passes." },
          { type: "output", stdin: ["49", "50", "51"], includes: "Result: Pass", msg: "An average of exactly 50 should be a Pass.", help: "With marks <code>49</code>, <code>50</code>, <code>51</code> (average exactly 50) it should print <code>Result: Pass</code>. Change <code>&gt;</code> to <code>&gt;=</code>." },
          { type: "output", stdin: ["49", "50", "51"], includes: "Average: 50.0", msg: "Marks 49, 50 and 51 should give Average: 50.0", help: "With marks <code>49</code>, <code>50</code>, <code>51</code> it should print <code>Average: 50.0</code>. Check the brackets and the <code>3.0</code> in your average line." }
        ],
        hint: "Put brackets round the three marks and divide by 3.0. Then change > to >=.",
        goal: "The program reads three marks, prints their correct average to 1 decimal place, and says Pass for 50 or more.",
        steps: [
          "Press Run with <code>50</code>, <code>60</code>, <code>56</code> and note the wrong average it prints. Work out the right answer by hand: (50 + 60 + 56) ÷ 3.",
          "Find the line <code>double average = mark1 + mark2 + mark3 / 3;</code>",
          "Put brackets round the three marks so they're added first: <code>(mark1 + mark2 + mark3)</code>.",
          "Change <code>/ 3</code> to <code>/ 3.0</code> so the decimal part isn't thrown away. Run it: you should see <code>Average: 55.3</code>.",
          "Find <code>if (average &gt; 50)</code> and change it so exactly 50 passes.",
          "Run with <code>49</code>, <code>50</code>, <code>51</code>: it should say <code>Average: 50.0</code> and <code>Result: Pass</code>."
        ],
        hints: [
          "There are two bugs: one in the calculation and one in the <code>if</code>. Work the answer out by hand and compare it with what the program prints.",
          "BIDMAS means division happens before addition, and <code>int / int</code> drops the remainder. For the condition, think about whether 50 itself should pass.",
          "<code>double average = (mark1 + mark2 + mark3) / 3.0;</code> and <code>if (average &gt;= 50)</code>"
        ],
        mistakes: [
          { wrong: "Adding brackets but still dividing by <code>3</code>, so 166 / 3 gives 55 and prints <code>55.0</code>.", fix: "Divide by <code>3.0</code> so C# does decimal division and keeps the <code>.3</code>." },
          { wrong: "Dividing by <code>3.0</code> but forgetting the brackets, so only <code>mark3</code> is divided.", fix: "Brackets go round all three marks: <code>(mark1 + mark2 + mark3) / 3.0</code>." },
          { wrong: "Leaving <code>&gt; 50</code>, so an average of exactly 50 fails.", fix: "Use <code>&gt;= 50</code>. Boundary values are exactly where this kind of logic error hides." }
        ]
      },

      // ------------------------------------------------------------------ l5
      {
        id: "m10-l5",
        title: "Catching exceptions with try and catch",
        type: "code",
        learn: cs`
<p>When a run-time error happens, C# <strong>throws an exception</strong>. If nothing catches it, the program crashes with a message like:</p>
${out(cs`Unhandled exception. System.FormatException: The input string 'ten' was not in a correct format.`)}
<p>You can <strong>catch</strong> exceptions so the program deals with the problem calmly. Put the risky code in a <code>try</code> block, and the code to run if it goes wrong in a <code>catch</code> block:</p>
${pre(cs`
try
{
    Console.Write("How many pizzas? ");
    int pizzas = int.Parse(Console.ReadLine());
    Console.Write("How many people? ");
    int people = int.Parse(Console.ReadLine());
    Console.WriteLine($"Each person gets {8 * pizzas / people} slices");
}
catch (FormatException)
{
    Console.WriteLine("Numbers only, please.");
}
catch (DivideByZeroException)
{
    Console.WriteLine("Nobody to share with!");
}
Console.WriteLine("Enjoy!");`)}
<p>As soon as an exception is thrown, C# jumps out of the <code>try</code> block (skipping the rest of it) to the first matching <code>catch</code>. Afterwards the program carries on after the last <code>catch</code>.</p>
<h3>Common exceptions</h3>
<ul>
<li><code>FormatException</code>: text can't be converted to a number.</li>
<li><code>DivideByZeroException</code>: an <code>int</code> divided by 0.</li>
<li><code>IndexOutOfRangeException</code>: an array index that doesn't exist.</li>
</ul>
<p>Write <code>catch (FormatException ex)</code> if you want the details: <code>ex.Message</code> holds the error text. <code>catch (Exception ex)</code> catches <em>every</em> kind, but specific catches let you give a helpful message for each problem.</p>
<div class="tip">Validation stops bad data getting in; exception handling is the safety net for anything that still goes wrong.</div>`,
        instructions: [
          "Wrap the bill-splitting code in a <code>try</code> block.",
          "Catch <code>FormatException</code> and print <code>Please type whole numbers only.</code>",
          "Catch <code>DivideByZeroException</code> and print <code>You can't split the bill between 0 people.</code>",
          "Leave <code>Thanks for using Bill Splitter.</code> <em>after</em> the catches so it always prints."
        ],
        starter: prog(cs`
Console.Write("Total bill (£): ");
int total = int.Parse(Console.ReadLine());
Console.Write("Number of people: ");
int people = int.Parse(Console.ReadLine());
Console.WriteLine($"Each person pays £{total / people}");

Console.WriteLine("Thanks for using Bill Splitter.");`),
        solution: prog(cs`
try
{
    Console.Write("Total bill (£): ");
    int total = int.Parse(Console.ReadLine());
    Console.Write("Number of people: ");
    int people = int.Parse(Console.ReadLine());
    Console.WriteLine($"Each person pays £{total / people}");
}
catch (FormatException)
{
    Console.WriteLine("Please type whole numbers only.");
}
catch (DivideByZeroException)
{
    Console.WriteLine("You can't split the bill between 0 people.");
}

Console.WriteLine("Thanks for using Bill Splitter.");`),
        stdin: ["30", "3"],
        tests: [
          { type: "output", stdin: ["30", "3"], includes: "Each person pays £10", msg: "A £30 bill between 3 people should print Each person pays £10", help: "With <code>30</code> and <code>3</code>, it should still print <code>Each person pays £10</code>. Make sure that line is inside your <code>try</code> block." },
          { type: "output", stdin: ["thirty", "3"], includes: "Please type whole numbers only.", msg: "Typing thirty should print Please type whole numbers only.", help: "With <code>thirty</code> as the bill, it should print <code>Please type whole numbers only.</code> Add <code>catch (FormatException)</code> and make sure the <code>try</code> starts before the first <code>int.Parse</code>." },
          { type: "output", stdin: ["30", "0"], includes: "You can't split the bill between 0 people.", msg: "0 people should print You can't split the bill between 0 people.", help: "With <code>30</code> and <code>0</code>, it should print <code>You can't split the bill between 0 people.</code> Add <code>catch (DivideByZeroException)</code> with that exact message." },
          { type: "output", stdin: ["30", "0"], includes: "Thanks for using Bill Splitter.", msg: "Thanks for using Bill Splitter. should still print after an error.", help: "With <code>30</code> and <code>0</code>, <code>Thanks for using Bill Splitter.</code> must still appear. Move it after the last <code>catch</code>, outside the <code>try</code>." },
          { type: "code", pattern: "catch\\s*\\(\\s*DivideByZeroException", msg: "Catch DivideByZeroException specifically.", help: "This check looks for <code>catch (DivideByZeroException</code> in your code. A general <code>catch (Exception)</code> doesn't count." }
        ],
        hint: "try { ...the four input lines and the WriteLine... } catch (FormatException) { ... } catch (DivideByZeroException) { ... }",
        goal: "The program splits a bill between people and, instead of crashing, gives a friendly message for letters or 0 people.",
        steps: [
          "Run the starter and type <code>thirty</code>: see the crash. That's the problem you're fixing.",
          "Type <code>try</code> and an opening <code>{</code> on the line above <code>Console.Write(\"Total bill (£): \");</code>",
          "Put the closing <code>}</code> after the <code>Each person pays</code> line. Leave the <code>Thanks</code> line outside.",
          "Straight after the <code>}</code>, add <code>catch (FormatException)</code> with a block that prints <code>Please type whole numbers only.</code>",
          "Add a second <code>catch (DivideByZeroException)</code> that prints <code>You can't split the bill between 0 people.</code>",
          "Run it with <code>30</code> and <code>0</code>: you should see the 0 people message and then the thanks line."
        ],
        hints: [
          "Wrap the risky lines (the ones that read and divide) so that if something goes wrong, C# jumps to your own message instead of crashing.",
          "Use a <code>try { }</code> block round the four input lines and the <code>WriteLine</code>, then two <code>catch</code> blocks, one per kind of exception.",
          "<code>catch (FormatException)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\"Please type whole numbers only.\");<br>}<br>catch (DivideByZeroException)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\"You can't split the bill between 0 people.\");<br>}</code>"
        ],
        mistakes: [
          { wrong: "Putting the <code>Thanks for using Bill Splitter.</code> line inside the <code>try</code>, so it's skipped when an error happens.", fix: "Leave it after the last <code>catch</code> so it always runs." },
          { wrong: "Using one <code>catch (Exception)</code> for everything.", fix: "Write a separate <code>catch</code> for <code>FormatException</code> and for <code>DivideByZeroException</code> so each gets its own message." },
          { wrong: "Putting <code>catch (Exception)</code> first, above the specific catches.", fix: "C# uses the first matching catch, so a general <code>Exception</code> catch would swallow everything. Put specific ones first (or leave the general one out)." },
          { wrong: "Only wrapping the division line, so <code>thirty</code> still crashes at <code>int.Parse</code>.", fix: "The <code>try</code> must start before the first <code>int.Parse</code>." }
        ]
      },

      // ------------------------------------------------------------------ l6
      {
        id: "m10-l6",
        title: "Index errors and finally",
        type: "code",
        learn: cs`
<p>Arrays are a common source of run-time errors. An array with 5 items has indexes 0 to 4, so asking for item <code>[5]</code> or <code>[-1]</code> throws an <code>IndexOutOfRangeException</code> with the message <code>Index was outside the bounds of the array.</code></p>
<p>Users count from 1 but arrays count from 0, so you'll often subtract 1. If the user types a number that's too big or too small, the exception is your safety net.</p>
<h3>finally</h3>
<p>A <code>finally</code> block goes after the catches. It runs <strong>every time</strong>: whether the <code>try</code> worked, an exception was caught, or even if the method returns early. It's used for tidying up, such as closing a file or printing a status message.</p>
${pre(cs`
string[] positions = { "Prop", "Hooker", "Lock", "Flanker", "Scrum-half" };
Console.Write("Position number (1-5): ");
try
{
    int n = int.Parse(Console.ReadLine());
    Console.WriteLine($"Number {n} is {positions[n - 1]}");
}
catch (FormatException)
{
    Console.WriteLine("Type a number.");
}
catch (IndexOutOfRangeException)
{
    Console.WriteLine("No such position.");
}
finally
{
    Console.WriteLine("Lookup complete.");
}`)}
${out(cs`
Position number (1-5): 7
No such position.
Lookup complete.`)}
<div class="warn">Catching an exception isn't an excuse to skip validation. Here a range check would work too. But try/catch protects you from cases you didn't think of.</div>`,
        instructions: [
          "The starter looks up a pet by number. Put the risky lines in a <code>try</code> block.",
          "Catch <code>FormatException</code> and print <code>That is not a number.</code>",
          "Catch <code>IndexOutOfRangeException</code> and print <code>There is no pet with that number.</code>",
          "Add a <code>finally</code> block that prints <code>Search finished.</code>"
        ],
        starter: prog(cs`
string[] pets = { "Biscuit", "Luna", "Max", "Pepper", "Shadow" };

Console.Write("Enter a pet number (1-5): ");
int number = int.Parse(Console.ReadLine());
Console.WriteLine($"Pet {number} is {pets[number - 1]}.");`),
        solution: prog(cs`
string[] pets = { "Biscuit", "Luna", "Max", "Pepper", "Shadow" };

Console.Write("Enter a pet number (1-5): ");
try
{
    int number = int.Parse(Console.ReadLine());
    Console.WriteLine($"Pet {number} is {pets[number - 1]}.");
}
catch (FormatException)
{
    Console.WriteLine("That is not a number.");
}
catch (IndexOutOfRangeException)
{
    Console.WriteLine("There is no pet with that number.");
}
finally
{
    Console.WriteLine("Search finished.");
}`),
        stdin: ["2"],
        tests: [
          { type: "output", stdin: ["2"], includes: "Pet 2 is Luna.", msg: "Number 2 should print Pet 2 is Luna.", help: "With the input <code>2</code>, it should print <code>Pet 2 is Luna.</code> Keep the original <code>WriteLine</code> inside your <code>try</code> and don't change <code>number - 1</code>." },
          { type: "output", stdin: ["9"], includes: "There is no pet with that number.", msg: "Number 9 should print There is no pet with that number.", help: "With the input <code>9</code>, it should print <code>There is no pet with that number.</code> Add <code>catch (IndexOutOfRangeException)</code>." },
          { type: "output", stdin: ["two"], includes: "That is not a number.", msg: "Typing two should print That is not a number.", help: "With the input <code>two</code>, it should print <code>That is not a number.</code> Add <code>catch (FormatException)</code> and make sure <code>int.Parse</code> is inside the <code>try</code>." },
          { type: "fn", stdin: ["2"], fn: (o) => o.includes("Search finished.") && o.indexOf("Search finished.") > o.indexOf("Luna"), msg: "Search finished. should print at the end, even when nothing goes wrong.", help: "With the input <code>2</code>, <code>Search finished.</code> must print after <code>Luna</code>. Put it in a <code>finally</code> block after the catches." },
          { type: "code", pattern: "finally", msg: "Use a finally block.", help: "This check looks for the word <code>finally</code> in your code. Add a <code>finally { }</code> block after the last <code>catch</code>." }
        ],
        hint: "try { parse and print } catch (FormatException) { } catch (IndexOutOfRangeException) { } finally { Console.WriteLine(\"Search finished.\"); }",
        goal: "The program looks up a pet by number, gives a clear message for letters or numbers that don't exist, and always ends with Search finished.",
        steps: [
          "Run the starter with <code>9</code> and then with <code>two</code> to see both crashes.",
          "Leave the <code>pets</code> array and the prompt where they are. Put <code>try {</code> above the <code>int.Parse</code> line and <code>}</code> after the <code>Pet ... is</code> line.",
          "Add <code>catch (FormatException)</code> that prints <code>That is not a number.</code>",
          "Add <code>catch (IndexOutOfRangeException)</code> that prints <code>There is no pet with that number.</code>",
          "After the last catch, add <code>finally { Console.WriteLine(\"Search finished.\"); }</code>",
          "Run with <code>2</code>, <code>9</code> and <code>two</code>. <code>Search finished.</code> should appear every time."
        ],
        hints: [
          "Two different things can go wrong: the text isn't a number, or the number points outside the array. You also need a line that runs no matter what.",
          "Use <code>try</code>, then a <code>catch</code> for <code>FormatException</code> and one for <code>IndexOutOfRangeException</code>, then a <code>finally</code> block.",
          "<code>catch (IndexOutOfRangeException)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\"There is no pet with that number.\");<br>}<br>finally<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\"Search finished.\");<br>}</code>"
        ],
        mistakes: [
          { wrong: "Printing <code>Search finished.</code> as a normal line after the catches instead of in <code>finally</code>.", fix: "It may print, but the task is to practise <code>finally</code>. Put it in a <code>finally { }</code> block." },
          { wrong: "Putting <code>finally</code> before a <code>catch</code>.", fix: "The order is always <code>try</code>, then every <code>catch</code>, then <code>finally</code> last." },
          { wrong: "Changing <code>pets[number - 1]</code> to <code>pets[number]</code>, so 2 shows Max.", fix: "Users count from 1 but arrays start at 0, so keep the <code>- 1</code>." }
        ]
      },

      // ------------------------------------------------------------------ l7
      {
        id: "m10-l7",
        title: "Throwing your own exceptions",
        type: "code",
        learn: cs`
<p>Sometimes <em>your</em> code spots a problem that C# wouldn't notice. A ticket price for an age of <code>-4</code> makes no sense, but the maths would still work. You can <strong>throw</strong> an exception yourself:</p>
${pre(cs`
throw new ArgumentException("Age cannot be negative.");`)}
<p><code>throw</code> stops the method immediately and hands the exception back to whoever called it. The caller decides what to do, usually by catching it and showing <code>ex.Message</code>.</p>
${pre(cs`
static int LapsNeeded(int distance)
{
    if (distance <= 0)
    {
        throw new ArgumentException("Distance must be more than 0.");
    }
    return distance / 400;
}

static void Main(string[] args)
{
    try
    {
        Console.WriteLine(LapsNeeded(1600));   // 4
        Console.WriteLine(LapsNeeded(-50));    // throws
    }
    catch (ArgumentException ex)
    {
        Console.WriteLine("Error: " + ex.Message);
    }
}`)}
${out(cs`
4
Error: Distance must be more than 0.`)}
<p>Why not just print the error inside the method? Because the method might be used in a console app today and a website tomorrow. Throwing lets the <em>caller</em> decide how to report it. It also means the method never returns a misleading value.</p>
<div class="key"><strong>throw</strong> creates an exception and sends it up to the calling code. <code>ArgumentException</code> is the usual choice when a method is given a bad parameter. Inside a <code>catch</code>, <code>throw;</code> on its own passes the same exception on.</div>`,
        instructions: [
          "In <code>TicketPrice</code>, throw an <code>ArgumentException</code> with the message <code>Age cannot be negative.</code> if <code>age</code> is less than 0, and <code>Age is too high.</code> if it is more than 120.",
          "In <code>Main</code>, wrap the code in <code>try</code> and catch <code>ArgumentException ex</code>, printing <code>Error: </code> followed by <code>ex.Message</code>.",
          "Also catch <code>FormatException</code> and print <code>Error: please enter a whole number.</code>"
        ],
        starter: prog(cs`
Console.Write("Enter your age: ");
int age = int.Parse(Console.ReadLine());
double price = TicketPrice(age);
Console.WriteLine($"Ticket price: £{price:F2}");`, {
          after: cs`
static double TicketPrice(int age)
{
    // TODO: throw ArgumentException for ages below 0 or above 120

    if (age < 12)
    {
        return 5.50;
    }
    return 8.00;
}`
        }),
        solution: prog(cs`
Console.Write("Enter your age: ");
try
{
    int age = int.Parse(Console.ReadLine());
    double price = TicketPrice(age);
    Console.WriteLine($"Ticket price: £{price:F2}");
}
catch (ArgumentException ex)
{
    Console.WriteLine("Error: " + ex.Message);
}
catch (FormatException)
{
    Console.WriteLine("Error: please enter a whole number.");
}`, {
          after: cs`
static double TicketPrice(int age)
{
    if (age < 0)
    {
        throw new ArgumentException("Age cannot be negative.");
    }
    if (age > 120)
    {
        throw new ArgumentException("Age is too high.");
    }

    if (age < 12)
    {
        return 5.50;
    }
    return 8.00;
}`
        }),
        stdin: ["9"],
        tests: [
          { type: "output", stdin: ["9"], includes: "Ticket price: £5.50", msg: "Age 9 should print Ticket price: £5.50", help: "With the input <code>9</code>, it should print <code>Ticket price: £5.50</code>. Make sure the normal path still reaches the price line inside your <code>try</code>." },
          { type: "output", stdin: ["-4"], includes: "Error: Age cannot be negative.", msg: "Age -4 should print Error: Age cannot be negative.", help: "With the input <code>-4</code>, it should print <code>Error: Age cannot be negative.</code> Throw that exact message in <code>TicketPrice</code> and print <code>\"Error: \" + ex.Message</code> in the catch." },
          { type: "output", stdin: ["130"], includes: "Error: Age is too high.", msg: "Age 130 should print Error: Age is too high.", help: "With the input <code>130</code>, it should print <code>Error: Age is too high.</code> Add a second check for <code>age &gt; 120</code>." },
          { type: "output", stdin: ["old"], includes: "Error: please enter a whole number.", msg: "Typing old should print Error: please enter a whole number.", help: "With the input <code>old</code>, it should print <code>Error: please enter a whole number.</code> Add <code>catch (FormatException)</code> and make sure <code>int.Parse</code> is inside the <code>try</code>." },
          { type: "code", pattern: "throw\\s+new\\s+ArgumentException", msg: "Throw an ArgumentException in TicketPrice.", help: "This check looks for <code>throw new ArgumentException</code> in your code. Don't just print the error in <code>TicketPrice</code>; throw it." }
        ],
        hint: "if (age < 0) { throw new ArgumentException(\"Age cannot be negative.\"); } Then in Main: try { ... } catch (ArgumentException ex) { Console.WriteLine(\"Error: \" + ex.Message); }",
        goal: "The program works out a ticket price from your age and shows a clear error for negative ages, ages over 120, or text.",
        steps: [
          "Scroll down to <code>TicketPrice</code> and find <code>// TODO: throw ArgumentException...</code>",
          "Add <code>if (age &lt; 0)</code> with <code>throw new ArgumentException(\"Age cannot be negative.\");</code> inside.",
          "Add <code>if (age &gt; 120)</code> that throws <code>new ArgumentException(\"Age is too high.\")</code>.",
          "Go up to <code>Main</code>. Wrap the parse, the <code>TicketPrice</code> call and the price line in <code>try { }</code> (the prompt can stay outside).",
          "Add <code>catch (ArgumentException ex)</code> that prints <code>\"Error: \" + ex.Message</code>.",
          "Add <code>catch (FormatException)</code> that prints <code>Error: please enter a whole number.</code> Run with <code>-4</code>, <code>130</code> and <code>old</code> to test."
        ],
        hints: [
          "The method spots the bad age and sends an exception back to <code>Main</code>; <code>Main</code> catches it and prints the message that came with it.",
          "In <code>TicketPrice</code>, use <code>throw new ArgumentException(\"...\")</code>. In <code>Main</code>, catch it as <code>ArgumentException ex</code> so you can print <code>ex.Message</code>.",
          "<code>catch (ArgumentException ex)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\"Error: \" + ex.Message);<br>}</code>"
        ],
        mistakes: [
          { wrong: "Printing the error inside <code>TicketPrice</code> with <code>Console.WriteLine</code> instead of throwing.", fix: "Use <code>throw new ArgumentException(\"...\")</code>. The method then stops and <code>Main</code> decides what to show." },
          { wrong: "Forgetting <code>new</code>: <code>throw ArgumentException(\"...\")</code>.", fix: "An exception is an object, so you create it with <code>throw new ArgumentException(...)</code>." },
          { wrong: "Writing <code>catch (ArgumentException)</code> without <code>ex</code>, then trying to use <code>ex.Message</code>.", fix: "Give the exception a name: <code>catch (ArgumentException ex)</code>." },
          { wrong: "Leaving <code>int.Parse</code> outside the <code>try</code>, so <code>old</code> still crashes.", fix: "Move the parse line inside the <code>try</code> as well." }
        ]
      },

      // ------------------------------------------------------------------ l8
      {
        id: "m10-l8",
        title: "Test data and test plans",
        type: "read",
        learn: cs`
<p>You can't prove a program works by trying it once with a "nice" value. Good testing is planned <em>before</em> you run anything, using three kinds of test data.</p>
<table>
<tr><th>Type</th><th>Meaning</th><th>For an age from 11 to 18</th></tr>
<tr><td><strong>Normal</strong> (valid)</td><td>Typical data the program should accept</td><td>14</td></tr>
<tr><td><strong>Boundary</strong> (extreme)</td><td>Values at the very edges of what's allowed, plus just outside them</td><td>11 and 18 (accept); 10 and 19 (reject)</td></tr>
<tr><td><strong>Erroneous</strong> (invalid)</td><td>Data that should be rejected: wrong type, out of range, blank</td><td><code>fourteen</code>, -3, 99, blank</td></tr>
</table>
<div class="tip">Boundary tests find the <code>&gt;</code> vs <code>&gt;=</code> logic errors you met earlier. If 18 is rejected, you've found a bug.</div>
<h3>A test plan</h3>
<p>A <strong>test plan</strong> is a table written in advance. Each row says what you're testing, the data, the type of data and the <strong>expected result</strong>. When you run the test you fill in the <strong>actual result</strong>. If they differ, you've found a bug to fix and re-test.</p>
<p>Here's a plan for the age validation loop from earlier in this module:</p>
<table>
<tr><th>No.</th><th>Test</th><th>Data</th><th>Type</th><th>Expected result</th><th>Actual result</th></tr>
<tr><td>1</td><td>Typical age accepted</td><td>14</td><td>Normal</td><td><code>Age accepted: 14</code></td><td>As expected</td></tr>
<tr><td>2</td><td>Lowest age accepted</td><td>11</td><td>Boundary</td><td><code>Age accepted: 11</code></td><td>As expected</td></tr>
<tr><td>3</td><td>Highest age accepted</td><td>18</td><td>Boundary</td><td><code>Age accepted: 18</code></td><td>As expected</td></tr>
<tr><td>4</td><td>Just too young</td><td>10</td><td>Boundary / Erroneous</td><td>Error message, asked again</td><td>As expected</td></tr>
<tr><td>5</td><td>Just too old</td><td>19</td><td>Boundary / Erroneous</td><td>Error message, asked again</td><td>As expected</td></tr>
<tr><td>6</td><td>Text instead of number</td><td>fourteen</td><td>Erroneous</td><td>Error message, no crash</td><td>As expected</td></tr>
<tr><td>7</td><td>Nothing entered</td><td>(blank)</td><td>Erroneous</td><td>Error message, no crash</td><td>As expected</td></tr>
</table>
<h3>Tips for your coursework</h3>
<ul>
<li>Test <strong>every</strong> input and every menu option, not just the main one.</li>
<li>Write the expected result precisely, e.g. the exact message, so anyone could run the test.</li>
<li>Take screenshots as evidence of the actual results.</li>
<li>When a test fails, record the fix you made and run the test again.</li>
</ul>
<div class="key"><strong>Test data</strong> values chosen to check a program works correctly: normal, boundary (extreme) and erroneous.</div>`
      },

      // ------------------------------------------------------------------ quiz
      {
        id: "m10-quiz",
        title: "Checkpoint: validation and errors",
        type: "quiz",
        questions: [
          { q: "A form rejects a postcode unless it matches a pattern like <code>BT74 6AB</code>. Which validation check is this?",
            options: ["Range check", "Format check", "Presence check", "Lookup check"],
            answer: 1, explain: "A format check makes sure data follows a set pattern." },
          { q: "Which check makes sure a year group is one of 8, 9, 10, 11 or 12?",
            options: ["Length check", "Type check", "Lookup check", "Presence check"],
            answer: 2, explain: "A lookup check compares the input with a list of allowed values." },
          { q: "What does <code>int.TryParse(\"ten\", out n)</code> do?",
            options: ["Crashes with a FormatException", "Returns false and sets n to 0", "Returns true and sets n to 10", "Returns \"ten\""],
            answer: 1, explain: "TryParse never crashes. It returns false when the text isn't a whole number." },
          { q: "A program compiles and runs, but calculates the wrong average. What kind of error is this?",
            options: ["Syntax error", "Run-time error", "Logic error", "Exception error"],
            answer: 2, explain: "Logic errors give wrong results without any error message." },
          { q: "Which exception is thrown by <code>int[] a = new int[3]; a[3] = 1;</code>?",
            options: ["FormatException", "DivideByZeroException", "IndexOutOfRangeException", "NullReferenceException"],
            answer: 2, explain: "The indexes are 0, 1 and 2, so index 3 is outside the bounds of the array." },
          { q: "When does a <code>finally</code> block run?",
            options: ["Only if an exception was caught", "Only if no exception happened", "Always, after the try (and any catch)", "Only when the program ends"],
            answer: 2, explain: "finally always runs, which makes it ideal for tidying up." },
          { q: "An input must be from 1 to 100. Which set is <strong>boundary</strong> test data?",
            options: ["50 and 75", "1, 100, 0 and 101", "\"abc\" and blank", "-500 and 5000"],
            answer: 1, explain: "Boundary data sits on the edges of the valid range and just outside it." },
          { q: "Typing a new password twice to make sure it matches is an example of…",
            options: ["Validation", "Verification", "Encryption", "A range check"],
            answer: 1, explain: "Double entry is verification: checking data was entered accurately." }
        ]
      }
    ]
  });
})();
