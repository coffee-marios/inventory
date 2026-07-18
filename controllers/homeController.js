const { db } = require("../db/queries");
const properties = db.getProperties();

exports.getHome = (req, res) => {
  console.log(properties);
  res.render("index", {
    title: "Home Page",
    message: "Hello from the controller!",
    properties: properties,
  });
};

exports.getAbout = (req, res) => {
  res.render("about");
};

exports.home = (req, res) => {
  const id = req.params.id;
  const hm = properties[id];
  // console.log(id);
  res.render("home", { hm });
};
