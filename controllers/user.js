/**
 * Created by charr on 5/31/15.
 */
// Load required packages
var User = require('../models/user');

// Create endpoint /users for POST
exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err) {
        if (err)
            return res.send(err);

        res.json({ message: 'New User added!' });
    });
};

// Create endpoint /users for GET
exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};