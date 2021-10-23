const Router = require("express");
const router = new Router();


const {registrationsValidators} = require("../validators/validators");
const authMiddleware = require("../middleware/auth.middleware");
const validateMiddleWare = require('../middleware/validate.middleware');

const userController = require("../controllers/userController");

router.post('/registration', validateMiddleWare(registrationsValidators), userController.registration);

router.post('/login', userController.login);

router.get('/auth', authMiddleware, userController.auth);


module.exports = router;