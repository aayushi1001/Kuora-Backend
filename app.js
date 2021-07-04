const express = require('express');
const app = express();
const morgan =require('morgan');
const bodyParser = require('body-parser');


 const register_Routes = require('./api/routes/register');
 const login_Routes = require('./api/routes/login');
 const post_Routes = require('./api/routes/post');
 const comment_Routes = require('./api/routes/comment');
 const vote_Routes = require('./api/routes/vote');

 const register_update_Routes = require('./api/routes/register_update');
 const register_get_Routes = require('./api/routes/register_get');
 const register_get_email_Routes = require('./api/routes/register_get_email');
 
 const p1_Routes=require('./api/routes/post_get')
 const p2_Routes=require('./api/routes/post_get_title')
 const p3_Routes=require('./api/routes/post_get_creator')
 const p4_Routes=require('./api/routes/post_get_creator_postid')
 const p5_Routes=require('./api/routes/post_update')


 const c1_Routes=require('./api/routes/comment_get')
 const c2_Routes=require('./api/routes/comment_get_comment')
 const c3_Routes=require('./api/routes/comment_get_postemail_postid')
 const c4_Routes=require('./api/routes/comment_get_comment_postemail_postid')
 const c5_Routes=require('./api/routes/comment_update')

 const v1_Routes=require('./api/routes/vote_get')
 const v2_Routes=require('./api/routes/vote_get_postemail_postid')
 const v3_Routes=require('./api/routes/vote_get_postemail_postid_voter')

 const search_Routes=require('./api/routes/search_bar')


 

//const _Routes=require('./api/routes')

const mongoose = require('mongoose');

const mongid='mongodb://localhost/kiitprj';
const mong='mongodb+srv://kiitminor:<password>@kiitminor.gawin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect(mongid, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to database!'); 
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept,Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/register',register_Routes);
app.use('/login',login_Routes);
app.use('/post',post_Routes);
app.use('/comment',comment_Routes);
app.use('/vote',vote_Routes);

app.use('/register_update',register_update_Routes);
app.use('/register_get',register_get_Routes);
app.use('/register_get_email',register_get_email_Routes);

app.use('/post_get',p1_Routes);
app.use('/post_get_title',p2_Routes);
app.use('/post_get_creator',p3_Routes);
app.use('/post_get_creator_postid',p4_Routes);
app.use('/post_update',p5_Routes);


app.use('/comment_get',c1_Routes);
app.use('/comment_get_comment',c2_Routes);
app.use('/comment_get_postemail_postid',c3_Routes);
app.use('/comment_get_comment_postemail_postid',c4_Routes);
app.use('/comment_update',c5_Routes);

app.use('/vote_get',v1_Routes);
app.use('/vote_get_postemail_postid',v2_Routes);
app.use('/vote_get_postemail_postid_voter',v3_Routes);


app.use('/search_bar',search_Routes);


//app.use('/',);



app.use((req,res,next) =>{
     const error = new Error('Not Found');
     error.status=404;
     next(error);
 });
 
 app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message
        }
    });
 });

 module.exports = app;