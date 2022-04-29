const { MongoClient } = require("mongodb");

const connectionString = "mongodb+srv://Jiawen:Password@cluster0.bw8sf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);

let dbConnection;
module.exports={
    connectToServer: function(Callback) {
        client.connect(function(err, db){
            if(err || !db){
                return Callback(err);
            }
            dbConnection = db.db("sample_airbnb");
            console.log("successsfuly connect to mongodb");
            return Callback();
        });
    },
    getDb: function(){
        if(!dbConnection) connectToServer();
        return dbConnection;
    }
};