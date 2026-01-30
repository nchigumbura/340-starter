// Need Resources
const express = require('express')
const router = new express.Router()
const invController = require('../controllers/invController')
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")



// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build item detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildItemDetail))

// Route to build inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to deliver add-classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to process the new classification
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to deliver add-inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// Route to process the new inventory item
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router;