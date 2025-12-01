const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// middleware

app.use(cors());
app.use(express.json());

// janakalyanUser
//password:o9et69nKGfYFF6oL

const uri =
  "mongodb+srv://janakalyanUser:o9et69nKGfYFF6oL@cluster0.obgikox.mongodb.net/?appName=Cluster0";

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

    app.post("/category", async (req, res) => {
      const newCategory = req.body;
      const result = await categoryCollection.insertOne(newCategory);
      res.send(result);
    });

    app.delete("/category/:id", (req, res) => {
      const id = req.params.id;
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
