const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 8000;

// middle ware
app.use(cors());
app.use(express.json());

// mongo client
const client = new MongoClient(process.env.URI);

async function run() {
  try {
    await client.connect();

    const database = client.db("brightKids");
    const classesCollection = database.collection("classes");
    const teachersCollection = database.collection("teachers");

    app.get("/classes", async (req, res) => {
      const cursor = classesCollection.find({});
      const classes = await cursor.toArray();
      res.send(classes);
    });
    app.get("/homeClasses", async (req, res) => {
      const cursor = classesCollection.find({}).limit(6);
      const classes = await cursor.toArray();
      res.send(classes);
    });
    app.get("/teachers", async (req, res) => {
      const cursor = teachersCollection.find({});
      const teachers = await cursor.toArray();
      res.send(teachers);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Bright kids server");
});

app.listen(port, () => {
  console.log("port running at localhost:", port);
});
