const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

/* ***************************
 * Trigger Intentional 500 Error
 * ************************** */
baseController.triggerError = async function (req, res, next) {
  throw new Error('Oh no! There was a crash. Maybe try a different route?')
}

// ALWAYS at the end
module.exports = baseController