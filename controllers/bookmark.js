/**
 * Created by charr on 5/31/15.
 */

// Load required packages
var Bookmark = require('../models/bookmark');
var Folder = require('../models/folder');

//create endpoint /bookmarks POST
exports.postBookmarks = function(req,res){

    //Create an instance for bookmark model
    var bookmark = new Bookmark();

    bookmark.title = req.body.title;
    bookmark.url = req.body.url;
    bookmark.userId = req.user._id;

    if(req.body.folderName != null){
        console.log('FolderName',req.body.folderName);
        var folderData =  Folder.findOne({ name: req.body.folderName,userId : req.user._id },{_id : 1});
        if(folderData){
            bookmark.folderName = req.body.folderName;
        }
    }

    console.log('Bookmark',bookmark);
    // Save the beer and check for errors
    bookmark.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'bookmark added!', data: bookmark });
    });

};

// Create endpoint /bookmarks for GET
exports.getBookmarks = function(req, res) {
    // Use the bookmark model to find all bookmarks
    Bookmark.find({ userId: req.user._id }, function(err, bookmarks) {
        if (err)
            res.send(err);

        res.json(bookmarks);
    });
};

// Create endpoint /bookmarks/:bookmark_title for GET
exports.getBookmark = function(req, res) {
    // Use the bookmark model to find a specific bookmark
    Bookmark.find({ userId: req.user._id, title: req.params.bookmark_title }, function(err, bookmark) {
        if (err)
            res.send(err);

        res.json(bookmark);
    });
};

// Create endpoint bookmarks/:bookmark_title for PUT
exports.putBookmark = function(req, res) {
    // Use the bookmark model to find a specific bookmark
    Bookmark.update({ userId: req.user._id, title: req.params.bookmark_title }, { title: req.body.title },{ url: req.body.url },{ folderName: req.body.folderName }, function(err, numAffected, raw) {
        if (err)
            res.send(err);

        res.json({ message: numAffected + ' updated' });
    });
};

// Create endpoint /bookmarks/:bookmark_title for DELETE
exports.deleteBookmark = function(req, res) {
    // Use the Bookmark model to find a specific bookmark and remove it
    Bookmark.remove({ userId: req.user._id, title: req.params.bookmark_title }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'bookmark removed!' });
    });
};

