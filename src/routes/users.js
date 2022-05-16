const express = require("express");

const accounts = express.Router();

const dbo = require("../conn");


//user login
accounts.route('/accounts/login').post(async function (req, res) {
    const dbConnect = dbo.getDb();
    const username = req.body.name;
    let user_id;
    dbConnect
      .collection('users')
      .find({username: req.body.username, password: req.body.password})
      .toArray(
        function(err, result){
            if(result.length == 0 || err) {
                res.status(401).json({
                messgae: `can not find user ${req.body.username}`})
            } else {
                user_id = result[0]["_id"];
                console.log(user_id);
                loginStatus(user_id, true);
                res.status(200).json({
                    messgae: `user ${req.body.username} is login`,
                    result
                })
            }
        })

})

function loginStatus(user_id, status){
    const dbConnect = dbo.getDb();

    dbConnect
    .collection("users")
    .updateOne({_id:user_id}, {$set:{"loginStatus": status}});
}

   





module.exports = accounts;