
BookmarkNodeApp
This contains the REST API designed for a web based bookmark application   
This a NodeJS based backend service using MongoDB.  

Purpose: To allow user to add,update and delete bookmark. As well to add,delete and update a folder. And move a bookmark to a folder as well.  

List of API's:  
To create an user: 
POST /users  
Request : { username : 'charr',password: 'test'}  
To get available users: 
GET /users  

To do CRUD for Bookmark: 
POST /bookmarks 
Request:  
1. When you just want to create a bookmark alone. { title: 'google',url: 'www.google.com'} 
2. When you want to create a bookmark and map it to a folder. {title: 'google',url: 'www.google.com', folderName : 'folder'}  

GET /bookmarks 
It will give all bookmarks.  

GET /bookmarks/:bookmark_title 
This will get the particular bookmark with the given name  

PUT /bookmarks/:bookmark_title 
It allows to update the particulat bookmark by moving from one folder to another. 
Request: { folderName : 'newfolder'}  

DELETE /bookmarks/:bookmark_title 
It removes the particular bookmark.  

To do CRUD with Folder: 
POST /folders 
To create a particular folder 
Request: { name : 'foldername' }  

GET /folders 
It gets all available folders under the current user.  

GET /folders/:folder_name 
It gets the particular folder data.  

PUT /folders/:folder_name 
It allows to change the folder name 
Request: { name : 'newfoldername' }  

DELETE /folders/:folder_name 
It allows to remove the given folder.  

Have used passport library to perform http authentication for all the api's.  Post when a user gets created we check for authentication for all the other api operations specific to bookmark and folder.
