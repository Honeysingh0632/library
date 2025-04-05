
const router = require("express").Router();
const { Books } = require("../models/user");
const  authMiddleware = require('../middelware/authmiddelware');
const adminMiddelware = require("../middelware/adminmiddelware");







router.get('/',authMiddleware,adminMiddelware, async (req,res) => {

    let data = await Books
    let response = await data.find();
    res.send(response)

 })







router.delete('/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      await Books.findByIdAndDelete(userId);  // Delete user from MongoDB
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });

  // single user data

  router.get('/userbook/:id',authMiddleware,adminMiddelware, async (req, res) => {
    try {
      const Id = req.params.id;
     const data = await Books.findOne({_id:Id});  
     return res.status(200).json(data );
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });




//post route
router.post("/", async(req,res) => {
    const NewBooks = new Books ({
        name:req.body.name,
        email:req.body.email,
        bookname:req.body.bookname,
        authorname:req.body.authorname,
    })
    try{
        const book = await NewBooks.save()
        console.log(book)
        console.log('success')
        res.json(book)
    }catch{
        console.log("not success")
    }
})

// router.put('/', someController.updateData);

// update route

router.put('/updatebook/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;  // The data to update

    try {
        // Find document by ID and update it
        const updatedRecord = await Books.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({
            message: "Record updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating data", error });
    }
});





module.exports = router;


