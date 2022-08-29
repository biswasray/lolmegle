const mongoose=require('mongoose');
const {MONGOURI}=process.env;
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
exports.connect = ()=> {
    mongoose.connect(MONGOURI,options)
        .then(()=>console.log("dB connect successsfulllly"))
        .catch((err)=>{
            console.error(err);
            process.exit(1);
        });
};