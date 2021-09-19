const express = require("express");
const cors = require("cors");
const errorhandler = require("errorhandler");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const model = require("./userModel");

const User = model;

const init = async () => {
    let count = await User.estimatedDocumentCount();
    if (count !== 0) {
        return;
    }
    let firstUser = new User({
        username: "buiquocdatgl2000@gmail.com",
        password: "quocbin",
        confirmPassword: "quocbin",
    });
    await firstUser.save();
}

mongoose.connect(`mongodb://localhost:27017/CourseWork`)
    .then(() => {
        console.log("Connect to databse success");
        init();
    })
    .catch((err) => {
        console.log("error:" + err);
        process.exit();
    });



app.use(
    cors({
        origin: "*",
    }),
);

app.use(errorhandler());
app.use(express.json());
app.use(morgan("dev"));

app.post("/create", async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    const newUser = new User({ username, password, confirmPassword });
    await newUser.save();
    res.json({ message: "Create success" });
});

app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`);
});

