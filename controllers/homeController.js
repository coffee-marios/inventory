//const { db } = require("../db/queries");
//const properties = db.getProperties();
const db = require("../db/pool");

exports.getHome = async (req, res) => {
  // const result = await db.query("SELECT * FROM properties");
  //  const imagesAll = await db.query("SELECT * FROM property_images");

  const result = await db.query(`
  SELECT
      p.*,
      pi.image_url
  FROM properties p
  LEFT JOIN property_images pi
      ON p.id = pi.property_id
      AND pi.is_primary = TRUE
`);

  res.render("index", {
    title: "HOME",
    properties: result.rows,
    // property_images: imagesAll.rows,
  });
};

exports.getAbout = (req, res) => {
  res.render("about");
};

exports.home = async (req, res) => {
  const id = req.params.id;
  const result = await db.query(
    `
      SELECT
          p.*,
          pi.image_url
      FROM properties p
      LEFT JOIN property_images pi
          ON p.id = pi.property_id
          AND pi.is_primary = TRUE
      WHERE p.id = $1
      `,
    [id]
  );
  console.log(result.rows);

  res.render("home", {
    property: result.rows[0],
  });
};
