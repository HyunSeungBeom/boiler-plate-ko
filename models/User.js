const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:{
        type : String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,    //빈칸 자동으로 없애줌
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength:50
    },
    role: {  //관리자, 일반유저 구분
        type: Number,
        default: 0 // <-이면 등록하면 일반유저
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type:Number
    }
})
//스키마를 모델로 감싸준다.
const User = mongoose.model('User',userSchema)

module.exports ={User}