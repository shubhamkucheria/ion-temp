var mongoose = require('mongoose');

//here we initialize databse inserting params
module.exports = mongoose.model('temp', {
    text: {
        type: Array,
        default: ''
    }
});
