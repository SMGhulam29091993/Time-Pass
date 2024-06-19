const {body, validationResult, check, param} = require("express-validator");

// validate handler
module.exports.validateHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const errorMessages = errors.array().map(error => error.msg).join(", ");
    // Log the error for debugging purposes
    console.log("Validate Handler error: ", errorMessages);
    return res.status(400).json({ success: false, message: errorMessages });
}

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


// new group chat validator
module.exports.newGroupValidator = ()=>[
    body("name", "Please Enter Group Name...").notEmpty(),
    body("members").notEmpty().withMessage("Please Enter Group Members")
                    .isArray({mim : 2, max:100}).withMessage("Members should be within 2-100"),
];

// new add members validator
module.exports.addMemberValidator = ()=>[
    body("chatID", "Please Enter Chat ID...").notEmpty(),
    body("members").notEmpty().withMessage("Please Enter Group Members")
                    .isArray({mim : 1, max:97}).withMessage("Members should be within 1-97"),
];

// remove member from the group
module.exports.removeMemberValidator = ()=>[
    body("chatID", "Please Enter Chat ID...").notEmpty(),
    body("userID", "Please Enter User ID...").notEmpty(),   
];


// leave group validator
module.exports.leaveGroupValidator = ()=>[
    param("chatID", "Please Enter Chat ID...").notEmpty()
];

// send attachment validator
module.exports.sendAttachmentvalidator = ()=>[
    body("chatID", "Please Enter Chat ID...").notEmpty(),
    check("files", "Please upload attachments...").notEmpty(),
];
