import jwt from 'jsonwebtoken';

export default function handler(req,res){
    const sec_key = 'bff27443af517d8290c050ded4fa34b562fb54bf52f17ede6e11f52db662a502'
    if(req.method =='POST'){
        const {username,password}=req.body || JSON.parse(req.body);
        
        if(username=='1'&& password =='2'){
            const token = jwt.sign({username,role:'admin'},sec_key,{expiresIn:'1h'});
            res.status(200).json({token});
            console.log('whatttt');
        }
        else {
            res.status(401).json({message:'Invalid Credentials'});
        }
    }

    else {
        res.status(405).end();
    }
}