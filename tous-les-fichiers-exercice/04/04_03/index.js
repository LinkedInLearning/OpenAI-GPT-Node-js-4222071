const fs = require("fs");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI();

async function transcribe(audioFile) {
  return await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioFile),
    model: "whisper-1",
  });
}

async function translate(audioFile) {
  return await openai.audio.translations.create({
    file: fs.createReadStream(audioFile),
    model: "whisper-1",
});

}

// write file
async function writeFile(mediaFile, text) {
  await fs.promises.writeFile("files/" + mediaFile, text);
}

// transcribe
async function main() {
  const transcription = await transcribe("media/german.mp3");
  const translation = await translate("media/german.mp3")

  await writeFile("transcription-german.mp3.txt", transcription.text);
  await writeFile("translation-german.mp3.txt",  translation.text);
  console.log(
    "\x1b[34mText successfully written to transcription.txt and translation.txt \x1b[0m"
  );
}
main()


