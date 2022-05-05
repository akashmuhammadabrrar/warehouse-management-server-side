const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// for middleware using
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzgxo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

    }
    finally {
        await client.connect();
        const serviceCollection = client.db('wareHouse').collection('inventory');

        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running Node server')
});

app.get('/hreoku', (req, res) => {
    res.send('Heroku updated')
})

app.listen(port, () => {
    console.log('server running with mongodb')
})