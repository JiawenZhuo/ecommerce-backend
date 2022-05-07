const express = require("express");

const accounts = express.Router();

const dbo = require("../conn");


//user login
accounts.route('/accounts/login').get(async function (req, res) {
    const dbConnect = dbo.getDb();
 
  
    dbConnect
      .collection('users')
      .findOne({username: req.body.username}, (err, result) =>{
        if (err) {
          res.status(400).send('Error fetching users!');
        } else {
            //cconsole.log(JSON.stringify(result));
            console.log("req"+ req.body);
            res.json(result);
        }
    })
      
  });




module.exports = accounts;