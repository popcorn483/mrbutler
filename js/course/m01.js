// Module 1: Output and comments
(function () {
const cs = String.raw;

COURSE.addModule({
  id: "m01",
  title: "Output and comments",
  icon: "print",
  summary: "Control exactly what appears on screen with Write, WriteLine and escape sequences, and explain your code with comments.",
  lessons: [
    {
      id: "m01-l1",
      title: "WriteLine vs Write",
      type: "code",
      learn: cs`<p>You have already used <code>Console.WriteLine</code>. It has a little sister: <code>Console.Write</code>.</p>
<ul>
<li><code>Console.WriteLine("...")</code> prints the text and then moves the cursor to a <strong>new line</strong>.</li>
<li><code>Console.Write("...")</code> prints the text and <strong>stays on the same line</strong>, so whatever is printed next carries on straight after it.</li>
</ul>
<pre><code class="cs">Console.Write("Fish ");
Console.Write("and ");
Console.WriteLine("chips");
Console.WriteLine("Mushy peas");</code></pre>
<p>Output:</p>
<pre><code>Fish and chips
Mushy peas</code></pre>
<p>Notice the spaces <em>inside</em> the quotes after <code>Fish</code> and <code>and</code>. Without them you'd get <code>Fishandchips</code>. The computer only prints what you tell it to, including spaces.</p>
<h3>Blank lines</h3>
<p>Calling <code>WriteLine</code> with nothing in the brackets prints an empty line. It's handy for spacing out your output so it's easier to read:</p>
<pre><code class="cs">Console.WriteLine("Menu");
Console.WriteLine();
Console.WriteLine("1. Pizza");</code></pre>
<pre><code>Menu

1. Pizza</code></pre>
<div class="tip"><code>Write</code> is really useful later on when you ask the user a question: the cursor waits on the same line as the question, just like a real form.</div>`,
      instructions: [
        "Use <code>Console.Write</code> three times to build up the single line <code>Today's lunch is pizza</code> (for example <code>Today's </code>, <code>lunch is </code>, <code>pizza</code>).",
        "Then use <code>Console.WriteLine()</code> to end that line and print a blank line.",
        "Finally print <code>Enjoy your meal!</code> with <code>Console.WriteLine</code>."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: use Console.Write three times to print Today's lunch is pizza

        // TODO: end the line and print a blank line

        // TODO: print Enjoy your meal!

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        Console.Write("Today's ");
        Console.Write("lunch is ");
        Console.Write("pizza");
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("Enjoy your meal!");
    }
}`,
      tests: [
        { type: "output", includes: "Today's lunch is pizza", msg: "Print Today's lunch is pizza all on one line (watch the spaces).",
          help: "Your output needs <code>Today's lunch is pizza</code> all on one line with single spaces between the words. If you see <code>Today'slunch</code>, add a space at the end of the text inside your first two <code>Console.Write</code> quotes." },
        { type: "fn", fn: (out, code) => (code.match(/Console\.Write\s*\(/g) || []).length >= 3, msg: "Use Console.Write at least three times.",
          help: "This check counts how many times you used <code>Console.Write</code> (not <code>WriteLine</code>). You need at least three, one for each piece of the sentence." },
        { type: "outputRegex", pattern: "pizza\\r?\\n\\s*\\r?\\nEnjoy your meal!", msg: "Leave one blank line between the lunch line and Enjoy your meal!",
          help: "There must be one empty line between <code>pizza</code> and <code>Enjoy your meal!</code>. You need <strong>two</strong> <code>Console.WriteLine();</code> lines: the first ends the pizza line, the second makes the blank line." },
        { type: "output", includes: "Enjoy your meal!", msg: "Print Enjoy your meal!",
          help: "This check looks for <code>Enjoy your meal!</code> in the output. Add a <code>Console.WriteLine(\"Enjoy your meal!\");</code> at the end and check the spelling." }
      ],
      hint: "Console.Write(\"Today's \"); keeps the cursor on the same line. Two Console.WriteLine(); calls in a row end the line and then add a blank one.",
      goal: "When it runs, your program prints <code>Today's lunch is pizza</code> on one line, then a blank line, then <code>Enjoy your meal!</code>",
      steps: [
        "Under the first <code>// TODO</code>, type <code>Console.Write(\"Today's \");</code> (notice the space before the closing quote).",
        "On the next line type <code>Console.Write(\"lunch is \");</code> and on the line after that <code>Console.Write(\"pizza\");</code>",
        "Press <strong>Run</strong>. You should see <code>Today's lunch is pizza</code> all on one line.",
        "Under the second <code>// TODO</code>, type <code>Console.WriteLine();</code> twice, on two separate lines.",
        "Under the last <code>// TODO</code>, print <code>Enjoy your meal!</code> with <code>Console.WriteLine</code>.",
        "Press <strong>Run</strong> and check there is a gap line before <code>Enjoy your meal!</code>, then press <strong>Check</strong>."
      ],
      hints: [
        "<code>Write</code> stays on the same line; <code>WriteLine</code> moves to a new line afterwards. Build the first sentence in pieces with <code>Write</code>.",
        "Use three <code>Console.Write</code> statements for the three pieces, with a space at the end of the first two. Then <code>Console.WriteLine();</code> with empty brackets ends a line.",
        "The middle part can look like this: <code>Console.Write(\"pizza\");</code> then <code>Console.WriteLine();</code> then <code>Console.WriteLine();</code>"
      ],
      mistakes: [
        { wrong: "Forgetting the spaces inside the quotes, so the output reads <code>Today'slunch ispizza</code>.", fix: "Put a space just before the closing quote: <code>\"Today's \"</code> and <code>\"lunch is \"</code>." },
        { wrong: "Using <code>Console.WriteLine</code> for each piece, so the words end up on separate lines.", fix: "Use <code>Console.Write</code> (no <em>Line</em>) for the three pieces of the sentence." },
        { wrong: "Only using one <code>Console.WriteLine();</code>, so there's no blank line.", fix: "The first <code>WriteLine();</code> just finishes the pizza line. You need a second one to make an empty line." }
      ]
    },
    {
      id: "m01-l2",
      title: "Escape sequences",
      type: "code",
      learn: cs`<p>What if you want to print a double quote? This won't work, because C# thinks the string ends at the second <code>"</code>:</p>
<pre><code class="cs">Console.WriteLine("Niamh said "hi"");   // ✗ syntax error</code></pre>
<p>The fix is an <strong>escape sequence</strong>: a backslash <code>\</code> followed by a character, which together mean something special.</p>
<table>
<tr><th>Escape</th><th>Prints</th></tr>
<tr><td><code>\n</code></td><td>a new line</td></tr>
<tr><td><code>\t</code></td><td>a tab (jumps to the next column, great for lining things up)</td></tr>
<tr><td><code>\"</code></td><td>a double quote</td></tr>
<tr><td><code>\\</code></td><td>a single backslash</td></tr>
</table>
<pre><code class="cs">Console.WriteLine("Niamh said \"hi\"");
Console.WriteLine("Line one\nLine two");
Console.WriteLine("Name\tScore");
Console.WriteLine("Ben\t12");
Console.WriteLine("Saved in C:\\Homework");</code></pre>
<p>Output:</p>
<pre><code>Niamh said "hi"
Line one
Line two
Name    Score
Ben     12
Saved in C:\Homework</code></pre>
<p>Tabs make simple tables: each <code>\t</code> jumps along to the next tab stop, so short words line up in columns.</p>
<div class="tip">One <code>WriteLine</code> with <code>\n</code> inside can print several lines. That's neat, but separate <code>WriteLine</code> statements are often easier to read. Use whichever makes your code clearer.</div>`,
      instructions: [
        "Print <code>The coach shouted \"Go for it!\"</code> (with the double quotes showing) using <code>\\\"</code>.",
        "Using a <strong>single</strong> <code>Console.WriteLine</code> with <code>\\n</code> inside it, print <code>Ready</code> and <code>Set</code> on two separate lines.",
        "Print <code>Player</code>, a tab, then <code>Tries</code> using <code>\\t</code>.",
        "Print <code>Files are in C:\\Rugby</code> (with one backslash showing)."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO 1: The coach shouted "Go for it!"

        // TODO 2: Ready and Set on two lines, using \n in ONE WriteLine

        // TODO 3: Player<tab>Tries

        // TODO 4: Files are in C:\Rugby

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("The coach shouted \"Go for it!\"");
        Console.WriteLine("Ready\nSet");
        Console.WriteLine("Player\tTries");
        Console.WriteLine("Files are in C:\\Rugby");
    }
}`,
      tests: [
        { type: "output", includes: "The coach shouted \"Go for it!\"", msg: "Print The coach shouted \"Go for it!\" with the quotes showing.",
          help: "Your output must show the double quotes round <code>Go for it!</code>. Inside your string, type <code>\\\"</code> wherever you want a quote mark to appear." },
        { type: "code", pattern: "\\\\n", msg: "Use \\n inside a string to make a new line.",
          help: "This check looks for <code>\\n</code> inside one of your strings. Printing Ready and Set with two separate <code>WriteLine</code>s won't pass: use one <code>WriteLine</code> with <code>\\n</code> between the words." },
        { type: "outputRegex", pattern: "Ready\\r?\\nSet", msg: "Print Ready and Set on two separate lines.",
          help: "<code>Ready</code> must be on one line with <code>Set</code> straight underneath. Check there are no spaces round <code>\\n</code>: it should be <code>\"Ready\\nSet\"</code>." },
        { type: "output", includes: "Player\tTries", msg: "Print Player, a tab (\\t), then Tries.",
          help: "This check looks for <code>Player</code>, a tab and <code>Tries</code>. Use <code>\\t</code> between them, not spaces: <code>\"Player\\tTries\"</code>." },
        { type: "output", includes: "Files are in C:\\Rugby", msg: "Print Files are in C:\\Rugby using \\\\ for the backslash.",
          help: "Your output needs <code>Files are in C:\\Rugby</code> with one backslash. In the code you must type two: <code>C:\\\\Rugby</code>. A single <code>\\R</code> is not a valid escape." }
      ],
      hint: "Inside a string: \\\" makes a quote, \\n a new line, \\t a tab and \\\\ a single backslash.",
      goal: "When it runs, your program prints a quote with speech marks, Ready and Set on two lines, a tabbed Player/Tries heading and a folder path with a backslash.",
      steps: [
        "Under <code>// TODO 1</code>, type <code>Console.WriteLine(\"The coach shouted \\\"Go for it!\\\"\");</code> and press <strong>Run</strong>.",
        "Under <code>// TODO 2</code>, write <strong>one</strong> <code>Console.WriteLine</code> whose text is <code>Ready\\nSet</code>. Run it and check the words are on two lines.",
        "Under <code>// TODO 3</code>, print <code>Player\\tTries</code> with one <code>Console.WriteLine</code>.",
        "Under <code>// TODO 4</code>, print the folder path. Type the backslash twice: <code>C:\\\\Rugby</code>.",
        "Press <strong>Run</strong>, compare each line with the instructions, then press <strong>Check</strong>."
      ],
      hints: [
        "Some characters are special inside a string. To print them, you put a backslash <code>\\</code> in front: that's an escape sequence.",
        "Use <code>\\\"</code> for a quote mark, <code>\\n</code> for a new line, <code>\\t</code> for a tab and <code>\\\\</code> for one backslash. They all go <em>inside</em> the double quotes.",
        "The first line is the trickiest: <code>Console.WriteLine(\"The coach shouted \\\"Go for it!\\\"\");</code> (an escaped quote before Go, another after the !, then the real closing quote)."
      ],
      mistakes: [
        { wrong: "Typing <code>\"Go for it!\"</code> with plain quotes inside the string.", fix: "A plain <code>\"</code> ends the string early and gives an error. Put a backslash in front: <code>\\\"</code>." },
        { wrong: "Using a forward slash: <code>/n</code> or <code>/t</code>.", fix: "Escape sequences use a <strong>back</strong>slash <code>\\</code>, the one that leans left." },
        { wrong: "Typing only one backslash in <code>C:\\Rugby</code>, which causes an error.", fix: "To show one backslash you type two: <code>C:\\\\Rugby</code>." },
        { wrong: "Using two <code>WriteLine</code>s for Ready and Set.", fix: "The task asks for one <code>WriteLine</code> with <code>\\n</code> inside: <code>\"Ready\\nSet\"</code>." }
      ]
    },
    {
      id: "m01-l3",
      title: "Comments",
      type: "code",
      learn: cs`<p>A <strong>comment</strong> is a note for humans. The computer completely ignores it. Good comments explain <em>why</em> code does something, which helps your teacher, your classmates and future you (who will have forgotten!).</p>
<h3>Single-line comments</h3>
<p>Two forward slashes <code>//</code> turn the rest of the line into a comment:</p>
<pre><code class="cs">// Print the welcome screen for the cinema app
Console.WriteLine("Welcome to the cinema!");   // shown first</code></pre>
<h3>Multi-line comments</h3>
<p>For longer notes, start with <code>/*</code> and finish with <code>*/</code>. Everything in between is ignored, however many lines it covers:</p>
<pre><code class="cs">/*
   Program: Cinema tickets
   Author:  Oisín
   Date:    September
*/</code></pre>
<h3>Commenting out code</h3>
<p>Comments are also a handy way to switch off a line without deleting it. This is called "commenting out" and it's great when you're testing:</p>
<pre><code class="cs">Console.WriteLine("Film starts at 7pm");
// Console.WriteLine("Film cancelled");   // switched off for now</code></pre>
<div class="tip">In your GCSE programming tasks, commenting your code is part of good practice. A header comment with the program's purpose, plus short comments on tricky bits, is a great habit.</div>
<div class="warn">Don't comment the obvious (<code>// print hello</code> above a line that prints hello). Explain the purpose instead.</div>`,
      instructions: [
        "Add a multi-line comment <code>/* ... */</code> at the top of <code>Main</code> describing what the program does.",
        "Add at least one <code>//</code> comment.",
        "The starter prints a line saying <code>Tickets sold out</code>. It's wrong! <strong>Comment it out</strong> so it no longer prints, but leave it in the code.",
        "Make sure the program still prints <code>Tickets available: book now!</code>"
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: add a /* multi-line */ comment here describing the program

        Console.WriteLine("Cinema booking system");
        Console.WriteLine("Tickets sold out");
        Console.WriteLine("Tickets available: book now!");
    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        /*
           Cinema booking system
           Shows whether tickets are available
        */
        Console.WriteLine("Cinema booking system");
        // Console.WriteLine("Tickets sold out");   // wrong message, switched off
        Console.WriteLine("Tickets available: book now!");
    }
}`,
      tests: [
        { type: "fn", fn: (out) => !/sold out/i.test(out), msg: "Comment out the line that prints Tickets sold out (put // in front of it).",
          help: "<code>Tickets sold out</code> is still being printed. Put <code>//</code> at the very start of that line so the computer ignores it." },
        { type: "codeRaw", pattern: "/\\*[\\s\\S]*?\\*/", msg: "Add a multi-line comment between /* and */.",
          help: "This check looks for a comment that starts with <code>/*</code> and ends with <code>*/</code>. A <code>//</code> comment doesn't count for this one. Make sure you have both the opening and the closing marks." },
        { type: "output", includes: "Cinema booking system", msg: "Still print Cinema booking system",
          help: "<code>Cinema booking system</code> must still print. You may have commented out the wrong line, or your <code>/* */</code> comment may be swallowing it. Check the <code>*/</code> comes before that line." },
        { type: "output", includes: "Tickets available: book now!", msg: "Still print Tickets available: book now!",
          help: "<code>Tickets available: book now!</code> must still print. Only the <em>sold out</em> line should be commented out; leave this one as it is." }
      ],
      hint: "Put // at the very start of the Tickets sold out line. A multi-line comment starts with /* and ends with */.",
      goal: "When it runs, your program prints <code>Cinema booking system</code> and <code>Tickets available: book now!</code> but not the sold-out line, and the code contains helpful comments.",
      steps: [
        "Find the line that says <code>// TODO: add a /* multi-line */ comment here</code>",
        "Under it, type <code>/*</code> on one line, a sentence describing the program on the next, then <code>*/</code> on the line after.",
        "Press <strong>Run</strong>. The output should not change, because comments are ignored.",
        "Find the line <code>Console.WriteLine(\"Tickets sold out\");</code> and type <code>//</code> at the very start of it.",
        "Press <strong>Run</strong>. <code>Tickets sold out</code> should have gone. Then press <strong>Check</strong>."
      ],
      hints: [
        "Comments are ignored by the computer. You can use them to explain your code and to switch a line off.",
        "A multi-line comment starts with <code>/*</code> and ends with <code>*/</code>. A single-line comment starts with <code>//</code> and lasts to the end of the line.",
        "Commented out, the wrong line looks like this: <code>// Console.WriteLine(\"Tickets sold out\");</code>"
      ],
      mistakes: [
        { wrong: "Deleting the sold-out line instead of commenting it out.", fix: "It will pass, but the task is to practise commenting out. Put <code>//</code> in front so the line stays in your code." },
        { wrong: "Forgetting the closing <code>*/</code>, so everything below becomes a comment.", fix: "If your whole program stops printing, look for a <code>/*</code> without a matching <code>*/</code>." },
        { wrong: "Using a backslash: <code>\\\\</code> instead of <code>//</code>.", fix: "Comments use <strong>forward</strong> slashes: <code>//</code> and <code>/* */</code>." }
      ]
    },
    {
      id: "m01-l4",
      title: "A neat banner",
      type: "code",
      learn: cs`<p>Programs look far more professional when the output is laid out neatly. A <strong>banner</strong> is a heading made from symbols, perfect for the title screen of a game or app.</p>
<pre><code class="cs">Console.WriteLine("****************************");
Console.WriteLine("*   ENNISKILLEN WEATHER    *");
Console.WriteLine("****************************");
Console.WriteLine();
Console.WriteLine("Today:\tRain");
Console.WriteLine("Tomorrow:\tMore rain");</code></pre>
<pre><code>****************************
*   ENNISKILLEN WEATHER    *
****************************

Today:  Rain
Tomorrow:       More rain</code></pre>
<p>Tips for neat output:</p>
<ul>
<li>Make the borders the same length as the middle line. Count the characters, or copy the line and edit it.</li>
<li>Use spaces inside the quotes to centre text.</li>
<li>Use <code>Console.WriteLine();</code> for breathing space between sections.</li>
<li>Use <code>\t</code> to line up columns, but remember a long word can push past the next tab stop (as "Tomorrow:" does above). Adding an extra <code>\t</code> to the shorter labels fixes that.</li>
</ul>
<p>This is all <strong>sequence</strong>: the lines appear in exactly the order you wrote them.</p>`,
      instructions: [
        "Print a banner for a pet shop. The top and bottom lines must both be exactly <code>==============================</code> (30 equals signs).",
        "Between them print <code>      PAWS AND CLAWS PETS</code> (a centred name is fine, as long as it contains <code>PAWS AND CLAWS PETS</code>).",
        "Print a blank line, then <code>Open:</code> followed by a tab and <code>9am to 5pm</code>"
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: top border (30 = signs)

        // TODO: shop name

        // TODO: bottom border

        // TODO: blank line, then Open:<tab>9am to 5pm

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("==============================");
        Console.WriteLine("      PAWS AND CLAWS PETS");
        Console.WriteLine("==============================");
        Console.WriteLine();
        Console.WriteLine("Open:\t9am to 5pm");
    }
}`,
      tests: [
        { type: "outputRegex", pattern: "(^|\\n)={30}\\r?\\n.*PAWS AND CLAWS PETS.*\\r?\\n={30}\\r?\\n", msg: "Print the name between two lines of exactly 30 = signs.",
          help: "This check wants a line of exactly 30 <code>=</code> signs, then the shop name, then another line of exactly 30 <code>=</code> signs. Count your equals signs (or copy them from the instructions), and make sure nothing else is on the border lines." },
        { type: "outputRegex", pattern: "={30}\\r?\\n\\r?\\nOpen:", msg: "Print a blank line after the banner, before Open:",
          help: "There must be one empty line between the bottom border and <code>Open:</code>. Add <code>Console.WriteLine();</code> after the bottom border." },
        { type: "output", includes: "Open:\t9am to 5pm", msg: "Print Open:, a tab (\\t), then 9am to 5pm.",
          help: "This check looks for <code>Open:</code>, a tab, then <code>9am to 5pm</code>. Use <code>\\t</code> straight after the colon with no spaces: <code>\"Open:\\t9am to 5pm\"</code>." }
      ],
      hint: "Copy the border line so both have exactly 30 = signs. Console.WriteLine(); gives the blank line, and \\t gives the tab.",
      goal: "When it runs, your program prints a pet shop banner with <code>PAWS AND CLAWS PETS</code> between two borders of 30 equals signs, then a blank line and the opening hours.",
      steps: [
        "Under <code>// TODO: top border</code>, type <code>Console.WriteLine(\"==============================\");</code> (copy the 30 equals signs from the instructions).",
        "Under <code>// TODO: shop name</code>, print <code>      PAWS AND CLAWS PETS</code> with a few spaces in front to centre it.",
        "Copy your top border line and paste it under <code>// TODO: bottom border</code>.",
        "Press <strong>Run</strong> and check the banner looks right.",
        "Under the last <code>// TODO</code>, add <code>Console.WriteLine();</code> then <code>Console.WriteLine(\"Open:\\t9am to 5pm\");</code>",
        "Press <strong>Run</strong>, then <strong>Check</strong>."
      ],
      hints: [
        "The banner is just three <code>WriteLine</code>s in a row. The top and bottom lines are identical.",
        "Copy and paste the border line so both have exactly 30 <code>=</code> signs. Use <code>Console.WriteLine();</code> for the blank line and <code>\\t</code> for the tab.",
        "The last two lines are <code>Console.WriteLine();</code> and <code>Console.WriteLine(\"Open:\\t9am to 5pm\");</code>"
      ],
      mistakes: [
        { wrong: "Typing 29 or 31 equals signs.", fix: "Count carefully or copy the border straight from the instructions, then paste it for the bottom line too." },
        { wrong: "Typing spaces instead of <code>\\t</code> between <code>Open:</code> and the hours.", fix: "The check wants a real tab character. Use <code>\\t</code> inside the quotes." },
        { wrong: "Forgetting the blank line, so <code>Open:</code> comes straight after the border.", fix: "Add <code>Console.WriteLine();</code> with empty brackets after the bottom border." }
      ]
    },
    {
      id: "m01-l5",
      title: "Canteen receipt",
      type: "code",
      learn: cs`<p>Let's put everything together: <code>Write</code>, <code>WriteLine</code>, blank lines, tabs and comments, to print a till receipt for the school canteen.</p>
<p>Here is Aoife's receipt from the tuck shop:</p>
<pre><code class="cs">// Header
Console.WriteLine("--- TUCK SHOP ---");
// Items: name, tab, price
Console.WriteLine("Crisps\t\t£0.60");
Console.WriteLine("Water\t\t£0.80");
Console.WriteLine("-----------------");
Console.Write("TOTAL\t\t");
Console.WriteLine("£1.40");
Console.WriteLine("Thank you!");</code></pre>
<pre><code>--- TUCK SHOP ---
Crisps          £0.60
Water           £0.80
-----------------
TOTAL           £1.40
Thank you!</code></pre>
<p>Notice:</p>
<ul>
<li>Two tabs <code>\t\t</code> push the prices into a neat column even though the item names are different lengths.</li>
<li><code>Write</code> followed by <code>WriteLine</code> builds one line from two pieces.</li>
<li>The comments break the code into sections so it's easy to follow.</li>
</ul>
<p>Right now you are typing the prices in by hand. In the next module you'll learn about <strong>variables</strong>, which let the computer store and work out values like the total for you.</p>`,
      instructions: [
        "Print a receipt. First line: <code>*** ERGS CANTEEN ***</code>",
        "Then three item lines, each name followed by <code>\\t\\t</code> and the price: <code>Pasta\\t\\t£2.50</code>, <code>Juice\\t\\t£0.90</code>, <code>Cookie\\t\\t£0.60</code>",
        "Then a line of dashes, then <code>TOTAL\\t\\t£4.00</code>",
        "Finish with a blank line followed by <code>Have a great day!</code> (keep using comments to label each section)."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // Header
        Console.WriteLine("*** ERGS CANTEEN ***");

        // TODO: the three items, using \t\t before each price

        // TODO: a line of dashes and the TOTAL line

        // TODO: blank line, then Have a great day!

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // Header
        Console.WriteLine("*** ERGS CANTEEN ***");

        // Items
        Console.WriteLine("Pasta\t\t£2.50");
        Console.WriteLine("Juice\t\t£0.90");
        Console.WriteLine("Cookie\t\t£0.60");

        // Total
        Console.WriteLine("--------------------");
        Console.WriteLine("TOTAL\t\t£4.00");

        Console.WriteLine();
        Console.WriteLine("Have a great day!");
    }
}`,
      tests: [
        { type: "output", includes: "*** ERGS CANTEEN ***", msg: "Start with *** ERGS CANTEEN ***",
          help: "The header line <code>*** ERGS CANTEEN ***</code> is already in the starter. Make sure you haven't deleted or changed it." },
        { type: "codeRaw", pattern: "//.*\\S", msg: "Add at least one // comment to explain your code.",
          help: "This check looks for at least one <code>//</code> comment with some words after it. Add a label such as <code>// Items</code> above a section of your code." },
        { type: "outputRegex", pattern: "Pasta\\t\\t£2\\.50[\\s\\S]*Juice\\t\\t£0\\.90[\\s\\S]*Cookie\\t\\t£0\\.60", msg: "Print the three items in order, each with two tabs before the price.",
          help: "Each item needs its name, then exactly two tabs <code>\\t\\t</code>, then the price, in the order Pasta, Juice, Cookie. Check you haven't used spaces instead of <code>\\t</code>, and that the prices are typed exactly (e.g. <code>£0.90</code>)." },
        { type: "outputRegex", pattern: "-{3,}[\\s\\S]*TOTAL\\t\\t£4\\.00", msg: "Print a line of dashes and then TOTAL\\t\\t£4.00",
          help: "After the items, print a line of dashes (at least three <code>-</code>), then <code>TOTAL\\t\\t£4.00</code> with two tabs before the price." },
        { type: "outputRegex", pattern: "£4\\.00\\r?\\n\\r?\\nHave a great day!", msg: "Print a blank line, then Have a great day!",
          help: "There must be one empty line between the TOTAL line and <code>Have a great day!</code>. Add <code>Console.WriteLine();</code> between them and check the spelling of the last message." }
      ],
      hint: "Each item is one WriteLine, e.g. Console.WriteLine(\"Pasta\\t\\t£2.50\"); The £ sign can go straight inside the quotes.",
      goal: "When it runs, your program prints a neat canteen receipt: a header, three items with prices lined up, a dashed line, the total, a blank line and a goodbye message.",
      steps: [
        "Press <strong>Run</strong> to see the header that's already there.",
        "Under <code>// TODO: the three items</code>, type <code>Console.WriteLine(\"Pasta\\t\\t£2.50\");</code> and press <strong>Run</strong>.",
        "Add two more lines in the same pattern for <code>Juice</code> (£0.90) and <code>Cookie</code> (£0.60).",
        "Under the next <code>// TODO</code>, print a line of dashes, e.g. <code>\"--------------------\"</code>, then <code>\"TOTAL\\t\\t£4.00\"</code>.",
        "Under the last <code>// TODO</code>, add <code>Console.WriteLine();</code> and then print <code>Have a great day!</code>",
        "Make sure you still have at least one <code>//</code> comment, press <strong>Run</strong>, then <strong>Check</strong>."
      ],
      hints: [
        "Every line on the receipt is one <code>Console.WriteLine</code>. The tabs keep the prices in a neat column.",
        "Put <code>\\t\\t</code> (two tabs) between each item name and its price, inside the quotes. Use an empty <code>Console.WriteLine();</code> for the blank line.",
        "The item lines look like this: <code>Console.WriteLine(\"Juice\\t\\t£0.90\");</code>"
      ],
      mistakes: [
        { wrong: "Using one tab <code>\\t</code> instead of two.", fix: "The check wants exactly two tabs before every price: <code>\\t\\t</code>." },
        { wrong: "Typing the price wrong, e.g. <code>£0.9</code> instead of <code>£0.90</code>.", fix: "Copy the prices exactly from the instructions, including the trailing zero." },
        { wrong: "Deleting all the <code>//</code> comments when you replace the TODOs.", fix: "Keep or add at least one comment, like <code>// Items</code> or <code>// Total</code>." },
        { wrong: "Missing the blank line before <code>Have a great day!</code>", fix: "Add <code>Console.WriteLine();</code> straight after the TOTAL line." }
      ]
    },
    {
      id: "m01-l6",
      title: "ASCII art",
      type: "code",
      learn: cs`<p><strong>ASCII art</strong> is pictures made from keyboard characters. It was everywhere in early computer games, and it's a fun way to practise precise output.</p>
<pre><code class="cs">Console.WriteLine(" /\\_/\\ ");
Console.WriteLine("( o.o )");
Console.WriteLine(" > ^ < ");</code></pre>
<pre><code> /\_/\
( o.o )
 > ^ < </code></pre>
<p>The tricky part is the <strong>backslash</strong>. Because <code>\</code> starts an escape sequence, you must type <code>\\</code> every time you want one backslash to appear. Look carefully: the code above has <code>/\\_/\\</code> but prints <code>/\_/\</code>.</p>
<h3>Verbatim strings</h3>
<p>If your art has lots of backslashes, C# offers a shortcut: put <code>@</code> in front of the string. This makes a <strong>verbatim string</strong> where backslashes are just ordinary characters:</p>
<pre><code class="cs">Console.WriteLine(@" /\_/\ ");</code></pre>
<p>Both ways print the same thing. Use whichever you find easier.</p>
<div class="tip">Leading spaces matter! The spaces at the start of a line are what shift parts of the picture to the right.</div>`,
      instructions: [
        "Print this rocket, one line per <code>WriteLine</code>, exactly as shown (watch the backslashes):",
        "<pre><code>   /\\\n  /  \\\n |ERGS|\n |    |\n /_||_\\</code></pre>",
        "Then print <code>3... 2... 1... Lift off!</code>"
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // Remember: to show one \ you type \\ (or use an @ verbatim string)
        Console.WriteLine("   /\\");
        // TODO: the other four lines of the rocket

        // TODO: 3... 2... 1... Lift off!

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("   /\\");
        Console.WriteLine("  /  \\");
        Console.WriteLine(" |ERGS|");
        Console.WriteLine(" |    |");
        Console.WriteLine(" /_||_\\");
        Console.WriteLine("3... 2... 1... Lift off!");
    }
}`,
      tests: [
        { type: "output", includes: "   /\\\n  /  \\\n |ERGS|\n |    |\n /_||_\\\n", caseSensitive: true, msg: "Print all five rocket lines exactly as shown, including the spaces and backslashes.",
          help: "This check compares your rocket character by character, including the spaces at the start of each line and the backslashes. Count the leading spaces (3, 2, 1, 1, 1) and remember each backslash is typed <code>\\\\</code> in normal strings. Make sure there are no extra spaces at the end of a line." },
        { type: "output", includes: "3... 2... 1... Lift off!", msg: "Print 3... 2... 1... Lift off!",
          help: "This check looks for <code>3... 2... 1... Lift off!</code>: three dots after each number and a space before the next one. Check your last <code>Console.WriteLine</code>." }
      ],
      hint: "Line 2 is Console.WriteLine(\"  /  \\\\\"); (two spaces, slash, two spaces, backslash). The last line ends with \\\\ too.",
      goal: "When it runs, your program draws a five-line ERGS rocket from keyboard characters and then prints <code>3... 2... 1... Lift off!</code>",
      steps: [
        "Press <strong>Run</strong> to see the tip of the rocket that's already there.",
        "Under <code>// TODO: the other four lines</code>, add <code>Console.WriteLine(\"  /  \\\\\");</code> (two spaces, slash, two spaces, two backslashes).",
        "Add <code>Console.WriteLine(\" |ERGS|\");</code> and <code>Console.WriteLine(\" |    |\");</code> (one space at the start of each, four spaces in the middle of the second).",
        "Add the base: one space, then <code>/_||_</code>, then a backslash typed as <code>\\\\</code>.",
        "Press <strong>Run</strong> and compare your rocket with the picture in the instructions.",
        "Under the last <code>// TODO</code>, print <code>3... 2... 1... Lift off!</code>, then press <strong>Check</strong>."
      ],
      hints: [
        "Each line of the picture is one <code>Console.WriteLine</code>. The spaces at the start of each line matter.",
        "A backslash starts an escape sequence, so to show one <code>\\</code> you type <code>\\\\</code>. Or put <code>@</code> before the string and type it normally.",
        "The last rocket line is <code>Console.WriteLine(\" /_||_\\\\\");</code>"
      ],
      mistakes: [
        { wrong: "Typing a single backslash at the end of a string: <code>\"  /  \\\"</code>", fix: "A lone <code>\\</code> before the closing quote escapes the quote and breaks the string. Type <code>\\\\</code>." },
        { wrong: "Getting the number of leading spaces wrong, so the rocket is lopsided.", fix: "Line 1 has 3 spaces before <code>/</code>, line 2 has 2, and lines 3 to 5 have 1." },
        { wrong: "Adding extra spaces at the end of a line.", fix: "The check is exact. Delete any spaces after the last visible character, just before the closing quote." }
      ]
    },
    {
      id: "m01-quiz",
      title: "Checkpoint: output and comments",
      type: "quiz",
      questions: [
        { q: "What is the difference between Console.Write and Console.WriteLine?", options: ["Write is faster", "WriteLine moves to a new line after printing; Write stays on the same line", "Write prints numbers, WriteLine prints text", "There is no difference"], answer: 1, explain: "WriteLine adds a new line at the end; Write leaves the cursor where it is." },
        { q: "Which escape sequence prints a tab?", options: ["\\n", "\\t", "\\\\", "\\\""], answer: 1, explain: "\\t is a tab, \\n is a new line." },
        { q: "What does Console.WriteLine(\"A\\nB\"); print?", options: ["A\\nB", "AB", "A and B on separate lines", "A, a tab, then B"], answer: 2, explain: "\\n is a new line, so B appears on the line below A." },
        { q: "How do you print a double quote inside a string?", options: ["\"\"", "\\\"", "/\"", "'\"'"], answer: 1, explain: "A backslash before the quote escapes it, so it's printed instead of ending the string." },
        { q: "What happens to comments when the program runs?", options: ["They are printed", "They are ignored by the computer", "They cause an error", "They run first"], answer: 1, explain: "Comments are notes for humans; the compiler ignores them." },
        { q: "Which of these is a correct multi-line comment?", options: ["// ... //", "<!-- ... -->", "/* ... */", "# ... #"], answer: 2, explain: "In C#, multi-line comments start with /* and end with */." },
        { q: "What does Console.WriteLine(); with nothing in the brackets do?", options: ["Causes a syntax error", "Prints the word null", "Prints a blank line", "Clears the screen"], answer: 2, explain: "It just ends the current line, giving an empty line." }
      ]
    }
  ]
});
})();
