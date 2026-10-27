// Module 12: Classes and objects
(function () {
  const cs = String.raw;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const trim = (s) => s.replace(/^\n+/, "").replace(/\s+$/, "");
  const pre = (s) => `<pre><code class="cs">${esc(trim(s))}</code></pre>`;
  const out = (s) => `<pre><code>${esc(trim(s))}</code></pre>`;
  // classes go above Program, in the same file
  function prog(classes, body, opts) {
    opts = opts || {};
    const ind = (s, n) => trim(s).split("\n").map((l) => (l.trim() ? " ".repeat(n) + l : "")).join("\n");
    let src = (opts.usings || "using System;") + "\n\n";
    if (classes) src += trim(classes) + "\n\n";
    src += "class Program\n{\n";
    if (opts.before) src += ind(opts.before, 4) + "\n\n";
    src += "    static void Main(string[] args)\n    {\n" + ind(body, 8) + "\n    }\n";
    if (opts.after) src += "\n" + ind(opts.after, 4) + "\n";
    return src + "}\n";
  }
  const LIST = { usings: "using System;\nusing System.Collections.Generic;" };

  COURSE.addModule({
    id: "m12",
    title: "Classes and objects",
    icon: "cube",
    summary: "Start object-oriented programming: design classes with fields, constructors, methods and properties, and create objects from them.",
    lessons: [
      // ------------------------------------------------------------------ l1
      {
        id: "m12-l1",
        title: "What is OOP? Classes and objects",
        type: "code",
        learn: cs`
<p>Imagine writing a game with 30 rugby players. Each one has a name, a position and a number of tries. With what you know so far you'd need parallel arrays: <code>names[]</code>, <code>positions[]</code>, <code>tries[]</code>, and you'd have to keep them all in step. <strong>Object-oriented programming (OOP)</strong> lets you bundle the data about one thing, and the code that works on it, into a single unit.</p>
<div class="key"><strong>Class</strong> a blueprint or template that describes what an object will store (attributes) and what it can do (methods).</div>
<div class="key"><strong>Object</strong> one actual thing made from a class, also called an <strong>instance</strong>. A <code>Player</code> class could make 30 player objects.</div>
<p>Think of a class like a cake tin and objects as the cakes: one tin, many cakes, each with different decorations.</p>
${pre(cs`
class Player
{
    public string Name;
    public string Position;
    public int Tries;
}

class Program
{
    static void Main(string[] args)
    {
        Player p1 = new Player();     // create an object
        p1.Name = "Oisin";
        p1.Position = "Winger";
        p1.Tries = 3;
        Console.WriteLine($"{p1.Name} ({p1.Position}) has {p1.Tries} tries");
    }
}`)}
<p><code>new Player()</code> creates (instantiates) an object; <code>p1</code> is a variable that refers to it. The dot <code>.</code> reaches inside an object to its attributes.</p>
<div class="tip">On this site, your classes go in the same file as <code>Program</code>, above it. In Visual Studio, each class usually gets its own file: right-click the project, then <strong>Add &gt; Class</strong>, and name it <code>Player.cs</code>. Both work exactly the same.</div>`,
        instructions: [
          "Above <code>Program</code>, finish the <code>Pet</code> class with three public fields: <code>string Name</code>, <code>string Species</code> and <code>int Age</code>.",
          "In <code>Main</code>, create a <code>Pet</code> object, set its name to <code>Biscuit</code>, species to <code>dog</code> and age to <code>4</code>.",
          "Print <code>Biscuit is a 4 year old dog</code> using the object's fields."
        ],
        starter: prog(cs`
class Pet
{
    // TODO: add public fields Name, Species and Age
}`, cs`
// TODO: create a Pet object, set its fields and print it`),
        solution: prog(cs`
class Pet
{
    public string Name;
    public string Species;
    public int Age;
}`, cs`
Pet pet = new Pet();
pet.Name = "Biscuit";
pet.Species = "dog";
pet.Age = 4;
Console.WriteLine($"{pet.Name} is a {pet.Age} year old {pet.Species}");`),
        tests: [
          { type: "output", includes: "Biscuit is a 4 year old dog", msg: "Print Biscuit is a 4 year old dog", help: "Your program should print <code>Biscuit is a 4 year old dog</code>. Check the spelling and that you set all three fields." },
          { type: "code", pattern: "new\\s+Pet\\s*\\(", msg: "Create the object with new Pet().", help: "This check looks for <code>new Pet(</code> in your code. Create the object with <code>Pet pet = new Pet();</code>" },
          { type: "code", pattern: "\\.Species", msg: "Use the Species field of your object.", help: "This check looks for <code>.Species</code> in your code. Use <code>pet.Species</code> when you build the sentence." },
          { type: "codeNot", pattern: "WriteLine\\(\\s*\"Biscuit is", msg: "Build the sentence from the object's fields, not a fixed string.", help: "Your sentence must be built from the object's fields, not typed as one fixed string. Use <code>$\"{pet.Name} is a ...\"</code>." }
        ],
        hint: "Pet pet = new Pet(); pet.Name = \"Biscuit\"; ... then Console.WriteLine($\"{pet.Name} is a {pet.Age} year old {pet.Species}\");",
        goal: "The program makes a Pet object for Biscuit and prints a sentence about it using the object's own data.",
        steps: [
          "Scroll to the <code>Pet</code> class at the top and find <code>// TODO: add public fields</code>.",
          "Add three fields: <code>public string Name;</code>, <code>public string Species;</code> and <code>public int Age;</code>",
          "Go down to <code>Main</code> and create the object: <code>Pet pet = new Pet();</code>",
          "Set each field with the dot, e.g. <code>pet.Name = \"Biscuit\";</code>, then do the same for <code>Species</code> (<code>\"dog\"</code>) and <code>Age</code> (<code>4</code>).",
          "Print the sentence from the fields: <code>$\"{pet.Name} is a {pet.Age} year old {pet.Species}\"</code>. Run it."
        ],
        hints: [
          "The class is the blueprint; <code>Main</code> needs to build one actual pet from it and fill in its details.",
          "Add three <code>public</code> fields to the class. In <code>Main</code>, use <code>new Pet()</code>, then <code>pet.Name = ...</code> and so on, then an interpolated string.",
          "<code>Pet pet = new Pet(); pet.Name = \"Biscuit\"; pet.Species = \"dog\"; pet.Age = 4;</code>"
        ],
        mistakes: [
          { wrong: "Forgetting <code>new</code>: <code>Pet pet = Pet();</code> or just <code>Pet pet;</code>", fix: "Objects are created with <code>new</code>: <code>Pet pet = new Pet();</code>" },
          { wrong: "Leaving out <code>public</code>, so <code>Main</code> says the field is inaccessible.", fix: "Fields are private by default. Write <code>public string Name;</code> for this lesson." },
          { wrong: "Typing <code>Console.WriteLine(\"Biscuit is a 4 year old dog\");</code> as a fixed string.", fix: "Build the sentence from <code>pet.Name</code>, <code>pet.Age</code> and <code>pet.Species</code>." },
          { wrong: "Putting the fields inside <code>Main</code> instead of the class.", fix: "Fields belong between the <code>{ }</code> of <code>class Pet</code>." }
        ]
      },

      // ------------------------------------------------------------------ l2
      {
        id: "m12-l2",
        title: "Constructors",
        type: "code",
        learn: cs`
<p>Setting every field one line at a time is slow, and it's easy to forget one. A <strong>constructor</strong> is a special method that runs automatically when an object is created with <code>new</code>. It sets up the object's starting values.</p>
${pre(cs`
class Film
{
    public string Title;
    public int Minutes;
    public string Rating;

    public Film(string title, int minutes, string rating)
    {
        Title = title;
        Minutes = minutes;
        Rating = rating;
    }
}

Film f = new Film("Paddington", 103, "PG");
Console.WriteLine(f.Title + " lasts " + f.Minutes + " minutes");`)}
<p>A constructor:</p>
<ul>
<li>has <strong>exactly the same name as the class</strong>;</li>
<li>has <strong>no return type</strong>, not even <code>void</code>;</li>
<li>usually takes parameters and copies them into the fields.</li>
</ul>
<p>Now an object can't be created without its data: <code>new Film()</code> with no arguments gives a compile error, which protects you from half-built objects.</p>
<div class="tip">If a parameter has the same name as a field, use <code>this.</code> to mean "the field of this object": <code>this.title = title;</code>. You'll see that style in the final project.</div>`,
        instructions: [
          "Add a constructor to <code>Pet</code> that takes a name, species and age and stores them in the fields.",
          "In <code>Main</code>, create two pets with the constructor: <code>Luna</code>, <code>cat</code>, <code>2</code> and <code>Pepper</code>, <code>rabbit</code>, <code>1</code>.",
          "Print a line for each, e.g. <code>Luna is a 2 year old cat</code> and <code>Pepper is a 1 year old rabbit</code>."
        ],
        starter: prog(cs`
class Pet
{
    public string Name;
    public string Species;
    public int Age;

    // TODO: add a constructor
}`, cs`
// TODO: create two pets using the constructor and print them`),
        solution: prog(cs`
class Pet
{
    public string Name;
    public string Species;
    public int Age;

    public Pet(string name, string species, int age)
    {
        Name = name;
        Species = species;
        Age = age;
    }
}`, cs`
Pet first = new Pet("Luna", "cat", 2);
Pet second = new Pet("Pepper", "rabbit", 1);
Console.WriteLine($"{first.Name} is a {first.Age} year old {first.Species}");
Console.WriteLine($"{second.Name} is a {second.Age} year old {second.Species}");`),
        tests: [
          { type: "output", includes: "Luna is a 2 year old cat", msg: "Print Luna is a 2 year old cat", help: "Your program should print <code>Luna is a 2 year old cat</code>. If a word is missing, check the constructor copies every parameter into its field." },
          { type: "output", includes: "Pepper is a 1 year old rabbit", msg: "Print Pepper is a 1 year old rabbit", help: "Your program should print <code>Pepper is a 1 year old rabbit</code>. Create a second pet and print it the same way." },
          { type: "code", pattern: "public\\s+Pet\\s*\\(\\s*string", msg: "Write a constructor public Pet(string name, string species, int age).", help: "This check looks for <code>public Pet(string</code> in your code. Write the constructor with the same name as the class and no return type." },
          { type: "code", pattern: "new\\s+Pet\\s*\\(\\s*\"Luna\"", msg: "Create Luna with new Pet(\"Luna\", \"cat\", 2).", help: "This check looks for <code>new Pet(\"Luna\"</code>. Create Luna with <code>new Pet(\"Luna\", \"cat\", 2)</code>." }
        ],
        hint: "public Pet(string name, string species, int age) { Name = name; Species = species; Age = age; }",
        goal: "The program creates two pets in one line each using a constructor and prints a sentence about each.",
        steps: [
          "Scroll to the <code>Pet</code> class and find <code>// TODO: add a constructor</code>.",
          "Start the constructor with the same name as the class and no return type: <code>public Pet(string name, string species, int age)</code>",
          "Inside its <code>{ }</code>, copy each parameter into a field: <code>Name = name;</code>, <code>Species = species;</code>, <code>Age = age;</code>",
          "In <code>Main</code>, create <code>Pet first = new Pet(\"Luna\", \"cat\", 2);</code> and a second pet for Pepper.",
          "Print a sentence for each, e.g. <code>$\"{first.Name} is a {first.Age} year old {first.Species}\"</code>. Run it."
        ],
        hints: [
          "A constructor runs when you write <code>new</code>. It takes the starting values as parameters and stores them in the fields.",
          "Write <code>public Pet(string name, string species, int age) { ... }</code> with no <code>void</code>. Then pass three values in <code>new Pet(...)</code>.",
          "<code>public Pet(string name, string species, int age) { Name = name; Species = species; Age = age; }</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>public void Pet(...)</code>.", fix: "A constructor has no return type at all, not even <code>void</code>." },
          { wrong: "Writing <code>name = name;</code>, which just copies the parameter onto itself, so the field stays empty.", fix: "Assign to the field: <code>Name = name;</code> (capital N), or <code>this.name = name;</code> if the names match exactly." },
          { wrong: "Still writing <code>new Pet()</code> with no arguments.", fix: "Pass the values in order: <code>new Pet(\"Luna\", \"cat\", 2)</code>." },
          { wrong: "Putting the arguments in the wrong order, giving <code>Luna is a 2 year old Luna</code>.", fix: "The order must match the constructor: name, species, age." }
        ]
      },

      // ------------------------------------------------------------------ l3
      {
        id: "m12-l3",
        title: "Methods: what objects can do",
        type: "code",
        learn: cs`
<p>Objects don't just store data, they have <strong>behaviour</strong> too. A method written inside a class (without <code>static</code>) belongs to each object and can use that object's own fields.</p>
${pre(cs`
class Player
{
    public string Name;
    public int Tries;

    public Player(string name)
    {
        Name = name;
        Tries = 0;
    }

    public void ScoreTry()
    {
        Tries++;
        Console.WriteLine($"Try for {Name}!");
    }

    public int Points()
    {
        return Tries * 5;
    }
}`)}
${pre(cs`
Player a = new Player("Aoife");
Player b = new Player("Grace");
a.ScoreTry();
a.ScoreTry();
b.ScoreTry();
Console.WriteLine($"{a.Name}: {a.Points()} points");   // Aoife: 10 points
Console.WriteLine($"{b.Name}: {b.Points()} points");   // Grace: 5 points`)}
<p>Notice that <code>a.ScoreTry()</code> only changes Aoife's tries. Each object has its <strong>own copy</strong> of the fields, so its <strong>state</strong> is separate from every other object's.</p>
<div class="key"><strong>Method</strong> a subroutine that belongs to a class and describes something its objects can do. <strong>Attribute</strong> a piece of data an object stores (a field or property).</div>`,
        instructions: [
          "Finish the <code>BankAccount</code> class. <code>Deposit(double amount)</code> adds to <code>Balance</code>.",
          "<code>Withdraw(double amount)</code> takes money off only if there's enough; otherwise it prints <code>Insufficient funds</code> and leaves the balance alone.",
          "<code>Show()</code> prints the owner and balance like <code>Niamh: £15.00</code> (use <code>{Balance:F2}</code>). The <code>Main</code> method is done for you."
        ],
        starter: prog(cs`
class BankAccount
{
    public string Owner;
    public double Balance;

    public BankAccount(string owner)
    {
        Owner = owner;
        Balance = 0;
    }

    public void Deposit(double amount)
    {
        // TODO
    }

    public void Withdraw(double amount)
    {
        // TODO
    }

    public void Show()
    {
        // TODO
    }
}`, cs`
BankAccount account = new BankAccount("Niamh");
account.Deposit(20);
account.Withdraw(5);
account.Show();
account.Withdraw(50);
account.Show();`),
        solution: prog(cs`
class BankAccount
{
    public string Owner;
    public double Balance;

    public BankAccount(string owner)
    {
        Owner = owner;
        Balance = 0;
    }

    public void Deposit(double amount)
    {
        Balance += amount;
    }

    public void Withdraw(double amount)
    {
        if (amount <= Balance)
        {
            Balance -= amount;
        }
        else
        {
            Console.WriteLine("Insufficient funds");
        }
    }

    public void Show()
    {
        Console.WriteLine($"{Owner}: £{Balance:F2}");
    }
}`, cs`
BankAccount account = new BankAccount("Niamh");
account.Deposit(20);
account.Withdraw(5);
account.Show();
account.Withdraw(50);
account.Show();`),
        tests: [
          { type: "outputRegex", pattern: "Niamh: £15\\.00[\\s\\S]*Insufficient funds[\\s\\S]*Niamh: £15\\.00", msg: "Expected Niamh: £15.00, then Insufficient funds, then Niamh: £15.00 again.", help: "Main deposits 20, withdraws 5 and then tries to withdraw 50. You should see <code>Niamh: £15.00</code>, then <code>Insufficient funds</code>, then <code>Niamh: £15.00</code> again. Check Deposit adds, Withdraw checks first, and Show uses <code>:F2</code>." },
          { type: "fn", fn: (o) => (o.match(/Insufficient funds/g) || []).length === 1, msg: "Insufficient funds should only print once (for the £50 withdrawal).", help: "<code>Insufficient funds</code> should only appear once, for the £50. If it appears for the £5 too, check your <code>if</code> uses <code>amount &lt;= Balance</code>." },
          { type: "code", pattern: "Balance\\s*\\+=|Balance\\s*=\\s*Balance\\s*\\+", msg: "Deposit should add the amount to Balance.", help: "This check looks at Deposit: it should add to <code>Balance</code> with <code>Balance += amount;</code>" }
        ],
        hint: "In Withdraw: if (amount <= Balance) { Balance -= amount; } else { Console.WriteLine(\"Insufficient funds\"); }",
        goal: "The program creates Niamh's bank account, pays in and takes out money, and refuses a withdrawal she can't afford.",
        steps: [
          "Scroll to <code>Deposit</code> in the <code>BankAccount</code> class and replace the TODO with <code>Balance += amount;</code>",
          "Find <code>Withdraw</code>. Add <code>if (amount &lt;= Balance)</code> and inside it <code>Balance -= amount;</code>",
          "Add an <code>else</code> that prints <code>Insufficient funds</code>.",
          "Find <code>Show</code> and print <code>$\"{Owner}: £{Balance:F2}\"</code>.",
          "Main is done for you. Run it: you should see <code>Niamh: £15.00</code>, <code>Insufficient funds</code>, then <code>Niamh: £15.00</code> again."
        ],
        hints: [
          "Each method changes or shows this object's own <code>Balance</code>. Withdraw must check first that there's enough.",
          "Use <code>+=</code> in Deposit and <code>-=</code> in Withdraw, inside an <code>if</code>/<code>else</code>. In Show, use <code>:F2</code> for two decimal places.",
          "<code>if (amount &lt;= Balance) { Balance -= amount; } else { Console.WriteLine(\"Insufficient funds\"); }</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>Balance = amount;</code> in Deposit, which replaces the balance instead of adding to it.", fix: "Use <code>Balance += amount;</code>" },
          { wrong: "Taking the money off before checking, so the balance goes negative.", fix: "Only do <code>Balance -= amount;</code> inside the <code>if (amount &lt;= Balance)</code> block." },
          { wrong: "Using <code>&lt;</code> instead of <code>&lt;=</code>, so you can't withdraw your exact balance.", fix: "Withdrawing exactly what you have is allowed: use <code>&lt;=</code>." },
          { wrong: "Printing <code>{Balance}</code> without <code>:F2</code>, giving <code>Niamh: £15</code>.", fix: "Write <code>£{Balance:F2}</code> to show <code>15.00</code>." }
        ]
      },

      // ------------------------------------------------------------------ l4
      {
        id: "m12-l4",
        title: "Encapsulation and private fields",
        type: "code",
        learn: cs`
<p>Last lesson, nothing stopped <code>Main</code> writing <code>account.Balance = 1000000;</code>. Public fields can be changed by any code, to any value. That's dangerous.</p>
<p>The fix is to make fields <code>private</code>. Only code <em>inside</em> the class can then see or change them. Other code has to go through the class's public methods, which can check the request first.</p>
${pre(cs`
class Ticket
{
    private int seatsLeft = 50;

    public bool Book(int seats)
    {
        if (seats < 1 || seats > seatsLeft) return false;
        seatsLeft -= seats;
        return true;
    }

    public int GetSeatsLeft()
    {
        return seatsLeft;
    }
}`)}
<p>If you try <code>t.seatsLeft = 999;</code> in <code>Main</code>, the program won't compile:</p>
${out(cs`Line 22: 'Ticket.seatsLeft' is inaccessible due to its protection level`)}
<div class="key"><strong>Encapsulation</strong> keeping an object's data and methods together in a class, and hiding the data (making it private) so it can only be changed in controlled ways through the class's methods.</div>
<p>Encapsulation means the object is always in a valid state: you can't book more seats than exist, or have a negative balance. It also means you can change how the class works inside without breaking the code that uses it.</p>
<div class="tip">If you don't write <code>public</code> or <code>private</code>, a member is private by default. Many programmers start private field names with a lower-case letter.</div>`,
        instructions: [
          "Make the <code>balance</code> field <code>private</code>. Press <code>Run</code> to see the error caused by the cheat line in <code>Main</code>, then delete that line.",
          "Add a public method <code>GetBalance()</code> that returns the balance.",
          "Make <code>Deposit</code> ignore amounts of 0 or less, printing <code>Deposit must be positive</code>. Main should then print <code>Balance: £20.00</code> at the end."
        ],
        starter: prog(cs`
class BankAccount
{
    public double balance;

    public void Deposit(double amount)
    {
        balance += amount;
    }

    // TODO: add GetBalance()
}`, cs`
BankAccount account = new BankAccount();
account.Deposit(20);
account.Deposit(-500);
account.balance = 1000000;   // TODO: delete this cheat once balance is private

Console.WriteLine($"Balance: £{account.balance:F2}");   // TODO: use GetBalance()`),
        solution: prog(cs`
class BankAccount
{
    private double balance;

    public void Deposit(double amount)
    {
        if (amount <= 0)
        {
            Console.WriteLine("Deposit must be positive");
            return;
        }
        balance += amount;
    }

    public double GetBalance()
    {
        return balance;
    }
}`, cs`
BankAccount account = new BankAccount();
account.Deposit(20);
account.Deposit(-500);

Console.WriteLine($"Balance: £{account.GetBalance():F2}");`),
        tests: [
          { type: "code", pattern: "private\\s+double\\s+balance", msg: "Make balance a private field.", help: "This check looks for <code>private double balance</code> in your code. Change <code>public</code> to <code>private</code> on the field." },
          { type: "output", includes: "Deposit must be positive", msg: "Depositing -500 should print Deposit must be positive", help: "Main tries to deposit -500. Your program should print <code>Deposit must be positive</code>. Add an <code>if (amount &lt;= 0)</code> check at the start of Deposit." },
          { type: "output", includes: "Balance: £20.00", msg: "The final balance should be £20.00", help: "The final line should be <code>Balance: £20.00</code>. If it's -480, add <code>return;</code> after the warning. If it's 1000000, delete the cheat line." },
          { type: "code", pattern: "GetBalance\\s*\\(", msg: "Add and use a GetBalance() method.", help: "This check looks for <code>GetBalance(</code> in your code. Add the method and use it in the last <code>WriteLine</code>." }
        ],
        hint: "Change public to private on the field. Add public double GetBalance() { return balance; }. In Main, delete the cheat line and use account.GetBalance().",
        goal: "The program protects the bank balance so it can only change through Deposit, rejects a negative deposit, and shows Balance: £20.00.",
        steps: [
          "At the top of <code>BankAccount</code>, change <code>public double balance;</code> to <code>private double balance;</code>",
          "Press Run. Read the error about the cheat line in <code>Main</code>, then delete that whole line.",
          "Replace <code>// TODO: add GetBalance()</code> with <code>public double GetBalance() { return balance; }</code>",
          "In <code>Main</code>, change the last line to use <code>account.GetBalance()</code> instead of <code>account.balance</code>.",
          "In <code>Deposit</code>, add a check at the top: if <code>amount &lt;= 0</code>, print <code>Deposit must be positive</code> and <code>return;</code>. Run it."
        ],
        hints: [
          "Hide the field so nothing outside the class can change it, then give the outside world a safe way to read it.",
          "Make the field <code>private</code>, add a <code>public</code> method that returns it, and use an <code>if</code> with <code>return;</code> in Deposit to refuse bad amounts.",
          "<code>if (amount &lt;= 0) { Console.WriteLine(\"Deposit must be positive\"); return; }</code>"
        ],
        mistakes: [
          { wrong: "Leaving the cheat line <code>account.balance = 1000000;</code> in <code>Main</code>.", fix: "Once the field is private that line won't compile. Delete it." },
          { wrong: "Still using <code>account.balance</code> in the final <code>WriteLine</code>.", fix: "Use the method instead: <code>account.GetBalance()</code>." },
          { wrong: "Printing the warning but forgetting <code>return;</code>, so the -500 is still added.", fix: "Add <code>return;</code> after the message (or put <code>balance += amount;</code> in an <code>else</code>)." },
          { wrong: "Making a public property to get round the private field.", fix: "This lesson wants a <code>GetBalance()</code> method, and no way to <em>set</em> the balance from outside." }
        ]
      },

      // ------------------------------------------------------------------ l5
      {
        id: "m12-l5",
        title: "Properties",
        type: "code",
        learn: cs`
<p>Writing <code>GetX()</code> and <code>SetX()</code> methods for every field gets tedious. C# has <strong>properties</strong>: they look like fields from the outside but can control access like methods.</p>
<h3>Auto-properties</h3>
${pre(cs`
public string Name { get; set; }          // anyone can read and change
public int Points { get; private set; }   // anyone can read; only the class can change`)}
<h3>Full properties with validation</h3>
<p>When you need a check, write a <strong>private field</strong> plus a property with a <code>get</code> and a <code>set</code>. Inside <code>set</code>, the keyword <code>value</code> is whatever was assigned:</p>
${pre(cs`
private int age;
public int Age
{
    get { return age; }
    set
    {
        if (value < 0) throw new ArgumentException("Age cannot be negative.");
        age = value;
    }
}`)}
<h3>Calculated properties</h3>
<p>A property with only a <code>get</code> can work out its value from other data every time it's used:</p>
${pre(cs`
public double Average
{
    get { return (double)Points / Games; }
}`)}
<p>From outside, all of these are used like fields: <code>p.Name = "Ben";</code>, <code>Console.WriteLine(p.Average);</code>. Trying <code>p.Points = 99;</code> from <code>Main</code> gives a compile error because the setter is private.</p>
<div class="tip">C# naming: properties use <code>PascalCase</code> (<code>Name</code>), private fields use <code>camelCase</code> (<code>name</code>).</div>`,
        instructions: [
          "Give <code>Pupil</code> an auto-property <code>Name</code> with <code>{ get; private set; }</code>, set in the constructor.",
          "Add a full property <code>Mark</code> backed by a private field <code>mark</code>. Its <code>set</code> must throw <code>new ArgumentException(\"Mark must be 0 to 100.\")</code> if the value is below 0 or above 100.",
          "Add a calculated read-only property <code>Passed</code> that returns <code>true</code> when <code>Mark</code> is 40 or more. Main prints <code>Grace: 72 passed True</code>, then the error message, then <code>Grace: 35 passed False</code>."
        ],
        starter: prog(cs`
class Pupil
{
    // TODO: Name auto-property with a private set

    // TODO: private field mark and a full property Mark with validation

    // TODO: calculated property Passed

    public Pupil(string name)
    {
        // TODO: set Name
    }
}`, cs`
Pupil p = new Pupil("Grace");
// p.Mark = 72;
// Console.WriteLine($"{p.Name}: {p.Mark} passed {p.Passed}");
try
{
    // p.Mark = 150;
}
catch (ArgumentException ex)
{
    Console.WriteLine(ex.Message);
}
// p.Mark = 35;
// Console.WriteLine($"{p.Name}: {p.Mark} passed {p.Passed}");
// TODO: remove the // from the lines above once your properties work`),
        solution: prog(cs`
class Pupil
{
    public string Name { get; private set; }

    private int mark;
    public int Mark
    {
        get { return mark; }
        set
        {
            if (value < 0 || value > 100)
            {
                throw new ArgumentException("Mark must be 0 to 100.");
            }
            mark = value;
        }
    }

    public bool Passed
    {
        get { return Mark >= 40; }
    }

    public Pupil(string name)
    {
        Name = name;
    }
}`, cs`
Pupil p = new Pupil("Grace");
p.Mark = 72;
Console.WriteLine($"{p.Name}: {p.Mark} passed {p.Passed}");
try
{
    p.Mark = 150;
}
catch (ArgumentException ex)
{
    Console.WriteLine(ex.Message);
}
p.Mark = 35;
Console.WriteLine($"{p.Name}: {p.Mark} passed {p.Passed}");`),
        tests: [
          { type: "output", includes: "Grace: 72 passed True", msg: "Print Grace: 72 passed True", help: "After <code>p.Mark = 72</code>, your program should print <code>Grace: 72 passed True</code>. Check you've uncommented the lines in <code>Main</code>, set <code>Name</code> in the constructor, and that <code>Passed</code> uses <code>Mark &gt;= 40</code>." },
          { type: "output", includes: "Mark must be 0 to 100.", msg: "Setting Mark to 150 should throw an ArgumentException with the message Mark must be 0 to 100.", help: "Setting <code>Mark</code> to 150 should throw an exception with the message <code>Mark must be 0 to 100.</code> Put the <code>throw</code> inside the property's <code>set</code>." },
          { type: "output", includes: "Grace: 35 passed False", msg: "Print Grace: 35 passed False", help: "After <code>p.Mark = 35</code>, it should print <code>Grace: 35 passed False</code>. Make sure the setter stores <code>mark = value;</code> after the check." },
          { type: "code", pattern: "Name\\s*\\{\\s*get;\\s*private\\s+set;\\s*\\}", msg: "Name should be { get; private set; }", help: "This check looks for <code>Name { get; private set; }</code> exactly. Use that auto-property for <code>Name</code>." },
          { type: "code", pattern: "set\\s*\\{[\\s\\S]*value", msg: "Use value inside the Mark setter.", help: "This check looks for <code>value</code> inside a <code>set { }</code> block. Write a full property for <code>Mark</code>, not an auto-property." }
        ],
        hint: "private int mark; public int Mark { get { return mark; } set { if (value < 0 || value > 100) throw new ArgumentException(\"Mark must be 0 to 100.\"); mark = value; } }",
        goal: "The program stores a pupil's mark through a property that refuses marks outside 0 to 100, and says whether they passed.",
        steps: [
          "In the <code>Pupil</code> class, replace the first TODO with <code>public string Name { get; private set; }</code>",
          "In the constructor, set it: <code>Name = name;</code>",
          "Replace the second TODO with a private field <code>private int mark;</code> and a property <code>public int Mark { get { return mark; } set { ... } }</code>",
          "Inside <code>set</code>, if <code>value &lt; 0 || value &gt; 100</code>, throw <code>new ArgumentException(\"Mark must be 0 to 100.\")</code>. Then write <code>mark = value;</code>",
          "Replace the third TODO with <code>public bool Passed { get { return Mark &gt;= 40; } }</code>",
          "In <code>Main</code>, remove the <code>//</code> from the five commented lines. Run it."
        ],
        hints: [
          "A property looks like a field from outside but runs code when you read or set it. The <code>set</code> part is where the checking goes.",
          "You need a private field <code>mark</code>, a full property <code>Mark</code> with <code>get</code> and <code>set</code>, and the keyword <code>value</code> inside <code>set</code>.",
          "<code>public int Mark { get { return mark; } set { if (value &lt; 0 || value &gt; 100) throw new ArgumentException(\"Mark must be 0 to 100.\"); mark = value; } }</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>Mark = value;</code> inside the <code>Mark</code> setter, which calls itself forever and crashes.", fix: "Store it in the lower-case field: <code>mark = value;</code>" },
          { wrong: "Making <code>mark</code> a public field instead of using a property.", fix: "Keep <code>private int mark;</code> and let everyone go through <code>public int Mark { get; set; }</code> so the check always runs." },
          { wrong: "Forgetting to remove the <code>//</code> in <code>Main</code>, so nothing prints.", fix: "Uncomment all the lines in <code>Main</code> once your class compiles." },
          { wrong: "Writing <code>Passed</code> as <code>Mark &gt; 40</code>.", fix: "40 counts as a pass: <code>Mark &gt;= 40</code>." }
        ]
      },

      // ------------------------------------------------------------------ l6
      {
        id: "m12-l6",
        title: "ToString and lists of objects",
        type: "code",
        learn: cs`
<p>Try <code>Console.WriteLine(film);</code> on an object and you get the class name, e.g. <code>Film</code>. Not very useful! Every class has a <code>ToString()</code> method, and you can <strong>override</strong> it to choose how your objects are shown:</p>
${pre(cs`
class Film
{
    public string Title { get; private set; }
    public int Minutes { get; private set; }

    public Film(string title, int minutes)
    {
        Title = title;
        Minutes = minutes;
    }

    public override string ToString()
    {
        return $"{Title} ({Minutes} mins)";
    }
}`)}
<p>Now <code>Console.WriteLine(film)</code>, <code>"Now showing: " + film</code> and <code>$"{film}"</code> all use your <code>ToString</code>. (You'll learn exactly what <code>override</code> means in the next module.)</p>
<h3>Lists of objects</h3>
<p>A <code>List&lt;Film&gt;</code> holds as many films as you like. Loop through it to search or total:</p>
${pre(cs`
List<Film> films = new List<Film>();
films.Add(new Film("Paddington", 103));
films.Add(new Film("Wicked", 160));

int total = 0;
foreach (Film f in films)
{
    Console.WriteLine(f);
    total += f.Minutes;
}
Console.WriteLine($"Total: {total} mins");`)}
<p>This is what replaces messy parallel arrays: one list, each item a complete object.</p>`,
        instructions: [
          "Override <code>ToString()</code> in <code>Player</code> so it returns e.g. <code>Aoife (Winger) - 4 tries</code>.",
          "In <code>Main</code>, add three players to the <code>squad</code> list: <code>Aoife</code>, <code>Winger</code>, 4; <code>Ben</code>, <code>Prop</code>, 1; <code>Grace</code>, <code>Centre</code>, 6.",
          "Print every player using <code>Console.WriteLine(player)</code>, then print <code>Top try scorer: Grace</code> by searching the list."
        ],
        starter: prog(cs`
class Player
{
    public string Name { get; private set; }
    public string Position { get; private set; }
    public int Tries { get; private set; }

    public Player(string name, string position, int tries)
    {
        Name = name;
        Position = position;
        Tries = tries;
    }

    // TODO: override ToString()
}`, cs`
List<Player> squad = new List<Player>();
// TODO: add three players

// TODO: print each player and the top try scorer`, LIST),
        solution: prog(cs`
class Player
{
    public string Name { get; private set; }
    public string Position { get; private set; }
    public int Tries { get; private set; }

    public Player(string name, string position, int tries)
    {
        Name = name;
        Position = position;
        Tries = tries;
    }

    public override string ToString()
    {
        return $"{Name} ({Position}) - {Tries} tries";
    }
}`, cs`
List<Player> squad = new List<Player>();
squad.Add(new Player("Aoife", "Winger", 4));
squad.Add(new Player("Ben", "Prop", 1));
squad.Add(new Player("Grace", "Centre", 6));

Player top = squad[0];
foreach (Player player in squad)
{
    Console.WriteLine(player);
    if (player.Tries > top.Tries)
    {
        top = player;
    }
}
Console.WriteLine($"Top try scorer: {top.Name}");`, LIST),
        tests: [
          { type: "output", includes: "Aoife (Winger) - 4 tries", msg: "Print Aoife (Winger) - 4 tries", help: "Your program should print <code>Aoife (Winger) - 4 tries</code>. Check the brackets, spaces and dash in your <code>ToString</code>." },
          { type: "outputRegex", pattern: "Ben \\(Prop\\) - 1 tries[\\s\\S]*Grace \\(Centre\\) - 6 tries", msg: "Print Ben and Grace in the same format.", help: "Ben and Grace should be printed in the same format. Add all three players with <code>new Player(...)</code> and print each in the loop." },
          { type: "output", includes: "Top try scorer: Grace", msg: "Print Top try scorer: Grace", help: "It should print <code>Top try scorer: Grace</code>. Keep the best player in <code>top</code> and update it when <code>player.Tries &gt; top.Tries</code>." },
          { type: "code", pattern: "override\\s+string\\s+ToString", msg: "Override ToString in Player.", help: "This check looks for <code>override string ToString</code> in your code. Don't forget the word <code>override</code>." }
        ],
        hint: "public override string ToString() { return $\"{Name} ({Position}) - {Tries} tries\"; }. To find the top scorer, keep the best Player so far in a variable.",
        goal: "The program lists three rugby players in a neat format and names the top try scorer.",
        steps: [
          "In the <code>Player</code> class, replace the TODO with <code>public override string ToString()</code> and a <code>{ }</code> block.",
          "Make it <code>return $\"{Name} ({Position}) - {Tries} tries\";</code>",
          "In <code>Main</code>, add the players: <code>squad.Add(new Player(\"Aoife\", \"Winger\", 4));</code>, then Ben and Grace.",
          "Set up <code>Player top = squad[0];</code>, then loop with <code>foreach (Player player in squad)</code>.",
          "Inside the loop, print <code>Console.WriteLine(player);</code> and if <code>player.Tries &gt; top.Tries</code> set <code>top = player;</code>",
          "After the loop, print <code>$\"Top try scorer: {top.Name}\"</code>. Run it."
        ],
        hints: [
          "<code>Console.WriteLine(player)</code> calls the object's <code>ToString()</code>. Replace it with your own version. For the top scorer, remember the best player so far.",
          "Use <code>public override string ToString()</code> in the class. In <code>Main</code>, a <code>foreach</code> loop over <code>squad</code> both prints and compares <code>Tries</code>.",
          "<code>Player top = squad[0]; foreach (Player player in squad) { Console.WriteLine(player); if (player.Tries &gt; top.Tries) { top = player; } }</code>"
        ],
        mistakes: [
          { wrong: "Missing <code>override</code>: <code>public string ToString()</code>.", fix: "You're replacing a method every class already has, so write <code>public override string ToString()</code>." },
          { wrong: "Printing inside <code>ToString</code> with <code>Console.WriteLine</code> instead of returning the text.", fix: "<code>ToString</code> must <code>return</code> a string; <code>Main</code> does the printing." },
          { wrong: "Forgetting <code>new</code>: <code>squad.Add(Player(\"Aoife\", \"Winger\", 4));</code>", fix: "Create each object with <code>new Player(...)</code>." },
          { wrong: "Setting <code>top</code> to the last player in the list rather than the one with the most tries.", fix: "Only change <code>top</code> inside <code>if (player.Tries &gt; top.Tries)</code>." }
        ]
      },

      // ------------------------------------------------------------------ l7
      {
        id: "m12-l7",
        title: "Static vs instance",
        type: "code",
        learn: cs`
<p>Everything in your classes so far has been an <strong>instance</strong> member: each object gets its own copy. Sometimes data belongs to the <em>class as a whole</em> instead. That's what <code>static</code> means.</p>
${pre(cs`
class Ticket
{
    public static int Sold = 0;     // one shared value for the whole class
    public string Film { get; private set; }
    public int Number { get; private set; }

    public Ticket(string film)
    {
        Sold++;
        Number = Sold;               // each ticket gets the next number
        Film = film;
    }

    public static double Price(int age)  // doesn't need any ticket object
    {
        return age < 12 ? 5.50 : 8.00;
    }
}`)}
${pre(cs`
Ticket a = new Ticket("Wicked");
Ticket b = new Ticket("Paddington");
Console.WriteLine(b.Number);           // 2  (instance: use the object)
Console.WriteLine(Ticket.Sold);        // 2  (static: use the class name)
Console.WriteLine(Ticket.Price(9));    // 5.5`)}
<p>That's why <code>Main</code> and the methods you wrote earlier in the course were <code>static</code>: they belong to <code>Program</code> and run without creating a <code>Program</code> object. If you call an instance method from <code>Main</code> without an object, you get the error <em>"An object reference is required for the non-static field, method, or property"</em>.</p>
<div class="key"><strong>Static</strong> belongs to the class itself, shared by all objects; accessed with the class name. <strong>Instance</strong> belongs to one object; accessed through that object.</div>`,
        instructions: [
          "Add a <code>public static int Count</code> to <code>Pet</code> that goes up by 1 in the constructor.",
          "Add an instance property <code>Id</code> (<code>{ get; private set; }</code>) set to the new <code>Count</code> in the constructor, and a <code>ToString</code> that returns e.g. <code>#1 Biscuit</code>.",
          "In Main, create pets <code>Biscuit</code>, <code>Luna</code> and <code>Max</code>, print each one, then print <code>Pets registered: 3</code> using <code>Pet.Count</code>."
        ],
        starter: prog(cs`
class Pet
{
    // TODO: static Count

    public string Name { get; private set; }
    // TODO: Id property

    public Pet(string name)
    {
        Name = name;
        // TODO: update Count and Id
    }

    // TODO: ToString
}`, cs`
// TODO: create three pets, print them and the count`),
        solution: prog(cs`
class Pet
{
    public static int Count = 0;

    public string Name { get; private set; }
    public int Id { get; private set; }

    public Pet(string name)
    {
        Name = name;
        Count++;
        Id = Count;
    }

    public override string ToString()
    {
        return $"#{Id} {Name}";
    }
}`, cs`
Pet a = new Pet("Biscuit");
Pet b = new Pet("Luna");
Pet c = new Pet("Max");
Console.WriteLine(a);
Console.WriteLine(b);
Console.WriteLine(c);
Console.WriteLine($"Pets registered: {Pet.Count}");`),
        tests: [
          { type: "outputRegex", pattern: "#1 Biscuit\\s*\\n#2 Luna\\s*\\n#3 Max", msg: "Print #1 Biscuit, #2 Luna, #3 Max on separate lines.", help: "The pets should print as <code>#1 Biscuit</code>, <code>#2 Luna</code>, <code>#3 Max</code> on separate lines. If they're all #1, make <code>Count</code> static and do <code>Count++</code> before <code>Id = Count</code>." },
          { type: "output", includes: "Pets registered: 3", msg: "Print Pets registered: 3", help: "It should print <code>Pets registered: 3</code>. Use <code>Pet.Count</code> after creating all three pets." },
          { type: "code", pattern: "static\\s+int\\s+Count", msg: "Make Count a static int.", help: "This check looks for <code>static int Count</code> in your code. Add the word <code>static</code> to the field." },
          { type: "code", pattern: "Pet\\.Count", msg: "Use Pet.Count (the class name) to read the static field.", help: "This check looks for <code>Pet.Count</code> in your code. Read the static field through the class name, not an object." }
        ],
        hint: "public static int Count = 0; In the constructor: Count++; Id = Count;",
        goal: "The program registers three pets, gives each one an ID number in order, and counts how many there are.",
        steps: [
          "In the <code>Pet</code> class, replace <code>// TODO: static Count</code> with <code>public static int Count = 0;</code>",
          "Replace <code>// TODO: Id property</code> with <code>public int Id { get; private set; }</code>",
          "In the constructor, add <code>Count++;</code> and then <code>Id = Count;</code>",
          "Add <code>public override string ToString() { return $\"#{Id} {Name}\"; }</code>",
          "In <code>Main</code>, create Biscuit, Luna and Max with <code>new Pet(...)</code> and print each one.",
          "Print <code>$\"Pets registered: {Pet.Count}\"</code> using the class name. Run it."
        ],
        hints: [
          "One number is shared by the whole class (the count), but each pet has its own ID. Which keyword makes a field shared?",
          "Mark <code>Count</code> as <code>static</code>. Increase it in the constructor, then copy it into the instance property <code>Id</code>. Read it with <code>Pet.Count</code>.",
          "<code>public Pet(string name) { Name = name; Count++; Id = Count; }</code>"
        ],
        mistakes: [
          { wrong: "Making <code>Count</code> a normal (non-static) field, so every pet shows <code>#1</code>.", fix: "Add <code>static</code>: <code>public static int Count = 0;</code> Then there's only one shared count." },
          { wrong: "Setting <code>Id = Count;</code> before <code>Count++;</code>, so the IDs start at 0.", fix: "Increase the count first, then copy it into <code>Id</code>." },
          { wrong: "Reading the count as <code>a.Count</code>.", fix: "Static members belong to the class: use <code>Pet.Count</code>." },
          { wrong: "Forgetting <code>override</code> on <code>ToString</code>, so it prints <code>Pet</code>.", fix: "Write <code>public override string ToString()</code>." }
        ]
      },

      // ------------------------------------------------------------------ quiz
      {
        id: "m12-quiz",
        title: "Checkpoint: classes and objects",
        type: "quiz",
        questions: [
          { q: "What is the difference between a class and an object?",
            options: ["They're the same thing", "A class is a blueprint; an object is an instance made from it", "An object is a blueprint; a class is made from it", "A class stores numbers, an object stores text"],
            answer: 1, explain: "The class describes the attributes and methods; each object is one instance with its own data." },
          { q: "Which line creates a new object?",
            options: ["Pet p;", "Pet p = new Pet(\"Luna\");", "class Pet { }", "p.Name = \"Luna\";"],
            answer: 1, explain: "The new keyword calls the constructor and creates (instantiates) an object." },
          { q: "Which is true about a constructor?",
            options: ["It must return an int", "It has the same name as the class and no return type", "It must be static", "It is called with .Constructor()"],
            answer: 1, explain: "Constructors share the class name, have no return type and run automatically with new." },
          { q: "<code>Main</code> runs <code>acc.balance = 50;</code> but <code>balance</code> is private. What happens?",
            options: ["The balance becomes 50", "A run-time exception", "A compile error: it is inaccessible due to its protection level", "It is silently ignored"],
            answer: 2, explain: "Private members can only be used inside their own class. This is enforced when compiling." },
          { q: "What is <strong>encapsulation</strong>?",
            options: ["Making one class from another", "Bundling data and methods in a class and hiding the data behind methods/properties", "Using many objects in a list", "Converting a string to an object"],
            answer: 1, explain: "Encapsulation protects an object's data so it can only change in controlled, valid ways." },
          { q: "In a property's <code>set</code> block, what does <code>value</code> hold?",
            options: ["The old value", "The value being assigned", "Always 0", "The name of the property"],
            answer: 1, explain: "value is the new value on the right of the = sign." },
          { q: "Why override <code>ToString()</code>?",
            options: ["To make the object print in a useful, readable way", "To convert numbers to text faster", "Because every class must", "To make fields private"],
            answer: 0, explain: "Console.WriteLine, + and $\"\" all call ToString, so your version controls what's shown." },
          { q: "A <code>static</code> field…",
            options: ["Is different in every object", "Can never change", "Belongs to the class and is shared by all objects", "Can only be used in Main"],
            answer: 2, explain: "Static members belong to the class itself, accessed with the class name." }
        ]
      }
    ]
  });
})();
