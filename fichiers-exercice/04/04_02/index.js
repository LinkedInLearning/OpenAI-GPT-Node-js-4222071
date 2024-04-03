const fs = require("fs");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI();

// write file
async function writeFile(text) {
  await fs.promises.writeFile("transcription.txt", text);
}

// transcribe
async function main() {}


