const router = require('express').Router();
const authMiddleware = require('../middelware/authmiddelware');
const Banner = require('../models/banner'); // Corrected to point to the Banner model
const upload = require('../multer-config');
 // Ensure multer-config is correctly set up

// Route to upload a banner
router.post('/banner', upload, (req, res) => {
  
  const bannerUrl = req.file ? `/uploads/${req.file.filename}` : '';

 
  const newBanner = new Banner({ banner: bannerUrl });


  newBanner.save()
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

//get banner

router.get('/banner',authMiddleware, (req, res) => {
  Banner.find()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

//delete

router.delete('/banner/:id',async (req,res) => {
  try {
    userid = req.params.id;

    await Banner.findByIdAndDelete(userid)
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error  });
    
  }
})

module.exports = router;
