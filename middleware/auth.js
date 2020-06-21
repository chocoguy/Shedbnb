const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    const token = req.header('X-auth-token');
    if(!token){
        return res.status(401).json({msg: "No token found"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user
        next();
    } catch(err){
        return res.status(401).json({msg: "Token is invalid"});
    }
}