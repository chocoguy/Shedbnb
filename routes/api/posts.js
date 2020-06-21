const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');


//! POST | api/posts | PRIVATE | Create a post post a shed ye?
router.post('/', [auth, 
    check('text', 'Text is required').not().isEmpty(),
    check('shed', 'Shed name is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('picture', 'Picture link is required').not().isEmpty(),
    check('email', 'Put the email you would like to be contacted with').not().isEmpty()

], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            shed: req.body.shed,
            location: req.body.location,
            picture: req.body.picture,
            email: req.body.email,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

            const post = await newPost.save();

            res.json(post);
    } catch(err){
        console.error('Error att posts.js');
        res.status(500).send('Server Error')
    }
    });



//! GET | api/posts | PUBLIC | Get all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts)
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//! GET | api/posts/:id | PUBLIC | get an individual post
router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg: "Post not found" })
        }

        res.json(post)
    } catch(err){
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('erorye')
    }
});

//! DELETE | api/posts/:id | PRIVATE | DELETES an individual post

router.delete('/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg: 'your post was not found '})
        }

        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "This is not your shed, thus you can't delete it"})
        }

        await post.remove();

        res.json({ msg: 'Shed Removed! '});
    } catch(err){
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found ' })
        }
    }
});

module.exports = router;