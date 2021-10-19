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
  // let firstUser = new User({
  //   propertyType: 'Room',
  //   bedRoom: 'Single Bed',
  //   addingDate: new Date(),
  //   monthlyRentPrice: '2.3',
  //   furnitureType: 'Television',
  //   notes: 'Good',
  //   reporterName: 'Bin',
  //   image: 'https://firebasestorage.googleapis.com/v0/b/coursework-90c00.appspot.com/o/2021-09-23T11%3A32%3A19.943Z?alt=media&token=f38cd9a4-fe92-4da7-9628-60d9ff0e09c2',
  //   name: 'Pavilon',
  // });
  // await firstUser.save();
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
  const { propertyType, bedRoom, addingDate, monthlyRentPrice, furnitureType, notes, reporterName, image, name } = req.body;
  const house = await User.findOne({ name: req.body.name });
  if (house) {
    return res.status(200).send({
      message: 'Name house is Duplicated',
      error: true,
    });
  }
  const newUser = new User({ propertyType, bedRoom, addingDate, monthlyRentPrice, furnitureType, notes, reporterName, image, name });
  await newUser.save();
  res.json({ message: "Create success" });
});

app.get("/get", async (req, res) => {
  const result = await User.find({});
  res.json(result);
})

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Data with id=${id}. Data was not found!`
        });
      } else {
        res.send({
          message: "Deleted Successfully!!!!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Data with id=" + id
      });
    });
})

app.post("/search", async (req, res) => {
  try {
    const users = await User.find({ propertyType: req.body.propertyType }).exec();
    console.log(users);
    res.json(users);
  }
  catch (err) {
    res.status(404).send("Can Not Found");
  }
})

app.post("/checkName", async (req, res) => {
  console.log(req.body.name);
  const house = await User.find({ name: req.body.name }).exec();
  console.log(house)
  res.json(house);
})

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { newNote } = req.body;
  try {
    console.log(newNote);
    const checkNote = await User.findById(id);
    checkNote.notes = newNote
    await checkNote.save();
    res.status(200).json({ message : "success" });
  }
  catch (e) {
    res.status(400).send("Networking Error!!!");
  }
})


app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});

