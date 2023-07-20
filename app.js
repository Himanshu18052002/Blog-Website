//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const posts = [];
const homeStartingContent = "   ........... use /compose to add your data to the website .............This is my project that I created lets edit it";
const contactContent = "Email : himanshudawande1805@gmail.com ||||| Mobile No : +91 7999395714";
const aboutContent = "Hello my name is Himanshu Dawande, Iam B.Tech. Graduate of 2023 Batch from Madhav Institute of Technology and Science Gwalior, Madhya Pradesh my email - himanshudawande1805@gmail.com"
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/" , function(req , res){
  res.render("home" , {startingContent: homeStartingContent ,  posts: posts});
});

app.get("/about" , function(req , res){
  res.render("about" , {startingContent: homeStartingContent , aboutContent: aboutContent , contactContent: contactContent}); // can use only about statenebt only no need to write extra two things
});

app.get("/contact" , function(req , res){
  res.render("contact" , {startingContent: homeStartingContent , aboutContent: aboutContent , contactContent: contactContent});
});

app.get("/compose" , function(req , res){
  res.render("compose");
});

app.post("/compose" , function(req,res){

  let post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName" , function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(requestedTitle === storedTitle){
      res.render("post" , {title: post.title , body: post.body});
    }
  });
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
