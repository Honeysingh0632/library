const mongoose = require('mongoose');

// Define the Banner schema
const BannerSchema = new mongoose.Schema({
  banner: {
    type: String,
    required: true, // Ensure that the banner URL is required
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the Banner model
const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
