const express = require("express");
const app = express();
const Serverdb = require("./Config/dbMongo");
const user = require("./Routes//users");
const admin = require("./Routes/admin");

// Initiate MongoDB server
Serverdb();

// PORT environment
const PORT = process.env.PORT || 5005;

// Middleware
app.use(bodyparser.json());

app.get("/", (req, res) =>{
    res.json({ message: "API Working" });
  }
);

// Router Middleware
app.use('/user', user);
app.use('/admin', admin);

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  }
);