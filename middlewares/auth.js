
require('dotenv').config();
const jwt=require('jsonwebtoken')
const auth = (req, res, next) => {

    let token = req.headers.authorization
    if (!token) {
        // res.satus(500).send("Token not Found")
        res.send("Token Not Found")
    } else {
        const decoded = jwt.verify(token, "masai", function (err, decoded) {
            if (decoded) {
                const userID = decoded.userID;
                req.body.userID = userID;
                next();
            } else {
                // res.status(400).send({ "Message": err.Message });
                console.log({'Error':err.message});
            }
        });
    }
    
}

module.exports={auth}