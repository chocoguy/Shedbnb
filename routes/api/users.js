const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

//! POST | api/users | PUBLIC | Registers a new user
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 7 or more chars is required').isLength({ min: 7 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {name, email, password} = req.body;

        try{
            let user = await User.findOne({email})

            if(user){
                return res.status(400).json({errors: [{ msg:"Invalid credentials" }]})
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'r',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token })
                }
            );

        } catch(err){
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
);


module.exports = router