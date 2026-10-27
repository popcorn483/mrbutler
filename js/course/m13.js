// Module 13: Inheritance and polymorphism
(function () {
  const cs = String.raw;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const trim = (s) => s.replace(/^\n+/, "").replace(/\s+$/, "");
  const pre = (s) => `<pre><code class="cs">${esc(trim(s))}</code></pre>`;
  const out = (s) => `<pre><code>${esc(trim(s))}</code></pre>`;
  function prog(classes, body, opts) {
    opts = opts || {};
    const ind = (s, n) => trim(s).split("\n").map((l) => (l.trim() ? " ".repeat(n) + l : "")).join("\n");
    let src = (opts.usings || "using System;\nusing System.Collections.Generic;") + "\n\n";
    if (classes) src += trim(classes) + "\n\n";
    src += "class Program\n{\n";
    src += "    static void Main(string[] args)\n    {\n" + ind(body, 8) + "\n    }\n";
    return src + "}\n";
  }

  const ANIMAL = cs`
class Animal
{
    public string Name { get; private set; }

    public Animal(string name)
    {
        Name = name;
    }

    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }
}`;

  COURSE.addModule({
    id: "m13",
    title: "Inheritance and polymorphism",
    icon: "tree",
    summary: "Build families of classes that share code, override behaviour and treat different objects in the same way.",
    lessons: [
      // ------------------------------------------------------------------ l1
      {
        id: "m13-l1",
        title: "Inheritance",
        type: "code",
        learn: cs`
<p>A cinema sells standard tickets, child tickets and VIP tickets. They all have a film and a seat, but each has something extra. Copying the same fields into three classes would be wasteful, and a bug fixed in one copy would stay broken in the others.</p>
<p><strong>Inheritance</strong> lets a new class be built on top of an existing one. The new class (the <strong>child</strong> or <strong>subclass</strong>) automatically gets all the public members of the <strong>parent</strong> (<strong>base class</strong> or superclass) and adds its own.</p>
${pre(cs`
class Animal
{
    public string Name { get; private set; }
    public Animal(string name) { Name = name; }
    public void Eat() { Console.WriteLine($"{Name} is eating."); }
}

class Dog : Animal                       // Dog inherits from Animal
{
    public Dog(string name) : base(name)  // pass name up to Animal's constructor
    {
    }

    public void Fetch() { Console.WriteLine($"{Name} fetches the ball!"); }
}`)}
${pre(cs`
Dog d = new Dog("Biscuit");
d.Eat();      // inherited from Animal
d.Fetch();    // Dog's own method`)}
<ul>
<li><code>class Dog : Animal</code> means "Dog <em>is an</em> Animal". Read the colon as "inherits from".</li>
<li><code>: base(name)</code> calls the parent's constructor so the inherited parts get set up.</li>
</ul>
<div class="key"><strong>Inheritance</strong> creating a new class from an existing class. The subclass inherits the attributes and methods of the base class and can add its own. Use it when there's an "is a" relationship.</div>`,
        instructions: [
          "Add a class <code>Cat</code> that inherits from <code>Animal</code>, with a constructor that passes the name up using <code>: base(name)</code>.",
          "Give <code>Cat</code> a method <code>Purr()</code> that prints e.g. <code>Luna purrs.</code>",
          "In Main, create a cat called <code>Luna</code>, then call <code>Eat()</code> and <code>Purr()</code> so it prints <code>Luna is eating.</code> and <code>Luna purrs.</code>"
        ],
        starter: prog(ANIMAL + cs`


// TODO: class Cat : Animal`, cs`
// TODO: create a Cat called Luna, call Eat() and Purr()`),
        solution: prog(ANIMAL + cs`


class Cat : Animal
{
    public Cat(string name) : base(name)
    {
    }

    public void Purr()
    {
        Console.WriteLine($"{Name} purrs.");
    }
}`, cs`
Cat luna = new Cat("Luna");
luna.Eat();
luna.Purr();`),
        tests: [
          { type: "output", includes: "Luna is eating.", msg: "Call the inherited Eat() method to print Luna is eating.", help: "Your program should print <code>Luna is eating.</code> Create the cat and call <code>luna.Eat();</code> (the method comes from Animal)." },
          { type: "output", includes: "Luna purrs.", msg: "Print Luna purrs. from Purr().", help: "Your program should print <code>Luna purrs.</code> Add a <code>Purr()</code> method to <code>Cat</code> and call it." },
          { type: "code", pattern: "class\\s+Cat\\s*:\\s*Animal", msg: "Cat must inherit from Animal (class Cat : Animal).", help: "This check looks for <code>class Cat : Animal</code> in your code. Put the colon and <code>Animal</code> after the class name." },
          { type: "code", pattern: ":\\s*base\\s*\\(\\s*name\\s*\\)", msg: "Use : base(name) in the Cat constructor.", help: "This check looks for <code>: base(name)</code> after the Cat constructor's brackets." }
        ],
        hint: "class Cat : Animal { public Cat(string name) : base(name) { } public void Purr() { Console.WriteLine($\"{Name} purrs.\"); } }",
        goal: "The program creates a cat called Luna that can eat (inherited from Animal) and purr (its own method).",
        steps: [
          "Scroll to <code>// TODO: class Cat : Animal</code> under the <code>Animal</code> class.",
          "Start the class: <code>class Cat : Animal</code> with a <code>{ }</code> block.",
          "Add the constructor: <code>public Cat(string name) : base(name) { }</code> The body can stay empty.",
          "Add <code>public void Purr()</code> that prints <code>$\"{Name} purrs.\"</code>",
          "In <code>Main</code>, create <code>Cat luna = new Cat(\"Luna\");</code>, then call <code>luna.Eat();</code> and <code>luna.Purr();</code>. Run it."
        ],
        hints: [
          "<code>Cat</code> should get everything <code>Animal</code> has for free, and add one thing of its own.",
          "Use a colon to inherit (<code>class Cat : Animal</code>) and <code>: base(name)</code> after the constructor so <code>Animal</code> stores the name.",
          "<code>public Cat(string name) : base(name) { }</code>"
        ],
        mistakes: [
          { wrong: "Forgetting <code>: base(name)</code>, which gives an error that <code>Animal</code> has no constructor with 0 arguments.", fix: "Pass the name up: <code>public Cat(string name) : base(name) { }</code>" },
          { wrong: "Trying <code>Name = name;</code> in the Cat constructor.", fix: "<code>Name</code> has a <code>private set</code> in <code>Animal</code>, so only Animal can set it. Use <code>: base(name)</code> instead." },
          { wrong: "Copying the <code>Eat()</code> method into <code>Cat</code>.", fix: "There's no need: <code>Cat</code> inherits <code>Eat()</code> from <code>Animal</code>." },
          { wrong: "Forgetting <code>new</code>: <code>Cat luna = Cat(\"Luna\");</code>", fix: "Write <code>new Cat(\"Luna\")</code>." }
        ]
      },

      // ------------------------------------------------------------------ l2
      {
        id: "m13-l2",
        title: "Protected members",
        type: "code",
        learn: cs`
<p>Private members are hidden from <em>everyone</em> outside the class, and that includes subclasses. Sometimes a child class needs to use a field that the rest of the program shouldn't touch. That's what <code>protected</code> is for.</p>
<table>
<tr><th>Access</th><th>Same class</th><th>Subclasses</th><th>Everywhere else</th></tr>
<tr><td><code>public</code></td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
<tr><td><code>protected</code></td><td>Yes</td><td>Yes</td><td>No</td></tr>
<tr><td><code>private</code></td><td>Yes</td><td>No</td><td>No</td></tr>
</table>
${pre(cs`
class Ticket
{
    protected double price;
    public Ticket(double price) { this.price = price; }
    public double GetPrice() { return price; }
}

class ChildTicket : Ticket
{
    public ChildTicket(double price) : base(price) { }

    public void ApplyDiscount()
    {
        price = price / 2;      // allowed: ChildTicket is a subclass
    }
}`)}
<p>In <code>Main</code>, <code>t.price = 0;</code> still won't compile, so encapsulation is kept, but the family of classes can share the data.</p>
<div class="tip">Constructors in a base class can also be <code>protected</code>. Then only subclasses can call them. You'll see that in the quiz project's <code>Question</code> class.</div>`,
        instructions: [
          "<code>Account</code> has a <code>protected double balance</code>. Finish <code>SavingsAccount.AddInterest()</code> so it adds 5% interest to <code>balance</code> (multiply by 1.05).",
          "Main creates a savings account with £200, adds interest and prints <code>Balance: £210.00</code>. Don't change the <code>protected</code> field to public."
        ],
        starter: prog(cs`
class Account
{
    protected double balance;

    public Account(double opening)
    {
        balance = opening;
    }

    public double GetBalance()
    {
        return balance;
    }
}

class SavingsAccount : Account
{
    public SavingsAccount(double opening) : base(opening)
    {
    }

    public void AddInterest()
    {
        // TODO: add 5% interest to balance
    }
}`, cs`
SavingsAccount savings = new SavingsAccount(200);
savings.AddInterest();
Console.WriteLine($"Balance: £{savings.GetBalance():F2}");`),
        solution: prog(cs`
class Account
{
    protected double balance;

    public Account(double opening)
    {
        balance = opening;
    }

    public double GetBalance()
    {
        return balance;
    }
}

class SavingsAccount : Account
{
    public SavingsAccount(double opening) : base(opening)
    {
    }

    public void AddInterest()
    {
        balance = balance * 1.05;
    }
}`, cs`
SavingsAccount savings = new SavingsAccount(200);
savings.AddInterest();
Console.WriteLine($"Balance: £{savings.GetBalance():F2}");`),
        tests: [
          { type: "output", includes: "Balance: £210.00", msg: "£200 plus 5% interest should print Balance: £210.00", help: "£200 plus 5% interest should print <code>Balance: £210.00</code>. In <code>AddInterest</code>, write <code>balance = balance * 1.05;</code>" },
          { type: "code", pattern: "protected\\s+double\\s+balance", msg: "Keep balance protected.", help: "This check looks for <code>protected double balance</code>. Don't change or remove that line in <code>Account</code>." },
          { type: "codeNot", pattern: "public\\s+double\\s+balance", msg: "Don't make balance public.", help: "This check fails if it finds <code>public double balance</code>. Keep the field <code>protected</code>." }
        ],
        hint: "Inside AddInterest: balance = balance * 1.05; (or balance *= 1.05;)",
        goal: "The program opens a savings account with £200, adds 5% interest and shows Balance: £210.00.",
        steps: [
          "Scroll to <code>SavingsAccount</code> and find <code>AddInterest()</code>.",
          "Replace the TODO with <code>balance = balance * 1.05;</code> (you can use <code>balance</code> here because it's <code>protected</code>).",
          "Leave <code>protected double balance;</code> in <code>Account</code> exactly as it is.",
          "Run it: you should see <code>Balance: £210.00</code>."
        ],
        hints: [
          "<code>SavingsAccount</code> is a child of <code>Account</code>, so it's allowed to use the protected field directly.",
          "Change <code>balance</code> inside <code>AddInterest</code>. Adding 5% is the same as multiplying by 1.05.",
          "<code>balance *= 1.05;</code>"
        ],
        mistakes: [
          { wrong: "Changing <code>protected</code> to <code>public</code> to make the error go away.", fix: "Keep it <code>protected</code>. A subclass can already use it." },
          { wrong: "Multiplying by <code>0.05</code>, which gives £10 instead of £210.", fix: "Multiply by <code>1.05</code> (the original plus 5%), or add <code>balance * 0.05</code>." },
          { wrong: "Changing the balance from <code>Main</code>, e.g. <code>savings.balance = 210;</code>", fix: "<code>Main</code> isn't a subclass, so it can't see <code>balance</code>. Do the change inside <code>AddInterest</code>." }
        ]
      },

      // ------------------------------------------------------------------ l3
      {
        id: "m13-l3",
        title: "virtual, override and base",
        type: "code",
        learn: cs`
<p>Sometimes a subclass needs to do the same job <em>differently</em>. Every animal makes a sound, but not the same one. To allow this:</p>
<ol>
<li>mark the method in the base class <code>virtual</code> ("subclasses may replace this");</li>
<li>write a method with the same name and parameters in the subclass, marked <code>override</code>.</li>
</ol>
${pre(cs`
class Animal
{
    public string Name { get; private set; }
    public Animal(string name) { Name = name; }

    public virtual string Speak()
    {
        return "...";
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }

    public override string Speak()
    {
        return "Woof!";
    }
}`)}
<h3>Building on the parent with base.</h3>
<p>An override doesn't have to throw the parent's version away. <code>base.Method()</code> calls the parent's version, so you can add to it:</p>
${pre(cs`
class Ticket
{
    public virtual string Describe() { return "Ticket for Screen 1"; }
}

class VipTicket : Ticket
{
    public override string Describe()
    {
        return base.Describe() + " with recliner seat";
    }
}`)}
${out(cs`Ticket for Screen 1 with recliner seat`)}
<p>You've already done this with <code>ToString()</code>: it's a <code>virtual</code> method of every class, which is why you had to write <code>override</code>.</p>`,
        instructions: [
          "Make <code>Describe()</code> in <code>Employee</code> <code>virtual</code>.",
          "In <code>Manager</code>, override <code>Describe()</code> so it returns the base version plus <code> (manages </code>, the team size and <code>)</code>, e.g. <code>Aoife earns £30000 (manages 4)</code>. Use <code>base.Describe()</code>.",
          "Main prints both people: <code>Ben earns £24000</code> and <code>Aoife earns £30000 (manages 4)</code>."
        ],
        starter: prog(cs`
class Employee
{
    public string Name { get; private set; }
    public int Salary { get; private set; }

    public Employee(string name, int salary)
    {
        Name = name;
        Salary = salary;
    }

    public string Describe()
    {
        return $"{Name} earns £{Salary}";
    }
}

class Manager : Employee
{
    public int TeamSize { get; private set; }

    public Manager(string name, int salary, int teamSize) : base(name, salary)
    {
        TeamSize = teamSize;
    }

    // TODO: override Describe() using base.Describe()
}`, cs`
Employee ben = new Employee("Ben", 24000);
Manager aoife = new Manager("Aoife", 30000, 4);
Console.WriteLine(ben.Describe());
Console.WriteLine(aoife.Describe());`),
        solution: prog(cs`
class Employee
{
    public string Name { get; private set; }
    public int Salary { get; private set; }

    public Employee(string name, int salary)
    {
        Name = name;
        Salary = salary;
    }

    public virtual string Describe()
    {
        return $"{Name} earns £{Salary}";
    }
}

class Manager : Employee
{
    public int TeamSize { get; private set; }

    public Manager(string name, int salary, int teamSize) : base(name, salary)
    {
        TeamSize = teamSize;
    }

    public override string Describe()
    {
        return base.Describe() + $" (manages {TeamSize})";
    }
}`, cs`
Employee ben = new Employee("Ben", 24000);
Manager aoife = new Manager("Aoife", 30000, 4);
Console.WriteLine(ben.Describe());
Console.WriteLine(aoife.Describe());`),
        tests: [
          { type: "output", includes: "Ben earns £24000", msg: "Print Ben earns £24000", help: "Your program should print <code>Ben earns £24000</code>. Don't change what <code>Employee.Describe</code> returns." },
          { type: "output", includes: "Aoife earns £30000 (manages 4)", msg: "Print Aoife earns £30000 (manages 4)", help: "Your program should print <code>Aoife earns £30000 (manages 4)</code>. Return <code>base.Describe() + $\" (manages {TeamSize})\"</code> in the override." },
          { type: "code", pattern: "virtual\\s+string\\s+Describe", msg: "Make Describe virtual in Employee.", help: "This check looks for <code>virtual string Describe</code>. Add <code>virtual</code> to the method in <code>Employee</code>." },
          { type: "code", pattern: "override\\s+string\\s+Describe", msg: "Override Describe in Manager.", help: "This check looks for <code>override string Describe</code>. Add the override method to <code>Manager</code>." },
          { type: "code", pattern: "base\\.Describe\\s*\\(", msg: "Call base.Describe() in the override.", help: "This check looks for <code>base.Describe(</code>. Use it in the override to reuse the parent's text." }
        ],
        hint: "public override string Describe() { return base.Describe() + $\" (manages {TeamSize})\"; }",
        goal: "The program describes an employee and a manager, with the manager's description adding how many people they manage.",
        steps: [
          "In <code>Employee</code>, find <code>public string Describe()</code> and add <code>virtual</code>: <code>public virtual string Describe()</code>",
          "Scroll to <code>Manager</code> and find <code>// TODO: override Describe()</code>.",
          "Write <code>public override string Describe()</code> with a <code>{ }</code> block.",
          "Inside, return the parent's text plus the extra part: <code>return base.Describe() + $\" (manages {TeamSize})\";</code>",
          "Run it: you should see <code>Ben earns £24000</code> and <code>Aoife earns £30000 (manages 4)</code>."
        ],
        hints: [
          "The parent has to allow its method to be replaced, and the child has to say it's replacing it. The child can still reuse the parent's version.",
          "Add <code>virtual</code> in <code>Employee</code> and <code>override</code> in <code>Manager</code>. Call the parent's version with <code>base.Describe()</code>.",
          "<code>public override string Describe() { return base.Describe() + $\" (manages {TeamSize})\"; }</code>"
        ],
        mistakes: [
          { wrong: "Missing <code>override</code> in <code>Manager</code>, which gives a warning about hiding the inherited member.", fix: "Write <code>public override string Describe()</code>." },
          { wrong: "Adding <code>override</code> but forgetting <code>virtual</code> in <code>Employee</code>.", fix: "You can only override a method marked <code>virtual</code> (or abstract). Add <code>virtual</code> to the parent." },
          { wrong: "Retyping <code>$\"{Name} earns £{Salary}\"</code> in the override instead of using <code>base.Describe()</code>.", fix: "Reuse the parent's code with <code>base.Describe()</code>." },
          { wrong: "Missing the space before the bracket, giving <code>£30000(manages 4)</code>.", fix: "The added text starts with a space: <code>\" (manages ...)\"</code>." }
        ]
      },

      // ------------------------------------------------------------------ l4
      {
        id: "m13-l4",
        title: "Polymorphism",
        type: "code",
        learn: cs`
<p>Here's where inheritance gets powerful. Because a <code>Dog</code> <em>is an</em> <code>Animal</code>, you can store it in an <code>Animal</code> variable, or in a <code>List&lt;Animal&gt;</code> alongside cats and cows:</p>
${pre(cs`
List<Animal> farm = new List<Animal>();
farm.Add(new Dog("Biscuit"));
farm.Add(new Cat("Luna"));
farm.Add(new Cow("Daisy"));

foreach (Animal a in farm)
{
    Console.WriteLine($"{a.Name} says {a.Speak()}");
}`)}
${out(cs`
Biscuit says Woof!
Luna says Meow!
Daisy says Moo!`)}
<p>The loop only knows it has <code>Animal</code>s, yet each object runs <strong>its own</strong> overridden <code>Speak()</code>. C# decides which version to call while the program runs, based on the real type of each object.</p>
<div class="key"><strong>Polymorphism</strong> ("many forms") the ability to treat objects of different subclasses through the same base-class type, with each object responding to the same method call in its own way.</div>
<p>Why does it matter? Adding a new animal means writing one new class. The loop doesn't change at all. In the final project, a <code>List&lt;Question&gt;</code> holds multiple-choice and true/false questions, and the quiz just calls <code>q.Display()</code> on each one.</p>
<div class="tip">You can check an object's real type with <code>is</code>: <code>if (a is Dog)</code>.</div>`,
        instructions: [
          "Each ticket type overrides <code>Price()</code>: <code>Ticket</code> is 8.00, <code>ChildTicket</code> 5.50 and <code>VipTicket</code> 12.50. Add the <code>override</code> methods to the two subclasses.",
          "In Main, put one of each into a <code>List&lt;Ticket&gt;</code>, plus a second <code>ChildTicket</code> (4 tickets).",
          "Loop through the list printing each ticket's <code>Name</code> and price like <code>Child: £5.50</code>, then print <code>Total: £31.50</code>."
        ],
        starter: prog(cs`
class Ticket
{
    public string Name { get; private set; }

    public Ticket()
    {
        Name = "Adult";
    }

    protected Ticket(string name)
    {
        Name = name;
    }

    public virtual double Price()
    {
        return 8.00;
    }
}

class ChildTicket : Ticket
{
    public ChildTicket() : base("Child")
    {
    }

    // TODO: override Price() to return 5.50
}

class VipTicket : Ticket
{
    public VipTicket() : base("VIP")
    {
    }

    // TODO: override Price() to return 12.50
}`, cs`
List<Ticket> basket = new List<Ticket>();
// TODO: add an adult, a child, a VIP and another child ticket

// TODO: print each ticket and the total`),
        solution: prog(cs`
class Ticket
{
    public string Name { get; private set; }

    public Ticket()
    {
        Name = "Adult";
    }

    protected Ticket(string name)
    {
        Name = name;
    }

    public virtual double Price()
    {
        return 8.00;
    }
}

class ChildTicket : Ticket
{
    public ChildTicket() : base("Child")
    {
    }

    public override double Price()
    {
        return 5.50;
    }
}

class VipTicket : Ticket
{
    public VipTicket() : base("VIP")
    {
    }

    public override double Price()
    {
        return 12.50;
    }
}`, cs`
List<Ticket> basket = new List<Ticket>();
basket.Add(new Ticket());
basket.Add(new ChildTicket());
basket.Add(new VipTicket());
basket.Add(new ChildTicket());

double total = 0;
foreach (Ticket t in basket)
{
    Console.WriteLine($"{t.Name}: £{t.Price():F2}");
    total += t.Price();
}
Console.WriteLine($"Total: £{total:F2}");`),
        tests: [
          { type: "output", includes: "Child: £5.50", msg: "Print Child: £5.50 for a child ticket.", help: "Your program should print <code>Child: £5.50</code>. Override <code>Price()</code> in <code>ChildTicket</code> to return 5.50 and print with <code>:F2</code>." },
          { type: "output", includes: "VIP: £12.50", msg: "Print VIP: £12.50 for the VIP ticket.", help: "Your program should print <code>VIP: £12.50</code>. Override <code>Price()</code> in <code>VipTicket</code>." },
          { type: "output", includes: "Adult: £8.00", msg: "Print Adult: £8.00 for the adult ticket.", help: "Your program should print <code>Adult: £8.00</code>. Add a plain <code>new Ticket()</code> to the basket." },
          { type: "output", includes: "Total: £31.50", msg: "8.00 + 5.50 + 12.50 + 5.50 = Total: £31.50", help: "The total of all four tickets should be <code>Total: £31.50</code>. Check you added two child tickets and that you add <code>t.Price()</code> in the loop." },
          { type: "code", pattern: "foreach\\s*\\(\\s*Ticket\\s+\\w+\\s+in", msg: "Loop through the list with foreach (Ticket t in basket).", help: "This check looks for <code>foreach (Ticket t in basket)</code> (any variable name). Loop through the list as <code>Ticket</code>s." }
        ],
        hint: "In ChildTicket: public override double Price() { return 5.50; } In Main use basket.Add(new ChildTicket()); and a foreach loop that adds t.Price() to a total.",
        goal: "The program fills a basket with adult, child and VIP tickets, lists each with its price and shows the total.",
        steps: [
          "Scroll to <code>ChildTicket</code> and replace its TODO with <code>public override double Price() { return 5.50; }</code>",
          "Do the same in <code>VipTicket</code>, returning <code>12.50</code>.",
          "In <code>Main</code>, add four tickets: <code>basket.Add(new Ticket());</code>, <code>new ChildTicket()</code>, <code>new VipTicket()</code> and another <code>new ChildTicket()</code>.",
          "Set up <code>double total = 0;</code> and loop with <code>foreach (Ticket t in basket)</code>.",
          "In the loop, print <code>$\"{t.Name}: £{t.Price():F2}\"</code> and add <code>t.Price()</code> to <code>total</code>.",
          "After the loop, print <code>$\"Total: £{total:F2}\"</code>. Run it."
        ],
        hints: [
          "The list only knows it holds <code>Ticket</code>s, but each object will use its own version of <code>Price()</code>. That's polymorphism.",
          "Override <code>Price()</code> in both subclasses. In <code>Main</code>, add the objects with <code>basket.Add(new ...)</code> and use one <code>foreach</code> loop to print and total them.",
          "<code>foreach (Ticket t in basket) { Console.WriteLine($\"{t.Name}: £{t.Price():F2}\"); total += t.Price(); }</code>"
        ],
        mistakes: [
          { wrong: "Missing <code>override</code>, so every ticket costs £8.00.", fix: "Write <code>public override double Price()</code> in each subclass." },
          { wrong: "Using <code>if</code> statements in <code>Main</code> to work out the price of each type.", fix: "Let each object do it: just call <code>t.Price()</code>." },
          { wrong: "Forgetting <code>new</code>: <code>basket.Add(ChildTicket());</code>", fix: "Write <code>basket.Add(new ChildTicket());</code>" },
          { wrong: "Only adding one child ticket, giving a total of £26.00.", fix: "The basket needs four tickets: adult, child, VIP and a second child." }
        ]
      },

      // ------------------------------------------------------------------ l5
      {
        id: "m13-l5",
        title: "Abstract classes",
        type: "code",
        learn: cs`
<p>What would <code>new Animal("Thing")</code> even be? Some base classes are only ideas: you'd never want a plain "Shape" or "Question", only a circle or a true/false question. Mark such a class <code>abstract</code>:</p>
${pre(cs`
abstract class Shape
{
    public string Name { get; private set; }
    protected Shape(string name) { Name = name; }

    public abstract double Area();       // no body: every subclass MUST write it

    public void Describe()                // normal methods are still allowed
    {
        Console.WriteLine($"{Name} has area {Area():F1}");
    }
}

class Rectangle : Shape
{
    private double width, height;
    public Rectangle(double w, double h) : base("Rectangle") { width = w; height = h; }
    public override double Area() { return width * height; }
}`)}
<ul>
<li>An <strong>abstract method</strong> has no body, just a semicolon. It's a promise: every (non-abstract) subclass must <code>override</code> it, or the code won't compile.</li>
<li>You <strong>cannot create an object</strong> of an abstract class. <code>new Shape("x")</code> gives:</li>
</ul>
${out(cs`Line 25: Cannot create an instance of the abstract type 'Shape'`)}
<p>But you <em>can</em> have <code>Shape</code> variables and a <code>List&lt;Shape&gt;</code>, which is exactly what polymorphism needs.</p>
<div class="key"><strong>Abstraction</strong> hiding unnecessary detail and showing only what matters. An abstract class defines <em>what</em> its subclasses must be able to do, leaving <em>how</em> to each one.</div>`,
        instructions: [
          "<code>Shape</code> is abstract with an abstract <code>Area()</code>. Add a class <code>Circle : Shape</code> with a private <code>radius</code>, a constructor <code>Circle(double radius)</code> that calls <code>base(\"Circle\")</code>, and an override of <code>Area()</code> that returns <code>Math.PI * radius * radius</code>.",
          "Main is done: it should print <code>Rectangle has area 12.0</code> and <code>Circle has area 28.3</code>.",
          "Optional: try adding <code>new Shape(\"Blob\")</code> to Main and press Run to see the error, then remove it."
        ],
        starter: prog(cs`
abstract class Shape
{
    public string Name { get; private set; }

    protected Shape(string name)
    {
        Name = name;
    }

    public abstract double Area();

    public void Describe()
    {
        Console.WriteLine($"{Name} has area {Area():F1}");
    }
}

class Rectangle : Shape
{
    private double width;
    private double height;

    public Rectangle(double width, double height) : base("Rectangle")
    {
        this.width = width;
        this.height = height;
    }

    public override double Area()
    {
        return width * height;
    }
}

// TODO: class Circle : Shape`, cs`
List<Shape> shapes = new List<Shape>();
shapes.Add(new Rectangle(3, 4));
// TODO: add new Circle(3) to the list once your class is written

foreach (Shape s in shapes)
{
    s.Describe();
}`),
        solution: prog(cs`
abstract class Shape
{
    public string Name { get; private set; }

    protected Shape(string name)
    {
        Name = name;
    }

    public abstract double Area();

    public void Describe()
    {
        Console.WriteLine($"{Name} has area {Area():F1}");
    }
}

class Rectangle : Shape
{
    private double width;
    private double height;

    public Rectangle(double width, double height) : base("Rectangle")
    {
        this.width = width;
        this.height = height;
    }

    public override double Area()
    {
        return width * height;
    }
}

class Circle : Shape
{
    private double radius;

    public Circle(double radius) : base("Circle")
    {
        this.radius = radius;
    }

    public override double Area()
    {
        return Math.PI * radius * radius;
    }
}`, cs`
List<Shape> shapes = new List<Shape>();
shapes.Add(new Rectangle(3, 4));
shapes.Add(new Circle(3));

foreach (Shape s in shapes)
{
    s.Describe();
}`),
        tests: [
          { type: "output", includes: "Rectangle has area 12.0", msg: "Print Rectangle has area 12.0", help: "Your program should still print <code>Rectangle has area 12.0</code>. Don't change <code>Rectangle</code> or the loop in <code>Main</code>." },
          { type: "output", includes: "Circle has area 28.3", msg: "A circle of radius 3 should print Circle has area 28.3", help: "A circle of radius 3 should print <code>Circle has area 28.3</code>. Add <code>new Circle(3)</code> to the list, and use <code>this.radius = radius;</code> in the constructor." },
          { type: "code", pattern: "class\\s+Circle\\s*:\\s*Shape", msg: "Circle must inherit from Shape.", help: "This check looks for <code>class Circle : Shape</code> in your code." },
          { type: "code", pattern: "override\\s+double\\s+Area", msg: "Override Area() in Circle.", help: "This check looks for <code>override double Area</code>. Add the override to <code>Circle</code>." }
        ],
        hint: "class Circle : Shape { private double radius; public Circle(double radius) : base(\"Circle\") { this.radius = radius; } public override double Area() { return Math.PI * radius * radius; } }",
        goal: "The program describes a rectangle and a circle, each working out its own area.",
        steps: [
          "Look at <code>Rectangle</code>: your <code>Circle</code> will follow the same pattern.",
          "At <code>// TODO: class Circle : Shape</code>, start <code>class Circle : Shape</code> and add <code>private double radius;</code>",
          "Add the constructor: <code>public Circle(double radius) : base(\"Circle\")</code> and inside it <code>this.radius = radius;</code>",
          "Add <code>public override double Area()</code> that returns <code>Math.PI * radius * radius</code>.",
          "In <code>Main</code>, replace the TODO with <code>shapes.Add(new Circle(3));</code>. Run it: you should see <code>Circle has area 28.3</code>."
        ],
        hints: [
          "<code>Shape</code> is abstract, so <code>Circle</code> must provide its own <code>Area()</code>. <code>Rectangle</code> shows you exactly how.",
          "Copy the shape of <code>Rectangle</code>: a private field, a constructor with <code>: base(\"Circle\")</code>, and <code>public override double Area()</code>.",
          "<code>public Circle(double radius) : base(\"Circle\") { this.radius = radius; } public override double Area() { return Math.PI * radius * radius; }</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>radius = radius;</code> in the constructor, so the field stays 0 and the area is 0.0.", fix: "The parameter has the same name as the field, so write <code>this.radius = radius;</code>" },
          { wrong: "Forgetting <code>: base(\"Circle\")</code>.", fix: "<code>Shape</code> has no empty constructor, so you must pass the name up with <code>: base(\"Circle\")</code>." },
          { wrong: "Missing <code>override</code> on <code>Area()</code>, which gives an error that Circle doesn't implement the abstract member.", fix: "Write <code>public override double Area()</code>." },
          { wrong: "Trying <code>new Shape(\"Circle\")</code> in <code>Main</code>.", fix: "You can't create an abstract class. Create a <code>new Circle(3)</code> instead." }
        ]
      },

      // ------------------------------------------------------------------ l6
      {
        id: "m13-l6",
        title: "Interfaces",
        type: "code",
        learn: cs`
<p>A class can only inherit from <strong>one</strong> parent. But sometimes unrelated classes share a skill: a <code>Pupil</code> and a <code>Team</code> are nothing alike, but both could be <em>scored</em>. An <strong>interface</strong> describes a skill as a list of methods, with no code at all:</p>
${pre(cs`
interface IScorable
{
    int GetScore();
}

class Pupil : IScorable
{
    public string Name { get; private set; }
    private int mark;
    public Pupil(string name, int mark) { Name = name; this.mark = mark; }
    public int GetScore() { return mark; }
}

class Team : IScorable
{
    private int tries, conversions;
    public Team(int tries, int conversions) { this.tries = tries; this.conversions = conversions; }
    public int GetScore() { return tries * 5 + conversions * 2; }
}`)}
<ul>
<li>Interface names start with a capital <strong>I</strong> by convention.</li>
<li>A class that "implements" the interface must provide every method in it, as <code>public</code>.</li>
<li>A class can implement several interfaces, and inherit from a class too: <code>class Circle : Shape, IDrawable</code> (the class comes first).</li>
</ul>
<p>Interfaces support polymorphism too: a <code>List&lt;IScorable&gt;</code> can hold pupils and teams, and you can call <code>GetScore()</code> on each.</p>
<div class="tip">Abstract class or interface? Use an abstract class when subclasses share code and data ("is a"). Use an interface for a skill that unrelated classes can share ("can do").</div>`,
        instructions: [
          "Write an interface <code>IDescribable</code> with one method: <code>string Describe();</code>",
          "Make both <code>Film</code> and <code>Snack</code> implement it. Film returns e.g. <code>Film: Paddington (PG)</code>, Snack returns e.g. <code>Snack: Popcorn £4.50</code> (use <code>{Price:F2}</code>).",
          "In Main, put a film <code>Paddington</code>/<code>PG</code> and a snack <code>Popcorn</code>/<code>4.50</code> in a <code>List&lt;IDescribable&gt;</code> and print <code>Describe()</code> for each in a loop."
        ],
        starter: prog(cs`
// TODO: interface IDescribable

class Film
{
    public string Title { get; private set; }
    public string Rating { get; private set; }

    public Film(string title, string rating)
    {
        Title = title;
        Rating = rating;
    }
}

class Snack
{
    public string Name { get; private set; }
    public double Price { get; private set; }

    public Snack(string name, double price)
    {
        Name = name;
        Price = price;
    }
}`, cs`
// TODO: make a List<IDescribable>, add a film and a snack, and describe each`),
        solution: prog(cs`
interface IDescribable
{
    string Describe();
}

class Film : IDescribable
{
    public string Title { get; private set; }
    public string Rating { get; private set; }

    public Film(string title, string rating)
    {
        Title = title;
        Rating = rating;
    }

    public string Describe()
    {
        return $"Film: {Title} ({Rating})";
    }
}

class Snack : IDescribable
{
    public string Name { get; private set; }
    public double Price { get; private set; }

    public Snack(string name, double price)
    {
        Name = name;
        Price = price;
    }

    public string Describe()
    {
        return $"Snack: {Name} £{Price:F2}";
    }
}`, cs`
List<IDescribable> items = new List<IDescribable>();
items.Add(new Film("Paddington", "PG"));
items.Add(new Snack("Popcorn", 4.50));

foreach (IDescribable item in items)
{
    Console.WriteLine(item.Describe());
}`),
        tests: [
          { type: "output", includes: "Film: Paddington (PG)", msg: "Print Film: Paddington (PG)", help: "Your program should print <code>Film: Paddington (PG)</code>. Check the <code>Describe</code> method in <code>Film</code> and that you added the film to the list." },
          { type: "output", includes: "Snack: Popcorn £4.50", msg: "Print Snack: Popcorn £4.50", help: "Your program should print <code>Snack: Popcorn £4.50</code>. Use <code>{Price:F2}</code> to get two decimal places." },
          { type: "code", pattern: "interface\\s+IDescribable", msg: "Declare interface IDescribable.", help: "This check looks for <code>interface IDescribable</code> in your code." },
          { type: "code", pattern: "class\\s+Snack\\s*:\\s*IDescribable", msg: "Snack should implement IDescribable.", help: "This check looks for <code>class Snack : IDescribable</code>. Add the interface after the class name." },
          { type: "code", pattern: "List<\\s*IDescribable\\s*>", msg: "Store the items in a List<IDescribable>.", help: "This check looks for <code>List&lt;IDescribable&gt;</code>. Use the interface as the list's type." }
        ],
        hint: "interface IDescribable { string Describe(); } then class Film : IDescribable { ... public string Describe() { return $\"Film: {Title} ({Rating})\"; } }",
        goal: "The program treats a film and a snack the same way through an interface and prints a description of each.",
        steps: [
          "At <code>// TODO: interface IDescribable</code>, write <code>interface IDescribable { string Describe(); }</code>",
          "Change <code>class Film</code> to <code>class Film : IDescribable</code>.",
          "Inside <code>Film</code>, add <code>public string Describe()</code> that returns <code>$\"Film: {Title} ({Rating})\"</code>. Run to check it compiles.",
          "Do the same for <code>Snack</code>: <code>class Snack : IDescribable</code> and a <code>Describe()</code> returning <code>$\"Snack: {Name} £{Price:F2}\"</code>.",
          "In <code>Main</code>, make <code>List&lt;IDescribable&gt; items = new List&lt;IDescribable&gt;();</code> and add <code>new Film(\"Paddington\", \"PG\")</code> and <code>new Snack(\"Popcorn\", 4.50)</code>.",
          "Loop with <code>foreach (IDescribable item in items)</code> and print <code>item.Describe()</code>. Run it."
        ],
        hints: [
          "Film and Snack aren't related, but both can <em>describe themselves</em>. An interface names that shared skill.",
          "Declare the interface with just the method heading. Each class says <code>: IDescribable</code> and writes a <code>public string Describe()</code>. The list's type is the interface.",
          "<code>class Snack : IDescribable { ... public string Describe() { return $\"Snack: {Name} £{Price:F2}\"; } }</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>override</code> on the interface method.", fix: "When implementing an interface, just write <code>public string Describe()</code>, with no <code>override</code>." },
          { wrong: "Forgetting <code>public</code> on <code>Describe()</code>.", fix: "Interface methods must be implemented as <code>public</code>." },
          { wrong: "Giving the interface method a body, e.g. <code>string Describe() { ... }</code>.", fix: "Inside the interface, end the line with a semicolon: <code>string Describe();</code>" },
          { wrong: "Making a <code>List&lt;Film&gt;</code>, which can't hold a Snack.", fix: "Use <code>List&lt;IDescribable&gt;</code> so both kinds fit." }
        ]
      },

      // ------------------------------------------------------------------ l7
      {
        id: "m13-l7",
        title: "The four pillars of OOP",
        type: "read",
        learn: cs`
<p>You've now met all four big ideas of object-oriented programming. Exam questions often ask you to <strong>define</strong> them and <strong>give an example</strong>, so here they are side by side.</p>
<table>
<tr><th>Pillar</th><th>What it means</th><th>Example from this course</th></tr>
<tr><td><strong>Encapsulation</strong></td><td>Bundling data and the methods that use it inside a class, and hiding the data (private) so it can only be changed through controlled methods or properties.</td><td><code>BankAccount</code> with a private balance and a <code>Withdraw</code> method that refuses to go overdrawn.</td></tr>
<tr><td><strong>Abstraction</strong></td><td>Showing only the essential features and hiding the details. Abstract classes say <em>what</em> must be done without saying <em>how</em>.</td><td>Abstract <code>Shape</code> with an abstract <code>Area()</code>; you call <code>Area()</code> without knowing the formula.</td></tr>
<tr><td><strong>Inheritance</strong></td><td>A subclass is created from a base class and gets its attributes and methods, adding or changing its own. Models an "is a" relationship and avoids repeated code.</td><td><code>Dog : Animal</code>, <code>Manager : Employee</code>.</td></tr>
<tr><td><strong>Polymorphism</strong></td><td>Objects of different subclasses can be treated as the base type, and the same method call behaves differently for each, through overriding.</td><td>A <code>List&lt;Ticket&gt;</code> where <code>Price()</code> gives 8.00, 5.50 or 12.50 depending on the ticket.</td></tr>
</table>
<h3>Why bother with OOP?</h3>
<ul>
<li><strong>Reuse:</strong> write a class once, create as many objects as you need, and inherit rather than copy.</li>
<li><strong>Maintenance:</strong> each class is a self-contained unit. A bug in <code>User</code> is fixed in <code>User</code>.</li>
<li><strong>Teamwork:</strong> different programmers can build different classes at the same time, as long as they agree the public methods.</li>
<li><strong>Modelling the real world:</strong> classes like <code>Player</code>, <code>Ticket</code> and <code>Question</code> match how people think about the problem.</li>
<li><strong>Safety:</strong> encapsulation keeps objects in a valid state.</li>
</ul>
<h3>Class diagrams</h3>
<p>Designers often sketch classes as boxes with three parts: the name, the attributes and the methods. <code>-</code> means private, <code>+</code> public and <code>#</code> protected. An arrow from a subclass points to its base class.</p>
<pre><code>+---------------------------+
| Animal  (abstract)        |
+---------------------------+
| + Name : string           |
+---------------------------+
| + Speak() : string        |
+---------------------------+
          ^           ^
          |           |
   +-----------+ +-----------+
   | Dog       | | Cat       |
   +-----------+ +-----------+
   | + Speak() | | + Speak() |
   +-----------+ +-----------+</code></pre>
<div class="tip">In the final project you'll design a class diagram first, then build each class one at a time.</div>`
      },

      // ------------------------------------------------------------------ quiz
      {
        id: "m13-quiz",
        title: "Checkpoint: inheritance and polymorphism",
        type: "quiz",
        questions: [
          { q: "In <code>class Dog : Animal</code>, which is the base class?",
            options: ["Dog", "Animal", "Both", "Neither"],
            answer: 1, explain: "The class after the colon is the base (parent) class. Dog inherits from Animal." },
          { q: "What does <code>: base(name)</code> do in a subclass constructor?",
            options: ["Creates a second object", "Calls the parent class's constructor with name", "Makes name private", "Overrides the Name property"],
            answer: 1, explain: "It passes the value up so the base class can set up its own fields." },
          { q: "A field marked <code>protected</code> can be used…",
            options: ["Anywhere", "Only in Main", "In its own class and its subclasses", "Only in its own class"],
            answer: 2, explain: "protected sits between private and public: the class and its subclasses can use it." },
          { q: "Which keyword must a base-class method have so a subclass can <code>override</code> it (if it isn't abstract)?",
            options: ["static", "virtual", "sealed", "private"],
            answer: 1, explain: "A method must be virtual (or abstract) to be overridden." },
          { q: "A <code>List&lt;Animal&gt;</code> holds a Dog and a Cat. Calling <code>Speak()</code> on each prints Woof! and Meow!. This is…",
            options: ["Encapsulation", "Polymorphism", "Validation", "Abstraction only"],
            answer: 1, explain: "The same call behaves differently for each subclass: polymorphism." },
          { q: "What happens with <code>Shape s = new Shape();</code> if Shape is abstract?",
            options: ["It works normally", "A compile error: cannot create an instance of the abstract type", "It creates an empty shape", "A run-time exception"],
            answer: 1, explain: "Abstract classes can't be instantiated. You create objects of their subclasses." },
          { q: "What's special about an abstract method?",
            options: ["It has no body and every concrete subclass must override it", "It runs automatically", "It can't have parameters", "It is always static"],
            answer: 0, explain: "It's a promise: subclasses must supply the code." },
          { q: "Which statement about interfaces is true?",
            options: ["A class can implement several interfaces", "Interfaces contain fields and constructors", "A class can only implement one interface", "You can create objects of an interface"],
            answer: 0, explain: "A class can inherit one class but implement many interfaces." }
        ]
      }
    ]
  });
})();
