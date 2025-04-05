require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require('body-parser')
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const ContactUser = require('./routes/contact');
const Booksuggest = require('./routes/books');

const upload = require('./ multer-config')
const AddBook1 = require('./models/user')


// database connection
connection();

// middlewares
app.use(express.json());
app.use(bodyparser.json())
app.use(cors());
app.use('/uploads', express.static('uploads'));

// routes
//user detailes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use('/get',userRoutes);

//contact form data
app.use('/get/user',ContactUser);
app.use('/update/:id',ContactUser);
app.use('/submit',ContactUser);

//book suggestdata
app.use('/getbook',Booksuggest);
app.use('/books',Booksuggest);


app.post('/addbook', upload, (req, res) => {
    const { AddBookname, AddAuthorname,bookdesc,bookprice,bookoldprice ,bookrating} = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : '';
  
    const newData = new AddBook1({ AddBookname, AddAuthorname,bookdesc,bookprice,bookoldprice ,bookrating, file });
  
    newData.save()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: err.message }));
  });

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));
