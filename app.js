/**
 * Router module.
 * @module app
 */

/**
 * @constant createError 
 * @type {NodeModule}
 * Loads createError module.
 */
const createError = require("http-errors");
/**
 * @constant express 
 * @type {NodeModule}
 * Loads express module used as a http server.
 */
const express = require("express");
/**
 * @constant path 
 * @type {NodeModule}
 * Loads path module.
 */
const path = require("path");
/**
 * @constant cookieParser 
 * @type {NodeModule}
 * Loads cookieParser module.
 */
const cookieParser = require("cookie-parser");
/**
 * @constant logger 
 * @type {NodeModule}
 * Loads logger module.
 */
const logger = require("morgan");
/**
 * @constant indexRouter 
 * @type {NodeModule}
 * Loads index/router module.
 */
const indexRouter = require("./routes/index");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

/**
 * Catches a 404 error and redirects to createError(404).
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * Shows a debug webpage if the environment is development.
 */
app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
