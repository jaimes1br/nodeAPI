const { handleHttpError } = require("../utils/handleError");


const checkRole = (roles)  => (req,res,next) =>{
    try {
        const { user } = req;
        const rolesByUser = user.role;
        
        const checkValueRol = roles.some((rol) => rolesByUser.includes(rol)) 

        if(!checkValueRol){
            handleHttpError(res,'USER_NOT_PERMISSIONS',403);
            return
        }
        next()
    } catch (error) {
        handleHttpError(res,'ERROR_PERMISSIONS',403);
        
    }

}


module.exports = { checkRole }