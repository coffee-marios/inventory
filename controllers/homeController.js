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

  res.render("properties/index", {
    title: "HOME",
    properties: result.rows,
  });
};

exports.newPropertyForm = (req, res) => {
  res.render("properties/newProperty");
};

exports.createProperty = async (req, res) => {
  const {
    title,
    city,
    price,
    property_type,
    status,
    description,
    internal_area,
    total_plot_area,
    floors,
  } = req.body;

  const propertyResult = await db.query(
    `
      INSERT INTO properties
      (
          title,
          city,
          price,
          property_type,
          status,
          description,
          internal_area,
          total_plot_area,
          floors
      )
      VALUES
      (
          $1,$2,$3,$4,$5,$6,$7,$8,$9
      )
      RETURNING id
      `,
    [
      title,
      city,
      price,
      property_type,
      status,
      description,
      internal_area,
      total_plot_area,
      floors,
    ]
  );
  const propertyId = propertyResult.rows[0].id;
  const imagePath = "/pictures/" + req.file.filename;

  const imageResult = await db.query(
    `
    INSERT INTO property_images
    (
        property_id,
        image_url,
        is_primary
    )
    VALUES
    ($1, $2, TRUE)
    RETURNING id
    `,
    [propertyId, imagePath]
  );

  res.redirect(`home/${propertyResult.rows[0].id}`);
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

  res.render("properties/home", {
    property: result.rows[0],
  });
};

exports.deleteProperty = async (req, res) => {
  const id = req.params.id;
  await db.query("DELETE FROM properties WHERE id = $1", [id]);
  res.redirect("/properties");
};

exports.editPropertyForm = async (req, res) => {
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
    WHERE p.id = $1;
      `,
    [id]
  );

  res.render("properties/edit", {
    property: result.rows[0],
    error: null,
  });
};
exports.updateProperty = async (req, res) => {
  const id = req.params.id;

  const {
    title,
    city,
    property_type,

    description,

    status,
  } = req.body;
  const img_url = req.body.image_url;

  const floors = req.body.floors ? Number(req.body.floors) : null;

  const price = req.body.price ? Number(req.body.price) : null;

  // Validation happens here
  if (price === null) {
    const result = await db.query("SELECT * FROM properties WHERE id = $1", [
      id,
    ]);

    return res.render("properties/edit", {
      property: result.rows[0],
      error: "Price is required",
    });
  }

  const internalArea = req.body.internalArea
    ? Number(req.body.internalArea)
    : null;

  const totalPlotArea = req.body.totalPlotArea
    ? Number(req.body.totalPlotArea)
    : null;

  await db.query(
    `
      UPDATE properties
      SET
          title = $1,
          city = $2,
          property_type = $3,
          floors = $4,
          description = $5,
          price = $6,
          internal_area = $7,
          total_plot_area = $8,
          status = $9
      WHERE id = $10
      `,
    [
      title,
      city,
      property_type,
      floors,
      description,
      price,
      internalArea,
      totalPlotArea,
      status,

      id,
    ]
  );

  res.redirect(`/properties/home/${id}`);
};

exports.deleteImage = async (req, res) => {
  const propertyId = req.params.id;

  await db.query(
    `
      DELETE FROM property_images
      WHERE property_id = $1
      `,
    [propertyId]
  );

  res.redirect(`/properties/${propertyId}/edit`);
};

exports.replaceImage = async (req, res) => {
  const propertyId = req.params.id;

  const imagePath = "/pictures/" + req.file.filename;

  const existing = await db.query(
    `
    SELECT id
    FROM property_images
    WHERE property_id = $1
    `,
    [propertyId]
  );

  if (existing.rows.length > 0) {
    await db.query(
      `
      UPDATE property_images
      SET image_url = $1
      WHERE property_id = $2
      `,
      [imagePath, propertyId]
    );
  } else {
    await db.query(
      `
      INSERT INTO property_images
      (
        property_id,
        image_url,
        is_primary
      )
      VALUES
      ($1, $2, TRUE)
      `,
      [propertyId, imagePath]
    );
  }

  res.redirect(`/properties/${propertyId}/edit`);
};
