const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//Protect
const auth = require('../../middleware/auth')
const User = require('../../models/User')


//! GET | api/auth | PUBLIC | returns user info
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

//! POST | api/auth | PUBLIC | login user and get token
router.post('/',[
    check('email', 'please enter your email').isEmail(),
    check('password', 'please enter your password').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body;
        try{
            let user = await User.findOne({email})

            if(!user){
                return res.status(400).json({errors: [{ msg: 'Wrong credentials' }]})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({ errors: [{ msg: 'Wrong credentials' }] })
            }

            const payload = {
                user:{
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 36000000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token })
                }
            );
        }
        catch(err){
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);

module.exports = router;

