const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const play = require("./player.js");
require("dotenv").config();

const speechFile = path.resolve("./output.mp3");

// Open AI configuration
const openai = new OpenAI();

async function generateResponse() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  console.log("Bot: " + completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

async function createSpeech(response) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: response,
  });
  console.log(
    "\x1b[34mmp3 successfully generated! \x1b[0m"
  );
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}

async function textToSpeech() {}

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

async function runConversation() {
  while (true) {
    const input = getInput("You: ");
    if (input === "x") {
      console.log("Goodbye!");
      process.exit();
    }
    if (!!input) {
      messages.push({ role: "user", content: input });

      try {
        const response = await generateResponse();
        await createSpeech(response)
      } catch (error) {
        console.error(error);
      }
    }
  }
}
main();
