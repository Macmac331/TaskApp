const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    console.log(req.headers);
    
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    
    if (!authHeader) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    const token = authHeader.split(' ')[1];
    try{
                
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    }catch(err){
        console.log(err);
        res.status(401).json({error: 'Request is not Authorized'})
        
    }
}

module.exports = verifyToken;