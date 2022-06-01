import  jwt  from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Con la funcion split se quita la palabra Bearer del token, para quedar solo el token
            token = req.headers.authorization.split(' ')[1];
            //decoded es el objeto que se obtiene del Jason Web Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Con express se crea una sesion de veterinario con el req.veterinario
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
            return next();
        } catch (error) {
            const e = new Error('Token no valido');
            return res.status(403).json({msg: e.message});
        }
    }
    if(!token) {
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({msg: error.message});
    }
    next();
};

export default checkAuth;