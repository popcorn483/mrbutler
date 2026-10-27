// Module 2: Variables and data types
(function () {
const cs = String.raw;

COURSE.addModule({
  id: "m02",
  title: "Variables and data types",
  icon: "box",
  summary: "Store information in variables, choose the right data type, and build messages with concatenation and interpolation.",
  lessons: [
    {
      id: "m02-l1",
      title: "Your first variables",
      type: "code",
      learn: cs`<p>So far every value has been typed straight into a <code>WriteLine</code>. Real programs need to <strong>remember</strong> things: a score, a name, a price. For that you use variables.</p>
<div class="key"><strong>Variable</strong> a named location in memory that stores a value. The value can change while the program runs.</div>
<p>Think of a variable as a labelled box. In C# you must say what <em>type</em> of thing goes in the box, give it a name, and (usually) put a value in:</p>
<pre><code class="cs">int tries = 3;
string team = "Enniskillen";</code></pre>
<p><code>int</code> means "whole number" and <code>string</code> means "text". The <code>=</code> sign is the <strong>assignment</strong> operator: it means "store the value on the right in the variable on the left". It does <em>not</em> mean "equals" like in maths.</p>
<h3>Using a variable</h3>
<p>To print what is in the box, use the variable's name <strong>without</strong> quotes:</p>
<pre><code class="cs">Console.WriteLine(team);     // prints Enniskillen
Console.WriteLine("team");   // prints the word team</code></pre>
<h3>Changing a variable</h3>
<p>You can put a new value into a variable later. The old value is replaced. You don't write the type again:</p>
<pre><code class="cs">int tries = 3;
Console.WriteLine(tries);   // 3
tries = 5;
Console.WriteLine(tries);   // 5</code></pre>
<p>You can also declare a variable first and assign it afterwards:</p>
<pre><code class="cs">int age;
age = 14;</code></pre>`,
      instructions: [
        "Declare a <code>string</code> variable called <code>petName</code> holding <code>Biscuit</code> and an <code>int</code> variable called <code>petAge</code> holding <code>3</code>.",
        "Print <code>petName</code> and then <code>petAge</code> on separate lines (use the variables, not typed text).",
        "Biscuit has a birthday! Change <code>petAge</code> to <code>4</code> and print it again."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: declare petName (string) and petAge (int)

        // TODO: print both variables

        // TODO: change petAge to 4 and print it again

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        string petName = "Biscuit";
        int petAge = 3;

        Console.WriteLine(petName);
        Console.WriteLine(petAge);

        petAge = 4;
        Console.WriteLine(petAge);
    }
}`,
      tests: [
        { type: "code", pattern: "string\\s+petName\\s*=\\s*\"Biscuit\"", msg: "Declare string petName = \"Biscuit\";",
          help: "This check looks for <code>string petName = \"Biscuit\"</code> in your code. Check the capital N in <code>petName</code>, the capital B in Biscuit, and the double quotes." },
        { type: "code", pattern: "int\\s+petAge\\s*=\\s*3\\s*;", msg: "Declare int petAge = 3;",
          help: "This check looks for <code>int petAge = 3;</code>. Numbers don't need quotes, and the name needs a capital A." },
        { type: "code", pattern: "(^|[^.\\w])petAge\\s*=\\s*4\\s*;", msg: "Assign 4 to petAge (without writing int again).",
          help: "This check looks for a line that changes the value: <code>petAge = 4;</code>. Don't write <code>int</code> in front, because the variable already exists." },
        { type: "code", pattern: "WriteLine\\(\\s*petAge\\s*\\)", msg: "Print the variable petAge (no quotes).",
          help: "This check looks for <code>Console.WriteLine(petAge)</code>. If you wrote <code>\"petAge\"</code> in quotes or typed the number <code>3</code>, use the variable name on its own instead." },
        { type: "outputRegex", pattern: "Biscuit\\r?\\n3\\r?\\n4", msg: "Output should be Biscuit, 3, then 4 on separate lines.",
          help: "The output should be exactly three lines: <code>Biscuit</code>, <code>3</code>, <code>4</code>. Make sure you print <code>petAge</code> once before changing it and once after." }
      ],
      hint: "petAge = 4; changes the value. Then Console.WriteLine(petAge); prints it again.",
      goal: "When it runs, your program prints the pet's name Biscuit, its age 3, and then its new age 4, each on its own line.",
      steps: [
        "Under the first <code>// TODO</code>, type <code>string petName = \"Biscuit\";</code>",
        "On the next line type <code>int petAge = 3;</code>",
        "Under the second <code>// TODO</code>, type <code>Console.WriteLine(petName);</code> and then <code>Console.WriteLine(petAge);</code> (no quotes round the names).",
        "Press <strong>Run</strong>. You should see <code>Biscuit</code> and <code>3</code>.",
        "Under the last <code>// TODO</code>, type <code>petAge = 4;</code> (no <code>int</code> this time) and then print <code>petAge</code> again.",
        "Press <strong>Run</strong> to see <code>4</code> appear underneath, then press <strong>Check</strong>."
      ],
      hints: [
        "A variable is a labelled box. You make it once with its type, then you can use its name to print it or give it a new value.",
        "Declare with <code>type name = value;</code>. To print, put the variable name inside <code>Console.WriteLine( )</code> with <strong>no</strong> quotes. To change it, write <code>name = newValue;</code>",
        "The last part looks like this: <code>petAge = 4;</code> then <code>Console.WriteLine(petAge);</code>"
      ],
      mistakes: [
        { wrong: "Printing the name in quotes: <code>Console.WriteLine(\"petName\");</code>", fix: "Quotes print the word itself. Remove them to print the value stored in the variable." },
        { wrong: "Writing <code>int petAge = 4;</code> to change the age.", fix: "That tries to create a second variable with the same name and gives an error. Just write <code>petAge = 4;</code>" },
        { wrong: "Forgetting the quotes round Biscuit: <code>string petName = Biscuit;</code>", fix: "Text values need double quotes: <code>\"Biscuit\"</code>." },
        { wrong: "Different capitals, e.g. declaring <code>petAge</code> but printing <code>petage</code>.", fix: "Variable names are case sensitive. Use exactly <code>petName</code> and <code>petAge</code> every time." }
      ]
    },
    {
      id: "m02-l2",
      title: "Data types",
      type: "code",
      learn: cs`<p>A <strong>data type</strong> tells the computer what kind of value a variable holds, how much memory it needs and what you can do with it. These are the ones you need for GCSE:</p>
<table>
<tr><th>Type</th><th>Holds</th><th>Example</th></tr>
<tr><td><code>int</code></td><td>whole numbers (integer)</td><td><code>int goals = 2;</code></td></tr>
<tr><td><code>double</code></td><td>numbers with a decimal point (real)</td><td><code>double rainfall = 12.5;</code></td></tr>
<tr><td><code>decimal</code></td><td>exact decimals, best for money (needs an <code>m</code>)</td><td><code>decimal price = 7.99m;</code></td></tr>
<tr><td><code>char</code></td><td>a single character, in single quotes</td><td><code>char grade = 'A';</code></td></tr>
<tr><td><code>string</code></td><td>text, in double quotes</td><td><code>string town = "Enniskillen";</code></td></tr>
<tr><td><code>bool</code></td><td><code>true</code> or <code>false</code> (Boolean)</td><td><code>bool isRaining = true;</code></td></tr>
</table>
<p>C# is strict about types. You can't put text into an <code>int</code>:</p>
<pre><code class="cs">int goals = "two";   // ✗ Cannot implicitly convert type 'string' to 'int'</code></pre>
<p>Watch out for the punctuation: <code>'A'</code> (single quotes) is a <code>char</code>, but <code>"A"</code> (double quotes) is a <code>string</code>.</p>
<p>When you print a <code>bool</code>, C# shows <code>True</code> or <code>False</code> with a capital letter, even though you type <code>true</code> and <code>false</code> in lower case in your code.</p>
<div class="tip">Why <code>decimal</code> for money? A <code>double</code> stores numbers in binary and can be very slightly out (try printing <code>0.1 + 0.2</code> some time!). <code>decimal</code> is exact for pounds and pence.</div>`,
      instructions: [
        "Create variables for a cinema trip, using the most suitable type for each: <code>film</code> = <code>Space Rangers</code>, <code>screen</code> = <code>4</code>, <code>ticketPrice</code> = <code>7.50</code> (it's money!), <code>row</code> = <code>F</code> (a single character), <code>is3D</code> = <code>true</code>.",
        "Print each variable on its own line, in that order."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: film (text), screen (whole number), ticketPrice (money),
        //       row (single character), is3D (true/false)

        // TODO: print each variable on its own line

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        string film = "Space Rangers";
        int screen = 4;
        decimal ticketPrice = 7.50m;
        char row = 'F';
        bool is3D = true;

        Console.WriteLine(film);
        Console.WriteLine(screen);
        Console.WriteLine(ticketPrice);
        Console.WriteLine(row);
        Console.WriteLine(is3D);
    }
}`,
      tests: [
        { type: "code", pattern: "string\\s+film\\s*=", msg: "film should be a string.",
          help: "This check looks for <code>string film =</code> in your code. The film title is text, so its type is <code>string</code>." },
        { type: "code", pattern: "int\\s+screen\\s*=", msg: "screen should be an int.",
          help: "This check looks for <code>int screen =</code>. A screen number is a whole number, so use <code>int</code>." },
        { type: "code", pattern: "decimal\\s+ticketPrice\\s*=\\s*7\\.50?m", msg: "ticketPrice should be a decimal: decimal ticketPrice = 7.50m;",
          help: "This check looks for <code>decimal ticketPrice = 7.50m</code>. Money uses <code>decimal</code>, and the value needs a small <code>m</code> on the end." },
        { type: "code", pattern: "char\\s+row\\s*=\\s*'F'", msg: "row should be a char: char row = 'F';",
          help: "This check looks for <code>char row = 'F'</code>. A single character uses <code>char</code> and <strong>single</strong> quotes, not double quotes." },
        { type: "outputRegex", pattern: "Space Rangers\\r?\\n4\\r?\\n7\\.50?\\r?\\nF\\r?\\nTrue", msg: "Print the five values in order: Space Rangers, 4, 7.50, F, True.",
          help: "The output should be five lines in this order: <code>Space Rangers</code>, <code>4</code>, <code>7.50</code>, <code>F</code>, <code>True</code>. Check the order of your <code>WriteLine</code>s and that <code>is3D</code> is a <code>bool</code> set to <code>true</code> (not the text \"true\")." }
      ],
      hint: "Money uses decimal with an m on the end (7.50m). A single character uses char and single quotes ('F'). true/false uses bool.",
      goal: "When it runs, your program prints the film name, screen number, ticket price, row letter and whether it's 3D, one per line.",
      steps: [
        "Under the first <code>// TODO</code>, type <code>string film = \"Space Rangers\";</code>",
        "Add <code>int screen = 4;</code> and <code>decimal ticketPrice = 7.50m;</code> (note the <code>m</code> for money).",
        "Add <code>char row = 'F';</code> (single quotes) and <code>bool is3D = true;</code>",
        "Under the second <code>// TODO</code>, print each variable with its own <code>Console.WriteLine</code>, in the same order.",
        "Press <strong>Run</strong> and check you see five lines ending in <code>True</code>, then press <strong>Check</strong>."
      ],
      hints: [
        "Think about what kind of value each one is: text, whole number, money, one letter, or yes/no.",
        "Use <code>string</code>, <code>int</code>, <code>decimal</code>, <code>char</code> and <code>bool</code>. Money needs an <code>m</code> after the number; a <code>char</code> uses single quotes.",
        "The two tricky ones are <code>decimal ticketPrice = 7.50m;</code> and <code>char row = 'F';</code>"
      ],
      mistakes: [
        { wrong: "Forgetting the <code>m</code>: <code>decimal ticketPrice = 7.50;</code>", fix: "Without <code>m</code>, C# treats 7.50 as a <code>double</code> and gives an error. Write <code>7.50m</code>." },
        { wrong: "Using double quotes for the row: <code>char row = \"F\";</code>", fix: "A <code>char</code> needs single quotes: <code>'F'</code>." },
        { wrong: "Putting true in quotes: <code>bool is3D = \"true\";</code>", fix: "<code>true</code> is a keyword, not text. Write it with no quotes, all lower case." },
        { wrong: "Using <code>double</code> for the price.", fix: "It may print the right thing, but the check wants <code>decimal</code> because it's money." }
      ]
    },
    {
      id: "m02-l3",
      title: "Choosing the right type",
      type: "code",
      learn: cs`<p>Picking the right data type is a skill examiners love to test. Ask yourself: <em>"What will I do with this value?"</em></p>
<h3>Numbers that aren't really numbers</h3>
<p>A phone number like <code>07700 900123</code> is made of digits, but you would never add two phone numbers together. It also starts with a 0, and an <code>int</code> would throw that leading zero away (<code>07700900123</code> would become <code>7700900123</code>). Phone numbers, postcodes and student IDs with letters or leading zeros should be stored as a <code>string</code>.</p>
<table>
<tr><th>Value</th><th>Best type</th><th>Why</th></tr>
<tr><td>Number of pupils in a class</td><td><code>int</code></td><td>whole number, you might add to it</td></tr>
<tr><td>Height in metres, 1.62</td><td><code>double</code></td><td>has a decimal part</td></tr>
<tr><td>Price of a meal deal, £3.20</td><td><code>decimal</code></td><td>money</td></tr>
<tr><td>Phone number</td><td><code>string</code></td><td>never used in calculations; leading 0</td></tr>
<tr><td>Postcode BT74 6AA</td><td><code>string</code></td><td>letters, digits and a space</td></tr>
<tr><td>Has paid?</td><td><code>bool</code></td><td>only two possible values</td></tr>
<tr><td>House initial, 'C'</td><td><code>char</code></td><td>exactly one character</td></tr>
</table>
<h3>Naming rules</h3>
<ul>
<li>Names can contain letters, digits and <code>_</code>, but can't start with a digit: <code>score1</code> ✓, <code>1score</code> ✗.</li>
<li>No spaces: <code>first name</code> ✗.</li>
<li>Can't be a C# keyword like <code>int</code> or <code>class</code>.</li>
<li>Case sensitive: <code>score</code> and <code>Score</code> are different variables.</li>
</ul>
<p>C# programmers name variables in <strong>camelCase</strong>: start lower case, and give every following word a capital letter, such as <code>firstName</code>, <code>totalScore</code>, <code>numberOfPupils</code>. Choose <em>meaningful</em> names: <code>busFare</code> tells you far more than <code>x</code>.</p>`,
      instructions: [
        "The starter stores a pupil's contact details, but some types and names are wrong. Fix it so: <code>phoneNumber</code> is a <code>string</code> holding <code>07700900123</code> (the 0 must print!), <code>heightInMetres</code> is a <code>double</code> holding <code>1.62</code>, and <code>hasPaidForTrip</code> is a <code>bool</code> holding <code>false</code>.",
        "Use those exact camelCase names (the starter's names break the rules).",
        "Print the three values on separate lines in that order."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // These lines have the wrong types and badly named variables.
        // TODO: fix them so the program compiles and prints the right values
        int PhoneNumber = 770090012;   // where has the 0 gone?
        int heightinmetres = 2;
        string has_paid_for_trip = "no";

        Console.WriteLine(PhoneNumber);
        Console.WriteLine(heightinmetres);
        Console.WriteLine(has_paid_for_trip);
    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        string phoneNumber = "07700900123";
        double heightInMetres = 1.62;
        bool hasPaidForTrip = false;

        Console.WriteLine(phoneNumber);
        Console.WriteLine(heightInMetres);
        Console.WriteLine(hasPaidForTrip);
    }
}`,
      tests: [
        { type: "code", pattern: "string\\s+phoneNumber\\s*=\\s*\"07700900123\"", msg: "Store phoneNumber as a string: \"07700900123\"",
          help: "This check looks for <code>string phoneNumber = \"07700900123\"</code>. Change <code>int</code> to <code>string</code>, rename it with a small p, and put the full number (with the leading 0) in double quotes." },
        { type: "code", pattern: "double\\s+heightInMetres\\s*=\\s*1\\.62", msg: "Store heightInMetres as a double holding 1.62",
          help: "This check looks for <code>double heightInMetres = 1.62</code>. Change the type to <code>double</code>, fix the capitals in the name (<code>In</code> and <code>Metres</code>) and use the value 1.62." },
        { type: "code", pattern: "bool\\s+hasPaidForTrip\\s*=\\s*false", msg: "Store hasPaidForTrip as a bool holding false",
          help: "This check looks for <code>bool hasPaidForTrip = false</code>. Replace the underscores with camelCase, change the type to <code>bool</code> and use <code>false</code> with no quotes." },
        { type: "outputRegex", pattern: "07700900123\\r?\\n1\\.62\\r?\\nFalse", msg: "Print 07700900123, 1.62 and False on separate lines.",
          help: "The output should be <code>07700900123</code>, <code>1.62</code>, <code>False</code> on three lines. Make sure you updated the names inside the three <code>WriteLine</code>s to match your new variable names." }
      ],
      hint: "Strings go in double quotes, so \"07700900123\" keeps its 0. Remember to change the names in the WriteLine lines too.",
      goal: "When it runs, your program prints the phone number with its leading 0, the height 1.62 and False, each on its own line.",
      steps: [
        "Press <strong>Run</strong> and look at the output. Notice the phone number has lost its 0.",
        "Change the first line to <code>string phoneNumber = \"07700900123\";</code>",
        "Change the second line to <code>double heightInMetres = 1.62;</code>",
        "Change the third line to <code>bool hasPaidForTrip = false;</code>",
        "Update the three <code>Console.WriteLine</code> lines so they use the new names exactly.",
        "Press <strong>Run</strong>. If you get a 'does not exist' error, a name doesn't match. Then press <strong>Check</strong>."
      ],
      hints: [
        "Each line has two problems: the type and the name. Fix both, then make the print lines match.",
        "Phone numbers are <code>string</code> (in double quotes), height is <code>double</code>, and yes/no is <code>bool</code>. Use camelCase: small first letter, capital for each new word, no underscores.",
        "The first line should become <code>string phoneNumber = \"07700900123\";</code> and the matching print line <code>Console.WriteLine(phoneNumber);</code>"
      ],
      mistakes: [
        { wrong: "Renaming the variables but not the <code>WriteLine</code> lines, giving <code>The name 'PhoneNumber' does not exist</code>.", fix: "Every place the variable is used must have the same spelling and capitals as the declaration." },
        { wrong: "Leaving the phone number as an <code>int</code>, so the 0 disappears.", fix: "Store it as a <code>string</code> in double quotes so all the digits are kept." },
        { wrong: "Writing <code>\"false\"</code> in quotes.", fix: "A <code>bool</code> holds <code>false</code> with no quotes." },
        { wrong: "Getting the camelCase wrong, e.g. <code>heightInmetres</code>.", fix: "Every word after the first starts with a capital: <code>heightInMetres</code>, <code>hasPaidForTrip</code>." }
      ]
    },
    {
      id: "m02-l4",
      title: "Joining text: concatenation",
      type: "code",
      learn: cs`<p>You'll often want to print a variable in the middle of a sentence. One way is <strong>concatenation</strong>: joining strings together with <code>+</code>.</p>
<pre><code class="cs">string name = "Niamh";
int tries = 2;
Console.WriteLine("Well done " + name + "!");
Console.WriteLine(name + " scored " + tries + " tries.");</code></pre>
<pre><code>Well done Niamh!
Niamh scored 2 tries.</code></pre>
<p>When you use <code>+</code> with a string and a number, C# turns the number into text and sticks them together. Don't forget the <strong>spaces inside the quotes</strong>: <code>" scored "</code> has a space at each end, otherwise you'd get <code>Niamhscored2tries.</code></p>
<h3>Storing a joined string</h3>
<p>The result of concatenation is just a string, so you can store it in a variable:</p>
<pre><code class="cs">string school = "ERGS";
string team = "1st XV";
string fullTeam = school + " " + team;
Console.WriteLine(fullTeam);   // ERGS 1st XV</code></pre>
<div class="warn"><strong>Careful with numbers!</strong> C# works left to right. <code>"Total: " + 2 + 3</code> gives <code>Total: 23</code>, because <code>"Total: " + 2</code> becomes the string <code>"Total: 2"</code>, then <code>3</code> is stuck on the end. Use brackets to do the maths first: <code>"Total: " + (2 + 3)</code> gives <code>Total: 5</code>.</div>`,
      instructions: [
        "Create <code>string town = \"Enniskillen\";</code> and <code>int temperature = 11;</code>",
        "Using concatenation (<code>+</code>), print <code>Weather for Enniskillen: 11 degrees</code>",
        "Create <code>string forecast</code> by joining <code>town</code> and <code>\" will be wet tomorrow\"</code>, then print <code>forecast</code>. It should show <code>Enniskillen will be wet tomorrow</code>."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: declare town and temperature

        // TODO: print Weather for Enniskillen: 11 degrees using +

        // TODO: build forecast and print it

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        string town = "Enniskillen";
        int temperature = 11;

        Console.WriteLine("Weather for " + town + ": " + temperature + " degrees");

        string forecast = town + " will be wet tomorrow";
        Console.WriteLine(forecast);
    }
}`,
      tests: [
        { type: "output", includes: "Weather for Enniskillen: 11 degrees", msg: "Print Weather for Enniskillen: 11 degrees (check the colon and spaces).",
          help: "Your output needs exactly <code>Weather for Enniskillen: 11 degrees</code>. If words are squashed together, add spaces inside the quoted pieces, e.g. <code>\"Weather for \"</code> and <code>\" degrees\"</code>." },
        { type: "code", pattern: "\\+\\s*town|town\\s*\\+", msg: "Use + to join the town variable into the sentence.",
          help: "This check looks for <code>town</code> joined with <code>+</code>. Typing the word Enniskillen straight into the sentence won't pass: use the variable." },
        { type: "code", pattern: "\\+\\s*temperature|temperature\\s*\\+", msg: "Use + to join the temperature variable into the sentence.",
          help: "This check looks for <code>temperature</code> joined with <code>+</code>. Use the variable instead of typing <code>11</code> into the text." },
        { type: "code", pattern: "string\\s+forecast\\s*=", msg: "Create a string variable called forecast.",
          help: "This check looks for <code>string forecast =</code> in your code. Create the variable first, then print it." },
        { type: "output", includes: "Enniskillen will be wet tomorrow", msg: "Print Enniskillen will be wet tomorrow from the forecast variable.",
          help: "This check looks for <code>Enniskillen will be wet tomorrow</code>. Make sure the text you join on starts with a space (<code>\" will be wet tomorrow\"</code>) and that you print <code>forecast</code>." }
      ],
      hint: "\"Weather for \" + town + \": \" + temperature + \" degrees\" — check there's a space at the edges of each quoted piece.",
      goal: "When it runs, your program prints <code>Weather for Enniskillen: 11 degrees</code> and then <code>Enniskillen will be wet tomorrow</code>, built from variables.",
      steps: [
        "Under the first <code>// TODO</code>, declare <code>string town = \"Enniskillen\";</code> and <code>int temperature = 11;</code>",
        "Under the second <code>// TODO</code>, start with <code>Console.WriteLine(\"Weather for \" + town);</code> and press <strong>Run</strong>.",
        "Extend that line so it carries on with <code>+ \": \" + temperature + \" degrees\"</code> before the closing bracket. Run it again.",
        "Under the last <code>// TODO</code>, type <code>string forecast = town + \" will be wet tomorrow\";</code>",
        "Add <code>Console.WriteLine(forecast);</code>, press <strong>Run</strong>, then <strong>Check</strong>."
      ],
      hints: [
        "Concatenation means joining pieces of text together. Quoted text stays the same; variable names are swapped for their values.",
        "Alternate quoted pieces and variables, with <code>+</code> between each one. Put spaces at the edges of the quoted pieces so the words don't run together.",
        "The weather line is <code>Console.WriteLine(\"Weather for \" + town + \": \" + temperature + \" degrees\");</code>"
      ],
      mistakes: [
        { wrong: "Missing spaces, so it prints <code>Weather forEnniskillen:11degrees</code>.", fix: "Spaces only appear if they're inside the quotes. Add them at the start or end of the quoted pieces." },
        { wrong: "Putting a variable inside quotes: <code>\"Weather for town\"</code>.", fix: "That prints the word <em>town</em>. Close the quotes, then use <code>+ town +</code>." },
        { wrong: "Forgetting a <code>+</code> between two pieces, giving an error.", fix: "Every piece needs a <code>+</code> between it and the next one." },
        { wrong: "Forgetting the space at the start of <code>\" will be wet tomorrow\"</code>.", fix: "Without it you get <code>Enniskillenwill be wet</code>. Add a space after the opening quote." }
      ]
    },
    {
      id: "m02-l5",
      title: "String interpolation",
      type: "code",
      learn: cs`<p>Concatenation works, but all those <code>+</code> signs and quotes get messy. C# has a neater way called <strong>string interpolation</strong>. Put a <code>$</code> before the opening quote, then write variable names inside curly braces <code>{ }</code>:</p>
<pre><code class="cs">string name = "Ben";
int age = 15;
Console.WriteLine($"{name} is {age} years old.");</code></pre>
<pre><code>Ben is 15 years old.</code></pre>
<p>Compare with concatenation:</p>
<pre><code class="cs">Console.WriteLine(name + " is " + age + " years old.");</code></pre>
<p>Same output, but the interpolated version reads almost like the finished sentence. It's what most C# programmers use.</p>
<h3>Calculations inside the braces</h3>
<p>You can put a small calculation inside the braces and C# works it out first:</p>
<pre><code class="cs">int tickets = 3;
int pricePerTicket = 8;
Console.WriteLine($"{tickets} tickets cost £{tickets * pricePerTicket}");</code></pre>
<pre><code>3 tickets cost £24</code></pre>
<div class="warn">Forget the <code>$</code> and C# prints the braces literally: <code>{name} is {age} years old.</code> If you see curly brackets in your output, check for the missing <code>$</code>!</div>`,
      instructions: [
        "Create <code>string player = \"Grace\";</code>, <code>int tries = 2;</code> and <code>int conversions = 1;</code>",
        "Using interpolation (<code>$\"...\"</code>), print <code>Grace scored 2 tries and 1 conversion.</code>",
        "In rugby a try is worth 5 points and a conversion 2. Using a calculation inside the braces, print <code>Total points: 12</code>"
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: declare player, tries and conversions

        // TODO: print Grace scored 2 tries and 1 conversion. using $"..."

        // TODO: print Total points: 12 (work it out inside the braces)

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        string player = "Grace";
        int tries = 2;
        int conversions = 1;

        Console.WriteLine($"{player} scored {tries} tries and {conversions} conversion.");
        Console.WriteLine($"Total points: {tries * 5 + conversions * 2}");
    }
}`,
      tests: [
        { type: "output", includes: "Grace scored 2 tries and 1 conversion.", msg: "Print Grace scored 2 tries and 1 conversion.",
          help: "Your output needs exactly <code>Grace scored 2 tries and 1 conversion.</code> with the full stop. If you see curly braces in your output, you've forgotten the <code>$</code> before the opening quote." },
        { type: "output", includes: "Total points: 12", msg: "Print Total points: 12",
          help: "This check looks for <code>Total points: 12</code>. Tries are worth 5 and conversions 2, so the sum is <code>tries * 5 + conversions * 2</code>. If you get a different number, check the calculation." },
        { type: "code", pattern: "\\$\"[^\"]*\\{\\s*player\\s*\\}", msg: "Use interpolation: put {player} inside a $\"...\" string.",
          help: "This check looks for <code>{player}</code> inside a string that starts with <code>$\"</code>. Typing the name Grace directly, or using <code>+</code>, won't pass." },
        { type: "code", pattern: "\\{[^}\"]*tries[^}\"]*\\*[^}\"]*\\}|\\{[^}\"]*\\*[^}\"]*tries[^}\"]*\\}", msg: "Work out the total inside the braces, e.g. {tries * 5 + conversions * 2}.",
          help: "This check looks for a calculation using <code>tries</code> and <code>*</code> inside the curly braces. Typing <code>12</code> yourself won't pass: let the computer work it out." }
      ],
      hint: "Console.WriteLine($\"{player} scored {tries} tries ...\"); and for the total: {tries * 5 + conversions * 2}",
      goal: "When it runs, your program prints how many tries and conversions Grace scored, then her total points (12), worked out by the program.",
      steps: [
        "Under the first <code>// TODO</code>, declare <code>string player = \"Grace\";</code>, <code>int tries = 2;</code> and <code>int conversions = 1;</code>",
        "Under the second <code>// TODO</code>, type <code>Console.WriteLine($\"{player} scored {tries} tries and {conversions} conversion.\");</code>",
        "Press <strong>Run</strong>. Check there are no curly braces showing in the output.",
        "Under the last <code>// TODO</code>, write <code>Console.WriteLine($\"Total points: { }\");</code> and put the calculation inside the braces.",
        "Press <strong>Run</strong>. You should see <code>Total points: 12</code>. Then press <strong>Check</strong>."
      ],
      hints: [
        "Interpolation lets you drop variables straight into a sentence. You can also put a small sum inside the braces.",
        "Start the string with <code>$\"</code> and put each variable name in <code>{ }</code>. For the total, multiply tries by 5 and conversions by 2 and add them.",
        "The total line is <code>Console.WriteLine($\"Total points: {tries * 5 + conversions * 2}\");</code>"
      ],
      mistakes: [
        { wrong: "Forgetting the <code>$</code>, so the output shows <code>{player} scored {tries}...</code>", fix: "Put <code>$</code> immediately before the opening double quote: <code>$\"...\"</code>." },
        { wrong: "Putting a space between <code>$</code> and the quote: <code>$ \"...\"</code>", fix: "The <code>$</code> must touch the quote: <code>$\"</code>." },
        { wrong: "Typing <code>Total points: 12</code> as plain text.", fix: "The task wants the program to calculate it. Use <code>{tries * 5 + conversions * 2}</code>." },
        { wrong: "Writing <code>tries</code> instead of <code>conversion</code> at the end, or missing the full stop.", fix: "Compare your sentence word by word with the instructions: it ends <code>1 conversion.</code>" }
      ]
    },
    {
      id: "m02-l6",
      title: "Constants and var",
      type: "code",
      learn: cs`<p>Some values should <strong>never</strong> change while a program runs: the number of minutes in an hour, VAT at 20%, the price of a school dinner this term. For these you use a constant.</p>
<div class="key"><strong>Constant</strong> a named value that is set once and cannot be changed while the program runs.</div>
<pre><code class="cs">const double VatRate = 0.2;
const int MaxPlayers = 15;</code></pre>
<p>Add <code>const</code> in front, and you <em>must</em> give it a value straight away. If you try to change it later, the compiler stops you:</p>
<pre><code class="cs">MaxPlayers = 16;   // ✗ The left-hand side of an assignment must be a variable</code></pre>
<p>Why bother? If the dinner price goes up, you change it in <strong>one place</strong> and every calculation updates. It also stops you (or a teammate) changing it by accident. In C#, constants are usually named in PascalCase (capital first letter), like <code>MaxPlayers</code>.</p>
<h3>var</h3>
<p>Sometimes the type is obvious from the value. The keyword <code>var</code> lets C# work out the type for you:</p>
<pre><code class="cs">var lives = 3;          // C# decides: int
var hero = "Aoife";     // C# decides: string
var speed = 2.5;        // C# decides: double</code></pre>
<p>The variable still has a fixed type. <code>lives</code> is an <code>int</code> forever, so <code>lives = "lots";</code> is still an error. For GCSE, writing the type in full is clearer, but you'll see <code>var</code> a lot in real code.</p>
<h3>Scope</h3>
<p>A variable only exists inside the braces <code>{ }</code> where it was declared, from that line onwards. That region is its <strong>scope</strong>. Use a variable before it's declared, or outside its braces, and you'll get <code>The name '...' does not exist in the current context</code>.</p>`,
      instructions: [
        "Declare a constant <code>const decimal DinnerPrice = 2.60m;</code>",
        "Use <code>var</code> to declare <code>days</code> with the value <code>5</code>.",
        "Print <code>A dinner costs £2.60</code> and then <code>5 dinners cost £13.00</code>, using <code>DinnerPrice</code> and <code>days</code> (work out the total with <code>*</code>)."
      ],
      starter: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        // TODO: constant DinnerPrice (decimal, 2.60m)

        // TODO: var days = 5

        // TODO: print A dinner costs £2.60
        // TODO: print 5 dinners cost £13.00

    }
}`,
      solution: cs`using System;

class Program
{
    static void Main(string[] args)
    {
        const decimal DinnerPrice = 2.60m;
        var days = 5;

        Console.WriteLine($"A dinner costs £{DinnerPrice}");
        Console.WriteLine($"{days} dinners cost £{DinnerPrice * days}");
    }
}`,
      tests: [
        { type: "code", pattern: "const\\s+decimal\\s+DinnerPrice\\s*=\\s*2\\.60m", msg: "Declare const decimal DinnerPrice = 2.60m;",
          help: "This check looks for <code>const decimal DinnerPrice = 2.60m</code>. Check the word <code>const</code> at the start, the capital D and P, and the <code>m</code> after the number." },
        { type: "code", pattern: "var\\s+days\\s*=\\s*5\\s*;", msg: "Declare days using var.",
          help: "This check looks for <code>var days = 5;</code>. Use the word <code>var</code> instead of <code>int</code> for this one." },
        { type: "outputRegex", pattern: "A dinner costs £2\\.60?", msg: "Print A dinner costs £2.60",
          help: "Your output needs <code>A dinner costs £2.60</code>. Use interpolation, e.g. <code>$\"A dinner costs £{DinnerPrice}\"</code>, and check the £ sign is inside the quotes." },
        { type: "outputRegex", pattern: "5 dinners cost £13(\\.00)?(?!\\d)", msg: "Print 5 dinners cost £13.00",
          help: "Your output needs <code>5 dinners cost £13.00</code>. If you see <code>£2.605</code> or similar, you've joined the numbers instead of multiplying: put <code>DinnerPrice * days</code> inside one pair of braces." },
        { type: "code", pattern: "DinnerPrice\\s*\\*\\s*days|days\\s*\\*\\s*DinnerPrice", msg: "Calculate the total with DinnerPrice * days.",
          help: "This check looks for <code>DinnerPrice * days</code> in your code. Typing 13.00 yourself won't pass: let the program multiply." }
      ],
      hint: "A decimal keeps its 2 decimal places, so 2.60m * 5 prints 13.00. Use $\"{days} dinners cost £{DinnerPrice * days}\".",
      goal: "When it runs, your program prints the price of one dinner (£2.60) and the cost of 5 dinners (£13.00), worked out from a constant.",
      steps: [
        "Under the first <code>// TODO</code>, type <code>const decimal DinnerPrice = 2.60m;</code>",
        "Under the second <code>// TODO</code>, type <code>var days = 5;</code>",
        "Under the next <code>// TODO</code>, type <code>Console.WriteLine($\"A dinner costs £{DinnerPrice}\");</code> and press <strong>Run</strong>.",
        "Under the last <code>// TODO</code>, print a sentence that starts with <code>{days}</code> and ends with <code>£{DinnerPrice * days}</code>.",
        "Press <strong>Run</strong>, check you see <code>5 dinners cost £13.00</code>, then press <strong>Check</strong>."
      ],
      hints: [
        "A constant is a value that never changes. You can use it in calculations just like a normal variable.",
        "Put <code>const</code> before the type for the dinner price. Use interpolation and put the multiplication <code>DinnerPrice * days</code> inside the braces.",
        "The last line is <code>Console.WriteLine($\"{days} dinners cost £{DinnerPrice * days}\");</code>"
      ],
      mistakes: [
        { wrong: "Writing <code>decimal DinnerPrice</code> without <code>const</code>.", fix: "Add the word <code>const</code> at the very start of the line." },
        { wrong: "Missing the <code>m</code> on <code>2.60m</code>, giving a type error.", fix: "Decimal values need <code>m</code> on the end." },
        { wrong: "Using <code>int days = 5;</code>", fix: "This task practises <code>var</code>: write <code>var days = 5;</code>" },
        { wrong: "Putting the <code>£</code> outside the quotes, or forgetting the <code>$</code>.", fix: "Everything you want printed, including <code>£</code>, goes inside <code>$\"...\"</code>." }
      ]
    },
    {
      id: "m02-quiz",
      title: "Checkpoint: variables and data types",
      type: "quiz",
      questions: [
        { q: "Which data type is best for storing a phone number such as 07700900123?", options: ["int", "double", "string", "bool"], answer: 2, explain: "Phone numbers aren't used in calculations and the leading 0 would be lost in an int." },
        { q: "What does int score = 10; then score = 15; leave in score?", options: ["10", "15", "25", "An error"], answer: 1, explain: "Assignment replaces the old value, so score holds 15." },
        { q: "Which is a correctly declared char?", options: ["char c = \"A\";", "char c = 'A';", "char c = A;", "char c = 'AB';"], answer: 1, explain: "A char holds one character, in single quotes." },
        { q: "Which variable name follows C# camelCase and the naming rules?", options: ["Total Score", "2ndPlace", "totalScore", "total-score"], answer: 2, explain: "camelCase starts lower case and capitalises each following word. Names can't contain spaces or hyphens or start with a digit." },
        { q: "What is a constant?", options: ["A variable that can only hold whole numbers", "A named value that cannot change while the program runs", "Any number typed into the code", "A variable declared with var"], answer: 1, explain: "Constants (const) are set once and can't be reassigned." },
        { q: "What does Console.WriteLine(\"Total: \" + 4 + 6); print?", options: ["Total: 10", "Total: 46", "Total: 4 6", "An error"], answer: 1, explain: "C# works left to right: \"Total: \" + 4 is a string, then 6 is joined on, giving Total: 46." },
        { q: "Which type should you normally use for money in C#?", options: ["int", "decimal", "char", "bool"], answer: 1, explain: "decimal stores pounds and pence exactly; double can have tiny rounding errors." },
        { q: "What does Console.WriteLine($\"Hi {name}\"); need in order to work?", options: ["name must be declared before this line, in scope", "Nothing; it always prints Hi {name}", "name must be a constant", "A + between the parts"], answer: 0, explain: "Interpolation inserts the value of the variable, so name must exist (be in scope) at that point." }
      ]
    }
  ]
});
})();
