CREATE TABLE IF NOT EXISTS properties (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    -- Basic information
    title VARCHAR(255) NOT NULL,
    description TEXT,

    -- Location
    city VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    postal_code VARCHAR(20),

    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),

    -- Listing
    status VARCHAR(20) NOT NULL
        CHECK (status IN ('For Sale', 'For Rent', 'Sold', 'Reserved')),

    property_type VARCHAR(20) NOT NULL
        CHECK (property_type IN ('House', 'Apartment', 'Villa', 'Land', 'Office')),

    -- Price
    price DECIMAL(12,2) NOT NULL CHECK (price > 0),
    currency VARCHAR(3) DEFAULT 'EUR',

    -- Size
    internal_area DECIMAL(8,2),
    total_plot_area DECIMAL(8,2),

    -- Layout
    bedrooms SMALLINT DEFAULT 0,
    bathrooms SMALLINT DEFAULT 0,
    floors SMALLINT DEFAULT 1,

    -- Extra information
    year_built SMALLINT,
    parking_spaces SMALLINT DEFAULT 0,
    furnished BOOLEAN DEFAULT FALSE,

    -- Website features
    featured BOOLEAN DEFAULT FALSE,
    slug VARCHAR(255) UNIQUE,

    -- Dates
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS property_images (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    property_id INT NOT NULL,

    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),

    display_order SMALLINT DEFAULT 1,
    is_primary BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_property_images_property
        FOREIGN KEY (property_id)
        REFERENCES properties(id)
        ON DELETE CASCADE
);