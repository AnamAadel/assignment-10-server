const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express  = require("express");
const cors = require("cors")

// const user = []

const app = express();
const port = process.env.PORT || 5000;

// nuW3ykVIrM2bSURo
// Aadel_8991


const uri = "mongodb+srv://Aadel_8991:nuW3ykVIrM2bSURo@cluster0.otazdf5.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    const user = [{name: "anam", email: "amin@gmail.com"}];
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    

    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.use(cors())
app.use(express.json());

const db = client.db("practiceDb").collection("users");

app.get("/users/all", async (req, res)=> {
    const cursor = db.find();
    const userData = await cursor.toArray();
    res.send(userData);
})

app.get("/users/:id", async (req, res)=> {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const userData = await db.findOne(query);
    // const userData = await cursor.toArray();
    res.send(userData);
})

app.post("/users/current-user", async (req, res)=> {
    const query = req.body;
    // const query = {_id: new ObjectId(id)}
    const userData = await db.findOne(query);
    // const userData = await cursor.toArray();
    console.log(query)
    console.log(userData)
    res.send(userData);
})

app.post("/users", async (req, res)=> {
    console.log(req.body)

    const user = req.body;

    const result = await db.insertOne(user);
    console.log(result);
    
    
    res.send(result);
})

app.put("/users/:id", async (req, res)=> {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};

    const updatedData = {
      $set: req.body,
    };
    // const updatedData = req.body;

    console.log(updatedData)

    const options = {upsert: true}

    const result = await db.updateOne(query, updatedData, options);

    console.log(result);
    res.send(result)
})


app.delete("/users/:id", async (req, res)=> {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};

    const result = await db.deleteOne(query);

    console.log(result);
    res.send(result)
})

app.listen(port, () => {
    console.log(`server listening on ${port}`)
})