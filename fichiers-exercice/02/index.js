require("dotenv").config();
const OpenAI = require("openai");
const readlineSync = require("readline-sync");

// Open AI configuration
const openai = new OpenAI();
const messages = [{ role: "system", content: "tu es un correcteur d'orthographe et de grammaire. Tu dois corriger les erreurs d'orthographe et de grammaire" }]

function getInput(promptMessage) {
  return readlineSync.question(promptMessage, {
    hideEchoBack: false, // The typed characters won't be displayed if set to true
  });
}

async function main() {
  console.log("\n\n----------------------------------");
  console.log("          CHAT WITH AI 🤖   ");
  console.log("----------------------------------\n");
  console.log("type 'x' to exit the program \n");
  runConversation();
}

async function runConversation() {

  while (true) {
    const input = getInput("You: ");

    if (!!input) {
      if (input === "x") {
        console.log("Goodbye!")
        process.exit()
      }
      messages.push({"role": "user", "content": input})
      try {
        // run conversation here
        const completion = await openai.chat.completions.create({
          messages: messages,
          model: "gpt-3.5-turbo",
        });
        console.log("Bot: " + completion.choices[0].message.content);

      } catch (error) {
        console.error(error);
      }
    }
  }
  
}
main();
