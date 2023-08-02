//Create web server
const express = require('express');
const app = express();
//Create body parser
const bodyParser = require('body-parser');
//Create a database
const db = require('./db');
//Create a router
const router = express.Router();
//Create a comment model
const Comment = require('./comment.model');
//Create a path
const path = require('path');
//Create a port
const port = 3000;

//Connect to database
db.connect();

//Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set router
app.use('/api', router);

//Set route for home page
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

//Set route for comments
router.route('/comments')
    //Get all comments
    .get((req, res) => {
        Comment.find((err, comments) => {
            if (err)
                res.send(err);
            res.json(comments);
        });
    })
    //Create a comment
    .post((req, res) => {
        let comment = new Comment();
        comment.author = req.body.author;
        comment.text = req.body.text;
        comment.save((err) => {
            if (err)
                res.send(err);
            res.json({ message: 'Comment successfully added!' });
        });
    });

//Set route for comments by id
router.route('/comments/:comment_id')
    //Get comment by id
    .get((req, res) => {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err)
                res.send(err);
            res.json(comment);
        });
    })
    //Update comment by id
    .put((req, res) => {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err)
                res.send(err);
            comment.author = req.body.author;
            comment.text = req.body.text;
            comment.save((err) => {
                if (err)
                    res.send(err);
                res.json({ message: 'Comment successfully updated!' });
            });
        });
    })
    //Delete comment by id
    .delete((req, res) => {
        Comment.remove({ _id: req.params.comment_id }, (err, comment) => {
            if (err)
                res.send(err);
            res.json({ message: 'Comment successfully deleted!' });
        });
    });

//Set
