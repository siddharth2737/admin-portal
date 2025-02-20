import jwt from 'jsonwebtoken'

export default function handler(req,res){
    const authHeader = req.headers.authorization;
    const token =  authHeader.split(' ')[1];
    const sec_key = 'bff27443af517d8290c050ded4fa34b562fb54bf52f17ede6e11f52db662a502'
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, sec_key);
        res.status(200).json({message:'portect data',user: decoded})
    }
    catch(error){
        res.status(403).json({message:'Invalid token'})
    }
}