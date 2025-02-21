module.exports={
     generateRandomString:(length)=> {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        for (let i = 0; i < length; i++) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        
        return result;
    },
    webRes:({no,err,succ,res,msg,package})=>{
        if (succ) {
            res.status(no).json({msg:`${msg}`,package});
        }
        res.status(no).json({error:`${msg}`,package});

    }
    
}