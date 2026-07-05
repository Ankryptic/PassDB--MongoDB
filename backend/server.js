import express from "express";
import { MongoClient } from 'mongodb'
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from "cors"

dotenv.config()

const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(cors())

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'passDB';



async function main() {

    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    // GET data from MongoDB
    app.get("/", async (req, res) => {
        let data = await collection.find({}).toArray()
        res.send(data)
    })

    // POST data 
    app.post("/", async (req, res) => {
        const password = req.body;
        await collection.insertOne(password);
        res.send(passwords);
    })

    // DELETE data
    app.delete("/", async (req, res) => {
        const password = req.body;
        let finalResult = await collection.deleteOne({ uid: password.uid })
        res.send(finalResult);
    })

    // UPDATE data
    app.put("/", async (req, res) => {
        const { uid, ...updatedData } = req.body;

        const result = await collection.updateOne(
            { uid },
            { $set: updatedData }
        );

        res.send(result);
    });


    app.listen(port, () => {
        console.log("Server is listening on ", port)
    })

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)

