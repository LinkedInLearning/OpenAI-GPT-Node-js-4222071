require("dotenv").config();
const OpenAI = require("openai");
const readlineSync = require("readline-sync");

// Open AI configuration
const openai = new OpenAI()
const messages = [{ role: "system", content: "You are a helpful assistant." }]

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
      messages.push({"role": "user", "content": input})
      // run conversation here
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });
      messages.push(completion.choices[0].message)
      console.log("Bot: " + completion.choices[0].message.content)

      runConversation();
    } catch (error) {
      console.error(error);
    }
  }
}
main();
