// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dlniqshzy",
  api_key: "257422543216794",
  api_secret: "5EpQChCxVQxPOZ3ASjOe_JGU1eE",
});

module.exports = cloudinary;
