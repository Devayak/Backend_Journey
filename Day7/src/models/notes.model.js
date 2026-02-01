const { default: mongoose } = require('mongoose')
const modeld=require('mongoose')

const noteSchema=new mongoose.Schema({
    title:String,
    description:String,
    age:Number,
})

const noteModule=mongoose.model('note',noteSchema)

module.exports=noteModule