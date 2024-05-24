import { Server } from 'socket.io'
const onlineUsers = new Map()


const connectSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });
    io.on('connection', (socket) => {
        console.log('a user connected: ' + socket.id);
        socket.on('doctor-connect', (doctor) => {
            onlineUsers.set(socket.id, { id: doctor.id, name: doctor.name })
            // console.log("Doctor List connect:", Array.from(onlineUsers.values()));
            io.emit('doctor-online-list', Array.from(onlineUsers.values()));
        })
        socket.on('requestDoctorOnlineList', () => {
            // console.log("Doctor List request:", onlineUsers);
            // console.log("Doctor List request:", Array.from(onlineUsers.values()));
            io.emit('doctor-online-list', Array.from(onlineUsers.values()));
        })
        socket.on('disconnect', () => {
            console.log('a user disconnected: ' + socket.id);
            onlineUsers.delete(socket.id)
            // console.log("Doctor List disconnect:", Array.from(onlineUsers.values()));
            io.emit('doctor-online-list', Array.from(onlineUsers.values()));
        })

        socket.on('send-message', (data)=>{
            const {convo_id,...rest} = data
            io.emit('convo::'+convo_id, rest)
        })
        socket.on('create-chat-doctor-signal', (data) => {
            io.emit('send-to-doctor-'+data.doctor_id, 'create-chat-for'+ data.user_id)})
        


    });
}

export default connectSocket