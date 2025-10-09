const express = require("express");
const { addContact } = require("../controllers/contactControllers");

const contactRouter = express.Router();

// Route: POST /contact/add
contactRouter.post("/add", addContact);

module.exports = contactRouter;
