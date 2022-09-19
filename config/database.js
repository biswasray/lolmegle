const mongoose=require('mongoose');
const {MONGOURIL}=process.env;
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
exports.connect = ()=> {
    mongoose.connect(MONGOURIL,options)
        .then(()=>console.log("dB connect successsfulllly"))
        .catch((err)=>{
            console.error(err);
            process.exit(1);
        });
};