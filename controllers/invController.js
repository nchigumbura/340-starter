const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 * Deliver Management View
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

/* ***************************
 * Deliver Add Classification View
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 * Deliver Add Inventory View
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationSelect = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Vehicle",
    nav,
    classificationSelect,
    errors: null,
  })
}

/* ***************************
 * Process Add Classification
 * ************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const result = await invModel.addClassification(classification_name)

  if (result) {
    let nav = await utilities.getNav() // The "Magic" Link
    req.flash("notice", `Classification ${classification_name} was successfully added.`)
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, adding the classification failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav: await utilities.getNav(),
      errors: null,
    })
  }
}

/* ***************************
 * Process Add Inventory
 * ************************** */
invCont.addInventory = async function (req, res) {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  const result = await invModel.addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)

  if (result) {
    req.flash("notice", `The ${inv_make} ${inv_model} was successfully added.`)
    res.redirect("/inv")
  } else {
    req.flash("notice", "Sorry, adding the vehicle failed.")
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    res.status(501).render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav: await utilities.getNav(),
      classificationSelect,
      errors: null,
    })
  }
}

/* ***************************
 * Build inventory by classificationId view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 * Build item detail view
 * ************************** */
invCont.buildItemDetail = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryById(inv_id)
  const grid = await utilities.buildItemDetailGrid(data)
  let nav = await utilities.getNav()
  res.render("./inventory/detail", {
    title: `${data.inv_year} ${data.inv_make} ${data.inv_model}`,
    nav,
    grid,
  })
}

module.exports = invCont