require("dotenv").config();
const OpenAI = require("openai");
const readlineSync = require("readline-sync");

// Open AI configuration
const openai = new OpenAI();

function getInput(promptMessage) {
  return readlineSync.question(promptMessage, {
    hideEchoBack: false, // The typed characters won't be displayed if set to true
  });
}
const messages = [{ role: "system", content: "You are a helpful assistant." }];

async function main() {
  console.log("\n\n----------------------------------");
  console.log("          CHAT WITH AI 🤖   ");
  console.log("----------------------------------\n");
  console.log("type 'x' to exit the app\n");
  runConversation();
}

async function generateResponse(input) {
  messages.push({ role: "user", content: input });
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  return completion.choices[0].message.content;
}

async function moderate(input) {
  const moderation = await openai.moderations.create({ input: input });
  return moderation.results[0].flagged
}

async function runConversation() {
  while (true) {
    const input = getInput("You: ");
    if (input === "x") {
      console.log("Goodbye!");
      process.exit();
    }
    if (!!input) {
      try {
        const flagged = await moderate(input)
        if (flagged) {
          console.log("\x1b[41m Your message was flagged as inappropriate. Please try again \x1b[0m")
          continue
        }
        const response = await generateResponse(input);
        console.log("Bot: " + response);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
main();
