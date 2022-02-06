var createError = require("http-errors");
var express = require("express");
var router = express.Router();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
// import mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://mountain:bwamern@clusterstay-shard-00-00.a6lox.mongodb.net:27017,clusterstay-shard-00-01.a6lox.mongodb.net:27017,clusterstay-shard-00-02.a6lox.mongodb.net:27017/db_staycation?ssl=true&replicaSet=atlas-aetluo-shard-0&authSource=admin&retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// router admin
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");
const notFoundRouter = require("./routes/notFound");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(allowCrossDomain);
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
// admin
app.use("/admin", adminRouter);
app.use("/api/v1/member", apiRouter);
// 404 error handler 
app.use("/*", notFoundRouter);

// catch 404 and forward to error handler
// app.get(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
