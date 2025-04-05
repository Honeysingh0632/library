const router = require("express").Router();
const { AddBook1, } = require("../models/user");
const upload = require('../multer-config');
const  authMiddleware = require('../middelware/authmiddelware');
const adminMiddelware = require("../middelware/adminmiddelware");



router.post('/', upload, (req, res) => {
    const { AddBookname, AddAuthorname,bookdesc,bookprice,bookoldprice ,bookrating} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
  
    const newData = new AddBook1({ AddBookname, AddAuthorname,bookdesc,bookprice,bookoldprice ,bookrating, image });
  
    newData.save()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  });




 router.get('/',authMiddleware, (req, res) => {
    AddBook1.find()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  
  router.get('/addbook/frontend', (req, res) => {
    AddBook1.find()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  router.get('/addbook/getapi/front',authMiddleware,adminMiddelware, (req, res) => {
    AddBook1.find()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  });


router.get('/addbook/single/:id',authMiddleware, async (req, res) => {
    try {
      const Id = req.params.id;
     const data = await AddBook1.findOne({_id:Id});  
     return res.status(200).json(data );
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });



router.put('/update/image/:id', (req, res) => {
  upload(req, res, async (err) => {
      if (err) {
          // Handle multer-specific errors here
         // console.error('Multer error:', err);
          return res.status(500).json({ error: 'File upload error' });
      }

      try {
        const update = req.body
        const id = req.params.id
          const image = await AddBook1.findByIdAndUpdate(id, update);
          if (!image) {
              return res.status(404).json({ error: 'Image not found' });
          }

         image.image = `/uploads/${req.file.filename}`;
          await image.save();

          res.json({ message: 'Image updated successfully', image ,});
      } catch (err) {
          console.error('Error during image update:', err);
          res.status(500).json({ error: 'Failed to update image' });
      }
  });
});



router.delete('/addbook/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await AddBook1.findByIdAndDelete(userId);  // Delete user from MongoDB
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});



module.exports = router;