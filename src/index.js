const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const dbo = require('./conn');


app.use(cors());
app.use(express.json());

const recordRoutes = require('./routes/records');
app.use(recordRoutes);


  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }

    app.listen(port, () =>{
        console.log(`example app listen on port ${port}`);
    });
  });


