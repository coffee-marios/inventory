exports.getHome = (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Hello from the controller!",
  });
};

exports.getAbout = (req, res) => {
  res.render("about");
};

exports.house = (req, res) => {
  res.render("home");
};
