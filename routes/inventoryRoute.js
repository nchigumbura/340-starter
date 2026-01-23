// Need Resources
const express = require('express')
const router = new express.Router()
const invController = require('../controllers/invController')
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build item detail view
// Change this line:
router.get("/detail/:invId", utilities.handleErrors(invController.buildItemDetail))
module.exports = router;