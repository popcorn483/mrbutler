// Module 7: Arrays and Lists
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
  const LISTS = "using System;\nusing System.Collections.Generic;";
  const lines = (out) => out.split("\n").map(s => s.trim()).filter(Boolean);

  COURSE.addModule({
    id: "m07",
    title: "Arrays and Lists",
    icon: "list",
    summary: "Store many values under one name with arrays, 2D arrays and List<T>.",
    lessons: [
      // ---------------------------------------------------------------- l1
      {
        id: "m07-l1",
        title: "Your first array",
        type: "code",
        learn: `
<p>Suppose you want to store the names of five players. You <em>could</em> make five variables: <code>player1</code>, <code>player2</code>… but that quickly gets out of hand. An <strong>array</strong> stores lots of values of the same type under one name.</p>
<div class="key"><strong>Array</strong> a fixed-size collection of values of the same data type, stored under one identifier.</div>
<pre><code class="cs">string[] pets = { "dog", "cat", "hamster", "goldfish" };

Console.WriteLine(pets[0]);        // dog
Console.WriteLine(pets[2]);        // hamster
Console.WriteLine(pets.Length);    // 4

pets[1] = "rabbit";               // change an element</code></pre>
<div class="key"><strong>Element</strong> one value stored in an array. <strong>Index</strong> its position number, in square brackets.</div>
<h3>Indexes start at 0</h3>
<table>
<tr><th>Index</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
<tr><th>Element</th><td>dog</td><td>rabbit</td><td>hamster</td><td>goldfish</td></tr>
</table>
<p>The first element is at index <code>0</code>, so the <strong>last</strong> one is at index <code>Length - 1</code>.</p>
<h3>Making an empty array</h3>
<pre><code class="cs">int[] scores = new int[5];   // 5 elements, all start as 0
scores[0] = 12;</code></pre>
<div class="warn">An array's size is fixed when it's created. Using an index that doesn't exist, like <code>pets[4]</code> above, crashes with <code>IndexOutOfRangeException: Index was outside the bounds of the array.</code></div>`,
        instructions: [
          "Create a <code>string</code> array called <code>snacks</code> holding <code>crisps</code>, <code>apple</code>, <code>flapjack</code>, <code>yoghurt</code> (in that order).",
          "Print the first element like <code>First: crisps</code> and the last element like <code>Last: yoghurt</code>. Use <code>snacks.Length - 1</code> for the last index.",
          "Change the element at index 1 to <code>banana</code>, then print <code>Now: banana</code> using <code>snacks[1]</code>.",
          "Print <code>There are 4 snacks</code> using <code>Length</code>."
        ],
        starter: prog(`
// TODO: string[] snacks = { ... };

// TODO: print First: and Last:

// TODO: change index 1 to banana and print Now:

// TODO: print There are ... snacks`),
        solution: prog(`
string[] snacks = { "crisps", "apple", "flapjack", "yoghurt" };

Console.WriteLine("First: " + snacks[0]);
Console.WriteLine("Last: " + snacks[snacks.Length - 1]);

snacks[1] = "banana";
Console.WriteLine("Now: " + snacks[1]);

Console.WriteLine($"There are {snacks.Length} snacks");`),
        tests: [
          { type: "output", includes: "First: crisps", msg: "Print First: crisps", help: "The checker wants <code>First: crisps</code>. Use <code>snacks[0]</code>, because indexes start at 0." },
          { type: "output", includes: "Last: yoghurt", msg: "Print Last: yoghurt", help: "The checker wants <code>Last: yoghurt</code>. Use <code>snacks[snacks.Length - 1]</code>, and check the snacks are in the right order." },
          { type: "output", includes: "Now: banana", msg: "Change index 1 and print Now: banana", help: "The checker wants <code>Now: banana</code>. Set <code>snacks[1] = \"banana\";</code> before printing <code>snacks[1]</code>." },
          { type: "output", includes: "There are 4 snacks", msg: "Print There are 4 snacks", help: "The checker wants <code>There are 4 snacks</code>. Use <code>snacks.Length</code> inside an interpolated string." },
          { type: "code", pattern: "\\.Length\\s*-\\s*1", msg: "Use snacks.Length - 1 to find the last element.", help: "The checker looks for <code>.Length - 1</code> in your code. Use it to find the last element rather than typing 3." },
          { type: "code", pattern: "snacks\\s*\\[\\s*1\\s*\\]\\s*=", msg: "Change the element with snacks[1] = ...", help: "The checker looks for <code>snacks[1] = </code> in your code. Change the element directly rather than making a new array." }
        ],
        hint: "snacks[0] is the first element; snacks[snacks.Length - 1] is the last.",
        goal: "The program stores four snacks in an array, prints the first and last, swaps one for banana, and says how many snacks there are.",
        steps: [
          "Under the first TODO, create the array: <code>string[] snacks = { \"crisps\", \"apple\", \"flapjack\", \"yoghurt\" };</code>.",
          "Print the first element with <code>Console.WriteLine(\"First: \" + snacks[0]);</code>. Press <strong>Run</strong> to check.",
          "Print the last element using <code>snacks[snacks.Length - 1]</code> after the text <code>Last: </code>.",
          "Change index 1 with <code>snacks[1] = \"banana\";</code>, then print <code>\"Now: \" + snacks[1]</code>.",
          "Print <code>$\"There are {snacks.Length} snacks\"</code>. Run it and check all four lines."
        ],
        hints: [
          "Array positions (indexes) start at 0, so the first snack is at index 0.",
          "The last index is always one less than the length: <code>snacks.Length - 1</code>. To change an element, assign to it with <code>snacks[1] = ...</code>.",
          "<code>Console.WriteLine(\"Last: \" + snacks[snacks.Length - 1]);\nsnacks[1] = \"banana\";\nConsole.WriteLine(\"Now: \" + snacks[1]);</code>"
        ],
        mistakes: [
          { wrong: "Using <code>snacks[1]</code> for the first element.", fix: "Indexes start at 0, so the first element is <code>snacks[0]</code>." },
          { wrong: "Using <code>snacks[snacks.Length]</code> for the last element.", fix: "That index doesn't exist and crashes with IndexOutOfRangeException. Use <code>snacks.Length - 1</code>." },
          { wrong: "Writing <code>snacks[3]</code> for the last element.", fix: "It gives the right answer, but the checker wants <code>snacks.Length - 1</code> so it works for any size of array." },
          { wrong: "Using round or square brackets for the list of values: <code>string[] snacks = [\"crisps\", ...]</code> or <code>( ... )</code>.", fix: "Use curly brackets: <code>{ \"crisps\", \"apple\", ... }</code>." }
        ]
      },

      // ---------------------------------------------------------------- l2
      {
        id: "m07-l2",
        title: "Looping through arrays",
        type: "code",
        learn: `
<p>Arrays and loops are best friends. A <code>for</code> loop counter can be used as the <strong>index</strong>, visiting every element in turn.</p>
<pre><code class="cs">int[] marks = new int[3];

// fill the array with input
for (int i = 0; i &lt; marks.Length; i++)
{
    Console.Write($"Enter mark {i + 1}: ");
    marks[i] = Convert.ToInt32(Console.ReadLine());
}

// print it out
for (int i = 0; i &lt; marks.Length; i++)
{
    Console.WriteLine($"Pupil {i + 1}: {marks[i]}");
}</code></pre>
<p>Notice the condition is <code>i &lt; marks.Length</code>, not <code>&lt;=</code>. With 3 elements the indexes are 0, 1 and 2. Using <code>&lt;=</code> would try <code>marks[3]</code> and crash: a classic <strong>off-by-one</strong> error.</p>
<p>We print <code>i + 1</code> so humans see "1, 2, 3" while the computer uses "0, 1, 2".</p>
<h3>foreach</h3>
<p>If you only need to <em>read</em> each element, <code>foreach</code> is neater:</p>
<pre><code class="cs">foreach (int m in marks)
{
    Console.WriteLine(m);
}</code></pre>
<div class="tip">Use <code>for</code> when you need the index (or want to change elements). Use <code>foreach</code> when you just want each value.</div>`,
        instructions: [
          "Create an <code>int</code> array called <code>temps</code> with 5 elements.",
          "Use a <code>for</code> loop to fill it: ask <code>Day 1 temperature: </code>, <code>Day 2 temperature: </code> … up to Day 5.",
          "Then use a <code>foreach</code> loop to print each temperature like <code>14 degrees</code>, one per line."
        ],
        starter: prog(`
int[] temps = new int[5];

// TODO: for loop to fill temps (ask Day 1 temperature: ... Day 5 temperature: )

// TODO: foreach loop to print e.g. 14 degrees`),
        solution: prog(`
int[] temps = new int[5];

for (int i = 0; i < temps.Length; i++)
{
    Console.Write($"Day {i + 1} temperature: ");
    temps[i] = Convert.ToInt32(Console.ReadLine());
}

foreach (int t in temps)
{
    Console.WriteLine($"{t} degrees");
}`),
        stdin: ["14", "16", "11", "9", "18"],
        tests: [
          { type: "fn", fn: (out) => [1, 2, 3, 4, 5].every(d => out.includes(`Day ${d} temperature: `)) && !out.includes("Day 6"), msg: "Ask Day 1 temperature: up to Day 5 temperature:", help: "The checker wants the prompts <code>Day 1 temperature: </code> up to <code>Day 5 temperature: </code>, and no Day 6. Use <code>{i + 1}</code> in the prompt and <code>i &lt; temps.Length</code>." },
          { type: "fn", fn: (out) => (out.match(/-?\d+ degrees/g) || []).join(",") === "14 degrees,16 degrees,11 degrees,9 degrees,18 degrees", msg: "Print the five temperatures in order, like 14 degrees", help: "With inputs <code>14</code>, <code>16</code>, <code>11</code>, <code>9</code>, <code>18</code>, the output should be <code>14 degrees</code> … <code>18 degrees</code> in order. Store each answer in <code>temps[i]</code> and print with <code>{t} degrees</code>." },
          { type: "fn", stdin: ["-2", "0", "3", "5", "7"], fn: (out) => (out.match(/-?\d+ degrees/g) || []).join(",") === "-2 degrees,0 degrees,3 degrees,5 degrees,7 degrees", msg: "Works for other temperatures too (try -2, 0, 3, 5, 7).", help: "When the inputs are <code>-2</code>, <code>0</code>, <code>3</code>, <code>5</code>, <code>7</code>, they should be printed in that order. Make sure you print the values you stored, not fixed numbers." },
          { type: "code", pattern: "for\\s*\\(", msg: "Use a for loop to fill the array.", help: "The checker looks for a <code>for</code> loop. Use one to fill the array." },
          { type: "code", pattern: "foreach\\s*\\(", msg: "Use a foreach loop to print the array.", help: "The checker looks for a <code>foreach</code> loop. Use one to print the array." }
        ],
        hint: "for (int i = 0; i < temps.Length; i++) { Console.Write($\"Day {i + 1} temperature: \"); temps[i] = ...; }",
        goal: "The program asks for five daily temperatures, stores them in an array, and then prints each one followed by degrees.",
        steps: [
          "Under the first TODO, write <code>for (int i = 0; i &lt; temps.Length; i++)</code> with a pair of curly brackets.",
          "Inside, ask the question with <code>Console.Write($\"Day {i + 1} temperature: \");</code>.",
          "On the next line, store the answer: <code>temps[i] = Convert.ToInt32(Console.ReadLine());</code>. Press <strong>Run</strong>: it should ask Day 1 to Day 5.",
          "Under the second TODO, write <code>foreach (int t in temps)</code> with curly brackets.",
          "Inside, print <code>$\"{t} degrees\"</code>. Run it and check the five temperatures come out in order."
        ],
        hints: [
          "Use the loop counter <code>i</code> as the array index, so each answer goes into the next box of the array.",
          "The <code>for</code> loop runs from 0 while <code>i &lt; temps.Length</code>. Print <code>i + 1</code> so people see Day 1, not Day 0. Then use <code>foreach</code> to read each value back.",
          "<code>for (int i = 0; i &lt; temps.Length; i++)\n{\n    Console.Write($\"Day {i + 1} temperature: \");\n    temps[i] = Convert.ToInt32(Console.ReadLine());\n}</code>"
        ],
        mistakes: [
          { wrong: "Using <code>i &lt;= temps.Length</code>.", fix: "That tries <code>temps[5]</code>, which doesn't exist. Use <code>i &lt; temps.Length</code>." },
          { wrong: "Printing <code>Day {i}</code>, so it asks for Day 0.", fix: "Show <code>{i + 1}</code> to people, but still store into <code>temps[i]</code>." },
          { wrong: "Starting the loop at 1, so <code>temps[0]</code> is never filled.", fix: "Start at <code>int i = 0</code>." },
          { wrong: "Trying to change the array inside the <code>foreach</code>.", fix: "<code>foreach</code> is only for reading values. Fill the array in the <code>for</code> loop." }
        ]
      },

      // ---------------------------------------------------------------- l3
      {
        id: "m07-l3",
        title: "Total, average, max and min",
        type: "code",
        learn: `
<p>Once your data is in an array, you can process it. Exam questions love asking you to do these <strong>by hand</strong> with a loop.</p>
<h3>Total and average</h3>
<pre><code class="cs">int[] tries = { 3, 5, 1, 4 };
int total = 0;
for (int i = 0; i &lt; tries.Length; i++)
{
    total += tries[i];
}
double average = (double)total / tries.Length;   // 13 / 4 = 3.25</code></pre>
<div class="warn">Without <code>(double)</code>, <code>13 / 4</code> is integer division and gives <code>3</code>. Cast first to keep the decimal part.</div>
<h3>Maximum and minimum</h3>
<p>Start by assuming the <strong>first</strong> element is the biggest. Then compare it with every other element and update when you find something bigger.</p>
<pre><code class="cs">int max = tries[0];
int min = tries[0];
for (int i = 1; i &lt; tries.Length; i++)
{
    if (tries[i] &gt; max)
    {
        max = tries[i];
    }
    if (tries[i] &lt; min)
    {
        min = tries[i];
    }
}</code></pre>
<div class="tip">Why start with <code>tries[0]</code> and not 0? If every value were negative (like temperatures in winter), starting at 0 would give the wrong maximum.</div>`,
        instructions: [
          "The array <code>goals</code> holds a team's goals for each match. Using loops (not built-in methods like <code>Max()</code>), work out the total, average, highest and lowest.",
          "Print <code>Total: 21</code>, <code>Average: 3.5</code>, <code>Highest: 7</code> and <code>Lowest: 1</code> (the real values for the array)."
        ],
        starter: prog(`
int[] goals = { 2, 7, 1, 4, 3, 4 };

int total = 0;
// TODO: loop to add up the total

// TODO: work out the average as a double

int highest = goals[0];
int lowest = goals[0];
// TODO: loop to find highest and lowest

// TODO: print Total:, Average:, Highest:, Lowest:`),
        solution: prog(`
int[] goals = { 2, 7, 1, 4, 3, 4 };

int total = 0;
for (int i = 0; i < goals.Length; i++)
{
    total += goals[i];
}

double average = (double)total / goals.Length;

int highest = goals[0];
int lowest = goals[0];
for (int i = 1; i < goals.Length; i++)
{
    if (goals[i] > highest)
    {
        highest = goals[i];
    }
    if (goals[i] < lowest)
    {
        lowest = goals[i];
    }
}

Console.WriteLine($"Total: {total}");
Console.WriteLine($"Average: {average}");
Console.WriteLine($"Highest: {highest}");
Console.WriteLine($"Lowest: {lowest}");`),
        tests: [
          { type: "output", includes: "Total: 21", msg: "Print Total: 21", help: "The checker wants <code>Total: 21</code>. Check your loop adds every element with <code>total += goals[i];</code>." },
          { type: "output", includes: "Average: 3.5", msg: "Print Average: 3.5 (remember to cast to double).", help: "The checker wants <code>Average: 3.5</code>. Cast before dividing: <code>(double)total / goals.Length</code>." },
          { type: "output", includes: "Highest: 7", msg: "Print Highest: 7", help: "The checker wants <code>Highest: 7</code>. Inside the loop, update <code>highest = goals[i]</code> when <code>goals[i] &gt; highest</code>." },
          { type: "output", includes: "Lowest: 1", msg: "Print Lowest: 1", help: "The checker wants <code>Lowest: 1</code>. Inside the loop, update <code>lowest = goals[i]</code> when <code>goals[i] &lt; lowest</code>." },
          { type: "codeNot", pattern: "\\.(Max|Min|Sum|Average)\\s*\\(", msg: "Work these out with loops, not Max()/Min()/Sum()/Average().", help: "The checker doesn't allow <code>Max()</code>, <code>Min()</code>, <code>Sum()</code> or <code>Average()</code>. Work the values out with your own loops." }
        ],
        hint: "total += goals[i];  average = (double)total / goals.Length;  if (goals[i] > highest) highest = goals[i];",
        goal: "The program works out and prints the total, average, highest and lowest number of goals from the array, using loops.",
        steps: [
          "Under <code>// TODO: loop to add up the total</code>, write <code>for (int i = 0; i &lt; goals.Length; i++)</code> with <code>total += goals[i];</code> inside.",
          "Under the average TODO, write <code>double average = (double)total / goals.Length;</code>.",
          "Under the highest/lowest TODO, write another loop starting at 1: <code>for (int i = 1; i &lt; goals.Length; i++)</code>.",
          "Inside it, add <code>if (goals[i] &gt; highest)</code> that sets <code>highest = goals[i];</code>, and a similar <code>if</code> with <code>&lt;</code> for <code>lowest</code>.",
          "Print the four lines: <code>Total: </code>, <code>Average: </code>, <code>Highest: </code> and <code>Lowest: </code> with the values. Press <strong>Run</strong> to check."
        ],
        hints: [
          "For a total, start at 0 and add each element. For the highest, start with the first element and replace it whenever you find something bigger.",
          "Cast to <code>double</code> before dividing, or 21 / 6 gives 3 instead of 3.5. Compare each element with <code>highest</code> and <code>lowest</code> inside one loop.",
          "<code>for (int i = 1; i &lt; goals.Length; i++)\n{\n    if (goals[i] &gt; highest)\n    {\n        highest = goals[i];\n    }\n    if (goals[i] &lt; lowest)\n    {\n        lowest = goals[i];\n    }\n}</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>total / goals.Length</code> without a cast, giving <code>Average: 3</code>.", fix: "Both are ints, so the decimal is lost. Write <code>(double)total / goals.Length</code>." },
          { wrong: "Using <code>else if</code> for the lowest check.", fix: "Here that works, but two separate <code>if</code> statements are clearer: each element is checked against both." },
          { wrong: "Using <code>goals.Max()</code> or <code>goals.Sum()</code>.", fix: "The task asks you to use loops, and the checker rejects these methods." },
          { wrong: "Writing <code>highest = i;</code> instead of <code>highest = goals[i];</code>.", fix: "<code>i</code> is the position. You want the value stored at that position." }
        ]
      },

      // ---------------------------------------------------------------- l4
      {
        id: "m07-l4",
        title: "Linear search",
        type: "code",
        learn: `
<p>How do you find out whether a value is in an array? The simplest way is a <strong>linear search</strong>: check each element in turn, from the start, until you find it or run out of elements.</p>
<div class="key"><strong>Linear search</strong> an algorithm that checks each element of a list one after another until the target is found or the end is reached.</div>
<pre><code class="cs">string[] squad = { "Ben", "Aoife", "Niamh", "Oisín" };
string target = "Niamh";

int position = -1;            // -1 means "not found yet"
for (int i = 0; i &lt; squad.Length; i++)
{
    if (squad[i] == target)
    {
        position = i;
        break;                // found it, stop looking
    }
}

if (position == -1)
{
    Console.WriteLine("Not found");
}
else
{
    Console.WriteLine($"Found at index {position}");
}</code></pre>
<p>Why <code>-1</code>? It can never be a real index, so it's a safe way to say "not found".</p>
<div class="tip">You could use a <code>bool found = false;</code> instead and set it to <code>true</code> in the loop. Both approaches are common in exam answers.</div>
<p>A linear search works on <strong>unsorted</strong> data, but it can be slow for big lists: in the worst case it checks every single element.</p>`,
        instructions: [
          "The array <code>films</code> is showing at the cinema this week. Ask <code>Which film? </code> and read the name.",
          "Use a <code>for</code> loop to perform a linear search for it.",
          "If found, print <code>Showing on screen 3</code> where the screen number is the index + 1. Otherwise print <code>Sorry, that film isn't showing.</code>"
        ],
        starter: prog(`
string[] films = { "Space Pups", "Haunted Hall", "Goal!", "Dino Dash", "Ocean Quest" };

Console.Write("Which film? ");
string target = Console.ReadLine();

int position = -1;
// TODO: linear search - loop through films and set position if found

// TODO: print the result`),
        solution: prog(`
string[] films = { "Space Pups", "Haunted Hall", "Goal!", "Dino Dash", "Ocean Quest" };

Console.Write("Which film? ");
string target = Console.ReadLine();

int position = -1;
for (int i = 0; i < films.Length; i++)
{
    if (films[i] == target)
    {
        position = i;
        break;
    }
}

if (position == -1)
{
    Console.WriteLine("Sorry, that film isn't showing.");
}
else
{
    Console.WriteLine($"Showing on screen {position + 1}");
}`),
        stdin: ["Goal!"],
        tests: [
          { type: "output", stdin: ["Goal!"], includes: "Showing on screen 3", msg: "Goal! is at index 2, so print Showing on screen 3", help: "When <code>Goal!</code> is entered, your program should print <code>Showing on screen 3</code>. It's at index 2, so print <code>position + 1</code>." },
          { type: "output", stdin: ["Space Pups"], includes: "Showing on screen 1", msg: "The first film should be on screen 1.", help: "When <code>Space Pups</code> is entered, your program should print <code>Showing on screen 1</code>. Make sure your loop starts at index 0." },
          { type: "output", stdin: ["Ocean Quest"], includes: "Showing on screen 5", msg: "The last film should be on screen 5.", help: "When <code>Ocean Quest</code> is entered, your program should print <code>Showing on screen 5</code>. Use <code>i &lt; films.Length</code> so the last film is checked." },
          { type: "fn", stdin: ["Frozen Lake"], fn: (out) => out.includes("Sorry, that film isn't showing.") && !/screen \d/.test(out), msg: "A film not in the list should print Sorry, that film isn't showing.", help: "When <code>Frozen Lake</code> is entered, your program should print only <code>Sorry, that film isn't showing.</code>. Check <code>position == -1</code> after the loop, not inside it." },
          { type: "code", pattern: "for\\s*\\(|foreach\\s*\\(", msg: "Use a loop to search.", help: "The checker looks for a <code>for</code> or <code>foreach</code> loop. Use one to go through the films." },
          { type: "codeNot", pattern: "Array\\.IndexOf|\\.Contains\\s*\\(", msg: "Write the linear search yourself instead of using IndexOf or Contains.", help: "The checker doesn't allow <code>Array.IndexOf</code> or <code>.Contains</code>. Write the search loop yourself." }
        ],
        hint: "if (films[i] == target) { position = i; break; }  then after the loop, check if position == -1.",
        goal: "The program asks which film you want and searches the list; it tells you which screen it's on, or says it isn't showing.",
        steps: [
          "Under the linear search TODO, write <code>for (int i = 0; i &lt; films.Length; i++)</code> with curly brackets.",
          "Inside, write <code>if (films[i] == target)</code> with curly brackets.",
          "Inside that <code>if</code>, set <code>position = i;</code> and then <code>break;</code>.",
          "After the loop, write <code>if (position == -1)</code> that prints <code>Sorry, that film isn't showing.</code>.",
          "Add an <code>else</code> that prints <code>$\"Showing on screen {position + 1}\"</code>. Press <strong>Run</strong> and try Goal! and Frozen Lake."
        ],
        hints: [
          "Look at each film in turn. If it matches, remember where you found it.",
          "<code>position</code> starts at -1, meaning \"not found\". Change it to <code>i</code> when <code>films[i] == target</code>. After the loop, check whether it's still -1.",
          "<code>for (int i = 0; i &lt; films.Length; i++)\n{\n    if (films[i] == target)\n    {\n        position = i;\n        break;\n    }\n}</code>"
        ],
        mistakes: [
          { wrong: "Printing \"not showing\" inside the loop with an <code>else</code>.", fix: "Then it prints for every film that doesn't match. Decide after the loop, using <code>position == -1</code>." },
          { wrong: "Printing <code>{position}</code>, so Goal! shows as screen 2.", fix: "Screens start at 1 but indexes start at 0. Print <code>{position + 1}</code>." },
          { wrong: "Typing the film name with different capitals, like <code>goal!</code>, when testing.", fix: "<code>==</code> is case-sensitive. Type it exactly as it is in the array." },
          { wrong: "Using <code>Array.IndexOf</code> or <code>Contains</code>.", fix: "The task is to write the search yourself with a loop." }
        ]
      },

      // ---------------------------------------------------------------- l5
      {
        id: "m07-l5",
        title: "Bubble sort",
        type: "code",
        learn: `
<p>Sorting puts data in order, like a leaderboard. The <strong>bubble sort</strong> is the sorting algorithm you need to know for GCSE.</p>
<div class="key"><strong>Bubble sort</strong> repeatedly steps through a list comparing neighbouring pairs and swapping them if they're in the wrong order. After each pass, the largest remaining value has "bubbled" to the end.</div>
<h3>Swapping two elements</h3>
<p>You need a temporary variable, or you'd lose one of the values:</p>
<pre><code class="cs">int temp = nums[j];
nums[j] = nums[j + 1];
nums[j + 1] = temp;</code></pre>
<h3>The full algorithm</h3>
<pre><code class="cs">int[] nums = { 5, 1, 4, 2 };

for (int pass = 0; pass &lt; nums.Length - 1; pass++)
{
    for (int j = 0; j &lt; nums.Length - 1 - pass; j++)
    {
        if (nums[j] &gt; nums[j + 1])
        {
            int temp = nums[j];
            nums[j] = nums[j + 1];
            nums[j + 1] = temp;
        }
    }
}
// nums is now 1, 2, 4, 5</code></pre>
<ul>
<li>The inner loop stops at <code>Length - 1</code> because it looks at <code>j + 1</code>. Going further would crash.</li>
<li><code>- pass</code> is an optimisation: the end of the array is already sorted.</li>
<li>To sort into <strong>descending</strong> order (biggest first), just flip the comparison to <code>&lt;</code>.</li>
</ul>
<div class="tip">C# has <code>Array.Sort(nums)</code> built in, but exam questions expect you to understand and write the algorithm yourself.</div>`,
        instructions: [
          "Sort the <code>times</code> array (sprint times in seconds) into ascending order using a bubble sort written with nested <code>for</code> loops. Don't use <code>Array.Sort</code>.",
          "Print the sorted times on one line separated by spaces after <code>Sorted: </code>, e.g. <code>Sorted: 12 13 14 15 16 18</code>",
          "Print <code>Winner: 12 seconds</code> using the first element after sorting."
        ],
        starter: prog(`
int[] times = { 15, 12, 18, 14, 16, 13 };

// TODO: bubble sort - outer loop for passes, inner loop comparing times[j] and times[j + 1]

Console.Write("Sorted: ");
// TODO: loop to print each time followed by a space
Console.WriteLine();

// TODO: print Winner: ... seconds`),
        solution: prog(`
int[] times = { 15, 12, 18, 14, 16, 13 };

for (int pass = 0; pass < times.Length - 1; pass++)
{
    for (int j = 0; j < times.Length - 1 - pass; j++)
    {
        if (times[j] > times[j + 1])
        {
            int temp = times[j];
            times[j] = times[j + 1];
            times[j + 1] = temp;
        }
    }
}

Console.Write("Sorted: ");
foreach (int t in times)
{
    Console.Write(t + " ");
}
Console.WriteLine();

Console.WriteLine($"Winner: {times[0]} seconds");`),
        tests: [
          { type: "outputRegex", pattern: "Sorted:\\s*12\\s+13\\s+14\\s+15\\s+16\\s+18", msg: "Print Sorted: 12 13 14 15 16 18", help: "The checker wants <code>Sorted: 12 13 14 15 16 18</code> on one line. Check your swap uses a temp variable and you print with <code>Console.Write</code> plus a space." },
          { type: "output", includes: "Winner: 12 seconds", msg: "Print Winner: 12 seconds", help: "The checker wants <code>Winner: 12 seconds</code>. After sorting, the fastest time is <code>times[0]</code>." },
          { type: "code", pattern: "for\\s*\\([\\s\\S]*for\\s*\\(", msg: "Use nested for loops for the bubble sort.", help: "The checker looks for two <code>for</code> loops, one inside the other. Write the outer pass loop and the inner comparison loop." },
          { type: "code", pattern: "\\[\\s*j\\s*\\+\\s*1\\s*\\]", msg: "Compare neighbouring elements, e.g. times[j] and times[j + 1].", help: "The checker looks for <code>[j + 1]</code> in your code. Compare neighbouring elements <code>times[j]</code> and <code>times[j + 1]</code>." },
          { type: "codeNot", pattern: "Array\\.Sort|\\.Sort\\s*\\(", msg: "Write the bubble sort yourself; don't use Array.Sort.", help: "The checker doesn't allow <code>Array.Sort</code> or <code>.Sort()</code>. Write the bubble sort yourself." }
        ],
        hint: "if (times[j] > times[j + 1]) { int temp = times[j]; times[j] = times[j + 1]; times[j + 1] = temp; }",
        goal: "The program sorts the sprint times from fastest to slowest with a bubble sort, prints them on one line, and names the winning time.",
        steps: [
          "Under the bubble sort TODO, write the outer loop <code>for (int pass = 0; pass &lt; times.Length - 1; pass++)</code> with curly brackets.",
          "Inside it, write the inner loop <code>for (int j = 0; j &lt; times.Length - 1 - pass; j++)</code> with curly brackets.",
          "Inside the inner loop, add <code>if (times[j] &gt; times[j + 1])</code> with curly brackets.",
          "Inside that <code>if</code>, swap the two with a temp variable: <code>int temp = times[j];</code>, <code>times[j] = times[j + 1];</code>, <code>times[j + 1] = temp;</code>.",
          "Under the print TODO, write <code>foreach (int t in times)</code> that does <code>Console.Write(t + \" \");</code>. Press <strong>Run</strong>.",
          "Finally print <code>$\"Winner: {times[0]} seconds\"</code>. Run it again to check."
        ],
        hints: [
          "Compare each pair of neighbours. If the left one is bigger, swap them. Repeat until nothing needs swapping.",
          "You need two nested <code>for</code> loops. The inner loop compares <code>times[j]</code> with <code>times[j + 1]</code> and stops at <code>Length - 1</code> so <code>j + 1</code> never goes off the end.",
          "<code>if (times[j] &gt; times[j + 1])\n{\n    int temp = times[j];\n    times[j] = times[j + 1];\n    times[j + 1] = temp;\n}</code>"
        ],
        mistakes: [
          { wrong: "Swapping without a temp: <code>times[j] = times[j + 1]; times[j + 1] = times[j];</code>.", fix: "The first line overwrites a value, so both end up the same. Save it in <code>temp</code> first." },
          { wrong: "Letting the inner loop run to <code>j &lt; times.Length</code>.", fix: "Then <code>times[j + 1]</code> goes off the end and crashes. Stop at <code>times.Length - 1</code>." },
          { wrong: "Using <code>&lt;</code> in the comparison, which sorts biggest first.", fix: "For ascending order, swap when <code>times[j] &gt; times[j + 1]</code>." },
          { wrong: "Using <code>Console.WriteLine</code> for each time, so they're on separate lines.", fix: "Use <code>Console.Write(t + \" \")</code> so they stay on one line." }
        ]
      },

      // ---------------------------------------------------------------- l6
      {
        id: "m07-l6",
        title: "2D arrays: a seating plan",
        type: "code",
        learn: `
<p>A <strong>2D array</strong> is like a table or grid: it has rows <em>and</em> columns. Perfect for seating plans, game boards and marks tables.</p>
<pre><code class="cs">string[,] seats = new string[2, 3];   // 2 rows, 3 columns
seats[0, 0] = "Aoife";
seats[1, 2] = "Ben";

int[,] marks =
{
    { 12, 15, 9 },     // row 0: pupil 1's three tests
    { 18, 11, 14 }     // row 1: pupil 2's three tests
};
Console.WriteLine(marks[1, 0]);   // 18 (row 1, column 0)</code></pre>
<p>The index is always <code>[row, column]</code>. Both start from 0.</p>
<h3>Size of each dimension</h3>
<p><code>GetLength(0)</code> gives the number of rows and <code>GetLength(1)</code> the number of columns. (<code>Length</code> gives the total number of elements.)</p>
<h3>Looping through a 2D array</h3>
<p>Use a nested loop: rows on the outside, columns on the inside.</p>
<pre><code class="cs">for (int r = 0; r &lt; marks.GetLength(0); r++)
{
    int rowTotal = 0;
    for (int c = 0; c &lt; marks.GetLength(1); c++)
    {
        Console.Write(marks[r, c] + " ");
        rowTotal += marks[r, c];
    }
    Console.WriteLine("= " + rowTotal);
}</code></pre>
<pre><code>12 15 9 = 36
18 11 14 = 43</code></pre>
<div class="tip">C# writes a 2D array with a comma: <code>int[,]</code> and <code>marks[r, c]</code>, not <code>marks[r][c]</code>.</div>`,
        instructions: [
          "The <code>scores</code> 2D array holds quiz scores: each row is a team, each column is a round.",
          "Use nested loops with <code>GetLength(0)</code> and <code>GetLength(1)</code> to print each team's total like <code>Team 1: 23</code> (team number = row + 1).",
          "Also print the single score in row 2, column 1 like <code>Team 3, round 2: 9</code> using the index <code>[2, 1]</code>."
        ],
        starter: prog(`
int[,] scores =
{
    { 8, 6, 9 },
    { 5, 7, 4 },
    { 10, 9, 7 },
    { 6, 6, 8 }
};

// TODO: nested loops - for each row, add up the columns, then print Team n: total

// TODO: print Team 3, round 2: ... using scores[2, 1]`),
        solution: prog(`
int[,] scores =
{
    { 8, 6, 9 },
    { 5, 7, 4 },
    { 10, 9, 7 },
    { 6, 6, 8 }
};

for (int r = 0; r < scores.GetLength(0); r++)
{
    int total = 0;
    for (int c = 0; c < scores.GetLength(1); c++)
    {
        total += scores[r, c];
    }
    Console.WriteLine($"Team {r + 1}: {total}");
}

Console.WriteLine($"Team 3, round 2: {scores[2, 1]}");`),
        tests: [
          { type: "output", includes: "Team 1: 23", msg: "Print Team 1: 23", help: "The checker wants <code>Team 1: 23</code>. Check you add <code>scores[r, c]</code> for every column and print <code>r + 1</code> as the team number." },
          { type: "fn", fn: (out) => out.includes("Team 2: 16") && out.includes("Team 3: 26") && out.includes("Team 4: 20"), msg: "Print totals for all four teams (16, 26, 20 for teams 2 to 4).", help: "The checker wants <code>Team 2: 16</code>, <code>Team 3: 26</code> and <code>Team 4: 20</code>. If the numbers are too big, reset <code>total = 0</code> inside the outer loop." },
          { type: "output", includes: "Team 3, round 2: 9", msg: "Print Team 3, round 2: 9", help: "The checker wants <code>Team 3, round 2: 9</code>. Use <code>scores[2, 1]</code>, because rows and columns both start at 0." },
          { type: "code", pattern: "GetLength\\s*\\(\\s*0\\s*\\)[\\s\\S]*GetLength\\s*\\(\\s*1\\s*\\)", msg: "Use GetLength(0) for rows and GetLength(1) for columns.", help: "The checker looks for <code>GetLength(0)</code> and <code>GetLength(1)</code>. Use them in your loop conditions instead of fixed numbers." },
          { type: "code", pattern: "scores\\s*\\[\\s*2\\s*,\\s*1\\s*\\]", msg: "Use scores[2, 1] for the single score.", help: "The checker looks for <code>scores[2, 1]</code> in your code. Use that exact index for the single score." }
        ],
        hint: "Reset total = 0 at the start of each row (inside the outer loop, before the inner loop).",
        goal: "The program adds up each quiz team's scores from a 2D array, prints every team's total, and then prints one particular score.",
        steps: [
          "Under the TODO, write the outer loop <code>for (int r = 0; r &lt; scores.GetLength(0); r++)</code> with curly brackets.",
          "As the first line inside it, set up <code>int total = 0;</code>.",
          "Next, write the inner loop <code>for (int c = 0; c &lt; scores.GetLength(1); c++)</code> containing <code>total += scores[r, c];</code>.",
          "After the inner loop's closing bracket (still inside the outer loop), print <code>$\"Team {r + 1}: {total}\"</code>. Press <strong>Run</strong>.",
          "After both loops, print <code>$\"Team 3, round 2: {scores[2, 1]}\"</code>. Run again."
        ],
        hints: [
          "Each row is a team. For each row, add up all its columns.",
          "<code>GetLength(0)</code> is the number of rows and <code>GetLength(1)</code> is the number of columns. Reset the total to 0 at the start of each row.",
          "<code>for (int r = 0; r &lt; scores.GetLength(0); r++)\n{\n    int total = 0;\n    for (int c = 0; c &lt; scores.GetLength(1); c++)\n    {\n        total += scores[r, c];\n    }\n    Console.WriteLine($\"Team {r + 1}: {total}\");\n}</code>"
        ],
        mistakes: [
          { wrong: "Declaring <code>total</code> once before both loops.", fix: "Then each team's total includes the teams before it. Put <code>int total = 0;</code> inside the outer loop." },
          { wrong: "Writing <code>scores[r][c]</code>.", fix: "C# 2D arrays use a comma: <code>scores[r, c]</code>." },
          { wrong: "Printing the total inside the inner loop.", fix: "Print it after the inner loop ends, once per row." },
          { wrong: "Using <code>scores.Length</code> for the rows.", fix: "<code>Length</code> is the total number of elements (12). Use <code>GetLength(0)</code>." }
        ]
      },

      // ---------------------------------------------------------------- l7
      {
        id: "m07-l7",
        title: "Lists: arrays that grow",
        type: "code",
        learn: `
<p>Arrays have a fixed size. But what if you don't know how many items there will be, like a shopping list? Use a <code>List&lt;T&gt;</code>. It grows and shrinks as you add and remove items.</p>
<pre><code class="cs">using System.Collections.Generic;   // needed at the top for List

List&lt;string&gt; kit = new List&lt;string&gt;();
kit.Add("boots");
kit.Add("gum shield");
kit.Add("water bottle");

Console.WriteLine(kit.Count);          // 3 (Count, not Length!)
Console.WriteLine(kit[0]);             // boots

kit.Remove("gum shield");              // remove by value
Console.WriteLine(kit.Contains("boots"));   // True

kit.Sort();                            // alphabetical order

foreach (string item in kit)
{
    Console.WriteLine("- " + item);
}</code></pre>
<table>
<tr><th>Method / property</th><th>What it does</th></tr>
<tr><td><code>Add(x)</code></td><td>adds x to the end</td></tr>
<tr><td><code>Remove(x)</code></td><td>removes the first x</td></tr>
<tr><td><code>RemoveAt(i)</code></td><td>removes the element at index i</td></tr>
<tr><td><code>Contains(x)</code></td><td><code>true</code> if x is in the list</td></tr>
<tr><td><code>Count</code></td><td>how many elements there are</td></tr>
<tr><td><code>Sort()</code></td><td>sorts into ascending order</td></tr>
</table>
<div class="tip">You can also start a list with values: <code>new List&lt;int&gt; { 4, 8, 15 }</code>.</div>
<p>The <code>&lt;string&gt;</code> part says what type of data the list holds. A <code>List&lt;int&gt;</code> can only hold whole numbers, just like an <code>int[]</code> array.</p>`,
        instructions: [
          "Make an empty <code>List&lt;string&gt;</code> called <code>trip</code>. Keep asking <code>Add a pupil (or done): </code> and <code>Add</code> each name until <code>done</code> is entered.",
          "Then ask <code>Who is off sick? </code>. If the list <code>Contains</code> that name, <code>Remove</code> it and print <code>Removed Ben</code> (with the name); otherwise print <code>Ben is not on the list</code>.",
          "<code>Sort</code> the list, print <code>Pupils going: 3</code> using <code>Count</code>, then print each name on its own line with a <code>foreach</code> loop."
        ],
        starter: prog(`
List<string> trip = new List<string>();

// TODO: loop - ask Add a pupil (or done): and Add each name until done

Console.Write("Who is off sick? ");
string sick = Console.ReadLine();

// TODO: if trip contains sick, Remove it and print Removed ..., else print ... is not on the list

// TODO: Sort, print Pupils going: ..., then foreach to print each name`, { usings: LISTS }),
        solution: prog(`
List<string> trip = new List<string>();

Console.Write("Add a pupil (or done): ");
string name = Console.ReadLine();
while (name != "done")
{
    trip.Add(name);
    Console.Write("Add a pupil (or done): ");
    name = Console.ReadLine();
}

Console.Write("Who is off sick? ");
string sick = Console.ReadLine();

if (trip.Contains(sick))
{
    trip.Remove(sick);
    Console.WriteLine($"Removed {sick}");
}
else
{
    Console.WriteLine($"{sick} is not on the list");
}

trip.Sort();
Console.WriteLine($"Pupils going: {trip.Count}");
foreach (string p in trip)
{
    Console.WriteLine(p);
}`, { usings: LISTS }),
        stdin: ["Niamh", "Ben", "Grace", "Aoife", "done", "Ben"],
        tests: [
          { type: "output", stdin: ["Niamh", "Ben", "Grace", "Aoife", "done", "Ben"], includes: "Removed Ben", msg: "Ben is on the list, so print Removed Ben", help: "When the inputs are Niamh, Ben, Grace, Aoife, done, then <code>Ben</code>, your program should print <code>Removed Ben</code>. Use <code>trip.Contains(sick)</code> and <code>trip.Remove(sick)</code>." },
          { type: "output", stdin: ["Niamh", "Ben", "Grace", "Aoife", "done", "Ben"], includes: "Pupils going: 3", msg: "After removing Ben, print Pupils going: 3", help: "With those inputs, after removing Ben it should print <code>Pupils going: 3</code>. Make sure <code>done</code> isn't added and you use <code>trip.Count</code> after removing." },
          { type: "fn", stdin: ["Niamh", "Ben", "Grace", "Aoife", "done", "Ben"], fn: (out) => { const l = lines(out.split("Pupils going: 3")[1] || ""); return l.join(",") === "Aoife,Grace,Niamh"; }, msg: "Then print Aoife, Grace, Niamh (sorted), one per line.", help: "After <code>Pupils going: 3</code>, it should print Aoife, Grace, Niamh, one per line. Call <code>trip.Sort()</code> before the <code>foreach</code> loop, and print only the names." },
          { type: "fn", stdin: ["Oisín", "Grace", "done", "Ciarán"], fn: (out) => out.includes("Ciarán is not on the list") && out.includes("Pupils going: 2"), msg: "If the name isn't in the list, print e.g. Ciarán is not on the list (and keep everyone).", help: "When the inputs are Oisín, Grace, done, then <code>Ciarán</code>, it should print <code>Ciarán is not on the list</code> and <code>Pupils going: 2</code>. Add an <code>else</code> for names that aren't in the list." },
          { type: "code", pattern: "\\.Add\\s*\\(", msg: "Use Add to add names.", help: "The checker looks for <code>.Add(</code> in your code. Use <code>trip.Add(name)</code> to add each pupil." },
          { type: "code", pattern: "\\.Contains\\s*\\([\\s\\S]*\\.Remove\\s*\\(|\\.Remove\\s*\\([\\s\\S]*\\.Contains\\s*\\(", msg: "Use Contains and Remove.", help: "The checker looks for both <code>.Contains(</code> and <code>.Remove(</code>. Check the list contains the name before removing it." },
          { type: "code", pattern: "\\.Count\\b", msg: "Use Count for the number of pupils.", help: "The checker looks for <code>.Count</code> in your code. Use it for the number of pupils going." }
        ],
        hint: "Use a sentinel loop like in the Iteration module: read before the loop, then while (name != \"done\") { trip.Add(name); ...read again... }",
        goal: "The program collects pupils' names for a trip until you type done, removes anyone off sick, then prints how many are going and their names in alphabetical order.",
        steps: [
          "Under the first TODO, ask <code>Add a pupil (or done): </code> and read it into <code>string name</code>.",
          "Write <code>while (name != \"done\")</code> with curly brackets. Inside, do <code>trip.Add(name);</code>, then ask again and read into <code>name</code> (no <code>string</code> this time).",
          "Under the sick TODO, write <code>if (trip.Contains(sick))</code>. Inside, call <code>trip.Remove(sick);</code> and print <code>$\"Removed {sick}\"</code>.",
          "Add an <code>else</code> that prints <code>$\"{sick} is not on the list\"</code>. Press <strong>Run</strong> to test.",
          "Under the last TODO, call <code>trip.Sort();</code> and print <code>$\"Pupils going: {trip.Count}\"</code>.",
          "Finally, write <code>foreach (string p in trip)</code> that prints <code>p</code>. Run with Niamh, Ben, Grace, Aoife, done, Ben."
        ],
        hints: [
          "Use a sentinel loop: keep adding names until the word <code>done</code> is typed. Then use the List methods.",
          "<code>Add</code> puts a name on the end, <code>Contains</code> checks if it's there, <code>Remove</code> takes it off, <code>Sort</code> puts them in order and <code>Count</code> says how many.",
          "<code>Console.Write(\"Add a pupil (or done): \");\nstring name = Console.ReadLine();\nwhile (name != \"done\")\n{\n    trip.Add(name);\n    Console.Write(\"Add a pupil (or done): \");\n    name = Console.ReadLine();\n}</code>"
        ],
        mistakes: [
          { wrong: "Adding <code>done</code> to the list.", fix: "Check for <code>done</code> before you <code>Add</code>. Read before the loop, then read again at the end of the loop body." },
          { wrong: "Using <code>trip.Length</code>.", fix: "Lists use <code>Count</code>, not <code>Length</code>." },
          { wrong: "Forgetting to read a new name inside the loop, so it never stops.", fix: "Read into <code>name</code> again as the last line of the loop." },
          { wrong: "Printing the Pupils going line before <code>Remove</code>.", fix: "Remove the sick pupil first, then <code>Sort</code>, then print the count." }
        ]
      },

      // ---------------------------------------------------------------- l8
      {
        id: "m07-l8",
        title: "Parallel arrays vs lists",
        type: "code",
        learn: `
<p>Often you need to store <em>several</em> pieces of data about each thing, such as a pet's name <strong>and</strong> its age. One way is <strong>parallel arrays</strong>: two arrays where the same index refers to the same thing.</p>
<pre><code class="cs">string[] names = { "Biscuit", "Luna", "Max" };
int[] ages     = { 3, 7, 1 };

for (int i = 0; i &lt; names.Length; i++)
{
    Console.WriteLine($"{names[i]} is {ages[i]}");
}</code></pre>
<p>Index 1 means Luna <em>and</em> 7 together. The arrays must always stay in step: if you sort one, you must swap the matching elements in the other too!</p>
<h3>Finding the oldest</h3>
<p>To find which pet is oldest, remember the <strong>index</strong> of the biggest age, not just the age. Then you can look up the name with the same index.</p>
<pre><code class="cs">int best = 0;
for (int i = 1; i &lt; ages.Length; i++)
{
    if (ages[i] &gt; ages[best])
    {
        best = i;
    }
}
Console.WriteLine($"Oldest: {names[best]}");</code></pre>
<h3>Arrays or lists?</h3>
<table>
<tr><th>Array</th><th>List&lt;T&gt;</th></tr>
<tr><td>Fixed size, set when created</td><td>Grows and shrinks</td></tr>
<tr><td><code>Length</code></td><td><code>Count</code></td></tr>
<tr><td>Good when you know the size (7 days, 12 months)</td><td>Good when you don't (pupils signing up)</td></tr>
</table>
<div class="tip">Parallel lists work exactly the same way: <code>names.Add(...)</code> and <code>ages.Add(...)</code> together keep them in step. Later, in the classes module, you'll see a neater way: one object per pet.</div>`,
        instructions: [
          "Two parallel lists, <code>pets</code> and <code>weights</code> (kg), are started for you. Ask <code>New pet name: </code> and <code>Weight: </code> (a double) and <code>Add</code> to both lists.",
          "Use a <code>for</code> loop to print every pet like <code>Biscuit: 4.5 kg</code>.",
          "Find the index of the heaviest pet and print <code>Heaviest: Rex</code> (with the right name)."
        ],
        starter: prog(`
List<string> pets = new List<string> { "Biscuit", "Luna", "Max" };
List<double> weights = new List<double> { 4.5, 3.2, 12.8 };

// TODO: ask New pet name: and Weight: and add to BOTH lists

// TODO: for loop printing e.g. Biscuit: 4.5 kg

// TODO: find the index of the heaviest weight and print Heaviest: ...`, { usings: LISTS }),
        solution: prog(`
List<string> pets = new List<string> { "Biscuit", "Luna", "Max" };
List<double> weights = new List<double> { 4.5, 3.2, 12.8 };

Console.Write("New pet name: ");
pets.Add(Console.ReadLine());
Console.Write("Weight: ");
weights.Add(Convert.ToDouble(Console.ReadLine()));

for (int i = 0; i < pets.Count; i++)
{
    Console.WriteLine($"{pets[i]}: {weights[i]} kg");
}

int heaviest = 0;
for (int i = 1; i < weights.Count; i++)
{
    if (weights[i] > weights[heaviest])
    {
        heaviest = i;
    }
}
Console.WriteLine($"Heaviest: {pets[heaviest]}");`, { usings: LISTS }),
        stdin: ["Rex", "30.5"],
        tests: [
          { type: "fn", stdin: ["Rex", "30.5"], fn: (out) => ["Biscuit: 4.5 kg", "Luna: 3.2 kg", "Max: 12.8 kg", "Rex: 30.5 kg"].every(s => out.includes(s)), msg: "Print all four pets, e.g. Biscuit: 4.5 kg and Rex: 30.5 kg", help: "When the inputs are <code>Rex</code> and <code>30.5</code>, all four pets should print, like <code>Biscuit: 4.5 kg</code> and <code>Rex: 30.5 kg</code>. Add to both lists and loop up to <code>pets.Count</code>." },
          { type: "output", stdin: ["Rex", "30.5"], includes: "Heaviest: Rex", msg: "Rex (30.5 kg) should be the heaviest.", help: "When the inputs are <code>Rex</code> and <code>30.5</code>, it should print <code>Heaviest: Rex</code>. Track the index of the heaviest weight and print <code>pets[heaviest]</code>." },
          { type: "fn", stdin: ["Pip", "0.3"], fn: (out) => out.includes("Pip: 0.3 kg") && out.includes("Heaviest: Max"), msg: "With a tiny pet called Pip (0.3 kg), Max should be the heaviest.", help: "When the inputs are <code>Pip</code> and <code>0.3</code>, it should print <code>Pip: 0.3 kg</code> and <code>Heaviest: Max</code>. Make sure you compare the weights rather than always picking the new pet." },
          { type: "code", pattern: "weights\\.Add", msg: "Add the weight to the weights list.", help: "The checker looks for <code>weights.Add</code> in your code. Add the new weight to the weights list." },
          { type: "code", pattern: "for\\s*\\(", msg: "Use a for loop so you can use the same index for both lists.", help: "The checker looks for a <code>for</code> loop. Use one so the same index <code>i</code> works for both lists." }
        ],
        hint: "Keep the index of the heaviest: if (weights[i] > weights[heaviest]) heaviest = i;  then print pets[heaviest].",
        goal: "The program adds a new pet and its weight to two matching lists, prints every pet with its weight, and names the heaviest pet.",
        steps: [
          "Under the first TODO, ask <code>New pet name: </code> and add the answer with <code>pets.Add(Console.ReadLine());</code>.",
          "Ask <code>Weight: </code> and add it with <code>weights.Add(Convert.ToDouble(Console.ReadLine()));</code>.",
          "Under the next TODO, write <code>for (int i = 0; i &lt; pets.Count; i++)</code> that prints <code>$\"{pets[i]}: {weights[i]} kg\"</code>. Press <strong>Run</strong>.",
          "Under the last TODO, write <code>int heaviest = 0;</code> and a loop from <code>i = 1</code> to <code>weights.Count</code>.",
          "Inside, if <code>weights[i] &gt; weights[heaviest]</code>, set <code>heaviest = i;</code>.",
          "After the loop, print <code>$\"Heaviest: {pets[heaviest]}\"</code>. Run with Rex and 30.5."
        ],
        hints: [
          "The two lists are parallel: the same index means the same pet. Keep them in step by adding to both.",
          "To find the heaviest, remember its <strong>index</strong>, not just its weight. Then you can look up the name at that same index.",
          "<code>int heaviest = 0;\nfor (int i = 1; i &lt; weights.Count; i++)\n{\n    if (weights[i] &gt; weights[heaviest])\n    {\n        heaviest = i;\n    }\n}</code>"
        ],
        mistakes: [
          { wrong: "Adding the name but forgetting to add the weight.", fix: "Then the lists get out of step. Always <code>Add</code> to both." },
          { wrong: "Using <code>Convert.ToInt32</code> for the weight.", fix: "Weights like 30.5 have decimals, so use <code>Convert.ToDouble</code>." },
          { wrong: "Remembering the biggest weight instead of its index, then not knowing the name.", fix: "Store the index (<code>heaviest = i</code>) and print <code>pets[heaviest]</code>." },
          { wrong: "Using <code>pets.Length</code>.", fix: "Lists use <code>Count</code>." }
        ]
      },

      // ---------------------------------------------------------------- quiz
      {
        id: "m07-quiz",
        title: "Checkpoint: arrays and lists",
        type: "quiz",
        questions: [
          { q: "An array is declared <code>int[] nums = new int[6];</code>. What is the index of the <strong>last</strong> element?",
            options: ["6", "5", "7", "0"],
            answer: 1, explain: "Indexes start at 0, so 6 elements have indexes 0 to 5." },
          { q: "What happens when the code tries to use <code>nums[6]</code> on that array?",
            options: ["It returns 0", "It adds a new element", "IndexOutOfRangeException at runtime", "It wraps round to nums[0]"],
            answer: 2, explain: "There's no index 6, so C# throws an IndexOutOfRangeException: Index was outside the bounds of the array." },
          { q: "Which gives the number of items in a <code>List&lt;string&gt;</code> called <code>names</code>?",
            options: ["names.Length", "names.Count", "names.Size()", "names.Length()"],
            answer: 1, explain: "Lists use Count. Arrays use Length." },
          { q: "How does a <strong>linear search</strong> work?",
            options: ["It checks the middle element and halves the list", "It sorts the list first", "It checks each element in turn from the start", "It only works on numbers"],
            answer: 2, explain: "A linear search checks elements one by one until it finds the target or reaches the end. It works on unsorted data." },
          { q: "In a bubble sort, what is compared on each step of the inner loop?",
            options: ["The first and last elements", "Each element with the largest so far", "Two neighbouring elements", "Each element with the target value"],
            answer: 2, explain: "Bubble sort compares neighbours (j and j + 1) and swaps them if they're in the wrong order." },
          { q: "Why does a swap need a <code>temp</code> variable?",
            options: ["To make the code faster", "Otherwise one of the two values would be overwritten and lost", "C# requires it for arrays", "To count the swaps"],
            answer: 1, explain: "After nums[j] = nums[j + 1], the old nums[j] would be gone unless you saved it in temp first." },
          { q: "<code>int[,] grid = new int[3, 5];</code> What does <code>grid.GetLength(1)</code> return?",
            options: ["3", "5", "15", "1"],
            answer: 1, explain: "GetLength(0) is the number of rows (3) and GetLength(1) is the number of columns (5)." },
          { q: "Why might you choose a <code>List</code> instead of an array?",
            options: ["Lists can only hold strings", "You don't know in advance how many items there will be", "Arrays can't be used with loops", "Lists start at index 1"],
            answer: 1, explain: "A List grows and shrinks as you Add and Remove; an array's size is fixed when it's created." }
        ]
      }
    ]
  });
})();
