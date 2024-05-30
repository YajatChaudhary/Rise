const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173', // or '*' for allowing all origins
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://chaudharyyajat:Yajat%40711@cluster0.6fv3mgt.mongodb.net/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));
app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
