const jwt = require('jsonwebtoken')

module.exports = (io)=>{ 

io.on('connection', (socket) => { 
    console.log('coonectd')

    socket.on('subscribe',()=>{
        let userId;
        const token=socket.request.headers.bearertoken
        console.log(token)
        try{
            decodedToken =  jwt.verify(token,process.env.JWT_SECRET)
            console.log(decodedToken)
            userId = decodedToken.userId
            }
            catch(err){      
                console.log(err)
            }
        
        socket.join(userId)
        io.to(userId).emit("response",JSON.stringify({status:'Subscribed',id:socket.id}))
    
    })

})

}