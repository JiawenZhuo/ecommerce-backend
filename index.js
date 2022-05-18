const express = require('express');
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
app.use(cors());
const dbo = require('./src/conn');

app.use(express.json());
const recordRoutes = require('./src/routes/records');
app.use(recordRoutes);
const accounts = require('./src/routes/users')
app.use(accounts);
  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }

    app.listen((process.env.PORT || 3001), () =>{
        console.log(`example app listen on port `);
    });
  });


