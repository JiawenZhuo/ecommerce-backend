const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../conn");

const jwt = require('jsonwebtoken');
 let freshTokens = [];

//read route
recordRoutes.route('/users').get(async function (req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection('users')
      .find({})
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send('Error fetching users!');
        } else {
          res.json(result);
        }
      });
  });

//create resgister
recordRoutes.route('/users/new').post(function(req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        username: req.body.username,
        password: req.body.password,
        loginStatus: false
    }

    dbConnect
    .collection("/users")
    .insert(matchDocument, function(err, result){
        if(err){
            res.status(400).send("error inserting");
        }else{
            console.log(req.body);
            console.log(`add new user with username and id ${result.insertedId} `);
            res.status(205).send();
        }
    });
})

// //update users
// recordRoutes.route('users/update').post(function(req, res) {
//     const dbConnect = dbo.getDb();
//     const ChangedUser = {
//         newPassword: req.body.newPassword
//     }

//     dbConnect
//     .collection("users")
//     .updateOne()
// })

//delete users
recordRoutes.route('/delete').delete(function(req, res){
    const dbConnect =dbo.getDb();
    const deleteVal = req.body.delete;
  
    dbConnect
    .collection('users')
    .deleteOne({ username : deleteVal}, function(err){
        if(err){
            res.status(404).send('delete fail');
        }
        res.status(201).send('delete successful');
    });
})

function generateAccessToken(user){
    return jwt.sign(user, profess.env.ACCESS_TOKEN_SECRET, {expiresIn: '15x'})
}
    
    


module.exports = recordRoutes;