const express = require('express')
const router = new express.Router()
const invController = require('../controllers/invController')
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// --- PUBLIC ROUTES ---
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build item detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildItemDetail))

// Route to return inventory by classification as JSON
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))


// --- PROTECTED ADMINISTRATIVE ROUTES ---

// Route to build inventory management view
router.get("/", 
  utilities.checkLogin, 
  utilities.checkAccountType, 
  utilities.handleErrors(invController.buildManagement)
);

// Route to deliver add-classification view
router.get("/add-classification", 
  utilities.checkLogin, 
  utilities.checkAccountType, 
  utilities.handleErrors(invController.buildAddClassification)
);

// Route to process the new classification
router.post(
  "/add-classification",
  utilities.checkLogin, 
  utilities.checkAccountType, 
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to deliver add-inventory view
router.get("/add-inventory", 
  utilities.checkLogin, 
  utilities.checkAccountType, 
  utilities.handleErrors(invController.buildAddInventory)
);

// Route to process the new inventory item
router.post(
  "/add-inventory",
  utilities.checkLogin, 
  utilities.checkAccountType, 
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Route to build the edit inventory view
router.get("/edit/:inv_id", 
  utilities.checkLogin, 
  utilities.checkAccountType, 
  utilities.handleErrors(invController.editInventoryView)
)

// Route to process the update
router.post("/update/", 
  utilities.checkLogin, 
  utilities.checkAccountType, 
  invValidate.inventoryRules(), 
  invValidate.checkUpdateData, 
  utilities.handleErrors(invController.updateInventory)
)

// Route to deliver delete confirmation view
router.get("/delete/:inv_id", 
  utilities.checkLogin, 
  utilities.checkAccountType, 
  utilities.handleErrors(invController.buildDeleteView)
)

// Route to process the deletion
router.post("/delete/", 
  utilities.checkLogin, 
  utilities.checkAccountType, 
  utilities.handleErrors(invController.deleteInventory)
)

module.exports = router;