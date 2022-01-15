var express = require('express');
const adminController = require("../controllers/adminController");
var router = express.Router();

/* Not Found Router */
router.get("/*", adminController.NotFoundPage);

module.exports = router;
