require("dotenv").config();
const OpenAI = require("openai");
const readlineSync = require("readline-sync");

// Open AI configuration

function getInput(promptMessage) {
  return readlineSync.question(promptMessage, {
    hideEchoBack: false, // The typed characters won't be displayed if set to true
  });
}

async function main() {
  console.log("\n\n----------------------------------");
  console.log("          CHAT WITH AI 🤖   ");
  console.log("----------------------------------\n");
  runConversation();
}

async function runConversation() {
  const input = getInput("You: ");

  if (!!input) {
    try {
      // run conversation here
      runConversation();
    } catch (error) {
      console.error(error);
    }
  }
}
main();
