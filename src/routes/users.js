const express = require("express");

const accounts = express.Router();

const dbo = require("../conn");


//user login
accounts.route('/accounts/login').get(async function (req, res) {
    const dbConnect = dbo.getDb();
    
    dbConnect
      .collection('users')
      .find({username: req.body.username,password: req.body.password})
      .toArray(
        function(err, result){
            if (result.username == null || err) {
                res.status(401).json({
                messgae: `can not find user ${req.body}`})
            } else {
                //cconsole.log(JSON.stringify(reswult));
                //console.log("req"+ req.body);
                res.json({
                    message: "login success",
                    result
                });
            }
        })


})
   





module.exports = accounts;