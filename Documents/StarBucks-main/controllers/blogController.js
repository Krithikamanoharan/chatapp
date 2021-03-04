const Blog = require("../models/blog");
const User = require("../models/User");
var MongoClient = require('mongodb').MongoClient;
var url ="mongodb+srv://Krithika18:leosmileaf@cluster0.cst58.mongodb.net/project?";

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Reservation not found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Make a new reservation" });
};

const blog_create_post = (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/reservations");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/reservations" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_put = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      console.log(result);
      res.render("update", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Reservation not found" });
    });
};
const blog_update_post = (req, res) => {
  console.log(req.body);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    // var dbo = db.db("project");
    //  console.log(db)
    var myquery = { _id: req.body.id };
    var newvalues = {
      $set: {
        title: req.body.title,
        body: req.body.body,
        snippet: req.body.snippet,
      },
    };
    db.db("project").collection("blogs").updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      //console.log(res);
      db.close();
    });
    
  });
  
  res.redirect("/");
};
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_create_put,
  blog_update_post,
};
