const express = require("express");
const cors = require("cors");
const upload = require("express-fileupload");

require("dotenv").config();

const app = express();

//middlewares

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use(upload());

require("./socket");

//routes
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const student = require("./routes/student");
const Counselor = require("./routes/Counselor");
const chat = require("./routes/chat");

//initiate routes
app.use("/v1/api", auth); // http://localhost:5000/v1/api/
app.use("/v1/api/admin", admin); //localhost:5000/v1/api/admin
app.use("/v1/api/student", student);
app.use("/v1/api/counselor", Counselor);
app.use("/v1/api/admin", admin);
app.use("/v1/api/chat", chat);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening to Localhost on port ${process.env.PORT}`);
});

// http://localhost:5000/v1/api
