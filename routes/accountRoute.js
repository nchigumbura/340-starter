const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
  "/register", 
  regValidate.registationRules(), 
  regValidate.checkRegData, 
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login", 
  regValidate.loginRules(), 
  regValidate.checkLoginData, 
  utilities.handleErrors(accountController.accountLogin)
)

// Default route for account management
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

// Route to log out
router.get("/logout", utilities.handleErrors(accountController.accountLogout))

// Route to deliver the account update view
router.get(
  "/update/:account_id", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildUpdateView)
)

/* ****************************************
* Process Account Information Update
* *************************************** */
router.post(
  "/update",
  utilities.checkLogin,
  regValidate.updateRules(), 
  regValidate.checkUpdateData, 
  utilities.handleErrors(accountController.updateAccount)
)

/* ****************************************
* Process Password Update
* *************************************** */
router.post(
  "/password",
  utilities.checkLogin,
  regValidate.passwordRules(), 
  regValidate.checkPasswordData, 
  utilities.handleErrors(accountController.updatePassword)
)

module.exports = router