// Module 11: File handling
(function () {
  const cs = String.raw;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const trim = (s) => s.replace(/^\n+/, "").replace(/\s+$/, "");
  const pre = (s) => `<pre><code class="cs">${esc(trim(s))}</code></pre>`;
  const out = (s) => `<pre><code>${esc(trim(s))}</code></pre>`;
  function prog(body, opts) {
    opts = opts || {};
    const ind = (s, n) => trim(s).split("\n").map((l) => (l.trim() ? " ".repeat(n) + l : "")).join("\n");
    let src = (opts.usings || "using System;\nusing System.IO;") + "\n\n";
    src += "class Program\n{\n";
    if (opts.before) src += ind(opts.before, 4) + "\n\n";
    src += "    static void Main(string[] args)\n    {\n" + ind(body, 8) + "\n    }\n";
    if (opts.after) src += "\n" + ind(opts.after, 4) + "\n";
    return src + "}\n";
  }
  const lines = (s) => String(s || "").replace(/\r/g, "").split("\n").map((l) => l.trim()).filter((l) => l !== "");

  COURSE.addModule({
    id: "m11",
    title: "File handling",
    icon: "file",
    summary: "Make your data last by writing to and reading from text files, including CSV records and a high score table.",
    lessons: [
      // ------------------------------------------------------------------ l1
      {
        id: "m11-l1",
        title: "Why files? Writing and reading text",
        type: "code",
        learn: cs`
<p>Every program you've written so far forgets everything the moment it stops. Variables, arrays and lists live in <strong>RAM</strong>, which is <em>volatile</em>: it's wiped when the program ends. To keep a high score, a list of users or a saved game, you need to store it in a <strong>file</strong> on secondary storage.</p>
<div class="key"><strong>Persistence</strong> data that survives after the program closes, because it has been saved to secondary storage (for example in a text file).</div>
<h3>Where do the files go?</h3>
<p>On this site, files live in a small <strong>virtual file system</strong> inside your browser, so you can create and read files without installing anything. You'll see them in the files panel. In Visual Studio, a file name with no folder (like <code>notes.txt</code>) is created next to your program, in the project's <code>bin\Debug\net8.0</code> folder.</p>
<h3>The File class</h3>
<p>Add <code>using System.IO;</code> at the top. Then two methods do most of the work:</p>
${pre(cs`
using System.IO;
...
File.WriteAllText("motto.txt", "Work hard, play fair");
string motto = File.ReadAllText("motto.txt");
Console.WriteLine("The motto is: " + motto);`)}
<ul>
<li><code>File.WriteAllText(name, text)</code> creates the file and writes the text. <strong>If the file already exists, it is overwritten.</strong></li>
<li><code>File.ReadAllText(name)</code> reads the whole file into one string.</li>
</ul>
<div class="warn">WriteAllText replaces everything that was in the file. Next lesson you'll see how to add to a file instead.</div>`,
        instructions: [
          "Ask <code>What is your favourite film? </code> and read the answer.",
          "Save the answer to a file called <code>film.txt</code> using <code>File.WriteAllText</code>.",
          "Read it back from the file with <code>File.ReadAllText</code> and print <code>Saved to file: </code> followed by the file's contents, e.g. <code>Saved to file: Paddington</code>"
        ],
        starter: prog(cs`
Console.Write("What is your favourite film? ");
string film = Console.ReadLine();

// TODO: write film to film.txt

// TODO: read film.txt back and print Saved to file: ...`),
        solution: prog(cs`
Console.Write("What is your favourite film? ");
string film = Console.ReadLine();

File.WriteAllText("film.txt", film);

string fromFile = File.ReadAllText("film.txt");
Console.WriteLine("Saved to file: " + fromFile);`),
        stdin: ["Paddington"],
        tests: [
          { type: "fn", stdin: ["Paddington"], fn: (o, c, f) => f["film.txt"] !== undefined && f["film.txt"].trim() === "Paddington", msg: "film.txt should contain Paddington.", help: "This check reads <code>film.txt</code> after your program runs with the input <code>Paddington</code>. Use <code>File.WriteAllText(\"film.txt\", film);</code> with the variable, not a fixed word." },
          { type: "output", stdin: ["Paddington"], includes: "Saved to file: Paddington", msg: "Print Saved to file: Paddington", help: "With the input <code>Paddington</code>, it should print <code>Saved to file: Paddington</code>. Check the spelling and the space after the colon." },
          { type: "fn", stdin: ["Wicked"], fn: (o, c, f) => (f["film.txt"] || "").trim() === "Wicked" && o.includes("Saved to file: Wicked"), msg: "It should work for any film, e.g. Wicked.", help: "With the input <code>Wicked</code>, the file and the output should both say Wicked. If not, you may have typed a film name into the code instead of using the variable." },
          { type: "code", pattern: "File\\.ReadAllText", msg: "Read the file back with File.ReadAllText.", help: "This check looks for <code>File.ReadAllText</code> in your code. Read the file back rather than printing the original variable." }
        ],
        hint: "File.WriteAllText(\"film.txt\", film); then string fromFile = File.ReadAllText(\"film.txt\");",
        goal: "The program asks for your favourite film, saves it to film.txt, then reads it back from the file and shows it.",
        steps: [
          "Find <code>// TODO: write film to film.txt</code>.",
          "Write <code>File.WriteAllText(\"film.txt\", film);</code> underneath it.",
          "Run it and open the files panel: you should see <code>film.txt</code> with your film inside.",
          "Under the second TODO, read the file into a new variable: <code>string fromFile = File.ReadAllText(\"film.txt\");</code>",
          "Print <code>\"Saved to file: \" + fromFile</code>. Run it again to check."
        ],
        hints: [
          "There are two jobs: put the text into a file, then get it back out of the file. The <code>File</code> class has a method for each.",
          "Use <code>File.WriteAllText(fileName, text)</code> to save and <code>File.ReadAllText(fileName)</code> to load. Print the value you loaded, not the original variable.",
          "<code>string fromFile = File.ReadAllText(\"film.txt\");<br>Console.WriteLine(\"Saved to file: \" + fromFile);</code>"
        ],
        mistakes: [
          { wrong: "Printing <code>film</code> instead of what you read from the file.", fix: "Store <code>File.ReadAllText(\"film.txt\")</code> in a new variable and print that, so you prove the file worked." },
          { wrong: "Writing the word <code>\"film\"</code> in quotes instead of the variable <code>film</code>.", fix: "<code>File.WriteAllText(\"film.txt\", film);</code> The file name is in quotes; the variable isn't." },
          { wrong: "Spelling the file name differently in the two lines, e.g. <code>Film.txt</code> and <code>film.txt</code>.", fix: "Use exactly <code>film.txt</code> both times." }
        ]
      },

      // ------------------------------------------------------------------ l2
      {
        id: "m11-l2",
        title: "Appending and checking a file exists",
        type: "code",
        learn: cs`
<p>To <strong>add</strong> to the end of a file without wiping it, use <code>File.AppendAllText</code>. If the file doesn't exist yet, it's created.</p>
${pre(cs`
File.AppendAllText("log.txt", "Ben signed in" + Environment.NewLine);
File.AppendAllText("log.txt", "Grace signed in" + Environment.NewLine);`)}
<p><code>Environment.NewLine</code> is the "new line" character(s). Without it, every entry would end up stuck together on one line. (You could also write <code>"\n"</code>.)</p>
<h3>Does the file exist?</h3>
<p>Reading a file that doesn't exist causes a run-time error. <code>File.Exists(name)</code> returns <code>true</code> or <code>false</code>, so you can check first:</p>
${pre(cs`
if (File.Exists("log.txt"))
{
    Console.WriteLine(File.ReadAllText("log.txt"));
}
else
{
    Console.WriteLine("No log yet.");
}`)}
<p>This lesson already has a file called <code>visits.txt</code> with two visits in it. Open the files panel to see it.</p>`,
        files: { "visits.txt": "Niamh\nOisin\n" },
        instructions: [
          "Ask <code>Name: </code> and read the visitor's name.",
          "Append the name followed by <code>Environment.NewLine</code> to <code>visits.txt</code> (don't overwrite it!).",
          "If <code>visits.txt</code> exists, print <code>Visitor log:</code> on its own line, then print the whole file."
        ],
        starter: prog(cs`
Console.Write("Name: ");
string name = Console.ReadLine();

// TODO: append name and a new line to visits.txt

// TODO: if visits.txt exists, print Visitor log: and then the file`),
        solution: prog(cs`
Console.Write("Name: ");
string name = Console.ReadLine();

File.AppendAllText("visits.txt", name + Environment.NewLine);

if (File.Exists("visits.txt"))
{
    Console.WriteLine("Visitor log:");
    Console.WriteLine(File.ReadAllText("visits.txt"));
}`),
        stdin: ["Grace"],
        tests: [
          { type: "fn", stdin: ["Grace"], fn: (o, c, f) => JSON.stringify(lines(f["visits.txt"])) === JSON.stringify(["Niamh", "Oisin", "Grace"]), msg: "visits.txt should now hold Niamh, Oisin and Grace on separate lines.", help: "This check reads <code>visits.txt</code> after your program runs with <code>Grace</code>. It should hold Niamh, Oisin and Grace on separate lines. Use <code>AppendAllText</code> (not WriteAllText) and add <code>Environment.NewLine</code>." },
          { type: "outputRegex", stdin: ["Grace"], pattern: "Visitor log:\\s*\\n\\s*Niamh\\s*\\n\\s*Oisin\\s*\\n\\s*Grace", msg: "Print Visitor log: and then all three names.", help: "With <code>Grace</code>, the output should show <code>Visitor log:</code> followed by all three names. Print the heading, then the contents of the file." },
          { type: "code", pattern: "File\\.AppendAllText", msg: "Use File.AppendAllText so the old visits are kept.", help: "This check looks for <code>File.AppendAllText</code> in your code. <code>WriteAllText</code> would overwrite the old visits." },
          { type: "code", pattern: "File\\.Exists", msg: "Check the file exists with File.Exists.", help: "This check looks for <code>File.Exists</code> in your code. Put your reading code inside <code>if (File.Exists(\"visits.txt\"))</code>." }
        ],
        hint: "File.AppendAllText(\"visits.txt\", name + Environment.NewLine); then if (File.Exists(\"visits.txt\")) { ... }",
        goal: "The program adds each visitor's name to the end of visits.txt and then shows the whole visitor log.",
        steps: [
          "Open the files panel and look at <code>visits.txt</code>: it already has Niamh and Oisin.",
          "Under the first TODO, write <code>File.AppendAllText(\"visits.txt\", name + Environment.NewLine);</code>",
          "Run it with <code>Grace</code> and look at the file again: Grace should be on a new line at the end.",
          "Under the second TODO, start <code>if (File.Exists(\"visits.txt\"))</code> with a <code>{ }</code> block.",
          "Inside, print <code>Visitor log:</code>, then print <code>File.ReadAllText(\"visits.txt\")</code>. Run it to check."
        ],
        hints: [
          "You want to add to the file, not replace what's already there. Then you need to check the file is there before reading it.",
          "<code>File.AppendAllText</code> adds to the end. Add <code>Environment.NewLine</code> so each name goes on its own line. <code>File.Exists</code> returns true or false.",
          "<code>if (File.Exists(\"visits.txt\"))<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\"Visitor log:\");<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(File.ReadAllText(\"visits.txt\"));<br>}</code>"
        ],
        mistakes: [
          { wrong: "Using <code>File.WriteAllText</code>, which wipes Niamh and Oisin.", fix: "Use <code>File.AppendAllText</code> so the old lines are kept." },
          { wrong: "Forgetting <code>+ Environment.NewLine</code>, so the names run together like <code>GraceBen</code>.", fix: "Add <code>name + Environment.NewLine</code> when appending." },
          { wrong: "Reading the file without checking <code>File.Exists</code> first.", fix: "Wrap the reading code in <code>if (File.Exists(\"visits.txt\")) { ... }</code>." }
        ]
      },

      // ------------------------------------------------------------------ l3
      {
        id: "m11-l3",
        title: "Lines and arrays: WriteAllLines and ReadAllLines",
        type: "code",
        learn: cs`
<p>Most files hold one item per line. C# can save a whole array (or list) in one go, one item per line, and read it back as an array:</p>
${pre(cs`
string[] snacks = { "Popcorn", "Nachos", "Hot dog" };
File.WriteAllLines("snacks.txt", snacks);

string[] loaded = File.ReadAllLines("snacks.txt");
Console.WriteLine($"There are {loaded.Length} snacks.");
foreach (string s in loaded)
{
    Console.WriteLine("- " + s);
}`)}
${out(cs`
There are 3 snacks.
- Popcorn
- Nachos
- Hot dog`)}
<p><code>File.WriteAllLines</code> also accepts a <code>List&lt;string&gt;</code>, which is handy when you don't know in advance how many items there will be.</p>
<p>Once the lines are in an array, you can use everything you know about arrays: loops, totals, searching. Remember that every line is a <strong>string</strong>, so convert it if you need a number:</p>
${pre(cs`
int total = 0;
foreach (string line in File.ReadAllLines("goals.txt"))
{
    total += int.Parse(line);
}`)}`,
        instructions: [
          "Use <code>File.WriteAllLines</code> to save the <code>songs</code> array to <code>playlist.txt</code>.",
          "Read the file back with <code>File.ReadAllLines</code> into a new array.",
          "Print <code>Playlist has 4 songs</code> using the new array's <code>Length</code>, then print each song on its own line numbered from 1, like <code>1. Golden</code>"
        ],
        starter: prog(cs`
string[] songs = { "Golden", "Espresso", "Flowers", "Shivers" };

// TODO: save songs to playlist.txt

// TODO: read playlist.txt back into a new array and print it`),
        solution: prog(cs`
string[] songs = { "Golden", "Espresso", "Flowers", "Shivers" };

File.WriteAllLines("playlist.txt", songs);

string[] loaded = File.ReadAllLines("playlist.txt");
Console.WriteLine($"Playlist has {loaded.Length} songs");
for (int i = 0; i < loaded.Length; i++)
{
    Console.WriteLine($"{i + 1}. {loaded[i]}");
}`),
        tests: [
          { type: "fn", fn: (o, c, f) => JSON.stringify(lines(f["playlist.txt"])) === JSON.stringify(["Golden", "Espresso", "Flowers", "Shivers"]), msg: "playlist.txt should contain the four songs, one per line.", help: "This check reads <code>playlist.txt</code> after your program runs. It should hold the four songs, one per line. Use <code>File.WriteAllLines(\"playlist.txt\", songs);</code>" },
          { type: "output", includes: "Playlist has 4 songs", msg: "Print Playlist has 4 songs", help: "Your program should print <code>Playlist has 4 songs</code>. Use <code>loaded.Length</code> in an interpolated string." },
          { type: "outputRegex", pattern: "1\\. Golden\\s*\\n2\\. Espresso\\s*\\n3\\. Flowers\\s*\\n4\\. Shivers", msg: "Number the songs 1. Golden, 2. Espresso, 3. Flowers, 4. Shivers", help: "The songs should be printed <code>1. Golden</code> to <code>4. Shivers</code>, one per line. Use <code>{i + 1}. {loaded[i]}</code> in a <code>for</code> loop." },
          { type: "code", pattern: "File\\.ReadAllLines", msg: "Read the file with File.ReadAllLines.", help: "This check looks for <code>File.ReadAllLines</code> in your code. Read the file back into a new array." }
        ],
        hint: "File.WriteAllLines(\"playlist.txt\", songs); string[] loaded = File.ReadAllLines(\"playlist.txt\"); then a for loop printing $\"{i + 1}. {loaded[i]}\"",
        goal: "The program saves four songs to playlist.txt, reads them back and prints a numbered playlist.",
        steps: [
          "Under the first TODO, write <code>File.WriteAllLines(\"playlist.txt\", songs);</code> Run it and check the files panel.",
          "Under the second TODO, read the file into a new array: <code>string[] loaded = File.ReadAllLines(\"playlist.txt\");</code>",
          "Print <code>$\"Playlist has {loaded.Length} songs\"</code>.",
          "Write a <code>for</code> loop from <code>i = 0</code> while <code>i &lt; loaded.Length</code>.",
          "Inside it, print <code>$\"{i + 1}. {loaded[i]}\"</code> so the numbering starts at 1. Run it to check."
        ],
        hints: [
          "One method saves a whole array as lines; another reads the lines back as an array. Then it's an ordinary array loop.",
          "Use <code>File.WriteAllLines</code> and <code>File.ReadAllLines</code>. Use a <code>for</code> loop (not foreach) so you have <code>i</code> for the numbers.",
          "<code>for (int i = 0; i &lt; loaded.Length; i++)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine($\"{i + 1}. {loaded[i]}\");<br>}</code>"
        ],
        mistakes: [
          { wrong: "Looping through <code>songs</code> instead of the array you read from the file.", fix: "Print from <code>loaded</code> (the new array) to prove the file round trip worked." },
          { wrong: "Printing <code>{i}</code> so the list starts <code>0. Golden</code>.", fix: "Use <code>{i + 1}</code> for the number and <code>loaded[i]</code> for the song." },
          { wrong: "Typing <code>4</code> in the message instead of using <code>Length</code>.", fix: "Use <code>loaded.Length</code> so it works for any number of songs." }
        ]
      },

      // ------------------------------------------------------------------ l4
      {
        id: "m11-l4",
        title: "StreamWriter and StreamReader",
        type: "code",
        learn: cs`
<p>The <code>File</code> methods read or write everything at once. For bigger jobs, or when you want to write line by line inside a loop, use a <strong>stream</strong>.</p>
<h3>Writing with StreamWriter</h3>
${pre(cs`
using (StreamWriter writer = new StreamWriter("squad.txt"))
{
    writer.WriteLine("Aoife");
    writer.WriteLine("Ciaran");
}`)}
<p><code>new StreamWriter("squad.txt")</code> creates (or overwrites) the file. Use <code>new StreamWriter("squad.txt", true)</code> to <strong>append</strong> instead.</p>
<h3>Reading with StreamReader</h3>
${pre(cs`
using (StreamReader reader = new StreamReader("squad.txt"))
{
    while (!reader.EndOfStream)
    {
        string name = reader.ReadLine();
        Console.WriteLine(name);
    }
}`)}
<p><code>EndOfStream</code> is <code>true</code> once every line has been read, so the loop reads one line at a time until the end of the file.</p>
<h3>Why <code>using</code>?</h3>
<p>A stream keeps the file <strong>open</strong> until it's closed. If you forget to close it, the data might not be saved, and other programs can't use the file. The <code>using ( ... ) { }</code> block closes the file automatically at the closing bracket, even if an exception happens. (You could call <code>writer.Close()</code> yourself, but <code>using</code> is safer.)</p>
<div class="tip">This is a different <code>using</code> from the <code>using System.IO;</code> line at the top. Same word, different job.</div>`,
        instructions: [
          "Use a <code>StreamWriter</code> inside a <code>using</code> block to write the numbers 1 to 5 times 7 to <code>sevens.txt</code>, one per line, in the form <code>3 x 7 = 21</code> (use a <code>for</code> loop).",
          "Then use a <code>StreamReader</code> inside a <code>using</code> block and a <code>while (!reader.EndOfStream)</code> loop to read and print every line.",
          "Finally print <code>Done</code>."
        ],
        starter: prog(cs`
// TODO: write 1 x 7 = 7 up to 5 x 7 = 35 to sevens.txt with a StreamWriter

// TODO: read sevens.txt with a StreamReader and print each line

Console.WriteLine("Done");`),
        solution: prog(cs`
using (StreamWriter writer = new StreamWriter("sevens.txt"))
{
    for (int i = 1; i <= 5; i++)
    {
        writer.WriteLine($"{i} x 7 = {i * 7}");
    }
}

using (StreamReader reader = new StreamReader("sevens.txt"))
{
    while (!reader.EndOfStream)
    {
        Console.WriteLine(reader.ReadLine());
    }
}

Console.WriteLine("Done");`),
        tests: [
          { type: "fn", fn: (o, c, f) => JSON.stringify(lines(f["sevens.txt"])) === JSON.stringify(["1 x 7 = 7", "2 x 7 = 14", "3 x 7 = 21", "4 x 7 = 28", "5 x 7 = 35"]), msg: "sevens.txt should have 5 lines from 1 x 7 = 7 to 5 x 7 = 35.", help: "This check reads <code>sevens.txt</code> after your program runs. It should have 5 lines, from <code>1 x 7 = 7</code> to <code>5 x 7 = 35</code>. Use <code>writer.WriteLine($\"{i} x 7 = {i * 7}\")</code> in a loop from 1 to 5." },
          { type: "outputRegex", pattern: "1 x 7 = 7[\\s\\S]*5 x 7 = 35[\\s\\S]*Done", msg: "Print the lines from the file, then Done.", help: "The output should show the lines from the file and then <code>Done</code>. Read the file with the StreamReader loop before the <code>Done</code> line." },
          { type: "code", pattern: "new\\s+StreamWriter", msg: "Use a StreamWriter.", help: "This check looks for <code>new StreamWriter</code> in your code. Use a StreamWriter (not File.WriteAllLines) for the writing." },
          { type: "code", pattern: "new\\s+StreamReader", msg: "Use a StreamReader.", help: "This check looks for <code>new StreamReader</code> in your code. Use a StreamReader for the reading." },
          { type: "code", pattern: "EndOfStream", msg: "Loop until reader.EndOfStream.", help: "This check looks for <code>EndOfStream</code> in your code. Loop with <code>while (!reader.EndOfStream)</code>." }
        ],
        hint: "using (StreamWriter writer = new StreamWriter(\"sevens.txt\")) { for (...) writer.WriteLine($\"{i} x 7 = {i * 7}\"); }",
        goal: "The program writes the first five lines of the 7 times table to a file, reads them back line by line, and prints Done.",
        steps: [
          "Under the first TODO, start <code>using (StreamWriter writer = new StreamWriter(\"sevens.txt\"))</code> with a <code>{ }</code> block.",
          "Inside, write a <code>for</code> loop from 1 to 5 that does <code>writer.WriteLine($\"{i} x 7 = {i * 7}\");</code> Run it and check <code>sevens.txt</code>.",
          "Under the second TODO, start <code>using (StreamReader reader = new StreamReader(\"sevens.txt\"))</code> with its own <code>{ }</code>.",
          "Inside, write <code>while (!reader.EndOfStream)</code> and print <code>reader.ReadLine()</code> in the loop.",
          "Leave <code>Done</code> at the end. Run it: you should see five lines and then Done."
        ],
        hints: [
          "Write with one stream and close it, then open a second stream to read. A <code>using</code> block closes each stream for you.",
          "Use <code>writer.WriteLine</code> inside a <code>for</code> loop to write. To read, loop <code>while (!reader.EndOfStream)</code> and call <code>reader.ReadLine()</code> each time.",
          "<code>using (StreamReader reader = new StreamReader(\"sevens.txt\"))<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;while (!reader.EndOfStream)<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(reader.ReadLine());<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}</code>"
        ],
        mistakes: [
          { wrong: "Using <code>Console.WriteLine</code> inside the writer loop, so nothing goes into the file.", fix: "Inside the writer block use <code>writer.WriteLine(...)</code>." },
          { wrong: "Putting the reader inside the writer's <code>using</code> block, so the file is still open when you read it.", fix: "Close the writer's <code>}</code> first, then start the reader's <code>using</code> block." },
          { wrong: "Writing <code>while (reader.EndOfStream)</code> without the <code>!</code>, so nothing is read.", fix: "Keep reading while it is <em>not</em> the end: <code>while (!reader.EndOfStream)</code>." },
          { wrong: "Forgetting <code>new</code>: <code>StreamWriter writer = StreamWriter(\"sevens.txt\")</code>.", fix: "A stream is an object: <code>new StreamWriter(\"sevens.txt\")</code>." }
        ]
      },

      // ------------------------------------------------------------------ l5
      {
        id: "m11-l5",
        title: "CSV records",
        type: "code",
        learn: cs`
<p>Often one line of a file holds a whole <strong>record</strong>: several fields about one thing. The simplest way is <strong>CSV</strong> (comma-separated values), the same format spreadsheets can open.</p>
${out(cs`
Biscuit,dog,4
Luna,cat,2
Pepper,rabbit,1`)}
<p>Each line is a record; each record has three fields: name, type and age. To get the fields back, <strong>split</strong> the line at the commas:</p>
${pre(cs`
foreach (string line in File.ReadAllLines("pets.csv"))
{
    string[] parts = line.Split(',');
    string name = parts[0];
    string type = parts[1];
    int age = int.Parse(parts[2]);
    Console.WriteLine($"{name} the {type} is {age}");
}`)}
<p>To <strong>write</strong> a record, join the fields with commas: <code>$"{name},{type},{age}"</code>.</p>
<div class="warn">If a field could contain a comma itself (like <code>Smith, J</code>), it would break the split. That's why the final project won't allow commas in usernames: a simple form of validation that protects the file.</div>
<div class="tip">Formatting tip: <code>{name,-10}</code> pads text to 10 characters, left-aligned, which lines up columns neatly.</div>`,
        files: { "results.csv": "Aoife,72\nBen,45\nCiaran,88\nGrace,59\nNiamh,91\n" },
        instructions: [
          "This lesson has a file <code>results.csv</code>. Each line holds a pupil's name and test mark, e.g. <code>Aoife,72</code>.",
          "Read every line, split it at the comma and print the name and mark like <code>Aoife: 72</code>",
          "Work out the average mark and print it to 1 decimal place: <code>Average: 71.0</code>",
          "Print the highest mark with its name: <code>Top: Niamh with 91</code>"
        ],
        starter: prog(cs`
string[] records = File.ReadAllLines("results.csv");

// TODO: split each record, print Name: mark, then the average and the top pupil`),
        solution: prog(cs`
string[] records = File.ReadAllLines("results.csv");
int total = 0;
int best = -1;
string bestName = "";

foreach (string record in records)
{
    string[] parts = record.Split(',');
    string name = parts[0];
    int mark = int.Parse(parts[1]);
    Console.WriteLine($"{name}: {mark}");

    total += mark;
    if (mark > best)
    {
        best = mark;
        bestName = name;
    }
}

double average = (double)total / records.Length;
Console.WriteLine($"Average: {average:F1}");
Console.WriteLine($"Top: {bestName} with {best}");`),
        tests: [
          { type: "outputRegex", pattern: "Aoife: 72[\\s\\S]*Ben: 45[\\s\\S]*Niamh: 91", msg: "Print each pupil as Name: mark, e.g. Aoife: 72", help: "This uses the pre-loaded <code>results.csv</code>. Each pupil should be printed as <code>Name: mark</code>, e.g. <code>Aoife: 72</code>. Split each line at the comma and print <code>parts[0]</code> and the mark." },
          { type: "output", includes: "Average: 71.0", msg: "The average of 72, 45, 88, 59 and 91 is 71.0", help: "The average of the five marks should print as <code>Average: 71.0</code>. Cast to <code>double</code> before dividing and use <code>:F1</code>." },
          { type: "output", includes: "Top: Niamh with 91", msg: "Print Top: Niamh with 91", help: "It should print <code>Top: Niamh with 91</code>. Keep the best mark and its name in variables, updating them when <code>mark &gt; best</code>." },
          { type: "code", pattern: "Split\\(", msg: "Use Split to separate the fields.", help: "This check looks for <code>Split(</code> in your code. Use <code>record.Split(',')</code> to separate the fields." }
        ],
        hint: "Inside a foreach: string[] parts = record.Split(','); int mark = int.Parse(parts[1]); Keep a running total and the best mark so far.",
        goal: "The program reads pupils' marks from results.csv, lists them, then shows the average mark and the top pupil.",
        steps: [
          "Open the files panel and look at <code>results.csv</code> to see the format: <code>Name,mark</code>.",
          "Above the loop, set up <code>int total = 0;</code>, <code>int best = -1;</code> and <code>string bestName = \"\";</code>",
          "Write <code>foreach (string record in records)</code>. Inside, split it: <code>string[] parts = record.Split(',');</code>",
          "Get the name from <code>parts[0]</code> and the mark with <code>int.Parse(parts[1])</code>. Print <code>$\"{name}: {mark}\"</code> and Run.",
          "Still in the loop, add the mark to <code>total</code>, and if <code>mark &gt; best</code> update <code>best</code> and <code>bestName</code>.",
          "After the loop, work out <code>(double)total / records.Length</code> and print <code>Average: </code> with <code>:F1</code>, then <code>Top: {bestName} with {best}</code>."
        ],
        hints: [
          "Each line is one record. Split it into fields, keep a running total, and remember the best mark so far.",
          "Use <code>record.Split(',')</code> to get <code>parts</code>. <code>parts[1]</code> is text, so convert it with <code>int.Parse</code>. Cast to <code>double</code> before dividing.",
          "<code>string[] parts = record.Split(',');<br>string name = parts[0];<br>int mark = int.Parse(parts[1]);<br>total += mark;<br>if (mark &gt; best) { best = mark; bestName = name; }</code>"
        ],
        mistakes: [
          { wrong: "Splitting on the wrong character, e.g. <code>Split(' ')</code> or <code>Split(';')</code>.", fix: "This file uses commas: <code>Split(',')</code>." },
          { wrong: "Using <code>parts[1]</code> as a number without converting it.", fix: "Every field is a string. Use <code>int.Parse(parts[1])</code>." },
          { wrong: "Dividing <code>total / records.Length</code> as two ints, giving <code>71</code> instead of <code>71.0</code> (or losing decimals).", fix: "Cast first: <code>(double)total / records.Length</code>, then print with <code>{average:F1}</code>." },
          { wrong: "Putting the average and top lines inside the loop, so they print five times.", fix: "Print them after the loop's closing <code>}</code>." }
        ]
      },

      // ------------------------------------------------------------------ l6
      {
        id: "m11-l6",
        title: "Searching and updating: a high score table",
        type: "code",
        learn: cs`
<p>You can't change one line in the middle of a text file directly. The standard method for <strong>updating</strong> a file is:</p>
<ol>
<li><strong>Read</strong> all the records into a list.</li>
<li><strong>Search</strong> the list and change (or add) the record in memory.</li>
<li><strong>Write</strong> the whole list back to the file, overwriting the old version.</li>
</ol>
${pre(cs`
List<string> lines = new List<string>(File.ReadAllLines("stock.csv"));
bool found = false;
for (int i = 0; i < lines.Count; i++)
{
    string[] parts = lines[i].Split(',');
    if (parts[0] == "Popcorn")
    {
        lines[i] = "Popcorn," + (int.Parse(parts[1]) - 1);
        found = true;
    }
}
if (!found)
{
    lines.Add("Popcorn,0");
}
File.WriteAllLines("stock.csv", lines);`)}
<p><code>new List&lt;string&gt;(array)</code> turns the array of lines into a list so you can add to it. The <code>found</code> flag records whether the search was successful: a <strong>linear search</strong> through the records.</p>
<div class="tip">Comparing with <code>.ToLower()</code> on both sides makes the search case-insensitive, so <code>ben</code> finds <code>Ben</code>.</div>`,
        files: { "highscores.csv": "Aoife,1200\nBen,950\nGrace,1430\n" },
        instructions: [
          "Read a player name and a new score (the prompts are done for you).",
          "Load <code>highscores.csv</code> into a <code>List&lt;string&gt;</code> and search it (case-insensitive) for the player.",
          "If found and the new score is <strong>higher</strong>, replace their score and print <code>New personal best!</code>; if found but not higher, print <code>No new record. Best is </code> and their old score, e.g. <code>No new record. Best is 1200</code>",
          "If not found, add a new record and print <code>Welcome to the table!</code>. Save the list back to <code>highscores.csv</code>."
        ],
        starter: prog(cs`
Console.Write("Player: ");
string player = Console.ReadLine();
Console.Write("Score: ");
int score = int.Parse(Console.ReadLine());

// TODO: load highscores.csv into a List<string>

// TODO: search for the player and update or add

// TODO: save the list back to highscores.csv`, { usings: "using System;\nusing System.Collections.Generic;\nusing System.IO;" }),
        solution: prog(cs`
Console.Write("Player: ");
string player = Console.ReadLine();
Console.Write("Score: ");
int score = int.Parse(Console.ReadLine());

List<string> lines = new List<string>(File.ReadAllLines("highscores.csv"));
bool found = false;

for (int i = 0; i < lines.Count; i++)
{
    string[] parts = lines[i].Split(',');
    if (parts[0].ToLower() == player.ToLower())
    {
        found = true;
        int best = int.Parse(parts[1]);
        if (score > best)
        {
            lines[i] = parts[0] + "," + score;
            Console.WriteLine("New personal best!");
        }
        else
        {
            Console.WriteLine("No new record. Best is " + best);
        }
    }
}

if (!found)
{
    lines.Add(player + "," + score);
    Console.WriteLine("Welcome to the table!");
}

File.WriteAllLines("highscores.csv", lines);`, { usings: "using System;\nusing System.Collections.Generic;\nusing System.IO;" }),
        stdin: ["Ben", "1100"],
        tests: [
          { type: "fn", stdin: ["Ben", "1100"], fn: (o, c, f) => o.includes("New personal best!") && JSON.stringify(lines(f["highscores.csv"])) === JSON.stringify(["Aoife,1200", "Ben,1100", "Grace,1430"]), msg: "Ben scoring 1100 should print New personal best! and change his line to Ben,1100 (other lines unchanged).", help: "With <code>Ben</code> and <code>1100</code>, it should print <code>New personal best!</code> and <code>highscores.csv</code> should then read Aoife,1200 / Ben,1100 / Grace,1430. Replace <code>lines[i]</code> and save with WriteAllLines." },
          { type: "fn", stdin: ["aoife", "800"], fn: (o, c, f) => o.includes("No new record. Best is 1200") && lines(f["highscores.csv"]).includes("Aoife,1200"), msg: "aoife scoring 800 should print No new record. Best is 1200 and keep Aoife,1200.", help: "With <code>aoife</code> and <code>800</code>, it should print <code>No new record. Best is 1200</code> and keep <code>Aoife,1200</code> in the file. Compare names with <code>.ToLower()</code> and only change the line when the score is higher." },
          { type: "fn", stdin: ["Oisin", "700"], fn: (o, c, f) => o.includes("Welcome to the table!") && JSON.stringify(lines(f["highscores.csv"])) === JSON.stringify(["Aoife,1200", "Ben,950", "Grace,1430", "Oisin,700"]), msg: "A new player Oisin should print Welcome to the table! and be added to the end of the file.", help: "With the new player <code>Oisin</code> and <code>700</code>, it should print <code>Welcome to the table!</code> and add <code>Oisin,700</code> as the last line. Add it after the loop with <code>if (!found)</code>." },
          { type: "code", pattern: "File\\.WriteAllLines", msg: "Write the updated list back with File.WriteAllLines.", help: "This check looks for <code>File.WriteAllLines</code> in your code. Save the whole list back to <code>highscores.csv</code> at the end." }
        ],
        hint: "Use a for loop over lines, Split each line, compare parts[0].ToLower() with player.ToLower(). Set found = true when you find them. After the loop, if (!found) lines.Add(...).",
        goal: "The program takes a player and score, then updates their high score, tells them it's no new record, or adds them to the table, and saves the file.",
        steps: [
          "Under the first TODO, load the file into a list: <code>List&lt;string&gt; lines = new List&lt;string&gt;(File.ReadAllLines(\"highscores.csv\"));</code>",
          "Add <code>bool found = false;</code> and a <code>for</code> loop over <code>lines</code>. Inside, split the line: <code>string[] parts = lines[i].Split(',');</code>",
          "Compare names ignoring case: <code>if (parts[0].ToLower() == player.ToLower())</code>. Inside, set <code>found = true;</code> and get <code>int best = int.Parse(parts[1]);</code>",
          "If <code>score &gt; best</code>, replace the line with <code>parts[0] + \",\" + score</code> and print <code>New personal best!</code>; otherwise print <code>No new record. Best is </code> + best.",
          "After the loop, <code>if (!found)</code> add <code>player + \",\" + score</code> to the list and print <code>Welcome to the table!</code>",
          "Finally save: <code>File.WriteAllLines(\"highscores.csv\", lines);</code> Run with <code>Ben</code>/<code>1100</code> and check the file."
        ],
        hints: [
          "Read everything into a list, change the list in memory, then write the whole list back to the file.",
          "Use a <code>for</code> loop (so you can change <code>lines[i]</code>) and a <code>found</code> flag. After the loop, use <code>if (!found)</code> to add a new player.",
          "<code>if (parts[0].ToLower() == player.ToLower())<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;found = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;int best = int.Parse(parts[1]);<br>&nbsp;&nbsp;&nbsp;&nbsp;if (score &gt; best)<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lines[i] = parts[0] + \",\" + score;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\"New personal best!\");<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;else { ... }<br>}</code>"
        ],
        mistakes: [
          { wrong: "Using <code>foreach</code>, then trying to change the line, which isn't allowed.", fix: "Use <code>for (int i = 0; i &lt; lines.Count; i++)</code> so you can write <code>lines[i] = ...</code>." },
          { wrong: "Putting the <code>Welcome to the table!</code> code inside the loop, so it runs for every other player.", fix: "Only add the new player after the loop has finished, inside <code>if (!found)</code>." },
          { wrong: "Comparing <code>parts[0] == player</code>, so <code>aoife</code> doesn't match <code>Aoife</code>.", fix: "Use <code>.ToLower()</code> on both sides." },
          { wrong: "Forgetting to save, so the file never changes.", fix: "End with <code>File.WriteAllLines(\"highscores.csv\", lines);</code> after the loop." }
        ]
      },

      // ------------------------------------------------------------------ l7
      {
        id: "m11-l7",
        title: "When files go wrong",
        type: "code",
        learn: cs`
<p>Files live outside your program, so lots can go wrong: the file was deleted or renamed, it's in a different folder, or a line inside it is damaged. Two tools keep your program safe.</p>
<h3>1. Check first with File.Exists</h3>
<p>Good when a missing file is normal, e.g. the first time a game runs there are no saved scores yet.</p>
<h3>2. Catch the exception</h3>
<p>Reading a file that isn't there throws a <code>FileNotFoundException</code>. Catching it means the program can explain the problem instead of crashing:</p>
${pre(cs`
try
{
    string[] lines = File.ReadAllLines("fixtures.txt");
    Console.WriteLine($"Loaded {lines.Length} fixtures.");
}
catch (FileNotFoundException)
{
    Console.WriteLine("Fixtures file is missing.");
}`)}
<p><code>FileNotFoundException</code> is a kind of <code>IOException</code> (input/output exception), so <code>catch (IOException)</code> would catch it too, along with other file problems.</p>
<h3>Damaged lines</h3>
<p>One bad line shouldn't stop the rest loading. Put a <code>try</code>/<code>catch</code> <em>inside</em> the loop so only the bad line is skipped:</p>
${pre(cs`
foreach (string line in lines)
{
    try
    {
        total += int.Parse(line);
    }
    catch (FormatException)
    {
        Console.WriteLine("Skipped: " + line);
    }
}`)}
<p>This lesson has a <code>goals.txt</code> file with one damaged line in it. There's no <code>assists.txt</code>.</p>`,
        files: { "goals.txt": "3\n1\ntwo\n4\n" },
        instructions: [
          "Write a method <code>static int TotalFromFile(string fileName)</code> that adds up the numbers in a file, one per line.",
          "Inside the loop, catch <code>FormatException</code> and print <code>Skipped: </code> plus the bad line. Around the reading, catch <code>FileNotFoundException</code>, print <code>Missing file: </code> plus the file name, and return 0.",
          "Main is done for you: it should print <code>Skipped: two</code>, <code>Goals: 8</code>, <code>Missing file: assists.txt</code> and <code>Assists: 0</code>."
        ],
        starter: prog(cs`
Console.WriteLine("Goals: " + TotalFromFile("goals.txt"));
Console.WriteLine("Assists: " + TotalFromFile("assists.txt"));`, {
          after: cs`
static int TotalFromFile(string fileName)
{
    int total = 0;
    // TODO: read the lines, add them up, and handle the two kinds of error
    return total;
}`
        }),
        solution: prog(cs`
Console.WriteLine("Goals: " + TotalFromFile("goals.txt"));
Console.WriteLine("Assists: " + TotalFromFile("assists.txt"));`, {
          after: cs`
static int TotalFromFile(string fileName)
{
    int total = 0;
    try
    {
        string[] lines = File.ReadAllLines(fileName);
        foreach (string line in lines)
        {
            try
            {
                total += int.Parse(line);
            }
            catch (FormatException)
            {
                Console.WriteLine("Skipped: " + line);
            }
        }
    }
    catch (FileNotFoundException)
    {
        Console.WriteLine("Missing file: " + fileName);
        return 0;
    }
    return total;
}`
        }),
        tests: [
          { type: "output", includes: "Skipped: two", msg: "The damaged line should print Skipped: two", help: "The pre-loaded <code>goals.txt</code> has the damaged line <code>two</code>. Your program should print <code>Skipped: two</code>. Catch <code>FormatException</code> inside the loop and print the line." },
          { type: "output", includes: "Goals: 8", msg: "3 + 1 + 4 = 8, so print Goals: 8", help: "<code>goals.txt</code> holds 3, 1, two and 4, so it should print <code>Goals: 8</code>. If you get 4, your FormatException catch is outside the loop instead of inside it." },
          { type: "output", includes: "Missing file: assists.txt", msg: "The missing file should print Missing file: assists.txt", help: "There is no <code>assists.txt</code>, so it should print <code>Missing file: assists.txt</code>. Catch <code>FileNotFoundException</code> around <code>File.ReadAllLines(fileName)</code>." },
          { type: "output", includes: "Assists: 0", msg: "TotalFromFile should return 0 for a missing file.", help: "For the missing file, <code>TotalFromFile</code> should return 0 so Main prints <code>Assists: 0</code>. Add <code>return 0;</code> in that catch (or make sure the program doesn't crash)." },
          { type: "code", pattern: "catch\\s*\\(\\s*FileNotFoundException", msg: "Catch FileNotFoundException.", help: "This check looks for <code>catch (FileNotFoundException</code> in your code. A general <code>catch (Exception)</code> doesn't count here." }
        ],
        hint: "Two try blocks: an outer one around File.ReadAllLines (catch FileNotFoundException) and an inner one inside the foreach around int.Parse (catch FormatException).",
        goal: "The program totals the numbers in goals.txt, skipping the damaged line, and copes calmly with the missing assists.txt file.",
        steps: [
          "Scroll down to <code>TotalFromFile</code> and find the TODO.",
          "Add an outer <code>try { }</code>. Inside it, read the file: <code>string[] lines = File.ReadAllLines(fileName);</code>",
          "Still inside, loop with <code>foreach (string line in lines)</code>. Inside the loop, put an inner <code>try</code> with <code>total += int.Parse(line);</code>",
          "Give the inner try a <code>catch (FormatException)</code> that prints <code>\"Skipped: \" + line</code>. Run it: you should see <code>Skipped: two</code> and <code>Goals: 8</code>, then a crash.",
          "After the outer try, add <code>catch (FileNotFoundException)</code> that prints <code>\"Missing file: \" + fileName</code> and does <code>return 0;</code>",
          "Run again: all four lines should appear with no crash."
        ],
        hints: [
          "Two different things can go wrong at two different places: the whole file might be missing, or one line might be bad. Each needs its own try/catch.",
          "Put an outer <code>try</code> around <code>File.ReadAllLines</code> and the loop, catching <code>FileNotFoundException</code>. Put an inner <code>try</code> inside the loop around <code>int.Parse</code>, catching <code>FormatException</code>.",
          "<code>foreach (string line in lines)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;try<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += int.Parse(line);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;catch (FormatException)<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\"Skipped: \" + line);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}</code>"
        ],
        mistakes: [
          { wrong: "Putting a single try/catch around the whole loop, so the first bad line stops everything after it (giving 4 instead of 8).", fix: "Put the <code>FormatException</code> try/catch <em>inside</em> the loop so only the bad line is skipped." },
          { wrong: "Writing <code>File.ReadAllLines(\"goals.txt\")</code> instead of using the parameter.", fix: "Use <code>fileName</code> so the method works for <code>assists.txt</code> too." },
          { wrong: "Catching <code>FileNotFoundException</code> but forgetting <code>return 0;</code> or the message.", fix: "In that catch, print <code>\"Missing file: \" + fileName</code> and <code>return 0;</code>" },
          { wrong: "Catching <code>Exception</code> before <code>FileNotFoundException</code>.", fix: "Specific catches must come before general ones, or the specific one is never reached." }
        ]
      },

      // ------------------------------------------------------------------ quiz
      {
        id: "m11-quiz",
        title: "Checkpoint: file handling",
        type: "quiz",
        questions: [
          { q: "Why do programs save data to files?",
            options: ["Files are faster than variables", "So the data persists after the program closes", "Because RAM can only store strings", "To make the program compile"],
            answer: 1, explain: "RAM is volatile. Saving to secondary storage gives persistence." },
          { q: "What happens if you call <code>File.WriteAllText(\"scores.txt\", \"10\")</code> and scores.txt already holds 50 lines?",
            options: ["\"10\" is added to the end", "The old contents are replaced by \"10\"", "A run-time error occurs", "Nothing, because the file exists"],
            answer: 1, explain: "WriteAllText overwrites. Use AppendAllText to add to the end." },
          { q: "What does <code>File.ReadAllLines</code> return?",
            options: ["One string", "A string array, one element per line", "An int", "A StreamReader"],
            answer: 1, explain: "It returns string[] with each line of the file as an element." },
          { q: "A line in a file is <code>Luna,cat,2</code>. After <code>string[] p = line.Split(',');</code> what is <code>p[1]</code>?",
            options: ["Luna", "cat", "2", ","],
            answer: 1, explain: "Split gives [\"Luna\", \"cat\", \"2\"], and index 1 is the second item." },
          { q: "What is the main reason to put a StreamWriter in a <code>using</code> block?",
            options: ["It makes the file smaller", "The file is closed automatically, so the data is saved", "It lets you read and write at the same time", "It's needed to import System.IO"],
            answer: 1, explain: "using closes (disposes) the stream at the closing bracket, even if an exception happens." },
          { q: "Which exception is thrown when you try to read a file that doesn't exist?",
            options: ["FormatException", "IndexOutOfRangeException", "FileNotFoundException", "DivideByZeroException"],
            answer: 2, explain: "FileNotFoundException, which is a type of IOException." },
          { q: "How do you change one record in the middle of a text file?",
            options: ["Use File.ChangeLine", "Read all the records, change the one in memory, then write them all back", "Append the new record to the end", "Delete the file and hope"],
            answer: 1, explain: "Read into a list, update the list, then overwrite the file with WriteAllLines." }
        ]
      }
    ]
  });
})();
