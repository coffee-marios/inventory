const db = {
  house: [
    {
      image: "/pictures/house1.png",
      location: "Limassol 1",
      price: "1.222.434",
    },
    {
      image: "/pictures/house2.png",
      location: "Limassol 2",
      price: "2.222.434",
    },
    {
      image: "/pictures/house3.png",
      location: "Limassol 3",
      price: "3.222.434",
    },
  ],
  getProperties() {
    return this.house.map((house) => {
      return {
        image: house.image,
        location: house.location,
        price: house.price,
      };
    });
  },
  getImages() {
    return this.house.map((house) => house.image);
  },
  getLocation() {
    return this.house.map((house) => house.location);
  },
  getPrice() {
    return this.house.map((house) => house.price);
  },
};

module.exports = { db };
