// Module 4: Operators and maths
(function () {
const cs = String.raw;

COURSE.addModule({
  id: "m04",
  title: "Operators and maths",
  icon: "calc",
  summary: "Do calculations with arithmetic operators, integer division and modulus, Math methods, comparisons, logic and random numbers.",
  lessons: [
    {
      id: "m04-l1",
      title: "Arithmetic operators",
      type: "code",
      learn: cs`<p>Computers are brilliant at maths. C# uses these <strong>arithmetic operators</strong>:</p>
<table>
<tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr>
<tr><td><code>+</code></td><td>add</td><td><code>7 + 2</code></td><td><code>9</code></td></tr>
<tr><td><code>-</code></td><td>subtract</td><td><code>7 - 2</code></td><td><code>5</code></td></tr>
<tr><td><code>*</code></td><td>multiply</td><td><code>7 * 2</code></td><td><code>14</code></td></tr>
<tr><td><code>/</code></td><td>divide</td><td><code>7.0 / 2</code></td><td><code>3.5</code></td></tr>
</table>
<p>You can use them with numbers, variables, or a mix, and store the answer in another variable:</p>
<pre><code class="cs">int homeScore = 24;
int awayScore = 17;
int difference = homeScore - awayScore;
int totalPoints = homeScore + awayScore;
Console.WriteLine($"Won by {difference} points");
Console.WriteLine($"{totalPoints} points scored in the match");</code></pre>
<pre><code>Won by 7 points
41 points scored in the match</code></pre>
<h3>BIDMAS</h3>
<p>C# follows the same order of operations as maths class: <strong>B</strong>rackets first, then <strong>D</strong>ivision and <strong>M</strong>ultiplication, then <strong>A</strong>ddition and <strong>S</strong>ubtraction (working left to right).</p>
<pre><code class="cs">Console.WriteLine(2 + 3 * 4);     // 14, not 20
Console.WriteLine((2 + 3) * 4);   // 20</code></pre>
<p>Getting the order wrong is a classic <strong>logic error</strong>. To find the average of two test marks you need brackets:</p>
<pre><code class="cs">double avg = (65 + 80) / 2.0;   // 72.5 ✓
double oops = 65 + 80 / 2.0;    // 105 ✗</code></pre>
<div class="tip">If you're not sure what happens first, add brackets. They never hurt and they make your intention clear.</div>`,
      instructions: [
        "Rugby scoring: a try is 5 points, a conversion 2, a penalty 3. The starter has the stats for Enniskillen's match.",
        "Calculate <code>points</code> = tries × 5 + conversions × 2 + penalties × 3 and print <code>Enniskillen scored 29 points</code> (using the variable).",
        "The opposition scored 22. Print <code>Winning margin: 7</code> by subtracting.",
        "Aoife's two test marks were 65 and 80. Using brackets, calculate their average as a <code>double</code> and print <code>Average mark: 72.5</code>"
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        int tries = 4;
        int conversions = 3;
        int penalties = 1;
        int opposition = 22;

        // TODO: calculate points and print Enniskillen scored ... points

        // TODO: print Winning margin: ...

        // TODO: average of 65 and 80 (use brackets!), print Average mark: ...

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        int tries = 4;
        int conversions = 3;
        int penalties = 1;
        int opposition = 22;

        int points = tries * 5 + conversions * 2 + penalties * 3;
        Console.WriteLine($"Enniskillen scored {points} points");
        Console.WriteLine($"Winning margin: {points - opposition}");

        double average = (65 + 80) / 2.0;
        Console.WriteLine($"Average mark: {average}");
    }
}`,
      tests: [
        { type: "output", includes: "Enniskillen scored 29 points", msg: "Print Enniskillen scored 29 points",
          help: "Your output needs <code>Enniskillen scored 29 points</code>. Check your calculation is <code>tries * 5 + conversions * 2 + penalties * 3</code> and that the sentence wording matches exactly." },
        { type: "output", includes: "Winning margin: 7", msg: "Print Winning margin: 7",
          help: "Your output needs <code>Winning margin: 7</code>. Subtract the opposition's score from yours: <code>points - opposition</code>." },
        { type: "output", includes: "Average mark: 72.5", msg: "Print Average mark: 72.5 (brackets first, and divide by 2.0).",
          help: "Your output needs <code>Average mark: 72.5</code>. If you got 105, you forgot the brackets; if you got 72, you divided by <code>2</code> instead of <code>2.0</code>. Use <code>(65 + 80) / 2.0</code>." },
        { type: "code", pattern: "tries\\s*\\*\\s*5", msg: "Calculate the points from the variables (tries * 5 ...).",
          help: "This check looks for <code>tries * 5</code> in your code. Use the variables in your calculation rather than working the numbers out yourself." },
        { type: "codeNot", pattern: "\"[^\"]*\\b29\\b[^\"]*\"", msg: "Don't type 29 into the text: calculate it.",
          help: "This check fails if the number <code>29</code> is typed inside quotes. Print the <code>points</code> variable instead, e.g. <code>$\"Enniskillen scored {points} points\"</code>." }
      ],
      hint: "int points = tries * 5 + conversions * 2 + penalties * 3; For the average, (65 + 80) / 2.0 — the .0 makes it a double.",
      goal: "When it runs, your program works out and prints Enniskillen's rugby score (29), the winning margin (7) and Aoife's average test mark (72.5).",
      steps: [
        "Under the first <code>// TODO</code>, type <code>int points = tries * 5 + conversions * 2 + penalties * 3;</code>",
        "Print it with <code>Console.WriteLine($\"Enniskillen scored {points} points\");</code> and press <strong>Run</strong>. You should see 29.",
        "Under the second <code>// TODO</code>, print <code>Winning margin: </code> followed by <code>{points - opposition}</code>.",
        "Under the last <code>// TODO</code>, type <code>double average = (65 + 80) / 2.0;</code>",
        "Print <code>Average mark: {average}</code>, press <strong>Run</strong> and check you get 72.5. Then press <strong>Check</strong>."
      ],
      hints: [
        "Store each answer in a variable, then print the variable in your sentence. Remember BIDMAS: multiplication happens before addition.",
        "Use <code>*</code> to multiply each stat by its points value and <code>+</code> to add them. For the average, brackets make the adding happen before the dividing.",
        "The average line is <code>double average = (65 + 80) / 2.0;</code> (the <code>.0</code> keeps the .5)."
      ],
      mistakes: [
        { wrong: "Writing <code>65 + 80 / 2.0</code> without brackets, which gives 105.", fix: "Division happens first. Put brackets round the addition: <code>(65 + 80) / 2.0</code>." },
        { wrong: "Dividing by <code>2</code> instead of <code>2.0</code>, which gives 72.", fix: "Two <code>int</code>s divide to an <code>int</code>. Use <code>2.0</code> to get 72.5." },
        { wrong: "Typing the answer into the text: <code>\"Enniskillen scored 29 points\"</code>", fix: "Let the program calculate it and print <code>{points}</code>." },
        { wrong: "Subtracting the wrong way round, giving <code>-7</code>.", fix: "Your score comes first: <code>points - opposition</code>." }
      ]
    },
    {
      id: "m04-l2",
      title: "Integer division and modulus",
      type: "code",
      learn: cs`<p>When <strong>both</strong> numbers are <code>int</code>s, <code>/</code> does <strong>integer division</strong>: it gives the whole-number part and throws the rest away.</p>
<pre><code class="cs">Console.WriteLine(17 / 5);     // 3
Console.WriteLine(17.0 / 5);   // 3.4</code></pre>
<p>The <strong>modulus</strong> operator <code>%</code> gives you the bit that was thrown away: the <strong>remainder</strong>.</p>
<pre><code class="cs">Console.WriteLine(17 % 5);   // 2  (17 = 3 × 5 + 2)</code></pre>
<p>Together they are incredibly useful. In the exam, integer division is sometimes written <code>DIV</code> and modulus <code>MOD</code>.</p>
<h3>Minutes into hours and minutes</h3>
<pre><code class="cs">int totalMinutes = 135;
int hours = totalMinutes / 60;     // 2
int minutes = totalMinutes % 60;   // 15
Console.WriteLine($"{hours}h {minutes}m");   // 2h 15m</code></pre>
<h3>Odd or even?</h3>
<p>A number is even if dividing by 2 leaves no remainder: <code>n % 2</code> is <code>0</code> for even numbers and <code>1</code> for odd ones.</p>
<pre><code class="cs">Console.WriteLine(14 % 2);   // 0 → even
Console.WriteLine(7 % 2);    // 1 → odd</code></pre>
<h3>Sharing out</h3>
<p>Ciarán has 23 sweets to share between 4 friends: each gets <code>23 / 4</code> = 5, with <code>23 % 4</code> = 3 left over.</p>
<div class="warn">Dividing an int by zero, e.g. <code>10 / 0</code>, crashes with a <code>DivideByZeroException</code>: a run-time error.</div>`,
      instructions: [
        "Prompt <code>Film length in minutes: </code> and read an int <code>length</code>.",
        "Print <code>That is Hh Mm</code> using <code>/</code> and <code>%</code>. For 135: <code>That is 2h 15m</code>",
        "Print <code>Remainder when divided by 2: R</code> using <code>% 2</code> (so 0 means even, 1 means odd)."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        Console.Write("Film length in minutes: ");
        int length = int.Parse(Console.ReadLine());

        // TODO: hours and minutes using / and %

        // TODO: print That is ...h ...m

        // TODO: print Remainder when divided by 2: ...

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        Console.Write("Film length in minutes: ");
        int length = int.Parse(Console.ReadLine());

        int hours = length / 60;
        int minutes = length % 60;

        Console.WriteLine($"That is {hours}h {minutes}m");
        Console.WriteLine($"Remainder when divided by 2: {length % 2}");
    }
}`,
      stdin: ["135"],
      tests: [
        { type: "output", stdin: ["135"], includes: "That is 2h 15m", msg: "For 135, print That is 2h 15m",
          help: "When the input is <code>135</code>, your program should print <code>That is 2h 15m</code>. Use <code>length / 60</code> for hours and <code>length % 60</code> for minutes, with <code>h</code> and <code>m</code> straight after each number." },
        { type: "output", stdin: ["95"], includes: "That is 1h 35m", msg: "For 95, print That is 1h 35m",
          help: "When the input is <code>95</code>, your program should print <code>That is 1h 35m</code>. If it still shows 2h 15m, you've typed the numbers in instead of using your <code>hours</code> and <code>minutes</code> variables." },
        { type: "output", stdin: ["135"], includes: "Remainder when divided by 2: 1", msg: "For 135, print Remainder when divided by 2: 1",
          help: "When the input is <code>135</code> (an odd number), your program should print <code>Remainder when divided by 2: 1</code>. Use <code>{length % 2}</code>." },
        { type: "output", stdin: ["120"], includes: "Remainder when divided by 2: 0", msg: "For 120, print Remainder when divided by 2: 0",
          help: "When the input is <code>120</code> (an even number), the remainder should be <code>0</code>. Make sure you calculate <code>length % 2</code> rather than typing a number." },
        { type: "code", pattern: "%\\s*60", msg: "Use % 60 to find the leftover minutes.",
          help: "This check looks for <code>% 60</code> in your code. The leftover minutes are the remainder after dividing by 60: <code>length % 60</code>." }
      ],
      hint: "length / 60 gives whole hours; length % 60 gives the minutes left over.",
      goal: "When it runs, your program asks for a film's length in minutes, then shows it in hours and minutes and says what the remainder is when it's divided by 2.",
      steps: [
        "Press <strong>Run</strong> and type <code>135</code> to see that the input part already works.",
        "Under <code>// TODO: hours and minutes</code>, type <code>int hours = length / 60;</code>",
        "On the next line type <code>int minutes = length % 60;</code>",
        "Under the next <code>// TODO</code>, print <code>$\"That is {hours}h {minutes}m\"</code>. Run it with 135 and check you see <code>2h 15m</code>.",
        "Under the last <code>// TODO</code>, print <code>Remainder when divided by 2: </code> followed by <code>{length % 2}</code>.",
        "Press <strong>Run</strong> and test with <code>95</code> and <code>120</code>, then press <strong>Check</strong>."
      ],
      hints: [
        "Dividing two <code>int</code>s gives a whole number answer. The modulus operator <code>%</code> gives you the remainder that was left over.",
        "Hours are the minutes divided by 60 using <code>/</code>. The leftover minutes are the remainder, using <code>% 60</code>. Odd or even uses <code>% 2</code>.",
        "The two calculation lines are <code>int hours = length / 60;</code> and <code>int minutes = length % 60;</code>"
      ],
      mistakes: [
        { wrong: "Using <code>/</code> for the minutes too, which gives the hours again.", fix: "Use <code>%</code> (modulus) to get what's left over: <code>length % 60</code>." },
        { wrong: "Dividing by <code>60.0</code>, so the hours come out as 2.25.", fix: "Keep both as <code>int</code>s, <code>length / 60</code>, so the decimal part is dropped." },
        { wrong: "Adding spaces, e.g. <code>2 h 15 m</code>.", fix: "The letter goes straight after the number: <code>{hours}h {minutes}m</code>." }
      ]
    },
    {
      id: "m04-l3",
      title: "Shortcut operators",
      type: "code",
      learn: cs`<p>Programs constantly update variables: adding to a score, taking away a life, counting visitors. You could write:</p>
<pre><code class="cs">score = score + 10;</code></pre>
<p>That means "work out <code>score + 10</code>, then store the answer back in <code>score</code>". Because this is so common, C# has <strong>compound assignment</strong> shortcuts:</p>
<table>
<tr><th>Shortcut</th><th>Same as</th></tr>
<tr><td><code>score += 10;</code></td><td><code>score = score + 10;</code></td></tr>
<tr><td><code>lives -= 1;</code></td><td><code>lives = lives - 1;</code></td></tr>
<tr><td><code>coins *= 2;</code></td><td><code>coins = coins * 2;</code></td></tr>
<tr><td><code>slices /= 2;</code></td><td><code>slices = slices / 2;</code></td></tr>
<tr><td><code>n %= 3;</code></td><td><code>n = n % 3;</code></td></tr>
</table>
<h3>Increment and decrement</h3>
<p>Adding or taking away exactly 1 is even more common (especially in loops, coming soon), so there's an even shorter version:</p>
<pre><code class="cs">int visitors = 0;
visitors++;   // now 1  (increment)
visitors++;   // now 2
visitors--;   // now 1  (decrement)</code></pre>
<p><code>+=</code> also works on strings, to add text to the end:</p>
<pre><code class="cs">string order = "Chips";
order += " and beans";   // "Chips and beans"</code></pre>
<p>Here's a quick game where a player's stats change:</p>
<pre><code class="cs">int lives = 3;
int score = 0;
score += 50;     // collect a gem
lives--;         // hit by a zombie
score *= 2;      // double points power-up
Console.WriteLine($"Lives: {lives}, Score: {score}");   // Lives: 2, Score: 100</code></pre>`,
      instructions: [
        "The starter has a game character with <code>lives = 3</code> and <code>coins = 10</code>. Using only shortcut operators, make these happen in order:",
        "Collect 15 coins (<code>+=</code>), then a power-up doubles the coins (<code>*=</code>), then lose a life (<code>--</code>), then find an extra life (<code>++</code>), then lose a life (<code>--</code>), then spend 20 coins (<code>-=</code>).",
        "Print <code>Lives: 2</code> and <code>Coins: 30</code> using the variables."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        int lives = 3;
        int coins = 10;

        // TODO: collect 15 coins

        // TODO: double the coins

        // TODO: lose a life, gain a life, lose a life

        // TODO: spend 20 coins

        Console.WriteLine($"Lives: {lives}");
        Console.WriteLine($"Coins: {coins}");
    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        int lives = 3;
        int coins = 10;

        coins += 15;
        coins *= 2;
        lives--;
        lives++;
        lives--;
        coins -= 20;

        Console.WriteLine($"Lives: {lives}");
        Console.WriteLine($"Coins: {coins}");
    }
}`,
      tests: [
        { type: "output", includes: "Lives: 2", msg: "Print Lives: 2",
          help: "Your output needs <code>Lives: 2</code>. Starting from 3, you should lose one, gain one, then lose one: <code>lives--;</code>, <code>lives++;</code>, <code>lives--;</code>." },
        { type: "output", includes: "Coins: 30", msg: "Print Coins: 30 ((10 + 15) × 2 − 20).",
          help: "Your output needs <code>Coins: 30</code>. The order matters: add 15 first, then double, then take away 20. If you got 10 or 40, check the order of your coin lines." },
        { type: "code", pattern: "coins\\s*\\+=\\s*15", msg: "Use coins += 15",
          help: "This check looks for <code>coins += 15</code>. Writing <code>coins = coins + 15</code> works but doesn't practise the shortcut." },
        { type: "code", pattern: "coins\\s*\\*=\\s*2", msg: "Use coins *= 2",
          help: "This check looks for <code>coins *= 2</code> to double the coins." },
        { type: "code", pattern: "lives\\s*\\+\\+", msg: "Use lives++ for the extra life.",
          help: "This check looks for <code>lives++</code>, which adds exactly 1 to lives." },
        { type: "code", pattern: "lives\\s*--", msg: "Use lives-- to lose a life.",
          help: "This check looks for <code>lives--</code>, which takes exactly 1 away from lives." }
      ],
      hint: "coins += 15; coins *= 2; lives--; lives++; lives--; coins -= 20;",
      goal: "When it runs, your program updates a game character's lives and coins with shortcut operators and prints <code>Lives: 2</code> and <code>Coins: 30</code>.",
      steps: [
        "Press <strong>Run</strong> to see the starting values: <code>Lives: 3</code> and <code>Coins: 10</code>.",
        "Under <code>// TODO: collect 15 coins</code>, type <code>coins += 15;</code>",
        "Under <code>// TODO: double the coins</code>, type <code>coins *= 2;</code> and press <strong>Run</strong>. Coins should now be 50.",
        "Under the lives <code>// TODO</code>, type <code>lives--;</code>, <code>lives++;</code> and <code>lives--;</code> on three lines.",
        "Under <code>// TODO: spend 20 coins</code>, type <code>coins -= 20;</code>",
        "Press <strong>Run</strong>, check you see <code>Lives: 2</code> and <code>Coins: 30</code>, then press <strong>Check</strong>."
      ],
      hints: [
        "Each event in the game changes a variable. Shortcut operators update a variable using its own current value.",
        "Use <code>+=</code> to add, <code>*=</code> to multiply, <code>-=</code> to subtract, and <code>++</code> / <code>--</code> to add or take away exactly 1. Do them in the order given.",
        "The coin lines are <code>coins += 15;</code>, <code>coins *= 2;</code> and later <code>coins -= 20;</code>"
      ],
      mistakes: [
        { wrong: "Doing the coin steps in the wrong order, e.g. doubling before adding 15.", fix: "Follow the order in the instructions: +15, then ×2, then −20. That gives 30." },
        { wrong: "Writing <code>coins =+ 15;</code> with the symbols swapped.", fix: "The operator comes before the equals: <code>+=</code>. <code>=+ 15</code> just sets coins to 15." },
        { wrong: "Writing <code>int lives--;</code> or re-declaring a variable.", fix: "The variables already exist. Just write <code>lives--;</code>" },
        { wrong: "Moving or deleting the two <code>WriteLine</code> lines at the bottom.", fix: "Keep the print lines at the end so they show the final values." }
      ]
    },
    {
      id: "m04-l4",
      title: "The Math class",
      type: "code",
      learn: cs`<p>C# has a built-in <code>Math</code> class packed with useful maths tools. You use them by writing <code>Math.</code> followed by the method name:</p>
<table>
<tr><th>Method</th><th>Does</th><th>Example</th><th>Result</th></tr>
<tr><td><code>Math.Pow(x, y)</code></td><td>x to the power y</td><td><code>Math.Pow(2, 3)</code></td><td><code>8</code></td></tr>
<tr><td><code>Math.Sqrt(x)</code></td><td>square root</td><td><code>Math.Sqrt(81)</code></td><td><code>9</code></td></tr>
<tr><td><code>Math.Round(x, n)</code></td><td>round to n decimal places</td><td><code>Math.Round(3.14159, 2)</code></td><td><code>3.14</code></td></tr>
<tr><td><code>Math.Max(a, b)</code></td><td>the bigger of two</td><td><code>Math.Max(12, 30)</code></td><td><code>30</code></td></tr>
<tr><td><code>Math.Min(a, b)</code></td><td>the smaller of two</td><td><code>Math.Min(12, 30)</code></td><td><code>12</code></td></tr>
<tr><td><code>Math.PI</code></td><td>π</td><td><code>Math.PI</code></td><td><code>3.14159…</code></td></tr>
</table>
<p><code>Math.Pow</code>, <code>Math.Sqrt</code> and <code>Math.Round</code> give back a <code>double</code>, so store the result in a <code>double</code> (or cast it).</p>
<pre><code class="cs">double side = 4;
double area = Math.Pow(side, 2);          // 16
double radius = 3;
double circle = Math.PI * radius * radius;
Console.WriteLine(Math.Round(circle, 1)); // 28.3
Console.WriteLine(Math.Max(18, 25));      // 25</code></pre>
<div class="warn"><code>Math.Round</code> with no second number uses "banker's rounding": a number exactly halfway goes to the nearest <em>even</em> number. <code>Math.Round(2.5)</code> is <code>2</code> and <code>Math.Round(3.5)</code> is <code>4</code>! Most of the time you'll use <code>Math.Round(x, 2)</code> or a format like <code>:F2</code>.</div>
<div class="key"><strong>Rounding vs truncating</strong> <code>Math.Round(7.8)</code> gives 8 (nearest), but <code>(int)7.8</code> gives 7 (just chops).</div>`,
      instructions: [
        "A square trampoline has sides of <code>3.5</code> metres. Using <code>Math.Pow</code>, print <code>Area: 12.25</code>",
        "Using <code>Math.Sqrt</code>, print <code>Square root of 144: 12</code>",
        "Grace's two long jumps were <code>4.27</code> and <code>4.31</code> metres. Using <code>Math.Max</code>, print <code>Best jump: 4.31</code>",
        "Using <code>Math.Round</code> to 2 decimal places, print the area of a circle with radius 2: <code>Circle area: 12.57</code>"
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        double side = 3.5;
        double jump1 = 4.27;
        double jump2 = 4.31;
        double radius = 2;

        // TODO: Area: ... using Math.Pow

        // TODO: Square root of 144: ... using Math.Sqrt

        // TODO: Best jump: ... using Math.Max

        // TODO: Circle area: ... using Math.PI and Math.Round(..., 2)

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        double side = 3.5;
        double jump1 = 4.27;
        double jump2 = 4.31;
        double radius = 2;

        Console.WriteLine($"Area: {Math.Pow(side, 2)}");
        Console.WriteLine($"Square root of 144: {Math.Sqrt(144)}");
        Console.WriteLine($"Best jump: {Math.Max(jump1, jump2)}");

        double circle = Math.PI * radius * radius;
        Console.WriteLine($"Circle area: {Math.Round(circle, 2)}");
    }
}`,
      tests: [
        { type: "output", includes: "Area: 12.25", msg: "Print Area: 12.25",
          help: "Your output needs <code>Area: 12.25</code>. Square the side with <code>Math.Pow(side, 2)</code> (side to the power 2), not <code>Math.Pow(side, 3)</code> or <code>side * 2</code>." },
        { type: "output", includes: "Square root of 144: 12", msg: "Print Square root of 144: 12",
          help: "Your output needs <code>Square root of 144: 12</code>. Use <code>{Math.Sqrt(144)}</code> inside your message." },
        { type: "output", includes: "Best jump: 4.31", msg: "Print Best jump: 4.31",
          help: "Your output needs <code>Best jump: 4.31</code>. <code>Math.Max(jump1, jump2)</code> picks the bigger one. If you got 4.27, you used <code>Math.Min</code>." },
        { type: "output", includes: "Circle area: 12.57", msg: "Print Circle area: 12.57",
          help: "Your output needs <code>Circle area: 12.57</code>. Work out <code>Math.PI * radius * radius</code>, then round it with <code>Math.Round(..., 2)</code>. If you see lots of decimal places, the rounding is missing." },
        { type: "code", pattern: "Math\\.Pow\\s*\\(", msg: "Use Math.Pow for the area.",
          help: "This check looks for <code>Math.Pow(</code> in your code. Use it for the area rather than <code>side * side</code>." },
        { type: "code", pattern: "Math\\.Sqrt\\s*\\(", msg: "Use Math.Sqrt.",
          help: "This check looks for <code>Math.Sqrt(</code> in your code. Typing 12 yourself won't pass." },
        { type: "code", pattern: "Math\\.Max\\s*\\(", msg: "Use Math.Max for the best jump.",
          help: "This check looks for <code>Math.Max(</code> in your code. Give it both jump variables." },
        { type: "code", pattern: "Math\\.Round\\s*\\(", msg: "Use Math.Round for the circle area.",
          help: "This check looks for <code>Math.Round(</code> in your code. Using <code>:F2</code> instead won't pass this one." }
      ],
      hint: "Math.Pow(side, 2), Math.Sqrt(144), Math.Max(jump1, jump2), Math.Round(Math.PI * radius * radius, 2)",
      goal: "When it runs, your program uses the Math class to print a trampoline's area, the square root of 144, Grace's best jump and a circle's area rounded to 2 places.",
      steps: [
        "Under the first <code>// TODO</code>, type <code>Console.WriteLine($\"Area: {Math.Pow(side, 2)}\");</code> and press <strong>Run</strong>.",
        "Under the second <code>// TODO</code>, print <code>Square root of 144: </code> followed by <code>{Math.Sqrt(144)}</code>.",
        "Under the third <code>// TODO</code>, print <code>Best jump: </code> followed by <code>{Math.Max(jump1, jump2)}</code>.",
        "Under the last <code>// TODO</code>, type <code>double circle = Math.PI * radius * radius;</code>",
        "Print <code>Circle area: </code> followed by <code>{Math.Round(circle, 2)}</code>.",
        "Press <strong>Run</strong>, compare all four lines with the instructions, then press <strong>Check</strong>."
      ],
      hints: [
        "Each line uses a different tool from the <code>Math</code> class. You can put the call straight inside the interpolation braces.",
        "<code>Math.Pow(x, 2)</code> squares, <code>Math.Sqrt(x)</code> finds the square root, <code>Math.Max(a, b)</code> picks the bigger, and <code>Math.Round(x, 2)</code> rounds to 2 places.",
        "For the circle: <code>double circle = Math.PI * radius * radius;</code> then <code>Console.WriteLine($\"Circle area: {Math.Round(circle, 2)}\");</code>"
      ],
      mistakes: [
        { wrong: "Writing <code>math.pow</code> or <code>Math.pow</code>.", fix: "C# is case sensitive: <code>Math.Pow</code>, <code>Math.Sqrt</code>, <code>Math.Max</code>, <code>Math.Round</code>, <code>Math.PI</code>." },
        { wrong: "Using <code>side ^ 2</code> to square a number.", fix: "In C#, <code>^</code> isn't 'to the power'. Use <code>Math.Pow(side, 2)</code>." },
        { wrong: "Forgetting the second number in <code>Math.Round(circle)</code>, which gives 13.", fix: "Add how many decimal places you want: <code>Math.Round(circle, 2)</code>." },
        { wrong: "Storing the result of <code>Math.Pow</code> in an <code>int</code>.", fix: "Pow, Sqrt and Round give back a <code>double</code>. Use a <code>double</code> variable or print it directly." }
      ]
    },
    {
      id: "m04-l5",
      title: "Comparison and logical operators",
      type: "code",
      learn: cs`<p>So far every calculation has produced a number. <strong>Comparison operators</strong> produce a <code>bool</code>: <code>true</code> or <code>false</code>. These are the questions your programs will ask when they make decisions (<strong>selection</strong>), which is next module!</p>
<table>
<tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr>
<tr><td><code>==</code></td><td>equal to</td><td><code>5 == 5</code></td><td><code>True</code></td></tr>
<tr><td><code>!=</code></td><td>not equal to</td><td><code>5 != 3</code></td><td><code>True</code></td></tr>
<tr><td><code>&gt;</code></td><td>greater than</td><td><code>3 &gt; 5</code></td><td><code>False</code></td></tr>
<tr><td><code>&lt;</code></td><td>less than</td><td><code>3 &lt; 5</code></td><td><code>True</code></td></tr>
<tr><td><code>&gt;=</code></td><td>greater than or equal to</td><td><code>5 &gt;= 5</code></td><td><code>True</code></td></tr>
<tr><td><code>&lt;=</code></td><td>less than or equal to</td><td><code>6 &lt;= 5</code></td><td><code>False</code></td></tr>
</table>
<div class="warn"><code>=</code> <em>assigns</em> a value. <code>==</code> <em>compares</em> two values. Mixing them up is one of the most common mistakes in programming.</div>
<h3>Logical operators</h3>
<p>Combine several conditions with <strong>logical operators</strong>:</p>
<ul>
<li><code>&amp;&amp;</code> (AND) – true only if <em>both</em> sides are true</li>
<li><code>||</code> (OR) – true if <em>at least one</em> side is true</li>
<li><code>!</code> (NOT) – flips true to false and false to true</li>
</ul>
<pre><code class="cs">int age = 13;
bool withAdult = true;
bool canSee12A = age >= 12 || withAdult;   // True
bool isTeen = age >= 13 && age <= 19;      // True
bool isRaining = true;
bool goOutside = !isRaining;               // False
Console.WriteLine(canSee12A);</code></pre>
<p>You can store the result in a <code>bool</code> variable and print it: C# shows <code>True</code> or <code>False</code>.</p>`,
      instructions: [
        "Read an int <code>age</code> with the prompt <code>Age: </code>, then an int <code>height</code> (in cm) with the prompt <code>Height in cm: </code>.",
        "A rollercoaster needs riders aged 10 or over <strong>and</strong> at least 140 cm tall. Store the result in a <code>bool</code> called <code>canRide</code> and print <code>Can ride: True</code> or <code>Can ride: False</code>.",
        "Children under 5 <strong>or</strong> adults 65 and over get in free. Store this in a <code>bool</code> called <code>freeEntry</code> and print <code>Free entry: True</code> or <code>Free entry: False</code>."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: read age and height with prompts

        // TODO: bool canRide = ...  (age 10 or over AND height at least 140)

        // TODO: bool freeEntry = ... (age under 5 OR age 65 or over)

        // TODO: print Can ride: ... and Free entry: ...

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        Console.Write("Age: ");
        int age = int.Parse(Console.ReadLine());
        Console.Write("Height in cm: ");
        int height = int.Parse(Console.ReadLine());

        bool canRide = age >= 10 && height >= 140;
        bool freeEntry = age < 5 || age >= 65;

        Console.WriteLine($"Can ride: {canRide}");
        Console.WriteLine($"Free entry: {freeEntry}");
    }
}`,
      stdin: ["14", "150"],
      tests: [
        { type: "output", stdin: ["14", "150"], includes: "Can ride: True", msg: "Age 14, height 150: print Can ride: True",
          help: "When the inputs are <code>14</code> and <code>150</code>, your program should print <code>Can ride: True</code>. Check you read age first, then height, and print <code>$\"Can ride: {canRide}\"</code>." },
        { type: "output", stdin: ["10", "140"], includes: "Can ride: True", msg: "Age 10, height 140 should be allowed (use >=).",
          help: "When the inputs are <code>10</code> and <code>140</code> (exactly on the limits), the rider is allowed. If you get False, change <code>&gt;</code> to <code>&gt;=</code> in both parts of <code>canRide</code>." },
        { type: "output", stdin: ["14", "139"], includes: "Can ride: False", msg: "Age 14, height 139: print Can ride: False",
          help: "When the inputs are <code>14</code> and <code>139</code>, the rider is too short, so it should be <code>False</code>. Both conditions must be true, so join them with <code>&amp;&amp;</code>, not <code>||</code>." },
        { type: "output", stdin: ["65", "170"], includes: "Free entry: True", msg: "Age 65 should get free entry.",
          help: "When the age is <code>65</code>, <code>freeEntry</code> should be True. Use <code>age &gt;= 65</code> (not <code>&gt; 65</code>) and join the two conditions with <code>||</code>." },
        { type: "output", stdin: ["14", "150"], includes: "Free entry: False", msg: "Age 14: print Free entry: False",
          help: "When the age is <code>14</code>, your program should print <code>Free entry: False</code>. Check the line exists and that the condition is <code>age &lt; 5 || age &gt;= 65</code>." }
      ],
      hint: "bool canRide = age >= 10 && height >= 140; bool freeEntry = age < 5 || age >= 65;",
      goal: "When it runs, your program asks for an age and height, then prints True or False for whether that person can ride the rollercoaster and whether they get free entry.",
      steps: [
        "Under the first <code>// TODO</code>, prompt <code>Age: </code> and read <code>int age</code> with <code>int.Parse(Console.ReadLine())</code>.",
        "Do the same for <code>Height in cm: </code>, reading <code>int height</code>. Press <strong>Run</strong> to test both questions.",
        "Under the next <code>// TODO</code>, type <code>bool canRide = age &gt;= 10 &amp;&amp; height &gt;= 140;</code>",
        "Under the next <code>// TODO</code>, write <code>bool freeEntry = </code> with two age conditions joined by <code>||</code>.",
        "Under the last <code>// TODO</code>, print <code>$\"Can ride: {canRide}\"</code> and <code>$\"Free entry: {freeEntry}\"</code>.",
        "Press <strong>Run</strong> and try <code>10</code> and <code>140</code> (should be True), then press <strong>Check</strong>."
      ],
      hints: [
        "A comparison gives back <code>true</code> or <code>false</code>, which you can store in a <code>bool</code>. Two comparisons can be joined with AND or OR.",
        "Use <code>&gt;=</code> for 'or over' and 'at least', and <code>&lt;</code> for 'under'. Join with <code>&amp;&amp;</code> when both must be true, <code>||</code> when either will do.",
        "The free entry line is <code>bool freeEntry = age &lt; 5 || age &gt;= 65;</code>"
      ],
      mistakes: [
        { wrong: "Using <code>&gt;</code> instead of <code>&gt;=</code>, so a 10-year-old who is 140 cm can't ride.", fix: "'10 or over' and 'at least 140' include the number itself, so use <code>&gt;=</code>." },
        { wrong: "Using <code>||</code> for the ride check.", fix: "Riders must pass <em>both</em> rules, so use <code>&amp;&amp;</code>." },
        { wrong: "Writing <code>age &lt; 5 || &gt;= 65</code>", fix: "Each side needs the variable: <code>age &lt; 5 || age &gt;= 65</code>." },
        { wrong: "Forgetting to convert the input, giving 'Operator &gt;= cannot be applied to string and int'.", fix: "Read numbers with <code>int.Parse(Console.ReadLine())</code>." }
      ]
    },
    {
      id: "m04-l6",
      title: "Random numbers",
      type: "code",
      learn: cs`<p>Games need unpredictability: dice rolls, random enemies, shuffled quiz questions. C# makes random numbers with the <code>Random</code> class.</p>
<p>First create a random number generator (do this <strong>once</strong>), then ask it for numbers with <code>Next</code>:</p>
<pre><code class="cs">Random rng = new Random();
int dice = rng.Next(1, 7);      // 1, 2, 3, 4, 5 or 6
int percent = rng.Next(100);    // 0 to 99</code></pre>
<div class="warn"><code>Next(min, max)</code> includes <code>min</code> but <strong>excludes</strong> <code>max</code>. For a dice from 1 to 6 you must write <code>Next(1, 7)</code>. Writing <code>Next(1, 6)</code> is a classic logic error: you'd never roll a 6!</div>
<p>Each call to <code>Next</code> gives a new number:</p>
<pre><code class="cs">Random rng = new Random();
int roll1 = rng.Next(1, 7);
int roll2 = rng.Next(1, 7);
Console.WriteLine($"You rolled {roll1} and {roll2}");
Console.WriteLine($"Total: {roll1 + roll2}");</code></pre>
<pre><code>You rolled 4 and 6
Total: 10</code></pre>
<p>Run it again and you'll probably get different numbers. That makes testing tricky, so programmers sometimes give <code>Random</code> a <strong>seed</strong>, e.g. <code>new Random(42)</code>. A seeded generator gives the same sequence every time, which is handy while you are debugging.</p>
<p>For a random decimal between 0 and 1, use <code>rng.NextDouble()</code>.</p>`,
      instructions: [
        "Create a <code>Random</code> object.",
        "Roll two six-sided dice (1 to 6 each) and print <code>Dice 1: A</code> and <code>Dice 2: B</code>.",
        "Print <code>Total: T</code> (the sum of the two dice).",
        "Also pick a random rugby shirt number from 1 to 15 inclusive and print <code>Your shirt number is N</code>."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: create a Random object

        // TODO: roll two dice (1 to 6) and print Dice 1: ... and Dice 2: ...

        // TODO: print Total: ...

        // TODO: shirt number 1 to 15, print Your shirt number is ...

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        Random rng = new Random();

        int dice1 = rng.Next(1, 7);
        int dice2 = rng.Next(1, 7);
        Console.WriteLine($"Dice 1: {dice1}");
        Console.WriteLine($"Dice 2: {dice2}");
        Console.WriteLine($"Total: {dice1 + dice2}");

        int shirt = rng.Next(1, 16);
        Console.WriteLine($"Your shirt number is {shirt}");
    }
}`,
      tests: [
        { type: "code", pattern: "new\\s+Random\\s*\\(", msg: "Create a Random object with new Random().",
          help: "This check looks for <code>new Random(</code> in your code. Create the generator once at the top: <code>Random rng = new Random();</code>" },
        { type: "code", pattern: "\\.Next\\s*\\(\\s*1\\s*,\\s*7\\s*\\)", msg: "Use Next(1, 7) for a dice roll from 1 to 6.",
          help: "This check looks for <code>.Next(1, 7)</code>. The top number is <em>not</em> included, so <code>Next(1, 6)</code> would never roll a 6." },
        { type: "code", pattern: "\\.Next\\s*\\(\\s*1\\s*,\\s*16\\s*\\)", msg: "Use Next(1, 16) for a shirt number from 1 to 15.",
          help: "This check looks for <code>.Next(1, 16)</code>. To include 15, the maximum you give must be one more: 16." },
        { type: "fn", fn: (out) => { const a = out.match(/Dice 1: (\d+)/), b = out.match(/Dice 2: (\d+)/), t = out.match(/Total: (\d+)/); if (!a || !b || !t) return false; const x = +a[1], y = +b[1]; return x >= 1 && x <= 6 && y >= 1 && y <= 6 && +t[1] === x + y; }, msg: "Print Dice 1: and Dice 2: (each 1 to 6) and Total: equal to their sum.",
          help: "This check reads the numbers after <code>Dice 1:</code>, <code>Dice 2:</code> and <code>Total:</code> and checks the total is their sum. Store each roll in its own variable, print those variables, and print <code>{dice1 + dice2}</code> for the total. Calling <code>rng.Next</code> again for the total would give different numbers." },
        { type: "outputRegex", pattern: "Your shirt number is ([1-9]|1[0-5])\\b", msg: "Print Your shirt number is followed by a number from 1 to 15.",
          help: "Your output needs <code>Your shirt number is</code> followed by a number from 1 to 15. Check the wording and use <code>rng.Next(1, 16)</code>." }
      ],
      hint: "Random rng = new Random(); int dice1 = rng.Next(1, 7); Remember the max is NOT included, so 1 to 15 is Next(1, 16).",
      goal: "When it runs, your program rolls two dice, prints each roll and their total, then picks a random rugby shirt number from 1 to 15.",
      steps: [
        "Under the first <code>// TODO</code>, type <code>Random rng = new Random();</code>",
        "Under the next <code>// TODO</code>, type <code>int dice1 = rng.Next(1, 7);</code> and <code>int dice2 = rng.Next(1, 7);</code>",
        "Print <code>$\"Dice 1: {dice1}\"</code> and <code>$\"Dice 2: {dice2}\"</code>. Press <strong>Run</strong> a few times and watch the numbers change.",
        "Under the total <code>// TODO</code>, print <code>Total: </code> followed by <code>{dice1 + dice2}</code>.",
        "Under the last <code>// TODO</code>, store <code>rng.Next(1, 16)</code> in a variable and print <code>Your shirt number is {shirt}</code>.",
        "Press <strong>Run</strong>, check the total adds up, then press <strong>Check</strong>."
      ],
      hints: [
        "Make one random number generator, then ask it for as many numbers as you need. Save each roll in a variable so you can use it twice.",
        "<code>rng.Next(min, max)</code> includes <code>min</code> but not <code>max</code>. So 1 to 6 is <code>Next(1, 7)</code> and 1 to 15 is <code>Next(1, 16)</code>.",
        "The dice lines are <code>int dice1 = rng.Next(1, 7);</code> and <code>int dice2 = rng.Next(1, 7);</code>"
      ],
      mistakes: [
        { wrong: "Using <code>rng.Next(1, 6)</code> for a dice.", fix: "The maximum isn't included, so you'd never roll a 6. Use <code>Next(1, 7)</code>." },
        { wrong: "Printing <code>rng.Next(1, 7)</code> directly in each line, then again for the total.", fix: "Each call gives a new number, so the total won't match. Store each roll in a variable first." },
        { wrong: "Writing <code>Random rng = Random();</code> without <code>new</code>.", fix: "You create an object with <code>new</code>: <code>Random rng = new Random();</code>" },
        { wrong: "Using <code>Next(1, 15)</code> for the shirt number.", fix: "To include 15, use <code>Next(1, 16)</code>." }
      ]
    },
    {
      id: "m04-l7",
      title: "Project: VAT and bill splitter",
      type: "code",
      learn: cs`<p>Let's finish with a mini-project that uses input, conversion, constants, arithmetic and formatting together: a bill splitter for when your friends go for pizza after the cinema.</p>
<p>Restaurant prices sometimes don't include VAT (a tax, 20% in the UK). To add 20% you multiply by 0.2 to get the VAT, then add it on:</p>
<pre><code class="cs">const double VatRate = 0.2;
double price = 40;
double vat = price * VatRate;      // 8
double withVat = price + vat;      // 48</code></pre>
<p>A tip is worked out the same way. Then you divide by the number of people:</p>
<pre><code class="cs">double tip = withVat * 0.1;               // 10% tip
double total = withVat + tip;
double each = total / people;</code></pre>
<p>Plan before you code. A good way to plan is to write the algorithm in steps first:</p>
<ol>
<li>INPUT the bill before VAT and the number of people</li>
<li>vat ← bill × 0.2</li>
<li>total ← bill + vat</li>
<li>each ← total ÷ people</li>
<li>OUTPUT vat, total and each, formatted as money</li>
</ol>
<p>This step-by-step plan is <strong>pseudocode</strong>, and you'll see it in your exam papers. Turning it into C# is just one line per step.</p>
<div class="tip">Test with numbers you can check in your head first, like a £50 bill between 2 people: VAT £10, total £60, £30 each. Then try trickier ones.</div>`,
      instructions: [
        "Declare a constant <code>VatRate</code> of <code>0.2</code>.",
        "Prompt <code>Bill before VAT: </code> and read a <code>double</code>, then prompt <code>Number of people: </code> and read an <code>int</code>.",
        "Print <code>VAT: X</code>, <code>Total: Y</code> and <code>Each person pays: Z</code>, all formatted with <code>:C</code>.",
        "Example: 50 and 2 → <code>VAT: £10.00</code>, <code>Total: £60.00</code>, <code>Each person pays: £30.00</code>"
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: constant VatRate

        // TODO: INPUT bill and people

        // TODO: PROCESS vat, total and each

        // TODO: OUTPUT VAT: ..., Total: ..., Each person pays: ... (use :C)

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        const double VatRate = 0.2;

        Console.Write("Bill before VAT: ");
        double bill = double.Parse(Console.ReadLine());
        Console.Write("Number of people: ");
        int people = int.Parse(Console.ReadLine());

        double vat = bill * VatRate;
        double total = bill + vat;
        double each = total / people;

        Console.WriteLine($"VAT: {vat:C}");
        Console.WriteLine($"Total: {total:C}");
        Console.WriteLine($"Each person pays: {each:C}");
    }
}`,
      stdin: ["50", "2"],
      tests: [
        { type: "output", stdin: ["50", "2"], includes: "VAT: £10.00", msg: "For 50 and 2, print VAT: £10.00",
          help: "When the inputs are <code>50</code> and <code>2</code>, your program should print <code>VAT: £10.00</code>. VAT is <code>bill * VatRate</code>; print it with <code>{vat:C}</code> and no extra £ sign." },
        { type: "output", stdin: ["50", "2"], includes: "Total: £60.00", msg: "For 50 and 2, print Total: £60.00",
          help: "When the inputs are <code>50</code> and <code>2</code>, the total should be <code>£60.00</code>. The total is the bill <em>plus</em> the VAT: <code>bill + vat</code>." },
        { type: "output", stdin: ["50", "2"], includes: "Each person pays: £30.00", msg: "For 50 and 2, print Each person pays: £30.00",
          help: "When the inputs are <code>50</code> and <code>2</code>, each person pays <code>£30.00</code>. Divide the <em>total</em> (not the bill) by the number of people." },
        { type: "output", stdin: ["37.5", "4"], includes: "Each person pays: £11.25", msg: "For 37.5 and 4, print Each person pays: £11.25 (total £45.00).",
          help: "When the inputs are <code>37.5</code> and <code>4</code>, each person pays <code>£11.25</code>. If your program crashes, read the bill with <code>double.Parse</code>, not <code>int.Parse</code>." },
        { type: "code", pattern: "const\\s+(double|decimal)\\s+VatRate\\s*=\\s*0\\.2", msg: "Declare const double VatRate = 0.2;",
          help: "This check looks for <code>const double VatRate = 0.2</code> in your code. Use exactly that name, with capital V and R, and use it in your VAT calculation." }
      ],
      hint: "double vat = bill * VatRate; double total = bill + vat; double each = total / people; then $\"VAT: {vat:C}\" and so on.",
      goal: "When it runs, your program asks for a bill before VAT and how many people are paying, then prints the VAT, the total with VAT and each person's share as money.",
      steps: [
        "Under the first <code>// TODO</code>, type <code>const double VatRate = 0.2;</code>",
        "Under INPUT, prompt <code>Bill before VAT: </code> and read <code>double bill</code> with <code>double.Parse</code>. Then prompt <code>Number of people: </code> and read <code>int people</code>.",
        "Press <strong>Run</strong> to check both questions appear.",
        "Under PROCESS, write three lines: <code>vat</code> is <code>bill * VatRate</code>, <code>total</code> is <code>bill + vat</code>, and <code>each</code> is <code>total / people</code> (all <code>double</code>).",
        "Under OUTPUT, print <code>VAT: {vat:C}</code>, <code>Total: {total:C}</code> and <code>Each person pays: {each:C}</code>.",
        "Press <strong>Run</strong> and test with <code>50</code> and <code>2</code> (you should see £10.00, £60.00, £30.00). Then press <strong>Check</strong>."
      ],
      hints: [
        "Follow the pseudocode in the Learn pane: one line of C# for each step.",
        "Read the bill with <code>double.Parse</code> and people with <code>int.Parse</code>. Work out vat, then total, then each, and format each with <code>:C</code>.",
        "The process lines are <code>double vat = bill * VatRate;</code>, <code>double total = bill + vat;</code> and <code>double each = total / people;</code>"
      ],
      mistakes: [
        { wrong: "Dividing the bill instead of the total: <code>bill / people</code>.", fix: "People share the total <em>with</em> VAT: <code>total / people</code>." },
        { wrong: "Reading the bill with <code>int.Parse</code>, which crashes on <code>37.5</code>.", fix: "Use <code>double.Parse</code> for the bill." },
        { wrong: "Typing <code>£{vat:C}</code>, giving <code>££10.00</code>.", fix: "<code>:C</code> already adds the £ sign. Remove yours." },
        { wrong: "Using 20 instead of 0.2 for the VAT rate, giving huge numbers.", fix: "20% as a decimal is <code>0.2</code>." }
      ]
    },
    {
      id: "m04-quiz",
      title: "Checkpoint: operators and maths",
      type: "quiz",
      questions: [
        { q: "What is the value of 2 + 3 * 4 in C#?", options: ["20", "14", "24", "9"], answer: 1, explain: "Multiplication happens before addition (BIDMAS): 3 × 4 = 12, then + 2 = 14." },
        { q: "What does 17 / 5 give when both are ints?", options: ["3.4", "3", "4", "2"], answer: 1, explain: "Integer division keeps only the whole-number part: 3." },
        { q: "What does 17 % 5 give?", options: ["3", "3.4", "2", "85"], answer: 2, explain: "% gives the remainder: 17 = 3 × 5 + 2." },
        { q: "How can you test whether a number n is even?", options: ["n / 2 == 0", "n % 2 == 0", "n % 2 == 1", "n == 2"], answer: 1, explain: "Even numbers leave no remainder when divided by 2." },
        { q: "If score is 10, what is score after score *= 3; score -= 5; ?", options: ["25", "15", "35", "5"], answer: 0, explain: "10 × 3 = 30, then 30 − 5 = 25." },
        { q: "Which call gives a random dice roll from 1 to 6?", options: ["rng.Next(1, 6)", "rng.Next(6)", "rng.Next(1, 7)", "rng.Next(0, 6)"], answer: 2, explain: "The max value is excluded, so Next(1, 7) gives 1 to 6." },
        { q: "What is the value of (5 > 3) && (2 > 4)?", options: ["True", "False", "5", "An error"], answer: 1, explain: "&& needs both sides to be true. 2 > 4 is false, so the whole thing is false." },
        { q: "What is the difference between = and ==?", options: ["There is none", "= assigns a value; == compares two values", "= compares; == assigns", "== is only for strings"], answer: 1, explain: "= stores a value in a variable; == checks whether two values are equal and gives a bool." }
      ]
    }
  ]
});
})();
