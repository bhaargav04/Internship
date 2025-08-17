const express = require("express")
const mongoose = require("mongoose")
const User = require("./Models/User")

const app = express();
const PORT = 5000;

const cors = require("cors");
app.use(cors());
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/summaUser")
.then(()=>console.log("Mongodb connected"))

app.post('/summaUser', async (req, res) => {
    try {
        const { name, age, mobile } = req.body;
        const user = new User({ name, age, mobile });
        await user.save();
        res.status(201).json({ message: "Stored Successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error storing user", error });
    }
})

app.get('/summaUser', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error in fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
})

app.listen(PORT , () =>{
    console.log(`Server started on http://localhost:${PORT}`)
})