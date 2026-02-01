const mongoose=require ('mongoose');
const noteSchema=new mongoose.Schema({
    title:String,
    description:String,
})

const noteModule=mongoose.model('notes',noteSchema);// notes is collection name and noteSchema is schema name


module.exports=noteModule;