var express = require('express');
const adminController = require("../controllers/adminController");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/signin');
});



module.exports = router;
