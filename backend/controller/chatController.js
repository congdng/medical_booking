import mongoose from 'mongoose'
import convoModel from '../model/chat/conversation.js'
import messModel from '../model/chat/message.js'
const ObjectId = mongoose.Types.ObjectId

async function getConvo(req,res){
    console.log("ID: ", req.params.id)
    console.log("Role: ", req.params.role)
    const {id, role} = req.body
    const query = {}

    if (role ==='patient'){
        query.pid = new ObjectId(id)
    } else if (role ==='doctor'){
        query.dtid = new ObjectId(id)
    }
    try{
        await convoModel.find(query)
        .populate({
            path: 'last_mess',
            select: '-_id user_id text ',
            populate:{
                path: 'user_id',
                select: 'name role'
            }
        })
        .populate({
            path: 'dtid',
            select: 'name role -_id',
        })
        .populate({
            path: 'pid',
            select: 'name role -_id',
            
        }).then((conversations) => {
            return res.status(200).json(conversations);
          })
    }
    catch(err){
        console.log(err)
        return res.status(401).json({
            error: err,
          });
    }
}

export async function createConvo(req,res){
    const {dtid, pid, findRole} = req.body
    
    const findQuery = {pid: pid, dtid: dtid}
    convoModel.findOne(findQuery)
    .then(async (convo) => {
        if (convo) {
            res.status(400).json({
              error: "Conversation already exists",
            })
        } else {
            const convo = new convoModel({
              dtid: new mongoose.Types.ObjectId(dtid),
              pid: new mongoose.Types.ObjectId(pid)
            })
            await convo.save()
          .then((data) =>{
            console.log("CONVO created", data)
            return res.status(200).json({
              message: "Conversation created successfully!",
            })}
          )
          .catch((err) => {
            console.log(err)
            return res.status(401).json({
              error: err,
            });
          });
      }
    })

}

export async function getMessage(req, res){
    const {convo_id} = req.body
    try {
        const response = await messModel.find({convo_id:new ObjectId(convo_id)}, 'user_id text')
        .sort('date_created')
        res.send({data: response, status: 'ok'})
        
    } catch (error) {
        console.log(error)
    }
}

export async function sendMessage(req, res){
    const newMessage = new messModel(req.body)
    try {
        const response = await newMessage.save()
        res.send({data: response, status: "completed"})
    }
    catch(error) {
        console.log("Error: "+error)
        res.send({status:"error", error: error, data: ""})
    }

}

export async function changeLastestMessage(req, res) {
    const {convo_id, last_mess} = req.body
    convoModel.findOneAndUpdate({_id: new ObjectId(convo_id)}, {last_mess: new ObjectId(last_mess)},{new: true}).exec()
    .then(updatedDocument => {
       // Work with the updated document
       console.log(updatedDocument);
       res.send({status:"completed", data: updatedDocument})
    })
    .catch(err => {
       // Handle error
       res.send({status:"failed", data: [], error: err})
    })
}

export default getConvo