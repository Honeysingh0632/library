const router = require("express").Router();
const { User1, } = require("../models/user");
const  authMiddleware = require('../middelware/authmiddelware');
const adminMiddelware = require("../middelware/adminmiddelware");



router.get('/',authMiddleware,adminMiddelware, async (req,res) => {

    let data = await User1
    let response = await data.find();
    res.send(response)

 })

//  router.get("/protected", authMiddleware, (req, res) => {
//     res.send("This is a protected route, accessible only with a valid token.");
// });

 router.post("/", async(req,res) => {

    const newUser = new User1 ({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        message:req.body.message,
    })
    try{
        const user = await newUser.save()
        console.log(user)
        console.log('success')
        res.json(user)
    }catch{
        console.log("not success")
    }
})


router.put('/', async (req, res) => {
    try {
        const User2 = await User1.findByIdAndUpdate(req.params.id,
             req.body,
             { new: true, runValidators: true });
        if (!User2) {
            return res.status(404).send();
        }
        res.status(200).send(User2);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/contact/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      await User1.findByIdAndDelete(userId);  // Delete user from MongoDB
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });


  // get single user data detailes

  router.get('/usercontact/:id',authMiddleware,adminMiddelware, async (req, res) => {
    try {
      const Id = req.params.id;
     const data = await User1.findOne({_id:Id});  
     return res.status(200).json(data );
    } catch (err) {
      res.status(500).json({ message1: 'Error deleting user', error: err });
    }
  });

  //user contact update route

  router.put('/updateContact/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;  // The data to update

    try {
        // Find document by ID and update it
        const updatedRecord = await User1.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({ message1: "Record not found" });
        }

        res.json({
            message: "Record updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        res.status(500).json({ message1: "Error updating data", error });
    }
});





 module.exports = router;