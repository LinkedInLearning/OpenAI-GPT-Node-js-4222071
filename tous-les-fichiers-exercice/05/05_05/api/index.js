import fs from "fs";
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI();

const fileName = "imageURLs.json";

function readImageURLsFromFile(callback) {
  // Read the contents of the file asynchronously
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      callback(err, null);
      return;
    }

    try {
      // Parse the JSON data
      const imageData = JSON.parse(data);

      // Process the imageURLs array here (e.g., log each URL)
      console.log("Image URLs read from file:", fileName);
      console.log("Image data:", imageData);

      // Return the imageData array
      callback(imageData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      callback(error, null);
    }
  });
}

function writeImageURLsToFile(imageURLs, image, file) {
  // Convert the array of imageURLs to a string with each URL on a new line
  const array = imageURLs ?? [];
  array.push({ ...image, name: file.split(" ").join("-") }); // Add the new image URL to the array

  // Convert the array to a string with each URL separated by a newline character
  const data = JSON.stringify(array, null, 2);

  // Check if fileName is provided
  if (!fileName || typeof fileName !== "string") {
    console.error("Error: Invalid fileName");
    return;
  }

  // Write the data to the file
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log(`Image URL added to ${fileName} successfully.`);
  });
}

async function create(req, res) {
  const image = await openai.images.generate({
    prompt: req.body.input,
  });

  console.log("image generated!");
  readImageURLsFromFile((data) => {
    console.log("data", data);
    writeImageURLsToFile(data, image, req.body.input);
    return res.status(200).send({
      image: image,
    });
  });
}

async function read(req, res) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    return res.status(200).send({
      images: JSON.parse(data),
    });
  });
}
// Endpoints
app.post("/create", create);
app.get("/read", read);

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
