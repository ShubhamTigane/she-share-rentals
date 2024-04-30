const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const fs = require("fs");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const testRoute = require("./routes/testRoute.js");
const allRoute = require("./routes/allRoutes.js");

require("dotenv").config();

const bcrypt = require("bcryptjs");
const multer = require("multer");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "qwerty";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose.connect(process.env.MONGO_URI);

app.get("/test", (req, res) => {
  res.json("text ok");
});

// register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // res.json({ name, email, password });
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});
// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass doesnt match");
    }
  }
});

// profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

//logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

//upload photo
app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) {
      throw new Error("Link parameter is missing");
    }
    const newName = Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    console.error("Error downloading image:", error.message);
    res.status(400).json({ error: error.message });
  }
});

const photosMiddleware = multer({ dest: "/tmp" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    // const {path,originalname,mimetype} = req.files[i];
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

//add places
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  //myplaces
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  //update places
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
  } = req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen(4000);
