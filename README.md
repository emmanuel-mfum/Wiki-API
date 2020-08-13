# Wiki-API
A small wikipedia-style RESTful API

This is a small project is a small introduction to RESTful architecture. 

It is a RESTful API working with a MongoDB database and dealing with documents (articles), allowing the user to access, post, delete and modify articles on the database.

In order to run this app it is strongly recommended to have MongoDB install on the local machine and all the packages mentionned in the package file installed in the project directory via NPM. This app also requires the desktop tool Postman (https://www.postman.com/) in order to interact with the API and the GUI Robo 3T (https://robomongo.org/) in order to better access the MongoDB database and if the user wishes manually modify, create, read or delete articles.

To make this API RESTful , I followed two main rules when implementing it :

1. Use HTTP Request Verbs : these verbs use the HTTP language
2. Use Specific Pattern of Routes/Endpoint URLs


The HTTP Request Verbs are **GET, POST, PUT, PATCH and DELETE**.

The specific patterns of routes/endpoints URL pertains to the "behaviour" of HTTP verbs depending on the route we are trying to reach  :

* /articles
  * GET : Should retrieve all articles
  * POST: Create one new article
  * PUT: - 
  * PATCH: -
  * DELETE:Delete all the articles


* /articles/chuck-norris
  * GET : Fetches the article  on Chuck Norris
  * POST: -
  * PUT: Update the article on Chuck Norris
  * PATCH: Update the article on Chuck Norris
  * DELETE: Delete the article on Chuck Norris


For this project, Node/Express, MongoDB, Mongoose were used to make the API while Postman and Robo 3T were used to test it.

The main challenge during this work was implementing the PATCH method which allows the user to update the provided fields of the article requested. It required a bit of research on my part in the MongoDB docs but I was able to do it in a dynamic manner using :

```
Article.update(
    {title:req.params.articleTitle}, // checks if there is an article with the name passed ar parameter in the URL
    {$set:req.body},// body-parser will parse the body and update the appropriate fields using the new fields provided in the request
    function(err){
      if(!err){
        res.send("Successfully updated article."); // success message
      } else{
        res.send(err); // send back the error if an error occurs
      }


    }
  );
 
 ```
 
 The above is a Mongoose method (update) where the $set flag will allow us to specify the values we want to see updated. But in order to dynamically pick which field provided by the user (via Postman) has to be updated, we need to assign to the $set flag the entire req.body which is a JS object yielded by body-parser. Body-parser will also pick out the fields in req.body. Therefore, we are able to update our database for only the fields that have a new value.
