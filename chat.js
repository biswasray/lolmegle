const mongoose=require('mongoose');
const chatSchema=new mongoose.Schema({
    type:{type:String},
    user:{type:String},
    data:{type:Object},
    time:{type:mongoose.Schema.Types.Date}
});
module.exports=mongoose.model("chat",chatSchema);