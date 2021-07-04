const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post= require("../models/post");

router.get('/:creator_email/:postid',(req,res,next) =>{
        const creator_email=req.params.creator_email;
        const postid=req.params.postid;
        Post.find({creator_email:creator_email,postid:postid})
        .exec()
        .then(result =>{
            res.status(200).json({
            code:200,
            message: 'Post Successfully found',
            post: result
        });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
        
    });

module.exports = router;