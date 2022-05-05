const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../conn");


//read route
recordRoutes.route('/users').get(async function (_req, res) {
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

//create route
recordRoutes.route('/users/new').post(function(req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        username: req.body.username,
        password: req.body.password
    }

    dbConnect
    .collection("users")
    .insertOne(matchDocument, function(err, result){
        if(err){
            res.status(400).send("error inserting");
        }else{
            console.log(`add new user with username ${req.body.username} and id ${result.insertedId} `);
            res.status(205).send();
        }
    });
})

//update users
recordRoutes.route('users/update').post(function(req, res) {
    const dbConnect = dbo.getDb();
    const ChangedUser = {
        newPassword: req.body.newPassword
    }

    dbConnect
    .collection("users")
    .updateOne()

})

    
    


module.exports = recordRoutes;