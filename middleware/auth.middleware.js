import jwt from 'jsonwebtoken'

const isLoggedIn = async (req , res , next) => {
    // App.js mai hamne cookie parser likha tha , abb joh bhi cookie aa rhi hai ham usmai se token extract kar sakte hai
    const {token} = req.cookies;

    if(!token){
        return next(res.stauus(400).json({
            message : 'Unauthorized User',
            success : false,
        }));
    }

    // Yeh token ki puri information mil gayi
    // Token , secret key
    // Sign mai ham yeh sab chupa ke rkh rhe the
    const userDetails = await jwt.verify(token , process.env.JWT_SECRET);


    // Setting in the request body
    req.user = userDetails;
    next();
}

export {
    isLoggedIn,
}