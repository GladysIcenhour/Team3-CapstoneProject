var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");

var glucoseData=mongoose.Schema({
    glucoselevels: Number,
    timestamps: String,
    carbs: Number,
});

var dateData=mongoose.Schema({
    date: String,
    glucosedata: [glucoseData],
});

var UserDataSchema=mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    sex: String,
    age: Number,
    dates: [dateData],
    diabetic: Boolean,
});


module.exports = mongoose.model("UserData", UserDataSchema, 'userdata');