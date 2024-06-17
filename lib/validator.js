const {body, validationResult, check} = require("express-validator");

// User Register Validator
module.exports.registerValidator = ()=>[
    body("name","Please Enter Name...").notEmpty(),
    body("email","Please Enter Email...").trim().isEmail(),
    body("username","Please Enter Username...").notEmpty(),
    body("bio","Please Enter Bio...").notEmpty(),
    body("password","Please Enter Password...").notEmpty(),
    check("avatar", "Please upload your Profile pic...").notEmpty(),
];


// User Login Validator
module.exports.loginValidator = ()=>[
    body("email","Please Enter Email...").trim().isEmail(),
    body("password","Please Enter Password...").notEmpty()
]

module.exports.validateHandler = (req,res,next)=>{
    const errors = validationResult(req);

    const errorMessages = errors.array().map((error)=>error.msg).join(", ");

    // console.log("Validate Handler error: ",errorMessages);

    if(errors.isEmpty())return next();
    else next(errorMessages)
}