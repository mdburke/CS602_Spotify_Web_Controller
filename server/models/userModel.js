const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    dbConnector = require('../database/dbConnector');
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
});

let getModel = (connection) => {
    return dbConnector.getModel(userSchema, "users", connection);
};

// let addUser = (name) => {
//     let user = new UserModel({
//         name: name
//     });
//
//     user.save(err => {
//        connection.close();
//        if (err) throw err;
//        console.log("Successfully saved user.");
//     });
// };

module.exports = {
    getModel: getModel()
};