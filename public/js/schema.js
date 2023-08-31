var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

let userSchema = new Schema({
    photo: { type: String,  maxLength: [100, 'Photo, must be at most 100 characters'], required: [true, 'Photo is Required'] },
    name: { type: String,  maxLength: [20, 'Name, must be at most 20 characters'], required: [true, 'Name is Required'] },
    surname: { type: String,  maxLength: [20, 'Surname, must be at most 20 characters'], required: [true, 'Surname is Required'] },
    job: { type: String,  maxLength: [30, 'Job, must be at most 30 characters'], required: [true, 'Job is Required.'] }
});

module.exports = mongoose.model('users', userSchema);   