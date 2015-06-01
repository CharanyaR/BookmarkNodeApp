/**
 * Created by charr on 5/31/15.
 */

    //load required packages
    var express = require('express');
    var mongoose = require('mongoose');
    var bodyParser = require('body-parser');
    var passport = require('passport');
    var bookmarkController = require('./controllers/bookmark');
    var userController = require('./controllers/user');
    var authController = require('./controllers/auth');
    var folderController = require('./controllers/folder');

    // Connect to the charrdb MongoDB
    //mongoose.connect('mongodb://localhost:27017/charrdb');
    mongoose.connect('mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/bookmark');

    //create express application
    var app = express();

    // Use the body-parser package in our application
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Use the passport package in our application
    app.use(passport.initialize());

    //create our express router
    var router = express.Router();

    // Initial dummy route for testing
 /*   router.get('/', function(req, res) {
        res.end('BookmarkApp');
    });*/

    // Create endpoint handlers for /bookmarks
    router.route('/bookmarks')
        .post(authController.isAuthenticated, bookmarkController.postBookmarks)
        .get(authController.isAuthenticated, bookmarkController.getBookmarks);

    // Create endpoint handlers for /bookmarks/:bookmark_id
    router.route('/bookmarks/:bookmark_title')
        .get(authController.isAuthenticated, bookmarkController.getBookmark)
        .put(authController.isAuthenticated, bookmarkController.putBookmark)
        .delete(authController.isAuthenticated, bookmarkController.deleteBookmark);

    // Create endpoint handlers for /folders
    router.route('/folders')
        .post(authController.isAuthenticated, folderController.postFolders)
        .get(authController.isAuthenticated, folderController.getFolders);

    // Create endpoint handlers for /folders/:folder_id
    router.route('/folders/:folder_name')
        .get(authController.isAuthenticated, folderController.getFolder)
        .put(authController.isAuthenticated, folderController.putFolder)
        .delete(authController.isAuthenticated, folderController.deleteFolder);

    // Create endpoint handlers for /users
    router.route('/users')
        .post(userController.postUsers)
        .get(userController.getUsers);


    // Register all our routes
    app.use(router);

    // Start the server
    app.listen(process.env.OPENSHIFT_NODEJS_PORT);