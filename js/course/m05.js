// Module 5: Selection
(function () {
  // Wraps a Main body (and optional class-level members) in the full Program shape.
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

  COURSE.addModule({
    id: "m05",
    title: "Selection",
    icon: "branch",
    summary: "Make decisions with if, else if, switch and the ternary operator.",
    lessons: [
      // ---------------------------------------------------------------- l1
      {
        id: "m05-l1",
        title: "Decisions with if and else",
        type: "code",
        learn: `
<p>So far your programs have run every line from top to bottom. Real programs need to make <strong>decisions</strong>: should the game say "You win" or "Game over"? Choosing which code to run is called <strong>selection</strong>.</p>
<div class="key"><strong>Selection</strong> running different code depending on whether a condition is true or false.</div>
<p>An <code>if</code> statement checks a <strong>condition</strong>. If it is <code>true</code>, the code inside the curly brackets runs. An optional <code>else</code> block runs when the condition is <code>false</code>.</p>
<pre><code class="cs">Console.Write("How many lives? ");
int lives = Convert.ToInt32(Console.ReadLine());

if (lives > 0)
{
    Console.WriteLine("Keep playing!");
}
else
{
    Console.WriteLine("Game over.");
}
Console.WriteLine("Thanks for playing.");   // always runs</code></pre>
<h3>Comparison operators</h3>
<table>
<tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
<tr><td><code>==</code></td><td>equal to</td><td><code>score == 10</code></td></tr>
<tr><td><code>!=</code></td><td>not equal to</td><td><code>answer != "yes"</code></td></tr>
<tr><td><code>&gt;</code></td><td>greater than</td><td><code>temp &gt; 20</code></td></tr>
<tr><td><code>&lt;</code></td><td>less than</td><td><code>age &lt; 12</code></td></tr>
<tr><td><code>&gt;=</code></td><td>greater than or equal to</td><td><code>mark &gt;= 40</code></td></tr>
<tr><td><code>&lt;=</code></td><td>less than or equal to</td><td><code>money &lt;= 0</code></td></tr>
</table>
<div class="warn">One <code>=</code> <em>stores</em> a value. Two <code>==</code> <em>compare</em> values. Writing <code>if (lives = 0)</code> is a compile error in C#.</div>
<div class="tip">Notice there is no semicolon after <code>if (...)</code>. The curly brackets show which lines belong to the <code>if</code>.</div>`,
        instructions: [
          "The starter already reads a whole-number temperature into <code>temp</code>.",
          "If <code>temp</code> is greater than 20, print <code>Shorts weather!</code>",
          "Otherwise (use <code>else</code>) print <code>Bring a jumper!</code>",
          "After the if/else, always print <code>Have a good day.</code>"
        ],
        starter: prog(`
Console.Write("Enter the temperature: ");
int temp = Convert.ToInt32(Console.ReadLine());

// TODO: if temp is greater than 20, print Shorts weather!
// TODO: else print Bring a jumper!

// TODO: always print Have a good day.`),
        solution: prog(`
Console.Write("Enter the temperature: ");
int temp = Convert.ToInt32(Console.ReadLine());

if (temp > 20)
{
    Console.WriteLine("Shorts weather!");
}
else
{
    Console.WriteLine("Bring a jumper!");
}

Console.WriteLine("Have a good day.");`),
        stdin: ["25"],
        tests: [
          { type: "output", stdin: ["25"], includes: "Shorts weather!", msg: "When the temperature is 25 it should print Shorts weather!", help: "When the temperature entered is <code>25</code>, your program should print <code>Shorts weather!</code>. Check your condition is <code>temp &gt; 20</code> and the message is spelled exactly right." },
          { type: "fn", stdin: ["25"], fn: (out) => !/jumper/i.test(out), msg: "When it's 25, don't print Bring a jumper!", help: "When the temperature entered is <code>25</code>, the jumper message must not appear. Make sure <code>Bring a jumper!</code> is inside an <code>else</code> block, not on its own after the <code>if</code>." },
          { type: "output", stdin: ["20"], includes: "Bring a jumper!", msg: "20 is not greater than 20, so it should print Bring a jumper!", help: "When the temperature entered is <code>20</code>, your program should print <code>Bring a jumper!</code>. 20 is not greater than 20, so check you used <code>&gt;</code> and not <code>&gt;=</code>." },
          { type: "output", stdin: ["8"], includes: "Have a good day.", msg: "Always print Have a good day. at the end.", help: "When the temperature entered is <code>8</code>, your program should still end with <code>Have a good day.</code>. Put that line after the whole if/else, not inside it." },
          { type: "code", pattern: "else", msg: "Use an else block.", help: "The checker looks for the word <code>else</code> in your code. Use an <code>else</code> block for the jumper message rather than a second <code>if</code>." }
        ],
        hint: "if (temp > 20) { ... } else { ... } and then put the last WriteLine after the closing bracket of the else.",
        goal: "The program asks for the temperature, tells you whether it's shorts weather or jumper weather, and then always says Have a good day.",
        steps: [
          "Find the line <code>// TODO: if temp is greater than 20</code>. You'll write your code just under it.",
          "Type the condition <code>if (temp &gt; 20)</code> with a pair of curly brackets <code>{ }</code> on the lines underneath.",
          "Inside those brackets, print <code>Shorts weather!</code> with <code>Console.WriteLine(\"Shorts weather!\");</code>. Press <strong>Run</strong> and type 25: you should see it.",
          "Straight after the closing <code>}</code>, type <code>else</code> with its own pair of curly brackets.",
          "Inside the <code>else</code> brackets, print <code>Bring a jumper!</code>. Run it again and type 8 to check.",
          "Under the <code>// TODO: always print</code> comment (outside both sets of brackets), print <code>Have a good day.</code>. Run with 25 and with 8: both should end with that line."
        ],
        hints: [
          "There are two possible messages and only one should appear. That's a job for <code>if</code> and <code>else</code>.",
          "Use <code>if (temp &gt; 20)</code> for the shorts message and a plain <code>else</code> for the jumper message. The last <code>WriteLine</code> goes after the <code>else</code> block finishes.",
          "<code>if (temp &gt; 20)\n{\n    Console.WriteLine(\"Shorts weather!\");\n}\nelse\n{\n    Console.WriteLine(\"Bring a jumper!\");\n}</code>"
        ],
        mistakes: [
          { wrong: "Putting a semicolon after the condition: <code>if (temp &gt; 20);</code>", fix: "Remove the semicolon. It ends the <code>if</code> straight away, so the brackets underneath always run." },
          { wrong: "Using <code>&gt;=</code> instead of <code>&gt;</code>, so 20 counts as shorts weather.", fix: "The task says <em>greater than</em> 20, so 20 itself should get the jumper message. Use <code>temp &gt; 20</code>." },
          { wrong: "Putting <code>Have a good day.</code> inside the <code>else</code> brackets.", fix: "Move it below the final <code>}</code> of the <code>else</code> so it runs every time, whatever the temperature." },
          { wrong: "Spelling the messages slightly differently, e.g. <code>Shorts Weather</code> without the <code>!</code>.", fix: "Copy the exact wording from the instructions, including capitals and punctuation." }
        ]
      },

      // ---------------------------------------------------------------- l2
      {
        id: "m05-l2",
        title: "else if and grade boundaries",
        type: "code",
        learn: `
<p>When there are more than two possibilities, chain conditions together with <code>else if</code>. C# checks each condition <strong>in order</strong> and runs the <em>first</em> block whose condition is true. Then it skips the rest.</p>
<pre><code class="cs">Console.Write("How many goals? ");
int goals = Convert.ToInt32(Console.ReadLine());

if (goals >= 3)
{
    Console.WriteLine("Hat-trick hero!");
}
else if (goals >= 1)
{
    Console.WriteLine("On the scoresheet.");
}
else
{
    Console.WriteLine("Better luck next time.");
}</code></pre>
<h3>Order matters!</h3>
<p>Imagine Ciarán writes grade boundaries starting with the lowest:</p>
<pre><code class="cs">if (mark >= 40)
{
    Console.WriteLine("Grade D");
}
else if (mark >= 70)
{
    Console.WriteLine("Grade A");   // never reached for 85!
}</code></pre>
<p>A mark of 85 is <code>&gt;= 40</code>, so the first block runs and prints <code>Grade D</code>. The program runs without crashing but gives the wrong answer. That's a <strong>logic error</strong>.</p>
<div class="key"><strong>Logic error</strong> a mistake that lets the program run but makes it produce the wrong result.</div>
<div class="tip">For boundaries, check the <strong>highest</strong> value first and work your way down. The final <code>else</code> catches everything left over.</div>`,
        instructions: [
          "Read a whole-number mark (0 to 100) after the prompt <code>Enter your mark: </code>",
          "Use <code>if</code> / <code>else if</code> / <code>else</code> to print exactly one of: <code>Grade A</code> (70 or more), <code>Grade B</code> (60 or more), <code>Grade C</code> (50 or more), <code>Grade D</code> (40 or more), otherwise <code>Grade U</code>."
        ],
        starter: prog(`
Console.Write("Enter your mark: ");
int mark = Convert.ToInt32(Console.ReadLine());

// TODO: print Grade A, Grade B, Grade C, Grade D or Grade U
// Remember: check the highest boundary first!`),
        solution: prog(`
Console.Write("Enter your mark: ");
int mark = Convert.ToInt32(Console.ReadLine());

if (mark >= 70)
{
    Console.WriteLine("Grade A");
}
else if (mark >= 60)
{
    Console.WriteLine("Grade B");
}
else if (mark >= 50)
{
    Console.WriteLine("Grade C");
}
else if (mark >= 40)
{
    Console.WriteLine("Grade D");
}
else
{
    Console.WriteLine("Grade U");
}`),
        stdin: ["85"],
        tests: [
          { type: "fn", stdin: ["85"], fn: (out) => /Grade A/.test(out) && count(out, "Grade") === 1, msg: "A mark of 85 should print only Grade A.", help: "When the mark entered is <code>85</code>, your program should print only <code>Grade A</code>. If you see more than one grade, join your conditions with <code>else if</code>; if you see the wrong grade, check the highest boundary first." },
          { type: "fn", stdin: ["70"], fn: (out) => /Grade A/.test(out) && count(out, "Grade") === 1, msg: "A mark of exactly 70 is a Grade A.", help: "When the mark entered is <code>70</code>, your program should print <code>Grade A</code>. Use <code>mark &gt;= 70</code>, not <code>mark &gt; 70</code>." },
          { type: "fn", stdin: ["65"], fn: (out) => /Grade B/.test(out) && count(out, "Grade") === 1, msg: "A mark of 65 should print only Grade B.", help: "When the mark entered is <code>65</code>, your program should print only <code>Grade B</code>. Check your <code>else if (mark &gt;= 60)</code> line and its spelling." },
          { type: "fn", stdin: ["50"], fn: (out) => /Grade C/.test(out) && count(out, "Grade") === 1, msg: "A mark of 50 should print only Grade C.", help: "When the mark entered is <code>50</code>, your program should print only <code>Grade C</code>. Make sure the boundary uses <code>&gt;= 50</code>." },
          { type: "fn", stdin: ["44"], fn: (out) => /Grade D/.test(out) && count(out, "Grade") === 1, msg: "A mark of 44 should print only Grade D.", help: "When the mark entered is <code>44</code>, your program should print only <code>Grade D</code>. Check your <code>else if (mark &gt;= 40)</code> block." },
          { type: "fn", stdin: ["12"], fn: (out) => /Grade U/.test(out) && count(out, "Grade") === 1, msg: "A mark of 12 should print only Grade U.", help: "When the mark entered is <code>12</code>, your program should print only <code>Grade U</code>. Finish the chain with a plain <code>else</code> that prints it." },
          { type: "code", pattern: "else\\s+if", msg: "Use else if to chain your conditions.", help: "The checker looks for <code>else if</code> in your code. Chain your conditions together with <code>else if</code> rather than writing separate <code>if</code> statements." }
        ],
        hint: "Start with if (mark >= 70), then else if (mark >= 60), and so on. The last one is a plain else for Grade U.",
        goal: "The program asks for a mark out of 100 and prints exactly one grade, from Grade A down to Grade U.",
        steps: [
          "Find <code>// TODO: print Grade A, Grade B...</code> under the line that reads the mark.",
          "Write <code>if (mark &gt;= 70)</code> with curly brackets, and print <code>Grade A</code> inside. Run it with 85 to check.",
          "Underneath, add <code>else if (mark &gt;= 60)</code> with brackets and print <code>Grade B</code> inside.",
          "Add two more <code>else if</code> blocks in the same way: <code>&gt;= 50</code> prints <code>Grade C</code> and <code>&gt;= 40</code> prints <code>Grade D</code>.",
          "Finish with a plain <code>else</code> (no condition) that prints <code>Grade U</code>.",
          "Press <strong>Run</strong> and try 70, 65, 50, 44 and 12. Each one should print one grade only."
        ],
        hints: [
          "Only one grade should ever print. A chain of <code>if</code> / <code>else if</code> / <code>else</code> stops at the first true condition.",
          "Start with the <strong>highest</strong> boundary, <code>mark &gt;= 70</code>, and work down: 60, 50, 40. The final <code>else</code> handles everything under 40.",
          "<code>if (mark &gt;= 70)\n{\n    Console.WriteLine(\"Grade A\");\n}\nelse if (mark &gt;= 60)\n{\n    Console.WriteLine(\"Grade B\");\n}\n// ...C and D the same way...\nelse\n{\n    Console.WriteLine(\"Grade U\");\n}</code>"
        ],
        mistakes: [
          { wrong: "Checking the lowest boundary first, e.g. <code>if (mark &gt;= 40)</code> before <code>mark &gt;= 70</code>.", fix: "A mark of 85 is also 40 or more, so it gets Grade D. Put the highest boundary first and work down." },
          { wrong: "Using separate <code>if</code> statements instead of <code>else if</code>.", fix: "Separate ifs are all checked, so 85 prints Grade A, B, C and D. Join them with <code>else if</code> so only one runs." },
          { wrong: "Using <code>&gt;</code> instead of <code>&gt;=</code>, so exactly 70 gets Grade B.", fix: "The boundaries say \"70 or more\", which is <code>mark &gt;= 70</code>." },
          { wrong: "Giving the last <code>else</code> a condition, like <code>else (mark &lt; 40)</code>.", fix: "A plain <code>else</code> never has a condition. Either write just <code>else</code> or use <code>else if (mark &lt; 40)</code>." }
        ]
      },

      // ---------------------------------------------------------------- l3
      {
        id: "m05-l3",
        title: "Logical operators: && || !",
        type: "code",
        learn: `
<p>Sometimes a decision depends on more than one thing. <strong>Logical operators</strong> join conditions together.</p>
<table>
<tr><th>Operator</th><th>Name</th><th>True when…</th></tr>
<tr><td><code>&amp;&amp;</code></td><td>AND</td><td>both conditions are true</td></tr>
<tr><td><code>||</code></td><td>OR</td><td>at least one condition is true</td></tr>
<tr><td><code>!</code></td><td>NOT</td><td>flips true to false and false to true</td></tr>
</table>
<pre><code class="cs">int age = 13;
string ticket = "yes";

if (age >= 12 &amp;&amp; ticket == "yes")
{
    Console.WriteLine("You can watch the film.");
}

string day = "Saturday";
if (day == "Saturday" || day == "Sunday")
{
    Console.WriteLine("No school today!");
}

bool raining = false;
if (!raining)
{
    Console.WriteLine("Let's play outside.");
}</code></pre>
<div class="warn">You must write the full condition on both sides. <code>if (day == "Saturday" || "Sunday")</code> is a compile error. Write <code>day == "Saturday" || day == "Sunday"</code>.</div>
<div class="tip">You can check a range like this: <code>age &lt; 11 || age &gt; 18</code> is true when the age is <em>outside</em> 11 to 18, and <code>age &gt;= 11 &amp;&amp; age &lt;= 18</code> is true when it's <em>inside</em>.</div>`,
        instructions: [
          "The starter reads an <code>age</code> and an answer <code>slip</code> (<code>yes</code> or <code>no</code>).",
          "If the age is 14 or over <strong>and</strong> <code>slip</code> is <code>yes</code>, print <code>You can go on the rugby trip!</code> Otherwise print <code>Sorry, you can't go this time.</code>",
          "Then, in a separate <code>if</code>, if the age is less than 11 <strong>or</strong> greater than 18, also print <code>Age not valid for this school.</code>"
        ],
        starter: prog(`
Console.Write("Enter your age: ");
int age = Convert.ToInt32(Console.ReadLine());
Console.Write("Do you have a permission slip? (yes/no) ");
string slip = Console.ReadLine();

// TODO: use && to check age >= 14 AND slip is "yes"

// TODO: use || to check whether the age is less than 11 OR greater than 18`),
        solution: prog(`
Console.Write("Enter your age: ");
int age = Convert.ToInt32(Console.ReadLine());
Console.Write("Do you have a permission slip? (yes/no) ");
string slip = Console.ReadLine();

if (age >= 14 && slip == "yes")
{
    Console.WriteLine("You can go on the rugby trip!");
}
else
{
    Console.WriteLine("Sorry, you can't go this time.");
}

if (age < 11 || age > 18)
{
    Console.WriteLine("Age not valid for this school.");
}`),
        stdin: ["15", "yes"],
        tests: [
          { type: "output", stdin: ["15", "yes"], includes: "You can go on the rugby trip!", msg: "Age 15 with a slip should be allowed on the trip.", help: "When the inputs are <code>15</code> and <code>yes</code>, your program should print <code>You can go on the rugby trip!</code>. Check your condition is <code>age &gt;= 14 &amp;&amp; slip == \"yes\"</code>." },
          { type: "output", stdin: ["15", "no"], includes: "Sorry, you can't go this time.", msg: "Age 15 without a slip should not be allowed.", help: "When the inputs are <code>15</code> and <code>no</code>, your program should print <code>Sorry, you can't go this time.</code>. Make sure you used <code>&amp;&amp;</code> (not <code>||</code>) and have an <code>else</code> block." },
          { type: "fn", stdin: ["12", "yes"], fn: (out) => /Sorry, you can't go/.test(out) && !/Age not valid/.test(out), msg: "Age 12 with a slip is too young for the trip (but is a valid age).", help: "When the inputs are <code>12</code> and <code>yes</code>, your program should print the Sorry message and <em>not</em> the age warning. 12 is under 14 but is a valid school age, so check both conditions carefully." },
          { type: "output", stdin: ["20", "yes"], includes: "Age not valid for this school.", msg: "Age 20 should also print Age not valid for this school.", help: "When the inputs are <code>20</code> and <code>yes</code>, your program should also print <code>Age not valid for this school.</code>. Add a separate <code>if (age &lt; 11 || age &gt; 18)</code>." },
          { type: "code", pattern: "&&[\\s\\S]*\\|\\||\\|\\|[\\s\\S]*&&", msg: "Use both && and ||.", help: "The checker looks for both <code>&amp;&amp;</code> and <code>||</code> in your code. Use <code>&amp;&amp;</code> for the trip check and <code>||</code> for the age check." }
        ],
        hint: "if (age >= 14 && slip == \"yes\") { ... } else { ... }  then  if (age < 11 || age > 18) { ... }",
        goal: "The program asks for an age and whether you have a permission slip, says whether you can go on the rugby trip, and warns if the age isn't valid for the school.",
        steps: [
          "Find <code>// TODO: use &amp;&amp; to check...</code> under the two input lines.",
          "Write <code>if (age &gt;= 14 &amp;&amp; slip == \"yes\")</code> with curly brackets, and print <code>You can go on the rugby trip!</code> inside.",
          "Add an <code>else</code> block that prints <code>Sorry, you can't go this time.</code>. Run it with 15 and yes, then 15 and no.",
          "Under <code>// TODO: use || ...</code>, start a brand new <code>if</code> (not an <code>else if</code>): <code>if (age &lt; 11 || age &gt; 18)</code>.",
          "Inside its brackets, print <code>Age not valid for this school.</code>. Run with 20 and yes: you should see two messages."
        ],
        hints: [
          "The trip needs <em>both</em> things to be true, so use AND. The age warning needs <em>either</em> thing to be true, so use OR.",
          "The first check uses <code>&amp;&amp;</code> with an <code>else</code>. The second check is a separate <code>if</code> that uses <code>||</code>, with no <code>else</code>.",
          "<code>if (age &gt;= 14 &amp;&amp; slip == \"yes\")\n{\n    Console.WriteLine(\"You can go on the rugby trip!\");\n}\nelse\n{\n    Console.WriteLine(\"Sorry, you can't go this time.\");\n}</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>slip = \"yes\"</code> with one equals sign.", fix: "One <code>=</code> stores a value. To compare, use two: <code>slip == \"yes\"</code>." },
          { wrong: "Writing half a condition, like <code>age &lt; 11 || &gt; 18</code>.", fix: "Each side needs the variable: <code>age &lt; 11 || age &gt; 18</code>." },
          { wrong: "Making the age check an <code>else if</code> attached to the trip check.", fix: "The age warning is a separate question. Start it with a fresh <code>if</code> so it's checked every time." },
          { wrong: "Using <code>||</code> for the trip, so a 15-year-old with no slip is allowed.", fix: "Both rules must be met, so use <code>&amp;&amp;</code>." }
        ]
      },

      // ---------------------------------------------------------------- l4
      {
        id: "m05-l4",
        title: "Nested if statements",
        type: "code",
        learn: `
<p>You can put an <code>if</code> <em>inside</em> another <code>if</code>. This is called a <strong>nested if</strong>. The inner question is only asked if the outer condition is true.</p>
<pre><code class="cs">Console.Write("Do you have a ticket? (yes/no) ");
string ticket = Console.ReadLine();

if (ticket == "yes")
{
    Console.Write("Is it a VIP ticket? (yes/no) ");
    string vip = Console.ReadLine();

    if (vip == "yes")
    {
        Console.WriteLine("Head to the front row!");
    }
    else
    {
        Console.WriteLine("Find any free seat.");
    }
}
else
{
    Console.WriteLine("Please buy a ticket first.");
}</code></pre>
<p>Notice how Grace only gets asked about VIP if she has a ticket at all. Nested ifs are useful when one decision only makes sense after another.</p>
<div class="tip">Indent each level by four spaces. Visual Studio does this for you, and it makes it much easier to see which <code>else</code> belongs to which <code>if</code>.</div>
<div class="warn">Every <code>{</code> needs a matching <code>}</code>. If you get a strange error, count your brackets!</div>`,
        instructions: [
          "Ask <code>Is it raining? (yes/no) </code> and read the answer.",
          "If it is raining, ask <code>Is it windy? (yes/no) </code>. If it's windy print <code>Stay inside and play board games.</code>, otherwise print <code>Take an umbrella.</code>",
          "If it is not raining, print <code>Go to the park!</code> (don't ask about wind)."
        ],
        starter: prog(`
Console.Write("Is it raining? (yes/no) ");
string raining = Console.ReadLine();

// TODO: if raining is "yes"
//     ask "Is it windy? (yes/no) " and read the answer
//     use a nested if to choose the right message
// TODO: else print Go to the park!`),
        solution: prog(`
Console.Write("Is it raining? (yes/no) ");
string raining = Console.ReadLine();

if (raining == "yes")
{
    Console.Write("Is it windy? (yes/no) ");
    string windy = Console.ReadLine();

    if (windy == "yes")
    {
        Console.WriteLine("Stay inside and play board games.");
    }
    else
    {
        Console.WriteLine("Take an umbrella.");
    }
}
else
{
    Console.WriteLine("Go to the park!");
}`),
        stdin: ["yes", "yes"],
        tests: [
          { type: "output", stdin: ["yes", "yes"], includes: "Stay inside and play board games.", msg: "Raining and windy: Stay inside and play board games.", help: "When the answers are <code>yes</code> and <code>yes</code>, your program should print <code>Stay inside and play board games.</code>. Check the nested <code>if (windy == \"yes\")</code> is inside the raining block." },
          { type: "output", stdin: ["yes", "no"], includes: "Take an umbrella.", msg: "Raining but not windy: Take an umbrella.", help: "When the answers are <code>yes</code> and <code>no</code>, your program should print <code>Take an umbrella.</code>. Make sure your nested if has an <code>else</code> with that message." },
          { type: "fn", stdin: ["no"], fn: (out) => /Go to the park!/.test(out) && !/windy/i.test(out), msg: "Not raining: print Go to the park! and don't ask about wind.", help: "When the answer is <code>no</code>, your program should print <code>Go to the park!</code> and never ask about wind. Move the windy question inside the raining <code>if</code>." },
          { type: "code", pattern: "if[\\s\\S]*\\{[\\s\\S]*if\\s*\\(", msg: "Put one if inside another (a nested if).", help: "The checker looks for one <code>if</code> inside another. Put the windy if/else between the curly brackets of the raining <code>if</code>." }
        ],
        hint: "The windy question and its if/else go inside the curly brackets of if (raining == \"yes\").",
        goal: "The program asks if it's raining; if it is, it asks if it's windy and suggests board games or an umbrella, and if not it says go to the park.",
        steps: [
          "Under the first <code>// TODO</code>, write <code>if (raining == \"yes\")</code> with curly brackets.",
          "Inside those brackets, ask the second question with <code>Console.Write(\"Is it windy? (yes/no) \");</code> and read it into <code>string windy = Console.ReadLine();</code>.",
          "Still inside the outer brackets, write a nested <code>if (windy == \"yes\")</code> that prints <code>Stay inside and play board games.</code>, with an <code>else</code> that prints <code>Take an umbrella.</code>.",
          "After the outer <code>}</code>, add <code>else</code> with brackets that prints <code>Go to the park!</code>.",
          "Press <strong>Run</strong> three times: try yes/yes, yes/no and no. Check the right message appears each time."
        ],
        hints: [
          "The windy question only makes sense when it's raining, so it belongs <em>inside</em> the raining <code>if</code>.",
          "Put the windy <code>Console.Write</code>, the <code>ReadLine</code> and a second if/else all between the curly brackets of <code>if (raining == \"yes\")</code>.",
          "<code>if (raining == \"yes\")\n{\n    Console.Write(\"Is it windy? (yes/no) \");\n    string windy = Console.ReadLine();\n    if (windy == \"yes\")\n    {\n        // board games message\n    }\n    else\n    {\n        // umbrella message\n    }\n}</code>"
        ],
        mistakes: [
          { wrong: "Asking about wind before the raining <code>if</code>, so it's always asked.", fix: "Move the windy question inside the <code>if (raining == \"yes\")</code> brackets." },
          { wrong: "Losing track of brackets, so the <code>else</code> for the park attaches to the wrong <code>if</code>.", fix: "Indent each level by four spaces and count: every <code>{</code> needs a matching <code>}</code>." },
          { wrong: "Typing <code>Yes</code> when testing, then wondering why it doesn't match.", fix: "<code>==</code> is case-sensitive. Type <code>yes</code> in lower case, as the prompt shows." }
        ]
      },

      // ---------------------------------------------------------------- l5
      {
        id: "m05-l5",
        title: "switch statements",
        type: "code",
        learn: `
<p>When you compare one variable against lots of exact values, a long <code>else if</code> chain gets messy. A <code>switch</code> statement is tidier.</p>
<pre><code class="cs">Console.Write("Pick a house (1-3): ");
int house = Convert.ToInt32(Console.ReadLine());

switch (house)
{
    case 1:
        Console.WriteLine("Lions");
        break;
    case 2:
        Console.WriteLine("Tigers");
        break;
    case 3:
        Console.WriteLine("Eagles");
        break;
    default:
        Console.WriteLine("No such house");
        break;
}</code></pre>
<ul>
<li>Each <code>case</code> is a value to match. It must end with <code>break;</code></li>
<li><code>default</code> runs if no case matches, like a final <code>else</code>.</li>
<li>You can switch on <code>int</code>, <code>string</code> and <code>char</code> values.</li>
</ul>
<p>Several cases can share one block. Just stack the labels:</p>
<pre><code class="cs">switch (pet)
{
    case "dog":
    case "cat":
        Console.WriteLine("A classic choice!");
        break;
    default:
        Console.WriteLine("How unusual!");
        break;
}</code></pre>
<div class="warn">String cases are case-sensitive: <code>"Dog"</code> does not match <code>case "dog":</code>.</div>
<p>When should you choose <code>switch</code> over <code>if</code>? Use <code>switch</code> when you are checking <strong>one</strong> variable against a list of exact values, like menu choices or days of the week. Use <code>if</code> / <code>else if</code> when you need ranges (<code>mark &gt;= 70</code>) or conditions involving several variables.</p>`,
        instructions: [
          "Ask <code>Enter meal number (1-4): </code> and use a <code>switch</code> to print <code>You chose: Pizza</code> (1), <code>You chose: Pasta bake</code> (2), <code>You chose: Chicken curry</code> (3) or <code>You chose: Jacket potato</code> (4). For any other number print <code>Not on the menu</code>.",
          "Then ask <code>Enter a day: </code> and use a second <code>switch</code> on the string: <code>Saturday</code> and <code>Sunday</code> share one block that prints <code>Weekend!</code>; the <code>default</code> prints <code>School day</code>."
        ],
        starter: prog(`
Console.Write("Enter meal number (1-4): ");
int meal = Convert.ToInt32(Console.ReadLine());

// TODO: switch (meal) with case 1, 2, 3, 4 and default

Console.Write("Enter a day: ");
string day = Console.ReadLine();

// TODO: switch (day) - Saturday and Sunday print Weekend!, default prints School day`),
        solution: prog(`
Console.Write("Enter meal number (1-4): ");
int meal = Convert.ToInt32(Console.ReadLine());

switch (meal)
{
    case 1:
        Console.WriteLine("You chose: Pizza");
        break;
    case 2:
        Console.WriteLine("You chose: Pasta bake");
        break;
    case 3:
        Console.WriteLine("You chose: Chicken curry");
        break;
    case 4:
        Console.WriteLine("You chose: Jacket potato");
        break;
    default:
        Console.WriteLine("Not on the menu");
        break;
}

Console.Write("Enter a day: ");
string day = Console.ReadLine();

switch (day)
{
    case "Saturday":
    case "Sunday":
        Console.WriteLine("Weekend!");
        break;
    default:
        Console.WriteLine("School day");
        break;
}`),
        stdin: ["2", "Monday"],
        tests: [
          { type: "output", stdin: ["2", "Monday"], includes: "You chose: Pasta bake", msg: "Meal 2 should print You chose: Pasta bake", help: "When the inputs are <code>2</code> and <code>Monday</code>, your program should print <code>You chose: Pasta bake</code>. Check <code>case 2:</code> and the exact spelling." },
          { type: "output", stdin: ["2", "Monday"], includes: "School day", msg: "Monday should print School day", help: "When the inputs are <code>2</code> and <code>Monday</code>, your program should print <code>School day</code>. Add a <code>default:</code> to your day switch that prints it." },
          { type: "output", stdin: ["4", "Saturday"], includes: "You chose: Jacket potato", msg: "Meal 4 should print You chose: Jacket potato", help: "When the inputs are <code>4</code> and <code>Saturday</code>, your program should print <code>You chose: Jacket potato</code>. Check you have a <code>case 4:</code> with a <code>break;</code>." },
          { type: "fn", stdin: ["9", "Sunday"], fn: (out) => /Not on the menu/.test(out) && /Weekend!/.test(out) && !/School day/.test(out), msg: "Meal 9 should print Not on the menu, and Sunday should print Weekend!", help: "When the inputs are <code>9</code> and <code>Sunday</code>, your program should print <code>Not on the menu</code> and <code>Weekend!</code> (and not School day). Check your meal <code>default</code> and that Sunday shares the Saturday block." },
          { type: "code", pattern: "switch\\s*\\([\\s\\S]*switch\\s*\\(", msg: "Use two switch statements.", help: "The checker looks for two <code>switch</code> statements. Use one for the meal and another for the day." },
          { type: "code", pattern: "default\\s*:", msg: "Include a default case.", help: "The checker looks for a <code>default:</code> case. Add one to handle values that don't match any case." }
        ],
        hint: "For the day switch, put case \"Saturday\": and case \"Sunday\": on two lines straight after each other, then the WriteLine and break.",
        goal: "The program asks for a meal number and a day, then says which meal you chose and whether it's the weekend or a school day.",
        steps: [
          "Under <code>// TODO: switch (meal)</code>, type <code>switch (meal)</code> with a pair of curly brackets.",
          "Inside, write <code>case 1:</code>, then on the next lines <code>Console.WriteLine(\"You chose: Pizza\");</code> and <code>break;</code>.",
          "Copy that pattern for <code>case 2</code>, <code>case 3</code> and <code>case 4</code> with the right meals. Run it and try 2.",
          "Add <code>default:</code> that prints <code>Not on the menu</code>, followed by <code>break;</code>.",
          "Under the second TODO, write <code>switch (day)</code>. Put <code>case \"Saturday\":</code> and <code>case \"Sunday\":</code> on two lines one after the other, then print <code>Weekend!</code> and <code>break;</code>.",
          "Add a <code>default:</code> that prints <code>School day</code> and <code>break;</code>. Run with 9 and Sunday, then 2 and Monday."
        ],
        hints: [
          "You're checking one variable against a list of exact values. That's what <code>switch</code> is made for.",
          "Each <code>case</code> ends with <code>break;</code>. For the days, stack two case labels so they share one block. Strings in cases need double quotes.",
          "<code>switch (day)\n{\n    case \"Saturday\":\n    case \"Sunday\":\n        Console.WriteLine(\"Weekend!\");\n        break;\n    default:\n        Console.WriteLine(\"School day\");\n        break;\n}</code>"
        ],
        mistakes: [
          { wrong: "Forgetting <code>break;</code> at the end of a case.", fix: "C# gives an error like <em>Control cannot fall through</em>. Add <code>break;</code> as the last line of every case, including <code>default</code>." },
          { wrong: "Writing <code>case Saturday:</code> without quotes.", fix: "<code>day</code> is a string, so the case value needs quotes: <code>case \"Saturday\":</code>." },
          { wrong: "Testing with <code>saturday</code> in lower case.", fix: "String cases are case-sensitive. Type <code>Saturday</code> with a capital S." },
          { wrong: "Putting a <code>break;</code> between the two stacked day cases.", fix: "Leave nothing between <code>case \"Saturday\":</code> and <code>case \"Sunday\":</code> so they share the same block." }
        ]
      },

      // ---------------------------------------------------------------- l6
      {
        id: "m05-l6",
        title: "The ternary operator",
        type: "code",
        learn: `
<p>Sometimes you just want to pick between two <em>values</em>. Writing a whole if/else for that feels long-winded:</p>
<pre><code class="cs">string result;
if (score >= 50)
{
    result = "Pass";
}
else
{
    result = "Fail";
}</code></pre>
<p>The <strong>ternary operator</strong> <code>? :</code> does the same thing in one line:</p>
<pre><code class="cs">string result = score >= 50 ? "Pass" : "Fail";</code></pre>
<p>Read it as: <em>"Is score &gt;= 50? If so, use "Pass", otherwise use "Fail"."</em></p>
<pre><code class="cs">condition ? valueIfTrue : valueIfFalse</code></pre>
<p>It's great for little wording changes, like plurals:</p>
<pre><code class="cs">int pets = 1;
string word = pets == 1 ? "pet" : "pets";
Console.WriteLine($"Oisín has {pets} {word}.");   // Oisín has 1 pet.</code></pre>
<div class="tip">To test whether a number is even, use the remainder operator: <code>n % 2 == 0</code> is true for even numbers.</div>
<div class="warn">Only use the ternary operator for simple choices between two values. If you need to <em>do</em> several things, a normal if/else is clearer.</div>`,
        instructions: [
          "Read a whole number <code>n</code> after the prompt <code>Enter a number: </code>",
          "Use the ternary operator to set a string to <code>even</code> or <code>odd</code>, then print it like <code>7 is odd</code>",
          "Use the ternary operator again to choose <code>item</code> or <code>items</code>, then print like <code>You have 7 items</code> (or <code>You have 1 item</code> when n is 1)."
        ],
        starter: prog(`
Console.Write("Enter a number: ");
int n = Convert.ToInt32(Console.ReadLine());

// TODO: string type = ... ? "even" : "odd";
// TODO: print e.g. 7 is odd

// TODO: string word = ... ? "item" : "items";
// TODO: print e.g. You have 7 items`),
        solution: prog(`
Console.Write("Enter a number: ");
int n = Convert.ToInt32(Console.ReadLine());

string type = n % 2 == 0 ? "even" : "odd";
Console.WriteLine($"{n} is {type}");

string word = n == 1 ? "item" : "items";
Console.WriteLine($"You have {n} {word}");`),
        stdin: ["7"],
        tests: [
          { type: "output", stdin: ["7"], includes: "7 is odd", msg: "For 7 print 7 is odd", help: "When the number entered is <code>7</code>, your program should print <code>7 is odd</code>. Check your ternary gives <code>\"odd\"</code> when <code>n % 2</code> isn't 0." },
          { type: "output", stdin: ["4"], includes: "4 is even", msg: "For 4 print 4 is even", help: "When the number entered is <code>4</code>, your program should print <code>4 is even</code>. Make sure <code>\"even\"</code> comes straight after the <code>?</code>." },
          { type: "output", stdin: ["7"], includes: "You have 7 items", msg: "For 7 print You have 7 items", help: "When the number entered is <code>7</code>, your program should print <code>You have 7 items</code>. Check the spaces and spelling in your interpolated string." },
          { type: "outputRegex", stdin: ["1"], pattern: "You have 1 item(?!s)", msg: "For 1 print You have 1 item (no s).", help: "When the number entered is <code>1</code>, your program should print <code>You have 1 item</code> with no s. Use <code>n == 1 ? \"item\" : \"items\"</code>." },
          { type: "code", pattern: "\\?[^;]*:", msg: "Use the ternary operator ( ? : ).", help: "The checker looks for the ternary operator <code>? :</code> in your code. Use it instead of an if/else to pick the words." }
        ],
        hint: "string type = n % 2 == 0 ? \"even\" : \"odd\";  then  Console.WriteLine($\"{n} is {type}\");",
        goal: "The program asks for a number, says whether it is odd or even, and says how many items you have with the right singular or plural word.",
        steps: [
          "Under the first TODO, type <code>string type = n % 2 == 0 ? \"even\" : \"odd\";</code>.",
          "Print it with <code>Console.WriteLine($\"{n} is {type}\");</code>. Press <strong>Run</strong> and try 7: you should see <code>7 is odd</code>.",
          "Under the next TODO, write <code>string word = </code> followed by a ternary that checks <code>n == 1</code> and chooses <code>\"item\"</code> or <code>\"items\"</code>.",
          "Print <code>You have</code>, the number and the word with an interpolated string. Run with 7 and then with 1."
        ],
        hints: [
          "The ternary operator picks one of two values: <code>condition ? valueIfTrue : valueIfFalse</code>.",
          "For even or odd, the condition is <code>n % 2 == 0</code>. For the plural, the condition is <code>n == 1</code>.",
          "<code>string word = n == 1 ? \"item\" : \"items\";\nConsole.WriteLine($\"You have {n} {word}\");</code>"
        ],
        mistakes: [
          { wrong: "Swapping the two values: <code>n % 2 == 0 ? \"odd\" : \"even\"</code>.", fix: "The value straight after <code>?</code> is used when the condition is true. An even number has remainder 0, so <code>\"even\"</code> goes first." },
          { wrong: "Forgetting the <code>$</code> before the string, so it prints <code>{n} is {type}</code> literally.", fix: "Interpolated strings must start with <code>$\"</code>." },
          { wrong: "Using <code>n == 1 ? \"items\" : \"item\"</code>, which gives \"1 items\".", fix: "When n is 1 you want the singular <code>\"item\"</code>, so put it first." }
        ]
      },

      // ---------------------------------------------------------------- l7
      {
        id: "m05-l7",
        title: "Constants and a login check",
        type: "code",
        learn: `
<p>Some values should <strong>never change</strong> while a program runs: the pass mark, the price of a ticket, the correct password. Declare these with <code>const</code>.</p>
<pre><code class="cs">const int PassMark = 40;
const double TicketPrice = 6.50;</code></pre>
<div class="key"><strong>Constant</strong> a named value that is set once and cannot be changed while the program runs.</div>
<p>If you try to change a constant later, for example <code>PassMark = 30;</code>, C# gives a compile error. That protects you from changing it by accident. Constants also make code easier to read and update: change the value in one place and every use changes too.</p>
<h3>A simple login</h3>
<pre><code class="cs">const string CorrectPin = "4821";

Console.Write("Enter PIN: ");
string pin = Console.ReadLine();

if (pin == CorrectPin)
{
    Console.WriteLine("Unlocked!");
}
else
{
    Console.WriteLine("Wrong PIN.");
}</code></pre>
<div class="tip">Comparing strings with <code>==</code> is <strong>case-sensitive</strong>: <code>"Coach"</code> is not the same as <code>"coach"</code>. That's what you want for passwords.</div>
<div class="warn">Real systems never store passwords in plain text like this. You'll see a safer way (hashing) later in the course.</div>`,
        instructions: [
          "Declare two constants: <code>Username</code> set to <code>coach</code> and <code>Password</code> set to <code>Scrum2026</code>.",
          "Ask <code>Username: </code> and <code>Password: </code> and read both.",
          "If both match, print <code>Access granted. Welcome, coach!</code>, otherwise print <code>Access denied.</code>"
        ],
        starter: prog(`
// TODO: declare const string Username and const string Password

Console.Write("Username: ");
string user = Console.ReadLine();
Console.Write("Password: ");
string pass = Console.ReadLine();

// TODO: check BOTH match using &&`),
        solution: prog(`
const string Username = "coach";
const string Password = "Scrum2026";

Console.Write("Username: ");
string user = Console.ReadLine();
Console.Write("Password: ");
string pass = Console.ReadLine();

if (user == Username && pass == Password)
{
    Console.WriteLine("Access granted. Welcome, coach!");
}
else
{
    Console.WriteLine("Access denied.");
}`),
        stdin: ["coach", "Scrum2026"],
        tests: [
          { type: "output", stdin: ["coach", "Scrum2026"], includes: "Access granted. Welcome, coach!", msg: "coach / Scrum2026 should be granted access.", help: "When the inputs are <code>coach</code> and <code>Scrum2026</code>, your program should print <code>Access granted. Welcome, coach!</code>. Check the spelling of your constants and the message." },
          { type: "fn", stdin: ["coach", "password"], fn: (out) => /Access denied\./.test(out) && !/granted/i.test(out), msg: "A wrong password should print Access denied.", help: "When the inputs are <code>coach</code> and <code>password</code>, your program should print <code>Access denied.</code> and nothing about granted. Use <code>&amp;&amp;</code> so both details must match." },
          { type: "fn", stdin: ["Coach", "Scrum2026"], fn: (out) => /Access denied\./.test(out) && !/granted/i.test(out), msg: "Usernames are case-sensitive: Coach should be denied.", help: "When the inputs are <code>Coach</code> and <code>Scrum2026</code>, access should be denied because of the capital C. Don't use <code>ToLower()</code>; compare the input exactly." },
          { type: "code", pattern: "const\\s+string", msg: "Store the username and password in const variables.", help: "The checker looks for <code>const string</code> in your code. Declare <code>Username</code> and <code>Password</code> as constants at the top." }
        ],
        hint: "const string Username = \"coach\";  and then  if (user == Username && pass == Password)",
        goal: "The program asks for a username and password and only grants access when both exactly match the stored constants.",
        steps: [
          "At the very top, under the first TODO, type <code>const string Username = \"coach\";</code>.",
          "On the next line, type <code>const string Password = \"Scrum2026\";</code>. Press <strong>Run</strong> to check there are no errors.",
          "Under <code>// TODO: check BOTH match</code>, write <code>if (user == Username &amp;&amp; pass == Password)</code> with curly brackets.",
          "Inside, print <code>Access granted. Welcome, coach!</code>.",
          "Add an <code>else</code> that prints <code>Access denied.</code>. Run it with coach and Scrum2026, then try a wrong password."
        ],
        hints: [
          "Store the correct details as constants with <code>const</code>, then compare what the user typed against them.",
          "Both details have to match, so join the two comparisons with <code>&amp;&amp;</code> inside one <code>if</code>.",
          "<code>const string Username = \"coach\";\nconst string Password = \"Scrum2026\";\n// ...after reading user and pass...\nif (user == Username &amp;&amp; pass == Password)</code>"
        ],
        mistakes: [
          { wrong: "Comparing against the text directly, like <code>user == \"coach\"</code>, and never using the constants.", fix: "The checker wants <code>const string</code> variables. Compare with <code>Username</code> and <code>Password</code>." },
          { wrong: "Using <code>||</code>, so a right username with the wrong password is let in.", fix: "Both must match, so use <code>&amp;&amp;</code>." },
          { wrong: "Using <code>ToLower()</code> on the input so <code>Coach</code> is accepted.", fix: "Logins should be case-sensitive here. Compare the input exactly as typed." },
          { wrong: "Typing the password slightly wrong in the constant, e.g. <code>scrum2026</code>.", fix: "Copy it exactly: capital S, then <code>crum2026</code>." }
        ]
      },

      // ---------------------------------------------------------------- l8
      {
        id: "m05-l8",
        title: "Mini-project: cinema tickets",
        type: "code",
        learn: `
<p>Time to put it all together! Your local cinema wants a program to work out ticket prices.</p>
<h3>The pricing rules</h3>
<table>
<tr><th>Customer</th><th>Price</th></tr>
<tr><td>Under 12</td><td>£5.00</td></tr>
<tr><td>12 to 17</td><td>£6.50</td></tr>
<tr><td>65 or over</td><td>£5.50</td></tr>
<tr><td>Everyone else (adults)</td><td>£9.00</td></tr>
<tr><td><strong>Any age on a Tuesday</strong></td><td>£4.00</td></tr>
</table>
<h3>Plan before you code</h3>
<ol>
<li>Read the age (int) and the day (string).</li>
<li>Declare <code>double price;</code></li>
<li>Check the <strong>special case</strong> first: is it Tuesday?</li>
<li>Otherwise work through the age bands. Think carefully about the order: if you check <code>age &gt;= 18</code> before <code>age &gt;= 65</code>, pensioners will pay the adult price. That's a logic error!</li>
<li>Print the price with two decimal places.</li>
</ol>
<pre><code class="cs">double price = 6.5;
Console.WriteLine($"Your ticket costs £{price:F2}");
// Your ticket costs £6.50</code></pre>
<p>Testing with values right on the edge of a band is called <strong>boundary testing</strong>. Most selection bugs hide at the boundaries: a <code>&lt;</code> that should have been <code>&lt;=</code> only shows up when you try exactly 12 or exactly 17.</p>
<div class="tip">Test every branch! Good test data for this program includes ages 11, 12, 17, 18, 64 and 65 (the <strong>boundaries</strong>), plus a Tuesday.</div>`,
        instructions: [
          "Ask <code>Enter your age: </code> and <code>Enter the day: </code> and read both.",
          "Work out the price using the rules in the table (Tuesday is always £4.00).",
          "Print the result like <code>Your ticket costs £9.00</code> (two decimal places)."
        ],
        starter: prog(`
Console.Write("Enter your age: ");
int age = Convert.ToInt32(Console.ReadLine());
Console.Write("Enter the day: ");
string day = Console.ReadLine();

double price;

// TODO: if day is "Tuesday" the price is 4.00
// TODO: else if ... work through the age bands (careful with the order!)

price = 0; // TODO: remove this line once your if statements set the price

Console.WriteLine($"Your ticket costs £{price:F2}");`),
        solution: prog(`
Console.Write("Enter your age: ");
int age = Convert.ToInt32(Console.ReadLine());
Console.Write("Enter the day: ");
string day = Console.ReadLine();

double price;

if (day == "Tuesday")
{
    price = 4.00;
}
else if (age < 12)
{
    price = 5.00;
}
else if (age <= 17)
{
    price = 6.50;
}
else if (age >= 65)
{
    price = 5.50;
}
else
{
    price = 9.00;
}

Console.WriteLine($"Your ticket costs £{price:F2}");`),
        stdin: ["30", "Monday"],
        tests: [
          { type: "output", stdin: ["10", "Friday"], includes: "Your ticket costs £5.00", msg: "A 10-year-old on Friday pays £5.00", help: "When the inputs are <code>10</code> and <code>Friday</code>, your program should print <code>Your ticket costs £5.00</code>. Check your <code>age &lt; 12</code> band, and that you removed <code>price = 0;</code>." },
          { type: "output", stdin: ["17", "Saturday"], includes: "Your ticket costs £6.50", msg: "A 17-year-old on Saturday pays £6.50", help: "When the inputs are <code>17</code> and <code>Saturday</code>, your program should print <code>Your ticket costs £6.50</code>. 17 is included in the teen band, so use <code>age &lt;= 17</code>." },
          { type: "output", stdin: ["30", "Monday"], includes: "Your ticket costs £9.00", msg: "A 30-year-old on Monday pays £9.00", help: "When the inputs are <code>30</code> and <code>Monday</code>, your program should print <code>Your ticket costs £9.00</code>. Make sure the final <code>else</code> sets the adult price." },
          { type: "output", stdin: ["70", "Sunday"], includes: "Your ticket costs £5.50", msg: "A 70-year-old on Sunday pays £5.50 (check your order!)", help: "When the inputs are <code>70</code> and <code>Sunday</code>, your program should print <code>Your ticket costs £5.50</code>. Check the 65-or-over test comes before any adult check." },
          { type: "output", stdin: ["30", "Tuesday"], includes: "Your ticket costs £4.00", msg: "Everyone pays £4.00 on a Tuesday.", help: "When the inputs are <code>30</code> and <code>Tuesday</code>, your program should print <code>Your ticket costs £4.00</code>. Check Tuesday first, spelled with a capital T." }
        ],
        hint: "Check Tuesday first, then age < 12, then age <= 17, then age >= 65, and finally else for adults.",
        goal: "The program asks for your age and the day, works out the cinema ticket price from the pricing rules, and prints it with two decimal places.",
        steps: [
          "Find the TODO about Tuesday. Write <code>if (day == \"Tuesday\")</code> with brackets, and set <code>price = 4.00;</code> inside.",
          "Add <code>else if (age &lt; 12)</code> that sets <code>price = 5.00;</code>.",
          "Add <code>else if (age &lt;= 17)</code> that sets <code>price = 6.50;</code>.",
          "Add <code>else if (age &gt;= 65)</code> that sets <code>price = 5.50;</code>, then a plain <code>else</code> that sets <code>price = 9.00;</code>.",
          "Delete the line <code>price = 0; // TODO: remove this line...</code>, or the price will always be £0.00.",
          "Press <strong>Run</strong> and test: 10 Friday, 17 Saturday, 30 Monday, 70 Sunday and 30 Tuesday."
        ],
        hints: [
          "Tuesday beats every age rule, so check it first. Then work through the age bands in a sensible order.",
          "Use one chain: <code>if</code> for Tuesday, then <code>else if</code> for under 12, 17 or under, and 65 or over, with a final <code>else</code> for adults. Each block just sets <code>price</code>.",
          "<code>if (day == \"Tuesday\")\n{\n    price = 4.00;\n}\nelse if (age &lt; 12)\n{\n    price = 5.00;\n}\nelse if (age &lt;= 17)\n{\n    price = 6.50;\n}</code>"
        ],
        mistakes: [
          { wrong: "Leaving the line <code>price = 0;</code> in the program after your if statements.", fix: "That line overwrites the price you worked out. Delete it." },
          { wrong: "Checking <code>age &gt;= 18</code> for adults before <code>age &gt;= 65</code>.", fix: "A 70-year-old is also 18 or over, so they'd pay £9.00. Check 65 or over before the adult price, or use a final <code>else</code> for adults." },
          { wrong: "Using <code>age &lt; 17</code> for the teen band, so a 17-year-old pays the adult price.", fix: "17 is included, so use <code>age &lt;= 17</code>." },
          { wrong: "Checking Tuesday last, so children still pay £5.00 on a Tuesday.", fix: "Put the Tuesday check at the very start of the chain." }
        ]
      },

      // ---------------------------------------------------------------- quiz
      {
        id: "m05-quiz",
        title: "Checkpoint: selection",
        type: "quiz",
        questions: [
          { q: "What is <strong>selection</strong> in programming?",
            options: ["Repeating code several times", "Choosing which code to run based on a condition", "Picking an item from an array", "Storing a value in a variable"],
            answer: 1, explain: "Selection uses conditions (if, switch) to decide which code runs." },
          { q: "Which line correctly checks whether <code>score</code> equals 10?",
            options: ["if (score = 10)", "if (score == 10)", "if score == 10", "if (score => 10)"],
            answer: 1, explain: "Two equals signs compare; one equals sign assigns. The condition must be in brackets." },
          { q: "A program checks <code>if (mark &gt;= 40)</code> for Grade D <em>before</em> <code>else if (mark &gt;= 70)</code> for Grade A. What does a mark of 85 get?",
            options: ["Grade A", "Grade D", "A compile error", "Nothing is printed"],
            answer: 1, explain: "85 >= 40 is true, so the first block runs and the rest are skipped. This is a logic error: check the highest boundary first." },
          { q: "If <code>x = 5</code>, which condition is <strong>true</strong>?",
            options: ["x > 3 && x < 5", "x > 3 || x < 0", "!(x == 5)", "x != 5"],
            answer: 1, explain: "With || only one side needs to be true, and x > 3 is true." },
          { q: "What is the value of <code>s</code>?", code: "int age = 15;\nstring s = age >= 18 ? \"Adult\" : \"Junior\";",
            options: ["Adult", "Junior", "True", "15"],
            answer: 1, explain: "15 >= 18 is false, so the ternary operator picks the second value, \"Junior\"." },
          { q: "In a <code>switch</code> statement, when does the <code>default</code> block run?",
            options: ["Always, at the end", "Only for the first case", "When none of the cases match", "When the value is 0"],
            answer: 2, explain: "default is like the final else: it runs when no case matches." },
          { q: "What happens if you try to change a <code>const</code> after it is declared?",
            options: ["It changes as normal", "The program crashes when it runs", "You get a compile error", "The new value is ignored silently"],
            answer: 2, explain: "Constants can't be assigned to again, so C# refuses to compile the program." }
        ]
      }
    ]
  });
})();
