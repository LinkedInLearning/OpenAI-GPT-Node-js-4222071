const OpenAI = require("openai");
var readlineSync = require("readline-sync");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LANGUAGE_MODEL = "gpt-3.5-turbo";
const ASSISTANT_NAME = "French-English Translator";
const ASSISTANT_DEFAULT_INSTRUCTIONS = "You are a personal translator. Help me with translating French to English and English to French. Démarrer la réponse avec 'traduction:', pour la traduction en français ou 'translation:', pour la traduction en anglais ";

// Step 1: Create an Assistant
const createAssistant = async () => {};

// Step 2: Create a Thread
const createThread = async () => {};

// Step 3: Add a Message to a Thread
const addMessageToThread = async (thread, input) => {};

// Step 4: Run the Assistant
const runThread = async (assistant, thread) => {};

// Step 5: Check the Run Status
const checkRunStatus = async (run, thread) => {};

// Step 6: Retrieve and display the Messages
const retrieveMessages = async (run, thread, message, assistant) => {};

function getInput(promptMessage) {
  return readlineSync.question(promptMessage, {
    hideEchoBack: false, // The typed characters won't be displayed if set to true
  });
}

async function main() {
  console.log("\n\n----------------------------------");
  console.log("           🤖 AI ASSISTANT           ");
  console.log("---------------------------------- \n ");
  console.log("to exit Chat type 'X'");

  // Step 1: Create an Assistant

  // Step 2: Create a Thread

  while (true) {
   
    let userMessage = getInput("You: ");
    if (userMessage.toUpperCase() === "X") {
      console.log("Goodbye!");
      process.exit();
    }
    // Step 3: Add a Message to a Thread

    // Step 4: Run the Assistant

    // Step 5: Check the Run Status

    // Step 6: Retrieve and display the Messages

  }
}

main();
