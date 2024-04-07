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
const createAssistant = async () => {
  try {
    return await openai.beta.assistants.create({
      name: ASSISTANT_NAME,
      instructions: ASSISTANT_DEFAULT_INSTRUCTIONS,
      model:  LANGUAGE_MODEL
    });
  } catch(e) {
    console.error(e)
  }
};

// Step 2: Create a Thread
const createThread = async () => {
  try {
    return await openai.beta.threads.create();
  } catch(e) {
    console.error(e)
  }
 
};

// Step 3: Add a Message to a Thread
const addMessageToThread = async (thread, input) => {
  try {
    return await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: input
      }
    );
  } catch(e) {
    console.error(e)
  }
  
};

// Step 4: Run the Assistant
const createRun = async (assistant, thread) => {
  try {
    return await openai.beta.threads.runs.create(
      thread.id,
      { 
        assistant_id: assistant.id,
        instructions: ""
      }
    );
  } catch(error) {
    console.log(error)
  }
};

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
  const assistant = await createAssistant()

  // Step 2: Create a Thread
  const thread = await createThread()

  // console.log("assistant", assistant)
  // console.log("thread", thread)

  while (true) {
   
    let userMessage = getInput("You: ");
    if (userMessage.toUpperCase() === "X") {
      console.log("Goodbye!");
      process.exit();
    }
    // Step 3: Add a Message to a Thread
    const message = await addMessageToThread(thread, userMessage)

    //print user message
    // console.log("user: " + message.content[message.content.length - 1].text.value)

    // Step 4: Run the Assistant
    const run = await createRun(assistant, thread)
    console.dir(run)

    // Step 5: Check the Run Status

    // Step 6: Retrieve and display the Messages

  }
}

main();
