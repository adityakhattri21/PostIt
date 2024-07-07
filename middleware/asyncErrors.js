//this middleware is used to capture any error that is thrown while execution of the controllers.
module.exports = (theFunc) => (req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next);

}