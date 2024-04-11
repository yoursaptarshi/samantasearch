

exports.chatserver= (io)=>{
  
    io.on('connection', (socket) => {
        console.log('connection created');
        socket.emit('join',()=>{
          console.log("user joined")
        });
        socket.on('message',({msg})=>{
          io.emit('sendMessage',{msg})
        })
        socket.on("disconnect_user",()=>{
          console.log("user disconnected")
        })
      });
}