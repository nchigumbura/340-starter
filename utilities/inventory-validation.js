const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/* **********************************
 * Classification Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .withMessage("Please provide a valid classification name without spaces or special characters.")
  ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
    })
    return
  }
  next()
}

/// /* **********************************
//  * Inventory Validation Rules
//  * ********************************* */

validate.inventoryRules = () => {
  return [
    body("inv_make").trim().escape().notEmpty().withMessage("Please provide a make."),
    body("inv_model").trim().escape().notEmpty().withMessage("Please provide a model."),
    // Add .notEmpty() before the other checks
    body("inv_year").trim().notEmpty().isNumeric().isLength({ min: 4, max: 4 }).withMessage("Please provide a 4-digit year."),
    body("inv_price").trim().notEmpty().isNumeric().withMessage("Please provide a valid price."),
    body("inv_miles").trim().notEmpty().isNumeric().withMessage("Please provide valid mileage."),
    body("inv_color").trim().escape().notEmpty().withMessage("Please provide a color."),
    body("classification_id").notEmpty().withMessage("Please select a classification."),
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    // Re-build the select list and make it sticky
    let classificationSelect = await utilities.buildClassificationList(req.body.classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Vehicle",
      nav,
      classificationSelect,
      ...req.body // spread operator
    })
    return
  }
  next()
}

/* ******************************
 * Check update data and return errors to edit view
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    res.render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classificationSelect,
      errors,
      inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
    })
    return
  }
  next()
}

module.exports = validate