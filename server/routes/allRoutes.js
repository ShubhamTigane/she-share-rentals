const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  testRoute,
  register,
  login,
  profile,
  logout,
  uploadByLink,
  uploadPhotos,
  addPlace,
  getUserPlaces,
  getPlaceById,
  updatePlace,
  getAllPlaces,
  createBooking,
  getBookings,
  searchPlaces
} = require("../controllers/allControllers");

const photosMiddleware = multer({ dest: "/tmp" });

router.get("/test", testRoute);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/upload-by-link", uploadByLink);
router.post("/upload", photosMiddleware.array("photos", 100), uploadPhotos);
router.post("/places", addPlace);
router.get("/user-places", getUserPlaces);
router.get("/places/:id", getPlaceById);
router.put("/places", updatePlace);
router.get("/places", getAllPlaces);
router.post("/bookings", createBooking);
router.get("/bookings", getBookings);
router.get("/search", searchPlaces);

module.exports = router;
 