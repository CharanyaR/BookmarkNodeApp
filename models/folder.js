/**
 * Created by charr on 5/31/15.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var FolderSchema   = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Folder', FolderSchema);