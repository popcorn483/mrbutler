// Module 14: Project - OOP quiz with login
// The program grows lesson by lesson: each starter is the previous solution plus a new TODO.
(function () {
  const cs = String.raw;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const trim = (s) => s.replace(/^\n+/, "").replace(/\s+$/, "");
  const pre = (s) => `<pre><code class="cs">${esc(trim(s))}</code></pre>`;
  const out = (s) => `<pre><code>${esc(trim(s))}</code></pre>`;
  const ind = (s, n) => trim(s).split("\n").map((l) => (l.trim() ? " ".repeat(n) + l : "")).join("\n");
  const lines = (s) => String(s || "").replace(/\r/g, "").split("\n").map((l) => l.trim()).filter((l) => l !== "");
  const count = (s, sub) => s.split(sub).length - 1;

  const USINGS = cs`
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Security.Cryptography;
using System.Text;`;

  // Builds a whole program: usings, the classes so far, then a small Program whose Main tests them.
  function prog(classes, main) {
    return trim(USINGS) + "\n\n" + classes.map(trim).join("\n\n") +
      "\n\nclass Program\n{\n    static void Main(string[] args)\n    {\n" + ind(main, 8) + "\n    }\n}\n";
  }
  // Builds a program whose Program class is written out in full.
  function full(classes, programClass, header) {
    return trim(USINGS) + "\n\n" + (header ? header + "\n\n" : "") + classes.map(trim).join("\n\n") + "\n\n" + trim(programClass) + "\n";
  }

  // Known SHA-256 hashes used in tests and pre-loaded files.
  const H = {
    abc: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    Quiz2026: "b2876a672a238a52f643343d2bad1340a78794c4d81117f9ace4429bd6357c4a",
    Rugby2026: "4ef8933fca276ed6eccabafb6303c4d2bbe163c43aa796ff69fc0b224689a125",
    Pass1234: "d3dec3f35387156495cbc21471313f87155f878f3435b693f50077c2be479033",
  };
  const USERS_FILE = `grace,${H.Rugby2026}\n`;

  // ------------------------------------------------------------------ User
  const HASH_METHOD = cs`
    public static string Hash(string text)
    {
        using (SHA256 sha = SHA256.Create())
        {
            byte[] bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(text));
            StringBuilder hex = new StringBuilder();
            foreach (byte b in bytes)
            {
                hex.Append(b.ToString("x2"));
            }
            return hex.ToString();
        }
    }`;

  const USER_HASH_STUB = cs`
public class User
{
    // Turns any text into a 64-character SHA-256 hash, written in hexadecimal.
    public static string Hash(string text)
    {
        // TODO 1: create a SHA256 object inside a using block
        // TODO 2: turn the text into bytes and compute the hash
        // TODO 3: add each byte to a StringBuilder as two hex digits: b.ToString("x2")
        // TODO 4: return the finished string
        return "";
    }
}`;

  const USER_HASH = cs`
public class User
{
` + HASH_METHOD + cs`
}`;

  const USER_STUB = cs`
public class User
{
    // TODO: a Username property that anyone can read but only User can set

    // TODO: a private string field called passwordHash

    // TODO: a constructor User(string username, string passwordHash)

    // TODO: public bool CheckPassword(string attempt)

    // TODO: public string ToFileLine() that returns username,hash

` + HASH_METHOD + cs`
}`;

  const USER = cs`
public class User
{
    public string Username { get; private set; }
    private string passwordHash;

    public User(string username, string passwordHash)
    {
        Username = username;
        this.passwordHash = passwordHash;
    }

    public bool CheckPassword(string attempt)
    {
        return Hash(attempt) == passwordHash;
    }

    public string ToFileLine()
    {
        return $"{Username},{passwordHash}";
    }

` + HASH_METHOD + cs`
}`;

  // ------------------------------------------------------------------ UserManager
  const STRONG = cs`
    private bool IsStrongPassword(string password)
    {
        bool hasUpper = false;
        bool hasDigit = false;
        foreach (char c in password)
        {
            if (char.IsUpper(c)) hasUpper = true;
            if (char.IsDigit(c)) hasDigit = true;
        }
        return password.Length >= 8 && hasUpper && hasDigit;
    }`;

  const FIND = cs`
    public User FindUser(string username)
    {
        foreach (User u in users)
        {
            if (u.Username.ToLower() == username.ToLower())
            {
                return u;
            }
        }
        return null;
    }`;

  const LOGIN = cs`
    public User Login(string username, string password)
    {
        User user = FindUser(username);
        if (user != null && user.CheckPassword(password))
        {
            return user;
        }
        return null;
    }`;

  const registerMethod = (saveLine) => cs`
    public bool Register(string username, string password, out string message)
    {
        if (username.Length < 3 || username.Length > 15)
        {
            message = "Username must be 3 to 15 characters.";
            return false;
        }
        if (username.Contains(",") || username.Contains(" "))
        {
            message = "Username cannot contain commas or spaces.";
            return false;
        }
        if (FindUser(username) != null)
        {
            message = "That username is already taken.";
            return false;
        }
        if (!IsStrongPassword(password))
        {
            message = "Password needs 8+ characters, a capital letter and a digit.";
            return false;
        }

        users.Add(new User(username, User.Hash(password)));
` + saveLine + cs`
        message = "Account created. You can now log in.";
        return true;
    }`;

  const UM_STUB = cs`
public class UserManager
{
    private List<User> users = new List<User>();

    public User FindUser(string username)
    {
        // TODO: search the list (ignore upper/lower case); return null if not found
        return null;
    }

    public bool Register(string username, string password, out string message)
    {
        // TODO: validate in this order: length 3-15, no commas or spaces,
        // not already taken, strong password. Then add the user with a HASHED password.
        message = "";
        return false;
    }

    public User Login(string username, string password)
    {
        // TODO: find the user and check the password; return null if either is wrong
        return null;
    }

` + STRONG + cs`
}`;

  const UM_V1 = cs`
public class UserManager
{
    private List<User> users = new List<User>();

` + FIND + "\n\n" + registerMethod("") + "\n\n" + LOGIN + "\n\n" + STRONG + cs`
}`;

  const UM_STUB2 = cs`
public class UserManager
{
    private const string UsersFile = "users.txt";
    private List<User> users = new List<User>();

    public UserManager()
    {
        // TODO: load the saved users
    }

    private void Load()
    {
        // TODO: if the file exists, read each line, split it at the comma
        // and add a new User. Catch IOException and print a warning.
    }

    private void Save()
    {
        // TODO: write every user's ToFileLine() to the file
    }

` + FIND + "\n\n" + registerMethod("        // TODO: save the users\n") + "\n\n" + LOGIN + "\n\n" + STRONG + cs`
}`;

  const UM = cs`
public class UserManager
{
    private const string UsersFile = "users.txt";
    private List<User> users = new List<User>();

    public UserManager()
    {
        Load();
    }

    private void Load()
    {
        if (!File.Exists(UsersFile)) return;
        try
        {
            foreach (string line in File.ReadAllLines(UsersFile))
            {
                string[] parts = line.Split(',');
                if (parts.Length == 2)
                {
                    users.Add(new User(parts[0], parts[1]));
                }
            }
        }
        catch (IOException)
        {
            Console.WriteLine("Warning: could not read the users file.");
        }
    }

    private void Save()
    {
        List<string> lines = new List<string>();
        foreach (User u in users)
        {
            lines.Add(u.ToFileLine());
        }
        File.WriteAllLines(UsersFile, lines);
    }

` + FIND + "\n\n" + registerMethod("        Save();\n") + "\n\n" + LOGIN + "\n\n" + STRONG + cs`
}`;

  // ------------------------------------------------------------------ Questions
  const QUESTION = cs`
public abstract class Question
{
    public string Text { get; private set; }
    public int Points { get; private set; }

    protected Question(string text, int points)
    {
        Text = text;
        Points = points;
    }

    public abstract void Display();
    public abstract bool IsValidAnswer(string answer);
    public abstract bool CheckAnswer(string answer);
    public abstract string CorrectAnswerText();
}`;

  const MCQ = cs`
public class MultipleChoiceQuestion : Question
{
    private string[] options;
    private int correctIndex;

    public MultipleChoiceQuestion(string text, string[] options, int correctIndex, int points)
        : base(text, points)
    {
        this.options = options;
        this.correctIndex = correctIndex;
    }

    public override void Display()
    {
        Console.WriteLine(Text);
        for (int i = 0; i < options.Length; i++)
        {
            char letter = (char)('A' + i);
            Console.WriteLine($"   {letter}) {options[i]}");
        }
        char lastLetter = (char)('A' + options.Length - 1);
        Console.Write($"Your answer (A-{lastLetter}): ");
    }

    public override bool IsValidAnswer(string answer)
    {
        if (answer == null) return false;
        answer = answer.Trim().ToUpper();
        if (answer.Length != 1) return false;
        int index = answer[0] - 'A';
        return index >= 0 && index < options.Length;
    }

    public override bool CheckAnswer(string answer)
    {
        int index = answer.Trim().ToUpper()[0] - 'A';
        return index == correctIndex;
    }

    public override string CorrectAnswerText()
    {
        return $"{(char)('A' + correctIndex)}) {options[correctIndex]}";
    }
}`;

  const TFQ = cs`
public class TrueFalseQuestion : Question
{
    private bool correctAnswer;

    public TrueFalseQuestion(string text, bool correctAnswer, int points)
        : base(text, points)
    {
        this.correctAnswer = correctAnswer;
    }

    public override void Display()
    {
        Console.WriteLine(Text);
        Console.Write("True or false? (T/F): ");
    }

    public override bool IsValidAnswer(string answer)
    {
        if (answer == null) return false;
        answer = answer.Trim().ToUpper();
        return answer == "T" || answer == "F" || answer == "TRUE" || answer == "FALSE";
    }

    public override bool CheckAnswer(string answer)
    {
        bool saidTrue = answer.Trim().ToUpper().StartsWith("T");
        return saidTrue == correctAnswer;
    }

    public override string CorrectAnswerText()
    {
        return correctAnswer ? "True" : "False";
    }
}`;

  const TFQ_STUB = cs`
// TODO: class TrueFalseQuestion : Question
// - a private bool correctAnswer, set by the constructor (text, correctAnswer, points)
// - Display: print the text, then Write "True or false? (T/F): "
// - IsValidAnswer: T, F, TRUE or FALSE (any case, ignore spaces); null is not valid
// - CheckAnswer: does the answer start with T, and does that match correctAnswer?
// - CorrectAnswerText: "True" or "False"`;

  const QUESTIONS = [QUESTION, MCQ, TFQ];

  // ------------------------------------------------------------------ Quiz
  const QUIZ_PROPS = cs`
    public int QuestionCount
    {
        get { return questions.Count; }
    }

    public int TotalPoints
    {
        get
        {
            int total = 0;
            foreach (Question q in questions)
            {
                total += q.Points;
            }
            return total;
        }
    }`;

  const loadMethod = (inner) => cs`
    public void LoadFromFile(string fileName)
    {
        questions.Clear();
        if (!File.Exists(fileName))
        {
            File.WriteAllLines(fileName, DefaultQuestions());
        }

        foreach (string line in File.ReadAllLines(fileName))
        {
            if (line.Trim() == "" || line.StartsWith("#")) continue;
` + inner + cs`
        }
    }`;

  const LOAD_TRY = cs`
            try
            {
                questions.Add(ParseQuestion(line));
            }
            catch (FormatException)
            {
                Console.WriteLine($"Skipped a badly formatted line: {line}");
            }
            catch (IndexOutOfRangeException)
            {
                Console.WriteLine($"Skipped a line with missing parts: {line}");
            }`;

  const PARSE = cs`
    private Question ParseQuestion(string line)
    {
        string[] parts = line.Split('|');
        string type = parts[0].Trim().ToUpper();

        if (type == "MC")
        {
            string[] options = parts[2].Split(';');
            int correct = int.Parse(parts[3]);
            int points = int.Parse(parts[4]);
            if (correct < 0 || correct >= options.Length)
            {
                throw new FormatException();
            }
            return new MultipleChoiceQuestion(parts[1], options, correct, points);
        }
        if (type == "TF")
        {
            bool correct = bool.Parse(parts[2]);
            int points = int.Parse(parts[3]);
            return new TrueFalseQuestion(parts[1], correct, points);
        }
        throw new FormatException();
    }`;

  const PARSE_STUB = cs`
    private Question ParseQuestion(string line)
    {
        // TODO: split the line at | and build the right kind of question.
        // MC|text|option;option;option|correct index|points
        // TF|text|True or False|points
        // Throw a FormatException if the type is unknown or the correct index is out of range.
        throw new FormatException();
    }`;

  const DEFAULTS = cs`
    private static string[] DefaultQuestions()
    {
        return new string[]
        {
            "# MC|question|option;option;option;option|correct index from 0|points",
            "# TF|question|True or False|points",
            "MC|Which data type stores a whole number?|string;int;bool;double|1|1",
            "MC|What does Console.ReadLine() return?|int;char;string;bool|2|1",
            "TF|Array indexes in C# start at 1.|False|1",
            "TF|You cannot create an object from an abstract class.|True|2"
        };
    }`;

  const SHUFFLE = cs`
    private void Shuffle()
    {
        for (int i = questions.Count - 1; i > 0; i--)
        {
            int j = random.Next(i + 1);
            Question temp = questions[i];
            questions[i] = questions[j];
            questions[j] = temp;
        }
    }`;

  const RUN = cs`
    public int Run()
    {
        Shuffle();
        int score = 0;
        int number = 1;

        foreach (Question q in questions)
        {
            Console.WriteLine();
            Console.WriteLine($"Question {number} of {questions.Count} ({q.Points} point{(q.Points == 1 ? "" : "s")})");
            q.Display();

            string answer = Console.ReadLine();
            while (!q.IsValidAnswer(answer))
            {
                Console.Write("That is not a valid answer. Try again: ");
                answer = Console.ReadLine();
            }

            if (q.CheckAnswer(answer))
            {
                Console.WriteLine("Correct!");
                score += q.Points;
            }
            else
            {
                Console.WriteLine($"Wrong. The answer was {q.CorrectAnswerText()}");
            }
            number++;
        }
        return score;
    }`;

  const SHUFFLE_STUB = cs`
    private void Shuffle()
    {
        // TODO: Fisher-Yates shuffle - work backwards from the last question,
        // swapping each one with a random question at or before it
    }`;

  const RUN_STUB = cs`
    public int Run()
    {
        // TODO: shuffle, then ask each question, validate the answer, mark it
        // and return the total points scored
        return 0;
    }`;

  const QUIZ_STUB = cs`
public class Quiz
{
    private List<Question> questions = new List<Question>();

` + QUIZ_PROPS + "\n\n" + loadMethod(cs`
            // TODO: add ParseQuestion(line) to the list, but catch
            // FormatException and IndexOutOfRangeException and print a message instead
`) + "\n\n" + PARSE_STUB + "\n\n" + DEFAULTS + cs`
}`;

  const QUIZ_V1 = cs`
public class Quiz
{
    private List<Question> questions = new List<Question>();

` + QUIZ_PROPS + "\n\n" + loadMethod(LOAD_TRY) + "\n\n" + PARSE + "\n\n" + DEFAULTS + cs`
}`;

  const QUIZ_STUB2 = cs`
public class Quiz
{
    private List<Question> questions = new List<Question>();
    private Random random = new Random();

` + QUIZ_PROPS + "\n\n" + loadMethod(LOAD_TRY) + "\n\n" + PARSE + "\n\n" + SHUFFLE_STUB + "\n\n" + RUN_STUB + "\n\n" + DEFAULTS + cs`
}`;

  const QUIZ = cs`
public class Quiz
{
    private List<Question> questions = new List<Question>();
    private Random random = new Random();

` + QUIZ_PROPS + "\n\n" + loadMethod(LOAD_TRY) + "\n\n" + PARSE + "\n\n" + SHUFFLE + "\n\n" + RUN + "\n\n" + DEFAULTS + cs`
}`;

  // ------------------------------------------------------------------ Scores
  const SR_TOP = cs`
public class ScoreRecord
{
    private const string DateFormat = "yyyy-MM-dd HH:mm";

    public string Username { get; private set; }
    public int Score { get; private set; }
    public int Total { get; private set; }
    public DateTime Date { get; private set; }
`;
  const SR_REST = cs`
    public ScoreRecord(string username, int score, int total, DateTime date)
    {
        Username = username;
        Score = score;
        Total = total;
        Date = date;
    }
`;
  const SR_FROM = cs`
    public static ScoreRecord FromFileLine(string line)
    {
        string[] parts = line.Split(',');
        return new ScoreRecord(
            parts[0],
            int.Parse(parts[1]),
            int.Parse(parts[2]),
            DateTime.ParseExact(parts[3], DateFormat, CultureInfo.InvariantCulture));
    }

    public override string ToString()
    {
        return $"{Date:dd/MM/yyyy HH:mm}  {Username,-15} {Score,3}/{Total,-3} {Percentage,5:F1}%";
    }
}`;

  const SR_STUB = SR_TOP + cs`
    public double Percentage
    {
        get
        {
            // TODO: Score as a percentage of Total (return 0 if Total is 0)
            return 0;
        }
    }

` + SR_REST + cs`
    public string ToFileLine()
    {
        // TODO: username,score,total,date (date written with DateFormat)
        return "";
    }

` + SR_FROM;

  const SR = SR_TOP + cs`
    public double Percentage
    {
        get
        {
            if (Total == 0) return 0;
            return (double)Score / Total * 100;
        }
    }

` + SR_REST + cs`
    public string ToFileLine()
    {
        return $"{Username},{Score},{Total},{Date.ToString(DateFormat, CultureInfo.InvariantCulture)}";
    }

` + SR_FROM;

  const SB_TOP = cs`
public class ScoreBoard
{
    private const string ScoresFile = "scores.txt";
`;
  const SB_SAVE = cs`
    public void Save(ScoreRecord record)
    {
        File.AppendAllText(ScoresFile, record.ToFileLine() + Environment.NewLine);
    }`;
  const SB_LOAD = cs`
    private List<ScoreRecord> LoadAll()
    {
        List<ScoreRecord> records = new List<ScoreRecord>();
        if (!File.Exists(ScoresFile)) return records;

        foreach (string line in File.ReadAllLines(ScoresFile))
        {
            try
            {
                records.Add(ScoreRecord.FromFileLine(line));
            }
            catch (Exception)
            {
                // a damaged line is skipped so the rest still load
            }
        }
        return records;
    }`;
  const SB_SHOW = cs`
    public void ShowForUser(string username)
    {
        Console.WriteLine($"\n--- Scores for {username} ---");
        int count = 0;
        foreach (ScoreRecord r in LoadAll())
        {
            if (r.Username.ToLower() == username.ToLower())
            {
                Console.WriteLine(r);
                count++;
            }
        }
        if (count == 0) Console.WriteLine("No quizzes taken yet.");
    }`;
  const SB_LEADER = cs`
    public void ShowLeaderboard(int howMany)
    {
        List<ScoreRecord> records = LoadAll();

        for (int pass = 0; pass < records.Count - 1; pass++)
        {
            for (int i = 0; i < records.Count - 1 - pass; i++)
            {
                if (records[i].Percentage < records[i + 1].Percentage)
                {
                    ScoreRecord temp = records[i];
                    records[i] = records[i + 1];
                    records[i + 1] = temp;
                }
            }
        }

        Console.WriteLine($"\n--- Top {howMany} ---");
        if (records.Count == 0) Console.WriteLine("No scores yet.");
        for (int i = 0; i < records.Count && i < howMany; i++)
        {
            Console.WriteLine($"{i + 1}. {records[i]}");
        }
    }`;

  const SB_STUB = SB_TOP + "\n" + cs`
    public void Save(ScoreRecord record)
    {
        // TODO: append the record's file line (and a new line) to the scores file
    }

` + SB_LOAD + "\n\n" + cs`
    public void ShowForUser(string username)
    {
        // TODO: print "\n--- Scores for {username} ---", then every record for that user
        // (ignore case), or "No quizzes taken yet." if there are none
    }
}`;
  const SB_V1 = SB_TOP + "\n" + SB_SAVE + "\n\n" + SB_LOAD + "\n\n" + SB_SHOW + "\n}";
  const SB_STUB2 = SB_TOP + "\n" + SB_SAVE + "\n\n" + SB_LOAD + "\n\n" + SB_SHOW + "\n\n" + cs`
    public void ShowLeaderboard(int howMany)
    {
        List<ScoreRecord> records = LoadAll();

        // TODO: bubble sort records so the highest Percentage comes first

        // TODO: print "\n--- Top {howMany} ---", then up to howMany records numbered 1., 2., ...
        // or "No scores yet." if the list is empty
    }
}`;
  const SB = SB_TOP + "\n" + SB_SAVE + "\n\n" + SB_LOAD + "\n\n" + SB_SHOW + "\n\n" + SB_LEADER + "\n}";

  // ------------------------------------------------------------------ Program
  const P_HEAD = cs`
class Program
{
    private const string QuestionsFile = "questions.txt";
    private const int MaxLoginAttempts = 3;

    static UserManager userManager = new UserManager();
    static ScoreBoard scoreBoard = new ScoreBoard();
`;
  const P_MAIN = cs`
    static void Main(string[] args)
    {
        bool running = true;
        while (running)
        {
            Console.WriteLine();
            Console.WriteLine("==============================");
            Console.WriteLine("        C# QUIZ - MENU");
            Console.WriteLine("==============================");
            Console.WriteLine("1. Register");
            Console.WriteLine("2. Log in");
            Console.WriteLine("3. Exit");

            int choice = GetIntInRange("Choose an option: ", 1, 3);
            switch (choice)
            {
                case 1:
                    RegisterScreen();
                    break;
                case 2:
                    User user = LoginScreen();
                    if (user != null)
                    {
                        UserMenu(user);
                    }
                    break;
                case 3:
                    running = false;
                    break;
            }
        }
        Console.WriteLine("Goodbye!");
    }`;
  const P_MAIN_STUB = cs`
    static void Main(string[] args)
    {
        // TODO: loop until the user chooses Exit. Each time round, print:
        //   (a blank line)
        //   ==============================
        //           C# QUIZ - MENU
        //   ==============================
        //   1. Register
        //   2. Log in
        //   3. Exit
        // then use GetIntInRange("Choose an option: ", 1, 3) and a switch:
        //   1 -> RegisterScreen();
        //   2 -> LoginScreen(), and if it returns a user, UserMenu(user);
        //   3 -> stop the loop.
        // After the loop print Goodbye!
    }`;
  const P_SCREENS = cs`
    static void RegisterScreen()
    {
        Console.WriteLine("\n--- Register ---");
        Console.Write("Choose a username: ");
        string username = (Console.ReadLine() ?? "").Trim();

        Console.Write("Choose a password: ");
        string password = ReadPassword();
        Console.Write("Confirm password: ");
        string confirm = ReadPassword();

        if (password != confirm)
        {
            Console.WriteLine("Passwords do not match. Please try again.");
            return;
        }

        userManager.Register(username, password, out string message);
        Console.WriteLine(message);
    }

    static User LoginScreen()
    {
        Console.WriteLine("\n--- Log in ---");
        for (int attempt = 1; attempt <= MaxLoginAttempts; attempt++)
        {
            Console.Write("Username: ");
            string username = (Console.ReadLine() ?? "").Trim();
            Console.Write("Password: ");
            string password = ReadPassword();

            User user = userManager.Login(username, password);
            if (user != null)
            {
                Console.WriteLine($"Welcome back, {user.Username}!");
                return user;
            }
            Console.WriteLine($"Incorrect username or password. {MaxLoginAttempts - attempt} attempt(s) left.");
        }
        Console.WriteLine("Too many failed attempts. Returning to the main menu.");
        return null;
    }`;
  const P_USERMENU = cs`
    static void UserMenu(User user)
    {
        bool loggedIn = true;
        while (loggedIn)
        {
            Console.WriteLine($"\n--- Logged in as {user.Username} ---");
            Console.WriteLine("1. Take the quiz");
            Console.WriteLine("2. My scores");
            Console.WriteLine("3. Leaderboard");
            Console.WriteLine("4. Log out");

            int choice = GetIntInRange("Choose an option: ", 1, 4);
            switch (choice)
            {
                case 1:
                    TakeQuiz(user);
                    break;
                case 2:
                    scoreBoard.ShowForUser(user.Username);
                    break;
                case 3:
                    scoreBoard.ShowLeaderboard(5);
                    break;
                case 4:
                    loggedIn = false;
                    Console.WriteLine("You have been logged out.");
                    break;
            }
        }
    }`;
  const P_USERMENU_STUB = cs`
    static void UserMenu(User user)
    {
        // TODO: loop until the user logs out. Each time round, print:
        //   \n--- Logged in as {user.Username} ---
        //   1. Take the quiz
        //   2. My scores
        //   3. Leaderboard
        //   4. Log out
        // then GetIntInRange("Choose an option: ", 1, 4) and a switch:
        //   1 -> TakeQuiz(user);   2 -> scoreBoard.ShowForUser(user.Username);
        //   3 -> scoreBoard.ShowLeaderboard(5);
        //   4 -> print "You have been logged out." and stop the loop.
    }`;
  const takeQuiz = (feedbackLine) => cs`
    static void TakeQuiz(User user)
    {
        Quiz quiz = new Quiz();
        quiz.LoadFromFile(QuestionsFile);

        if (quiz.QuestionCount == 0)
        {
            Console.WriteLine("There are no questions to ask. Check questions.txt.");
            return;
        }

        Console.WriteLine($"\n{quiz.QuestionCount} questions, {quiz.TotalPoints} points available. Good luck, {user.Username}!");
        int score = quiz.Run();

        ScoreRecord record = new ScoreRecord(user.Username, score, quiz.TotalPoints, DateTime.Now);
        scoreBoard.Save(record);

        Console.WriteLine("\n==============================");
        Console.WriteLine($"You scored {score} out of {quiz.TotalPoints} ({record.Percentage:F1}%)");
` + feedbackLine + cs`
        Console.WriteLine("==============================");
    }`;
  const P_FEEDBACK = cs`
    static string GetFeedback(double percentage)
    {
        if (percentage >= 90) return "Outstanding - you really know your C#!";
        if (percentage >= 70) return "Great work - just a few to review.";
        if (percentage >= 50) return "A solid pass - revisit the parts you missed.";
        return "Keep practising - work back through the tutorial and try again.";
    }`;
  const P_GETINT = cs`
    static int GetIntInRange(string prompt, int min, int max)
    {
        int value;
        Console.Write(prompt);
        while (!int.TryParse(Console.ReadLine(), out value) || value < min || value > max)
        {
            Console.Write($"Please enter a whole number from {min} to {max}: ");
        }
        return value;
    }`;
  const P_GETINT_STUB = cs`
    static int GetIntInRange(string prompt, int min, int max)
    {
        // TODO: show the prompt, then keep asking with
        // "Please enter a whole number from {min} to {max}: " until the input is valid
        return min;
    }`;
  const P_READPW_PLAIN = cs`
    static string ReadPassword()
    {
        // Temporary version: the password shows on screen as it's typed.
        // You'll replace this with a masked version in the next lesson.
        return (Console.ReadLine() ?? "");
    }`;
  const P_READPW_STUB = cs`
    static string ReadPassword()
    {
        // TODO: replace this with a masked version using Console.ReadKey(true):
        // - stop when Enter is pressed, then Console.WriteLine()
        // - Backspace removes the last character and writes "\b \b"
        // - any other non-control character is added to the password and shows a *
        return (Console.ReadLine() ?? "");
    }`;
  const P_READPW = cs`
    static string ReadPassword()
    {
        string password = "";
        ConsoleKeyInfo key = Console.ReadKey(true);
        while (key.Key != ConsoleKey.Enter)
        {
            if (key.Key == ConsoleKey.Backspace)
            {
                if (password.Length > 0)
                {
                    password = password.Substring(0, password.Length - 1);
                    Console.Write("\b \b");
                }
            }
            else if (!char.IsControl(key.KeyChar))
            {
                password += key.KeyChar;
                Console.Write("*");
            }
            key = Console.ReadKey(true);
        }
        Console.WriteLine();
        return password;
    }`;

  const program = (parts) => P_HEAD + "\n" + parts.join("\n\n") + "\n}";
  const NO_FEEDBACK = "";
  const FEEDBACK_TODO = "        // TODO: print GetFeedback(record.Percentage) here\n";
  const FEEDBACK_LINE = "        Console.WriteLine(GetFeedback(record.Percentage));\n";

  const PROGRAM_STUB = program([P_MAIN_STUB, P_SCREENS, P_USERMENU_STUB, takeQuiz(NO_FEEDBACK), P_GETINT_STUB, P_READPW_PLAIN]);
  const PROGRAM_V1 = program([P_MAIN, P_SCREENS, P_USERMENU, takeQuiz(NO_FEEDBACK), P_GETINT, P_READPW_PLAIN]);
  const PROGRAM_V2_STUB = program([P_MAIN, P_SCREENS, P_USERMENU, takeQuiz(NO_FEEDBACK), P_GETINT, P_READPW_STUB]);
  const PROGRAM_V2 = program([P_MAIN, P_SCREENS, P_USERMENU, takeQuiz(NO_FEEDBACK), P_GETINT, P_READPW]);
  const PROGRAM_V3_STUB = program([P_MAIN, P_SCREENS, P_USERMENU, takeQuiz(FEEDBACK_TODO),
    "    // TODO: static string GetFeedback(double percentage)", P_GETINT, P_READPW]);
  const PROGRAM_V3 = program([P_MAIN, P_SCREENS, P_USERMENU, takeQuiz(FEEDBACK_LINE), P_FEEDBACK, P_GETINT, P_READPW]);

  const ALL_BUT_PROGRAM = [USER, UM, QUESTION, MCQ, TFQ, QUIZ, SR, SB];

  // ------------------------------------------------------------------ Test files
  const Q_FILE_L7 = [
    "# MC|question|option;option;option|correct index from 0|points",
    "# TF|question|True or False|points",
    "MC|Which data type stores a whole number?|string;int;bool;double|1|1",
    "TF|You cannot create an object from an abstract class.|True|2",
    "MC|Which loop always runs at least once?|for;while;do-while|2|1",
    "MC|Broken question|yes;no|5|1",
    "TF|Missing the points|True",
    "TF|Not a real answer|Maybe|1",
    ""
  ].join("\n");
  // Two questions: MC (answer B, 1 point) and TF (answer True, 2 points).
  // Shuffle-proof answer sequences:
  //   ALL_RIGHT   T,B,T,B -> 3/3  (MC rejects T, so whichever comes first gets the right letter)
  //   ALL_WRONG   F,A,F,A -> 0/3
  //   ONLY_MC     F,B,F   -> 1/3
  //   ONLY_TF     T,A,T,A -> 2/3
  const Q_FILE_2 = "MC|Which data type stores a whole number?|string;int;bool;double|1|1\nTF|You cannot create an object from an abstract class.|True|2\n";
  const Q_FILE_1 = "TF|You cannot create an object from an abstract class.|True|2\n";
  const SCORES_L9 = "ben,2,4,2026-10-20 09:15\naoife,4,4,2026-10-21 11:00\nthis line is damaged\n";
  const SCORES_L10 = "ben,2,4,2026-10-20 09:15\naoife,4,4,2026-10-21 11:00\ngrace,5,6,2026-10-22 13:45\noisin,1,4,2026-10-23 10:05\nthis line is damaged\nniamh,7,8,2026-10-24 15:20\n";

  // ------------------------------------------------------------------ Mains for each step
  const MAIN_L2 = cs`
Console.WriteLine("Hash of abc:");
Console.WriteLine(User.Hash("abc"));

Console.Write("Type a password: ");
string password = Console.ReadLine();
Console.WriteLine("Stored as: " + User.Hash(password));`;

  const MAIN_L3 = cs`
User aoife = new User("aoife", User.Hash("Quiz2026"));
Console.WriteLine("Saved as: " + aoife.ToFileLine());

Console.Write("Password for aoife: ");
string attempt = Console.ReadLine();
if (aoife.CheckPassword(attempt))
{
    Console.WriteLine("Access granted");
}
else
{
    Console.WriteLine("Access denied");
}`;
  const MAIN_L3_STUB = cs`
// TODO: when your User class is finished, remove the // from these lines
// User aoife = new User("aoife", User.Hash("Quiz2026"));
// Console.WriteLine("Saved as: " + aoife.ToFileLine());
//
// Console.Write("Password for aoife: ");
// string attempt = Console.ReadLine();
// if (aoife.CheckPassword(attempt))
// {
//     Console.WriteLine("Access granted");
// }
// else
// {
//     Console.WriteLine("Access denied");
// }`;

  const MAIN_L4 = cs`
UserManager manager = new UserManager();
string message;

manager.Register("aoife", "Quiz2026", out message);
Console.WriteLine("aoife: " + message);
manager.Register("al", "Quiz2026", out message);
Console.WriteLine("al: " + message);
manager.Register("big ben", "Quiz2026", out message);
Console.WriteLine("big ben: " + message);
manager.Register("AOIFE", "Quiz2026", out message);
Console.WriteLine("AOIFE: " + message);
manager.Register("ben", "password", out message);
Console.WriteLine("ben: " + message);

User user = manager.Login("Aoife", "Quiz2026");
Console.WriteLine(user != null ? "Login 1: welcome " + user.Username : "Login 1: failed");
user = manager.Login("aoife", "quiz2026");
Console.WriteLine(user != null ? "Login 2: welcome " + user.Username : "Login 2: failed");
user = manager.Login("niamh", "Quiz2026");
Console.WriteLine(user != null ? "Login 3: welcome " + user.Username : "Login 3: failed");`;

  const MAIN_L5 = cs`
UserManager manager = new UserManager();

User grace = manager.Login("grace", "Rugby2026");
Console.WriteLine(grace != null ? "Loaded grace from users.txt" : "grace was not loaded");

manager.Register("ciaran", "Pass1234", out string message);
Console.WriteLine(message);

Console.WriteLine("users.txt now contains:");
Console.WriteLine(File.ReadAllText("users.txt"));`;

  const MAIN_L6_BODY = cs`
int score = 0;
foreach (Question q in questions)
{
    q.Display();
    string answer = Console.ReadLine();
    while (!q.IsValidAnswer(answer))
    {
        Console.Write("That is not a valid answer. Try again: ");
        answer = Console.ReadLine();
    }

    if (q.CheckAnswer(answer))
    {
        Console.WriteLine("Correct!");
        score += q.Points;
    }
    else
    {
        Console.WriteLine($"Wrong. The answer was {q.CorrectAnswerText()}");
    }
}
Console.WriteLine($"Score: {score}");`;
  const MAIN_L6_HEAD = cs`
List<Question> questions = new List<Question>();
questions.Add(new MultipleChoiceQuestion("Which data type stores a whole number?",
    new string[] { "string", "int", "bool", "double" }, 1, 1));
`;
  const MAIN_L6 = MAIN_L6_HEAD + cs`questions.Add(new TrueFalseQuestion("Array indexes in C# start at 1.", false, 1));
` + MAIN_L6_BODY;
  const MAIN_L6_STUB = MAIN_L6_HEAD + cs`// TODO: add new TrueFalseQuestion("Array indexes in C# start at 1.", false, 1)
` + MAIN_L6_BODY;

  const MAIN_L7 = cs`
Quiz quiz = new Quiz();
quiz.LoadFromFile("questions.txt");
Console.WriteLine($"Loaded {quiz.QuestionCount} questions worth {quiz.TotalPoints} points");`;

  const MAIN_L8 = cs`
Quiz quiz = new Quiz();
quiz.LoadFromFile("questions.txt");
Console.WriteLine($"{quiz.QuestionCount} questions, {quiz.TotalPoints} points available.");

int score = quiz.Run();
Console.WriteLine();
Console.WriteLine($"You scored {score} out of {quiz.TotalPoints}");`;

  const MAIN_L9 = cs`
ScoreBoard board = new ScoreBoard();

ScoreRecord record = ScoreRecord.FromFileLine("aoife,3,4,2026-10-27 14:30");
Console.WriteLine($"Percentage: {record.Percentage:F1}");
Console.WriteLine("File line: " + record.ToFileLine());

board.Save(record);
board.ShowForUser("Aoife");
board.ShowForUser("oisin");`;

  const MAIN_L10 = cs`
ScoreBoard board = new ScoreBoard();
board.ShowLeaderboard(3);
board.ShowLeaderboard(10);`;

  const QUIZ_CLASSES = [USER, UM, QUESTION, MCQ, TFQ];

  COURSE.addModule({
    id: "m14",
    title: "Project: OOP quiz with login",
    icon: "trophy",
    summary: "Put everything together to build a complete object-oriented quiz with registration, hashed passwords, files and a leaderboard.",
    lessons: [
      // ================================================================ l1
      {
        id: "m14-l1",
        title: "The plan: requirements and class design",
        type: "read",
        learn: cs`
<p>Welcome to the final project! Over the next lessons you'll build a complete C# quiz program, one class at a time. By the end you'll have around 700 lines of object-oriented code: the kind of program you could submit as a GCSE practical project.</p>
<h3>Requirements</h3>
<p>Before writing any code, a developer agrees <strong>what</strong> the program must do. Our quiz must:</p>
<ol>
<li>Let a new user <strong>register</strong> with a username and password, with validation (username 3 to 15 characters, no commas or spaces, not taken; strong password).</li>
<li>Store passwords <strong>securely</strong> as hashes, never as plain text, and hide the password as it's typed.</li>
<li>Let a user <strong>log in</strong>, with at most 3 attempts.</li>
<li>Load questions from a text file, skipping any badly formatted lines.</li>
<li>Support <strong>multiple-choice</strong> and <strong>true/false</strong> questions, each worth a number of points.</li>
<li>Ask the questions in a <strong>random order</strong>, validate every answer and keep score.</li>
<li>Save every result with the date, show a user their own scores and show a <strong>leaderboard</strong>.</li>
<li>Use menus that never crash, whatever is typed.</li>
</ol>
<h3>Class design</h3>
<table>
<tr><th>Class</th><th>Responsibility</th><th>Key members</th></tr>
<tr><td><code>User</code></td><td>One account</td><td><code>Username</code>, private <code>passwordHash</code>, <code>CheckPassword()</code>, <code>ToFileLine()</code>, static <code>Hash()</code></td></tr>
<tr><td><code>UserManager</code></td><td>All accounts and <code>users.txt</code></td><td>private <code>List&lt;User&gt;</code>, <code>FindUser()</code>, <code>Register()</code>, <code>Login()</code>, <code>Load()</code>, <code>Save()</code></td></tr>
<tr><td><code>Question</code> (abstract)</td><td>What every question can do</td><td><code>Text</code>, <code>Points</code>, abstract <code>Display()</code>, <code>IsValidAnswer()</code>, <code>CheckAnswer()</code>, <code>CorrectAnswerText()</code></td></tr>
<tr><td><code>MultipleChoiceQuestion</code></td><td>A question with options A, B, C…</td><td>private options array and correct index; overrides</td></tr>
<tr><td><code>TrueFalseQuestion</code></td><td>A true/false question</td><td>private correct answer; overrides</td></tr>
<tr><td><code>Quiz</code></td><td>Loads and runs a set of questions</td><td><code>List&lt;Question&gt;</code>, <code>LoadFromFile()</code>, <code>ParseQuestion()</code>, <code>Shuffle()</code>, <code>Run()</code></td></tr>
<tr><td><code>ScoreRecord</code></td><td>One result</td><td><code>Username</code>, <code>Score</code>, <code>Total</code>, <code>Date</code>, calculated <code>Percentage</code></td></tr>
<tr><td><code>ScoreBoard</code></td><td>All results and <code>scores.txt</code></td><td><code>Save()</code>, <code>ShowForUser()</code>, <code>ShowLeaderboard()</code></td></tr>
<tr><td><code>Program</code></td><td>Menus and screens</td><td><code>Main()</code>, <code>RegisterScreen()</code>, <code>LoginScreen()</code>, <code>UserMenu()</code>, <code>GetIntInRange()</code>, <code>ReadPassword()</code></td></tr>
</table>
<p>Spot the four pillars: every class <strong>encapsulates</strong> its data; <code>Question</code> is an <strong>abstraction</strong>; the two question types use <strong>inheritance</strong>; and the quiz uses <strong>polymorphism</strong> when it calls <code>q.Display()</code> on a <code>List&lt;Question&gt;</code>.</p>
<h3>How the lessons work</h3>
<p>Each lesson adds one class (or part of one). The starter code is the finished program from the previous lesson plus the new <code>// TODO</code> parts. Each lesson has a small <code>Main</code> that tests the new class, so you can Check your work as you go. The real menus arrive near the end.</p>
<div class="tip">On this site everything is in one file. In Visual Studio, create a Console App called <code>QuizApp</code> and add each class as its own file with <strong>Add &gt; Class</strong>. The files <code>users.txt</code>, <code>questions.txt</code> and <code>scores.txt</code> will appear in <code>bin\Debug\net8.0</code>.</div>`
      },

      // ================================================================ l2
      {
        id: "m14-l2",
        title: "Hashing passwords with SHA-256",
        type: "code",
        learn: cs`
<p>Never store passwords as plain text. If someone got hold of <code>users.txt</code>, they'd have every password, and because people reuse passwords, they might get into other accounts too.</p>
<p>Instead, store a <strong>hash</strong>. A hash function turns any text into a fixed-length "fingerprint":</p>
<ul>
<li>The same input always gives the same hash, so you can check a password by hashing the attempt and comparing.</li>
<li>A tiny change gives a completely different hash (<code>Quiz2026</code> and <code>quiz2026</code> look nothing alike).</li>
<li>It's <strong>one-way</strong>: you can't turn the hash back into the password.</li>
</ul>
<div class="key"><strong>Hashing</strong> using a one-way function to turn data into a fixed-size value. Unlike encryption, there's no key and it can't be reversed.</div>
<p>C# includes SHA-256, which gives a 256-bit hash. We write it as 64 hexadecimal characters:</p>
${pre(cs`
using System.Security.Cryptography;
using System.Text;
...
public static string Hash(string text)
{
    using (SHA256 sha = SHA256.Create())
    {
        byte[] bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(text));
        StringBuilder hex = new StringBuilder();
        foreach (byte b in bytes)
        {
            hex.Append(b.ToString("x2"));   // each byte as 2 hex digits
        }
        return hex.ToString();
    }
}`)}
<ol>
<li><code>Encoding.UTF8.GetBytes</code> turns the text into bytes (the hash works on bytes, not characters).</li>
<li><code>ComputeHash</code> returns 32 bytes.</li>
<li><code>ToString("x2")</code> writes each byte as two lower-case hex digits, so 32 bytes become 64 characters.</li>
</ol>
<p>The method is <code>static</code> because it doesn't belong to one user: it's a tool any code can use as <code>User.Hash("...")</code>.</p>
<div class="tip">Real systems add a <strong>salt</strong>: a random value stored with each user and added to the password before hashing. Then two users with the same password get different hashes. It's one of the extension challenges at the end.</div>`,
        instructions: [
          "Complete <code>User.Hash</code> so it returns the SHA-256 hash of <code>text</code> as 64 lower-case hex characters.",
          "<code>Main</code> is done: the hash of <code>abc</code> must be <code>ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad</code>.",
          "Try typing <code>Quiz2026</code> and then <code>quiz2026</code> when you Run, and compare the hashes."
        ],
        starter: prog([USER_HASH_STUB], MAIN_L2),
        solution: prog([USER_HASH], MAIN_L2),
        stdin: ["Quiz2026"],
        tests: [
          { type: "output", includes: H.abc, msg: "The hash of abc should be ba7816bf…20015ad.", help: "Main hashes <code>abc</code>, which must give <code>ba7816bf…20015ad</code>. If you get a blank line, your method still returns <code>\"\"</code>; if it's different, check you used <code>\"x2\"</code> and <code>Encoding.UTF8</code>." },
          { type: "output", stdin: ["Quiz2026"], includes: "Stored as: " + H.Quiz2026, msg: "Quiz2026 should be stored as b2876a67…", help: "With the input <code>Quiz2026</code>, it should print <code>Stored as: b2876a67…</code>. Make sure you hash the <code>text</code> parameter, not a fixed word." },
          { type: "fn", stdin: ["quiz2026"], fn: (o) => /Stored as: [0-9a-f]{64}/.test(o) && !o.includes(H.Quiz2026), msg: "quiz2026 should give a different 64-character hash from Quiz2026.", help: "With the input <code>quiz2026</code>, it should print a different 64-character lower-case hash. If you get the same hash as Quiz2026, you aren't hashing the parameter." },
          { type: "code", pattern: "ComputeHash", msg: "Use sha.ComputeHash.", help: "This check looks for <code>ComputeHash</code> in your code. Use <code>sha.ComputeHash(...)</code>." },
          { type: "code", pattern: "\"x2\"", msg: "Write each byte with ToString(\"x2\").", help: "This check looks for <code>\"x2\"</code> in your code. Write each byte with <code>b.ToString(\"x2\")</code>." }
        ],
        hint: "Copy the shape from the example: using (SHA256 sha = SHA256.Create()) { byte[] bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(text)); ... }",
        goal: "The program turns any password into a 64-character SHA-256 hash, so it can be stored safely instead of as plain text.",
        steps: [
          "This is the first piece of the quiz project. Scroll to the <code>User</code> class and find <code>Hash</code> with its four TODOs.",
          "For TODO 1, start a block: <code>using (SHA256 sha = SHA256.Create()) { }</code> and move <code>return \"\";</code> inside it for now.",
          "For TODO 2, inside the block write <code>byte[] bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(text));</code>",
          "For TODO 3, make <code>StringBuilder hex = new StringBuilder();</code> and loop <code>foreach (byte b in bytes)</code> doing <code>hex.Append(b.ToString(\"x2\"));</code>",
          "For TODO 4, change the return to <code>return hex.ToString();</code>",
          "Run it: the hash of <code>abc</code> should start <code>ba7816bf</code>. Try <code>Quiz2026</code> and <code>quiz2026</code> to see how different they are."
        ],
        hints: [
          "The method takes text in and must give back a long string of hex digits. The example in the lesson has exactly the shape you need.",
          "Turn the text into bytes with <code>Encoding.UTF8.GetBytes</code>, hash them with <code>sha.ComputeHash</code>, then build the answer with a <code>StringBuilder</code> and <code>ToString(\"x2\")</code> for each byte.",
          "<code>byte[] bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(text));<br>StringBuilder hex = new StringBuilder();<br>foreach (byte b in bytes)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;hex.Append(b.ToString(\"x2\"));<br>}<br>return hex.ToString();</code>"
        ],
        mistakes: [
          { wrong: "Leaving <code>return \"\";</code> in place, so every hash is blank.", fix: "Return the finished string: <code>return hex.ToString();</code>" },
          { wrong: "Using <code>b.ToString()</code> or <code>\"X2\"</code>, giving the wrong length or capital letters.", fix: "Use lower-case <code>\"x2\"</code> so every byte becomes exactly two lower-case hex digits." },
          { wrong: "Hashing the word <code>\"text\"</code> in quotes instead of the parameter.", fix: "Pass the variable: <code>Encoding.UTF8.GetBytes(text)</code>." },
          { wrong: "Forgetting <code>new</code>: <code>StringBuilder hex = StringBuilder();</code>", fix: "Write <code>new StringBuilder()</code>." }
        ]
      },

      // ================================================================ l3
      {
        id: "m14-l3",
        title: "The User class",
        type: "code",
        learn: cs`
<p>Now give <code>User</code> its data. Each user has a username that the rest of the program can <em>read</em> but not change, and a password hash that nobody outside the class should ever see.</p>
${pre(cs`
public class User
{
    public string Username { get; private set; }
    private string passwordHash;

    public User(string username, string passwordHash)
    {
        Username = username;
        this.passwordHash = passwordHash;
    }

    public bool CheckPassword(string attempt)
    {
        return Hash(attempt) == passwordHash;
    }
    ...
}`)}
<p>This is <strong>encapsulation</strong> at work:</p>
<ul>
<li><code>Username</code> has a <code>private set</code>, so it's fixed once the object is created.</li>
<li><code>passwordHash</code> is <code>private</code>. There's no property for it at all. The only way to use it is to ask the object a question: <em>"Is this the right password?"</em> <code>CheckPassword</code> hashes the attempt and compares the two hashes.</li>
<li>The constructor parameter has the same name as the field, so <code>this.passwordHash</code> means "this object's field".</li>
</ul>
<p>To save users to a file later, each one needs to turn itself into one line of text. A <code>ToFileLine()</code> method returns <code>username,hash</code>:</p>
${out(cs`aoife,b2876a672a238a52f643343d2bad1340a78794c4d81117f9ace4429bd6357c4a`)}
<div class="tip">Notice the constructor takes a <em>hash</em>, not a password. Hashing is done before the object is made: <code>new User("aoife", User.Hash("Quiz2026"))</code>. That way the same constructor works when loading users from the file, where only the hash is stored.</div>`,
        instructions: [
          "Add <code>public string Username { get; private set; }</code> and a <code>private string passwordHash</code> field to <code>User</code>.",
          "Add a constructor <code>User(string username, string passwordHash)</code> that stores both.",
          "Add <code>CheckPassword(string attempt)</code> (hash the attempt and compare) and <code>ToFileLine()</code> returning <code>username,hash</code>. Then remove the <code>//</code> from the lines in <code>Main</code>.",
          "Typing <code>Quiz2026</code> should print <code>Access granted</code>; anything else prints <code>Access denied</code>."
        ],
        starter: prog([USER_STUB], MAIN_L3_STUB),
        solution: prog([USER], MAIN_L3),
        stdin: ["Quiz2026"],
        tests: [
          { type: "output", stdin: ["Quiz2026"], includes: "Access granted", msg: "The password Quiz2026 should print Access granted.", help: "With the input <code>Quiz2026</code>, it should print <code>Access granted</code>. Check the constructor uses <code>this.passwordHash = passwordHash;</code> and CheckPassword compares <code>Hash(attempt)</code>." },
          { type: "fn", stdin: ["quiz2026"], fn: (o) => o.includes("Access denied") && !o.includes("Access granted"), msg: "quiz2026 (wrong case) should print Access denied.", help: "With the input <code>quiz2026</code> (wrong case), it should print <code>Access denied</code> and not Access granted. Make sure you compare hashes, not just ignore case." },
          { type: "output", stdin: ["Quiz2026"], includes: "Saved as: aoife," + H.Quiz2026, msg: "ToFileLine should return aoife, then a comma, then the hash.", help: "<code>ToFileLine()</code> should give <code>aoife,</code> followed by the hash, shown after <code>Saved as: </code>. Return <code>$\"{Username},{passwordHash}\"</code> with no spaces." },
          { type: "code", pattern: "private\\s+string\\s+passwordHash", msg: "passwordHash must be a private field.", help: "This check looks for <code>private string passwordHash</code> in your code." },
          { type: "code", pattern: "Username\\s*\\{\\s*get;\\s*private\\s+set;\\s*\\}", msg: "Username should be { get; private set; }", help: "This check looks for <code>Username { get; private set; }</code> exactly." }
        ],
        hint: "public bool CheckPassword(string attempt) { return Hash(attempt) == passwordHash; } and public string ToFileLine() { return $\"{Username},{passwordHash}\"; }",
        goal: "The program creates a user called aoife with a hashed password, shows how she'd be saved to a file, and checks a password you type.",
        steps: [
          "Your <code>Hash</code> method from the last lesson is already here. Scroll to the TODOs at the top of <code>User</code>.",
          "Add <code>public string Username { get; private set; }</code> and <code>private string passwordHash;</code>",
          "Add the constructor <code>public User(string username, string passwordHash)</code> with <code>Username = username;</code> and <code>this.passwordHash = passwordHash;</code>",
          "Add <code>public bool CheckPassword(string attempt)</code> that returns <code>Hash(attempt) == passwordHash</code>.",
          "Add <code>public string ToFileLine()</code> that returns <code>$\"{Username},{passwordHash}\"</code>.",
          "In <code>Main</code>, remove the <code>//</code> from every commented line. Run it and type <code>Quiz2026</code>."
        ],
        hints: [
          "The user keeps its password hash secret. Other code can only ask \"is this the right password?\", never read the hash.",
          "Use an auto-property with <code>private set</code> for <code>Username</code>, a private field for the hash, and <code>this.</code> in the constructor because the parameter has the same name as the field.",
          "<code>public bool CheckPassword(string attempt)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;return Hash(attempt) == passwordHash;<br>}</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>passwordHash = passwordHash;</code> in the constructor, so the field stays empty and every login is denied.", fix: "The parameter shadows the field. Write <code>this.passwordHash = passwordHash;</code>" },
          { wrong: "Comparing the attempt directly: <code>return attempt == passwordHash;</code>", fix: "The stored value is a hash, so hash the attempt first: <code>Hash(attempt) == passwordHash</code>." },
          { wrong: "Making <code>passwordHash</code> public, or adding a property for it.", fix: "Keep it a <code>private string</code> field with no property. That's the point of encapsulation here." },
          { wrong: "Forgetting to uncomment the lines in <code>Main</code>, so nothing prints.", fix: "Remove the <code>//</code> from every line under the TODO in <code>Main</code>." }
        ]
      },

      // ================================================================ l4
      {
        id: "m14-l4",
        title: "UserManager: register and log in",
        type: "code",
        learn: cs`
<p>One <code>User</code> object is one account. Something needs to look after <em>all</em> of them: search them, add new ones and check logins. That's the job of <code>UserManager</code>, which keeps a private <code>List&lt;User&gt;</code>.</p>
<h3>FindUser: a linear search</h3>
${pre(cs`
public User FindUser(string username)
{
    foreach (User u in users)
    {
        if (u.Username.ToLower() == username.ToLower())
        {
            return u;
        }
    }
    return null;      // not found
}`)}
<p><code>null</code> means "no object". Callers check <code>if (user != null)</code>. Comparing lower-case versions means <code>AOIFE</code> and <code>aoife</code> count as the same name.</p>
<h3>Register: validation with an out message</h3>
<p><code>Register</code> needs to give back two things: did it work (<code>bool</code>) and a message explaining why. The <code>out</code> parameter does that:</p>
${pre(cs`
public bool Register(string username, string password, out string message)
{
    if (username.Length < 3 || username.Length > 15)
    {
        message = "Username must be 3 to 15 characters.";
        return false;
    }
    // ...more checks...
    users.Add(new User(username, User.Hash(password)));
    message = "Account created. You can now log in.";
    return true;
}`)}
<p>Every path must set <code>message</code> before returning. The checks are a <strong>length check</strong>, a <strong>format check</strong> (no commas, which would break the CSV file, and no spaces), a check that the name isn't taken, and a password strength check (given to you as <code>IsStrongPassword</code>).</p>
<h3>Login</h3>
<p>Find the user, then ask the user object to check the password. Return the user if both succeed, otherwise <code>null</code>. Never say <em>which</em> part was wrong; that would help an attacker guess usernames.</p>`,
        instructions: [
          "Write <code>FindUser</code>: a case-insensitive linear search that returns the matching <code>User</code> or <code>null</code>.",
          "Write <code>Register</code> with these checks in this order and exact messages: <code>Username must be 3 to 15 characters.</code>, <code>Username cannot contain commas or spaces.</code>, <code>That username is already taken.</code>, <code>Password needs 8+ characters, a capital letter and a digit.</code> If all pass, add a new User with the <strong>hashed</strong> password, set <code>Account created. You can now log in.</code> and return true.",
          "Write <code>Login</code>: return the user if they exist and <code>CheckPassword</code> is true, otherwise <code>null</code>."
        ],
        starter: prog([USER, UM_STUB], MAIN_L4),
        solution: prog([USER, UM_V1], MAIN_L4),
        tests: [
          { type: "output", includes: "aoife: Account created. You can now log in.", msg: "Registering aoife with Quiz2026 should work.", help: "Main registers <code>aoife</code> with <code>Quiz2026</code>. It should print <code>aoife: Account created. You can now log in.</code> Set that message and return true at the end of Register." },
          { type: "output", includes: "al: Username must be 3 to 15 characters.", msg: "al is too short.", help: "<code>al</code> has only 2 characters, so it should print <code>Username must be 3 to 15 characters.</code> Check the length first." },
          { type: "output", includes: "big ben: Username cannot contain commas or spaces.", msg: "big ben contains a space.", help: "<code>big ben</code> contains a space, so it should print <code>Username cannot contain commas or spaces.</code> Use <code>username.Contains(\" \")</code>." },
          { type: "output", includes: "AOIFE: That username is already taken.", msg: "AOIFE should count as the same name as aoife.", help: "<code>AOIFE</code> should count as the same name as <code>aoife</code> and print <code>That username is already taken.</code> Use <code>.ToLower()</code> in FindUser and call it from Register." },
          { type: "output", includes: "ben: Password needs 8+ characters, a capital letter and a digit.", msg: "password has no capital letter or digit.", help: "<code>ben</code> with <code>password</code> should print the weak password message. Call <code>IsStrongPassword(password)</code> as the last check." },
          { type: "outputRegex", pattern: "Login 1: welcome aoife[\\s\\S]*Login 2: failed[\\s\\S]*Login 3: failed", msg: "Login 1 should succeed; login 2 (wrong password) and login 3 (unknown user) should fail.", help: "Login 1 (<code>Aoife</code>/<code>Quiz2026</code>) should succeed; login 2 (wrong password) and login 3 (<code>niamh</code>, who doesn't exist) should fail. Return the user only when FindUser finds them <em>and</em> CheckPassword is true." },
          { type: "code", pattern: "User\\.Hash\\(\\s*password\\s*\\)", msg: "Store User.Hash(password), never the plain password.", help: "This check looks for <code>User.Hash(password)</code> in your code. Hash the password before creating the User." }
        ],
        hint: "In Register, after each failed check set message and return false. At the end: users.Add(new User(username, User.Hash(password))); In Login: User user = FindUser(username); if (user != null && user.CheckPassword(password)) return user;",
        goal: "The program registers users with proper validation and lets them log in, rejecting bad usernames, weak passwords and wrong logins.",
        steps: [
          "Your finished <code>User</code> class is above. Scroll to the <code>UserManager</code> class and find <code>FindUser</code>.",
          "In <code>FindUser</code>, loop <code>foreach (User u in users)</code> and return <code>u</code> when <code>u.Username.ToLower() == username.ToLower()</code>. Leave <code>return null;</code> after the loop.",
          "In <code>Register</code>, add the length check first: if the length is under 3 or over 15, set <code>message = \"Username must be 3 to 15 characters.\";</code> and <code>return false;</code>",
          "Add the other three checks in order, the same way: <code>username.Contains(\",\") || username.Contains(\" \")</code>, then <code>FindUser(username) != null</code>, then <code>!IsStrongPassword(password)</code>.",
          "At the end of <code>Register</code>, add <code>users.Add(new User(username, User.Hash(password)));</code>, set the success message and <code>return true;</code> Run it.",
          "In <code>Login</code>, use <code>FindUser</code> and return the user only if it isn't <code>null</code> and <code>CheckPassword</code> is true."
        ],
        hints: [
          "Each check in <code>Register</code> is a guard: if it fails, set the message and leave straight away. Only a username that gets past every guard is added.",
          "Each guard is an <code>if</code> that sets <code>message</code> and does <code>return false;</code>. Reuse <code>FindUser</code> for the \"already taken\" check and for <code>Login</code>.",
          "<code>public User Login(string username, string password)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;User user = FindUser(username);<br>&nbsp;&nbsp;&nbsp;&nbsp;if (user != null &amp;&amp; user.CheckPassword(password))<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return user;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;return null;<br>}</code>"
        ],
        mistakes: [
          { wrong: "Storing the plain password: <code>new User(username, password)</code>.", fix: "Always hash it first: <code>new User(username, User.Hash(password))</code>." },
          { wrong: "Putting <code>return null;</code> inside the <code>foreach</code> in FindUser, so it gives up after the first user.", fix: "Only <code>return u;</code> goes inside the loop. <code>return null;</code> goes after it." },
          { wrong: "Comparing usernames without <code>.ToLower()</code>, so <code>AOIFE</code> is allowed as a new user.", fix: "Lower-case both sides in <code>FindUser</code>." },
          { wrong: "Forgetting <code>return false;</code> after setting an error message, so the user is still added.", fix: "Every failed check must set <code>message</code> <em>and</em> <code>return false;</code>" }
        ]
      },

      // ================================================================ l5
      {
        id: "m14-l5",
        title: "Saving and loading users",
        type: "code",
        learn: cs`
<p>Right now every account disappears when the program closes. To make accounts <strong>persist</strong>, <code>UserManager</code> saves them to <code>users.txt</code>, one CSV line per user:</p>
${out(cs`
grace,4ef8933fca276ed6eccabafb6303c4d2bbe163c43aa796ff69fc0b224689a125
ciaran,d3dec3f35387156495cbc21471313f87155f878f3435b693f50077c2be479033`)}
<h3>Save: after every change</h3>
${pre(cs`
private void Save()
{
    List<string> lines = new List<string>();
    foreach (User u in users)
    {
        lines.Add(u.ToFileLine());
    }
    File.WriteAllLines(UsersFile, lines);
}`)}
<p>Call <code>Save()</code> in <code>Register</code> straight after adding the user, so the file is always up to date.</p>
<h3>Load: in the constructor</h3>
<p>The constructor runs when the <code>UserManager</code> is created, which is the perfect time to read the file. If the file doesn't exist yet (the very first run), there's simply nobody to load:</p>
${pre(cs`
private void Load()
{
    if (!File.Exists(UsersFile)) return;
    try
    {
        foreach (string line in File.ReadAllLines(UsersFile))
        {
            string[] parts = line.Split(',');
            if (parts.Length == 2)
            {
                users.Add(new User(parts[0], parts[1]));
            }
        }
    }
    catch (IOException)
    {
        Console.WriteLine("Warning: could not read the users file.");
    }
}`)}
<p>Checking <code>parts.Length == 2</code> skips blank or damaged lines. <code>UsersFile</code> is a <code>private const string</code>, so the file name is written in one place only.</p>
<div class="tip">Load and Save are <code>private</code>: other classes don't need to know <em>how</em> users are stored. That's encapsulation (and abstraction) again.</div>
<p>This lesson's <code>users.txt</code> already contains <code>grace</code> (password <code>Rugby2026</code>).</p>`,
        files: { "users.txt": USERS_FILE },
        instructions: [
          "Make the constructor call <code>Load()</code>, and write <code>Load()</code> so it reads <code>users.txt</code> (if it exists) and adds a <code>User</code> for each line with two parts.",
          "Write <code>Save()</code> so it writes every user's <code>ToFileLine()</code> to <code>users.txt</code>.",
          "Call <code>Save()</code> in <code>Register</code> after the new user is added. Main should print <code>Loaded grace from users.txt</code> and then the file with grace and ciaran in it."
        ],
        starter: prog([USER, UM_STUB2], MAIN_L5),
        solution: prog([USER, UM], MAIN_L5),
        tests: [
          { type: "output", includes: "Loaded grace from users.txt", msg: "grace should be loaded from users.txt, so her login works.", help: "This check uses the pre-loaded <code>users.txt</code>, which contains grace. Main logs in as grace, so it should print <code>Loaded grace from users.txt</code>. Call <code>Load()</code> in the constructor and add a User for each two-part line (without hashing again)." },
          { type: "output", includes: "Account created. You can now log in.", msg: "ciaran should be registered.", help: "Main registers <code>ciaran</code> with <code>Pass1234</code>, so it should print <code>Account created. You can now log in.</code> Keep Register working as it did last lesson." },
          { type: "fn", fn: (o, c, f) => JSON.stringify(lines(f["users.txt"])) === JSON.stringify(["grace," + H.Rugby2026, "ciaran," + H.Pass1234]), msg: "users.txt should end up with grace's line and then ciaran's line (with his hashed password).", help: "This check reads <code>users.txt</code> after your program runs. It should hold grace's line then ciaran's line with his hashed password. Write Save with <code>File.WriteAllLines</code> and call <code>Save();</code> after <code>users.Add</code>." },
          { type: "code", pattern: "File\\.Exists", msg: "Check the file exists before reading it.", help: "This check looks for <code>File.Exists</code> in your code. Use it at the start of <code>Load</code>." }
        ],
        hint: "Constructor: Load(); Save: build a List<string> of u.ToFileLine() and File.WriteAllLines(UsersFile, lines); In Register put Save(); just after users.Add(...).",
        goal: "The program saves every account to users.txt and loads them again next time, so accounts survive after the program closes.",
        steps: [
          "Your <code>User</code> class and the <code>FindUser</code>, <code>Register</code> and <code>Login</code> methods you wrote last lesson are already here. Scroll to the <code>UserManager</code> constructor.",
          "In the constructor, replace the TODO with <code>Load();</code>",
          "In <code>Load</code>, start with <code>if (!File.Exists(UsersFile)) return;</code>",
          "Then, inside a <code>try</code>, loop <code>foreach (string line in File.ReadAllLines(UsersFile))</code>. Split with <code>line.Split(',')</code> and, if <code>parts.Length == 2</code>, add <code>new User(parts[0], parts[1])</code>. Catch <code>IOException</code> and print a warning. Run: you should see <code>Loaded grace from users.txt</code>.",
          "In <code>Save</code>, build a <code>List&lt;string&gt;</code> of <code>u.ToFileLine()</code> for every user, then <code>File.WriteAllLines(UsersFile, lines);</code>",
          "In <code>Register</code>, replace <code>// TODO: save the users</code> with <code>Save();</code> Run it and look at <code>users.txt</code> in the files panel."
        ],
        hints: [
          "Load once when the manager is created, and save every time a user is added. The file holds one <code>username,hash</code> line per user.",
          "Load reads with <code>File.ReadAllLines</code> and <code>Split(',')</code>; Save writes with <code>File.WriteAllLines</code> using each user's <code>ToFileLine()</code>. Check <code>File.Exists</code> before reading.",
          "<code>private void Save()<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;List&lt;string&gt; lines = new List&lt;string&gt;();<br>&nbsp;&nbsp;&nbsp;&nbsp;foreach (User u in users)<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lines.Add(u.ToFileLine());<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;File.WriteAllLines(UsersFile, lines);<br>}</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>Load()</code> but never calling it from the constructor, so grace isn't found.", fix: "Put <code>Load();</code> inside <code>public UserManager() { }</code>." },
          { wrong: "Reading the file without <code>File.Exists</code>, which crashes on the very first run.", fix: "Start Load with <code>if (!File.Exists(UsersFile)) return;</code>" },
          { wrong: "Using <code>File.AppendAllText</code> in Save, so grace gets written twice.", fix: "Save writes the whole list each time, so use <code>File.WriteAllLines</code> to replace the file." },
          { wrong: "Passing the hash through <code>User.Hash</code> again when loading: <code>new User(parts[0], User.Hash(parts[1]))</code>.", fix: "The file already holds the hash. Use <code>new User(parts[0], parts[1])</code>." }
        ]
      },

      // ================================================================ l6
      {
        id: "m14-l6",
        title: "Question classes: abstract and polymorphic",
        type: "code",
        learn: cs`
<p>The quiz will have different kinds of question, but the quiz itself shouldn't care which kind it's asking. So we design an <strong>abstract</strong> base class that says what <em>every</em> question can do:</p>
${pre(cs`
public abstract class Question
{
    public string Text { get; private set; }
    public int Points { get; private set; }

    protected Question(string text, int points)
    {
        Text = text;
        Points = points;
    }

    public abstract void Display();                 // show it
    public abstract bool IsValidAnswer(string answer); // validation
    public abstract bool CheckAnswer(string answer);   // marking
    public abstract string CorrectAnswerText();        // feedback
}`)}
<p>The constructor is <code>protected</code>: only subclasses can call it, because you should never make a plain <code>Question</code>.</p>
<p><code>MultipleChoiceQuestion</code> is written for you. Read it carefully. It stores options in an array and works out letters with <code>char</code> arithmetic: <code>(char)('A' + 2)</code> is <code>'C'</code>, and <code>'C' - 'A'</code> is <code>2</code>.</p>
<p>Your job is <code>TrueFalseQuestion</code>. It inherits from <code>Question</code>, passes the text and points up with <code>: base(text, points)</code>, and overrides all four abstract methods:</p>
${pre(cs`
public TrueFalseQuestion(string text, bool correctAnswer, int points)
    : base(text, points)
{
    this.correctAnswer = correctAnswer;
}

public override void Display()
{
    Console.WriteLine(Text);
    Console.Write("True or false? (T/F): ");
}`)}
<p>Then <code>Main</code> stores both kinds in one <code>List&lt;Question&gt;</code> and treats them identically. That's <strong>polymorphism</strong>: <code>q.Display()</code> runs the right version for each question.</p>`,
        instructions: [
          "Write <code>TrueFalseQuestion : Question</code> with a private <code>bool correctAnswer</code> and a constructor <code>(string text, bool correctAnswer, int points)</code> that calls <code>base(text, points)</code>.",
          "Override <code>Display</code> (print the text, then <code>True or false? (T/F): </code>), <code>IsValidAnswer</code> (accept T, F, TRUE or FALSE in any case; <code>null</code> is invalid), <code>CheckAnswer</code> and <code>CorrectAnswerText</code> (<code>True</code> or <code>False</code>).",
          "Add the true/false question to the list in <code>Main</code> where the TODO is."
        ],
        starter: prog([QUESTION, MCQ, TFQ_STUB], MAIN_L6_STUB),
        solution: prog([QUESTION, MCQ, TFQ], MAIN_L6),
        stdin: ["B", "F"],
        tests: [
          { type: "output", stdin: ["B", "F"], includes: "Score: 2", msg: "Answering B then F should score 2.", help: "With the answers <code>B</code> then <code>F</code>, both are right, so it should print <code>Score: 2</code>. Add the true/false question to the list in Main and check <code>CheckAnswer</code> compares with <code>correctAnswer</code>." },
          { type: "output", stdin: ["B", "F"], includes: "True or false? (T/F):", msg: "Display should end with True or false? (T/F): ", help: "Your <code>Display</code> should end with <code>True or false? (T/F): </code>. Use <code>Console.Write</code> with that exact text." },
          { type: "fn", stdin: ["E", "b", "yes", "true"], fn: (o) => count(o, "That is not a valid answer") === 2 && o.includes("Wrong. The answer was False") && o.includes("Score: 1"), msg: "E and yes are invalid; true is accepted but wrong (The answer was False), so the score is 1.", help: "This feeds in <code>E</code>, <code>b</code>, <code>yes</code>, <code>true</code>. <code>E</code> and <code>yes</code> must be rejected; <code>true</code> is accepted but wrong (<code>The answer was False</code>), so the score is 1. Check <code>IsValidAnswer</code> accepts only T, F, TRUE, FALSE after <code>Trim().ToUpper()</code>." },
          { type: "code", pattern: "class\\s+TrueFalseQuestion\\s*:\\s*Question", msg: "TrueFalseQuestion must inherit from Question.", help: "This check looks for <code>class TrueFalseQuestion : Question</code> in your code." },
          { type: "fn", fn: (o, c) => count(c, "override") >= 8, msg: "Override all four abstract methods in TrueFalseQuestion.", help: "This check counts the word <code>override</code>: MultipleChoiceQuestion has four, so you need four more in TrueFalseQuestion (Display, IsValidAnswer, CheckAnswer, CorrectAnswerText)." }
        ],
        hint: "IsValidAnswer: if (answer == null) return false; answer = answer.Trim().ToUpper(); return answer == \"T\" || answer == \"F\" || answer == \"TRUE\" || answer == \"FALSE\"; CheckAnswer: bool saidTrue = answer.Trim().ToUpper().StartsWith(\"T\"); return saidTrue == correctAnswer;",
        goal: "The program asks a multiple-choice and a true/false question in the same loop, rejects invalid answers and gives a score.",
        steps: [
          "The <code>User</code> and <code>UserManager</code> classes from earlier lessons are here unchanged. Read <code>Question</code> and <code>MultipleChoiceQuestion</code>: your class follows the same pattern.",
          "At <code>// TODO: class TrueFalseQuestion : Question</code>, start the class with <code>private bool correctAnswer;</code>",
          "Add the constructor: <code>public TrueFalseQuestion(string text, bool correctAnswer, int points) : base(text, points)</code> with <code>this.correctAnswer = correctAnswer;</code> inside.",
          "Add <code>public override void Display()</code>: print <code>Text</code>, then <code>Console.Write(\"True or false? (T/F): \");</code>",
          "Add <code>public override bool IsValidAnswer(string answer)</code>: return false for <code>null</code>, then <code>Trim().ToUpper()</code> and accept T, F, TRUE or FALSE.",
          "Add <code>CheckAnswer</code> (does the answer start with T, and does that match <code>correctAnswer</code>?) and <code>CorrectAnswerText</code> (return <code>\"True\"</code> or <code>\"False\"</code>), both with <code>override</code>.",
          "In <code>Main</code>, replace the TODO with <code>questions.Add(new TrueFalseQuestion(\"Array indexes in C# start at 1.\", false, 1));</code> Run with B then F."
        ],
        hints: [
          "<code>Question</code> is abstract and promises four methods. Your new class has to keep all four promises, just like <code>MultipleChoiceQuestion</code> does.",
          "Inherit with <code>: Question</code>, call <code>: base(text, points)</code>, and write four methods marked <code>override</code>. Tidy each answer with <code>Trim().ToUpper()</code> before comparing.",
          "<code>public override bool CheckAnswer(string answer)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;bool saidTrue = answer.Trim().ToUpper().StartsWith(\"T\");<br>&nbsp;&nbsp;&nbsp;&nbsp;return saidTrue == correctAnswer;<br>}</code>"
        ],
        mistakes: [
          { wrong: "Forgetting <code>: base(text, points)</code> on the constructor.", fix: "<code>Question</code> has no empty constructor, so pass the text and points up with <code>: base(text, points)</code>." },
          { wrong: "Missing <code>override</code> on one of the four methods, which gives an error that the abstract member isn't implemented.", fix: "All four need <code>public override</code>." },
          { wrong: "Writing <code>correctAnswer = correctAnswer;</code> in the constructor.", fix: "The parameter shadows the field. Use <code>this.correctAnswer = correctAnswer;</code>" },
          { wrong: "Trying <code>new Question(...)</code> in <code>Main</code>.", fix: "<code>Question</code> is abstract, so you can't create one. Create a <code>new TrueFalseQuestion(...)</code>." }
        ]
      },

      // ================================================================ l7
      {
        id: "m14-l7",
        title: "Quiz class: loading questions from a file",
        type: "code",
        learn: cs`
<p>Questions shouldn't be typed into the code. A teacher should be able to edit <code>questions.txt</code> without touching C#. Each line describes one question, with fields separated by <code>|</code> (a pipe, because questions often contain commas):</p>
${out(cs`
# lines starting with # are comments
MC|Which data type stores a whole number?|string;int;bool;double|1|1
TF|You cannot create an object from an abstract class.|True|2`)}
<p>For <code>MC</code>: text, options separated by <code>;</code>, the index of the correct option (from 0) and the points. For <code>TF</code>: text, <code>True</code>/<code>False</code> and the points.</p>
<h3>ParseQuestion: one line in, one object out</h3>
${pre(cs`
string[] parts = line.Split('|');
string type = parts[0].Trim().ToUpper();
if (type == "MC")
{
    string[] options = parts[2].Split(';');
    int correct = int.Parse(parts[3]);
    int points = int.Parse(parts[4]);
    if (correct < 0 || correct >= options.Length)
    {
        throw new FormatException();
    }
    return new MultipleChoiceQuestion(parts[1], options, correct, points);
}`)}
<p>Notice the return type is <code>Question</code>, but it returns a <code>MultipleChoiceQuestion</code> or a <code>TrueFalseQuestion</code>: polymorphism again.</p>
<h3>Exceptions do the validation</h3>
<p>Lots can be wrong with a line someone typed. Rather than check everything with <code>if</code>s, let the exceptions happen and catch them in <code>LoadFromFile</code>:</p>
<ul>
<li>A missing field means <code>parts[4]</code> doesn't exist: <code>IndexOutOfRangeException</code>.</li>
<li><code>int.Parse("x")</code> or <code>bool.Parse("Maybe")</code>: <code>FormatException</code>.</li>
<li>An unknown type or an impossible correct index: you <code>throw new FormatException()</code> yourself.</li>
</ul>
<p>The <code>try</code>/<code>catch</code> goes <em>inside</em> the loop, so one bad line is skipped with a message and the rest still load.</p>
<p>If <code>questions.txt</code> doesn't exist, <code>LoadFromFile</code> creates it from <code>DefaultQuestions()</code>. This lesson's file has three good lines and three broken ones.</p>`,
        files: { "questions.txt": Q_FILE_L7 },
        instructions: [
          "Write <code>ParseQuestion</code> to build a <code>MultipleChoiceQuestion</code> or <code>TrueFalseQuestion</code> from a line, throwing <code>FormatException</code> for an unknown type or a correct index outside the options.",
          "In <code>LoadFromFile</code>, add each parsed question inside a <code>try</code>. Catch <code>FormatException</code> and print <code>Skipped a badly formatted line: </code> plus the line; catch <code>IndexOutOfRangeException</code> and print <code>Skipped a line with missing parts: </code> plus the line.",
          "Main should print <code>Loaded 3 questions worth 4 points</code>."
        ],
        starter: prog([...QUIZ_CLASSES, QUIZ_STUB], MAIN_L7),
        solution: prog([...QUIZ_CLASSES, QUIZ_V1], MAIN_L7),
        tests: [
          { type: "output", includes: "Loaded 3 questions worth 4 points", msg: "The three good lines are worth 1 + 2 + 1 = 4 points.", help: "This uses the pre-loaded <code>questions.txt</code>. The three good lines are worth 1 + 2 + 1, so it should print <code>Loaded 3 questions worth 4 points</code>. Check MC uses <code>parts[4]</code> for points and TF uses <code>parts[3]</code>." },
          { type: "output", includes: "Skipped a badly formatted line: MC|Broken question|yes;no|5|1", msg: "Index 5 is out of range for 2 options: throw a FormatException.", help: "The line <code>MC|Broken question|yes;no|5|1</code> has index 5 but only 2 options. It should print <code>Skipped a badly formatted line: </code> and the line. Throw <code>new FormatException()</code> when the index is out of range." },
          { type: "output", includes: "Skipped a line with missing parts: TF|Missing the points|True", msg: "A TF line with no points should be skipped as missing parts.", help: "The line <code>TF|Missing the points|True</code> has no points, so <code>parts[3]</code> doesn't exist. It should print <code>Skipped a line with missing parts: </code> and the line. Catch <code>IndexOutOfRangeException</code>." },
          { type: "output", includes: "Skipped a badly formatted line: TF|Not a real answer|Maybe|1", msg: "Maybe isn't True or False, so bool.Parse throws a FormatException.", help: "The line <code>TF|Not a real answer|Maybe|1</code> should print <code>Skipped a badly formatted line: </code> and the line. Use <code>bool.Parse(parts[2])</code>, which throws a FormatException for Maybe." },
          { type: "code", pattern: "Split\\(\\s*'\\|'\\s*\\)|Split\\(\\s*\"\\|\"\\s*\\)", msg: "Split the line at the | character.", help: "This check looks for <code>Split('|')</code> (or <code>Split(\"|\")</code>) in your code." }
        ],
        hint: "Copy the MC example from the lesson, then do TF the same way with bool correct = bool.Parse(parts[2]); int points = int.Parse(parts[3]); End the method with throw new FormatException(); for unknown types.",
        goal: "The program loads questions from questions.txt, skips any broken lines with a clear message, and reports how many good questions it loaded.",
        steps: [
          "Your <code>Question</code> classes from last lesson are here. Open <code>questions.txt</code> in the files panel to see the good and broken lines. Then scroll to the <code>Quiz</code> class.",
          "In <code>ParseQuestion</code>, split the line: <code>string[] parts = line.Split('|');</code> and get the type with <code>parts[0].Trim().ToUpper()</code>.",
          "For <code>MC</code>: split <code>parts[2]</code> on <code>';'</code>, parse <code>parts[3]</code> and <code>parts[4]</code> as ints, throw <code>new FormatException()</code> if the index is out of range, then return a <code>new MultipleChoiceQuestion(...)</code>.",
          "For <code>TF</code>: <code>bool.Parse(parts[2])</code> and <code>int.Parse(parts[3])</code>, then return a <code>new TrueFalseQuestion(...)</code>. Keep <code>throw new FormatException();</code> at the very end for unknown types.",
          "In <code>LoadFromFile</code>, replace the TODO with a <code>try</code> around <code>questions.Add(ParseQuestion(line));</code>",
          "Add <code>catch (FormatException)</code> printing <code>Skipped a badly formatted line: </code> + line, and <code>catch (IndexOutOfRangeException)</code> printing <code>Skipped a line with missing parts: </code> + line. Run it."
        ],
        hints: [
          "Each line becomes one question object. If a line is broken, an exception will happen, and you catch it inside the loop so the other lines still load.",
          "Split on <code>'|'</code>, check <code>parts[0]</code> for <code>MC</code> or <code>TF</code>, and let <code>int.Parse</code>, <code>bool.Parse</code> and missing <code>parts[...]</code> throw. The try/catch goes in <code>LoadFromFile</code>, inside the <code>foreach</code>.",
          "<code>if (type == \"TF\")<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;bool correct = bool.Parse(parts[2]);<br>&nbsp;&nbsp;&nbsp;&nbsp;int points = int.Parse(parts[3]);<br>&nbsp;&nbsp;&nbsp;&nbsp;return new TrueFalseQuestion(parts[1], correct, points);<br>}<br>throw new FormatException();</code>"
        ],
        mistakes: [
          { wrong: "Splitting on a comma: <code>line.Split(',')</code>.", fix: "This file uses the pipe character: <code>line.Split('|')</code>. Options inside a question are split with <code>';'</code>." },
          { wrong: "Putting the try/catch around the whole loop, so loading stops at the first broken line.", fix: "Put the <code>try</code> inside the <code>foreach</code>, round just <code>questions.Add(ParseQuestion(line));</code>." },
          { wrong: "Forgetting to check the correct index, so <code>yes;no|5</code> is loaded.", fix: "After parsing, <code>if (correct &lt; 0 || correct &gt;= options.Length) throw new FormatException();</code>" },
          { wrong: "Catching <code>Exception</code> first, so every broken line gets the same message.", fix: "Catch <code>FormatException</code> and <code>IndexOutOfRangeException</code> separately, each with its own message." }
        ]
      },

      // ================================================================ l8
      {
        id: "m14-l8",
        title: "Quiz class: shuffle and run",
        type: "code",
        learn: cs`
<p>A quiz that always asks questions in the same order gets boring, and people start remembering answers by position. The <strong>Fisher-Yates shuffle</strong> mixes a list fairly:</p>
${pre(cs`
private void Shuffle()
{
    for (int i = questions.Count - 1; i > 0; i--)
    {
        int j = random.Next(i + 1);      // 0 to i
        Question temp = questions[i];    // swap items i and j
        questions[i] = questions[j];
        questions[j] = temp;
    }
}`)}
<p>Starting at the end, each position is swapped with a randomly chosen position at or before it. Every possible order is equally likely. The <code>Random</code> object is a field, created once, rather than a new one every time.</p>
<h3>Run: the quiz loop</h3>
<p><code>Run</code> shuffles, then for each question:</p>
<ol>
<li>prints a blank line and <code>Question 1 of 2 (1 point)</code> (or <code>points</code> when it's not 1);</li>
<li>calls <code>q.Display()</code>;</li>
<li>reads an answer and uses a <strong>validation loop</strong> with <code>q.IsValidAnswer</code>, printing <code>That is not a valid answer. Try again: </code>;</li>
<li>marks it with <code>q.CheckAnswer</code>, printing <code>Correct!</code> (and adding the points) or <code>Wrong. The answer was </code> plus <code>q.CorrectAnswerText()</code>.</li>
</ol>
<p>It returns the total score. You wrote almost exactly this loop in <code>Main</code> two lessons ago. Now it moves into the class where it belongs.</p>
<div class="tip">Plural trick: <code>$"point{(q.Points == 1 ? "" : "s")}"</code> adds an <em>s</em> only when needed.</div>`,
        files: { "questions.txt": Q_FILE_2 },
        instructions: [
          "Write <code>Shuffle()</code> using the Fisher-Yates method and the <code>random</code> field.",
          "Write <code>Run()</code> as described: shuffle, then for each question print <code>Question {number} of {count} ({points} point/points)</code>, display it, validate the answer, mark it and return the score.",
          "Main prints <code>You scored 3 out of 3</code> when every answer is right."
        ],
        starter: prog([...QUIZ_CLASSES, QUIZ_STUB2], MAIN_L8),
        solution: prog([...QUIZ_CLASSES, QUIZ], MAIN_L8),
        stdin: ["T", "B", "T", "B"],
        tests: [
          { type: "output", stdin: ["T", "B", "T", "B"], includes: "You scored 3 out of 3", msg: "Answering both questions correctly should print You scored 3 out of 3.", help: "This uses the pre-loaded <code>questions.txt</code> with one MC (answer B, 1 point) and one TF (answer True, 2 points). Answering everything right should print <code>You scored 3 out of 3</code>. Check you add <code>q.Points</code> and <code>return score;</code>" },
          { type: "output", stdin: ["F", "A", "F", "A"], includes: "You scored 0 out of 3", msg: "Wrong answers should score 0.", help: "Answering everything wrong should print <code>You scored 0 out of 3</code>. Only add points when <code>q.CheckAnswer(answer)</code> is true." },
          { type: "outputRegex", stdin: ["T", "B", "T", "B"], pattern: "Question 1 of 2 \\(\\d points?\\)[\\s\\S]*Question 2 of 2", msg: "Print Question 1 of 2 (… point/points) before each question.", help: "Each question should start with <code>Question 1 of 2 (… point/points)</code>. Print it before <code>q.Display()</code> and increase <code>number</code> each time." },
          { type: "fn", stdin: ["F", "A", "F", "A"], fn: (o) => o.includes("(2 points)") && o.includes("(1 point)") && o.includes("Wrong. The answer was True") && o.includes("Wrong. The answer was B) int"), msg: "Show (1 point)/(2 points), and Wrong. The answer was … for each wrong answer.", help: "With wrong answers, the output should show <code>(1 point)</code> and <code>(2 points)</code>, plus <code>Wrong. The answer was True</code> and <code>Wrong. The answer was B) int</code>. Use the plural trick and <code>q.CorrectAnswerText()</code>." },
          { type: "code", pattern: "random\\.Next\\(", msg: "Use random.Next in Shuffle.", help: "This check looks for <code>random.Next(</code> in your code. Use the <code>random</code> field in Shuffle." }
        ],
        hint: "Run: Shuffle(); int score = 0; int number = 1; foreach (Question q in questions) { ... number++; } return score;",
        goal: "The program shuffles the questions, asks each one with its number and points, checks and marks every answer, and shows the final score.",
        steps: [
          "Your <code>Quiz</code> class can already load questions (last lesson). Scroll to <code>Shuffle()</code> in <code>Quiz</code>.",
          "Write the Fisher-Yates loop: <code>for (int i = questions.Count - 1; i &gt; 0; i--)</code>, pick <code>int j = random.Next(i + 1);</code> and swap <code>questions[i]</code> and <code>questions[j]</code> using a <code>temp</code> variable.",
          "Find <code>Run()</code>. Start with <code>Shuffle();</code>, <code>int score = 0;</code> and <code>int number = 1;</code>, then <code>foreach (Question q in questions)</code>.",
          "In the loop, print a blank line and <code>$\"Question {number} of {questions.Count} ({q.Points} point{(q.Points == 1 ? \"\" : \"s\")})\"</code>, then call <code>q.Display();</code>",
          "Read the answer and copy the validation loop from lesson 6's <code>Main</code>: <code>while (!q.IsValidAnswer(answer))</code> re-ask with <code>That is not a valid answer. Try again: </code>",
          "Mark it like lesson 6 (<code>Correct!</code> and add the points, or <code>Wrong. The answer was ...</code>), then <code>number++;</code>. After the loop, <code>return score;</code> Run it."
        ],
        hints: [
          "You wrote the marking loop in <code>Main</code> two lessons ago. Now it moves into <code>Run()</code>, with a shuffle first and a question number on top.",
          "Shuffle by walking backwards and swapping each item with a random one at or before it (<code>random.Next(i + 1)</code>). In <code>Run</code>, keep a <code>number</code> counter and return <code>score</code> at the end.",
          "<code>for (int i = questions.Count - 1; i &gt; 0; i--)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;int j = random.Next(i + 1);<br>&nbsp;&nbsp;&nbsp;&nbsp;Question temp = questions[i];<br>&nbsp;&nbsp;&nbsp;&nbsp;questions[i] = questions[j];<br>&nbsp;&nbsp;&nbsp;&nbsp;questions[j] = temp;<br>}</code>"
        ],
        mistakes: [
          { wrong: "Leaving <code>return 0;</code> at the end of Run, so the score is always 0.", fix: "Return the running total: <code>return score;</code>" },
          { wrong: "Swapping without a temporary variable (<code>questions[i] = questions[j]; questions[j] = questions[i];</code>), which loses a question.", fix: "Save one first: <code>Question temp = questions[i];</code> then swap." },
          { wrong: "Making a <code>new Random()</code> inside Shuffle.", fix: "Use the <code>random</code> field that's already in the class." },
          { wrong: "Forgetting <code>number++</code>, so every question says <code>Question 1 of 2</code>.", fix: "Add <code>number++;</code> at the end of the loop body." }
        ]
      },

      // ================================================================ l9
      {
        id: "m14-l9",
        title: "Recording scores",
        type: "code",
        learn: cs`
<p>Every attempt should be saved with who took it, the score, the total and when. A <code>ScoreRecord</code> object holds one result. Its <code>Percentage</code> is a <strong>calculated property</strong>: it's worked out from <code>Score</code> and <code>Total</code> each time, so it can never be out of date.</p>
${pre(cs`
public double Percentage
{
    get
    {
        if (Total == 0) return 0;            // avoid dividing by zero
        return (double)Score / Total * 100;  // cast, or 3 / 4 would be 0
    }
}`)}
<h3>Dates in files</h3>
<p>Dates must be written in a fixed format so they can be read back. We use <code>yyyy-MM-dd HH:mm</code>, e.g. <code>2026-10-27 14:30</code>:</p>
${pre(cs`
public string ToFileLine()
{
    return $"{Username},{Score},{Total},{Date.ToString(DateFormat, CultureInfo.InvariantCulture)}";
}`)}
<p><code>CultureInfo.InvariantCulture</code> means "don't change the format depending on the computer's country settings". The static <code>FromFileLine</code> method (written for you) reverses this with <code>DateTime.ParseExact</code>.</p>
<h3>ScoreBoard</h3>
<p><code>ScoreBoard</code> looks after <code>scores.txt</code>. Saving <em>appends</em> one line, because old scores must never be overwritten:</p>
${pre(cs`
File.AppendAllText(ScoresFile, record.ToFileLine() + Environment.NewLine);`)}
<p><code>LoadAll()</code> (given) reads every line into a <code>List&lt;ScoreRecord&gt;</code>, skipping damaged lines. <code>ShowForUser</code> loops through that list and prints only the matching user's records. <code>Console.WriteLine(r)</code> uses the <code>ToString</code> override to line everything up in columns.</p>`,
        files: { "scores.txt": SCORES_L9 },
        instructions: [
          "In <code>ScoreRecord</code>, finish <code>Percentage</code> (0 if <code>Total</code> is 0) and <code>ToFileLine()</code> (<code>aoife,3,4,2026-10-27 14:30</code>).",
          "In <code>ScoreBoard</code>, write <code>Save</code> to append the record's file line plus <code>Environment.NewLine</code> to <code>scores.txt</code>.",
          "Write <code>ShowForUser</code>: print <code>\\n--- Scores for {username} ---</code>, then each of that user's records (ignore case), or <code>No quizzes taken yet.</code> if there are none."
        ],
        starter: prog([...QUIZ_CLASSES, QUIZ, SR_STUB, SB_STUB], MAIN_L9),
        solution: prog([...QUIZ_CLASSES, QUIZ, SR, SB_V1], MAIN_L9),
        tests: [
          { type: "output", includes: "Percentage: 75.0", msg: "3 out of 4 is Percentage: 75.0", help: "Main makes a record of 3 out of 4, so it should print <code>Percentage: 75.0</code>. Cast to <code>double</code> before dividing." },
          { type: "output", includes: "File line: aoife,3,4,2026-10-27 14:30", msg: "ToFileLine should give aoife,3,4,2026-10-27 14:30", help: "It should print <code>File line: aoife,3,4,2026-10-27 14:30</code>. Return the four parts joined by commas, with the date written using <code>DateFormat</code> and <code>CultureInfo.InvariantCulture</code>." },
          { type: "fn", fn: (o, c, f) => lines(f["scores.txt"]).slice(-1)[0] === "aoife,3,4,2026-10-27 14:30" && lines(f["scores.txt"]).length === 4, msg: "Save should append aoife,3,4,2026-10-27 14:30 as a new last line of scores.txt.", help: "This check reads <code>scores.txt</code> (pre-loaded with three lines) after your program runs. <code>aoife,3,4,2026-10-27 14:30</code> should be added as the last line. Use <code>AppendAllText</code>, not WriteAllText." },
          { type: "outputRegex", pattern: "--- Scores for Aoife ---\\s*\\n21/10/2026 11:00\\s+aoife\\s+4/4\\s+100\\.0%\\s*\\n27/10/2026 14:30\\s+aoife\\s+3/4\\s+75\\.0%", msg: "ShowForUser(\"Aoife\") should list aoife's two records (and not ben's).", help: "<code>ShowForUser(\"Aoife\")</code> should print the heading and aoife's two records but not ben's. Compare names with <code>.ToLower()</code> on both sides and print <code>r</code>." },
          { type: "outputRegex", pattern: "--- Scores for oisin ---\\s*\\nNo quizzes taken yet\\.", msg: "oisin has no scores: print No quizzes taken yet.", help: "<code>oisin</code> has no scores, so it should print the heading then <code>No quizzes taken yet.</code> Use a counter and check it after the loop." }
        ],
        hint: "ShowForUser: Console.WriteLine($\"\\n--- Scores for {username} ---\"); int count = 0; foreach (ScoreRecord r in LoadAll()) { if (r.Username.ToLower() == username.ToLower()) { Console.WriteLine(r); count++; } }",
        goal: "The program works out a score as a percentage, saves each quiz attempt to scores.txt, and lists a user's past scores.",
        steps: [
          "Your Quiz from the last two lessons is here unchanged. Scroll to <code>ScoreRecord</code> and find the <code>Percentage</code> property.",
          "Replace its TODO with <code>if (Total == 0) return 0;</code> and <code>return (double)Score / Total * 100;</code> Run it: you should see <code>Percentage: 75.0</code>.",
          "Find <code>ToFileLine()</code> and return <code>$\"{Username},{Score},{Total},{Date.ToString(DateFormat, CultureInfo.InvariantCulture)}\"</code>.",
          "Scroll to <code>ScoreBoard.Save</code> and write <code>File.AppendAllText(ScoresFile, record.ToFileLine() + Environment.NewLine);</code>",
          "In <code>ShowForUser</code>, print <code>$\"\\n--- Scores for {username} ---\"</code>, then loop <code>foreach (ScoreRecord r in LoadAll())</code> and print <code>r</code> when the usernames match (ignoring case). Count them.",
          "After the loop, if the count is 0 print <code>No quizzes taken yet.</code> Run it."
        ],
        hints: [
          "A record turns itself into a file line; the scoreboard adds that line to the file and later reads every line back to show one person's results.",
          "Cast to <code>double</code> before dividing in <code>Percentage</code>. Use <code>AppendAllText</code> (not WriteAllText) so old scores are kept. In <code>ShowForUser</code>, use a counter to know if you found any.",
          "<code>int count = 0;<br>foreach (ScoreRecord r in LoadAll())<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;if (r.Username.ToLower() == username.ToLower())<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(r);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count++;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>if (count == 0) Console.WriteLine(\"No quizzes taken yet.\");</code>"
        ],
        mistakes: [
          { wrong: "Writing <code>Score / Total * 100</code> without the cast, so 3 / 4 becomes 0.", fix: "Cast first: <code>(double)Score / Total * 100</code>." },
          { wrong: "Using <code>File.WriteAllText</code> in Save, which wipes all the old scores.", fix: "Use <code>File.AppendAllText</code> and add <code>Environment.NewLine</code>." },
          { wrong: "Writing the date as <code>{Date}</code>, which gives a different format on different computers.", fix: "Use <code>Date.ToString(DateFormat, CultureInfo.InvariantCulture)</code>." },
          { wrong: "Printing <code>No quizzes taken yet.</code> inside the loop.", fix: "Decide after the loop, using the counter." }
        ]
      },

      // ================================================================ l10
      {
        id: "m14-l10",
        title: "The leaderboard: bubble sort",
        type: "code",
        learn: cs`
<p>A leaderboard shows the best results first, so the records need <strong>sorting</strong> by percentage, highest first. You could use <code>List.Sort</code>, but writing a <strong>bubble sort</strong> yourself is a classic GCSE algorithm, and shows exactly what's happening.</p>
<h3>How bubble sort works</h3>
<ol>
<li>Compare the first two items. If they're in the wrong order, swap them.</li>
<li>Move along one and compare the next pair. Keep going to the end of the list. That's one <strong>pass</strong>, and the smallest value has now "bubbled" to the end.</li>
<li>Repeat. Each pass can stop one item earlier, because the end is already sorted.</li>
</ol>
${pre(cs`
for (int pass = 0; pass < records.Count - 1; pass++)
{
    for (int i = 0; i < records.Count - 1 - pass; i++)
    {
        if (records[i].Percentage < records[i + 1].Percentage)   // wrong order?
        {
            ScoreRecord temp = records[i];      // swap using a temporary variable
            records[i] = records[i + 1];
            records[i + 1] = temp;
        }
    }
}`)}
<p>Because we compare whole <code>ScoreRecord</code> objects' percentages but swap the <em>objects</em>, each record's name, score and date move together. No parallel arrays to keep in step!</p>
<p>Using <code>&lt;</code> sorts into <strong>descending</strong> order (biggest first). Using <code>&gt;</code> would sort ascending.</p>
<h3>Showing the top few</h3>
${pre(cs`
for (int i = 0; i < records.Count && i < howMany; i++)
{
    Console.WriteLine($"{i + 1}. {records[i]}");
}`)}
<p>The loop stops at whichever comes first: the end of the list or <code>howMany</code> records.</p>`,
        files: { "scores.txt": SCORES_L10 },
        instructions: [
          "In <code>ShowLeaderboard</code>, bubble sort <code>records</code> so the highest <code>Percentage</code> comes first.",
          "Print <code>\\n--- Top {howMany} ---</code>, then up to <code>howMany</code> records numbered <code>1. </code>, <code>2. </code> and so on. Print <code>No scores yet.</code> if there are no records.",
          "The top 3 should be aoife (100%), niamh (87.5%) and grace (83.3%)."
        ],
        starter: prog([...QUIZ_CLASSES, QUIZ, SR, SB_STUB2], MAIN_L10),
        solution: prog([...QUIZ_CLASSES, QUIZ, SR, SB], MAIN_L10),
        tests: [
          { type: "outputRegex", pattern: "--- Top 3 ---\\s*\\n1\\. .*aoife.*100\\.0%\\s*\\n2\\. .*niamh.*87\\.5%\\s*\\n3\\. .*grace.*83\\.3%", msg: "Top 3 should be 1. aoife, 2. niamh, 3. grace.", help: "This uses the pre-loaded <code>scores.txt</code>. The Top 3 should be <code>1. aoife</code> (100%), <code>2. niamh</code> (87.5%), <code>3. grace</code> (83.3%). Check you sort with <code>&lt;</code> so the highest comes first." },
          { type: "fn", fn: (o) => { const top3 = (o.split("--- Top 3 ---")[1] || "").split("--- Top 10 ---")[0]; return !/oisin|ben/.test(top3); }, msg: "Only 3 records should be shown in the Top 3.", help: "Only 3 records should appear under <code>--- Top 3 ---</code>. Stop the print loop when <code>i</code> reaches <code>howMany</code>." },
          { type: "outputRegex", pattern: "--- Top 10 ---[\\s\\S]*4\\. .*ben[\\s\\S]*5\\. .*oisin", msg: "Top 10 shows all 5 records, ending 4. ben, 5. oisin.", help: "The Top 10 should show all 5 records, ending with <code>4. ben</code> and <code>5. oisin</code>. Make sure the print loop also stops at <code>records.Count</code>." },
          { type: "fn", fn: (o) => !/\n6\. /.test(o), msg: "Don't print more records than there are (no 6.).", help: "There are only 5 records, so no line should start with <code>6.</code> Use <code>i &lt; records.Count &amp;&amp; i &lt; howMany</code>." },
          { type: "code", pattern: "\\w+\\[\\s*i\\s*\\]\\s*=\\s*\\w+\\[\\s*i\\s*\\+\\s*1\\s*\\]", msg: "Swap neighbouring records, e.g. records[i] = records[i + 1], using a temporary variable.", help: "This check looks for a swap of neighbours like <code>records[i] = records[i + 1]</code>. Write your own bubble sort rather than using <code>Sort()</code>." }
        ],
        hint: "Two nested for loops: outer for each pass, inner from 0 to records.Count - 1 - pass. If records[i].Percentage < records[i + 1].Percentage, swap them.",
        goal: "The program sorts every saved score from best to worst and shows a numbered leaderboard of the top few.",
        steps: [
          "Your <code>ScoreBoard</code> can already save and show scores (last lesson). Scroll to <code>ShowLeaderboard</code>.",
          "Under the first TODO, write the outer loop: <code>for (int pass = 0; pass &lt; records.Count - 1; pass++)</code>",
          "Inside it, write the inner loop: <code>for (int i = 0; i &lt; records.Count - 1 - pass; i++)</code>",
          "Inside that, if <code>records[i].Percentage &lt; records[i + 1].Percentage</code>, swap them using <code>ScoreRecord temp = records[i];</code>",
          "Under the second TODO, print <code>$\"\\n--- Top {howMany} ---\"</code>, and <code>No scores yet.</code> if the list is empty.",
          "Loop <code>for (int i = 0; i &lt; records.Count &amp;&amp; i &lt; howMany; i++)</code> printing <code>$\"{i + 1}. {records[i]}\"</code>. Run it."
        ],
        hints: [
          "Compare each pair of neighbours and swap them if they're the wrong way round. Repeat until no big ones are left behind.",
          "Use two nested <code>for</code> loops and a <code>temp</code> variable for the swap. Use <code>&lt;</code> to put the highest first. When printing, stop at whichever comes first: the end of the list or <code>howMany</code>.",
          "<code>if (records[i].Percentage &lt; records[i + 1].Percentage)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;ScoreRecord temp = records[i];<br>&nbsp;&nbsp;&nbsp;&nbsp;records[i] = records[i + 1];<br>&nbsp;&nbsp;&nbsp;&nbsp;records[i + 1] = temp;<br>}</code>"
        ],
        mistakes: [
          { wrong: "Using <code>&gt;</code> in the comparison, which sorts lowest first.", fix: "For a leaderboard, swap when the left one is <em>smaller</em>: <code>&lt;</code>." },
          { wrong: "Inner loop going to <code>i &lt; records.Count</code>, which crashes on <code>records[i + 1]</code>.", fix: "Stop one early: <code>i &lt; records.Count - 1 - pass</code>." },
          { wrong: "Printing with <code>i &lt; howMany</code> only, which crashes when there are fewer records than <code>howMany</code>.", fix: "Use both conditions: <code>i &lt; records.Count &amp;&amp; i &lt; howMany</code>." },
          { wrong: "Numbering from 0, giving <code>0. aoife</code>.", fix: "Print <code>{i + 1}</code>." }
        ]
      },

      // ================================================================ l11
      {
        id: "m14-l11",
        title: "Menus that never crash",
        type: "code",
        learn: cs`
<p>All the classes are built. Now <code>Program</code> becomes the real user interface. It holds one <code>UserManager</code> and one <code>ScoreBoard</code> as <code>static</code> fields, so every screen method can use them:</p>
${pre(cs`
static UserManager userManager = new UserManager();
static ScoreBoard scoreBoard = new ScoreBoard();`)}
<p>The register, login and take-quiz screens are written for you. Read them. The login screen allows <code>MaxLoginAttempts</code> tries; <code>RegisterScreen</code> asks for the password twice (verification by double entry).</p>
<h3>Menus with GetIntInRange</h3>
<p>A menu is a loop: show the options, get a validated choice, act on it with a <code>switch</code>, repeat until the user chooses to leave. Your <code>GetIntInRange</code> method from the validation module makes it crash-proof:</p>
${pre(cs`
bool running = true;
while (running)
{
    Console.WriteLine("1. Register");
    Console.WriteLine("2. Log in");
    Console.WriteLine("3. Exit");
    int choice = GetIntInRange("Choose an option: ", 1, 3);
    switch (choice)
    {
        case 1:
            RegisterScreen();
            break;
        case 2:
            User user = LoginScreen();
            if (user != null)
            {
                UserMenu(user);
            }
            break;
        case 3:
            running = false;
            break;
    }
}
Console.WriteLine("Goodbye!");`)}
<p>After logging in, the user gets a second menu inside <code>UserMenu</code>, with its own loop. Choosing <em>Log out</em> ends that loop and returns to the main menu.</p>
<div class="tip">Each screen is its own method, so <code>Main</code> reads almost like the plan. That's <strong>decomposition</strong>: breaking a big problem into smaller parts.</div>
<p>For now <code>ReadPassword</code> just uses <code>Console.ReadLine</code>; you'll hide the password next lesson. The files are pre-loaded: <code>grace</code> (password <code>Rugby2026</code>) and one true/false question.</p>`,
        files: { "users.txt": USERS_FILE, "questions.txt": Q_FILE_1 },
        instructions: [
          "Write <code>GetIntInRange</code> (prompt, then re-ask with <code>Please enter a whole number from {min} to {max}: </code>).",
          "Write <code>Main</code>: the main menu loop exactly as in the comments, ending with <code>Goodbye!</code>",
          "Write <code>UserMenu</code>: the logged-in menu loop as in the comments. Option 4 prints <code>You have been logged out.</code>"
        ],
        starter: full(ALL_BUT_PROGRAM, PROGRAM_STUB),
        solution: full(ALL_BUT_PROGRAM, PROGRAM_V1),
        stdin: ["2", "grace", "Rugby2026", "1", "T", "4", "3"],
        tests: [
          { type: "outputRegex", stdin: ["7", "menu", "3"], pattern: "C# QUIZ - MENU[\\s\\S]*Please enter a whole number from 1 to 3[\\s\\S]*Please enter a whole number from 1 to 3[\\s\\S]*Goodbye!", msg: "Show the menu, reject 7 and menu with Please enter a whole number from 1 to 3:, then Exit with Goodbye!", help: "This feeds in <code>7</code>, <code>menu</code>, then <code>3</code>. It should show the menu, reject 7 and menu with <code>Please enter a whole number from 1 to 3</code>, then print <code>Goodbye!</code> Write the TryParse loop in GetIntInRange and use it in Main." },
          { type: "fn", stdin: ["2", "grace", "Rugby2026", "1", "T", "4", "3"], fn: (o, c, f) => o.includes("Welcome back, grace!") && o.includes("You scored 2 out of 2 (100.0%)") && o.includes("You have been logged out.") && /grace,2,2,/.test(f["scores.txt"] || ""), msg: "Log in as grace, take the quiz (2 out of 2, saved to scores.txt), then log out.", help: "This logs in as <code>grace</code>, takes the quiz (answer T), then logs out and exits. It needs <code>Welcome back, grace!</code>, <code>You scored 2 out of 2</code>, <code>You have been logged out.</code> and a new line in <code>scores.txt</code>. Check case 2 calls UserMenu, and UserMenu case 1 calls <code>TakeQuiz(user)</code>." },
          { type: "fn", stdin: ["2", "grace", "Rugby2026", "9", "2", "3", "4", "3"], fn: (o) => o.includes("Please enter a whole number from 1 to 4") && o.includes("--- Scores for grace ---") && o.includes("--- Top 5 ---") && o.includes("Goodbye!"), msg: "The user menu should reject 9, then show My scores (2) and the Leaderboard (3).", help: "This logs in as grace, types 9 at the user menu, then chooses 2 and 3. It needs the 1 to 4 error message, <code>--- Scores for grace ---</code> and <code>--- Top 5 ---</code>. Use <code>GetIntInRange(..., 1, 4)</code> and wire up cases 2 and 3." },
          { type: "fn", stdin: ["1", "oisin", "Pass1234", "Pass1234", "2", "oisin", "Pass1234", "4", "3"], fn: (o, c, f) => o.includes("Account created. You can now log in.") && o.includes("Welcome back, oisin!") && (f["users.txt"] || "").includes("oisin," + H.Pass1234), msg: "Option 1 should register oisin, who can then log in.", help: "This chooses 1 to register <code>oisin</code>, then logs in as him. Case 1 must call <code>RegisterScreen()</code>, and the menu must loop back afterwards." },
          { type: "output", stdin: ["2", "grace", "a", "grace", "b", "grace", "c", "3"], includes: "Too many failed attempts.", msg: "Option 2 should lead to the login screen (three wrong passwords lock you out).", help: "This chooses 2 and types three wrong passwords for grace. It should print <code>Too many failed attempts.</code> Make sure case 2 calls <code>LoginScreen()</code>." }
        ],
        hint: "GetIntInRange is the same as in the validation module. For UserMenu, copy the shape of the main menu loop: bool loggedIn = true; while (loggedIn) { ...print options...; int choice = GetIntInRange(\"Choose an option: \", 1, 4); switch (choice) { ... } }",
        goal: "The program shows a main menu (register, log in, exit) and, after logging in, a user menu to take the quiz, see scores or the leaderboard, and log out, never crashing on bad input.",
        steps: [
          "Every class you've built (User, UserManager, the Questions, Quiz, ScoreRecord, ScoreBoard) is above. Scroll down to the <code>Program</code> class, to <code>GetIntInRange</code> at the bottom.",
          "Write <code>GetIntInRange</code> exactly as in the validation module: show the prompt, loop with <code>int.TryParse</code> and the <code>min</code>/<code>max</code> checks, then <code>return value;</code>",
          "Go to <code>Main</code>. Write <code>bool running = true;</code> and <code>while (running)</code>, printing the menu lines shown in the TODO comment.",
          "Get the choice with <code>GetIntInRange(\"Choose an option: \", 1, 3)</code> and add a <code>switch</code>: case 1 calls <code>RegisterScreen()</code>, case 2 calls <code>LoginScreen()</code> and then <code>UserMenu(user)</code> if it isn't <code>null</code>, case 3 sets <code>running = false</code>.",
          "After the loop print <code>Goodbye!</code> Run it and type <code>3</code> to check.",
          "Write <code>UserMenu</code> the same way with <code>bool loggedIn = true;</code>, the four options and <code>GetIntInRange(\"Choose an option: \", 1, 4)</code>. Case 4 prints <code>You have been logged out.</code> and sets <code>loggedIn = false</code>.",
          "Run it: log in as <code>grace</code> / <code>Rugby2026</code>, take the quiz, look at your scores, then log out and exit."
        ],
        hints: [
          "A menu is a loop that shows options, gets a safe number, does one thing, and repeats until the user chooses to leave.",
          "Use a <code>bool</code> flag with a <code>while</code> loop, <code>GetIntInRange</code> for the choice, and a <code>switch</code> with one <code>case</code> per option (each ending in <code>break;</code>).",
          "<code>case 2:<br>&nbsp;&nbsp;&nbsp;&nbsp;User user = LoginScreen();<br>&nbsp;&nbsp;&nbsp;&nbsp;if (user != null)<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;UserMenu(user);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;break;</code>"
        ],
        mistakes: [
          { wrong: "Leaving <code>return min;</code> in GetIntInRange, so every choice is option 1.", fix: "Write the TryParse loop and <code>return value;</code>" },
          { wrong: "Forgetting <code>break;</code> at the end of a <code>case</code>, which won't compile in C#.", fix: "End every case with <code>break;</code>" },
          { wrong: "Calling <code>UserMenu(user)</code> without checking for <code>null</code>.", fix: "<code>LoginScreen</code> returns <code>null</code> after three failed tries, so wrap the call in <code>if (user != null)</code>." },
          { wrong: "Printing <code>Goodbye!</code> inside the loop.", fix: "Put it after the <code>while</code> loop's closing <code>}</code>." }
        ]
      },

      // ================================================================ l12
      {
        id: "m14-l12",
        title: "Hiding the password",
        type: "code",
        learn: cs`
<p>Anyone looking over your shoulder can read a password typed with <code>Console.ReadLine</code>. Real login screens show <code>********</code> instead. To do that, read <strong>one key at a time</strong> with <code>Console.ReadKey(true)</code>.</p>
<ul>
<li><code>Console.ReadKey(true)</code> waits for a single key press and returns a <code>ConsoleKeyInfo</code>. The <code>true</code> means "intercept": <strong>don't</strong> show the key on screen.</li>
<li><code>key.Key</code> says which key it was, e.g. <code>ConsoleKey.Enter</code> or <code>ConsoleKey.Backspace</code>.</li>
<li><code>key.KeyChar</code> is the character typed, e.g. <code>'R'</code>.</li>
</ul>
${pre(cs`
static string ReadPassword()
{
    string password = "";
    ConsoleKeyInfo key = Console.ReadKey(true);
    while (key.Key != ConsoleKey.Enter)
    {
        if (key.Key == ConsoleKey.Backspace)
        {
            if (password.Length > 0)
            {
                password = password.Substring(0, password.Length - 1);
                Console.Write("\b \b");
            }
        }
        else if (!char.IsControl(key.KeyChar))
        {
            password += key.KeyChar;
            Console.Write("*");
        }
        key = Console.ReadKey(true);
    }
    Console.WriteLine();
    return password;
}`)}
<p>The loop keeps reading keys until Enter. Each normal character is added to the password, and a <code>*</code> is shown instead.</p>
<h3>Backspace</h3>
<p>If the user makes a typo, Backspace removes the last character from the string with <code>Substring</code>. On screen, <code>"\b \b"</code> moves the cursor back, prints a space over the star, then moves back again, so the star disappears. The <code>password.Length &gt; 0</code> check stops you deleting past the start.</p>
<p><code>char.IsControl</code> ignores keys like Tab or Escape that aren't printable characters.</p>
<div class="warn">Only one method changes this lesson. Because every screen calls <code>ReadPassword()</code>, they all get masking at once. That's the payoff of reusable methods.</div>`,
        files: { "users.txt": USERS_FILE, "questions.txt": Q_FILE_1 },
        instructions: [
          "Rewrite <code>ReadPassword</code> using <code>Console.ReadKey(true)</code> in a loop that stops at Enter.",
          "Show <code>*</code> for each character; on Backspace remove the last character (if any) and write <code>\"\\b \\b\"</code>. Finish with <code>Console.WriteLine()</code> and return the password.",
          "Logging in as <code>grace</code> should now show <code>Password: *********</code> (9 stars for <code>Rugby2026</code>)."
        ],
        starter: full(ALL_BUT_PROGRAM, PROGRAM_V2_STUB),
        solution: full(ALL_BUT_PROGRAM, PROGRAM_V2),
        stdin: ["2", "grace", "Rugby2026", "4", "3"],
        tests: [
          { type: "output", stdin: ["2", "grace", "Rugby2026", "4", "3"], includes: "Password: *********\n", msg: "Typing Rugby2026 should show Password: ********* (9 stars) and then a new line.", help: "This logs in as grace with <code>Rugby2026</code>. It should show <code>Password: *********</code> (9 stars) and then a new line. Write <code>*</code> for each character and <code>Console.WriteLine()</code> after the loop." },
          { type: "output", stdin: ["2", "grace", "Rugby2026", "4", "3"], includes: "Welcome back, grace!", msg: "The masked password should still log grace in.", help: "With the masked password, grace should still log in and see <code>Welcome back, grace!</code> Make sure you add <code>key.KeyChar</code> to <code>password</code> and return it." },
          { type: "output", stdin: ["2", "grace", "Rugby20266\b", "4", "3"], includes: "Welcome back, grace!", msg: "Typing an extra 6 and pressing Backspace should remove it, so grace still logs in.", help: "This types <code>Rugby20266</code> then Backspace. The extra 6 should be removed, so grace still logs in. Handle <code>ConsoleKey.Backspace</code> with <code>Substring(0, password.Length - 1)</code>." },
          { type: "code", pattern: "ReadKey\\(\\s*true\\s*\\)", msg: "Use Console.ReadKey(true) so keys aren't shown.", help: "This check looks for <code>ReadKey(true)</code> in your code." },
          { type: "code", pattern: "ConsoleKey\\.Backspace", msg: "Handle ConsoleKey.Backspace.", help: "This check looks for <code>ConsoleKey.Backspace</code> in your code." }
        ],
        hint: "ConsoleKeyInfo key = Console.ReadKey(true); while (key.Key != ConsoleKey.Enter) { ... key = Console.ReadKey(true); } Don't forget to read the next key at the end of the loop, or it will never stop!",
        goal: "The login and register screens show a star for each character of your password instead of the password itself, and Backspace works.",
        steps: [
          "Your whole program with menus from last lesson is here. Scroll to <code>ReadPassword</code> at the bottom of <code>Program</code>.",
          "Replace its body: start with <code>string password = \"\";</code> and <code>ConsoleKeyInfo key = Console.ReadKey(true);</code>",
          "Add <code>while (key.Key != ConsoleKey.Enter)</code>. As the <strong>last</strong> line inside the loop, read the next key: <code>key = Console.ReadKey(true);</code>",
          "Inside the loop, before that line, handle a normal key: <code>else if (!char.IsControl(key.KeyChar))</code> adds <code>key.KeyChar</code> to <code>password</code> and writes <code>*</code>.",
          "Handle Backspace first: <code>if (key.Key == ConsoleKey.Backspace)</code>, and if <code>password.Length &gt; 0</code>, remove the last character with <code>Substring</code> and write <code>\"\\b \\b\"</code>.",
          "After the loop, <code>Console.WriteLine();</code> and <code>return password;</code> Run it and log in as grace."
        ],
        hints: [
          "Instead of reading a whole line, read one key at a time, hide it, and show a star. Stop when the key is Enter.",
          "Use <code>Console.ReadKey(true)</code> before the loop and again at the end of the loop. Check <code>key.Key</code> for Enter and Backspace, and use <code>key.KeyChar</code> for the character.",
          "<code>if (key.Key == ConsoleKey.Backspace)<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;if (password.Length &gt; 0)<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password = password.Substring(0, password.Length - 1);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.Write(\"\\b \\b\");<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}</code>"
        ],
        mistakes: [
          { wrong: "Forgetting to read the next key at the end of the loop, so it never stops.", fix: "The last line inside the <code>while</code> must be <code>key = Console.ReadKey(true);</code>" },
          { wrong: "Using <code>Console.ReadKey()</code> without <code>true</code>, so the real characters still show.", fix: "Pass <code>true</code> to hide the key: <code>Console.ReadKey(true)</code>." },
          { wrong: "Adding Backspace to the password as a character.", fix: "Check for <code>ConsoleKey.Backspace</code> first, and only add characters in the <code>else if</code>." },
          { wrong: "Forgetting <code>Console.WriteLine();</code> after the loop, so the next message appears on the same line as the stars.", fix: "Add <code>Console.WriteLine();</code> just before <code>return password;</code>" }
        ]
      },

      // ================================================================ l13
      {
        id: "m14-l13",
        title: "Put it all together",
        type: "code",
        learn: cs`
<p>This is the complete program, about 700 lines, built by you one class at a time. Two finishing touches remain.</p>
<h3>1. Feedback</h3>
<p>A score on its own is a bit flat. Add a method that turns a percentage into a message, checking the <strong>highest boundary first</strong> (remember the logic error from the selection module):</p>
<table>
<tr><th>Percentage</th><th>Message</th></tr>
<tr><td>90 or more</td><td><code>Outstanding - you really know your C#!</code></td></tr>
<tr><td>70 or more</td><td><code>Great work - just a few to review.</code></td></tr>
<tr><td>50 or more</td><td><code>A solid pass - revisit the parts you missed.</code></td></tr>
<tr><td>below 50</td><td><code>Keep practising - work back through the tutorial and try again.</code></td></tr>
</table>
<h3>2. A namespace</h3>
<p>Visual Studio puts your classes in a <strong>namespace</strong> named after the project. It groups related classes so their names can't clash with classes in other libraries. Add this line after the <code>using</code> lines:</p>
${pre(cs`
namespace QuizApp;`)}
<p>This short "file-scoped" form applies to everything below it. (You'll also see the older form <code>namespace QuizApp { ... }</code> with all the classes inside the brackets.)</p>
<h3>Test it properly</h3>
<p>Run it yourself and work through a test plan: register with valid, boundary and erroneous usernames and passwords; log in with wrong passwords; type letters at menus; take the quiz several times and check the leaderboard. Look at <code>users.txt</code> and <code>scores.txt</code> in the files panel as you go. Can you spot any password in plain text? You shouldn't!</p>
<div class="tip">The pre-loaded files: <code>grace</code> / <code>Rugby2026</code>, two questions and a few old scores.</div>`,
        files: { "users.txt": USERS_FILE, "questions.txt": Q_FILE_2, "scores.txt": SCORES_L9 },
        instructions: [
          "Add <code>namespace QuizApp;</code> under the <code>using</code> lines.",
          "Write <code>static string GetFeedback(double percentage)</code> returning the four messages from the table (exact wording).",
          "In <code>TakeQuiz</code>, print <code>GetFeedback(record.Percentage)</code> straight after the <code>You scored</code> line."
        ],
        starter: full(ALL_BUT_PROGRAM, PROGRAM_V3_STUB, "// TODO: add the namespace line here"),
        solution: full(ALL_BUT_PROGRAM, PROGRAM_V3, "namespace QuizApp;"),
        stdin: ["2", "grace", "Rugby2026", "1", "T", "B", "T", "B", "4", "3"],
        tests: [
          { type: "outputRegex", stdin: ["2", "grace", "Rugby2026", "1", "T", "B", "T", "B", "4", "3"], pattern: "You scored 3 out of 3 \\(100\\.0%\\)\\s*\\nOutstanding - you really know your C#!", msg: "3 out of 3 should print Outstanding - you really know your C#! straight after the score.", help: "This logs in as grace and gets 3 out of 3. <code>Outstanding - you really know your C#!</code> should appear on the line straight after <code>You scored 3 out of 3 (100.0%)</code>. Print GetFeedback right after that line in TakeQuiz." },
          { type: "output", stdin: ["2", "grace", "Rugby2026", "1", "T", "A", "T", "A", "4", "3"], includes: "A solid pass - revisit the parts you missed.", msg: "2 out of 3 (66.7%) should print A solid pass - revisit the parts you missed.", help: "This scores 2 out of 3 (66.7%), so it should print <code>A solid pass - revisit the parts you missed.</code> Check your bands are in order 90, 70, 50." },
          { type: "output", stdin: ["2", "grace", "Rugby2026", "1", "F", "B", "F", "4", "3"], includes: "Keep practising - work back through the tutorial and try again.", msg: "1 out of 3 (33.3%) should print Keep practising - work back through the tutorial and try again.", help: "This scores 1 out of 3 (33.3%), so it should print <code>Keep practising - work back through the tutorial and try again.</code> Add a final <code>return</code> for below 50." },
          { type: "fn", stdin: ["2", "grace", "Rugby2026", "3", "4", "3"], fn: (o) => /--- Top 5 ---\s*\n1\. .*aoife/.test(o) && o.includes("Goodbye!"), msg: "The leaderboard should still work (aoife on top).", help: "This logs in and opens the leaderboard. It should still show <code>--- Top 5 ---</code> with aoife first, then <code>Goodbye!</code> If this fails, check the namespace line hasn't broken anything else." },
          { type: "code", pattern: "namespace\\s+QuizApp", msg: "Add namespace QuizApp;", help: "This check looks for <code>namespace QuizApp</code> in your code." },
          { type: "code", pattern: "Great work - just a few to review\\.", msg: "Include the Great work - just a few to review. message for 70 or more.", help: "This check looks for the exact text <code>Great work - just a few to review.</code> in your code, for the 70 or more band." }
        ],
        hint: "if (percentage >= 90) return \"Outstanding - you really know your C#!\"; if (percentage >= 70) return ...; and so on, with a final return for below 50.",
        goal: "The finished quiz app gives an encouraging message after every quiz based on your percentage, with all classes inside the QuizApp namespace.",
        steps: [
          "This is your complete program from the last two lessons, with masked passwords. Find <code>// TODO: add the namespace line here</code> near the top and replace it with <code>namespace QuizApp;</code>",
          "Scroll to <code>// TODO: static string GetFeedback(double percentage)</code> in the <code>Program</code> class.",
          "Write the method, checking the highest boundary first: <code>if (percentage &gt;= 90) return \"Outstanding - you really know your C#!\";</code>",
          "Add the <code>&gt;= 70</code> and <code>&gt;= 50</code> lines with their messages, and a final <code>return</code> for below 50.",
          "In <code>TakeQuiz</code>, replace <code>// TODO: print GetFeedback...</code> with <code>Console.WriteLine(GetFeedback(record.Percentage));</code>",
          "Run it, log in as grace / <code>Rugby2026</code>, and take the quiz a few times with different answers."
        ],
        hints: [
          "Pick one of four messages based on the percentage. Start from the top band and work down, so each score gets caught by the first band it fits.",
          "Use a chain of <code>if (...) return ...;</code> lines from 90 down to 50, then a plain <code>return</code> at the end. Call the method straight after the <code>You scored</code> line.",
          "<code>if (percentage &gt;= 90) return \"Outstanding - you really know your C#!\";<br>if (percentage &gt;= 70) return \"Great work - just a few to review.\";<br>if (percentage &gt;= 50) return \"A solid pass - revisit the parts you missed.\";</code>"
        ],
        mistakes: [
          { wrong: "Checking <code>&gt;= 50</code> first, so 100% gets the solid pass message.", fix: "Check the highest boundary first: 90, then 70, then 50." },
          { wrong: "Forgetting the final <code>return</code> for below 50, which gives \"not all code paths return a value\".", fix: "End the method with <code>return \"Keep practising - work back through the tutorial and try again.\";</code>" },
          { wrong: "Writing <code>namespace QuizApp</code> without the semicolon, or above the <code>using</code> lines.", fix: "Put <code>namespace QuizApp;</code> after the <code>using</code> lines, with a semicolon." },
          { wrong: "Using a different dash or missing the full stop in a message.", fix: "Copy the messages exactly from the table: a plain hyphen <code>-</code> and the full stop at the end." }
        ]
      },

      // ================================================================ l14
      {
        id: "m14-l14",
        title: "Extension challenges",
        type: "read",
        learn: cs`
<p>You've built a working, object-oriented quiz with secure logins, files and a leaderboard. Well done! If you want to take it further, here are some challenges, roughly in order of difficulty. Each one practises something you'd need for top marks in a practical project. Copy your finished program into the playground or Visual Studio and try them.</p>
<h3>1. Salted hashes</h3>
<p>Two users with the same password currently get the same hash, and attackers keep huge tables of hashes for common passwords. Fix both with a <strong>salt</strong>:</p>
<ul>
<li>Give <code>User</code> a <code>salt</code> field: a random string, e.g. 16 random hex characters made with <code>Random</code> and <code>ToString("x2")</code>.</li>
<li>Store <code>Hash(salt + password)</code>, and save lines as <code>username,salt,hash</code>.</li>
<li>Update <code>CheckPassword</code>, <code>ToFileLine</code> and <code>Load</code> (now 3 parts).</li>
</ul>
<h3>2. An admin account</h3>
<p>Add an <code>IsAdmin</code> property to <code>User</code> (saved in the file). Admins get an extra menu option to <strong>add a question</strong>: ask for the type, text, options and answer, validate each input, build the line and append it to <code>questions.txt</code>. Could you make <code>AdminUser</code> a subclass of <code>User</code> instead?</p>
<h3>3. A new question type</h3>
<p>Add <code>TypedAnswerQuestion : Question</code> where the user types the answer, e.g. <code>What keyword creates an object?</code> &rarr; <code>new</code>. Accept any case and ignore spaces. Add a <code>TA</code> line format to <code>ParseQuestion</code>. Notice you don't need to change <code>Quiz.Run</code> at all. That's polymorphism paying off.</p>
<h3>4. A timer</h3>
<p>Record <code>DateTime.Now</code> before and after the quiz. Subtracting gives a <code>TimeSpan</code>; show <code>TotalSeconds</code> with the score, and store it in <code>ScoreRecord</code>. Could you award bonus points for fast correct answers?</p>
<h3>5. Account lockout</h3>
<p>At the moment someone can keep returning to the login screen and guessing. Store a failed-attempt count for each user in <code>users.txt</code>. After 5 failures in a row, lock the account (print <code>Account locked. Ask your teacher to unlock it.</code>) until an admin unlocks it. Reset the count after a successful login.</p>
<h3>6. Your own ideas</h3>
<ul>
<li>Choose a topic or difficulty before starting (a field in each question line).</li>
<li>Let users change their password (old password must be checked first).</li>
<li>Show the leaderboard with only each user's best score.</li>
<li>Add colour with <code>Console.ForegroundColor</code> for correct and wrong answers.</li>
</ul>
<div class="tip">Before each change, write the new requirement and some test data (normal, boundary, erroneous). After it, re-run your earlier tests too, to make sure you haven't broken anything. That's called <strong>regression testing</strong>.</div>`
      },

      // ================================================================ quiz
      {
        id: "m14-quiz",
        title: "Final quiz: the whole course",
        type: "quiz",
        questions: [
          { q: "Why does the quiz store <code>User.Hash(password)</code> rather than the password?",
            options: ["Hashes are shorter to type", "If the file is stolen, the passwords can't be read back from the hashes", "Hashing makes the program run faster", "C# can't save strings to files"],
            answer: 1, explain: "Hashing is one-way, so the original password can't be recovered from users.txt." },
          { q: "Which pillar of OOP is shown by making <code>passwordHash</code> private with only <code>CheckPassword</code> to use it?",
            options: ["Inheritance", "Polymorphism", "Encapsulation", "Iteration"],
            answer: 2, explain: "The data is hidden and can only be used through a controlled method." },
          { q: "Why is <code>Question</code> declared <code>abstract</code>?",
            options: ["So it runs faster", "Because a plain Question makes no sense; only its subclasses should be created", "So its fields are private", "Because it is static"],
            answer: 1, explain: "An abstract class can't be instantiated and forces subclasses to implement its abstract methods." },
          { q: "<code>Quiz.Run</code> calls <code>q.Display()</code> on each item of a <code>List&lt;Question&gt;</code>, and each question shows itself differently. This is…",
            options: ["Polymorphism", "Validation", "Persistence", "Hashing"],
            answer: 0, explain: "The same method call behaves differently depending on each object's real type." },
          { q: "A line in questions.txt is <code>TF|C# is case sensitive.|True</code>. What happens when it's loaded?",
            options: ["The program crashes", "It's added with 0 points", "parts[3] doesn't exist, so an IndexOutOfRangeException is caught and the line is skipped", "It's added as a multiple-choice question"],
            answer: 2, explain: "The try/catch in the loop skips the line with a message and carries on." },
          { q: "Why does <code>ScoreBoard.Save</code> use <code>File.AppendAllText</code>?",
            options: ["It's the only way to write a file", "So new scores are added without deleting the old ones", "So the file is sorted", "To hash the scores"],
            answer: 1, explain: "WriteAllText would overwrite the file and lose every earlier score." },
          { q: "In the bubble sort, why is <code>&lt;</code> used in <code>records[i].Percentage &lt; records[i + 1].Percentage</code>?",
            options: ["To sort highest first (descending)", "To sort lowest first (ascending)", "To find the average", "To stop the loop early"],
            answer: 0, explain: "Swapping when the left one is smaller moves larger percentages towards the front." },
          { q: "What does <code>Console.ReadKey(true)</code> do?",
            options: ["Reads a whole line", "Reads one key press without showing it on screen", "Clears the console", "Returns true if a key was pressed"],
            answer: 1, explain: "The true argument intercepts the key, so ReadPassword can show * instead." },
          { q: "Typing a new password twice and checking they match is an example of…",
            options: ["Verification", "A range check", "Hashing", "Inheritance"],
            answer: 0, explain: "Double entry checks the data was entered accurately: verification." },
          { q: "An input must be a menu choice from 1 to 4. Which is <strong>erroneous</strong> test data?",
            options: ["2", "1", "4", "five"],
            answer: 3, explain: "five isn't a whole number at all, so it must be rejected. 1 and 4 are boundary data, and 2 is normal." }
        ]
      }
    ]
  });
})();
