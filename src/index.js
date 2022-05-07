const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
app.use(cors());
const dbo = require('./conn');

app.use(express.json());
const recordRoutes = require('./routes/records');
app.use(recordRoutes);
const accounts = require('./routes/users')
app.use(accounts);
  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }

    app.listen(port, () =>{
        console.log(`example app listen on port ${port}`);
    });
  });


