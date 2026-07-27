require("dotenv").config();

const { Client } = require("pg");

const SQL = `
INSERT INTO properties (
    title,
    city,
    status,
    property_type,
    price
)
VALUES
(
    'Modern Villa',
    'Nicosia',
    'For Sale',
    'Villa',
    500000
),
(
    'New House',
    'Nicosia',
    'For Sale',
    'House',
    120000
),
(
    'Old Villa',
    'Nicosia',
    'For Sale',
    'Villa',
    200000
)
RETURNING id;


INSERT INTO property_images (
    property_id,
    image_url,
    alt_text,
    display_order,
    is_primary
)
VALUES
(
    1,
    '/pictures/house1.png',
    'Front view of Modern Villa',
    1,
    TRUE
),
(
    2,
    '/pictures/house2.png',
    'Front view of New House',
    1,
    TRUE
),
(
    3,
    '/pictures/house3.png',
    'Front view of Old Villa',
    1,
    TRUE
);
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  await client.query(SQL);

  await client.end();

  console.log("done");
}

main();
