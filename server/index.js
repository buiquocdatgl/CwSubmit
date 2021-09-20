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
        propertyType: 'Room',
        bedRoom: 'Single Bed',
        addingDate: new Date(),
        monthlyRentPrice: '2.3',
        furnitureType: 'Television',
        notes: 'Good',
        reporterName: 'Bin'
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
    console.log(req.body);
    const { propertyType, bedRoom, addingDate, monthlyRentPrice, furnitureType, notes, reporterName } = req.body;
    const newUser = new User({ propertyType, bedRoom, addingDate, monthlyRentPrice, furnitureType, notes, reporterName });
    await newUser.save();
    res.json({ message: "Create success" });
});

app.get("/get", async (req, res) =>{
    res.json(await User.find({}).exec());
})


app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`);
});

