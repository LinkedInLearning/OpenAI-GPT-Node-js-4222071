import fs from "fs";
import readline from "readline";
import fetch from "node-fetch";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

// https://cookbook.openai.com/articles/what_is_new_with_dalle_3

const openai = new OpenAI();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function saveImage(imageUrl, file_name) {
  fetch(imageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      return response.buffer();
    })
    .then((buffer) => {
      const filePath = path.join(__dirname, "images", `${file_name}.png`);
      fs.writeFile(filePath, buffer, function (err) {
        if (err) {
          console.error("Error saving file: ", err);
          return;
        }
        console.log("\x1b[42mFile saved to", filePath, " \x1b[0m");
      });
    })
    .catch((error) => console.error("Error in saveImage function: ", error));
}

async function create(prompt) {
  console.log("generating image... ");
  // image endpoint
  const image = await openai.images.generate({ model: "dall-e-3", prompt: prompt });
  console.log(image.data);
  const fileName = prompt.split(" ").join("-")
  saveImage(image.data[0].url, fileName)
}

async function variation(prompt) {
  const image = await openai.images.createVariation({
    image: fs.createReadStream("assets/original.png"),
  });

  console.log(image.data);
  const fileName = prompt.split(" ").join("-")
  saveImage(image.data[0].url, fileName)
}

async function edit(prompt) {
  const image = await openai.images.edit({
    image: fs.createReadStream("assets/original.png"),
    mask: fs.createReadStream("assets/mask.png"),
    prompt: prompt,
  });

  console.log(image.data);
  const fileName = prompt.split(" ").join("-")
  saveImage(image.data[0].url, fileName)
}

function main() {
  rl.question("prompt: ", async (input) => {
    // create variation
    await variation(input)
    rl.close();
  });
}

main();
