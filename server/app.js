var express = require("express"),
  cors = require("cors"),
  errorhandler = require("errorhandler"),
  mongoose = require("mongoose");
// var isProduction = process.env.NODE_ENV === "production";
var isProduction = true;

var indexRoutes = require("./routes/index.route")
// Create global app object
const app = express();

// Normal express config defaults
app.use(cors());
app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("method-override")());
if (!isProduction) {
  app.use(errorhandler());
}
mongoose.set("useNewUrlParser", true);
mongoose.connect("mongodb+srv://admin:PI8LDr3SXaNP6Xiq@baohiem.l791y.mongodb.net/baohiem?retryWrites=true&w=majority").then(
  (_) => {
    console.log("Database has been connected !");
  },
  (err) => console.log(err)
);

app.use(indexRoutes)

module.exports = app;
