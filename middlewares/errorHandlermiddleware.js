
const errorHandlerMiddleware = (err, req, res, next)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if(err.code === 11000){
        const error  = Object.keys(err.keyPattern).join(",");
        statusCode = 400;
        message = `Duplicate feild => ${error}`;
    }
    if(err.name === "CastError"){
        message = `Invalid Format of ${err.path}`;
        statusCode = 400;
    }

    return res.status(statusCode).send({success:false, statusCode, message : process.env.NODE_ENV==="DEVELOPMENT"?err: message});
}

module.exports = errorHandlerMiddleware;