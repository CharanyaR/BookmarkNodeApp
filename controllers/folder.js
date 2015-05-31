/**
 * Created by charr on 5/31/15.
 */
// Load required packages
var Folder = require('../models/folder');

//create endpoint /folders POST
exports.postFolders = function(req,res){

    //Create an instance for bookmark model
    var folder = new Folder();

    folder.name = req.body.name;
    folder.userId = req.user._id;

    // Save the folder and check for errors
    folder.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'folder added!', data: folder });
    });

};

// Create endpoint /folders for GET
exports.getFolders = function(req, res) {
    // Use the folder model to find all bookmarks
    Folder.find({ userId: req.user._id }, function(err, folders) {
        if (err)
            res.send(err);

        res.json(folders);
    });
};

// Create endpoint /folders/:folder_name for GET
exports.getFolder = function(req, res) {
    // Use the folder model to find a specific folder
    Folder.find({ userId: req.user._id, name: req.params.folder_name }, function(err, folder) {
        if (err)
            res.send(err);

        res.json(folder);
    });
};

// Create endpoint /folders/:folder_name for PUT
exports.putFolder = function(req, res) {
    // Use the folder model to find a specific folder
    Folder.update({ userId: req.user._id, name: req.params.folder_name }, {$set:{ name: req.body.name }}, function(err, numAffected, raw) {
        if (err)
            res.send(err);

        res.json({ message: numAffected + ' updated' });
    });
};

// Create endpoint /Folders/:folder_name for DELETE
exports.deleteFolder = function(req, res) {
    // Use the Folder model to find a specific folder and remove it
    Folder.remove({ userId: req.user._id, name: req.params.folder_name }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Folder removed!' });
    });
};
