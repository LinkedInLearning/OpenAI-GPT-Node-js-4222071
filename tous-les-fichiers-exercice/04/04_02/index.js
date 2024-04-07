const fs = require("fs");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI();

// write file
async function writeFile(text) {
  await fs.promises.writeFile("transcription.txt", text);
}

// transcribe
async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("media/media1.mp3"),
    model: "whisper-1",
  });

  await writeFile(transcription.text)
  console.log(transcription.text);
}
main()


