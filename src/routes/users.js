const express = require("express");

const accounts = express.Router();

const dbo = require("../conn");


//user login
accounts.route('/accounts/login').post(async function (req, res) {
    const dbConnect = dbo.getDb();
    const username = req.body.name;
    dbConnect
      .collection('users')
      .find({username: req.body.username, password: req.body.password})
      .toArray(
        function(err, result){
            if(result.length == 0 || err) {
                res.status(401).json({
                messgae: `can not find user ${req.body.username}`})
            } else {
                //cconsole.log(JSON.stringify(reswult));
                //console.log("req"+ req.body);
                res.status(200).json({
                    messgae: `user ${req.body.username}`,
                    result
                })
                console.log("find");
            }
        })

})

   





module.exports = accounts;