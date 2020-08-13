//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express(); // initialize our app

app.set('view engine', 'ejs'); // set our view engine to use EJS

app.use(bodyParser.urlencoded({ // allows us to use body-parser
  extended: true
}));
app.use(express.static("public")); // set our static files folder


mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true}); // allow mongoose to connect to MongoDB

const articleSchema ={ // schema for the articles inside our database
  title:String,
  content:String
};

const Article = mongoose.model("Article",articleSchema); // create a collection called articles

////////////////////////////// Requests targeting all the articles/////////////////////////////////////////////


app.route("/articles")

.get(function(req, res){// route to retrieve all the articles in our collection

  Article.find(function(err,foundArticles){ // find all the articles.
    if(!err){
      res.send(foundArticles);
    } else{
      res.send(err);
    }



  });


})

.post(function(req,res){

  const newArticle = new Article ({ // create a new Article
    title:req.body.title,
    content:req.body.content
  });

  newArticle.save(function(err){ // save the article
    if(!err){
      res.send("Successfully added a new article !");
    } else {
      res.send(err); // send back the error if there was any.
    }
  });

})

.delete(function(req,res){

  Article.deleteMany(function(err){ // delete all the articles
    if(!err){
      res.send("Successfully deleted all articles.");
    } else{
      res.send(err); // send back the error if there was any
    }
  });

});

////////////////////////////// Requests targeting a specific articles/////////////////////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req,res){

  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){ // find the article with the matching title

    if(foundArticle){
      res.send(foundArticle); // if the article is found , it will be send to the client
    } else{
      res.send("No articles matching that title was found. ");
    }
  });


})

.put(function(req,res){
  Article.update(
    {title:req.params.articleTitle}, // check if there is an article with the name passed as parameter in the URL inside our collection
    {title:req.body.title ,content:req.body.content}, // updates the title of the article as well as the content
    {overwrite:true}, // make sure that the data inside our article is overwriten in order to perform the update
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      }
    }

  );



})

.patch(function(req,res){
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
})

.delete(function(req,res){
  Article.deleteOne(
    {title:req.params.articleTitle},  // delete the article with the name corresponding to the name provided in the URL
    function(err){
      if(!err){
        res.send("Successfully deleted the corresponding article"); // success message
      } else{
        res.send(err); // send back the error if an error occurs
      }
    }
  );




});




app.listen(3000, function() { // set our app to listen on port 3000
  console.log("Server started on port 3000");
});
