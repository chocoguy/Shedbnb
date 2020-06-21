const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//! GET | api/profile/me | PRIVATE | get current users profile
router.get('/me', auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({ msg: 'no profile' })
        }

        res.json(profile)
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server error')
    }
})


//! POST | api/profile | PRIVATE | Creates OR updates user's profile 
router.post('/',auth, async (req,res) => {
    const{
        desc,
        location,
        lang,
        website,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (desc) profileFields.desc = desc;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    profileFields.badges = 'fas fa-user-check'
    if(lang) {
        profileFields.lang = lang.split(',').map(lang => lang.trim());
    }

    try{
        let profile = await Profile.findOne({ user: req.user.id });
        if(profile){

        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

        return res.json(profile);
        }

        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile)

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }

    res.send('File Created/Updated')
});

//! GET | api/profile | PUBLIC | Gets ALL profiles
router.get('/', async (req,res) => {
    try{
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//! GET | api/profile/user/:user_id | PUBLIC | Get profile by user ID
router.get('/user/:user_id', async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        
        if(!profile) return res.status(400).json({ msg: 'There is no profile for this user' });

        res.json(profile)
    } catch(err){
        if(err.kind === 'ObjectId'){
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.status(500).send('Error(655) Server Error')
    }
});

//! DELETE | api/profile | PRIVATE | DELETES a user
router.delete('/', auth, async (req, res) => {
    try{
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'Account has been succesfully deleted' })
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;