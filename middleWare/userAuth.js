const jwt = require("jsonwebtoken")
// importing local module
const getUserData = require('../helper/helper')

// authentication middleware
const userAuthentication = (req,res,next) =>{
    // ? is optional chain a feature of js checking of a structures exist
    if(req?.cookies?.userJwt){
//verifies the secretkey and the token that came through the cookies in req
 const isLoggedIn = jwt.verify(req.cookies.userJwt,process.env.JWT_KEY)
 if(isLoggedIn){

   

    
    // calling the parseJwt function (to encode jwt  )//
    const user = parseJwt(req.cookies.userJwt);

    // to access the details of user from db(to know the loggined user)
    // sets a middleware(..check helper.js)
    // works as promise, the fetched userdetails in response
    getUserData(user?.userID).then((response)=>{
        // the data in response is stored into userdetails
    res.locals.userDetails = response[0];

       //  executes the next handler or function incase of here it is showHomepage
       next();  
    })
     
 } 
 else{
    // if there is any fault in cookies (doesnt gets verifies).needed to login again with new cookie 
    // previous one should be deleted/null
    
        // sets the second parameter as null
        res.cookie("userJwt",null,{
            httpOnly:true,
            samSite:'lax',
            secure:false,
            maxAge:1
        })
        req.cookies.userJwt = null;
        res.redirect('/')
    }
 


}else{
        res.redirect('/')
        
    }
}


// function for parse(decode)the jwt token to get user details
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

module.exports = userAuthentication