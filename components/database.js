const mongoose= require('mongoose');
const mongoURI='mongodb://localhost:27017/assignment2'

const connetToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('we are connected with monogo')
    })
}
module.exports=connetToMongo;