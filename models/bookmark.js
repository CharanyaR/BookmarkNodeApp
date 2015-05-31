/**
 * Created by charr on 5/31/15.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var BookmarkSchema   = new mongoose.Schema({
    title: {
        type :String,
        unique: true,
        required: true
    },
    url: String,
    userId: String,
    folderName: String
});

// Export the Mongoose model
module.exports = mongoose.model('Bookmark', BookmarkSchema);