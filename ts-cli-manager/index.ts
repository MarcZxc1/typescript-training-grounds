// ---------------------------------------------------------
// LAYER 1: IMPORTS & CONFIGURATION
// In a real app, this is your setup phase.
// ---------------------------------------------------------

// We use "fs/promises" because servers must be ASYNCHRONOUS.
// We don't want to freeze the whole app while waiting for the hard drive.
import * as fs from "fs/promises";
import * as path from "path";
import * as readline from "readline";
import { fileURLToPath } from "url";

// FIX for ES Modules:
// Since modern JS doesn't give us "__dirname" automatically, we calculate it
// based on the current file's URL. This tells the code exactly where it lives on your PC.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------
// LAYER 2: TYPE DEFINITIONS (The "Model")
// ---------------------------------------------------------

// This Interface is the "Contract".
// In a Full-Stack app, you would share this definition between
// your Backend (API) and your Frontend (React) so they agree on what a "Task" is.
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Defines where our data lives. In a real app, this would be a Database Connection URL.
const DB_FILE = path.join(__dirname, "database.json");

// ---------------------------------------------------------
// LAYER 3: THE SERVICE LAYER (Business Logic)
// This class handles all the "Heavy Lifting".
// ---------------------------------------------------------

class TaskManager {
  // HELPER: Simulates a Database SELECT query.
  // It reads the raw text file and converts it into a JavaScript Array.
  private async loadTasks(): Promise<Task[]> {
    try {
      // await: Pause here until the hard drive gives us the data
      const data = await fs.readFile(DB_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist (first run), return an empty list
      // instead of crashing the app.
      return [];
    }
  }

  // HELPER: Simulates a Database INSERT/UPDATE query.
  // It converts our Array back into text and saves it to the hard drive.
  private async saveTasks(task: Task[]): Promise<void> {
    // null, 2 arguments make the JSON pretty and readable in the text file
    await fs.writeFile(DB_FILE, JSON.stringify(task, null, 2));
  }

  // ACTION: CREATE
  async addTask(title: string): Promise<void> {
    // 1. Get current state
    const tasks = await this.loadTasks();

    // 2. Prepare new data
    const newTask: Task = {
      id: Date.now(), // Uses timestamp as a simple unique ID
      title,
      completed: false,
    };

    // 3. Update memory
    tasks.push(newTask);

    // 4. Persist to storage (Save)
    await this.saveTasks(tasks);
    console.log(`Task ${title} added`);
  }

  // ACTION: READ
  async listTasks(): Promise<void> {
    const tasks = await this.loadTasks();
    console.log("\n--- 📋 YOUR TASKS ---");

    // UX: Give feedback if empty
    if (tasks.length === 0) console.log("No tasks found.");

    // Loop through and display.
    // The ternary operator `t.completed ? "X" : " "` acts like a mini-React component
    // deciding what UI to show based on state.
    tasks.forEach((t) => {
      console.log(`${t.id}: [${t.completed ? "X" : " "}] ${t.title}`);
    });
    console.log("---------------------\n");
  }

  // ACTION: DELETE
  async deleteTask(id: number): Promise<void> {
    const tasks = await this.loadTasks();

    // Functional Programming approach:
    // Instead of deleting from the array, we create a NEW array
    // that contains everything EXCEPT the item we want to remove.
    const filtered = tasks.filter((t) => t.id !== id);

    // Validation: If lengths are same, nothing was removed (ID didn't exist)
    if (tasks.length === filtered.length) {
      console.log(`❌ Task ID ${id} not found.`);
      return;
    }

    // Save the new, filtered list
    await this.saveTasks(filtered);
    console.log(`🗑️ Task ${id} deleted.`);
  }
}

// ---------------------------------------------------------
// LAYER 4: THE CONTROLLER / UI LAYER (The "Frontend")
// In a web app, this would be your React components or API Routes.
// Here, it is a Command Line Interface.
// ---------------------------------------------------------

// Setup the input listener
const rl = readline.createInterface({
  input: process.stdin, // Listen to keyboard
  output: process.stdout, // Print to terminal
});

// Initialize the logic
const manager = new TaskManager();

// This is the "Main Loop"
const menu = () => {
  console.log("1. Add Task | 2. List Tasks | 3. Delete Task | 4. Exit");

  // This waits for user input
  rl.question("Choose an option: ", async (answer) => {
    switch (answer.trim()) {
      case "1":
        rl.question("Enter task title: ", async (title) => {
          // Call the service layer
          await manager.addTask(title);
          // RECURSION: Call menu() again to show options again
          menu();
        });
        break;
      case "2":
        await manager.listTasks();
        menu();
        break;
      case "3":
        rl.question("Enter ID to delete: ", async (id) => {
          // Convert string input "123" to number 123
          await manager.deleteTask(Number(id));
          menu();
        });
        break;
      case "4":
        console.log("Goodbye! 👋");
        // Kill the input listener, which ends the program
        rl.close();
        break;
      default:
        console.log("Invalid option.");
        menu();
        break;
    }
  });
};

// Start the app
console.log("🚀 Welcome to TS Task Manager CLI");
menu();
