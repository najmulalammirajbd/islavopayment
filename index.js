const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfgke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const IslavoUsers = client.db("ISLAVO").collection("IslavoUser");

    app.post('/addusers', (req, res) => {
        const users = req.body;
        IslavoUsers.insertOne(users)
            .then(result => {
                res.send(result)
            })
    })

    app.get("/userdata", (req, res) => {
        IslavoUsers.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })
});


// client.connect(err => {
//     const users = client.db("ISLAVO").collection("service");
//     console.log(err);
//     app.post('/users', (req, res) => {
//         const users = req.body;
//         users.insertOne(users)
//             .then(result => {
//                 res.send(result)
//             })
//     })
// });


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port)