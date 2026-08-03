// Creates or updates an admin account in data/admins.json.
// Usage:
//   npm run admin:create -- <username> <password> [display-name]
// If <password> is omitted, it is prompted interactively so it never appears
// in shell history. Accounts are created manually — there is no public signup.
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMINS_FILE = path.join(__dirname, "..", "data", "admins.json");

const username = process.argv[2];
let password = process.argv[3];
const name = process.argv[4] ?? "Admin";

function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

if (!username) {
  console.error("Usage: npm run admin:create -- <username> [password] [name]");
  process.exit(1);
}

if (!password) {
  password = await prompt("Password: ");
}

if (!password || password.length < 8) {
  console.error("A password of at least 8 characters is required.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

let admins = [];
try {
  const raw = await fs.readFile(ADMINS_FILE, "utf8");
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) admins = parsed;
} catch {
  // file does not exist yet — start fresh
}

const normalized = username.trim().toLowerCase();
const index = admins.findIndex(
  (admin) => admin.username.toLowerCase() === normalized,
);

const record = {
  id: randomUUID(),
  username: username.trim(),
  name,
  passwordHash: hash,
  role: "admin",
  createdAt: new Date().toISOString(),
};

if (index >= 0) {
  admins[index] = { ...admins[index], ...record };
} else {
  admins.push(record);
}

await fs.mkdir(path.dirname(ADMINS_FILE), { recursive: true });
await fs.writeFile(ADMINS_FILE, JSON.stringify(admins, null, 2));

console.log(
  `Admin "${username.trim()}" ${index >= 0 ? "updated" : "created"} in data/admins.json.`,
);
