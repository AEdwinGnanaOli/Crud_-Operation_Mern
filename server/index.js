const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userModel = require("./models/Users")
require('dotenv').config()

const app = express()
app.use(cors({
    origin: [
        "http://localhost:5173",
        'https://cheerful-daffodil-56b6d9.netlify.app'
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))



app.use((req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    console.log("Request Type:", req.method);
    console.log("Request IP:", req.url);
    next();
});

app.use(express.json())



app.get("/", (req, res) => {
    userModel.find({})
        .then(users => res.json({ users }))
        .catch(err => res.json(err))
})

app.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
    userModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    userModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    userModel.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => res.json(err))
})

app.post("/create", (req, res) => {
    userModel.create(req.body).
        then(users => res.json(users)).
        catch(err => res.json(err))
})

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});

mongoose.connect(process.env.MONGO_URL).then((connection) => {
    console.log("Connected to MongoDB successfully");
})