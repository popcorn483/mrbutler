// Module 8: String handling
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
  const lines = (out) => out.split("\n").map(s => s.trimEnd()).filter(s => s.trim());

  COURSE.addModule({
    id: "m08",
    title: "String handling",
    icon: "text",
    summary: "Slice, search, split and build text: usernames, passwords and secret codes.",
    lessons: [
      // ---------------------------------------------------------------- l1
      {
        id: "m08-l1",
        title: "Length, indexing and case",
        type: "code",
        learn: `
<p>A <code>string</code> is really a sequence of <code>char</code> values. That means you can treat it a bit like an array.</p>
<pre><code class="cs">string team = "Lions";

Console.WriteLine(team.Length);     // 5
Console.WriteLine(team[0]);         // L   (first character)
Console.WriteLine(team[team.Length - 1]);   // s   (last character)</code></pre>
<table>
<tr><th>Index</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
<tr><th>char</th><td>L</td><td>i</td><td>o</td><td>n</td><td>s</td></tr>
</table>
<div class="warn">Strings are <strong>immutable</strong>: you can read <code>team[0]</code> but you can't change it with <code>team[0] = 'P';</code>. String methods always give you back a <em>new</em> string.</div>
<h3>Changing case</h3>
<pre><code class="cs">string shout = team.ToUpper();   // "LIONS"
string quiet = team.ToLower();   // "lions"
Console.WriteLine(team);         // still "Lions"!</code></pre>
<p>Case matters when comparing: <code>"yes" == "YES"</code> is <code>false</code>. A neat trick is to convert input to lower case before checking it, so <code>Yes</code>, <code>YES</code> and <code>yes</code> all work:</p>
<pre><code class="cs">string answer = Console.ReadLine().ToLower();
if (answer == "yes")
{
    Console.WriteLine("Great!");
}</code></pre>
<div class="tip">Spaces count as characters too: <code>"Ben M".Length</code> is 5.</div>
<p>Each character you get with an index is a <code>char</code>, written with single quotes like <code>'L'</code>, not a string.</p>`,
        instructions: [
          "Ask <code>Enter your pet's name: </code> and read it.",
          "Print <code>Letters: 7</code> (the length), <code>First letter: B</code> and <code>Last letter: t</code> using indexing.",
          "Print <code>Shouting: BISCUIT</code> (upper case) and <code>Whispering: biscuit</code> (lower case)."
        ],
        starter: prog(`
Console.Write("Enter your pet's name: ");
string pet = Console.ReadLine();

// TODO: print Letters:, First letter: and Last letter:

// TODO: print Shouting: and Whispering:`),
        solution: prog(`
Console.Write("Enter your pet's name: ");
string pet = Console.ReadLine();

Console.WriteLine($"Letters: {pet.Length}");
Console.WriteLine($"First letter: {pet[0]}");
Console.WriteLine($"Last letter: {pet[pet.Length - 1]}");

Console.WriteLine($"Shouting: {pet.ToUpper()}");
Console.WriteLine($"Whispering: {pet.ToLower()}");`),
        stdin: ["Biscuit"],
        tests: [
          { type: "output", stdin: ["Biscuit"], includes: "Letters: 7", msg: "Biscuit has 7 letters: print Letters: 7", help: "When <code>Biscuit</code> is entered, your program should print <code>Letters: 7</code>. Use <code>pet.Length</code>." },
          { type: "fn", stdin: ["Biscuit"], fn: (out) => out.includes("First letter: B") && out.includes("Last letter: t"), msg: "For Biscuit print First letter: B and Last letter: t", help: "When <code>Biscuit</code> is entered, it should print <code>First letter: B</code> and <code>Last letter: t</code>. Use <code>pet[0]</code> and <code>pet[pet.Length - 1]</code>." },
          { type: "fn", stdin: ["Biscuit"], fn: (out) => out.includes("Shouting: BISCUIT") && out.includes("Whispering: biscuit"), msg: "Print Shouting: BISCUIT and Whispering: biscuit", help: "When <code>Biscuit</code> is entered, it should print <code>Shouting: BISCUIT</code> and <code>Whispering: biscuit</code>. Use <code>ToUpper()</code> and <code>ToLower()</code>, and check the labels." },
          { type: "fn", stdin: ["Rex"], fn: (out) => out.includes("Letters: 3") && out.includes("First letter: R") && out.includes("Last letter: x") && out.includes("Shouting: REX"), msg: "Works for other names too (try Rex).", help: "When <code>Rex</code> is entered, it should print Letters: 3, First letter: R, Last letter: x and Shouting: REX. Make sure you use <code>pet</code> everywhere, not the word Biscuit." },
          { type: "code", pattern: "\\.Length\\s*-\\s*1", msg: "Use Length - 1 to get the last character.", help: "The checker looks for <code>.Length - 1</code> in your code. Use it to find the last letter." }
        ],
        hint: "pet[0] is the first character; pet[pet.Length - 1] is the last.",
        goal: "The program asks for your pet's name and shows how many letters it has, its first and last letters, and the name in capitals and in lower case.",
        steps: [
          "Under the first TODO, print the length with <code>Console.WriteLine($\"Letters: {pet.Length}\");</code>. Press <strong>Run</strong> and type Biscuit.",
          "Print the first letter using <code>pet[0]</code> after the text <code>First letter: </code>.",
          "Print the last letter using <code>pet[pet.Length - 1]</code> after the text <code>Last letter: </code>.",
          "Under the second TODO, print <code>Shouting: </code> followed by <code>pet.ToUpper()</code>.",
          "Print <code>Whispering: </code> followed by <code>pet.ToLower()</code>. Run with Biscuit, then with Rex."
        ],
        hints: [
          "A string is like an array of characters, so you can use <code>Length</code> and square brackets with an index.",
          "The first character is at index 0 and the last is at <code>Length - 1</code>. <code>ToUpper()</code> and <code>ToLower()</code> give you new versions of the string.",
          "<code>Console.WriteLine($\"First letter: {pet[0]}\");\nConsole.WriteLine($\"Last letter: {pet[pet.Length - 1]}\");</code>"
        ],
        mistakes: [
          { wrong: "Using <code>pet[pet.Length]</code> for the last letter.", fix: "That index is one past the end and crashes. Use <code>pet.Length - 1</code>." },
          { wrong: "Writing <code>pet.ToUpper</code> without brackets.", fix: "It's a method, so it needs brackets: <code>pet.ToUpper()</code>." },
          { wrong: "Using <code>pet[1]</code> for the first letter.", fix: "Indexes start at 0, so the first letter is <code>pet[0]</code>." },
          { wrong: "Writing <code>pet.Length()</code> with brackets.", fix: "<code>Length</code> is a property, not a method: no brackets." }
        ]
      },

      // ---------------------------------------------------------------- l2
      {
        id: "m08-l2",
        title: "Substring and IndexOf",
        type: "code",
        learn: `
<p><code>Substring</code> cuts out part of a string. <code>IndexOf</code> finds where something is.</p>
<pre><code class="cs">string code = "BT74 6DF";

string area = code.Substring(0, 4);   // start at 0, take 4 chars: "BT74"
string rest = code.Substring(5);      // from index 5 to the end: "6DF"

int space = code.IndexOf(' ');        // 4
int none  = code.IndexOf('X');        // -1 (not found)</code></pre>
<ul>
<li><code>Substring(start, length)</code>: the second number is <strong>how many</strong> characters, not where to stop.</li>
<li><code>Substring(start)</code>: everything from <code>start</code> to the end.</li>
<li><code>IndexOf</code> gives the position of the <strong>first</strong> match, or <code>-1</code> if it's not there. It works with a <code>char</code> or a <code>string</code>.</li>
</ul>
<h3>Using them together</h3>
<p>Splitting a full name at the space:</p>
<pre><code class="cs">string full = "Grace Fairweather";
int gap = full.IndexOf(' ');
string first = full.Substring(0, gap);       // "Grace"
string last  = full.Substring(gap + 1);      // "Fairweather"</code></pre>
<p>This works for any length of name because you <em>find</em> the space rather than guessing where it is.</p>
<div class="warn">If <code>start + length</code> goes past the end of the string, C# throws <code>ArgumentOutOfRangeException</code>.</div>`,
        instructions: [
          "Ask <code>Enter an email address: </code> and read it.",
          "Use <code>IndexOf('@')</code> to find the @. If it's <code>-1</code>, print <code>Invalid email</code>.",
          "Otherwise use <code>Substring</code> to print <code>User: niamh</code> (everything before the @) and <code>Domain: school.org</code> (everything after it)."
        ],
        starter: prog(`
Console.Write("Enter an email address: ");
string email = Console.ReadLine();

int at = email.IndexOf('@');

// TODO: if at is -1, print Invalid email
// TODO: else use Substring to print User: and Domain:`),
        solution: prog(`
Console.Write("Enter an email address: ");
string email = Console.ReadLine();

int at = email.IndexOf('@');

if (at == -1)
{
    Console.WriteLine("Invalid email");
}
else
{
    string user = email.Substring(0, at);
    string domain = email.Substring(at + 1);
    Console.WriteLine($"User: {user}");
    Console.WriteLine($"Domain: {domain}");
}`),
        stdin: ["niamh@school.org"],
        tests: [
          { type: "output", stdin: ["niamh@school.org"], includes: "User: niamh", msg: "For niamh@school.org print User: niamh", help: "When <code>niamh@school.org</code> is entered, your program should print <code>User: niamh</code>. Use <code>email.Substring(0, at)</code>." },
          { type: "output", stdin: ["niamh@school.org"], includes: "Domain: school.org", msg: "For niamh@school.org print Domain: school.org", help: "When <code>niamh@school.org</code> is entered, it should print <code>Domain: school.org</code>. Use <code>email.Substring(at + 1)</code> so the @ is left out." },
          { type: "fn", stdin: ["oisin.games@pets.co.uk"], fn: (out) => out.includes("User: oisin.games") && out.includes("Domain: pets.co.uk"), msg: "Works for any email (try oisin.games@pets.co.uk).", help: "When <code>oisin.games@pets.co.uk</code> is entered, it should print User: oisin.games and Domain: pets.co.uk. Use <code>at</code> rather than fixed numbers so it works for any address." },
          { type: "fn", stdin: ["notanemail"], fn: (out) => out.includes("Invalid email") && !out.includes("User:"), msg: "An address with no @ should print Invalid email", help: "When <code>notanemail</code> is entered, it should print <code>Invalid email</code> and no User line. Put the Substring code in an <code>else</code>." },
          { type: "code", pattern: "Substring\\s*\\(", msg: "Use Substring.", help: "The checker looks for <code>Substring(</code> in your code. Use it to cut out the two parts." }
        ],
        hint: "email.Substring(0, at) is the part before the @; email.Substring(at + 1) is the part after it.",
        goal: "The program asks for an email address and splits it into the user part and the domain part, or says it's invalid if there's no @.",
        steps: [
          "Under the first TODO, write <code>if (at == -1)</code> with curly brackets, and print <code>Invalid email</code> inside. Press <strong>Run</strong> and type notanemail.",
          "Add an <code>else</code> with curly brackets.",
          "Inside the <code>else</code>, take the part before the @ with <code>string user = email.Substring(0, at);</code>.",
          "Next, take the part after the @ with <code>string domain = email.Substring(at + 1);</code>.",
          "Print <code>$\"User: {user}\"</code> and <code>$\"Domain: {domain}\"</code>. Run with niamh@school.org."
        ],
        hints: [
          "<code>at</code> already holds the position of the @, or -1 if there isn't one. Use it to decide where to cut.",
          "<code>Substring(0, at)</code> takes <code>at</code> characters from the start, which is everything before the @. <code>Substring(at + 1)</code> takes everything after it.",
          "<code>string user = email.Substring(0, at);\nstring domain = email.Substring(at + 1);</code>"
        ],
        mistakes: [
          { wrong: "Using <code>email.Substring(at)</code> for the domain, so it starts with @.", fix: "Skip the @ itself with <code>Substring(at + 1)</code>." },
          { wrong: "Thinking the second number in <code>Substring(start, length)</code> is where to stop.", fix: "It's how many characters to take. From 0, taking <code>at</code> characters ends just before the @." },
          { wrong: "Running the Substring lines even when there's no @.", fix: "Put them inside the <code>else</code> so they only run when <code>at</code> isn't -1." }
        ]
      },

      // ---------------------------------------------------------------- l3
      {
        id: "m08-l3",
        title: "Searching and tidying text",
        type: "code",
        learn: `
<p>C# has lots of handy methods for checking and cleaning up text. They all return a <code>bool</code> or a <em>new</em> string.</p>
<table>
<tr><th>Method</th><th>Example</th><th>Result</th></tr>
<tr><td><code>Contains</code></td><td><code>"chicken curry".Contains("curry")</code></td><td><code>True</code></td></tr>
<tr><td><code>StartsWith</code></td><td><code>"BT74 6DF".StartsWith("BT")</code></td><td><code>True</code></td></tr>
<tr><td><code>EndsWith</code></td><td><code>"photo.png".EndsWith(".jpg")</code></td><td><code>False</code></td></tr>
<tr><td><code>Replace</code></td><td><code>"a-b-c".Replace("-", "/")</code></td><td><code>"a/b/c"</code></td></tr>
<tr><td><code>Trim</code></td><td><code>"  hi  ".Trim()</code></td><td><code>"hi"</code></td></tr>
</table>
<h3>Cleaning input</h3>
<p>Users often type extra spaces by accident. <code>Trim()</code> removes spaces from both ends (not the middle). Combine it with <code>ToLower()</code> for really robust input:</p>
<pre><code class="cs">string answer = Console.ReadLine().Trim().ToLower();
// "  YES " becomes "yes"</code></pre>
<p>This is called <strong>method chaining</strong>: each method works on the result of the one before.</p>
<h3>Replace</h3>
<pre><code class="cs">string msg = "I love maths homework";
string better = msg.Replace("maths homework", "coding");
Console.WriteLine(better);   // I love coding</code></pre>
<p>These methods are case-sensitive too: <code>"Chicken".Contains("chicken")</code> is <code>false</code>. Convert to lower case first if you want to ignore case.</p>
<div class="tip">Remember to <strong>store</strong> the result: <code>msg.Replace(...)</code> on its own does nothing to <code>msg</code>, because strings are immutable.</div>`,
        instructions: [
          "Ask <code>Enter a file name: </code> and read it. Store a tidied copy using <code>Trim()</code> and <code>ToLower()</code>, then print it like <code>Tidied: my photo.png</code>",
          "If the tidied name <code>EndsWith(\".png\")</code> or <code>EndsWith(\".jpg\")</code>, print <code>That's an image.</code>, otherwise print <code>Not an image.</code>",
          "If it <code>Contains</code> a space, print <code>Safe name: my_photo.png</code> using <code>Replace</code> to change spaces into underscores. (Print nothing extra if there are no spaces.)",
          "If it <code>StartsWith(\"draft\")</code>, print <code>Remember to finish this!</code>"
        ],
        starter: prog(`
Console.Write("Enter a file name: ");
string name = Console.ReadLine();

// TODO: string tidy = name.Trim().ToLower();  then print Tidied:

// TODO: EndsWith .png or .jpg?

// TODO: Contains a space? print Safe name: using Replace

// TODO: StartsWith draft?`),
        solution: prog(`
Console.Write("Enter a file name: ");
string name = Console.ReadLine();

string tidy = name.Trim().ToLower();
Console.WriteLine($"Tidied: {tidy}");

if (tidy.EndsWith(".png") || tidy.EndsWith(".jpg"))
{
    Console.WriteLine("That's an image.");
}
else
{
    Console.WriteLine("Not an image.");
}

if (tidy.Contains(" "))
{
    Console.WriteLine("Safe name: " + tidy.Replace(" ", "_"));
}

if (tidy.StartsWith("draft"))
{
    Console.WriteLine("Remember to finish this!");
}`),
        stdin: ["  My Photo.PNG  "],
        tests: [
          { type: "output", stdin: ["  My Photo.PNG  "], includes: "Tidied: my photo.png", caseSensitive: true, msg: "\"  My Photo.PNG  \" should become Tidied: my photo.png", help: "When <code>  My Photo.PNG  </code> (with spaces) is entered, it should print <code>Tidied: my photo.png</code>. Use <code>name.Trim().ToLower()</code> and print the result." },
          { type: "fn", stdin: ["  My Photo.PNG  "], fn: (out) => out.includes("That's an image.") && out.includes("Safe name: my_photo.png") && !out.includes("finish"), msg: "My Photo.PNG is an image with a space: print That's an image. and Safe name: my_photo.png", help: "When <code>  My Photo.PNG  </code> is entered, it should print <code>That's an image.</code> and <code>Safe name: my_photo.png</code>, but not the draft reminder. Do the checks on <code>tidy</code>." },
          { type: "fn", stdin: ["Draft essay final.docx"], fn: (out) => out.includes("Not an image.") && out.includes("Safe name: draft_essay_final.docx") && out.includes("Remember to finish this!"), msg: "Draft essay final.docx: Not an image., Safe name: draft_essay_final.docx and Remember to finish this!", help: "When <code>Draft essay final.docx</code> is entered, it should print Not an image., Safe name: draft_essay_final.docx and Remember to finish this!. Make sure <code>StartsWith(\"draft\")</code> uses lower case." },
          { type: "fn", stdin: ["dog.jpg"], fn: (out) => out.includes("That's an image.") && !out.includes("Safe name") && !out.includes("finish"), msg: "dog.jpg has no space, so don't print a Safe name line.", help: "When <code>dog.jpg</code> is entered, it should print That's an image. and no Safe name line. Only print the Safe name inside <code>if (tidy.Contains(\" \"))</code>." },
          { type: "code", pattern: "\\.Replace\\s*\\(", msg: "Use Replace to change spaces to underscores.", help: "The checker looks for <code>.Replace(</code> in your code. Use it to change spaces into underscores." }
        ],
        hint: "string tidy = name.Trim().ToLower();  then  tidy.Replace(\" \", \"_\")",
        goal: "The program tidies a file name, says whether it's an image, suggests a safe name if it has spaces, and reminds you to finish drafts.",
        steps: [
          "Under the first TODO, write <code>string tidy = name.Trim().ToLower();</code> and print <code>$\"Tidied: {tidy}\"</code>. Press <strong>Run</strong>.",
          "Write <code>if (tidy.EndsWith(\".png\") || tidy.EndsWith(\".jpg\"))</code> that prints <code>That's an image.</code>, with an <code>else</code> that prints <code>Not an image.</code>.",
          "Write <code>if (tidy.Contains(\" \"))</code> that prints <code>\"Safe name: \" + tidy.Replace(\" \", \"_\")</code>. No <code>else</code> is needed.",
          "Write <code>if (tidy.StartsWith(\"draft\"))</code> that prints <code>Remember to finish this!</code>.",
          "Run with <code>  My Photo.PNG  </code>, then with <code>Draft essay final.docx</code>, then <code>dog.jpg</code>."
        ],
        hints: [
          "Tidy the name first, then use the tidied version for every check.",
          "<code>EndsWith</code>, <code>Contains</code> and <code>StartsWith</code> all give true or false, so they go straight inside an <code>if</code>. <code>Replace(\" \", \"_\")</code> gives a new string with underscores.",
          "<code>if (tidy.Contains(\" \"))\n{\n    Console.WriteLine(\"Safe name: \" + tidy.Replace(\" \", \"_\"));\n}</code>"
        ],
        mistakes: [
          { wrong: "Checking <code>name</code> instead of <code>tidy</code>.", fix: "<code>name</code> still has capitals and spaces at the ends. Use <code>tidy</code> for every check." },
          { wrong: "Calling <code>tidy.Replace(\" \", \"_\");</code> on its own line and then printing <code>tidy</code>.", fix: "Strings can't change. Use the result directly or store it: <code>string safe = tidy.Replace(...)</code>." },
          { wrong: "Using <code>else if</code> to join the image, space and draft checks.", fix: "They're separate questions. Use three separate <code>if</code> statements." },
          { wrong: "Checking <code>EndsWith(\".PNG\")</code> in capitals.", fix: "After <code>ToLower()</code> the name is all lower case, so check for <code>\".png\"</code>." }
        ]
      },

      // ---------------------------------------------------------------- l4
      {
        id: "m08-l4",
        title: "Split: reading CSV records",
        type: "code",
        learn: `
<p>Data is often stored as <strong>CSV</strong> (comma-separated values), one <strong>record</strong> per line:</p>
<pre><code>Aoife,14,Lions,23</code></pre>
<p><code>Split</code> breaks a string into an <strong>array</strong> wherever it finds a separator character. Each piece is called a <strong>field</strong>.</p>
<pre><code class="cs">string record = "Aoife,14,Lions,23";
string[] fields = record.Split(',');

Console.WriteLine(fields[0]);          // Aoife
Console.WriteLine(fields.Length);      // 4

int age = Convert.ToInt32(fields[1]);  // fields are strings, so convert numbers
int points = Convert.ToInt32(fields[3]);</code></pre>
<table>
<tr><th>Index</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
<tr><th>Field</th><td>Aoife</td><td>14</td><td>Lions</td><td>23</td></tr>
</table>
<p>You can split on any character: a space, a colon, a slash…</p>
<pre><code class="cs">string date = "27/10/2026";
string[] parts = date.Split('/');
Console.WriteLine("Month: " + parts[1]);   // 10</code></pre>
<div class="tip">Split works brilliantly with <code>foreach</code> when you want to do something with every word: <code>foreach (string w in sentence.Split(' '))</code>.</div>
<p>You'll use this a lot when you read data from files later in the course.</p>
<div class="warn">Every field from <code>Split</code> is a <code>string</code>. Adding <code>fields[1] + fields[3]</code> joins the text (<code>"1423"</code>) rather than adding the numbers. Convert first!</div>`,
        instructions: [
          "Ask <code>Enter a result (team,scored,conceded): </code> and read a line like <code>Lions,24,17</code>.",
          "Split it on commas, convert the two numbers to <code>int</code>, and print <code>Lions scored 24 and conceded 17</code>.",
          "Then print <code>Result: Win</code>, <code>Result: Draw</code> or <code>Result: Loss</code>, and <code>Points difference: 7</code> (scored minus conceded)."
        ],
        starter: prog(`
Console.Write("Enter a result (team,scored,conceded): ");
string line = Console.ReadLine();

// TODO: string[] fields = line.Split(',');
// TODO: convert fields[1] and fields[2] to int

// TODO: print ... scored ... and conceded ...
// TODO: print Result: Win / Draw / Loss
// TODO: print Points difference: ...`),
        solution: prog(`
Console.Write("Enter a result (team,scored,conceded): ");
string line = Console.ReadLine();

string[] fields = line.Split(',');
string team = fields[0];
int scored = Convert.ToInt32(fields[1]);
int conceded = Convert.ToInt32(fields[2]);

Console.WriteLine($"{team} scored {scored} and conceded {conceded}");

if (scored > conceded)
{
    Console.WriteLine("Result: Win");
}
else if (scored == conceded)
{
    Console.WriteLine("Result: Draw");
}
else
{
    Console.WriteLine("Result: Loss");
}

Console.WriteLine($"Points difference: {scored - conceded}");`),
        stdin: ["Lions,24,17"],
        tests: [
          { type: "output", stdin: ["Lions,24,17"], includes: "Lions scored 24 and conceded 17", msg: "Print Lions scored 24 and conceded 17", help: "When <code>Lions,24,17</code> is entered, your program should print <code>Lions scored 24 and conceded 17</code>. Check you split on <code>','</code> and use fields 0, 1 and 2." },
          { type: "fn", stdin: ["Lions,24,17"], fn: (out) => out.includes("Result: Win") && out.includes("Points difference: 7"), msg: "24 v 17 is a win with Points difference: 7", help: "When <code>Lions,24,17</code> is entered, it should print <code>Result: Win</code> and <code>Points difference: 7</code>. Convert both numbers to int and work out <code>scored - conceded</code>." },
          { type: "fn", stdin: ["Eagles,10,10"], fn: (out) => out.includes("Eagles scored 10 and conceded 10") && out.includes("Result: Draw") && out.includes("Points difference: 0"), msg: "Eagles,10,10 is a draw with Points difference: 0", help: "When <code>Eagles,10,10</code> is entered, it should print Eagles scored 10 and conceded 10, <code>Result: Draw</code> and <code>Points difference: 0</code>. Use <code>scored == conceded</code> for the draw." },
          { type: "fn", stdin: ["Tigers,3,31"], fn: (out) => out.includes("Result: Loss") && out.includes("Points difference: -28"), msg: "Tigers,3,31 is a loss with Points difference: -28", help: "When <code>Tigers,3,31</code> is entered, it should print <code>Result: Loss</code> and <code>Points difference: -28</code>. Make sure the difference is <code>scored - conceded</code>." },
          { type: "code", pattern: "\\.Split\\s*\\(", msg: "Use Split to break up the record.", help: "The checker looks for <code>.Split(</code> in your code. Use it to break the line into fields." }
        ],
        hint: "string[] fields = line.Split(','); then fields[0] is the team, Convert.ToInt32(fields[1]) is the score.",
        goal: "The program reads a match result typed as team,scored,conceded and reports the score, whether it was a win, draw or loss, and the points difference.",
        steps: [
          "Under the first TODO, write <code>string[] fields = line.Split(',');</code>.",
          "Store the parts: <code>string team = fields[0];</code>, <code>int scored = Convert.ToInt32(fields[1]);</code> and <code>int conceded = Convert.ToInt32(fields[2]);</code>.",
          "Print <code>$\"{team} scored {scored} and conceded {conceded}\"</code>. Press <strong>Run</strong> and type Lions,24,17.",
          "Write an <code>if</code> / <code>else if</code> / <code>else</code> that prints <code>Result: Win</code> when <code>scored &gt; conceded</code>, <code>Result: Draw</code> when they're equal, and <code>Result: Loss</code> otherwise.",
          "Print <code>$\"Points difference: {scored - conceded}\"</code>. Run with Eagles,10,10 and Tigers,3,31 too."
        ],
        hints: [
          "<code>Split(',')</code> breaks the line into an array of pieces wherever there's a comma.",
          "<code>fields[0]</code> is the team, <code>fields[1]</code> is scored and <code>fields[2]</code> is conceded. The numbers are text, so convert them with <code>Convert.ToInt32</code>.",
          "<code>string[] fields = line.Split(',');\nstring team = fields[0];\nint scored = Convert.ToInt32(fields[1]);\nint conceded = Convert.ToInt32(fields[2]);</code>"
        ],
        mistakes: [
          { wrong: "Doing sums with <code>fields[1]</code> without converting.", fix: "Fields are strings, so <code>+</code> joins the text. Convert with <code>Convert.ToInt32</code> first." },
          { wrong: "Using <code>fields[1]</code> for the team name.", fix: "Arrays start at 0, so the team is <code>fields[0]</code>." },
          { wrong: "Writing <code>scored = conceded</code> to test for a draw.", fix: "One <code>=</code> assigns. Use <code>==</code> to compare." },
          { wrong: "Working out <code>conceded - scored</code>.", fix: "The difference is <code>scored - conceded</code>, so a loss gives a negative number." }
        ]
      },

      // ---------------------------------------------------------------- l5
      {
        id: "m08-l5",
        title: "Password strength checker",
        type: "code",
        learn: `
<p>You can loop through a string one <code>char</code> at a time, just like an array. Combined with the <code>char</code> helper methods, this lets you check what kinds of characters a string contains.</p>
<table>
<tr><th>Method</th><th>True for…</th></tr>
<tr><td><code>char.IsDigit(c)</code></td><td><code>'0'</code> to <code>'9'</code></td></tr>
<tr><td><code>char.IsUpper(c)</code></td><td>capital letters</td></tr>
<tr><td><code>char.IsLower(c)</code></td><td>lower-case letters</td></tr>
<tr><td><code>char.IsLetter(c)</code></td><td>any letter</td></tr>
<tr><td><code>char.IsLetterOrDigit(c)</code></td><td>letters and digits (so <code>!</code> would be false)</td></tr>
</table>
<pre><code class="cs">string word = "Rugby7s";
int digits = 0;
bool hasUpper = false;

foreach (char c in word)
{
    if (char.IsDigit(c))
    {
        digits++;
    }
    if (char.IsUpper(c))
    {
        hasUpper = true;
    }
}
Console.WriteLine($"{digits} digit(s), capital letter: {hasUpper}");
// 1 digit(s), capital letter: True</code></pre>
<div class="key"><strong>Flag</strong> a <code>bool</code> variable that starts as <code>false</code> and is set to <code>true</code> when something is found.</div>
<div class="tip">A character that is <em>not</em> a letter or digit is a symbol: <code>!char.IsLetterOrDigit(c)</code>.</div>
<p>Real websites use checks like this when you sign up. Longer passwords with a mix of character types are much harder for an attacker to guess, because there are far more possible combinations to try.</p>`,
        instructions: [
          "Ask <code>Choose a password: </code> and read it.",
          "Loop through each character and work out a score out of 5: one point each for: length 8 or more; contains an upper-case letter; contains a lower-case letter; contains a digit; contains a symbol (not a letter or digit).",
          "Print <code>Score: 3/5</code>, then <code>Strong</code> if the score is 5, <code>Medium</code> if it's 3 or 4, otherwise <code>Weak</code>."
        ],
        starter: prog(`
Console.Write("Choose a password: ");
string pw = Console.ReadLine();

bool hasUpper = false;
bool hasLower = false;
bool hasDigit = false;
bool hasSymbol = false;

// TODO: foreach (char c in pw) - set the flags using char.IsUpper, IsLower, IsDigit, IsLetterOrDigit

int score = 0;
// TODO: add 1 to score for each rule that is met (including pw.Length >= 8)

// TODO: print Score: .../5 then Strong, Medium or Weak`),
        solution: prog(`
Console.Write("Choose a password: ");
string pw = Console.ReadLine();

bool hasUpper = false;
bool hasLower = false;
bool hasDigit = false;
bool hasSymbol = false;

foreach (char c in pw)
{
    if (char.IsUpper(c))
    {
        hasUpper = true;
    }
    else if (char.IsLower(c))
    {
        hasLower = true;
    }
    else if (char.IsDigit(c))
    {
        hasDigit = true;
    }
    else if (!char.IsLetterOrDigit(c))
    {
        hasSymbol = true;
    }
}

int score = 0;
if (pw.Length >= 8) score++;
if (hasUpper) score++;
if (hasLower) score++;
if (hasDigit) score++;
if (hasSymbol) score++;

Console.WriteLine($"Score: {score}/5");
if (score == 5)
{
    Console.WriteLine("Strong");
}
else if (score >= 3)
{
    Console.WriteLine("Medium");
}
else
{
    Console.WriteLine("Weak");
}`),
        stdin: ["Lions2026!"],
        tests: [
          { type: "fn", stdin: ["Lions2026!"], fn: (out) => out.includes("Score: 5/5") && /\bStrong\b/.test(out), msg: "Lions2026! meets all five rules: Score: 5/5 and Strong", help: "When <code>Lions2026!</code> is entered, your program should print <code>Score: 5/5</code> and <code>Strong</code>. Check all four flags and the length rule each add 1." },
          { type: "fn", stdin: ["football"], fn: (out) => out.includes("Score: 2/5") && /\bWeak\b/.test(out), msg: "football (long, lower case only) should score 2/5: Weak", help: "When <code>football</code> is entered, it should print <code>Score: 2/5</code> and <code>Weak</code>. If you get more than 2, you may be adding to the score inside the loop." },
          { type: "fn", stdin: ["Pass12"], fn: (out) => out.includes("Score: 3/5") && /\bMedium\b/.test(out), msg: "Pass12 (upper, lower, digit but short) should score 3/5: Medium", help: "When <code>Pass12</code> is entered, it should print <code>Score: 3/5</code> and <code>Medium</code>. It's only 6 characters, so check the length rule is <code>pw.Length &gt;= 8</code>." },
          { type: "fn", stdin: ["abc"], fn: (out) => out.includes("Score: 1/5") && /\bWeak\b/.test(out), msg: "abc should score 1/5: Weak", help: "When <code>abc</code> is entered, it should print <code>Score: 1/5</code> and <code>Weak</code>. Only the lower-case flag should be true." },
          { type: "fn", stdin: ["MY DOG IS 7"], fn: (out) => out.includes("Score: 4/5") && /\bMedium\b/.test(out), msg: "MY DOG IS 7 (long, upper, digit, spaces count as symbols) should score 4/5: Medium", help: "When <code>MY DOG IS 7</code> is entered, it should print <code>Score: 4/5</code> and <code>Medium</code>. Spaces count as symbols, so use <code>!char.IsLetterOrDigit(c)</code>." },
          { type: "code", pattern: "foreach\\s*\\(|for\\s*\\(", msg: "Loop through the characters.", help: "The checker looks for a <code>foreach</code> or <code>for</code> loop. Loop through the characters of <code>pw</code>." }
        ],
        hint: "Inside foreach (char c in pw): if (char.IsUpper(c)) hasUpper = true; and so on. A symbol is !char.IsLetterOrDigit(c).",
        goal: "The program asks for a password, gives it a strength score out of 5, and says whether it is Strong, Medium or Weak.",
        steps: [
          "Under the first TODO, write <code>foreach (char c in pw)</code> with curly brackets.",
          "Inside, add <code>if (char.IsUpper(c))</code> that sets <code>hasUpper = true;</code>. Add similar checks with <code>char.IsLower</code> and <code>char.IsDigit</code> for the other flags.",
          "Add one more: <code>if (!char.IsLetterOrDigit(c))</code> sets <code>hasSymbol = true;</code>.",
          "After the loop, under the score TODO, add <code>if (pw.Length &gt;= 8) score++;</code>, then one <code>if</code> for each flag, e.g. <code>if (hasUpper) score++;</code>.",
          "Print <code>$\"Score: {score}/5\"</code>. Press <strong>Run</strong> with Lions2026!: you should see 5/5.",
          "Add an <code>if</code> / <code>else if</code> / <code>else</code> that prints <code>Strong</code> (5), <code>Medium</code> (3 or more) or <code>Weak</code>. Try football and abc."
        ],
        hints: [
          "Look at each character in turn. Each flag starts as <code>false</code> and becomes <code>true</code> as soon as you find that kind of character.",
          "Use <code>char.IsUpper</code>, <code>char.IsLower</code>, <code>char.IsDigit</code> and <code>!char.IsLetterOrDigit</code> inside the loop. After the loop, add 1 to <code>score</code> for each flag that's true, plus one for length 8 or more.",
          "<code>foreach (char c in pw)\n{\n    if (char.IsUpper(c))\n    {\n        hasUpper = true;\n    }\n    if (!char.IsLetterOrDigit(c))\n    {\n        hasSymbol = true;\n    }\n    // ...IsLower and IsDigit the same way...\n}</code>"
        ],
        mistakes: [
          { wrong: "Adding to <code>score</code> inside the loop, so a password with three capitals scores 3 for capitals.", fix: "Inside the loop just set the flags. Add up the score once, after the loop." },
          { wrong: "Checking <code>Strong</code>/<code>Medium</code> in the wrong order, e.g. <code>score &gt;= 3</code> first.", fix: "Check <code>score == 5</code> first, then <code>score &gt;= 3</code>, then <code>else</code>." },
          { wrong: "Forgetting the length rule.", fix: "Add <code>if (pw.Length &gt;= 8) score++;</code>." },
          { wrong: "Missing the <code>!</code> in the symbol check.", fix: "A symbol is <em>not</em> a letter or digit: <code>!char.IsLetterOrDigit(c)</code>." }
        ]
      },

      // ---------------------------------------------------------------- l6
      {
        id: "m08-l6",
        title: "ASCII and the Caesar cipher",
        type: "code",
        learn: `
<p>Computers store every character as a number called its <strong>character code</strong>. In <strong>ASCII</strong>, <code>'A'</code> is 65, <code>'B'</code> is 66 … <code>'Z'</code> is 90, and <code>'a'</code> is 97.</p>
<p>In C# you can switch between a <code>char</code> and its code by <strong>casting</strong>:</p>
<pre><code class="cs">char letter = 'C';
int code = (int)letter;          // 67
char next = (char)(code + 1);    // 'D'
Console.WriteLine(letter + 1);   // 68 (char arithmetic gives an int!)</code></pre>
<h3>The Caesar cipher</h3>
<p>Julius Caesar hid messages by shifting every letter along the alphabet. With a shift of 3, <code>A→D</code>, <code>B→E</code> … and at the end it wraps round: <code>X→A</code>, <code>Y→B</code>, <code>Z→C</code>.</p>
<p>To wrap round, turn the letter into a position from 0 to 25, add the shift, use <code>% 26</code>, then turn it back:</p>
<pre><code class="cs">char c = 'Y';
int pos = c - 'A';                  // 24
int newPos = (pos + 3) % 26;        // 27 % 26 = 1
char shifted = (char)('A' + newPos);   // 'B'</code></pre>
<p>Build the secret message one character at a time by adding to an empty string: <code>result += shifted;</code></p>
<div class="tip">Only shift letters. Leave spaces and punctuation as they are, so the message keeps its word gaps.</div>`,
        instructions: [
          "Ask <code>Message: </code> and read it, converting it to upper case. Then ask <code>Shift: </code> and read a whole number (0 to 25).",
          "Loop through each character. If it's a letter, shift it using the method above (with wrap-round). Otherwise keep it unchanged.",
          "Print <code>Encrypted: KHOOR ZRUOG</code> (the result)."
        ],
        starter: prog(`
Console.Write("Message: ");
string message = Console.ReadLine().ToUpper();
Console.Write("Shift: ");
int shift = Convert.ToInt32(Console.ReadLine());

string result = "";

// TODO: foreach (char c in message)
//     if char.IsLetter(c): work out pos, newPos and shifted, then add shifted to result
//     else: add c to result unchanged

Console.WriteLine("Encrypted: " + result);`),
        solution: prog(`
Console.Write("Message: ");
string message = Console.ReadLine().ToUpper();
Console.Write("Shift: ");
int shift = Convert.ToInt32(Console.ReadLine());

string result = "";

foreach (char c in message)
{
    if (char.IsLetter(c))
    {
        int pos = c - 'A';
        int newPos = (pos + shift) % 26;
        char shifted = (char)('A' + newPos);
        result += shifted;
    }
    else
    {
        result += c;
    }
}

Console.WriteLine("Encrypted: " + result);`),
        stdin: ["hello world", "3"],
        tests: [
          { type: "output", stdin: ["hello world", "3"], includes: "Encrypted: KHOOR ZRUOG", caseSensitive: true, msg: "hello world with shift 3 should give Encrypted: KHOOR ZRUOG", help: "When the inputs are <code>hello world</code> and <code>3</code>, it should print <code>Encrypted: KHOOR ZRUOG</code>. Check you add each shifted letter to <code>result</code> with <code>+=</code> and keep the space." },
          { type: "output", stdin: ["xyz", "3"], includes: "Encrypted: ABC", caseSensitive: true, msg: "xyz with shift 3 should wrap round to Encrypted: ABC", help: "When the inputs are <code>xyz</code> and <code>3</code>, it should print <code>Encrypted: ABC</code>. Use <code>(pos + shift) % 26</code> to wrap round past Z." },
          { type: "output", stdin: ["Go Lions!", "1"], includes: "Encrypted: HP MJPOT!", caseSensitive: true, msg: "Go Lions! with shift 1 should give Encrypted: HP MJPOT! (punctuation unchanged)", help: "When the inputs are <code>Go Lions!</code> and <code>1</code>, it should print <code>Encrypted: HP MJPOT!</code>. Only shift letters; spaces and <code>!</code> go into <code>result</code> unchanged." },
          { type: "output", stdin: ["Zebra", "25"], includes: "Encrypted: YDAQZ", caseSensitive: true, msg: "Zebra with shift 25 should give Encrypted: YDAQZ", help: "When the inputs are <code>Zebra</code> and <code>25</code>, it should print <code>Encrypted: YDAQZ</code>. Check the wrap-round with <code>% 26</code> works for big shifts." },
          { type: "code", pattern: "\\(\\s*char\\s*\\)", msg: "Cast back to a char with (char).", help: "The checker looks for <code>(char)</code> in your code. Cast the new position back into a letter." },
          { type: "code", pattern: "%\\s*26", msg: "Use % 26 to wrap round the alphabet.", help: "The checker looks for <code>% 26</code> in your code. Use it to wrap round the alphabet." }
        ],
        hint: "int pos = c - 'A'; int newPos = (pos + shift) % 26; char shifted = (char)('A' + newPos);",
        goal: "The program asks for a message and a shift number, then encrypts the message with a Caesar cipher, leaving spaces and punctuation as they are.",
        steps: [
          "Under the TODO, write <code>foreach (char c in message)</code> with curly brackets.",
          "Inside, write <code>if (char.IsLetter(c))</code> with curly brackets, and an <code>else</code> that does <code>result += c;</code>.",
          "Inside the <code>if</code>, work out the position: <code>int pos = c - 'A';</code>.",
          "Next, shift and wrap round: <code>int newPos = (pos + shift) % 26;</code>.",
          "Turn it back into a letter with <code>char shifted = (char)('A' + newPos);</code> and add it: <code>result += shifted;</code>.",
          "Press <strong>Run</strong> with hello world and 3. You should see <code>Encrypted: KHOOR ZRUOG</code>. Then try xyz and 3."
        ],
        hints: [
          "Go through the message one character at a time. Letters get shifted; anything else is copied across unchanged.",
          "Turn the letter into a number from 0 to 25 with <code>c - 'A'</code>, add the shift, use <code>% 26</code> to wrap, then cast back with <code>(char)</code>.",
          "<code>int pos = c - 'A';\nint newPos = (pos + shift) % 26;\nchar shifted = (char)('A' + newPos);\nresult += shifted;</code>"
        ],
        mistakes: [
          { wrong: "Leaving out <code>% 26</code>, so X, Y, Z turn into symbols like <code>[</code>.", fix: "<code>% 26</code> wraps the position back round to the start of the alphabet." },
          { wrong: "Writing <code>result = shifted;</code>, so only the last letter is kept.", fix: "Use <code>+=</code> to add each character to the end of <code>result</code>." },
          { wrong: "Shifting spaces and punctuation too.", fix: "Only shift when <code>char.IsLetter(c)</code> is true. In the <code>else</code>, add <code>c</code> unchanged." },
          { wrong: "Forgetting the <code>(char)</code> cast, so numbers appear in the result.", fix: "<code>'A' + newPos</code> is an int. Cast it: <code>(char)('A' + newPos)</code>." }
        ]
      },

      // ---------------------------------------------------------------- l7
      {
        id: "m08-l7",
        title: "Building usernames",
        type: "code",
        learn: `
<p>Schools often make usernames from parts of a pupil's details. This is a great exam-style task that mixes several string methods.</p>
<p>Suppose the rule is: <em>first 3 letters of the surname + first letter of the first name + the last two digits of the year they started, all in lower case</em>.</p>
<pre><code class="cs">string first = "Ciarán";
string surname = "Mulberry";
int year = 2024;

string part1 = surname.Substring(0, 3);         // "Mul"
string part2 = first.Substring(0, 1);           // "C"
string part3 = (year % 100).ToString();         // "24"

string username = (part1 + part2 + part3).ToLower();
Console.WriteLine(username);                     // mulc24</code></pre>
<h3>Watch out for short names!</h3>
<p>What if the surname is <code>Ng</code>? <code>Substring(0, 3)</code> would ask for 3 characters from a 2-letter string and crash. Use <code>Math.Min</code> to take at most 3:</p>
<pre><code class="cs">int take = Math.Min(3, surname.Length);
string part1 = surname.Substring(0, take);     // "Ng"</code></pre>
<div class="tip"><code>year % 100</code> gives the last two digits, but <code>2005 % 100</code> is <code>5</code>, not <code>05</code>. Formatting with <code>(year % 100).ToString("D2")</code> pads it to two digits: <code>05</code>.</div>`,
        instructions: [
          "Ask <code>First name: </code>, <code>Surname: </code> and <code>Year started: </code> (a whole number). Use <code>Trim()</code> on the names.",
          "Build the username: up to the first 3 letters of the surname + the first letter of the first name + the last two digits of the year (always 2 digits), all lower case.",
          "Print <code>Your username is: mulc24</code>"
        ],
        starter: prog(`
Console.Write("First name: ");
string first = Console.ReadLine().Trim();
Console.Write("Surname: ");
string surname = Console.ReadLine().Trim();
Console.Write("Year started: ");
int year = Convert.ToInt32(Console.ReadLine());

// TODO: part1 = up to 3 letters of surname (use Math.Min)
// TODO: part2 = first letter of first name
// TODO: part3 = last two digits of year, using ToString("D2")
// TODO: join, make lower case and print Your username is: ...`),
        solution: prog(`
Console.Write("First name: ");
string first = Console.ReadLine().Trim();
Console.Write("Surname: ");
string surname = Console.ReadLine().Trim();
Console.Write("Year started: ");
int year = Convert.ToInt32(Console.ReadLine());

int take = Math.Min(3, surname.Length);
string part1 = surname.Substring(0, take);
string part2 = first.Substring(0, 1);
string part3 = (year % 100).ToString("D2");

string username = (part1 + part2 + part3).ToLower();
Console.WriteLine("Your username is: " + username);`),
        stdin: ["Ciarán", "Mulberry", "2024"],
        tests: [
          { type: "output", stdin: ["Ciarán", "Mulberry", "2024"], includes: "Your username is: mulc24", caseSensitive: true, msg: "Ciarán Mulberry, 2024 should give Your username is: mulc24", help: "When the inputs are <code>Ciarán</code>, <code>Mulberry</code>, <code>2024</code>, it should print <code>Your username is: mulc24</code>. Check the order: surname part, then first initial, then year, all lower case." },
          { type: "output", stdin: [" Grace ", " Ng ", "2023"], includes: "Your username is: ngg23", caseSensitive: true, msg: "Grace Ng, 2023 should give ngg23 (short surname, and trim the spaces).", help: "When the inputs are <code> Grace </code>, <code> Ng </code>, <code>2023</code>, it should print <code>Your username is: ngg23</code>. Use <code>Math.Min(3, surname.Length)</code> so short surnames don't crash." },
          { type: "output", stdin: ["Ben", "Appleby", "2005"], includes: "Your username is: appb05", caseSensitive: true, msg: "Ben Appleby, 2005 should give appb05 (year padded to two digits).", help: "When the inputs are <code>Ben</code>, <code>Appleby</code>, <code>2005</code>, it should print <code>Your username is: appb05</code>. Use <code>ToString(\"D2\")</code> so the year is always two digits." },
          { type: "code", pattern: "Substring\\s*\\(", msg: "Use Substring to take parts of the names.", help: "The checker looks for <code>Substring(</code> in your code. Use it to take parts of the names." }
        ],
        hint: "surname.Substring(0, Math.Min(3, surname.Length)) + first.Substring(0, 1) + (year % 100).ToString(\"D2\"), then .ToLower().",
        goal: "The program asks for a first name, surname and the year you started, and builds a lower-case school username from them.",
        steps: [
          "Under the first TODO, write <code>int take = Math.Min(3, surname.Length);</code> and then <code>string part1 = surname.Substring(0, take);</code>.",
          "Under the next TODO, write <code>string part2 = first.Substring(0, 1);</code>.",
          "Under the year TODO, write <code>string part3 = (year % 100).ToString(\"D2\");</code>.",
          "Join them and make them lower case: <code>string username = (part1 + part2 + part3).ToLower();</code>.",
          "Print <code>\"Your username is: \" + username</code>. Press <strong>Run</strong> with Ciarán, Mulberry, 2024, then try Grace, Ng, 2023."
        ],
        hints: [
          "Build the username from three pieces: part of the surname, the first letter of the first name, and the last two digits of the year.",
          "Use <code>Substring(0, ...)</code> for the name parts, <code>Math.Min</code> so short surnames don't crash, and <code>year % 100</code> for the last two digits.",
          "<code>int take = Math.Min(3, surname.Length);\nstring part1 = surname.Substring(0, take);\nstring part3 = (year % 100).ToString(\"D2\");</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>surname.Substring(0, 3)</code>, which crashes for Ng.", fix: "Use <code>Math.Min(3, surname.Length)</code> as the length." },
          { wrong: "Using <code>(year % 100).ToString()</code>, so 2005 gives <code>5</code>.", fix: "Use <code>ToString(\"D2\")</code> to pad it to <code>05</code>." },
          { wrong: "Forgetting <code>ToLower()</code>, giving <code>MulC24</code>.", fix: "Wrap the joined parts in brackets and call <code>.ToLower()</code>." },
          { wrong: "Adding <code>part3</code> as an int, so the numbers get added instead of joined.", fix: "Keep all three parts as strings before joining them with <code>+</code>." }
        ]
      },

      // ---------------------------------------------------------------- l8
      {
        id: "m08-l8",
        title: "Join, PadLeft and PadRight tables",
        type: "code",
        learn: `
<p>Two more tools help you present text neatly.</p>
<h3>string.Join</h3>
<p><code>string.Join</code> glues all the elements of an array or list together, with a separator between each one. It's the opposite of <code>Split</code>.</p>
<pre><code class="cs">string[] toppings = { "cheese", "ham", "pineapple" };
Console.WriteLine(string.Join(", ", toppings));
// cheese, ham, pineapple</code></pre>
<h3>PadRight and PadLeft</h3>
<p>To line text up in columns, pad it with spaces to a fixed width. <code>PadRight</code> adds spaces on the right (left-aligned text, good for names). <code>PadLeft</code> adds them on the left (right-aligned, good for numbers).</p>
<pre><code class="cs">string[] items = { "Toastie", "Soup", "Smoothie" };
double[] prices = { 2.5, 1.8, 2.25 };

for (int i = 0; i &lt; items.Length; i++)
{
    Console.WriteLine(items[i].PadRight(10) + prices[i].ToString("F2").PadLeft(6));
}</code></pre>
<pre><code>Toastie     2.50
Soup        1.80
Smoothie    2.25</code></pre>
<p><code>"Soup".PadRight(10)</code> is <code>"Soup"</code> followed by 6 spaces, so the total width is 10.</p>
<div class="tip">This only lines up in a <strong>monospaced</strong> font, where every character is the same width. Consoles use monospaced fonts.</div>`,
        instructions: [
          "Print a header line: <code>\"Pupil\".PadRight(10)</code> followed by <code>\"Points\".PadLeft(6)</code>.",
          "Loop through the parallel arrays and print each pupil's name with <code>PadRight(10)</code> followed by their points with <code>PadLeft(6)</code>, e.g. <code>Aoife        120</code>.",
          "Finally print <code>Team: Aoife, Ben, Niamh, Oisín</code> using <code>string.Join</code>."
        ],
        starter: prog(`
string[] names = { "Aoife", "Ben", "Niamh", "Oisín" };
int[] points = { 120, 85, 210, 64 };

// TODO: print the header with PadRight(10) and PadLeft(6)

// TODO: for loop printing each row

// TODO: print Team: ... using string.Join(", ", names)`),
        solution: prog(`
string[] names = { "Aoife", "Ben", "Niamh", "Oisín" };
int[] points = { 120, 85, 210, 64 };

Console.WriteLine("Pupil".PadRight(10) + "Points".PadLeft(6));

for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine(names[i].PadRight(10) + points[i].ToString().PadLeft(6));
}

Console.WriteLine("Team: " + string.Join(", ", names));`),
        tests: [
          { type: "output", includes: "Pupil     Points", caseSensitive: true, msg: "The header should be Pupil padded to 10, then Points padded to 6.", help: "The checker wants the header <code>Pupil     Points</code>. Use <code>\"Pupil\".PadRight(10) + \"Points\".PadLeft(6)</code> with nothing in between." },
          { type: "fn", fn: (out) => [["Aoife", 120], ["Ben", 85], ["Niamh", 210], ["Oisín", 64]].every(([n, p]) => out.includes(n.padEnd(10) + String(p).padStart(6))), msg: "Each row should be the name padded to 10 then the points padded to 6 (e.g. \"Ben           85\").", help: "Each row should be the name padded to 10, then the points padded to 6. Use <code>names[i].PadRight(10) + points[i].ToString().PadLeft(6)</code> in a loop." },
          { type: "output", includes: "Team: Aoife, Ben, Niamh, Oisín", msg: "Print Team: Aoife, Ben, Niamh, Oisín", help: "The checker wants <code>Team: Aoife, Ben, Niamh, Oisín</code>. Use <code>string.Join(\", \", names)</code> with a comma and a space." },
          { type: "code", pattern: "string\\.Join\\s*\\(", msg: "Use string.Join.", help: "The checker looks for <code>string.Join(</code> in your code. Use it instead of joining the names by hand." },
          { type: "code", pattern: "PadRight\\s*\\([\\s\\S]*PadLeft\\s*\\(|PadLeft\\s*\\([\\s\\S]*PadRight\\s*\\(", msg: "Use PadRight and PadLeft.", help: "The checker looks for both <code>PadRight</code> and <code>PadLeft</code>. Use PadRight for names and PadLeft for points." }
        ],
        hint: "names[i].PadRight(10) + points[i].ToString().PadLeft(6)",
        goal: "The program prints a neat table of pupils and their points in lined-up columns, then lists the whole team on one line.",
        steps: [
          "Under the header TODO, print <code>\"Pupil\".PadRight(10) + \"Points\".PadLeft(6)</code>. Press <strong>Run</strong> to see it.",
          "Under the next TODO, write <code>for (int i = 0; i &lt; names.Length; i++)</code> with curly brackets.",
          "Inside, print <code>names[i].PadRight(10) + points[i].ToString().PadLeft(6)</code>. Run it: the numbers should line up on the right.",
          "Under the last TODO, print <code>\"Team: \" + string.Join(\", \", names)</code>. Run again."
        ],
        hints: [
          "Padding adds spaces so each column is always the same width. Names go on the left, numbers on the right.",
          "<code>PadRight(10)</code> makes the name 10 characters wide. Points are ints, so turn them into a string with <code>ToString()</code> before calling <code>PadLeft(6)</code>.",
          "<code>Console.WriteLine(names[i].PadRight(10) + points[i].ToString().PadLeft(6));</code>"
        ],
        mistakes: [
          { wrong: "Calling <code>points[i].PadLeft(6)</code> on an int.", fix: "Only strings have <code>PadLeft</code>. Write <code>points[i].ToString().PadLeft(6)</code>." },
          { wrong: "Swapping them: names with <code>PadLeft</code> and points with <code>PadRight</code>.", fix: "Names use <code>PadRight(10)</code>; points use <code>PadLeft(6)</code>." },
          { wrong: "Adding an extra space between the two columns.", fix: "The padding already makes the gap. Just join the two parts with <code>+</code>." },
          { wrong: "Writing <code>string.Join(names, \", \")</code>.", fix: "The separator comes first: <code>string.Join(\", \", names)</code>." }
        ]
      },

      // ---------------------------------------------------------------- quiz
      {
        id: "m08-quiz",
        title: "Checkpoint: strings",
        type: "quiz",
        questions: [
          { q: "What does <code>\"Enniskillen\".Length</code> return?",
            options: ["10", "11", "12", "9"],
            answer: 1, explain: "E-n-n-i-s-k-i-l-l-e-n is 11 characters." },
          { q: "What is <code>\"Rugby\"[1]</code>?",
            options: ["'R'", "'u'", "'g'", "An error"],
            answer: 1, explain: "Indexes start at 0, so index 1 is the second character, 'u'." },
          { q: "What does <code>\"Football\".Substring(4, 3)</code> give?",
            options: ["\"ball\"", "\"bal\"", "\"tba\"", "\"oot\""],
            answer: 1, explain: "Start at index 4 ('b') and take 3 characters: \"bal\"." },
          { q: "What does <code>\"canteen\".IndexOf('z')</code> return?",
            options: ["0", "null", "-1", "An exception"],
            answer: 2, explain: "IndexOf returns -1 when the character isn't found." },
          { q: "<code>\"Ben,15,Eagles\".Split(',')</code> produces…",
            options: ["A string with the commas removed", "An array of 3 strings", "An array of 2 strings", "A List&lt;int&gt;"],
            answer: 1, explain: "Split returns a string array: { \"Ben\", \"15\", \"Eagles\" }." },
          { q: "Which expression is true when <code>c</code> is a symbol such as <code>!</code>?",
            options: ["char.IsDigit(c)", "char.IsLetter(c)", "!char.IsLetterOrDigit(c)", "char.IsUpper(c)"],
            answer: 2, explain: "A symbol is neither a letter nor a digit, so IsLetterOrDigit is false and ! makes it true." },
          { q: "What is <code>(char)('A' + 2)</code>?",
            options: ["'C'", "67", "\"A2\"", "'B'"],
            answer: 0, explain: "'A' is 65; 65 + 2 = 67, and casting 67 to char gives 'C'." },
          { q: "After <code>string s = \"hi\"; s.ToUpper();</code> what is <code>s</code>?",
            options: ["\"HI\"", "\"hi\"", "\"Hi\"", "null"],
            answer: 1, explain: "Strings are immutable. ToUpper returns a new string, but it wasn't stored, so s is still \"hi\"." }
        ]
      }
    ]
  });
})();
