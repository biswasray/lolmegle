const mongoose=require('mongoose');
const chatSchema=new mongoose.Schema({
    type:{type:String},
    user:{type:String},
    message:{type:String},
    time:{type:mongoose.Schema.Types.Date}
});
module.exports=mongoose.model("chat",chatSchema);