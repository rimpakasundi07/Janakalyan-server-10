const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// middleware

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://janakalyanUser:o9et69nKGfYFF6oL@cluster0.obgikox.mongodb.net/?appName=Cluster0";

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.obgikox.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Janakalyan server is running!");
});

async function run() {
  try {
    await client.connect();

    const db = client.db("janakalya_db");
    const categoryCollection = db.collection("category");
    const issueCollection = client.db("janakalya_db").collection("issue");

    // .

    app.get("/category", async (req, res) => {
      const cursor = categoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/latest-issue", async (req, res) => {
      const cursor = issueCollection.find().sort({ amount: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/issue/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await issueCollection.findOne(query);
      res.send(result);
    });

    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await categoryCollection.findOne(query);
      res.send(result);
    });

    app.post("/category", async (req, res) => {
      const newCategory = req.body;
      const result = await categoryCollection.insertOne(newCategory);
      res.send(result);
    });

    app.post("/issue", async (req, res) => {
      const newIssue = req.body;
      const result = await issueCollection.insertOne(newIssue);
      res.send(result);
    });

    app.get("/issue", async (req, res) => {
      const cursor = issueCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.patch("/category/:id", async (req, res) => {
      const id = req.params.id;
      const updatedCategory = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: updatedCategory,
      };
      const result = await categoryCollection.updateOne(query, update);
      res.send(result);
    });

    app.delete("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await categoryCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Janakalyan server is running on port ${port}`);
});
