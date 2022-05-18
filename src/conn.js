const { MongoClient } = require("mongodb");

const connectionString = process.env.MONGO_URI;
const client = new MongoClient(connectionString);

let dbConnection;
module.exports={
    connectToServer: function(Callback) {
        client.connect(function(err, db){
            if(err || !db){
                return Callback(err);
            }
            dbConnection = db.db("ecommerce");
            console.log("successsfuly connect to mongodb");
            return Callback();
        });
    },
    getDb: function(){
        if(!dbConnection) connectToServer();
        return dbConnection;
    }
};