const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User} = require ("./models/User");

const config = require('./config/key')
//application/x-www-form-urlencoded -> bodyParser가 분석해서 가져올수 있게 도와줌
app.use(bodyParser.urlencoded({extended: true}));

//application/json-> bodyParser가 분석해서 가져올수 있게 도와줌
app.use(bodyParser.json())

const mongoose= require('mongoose')
mongoose.connect(config.mongoURI,{
    //useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify:false
}).then(()=>console.log('MongoDB 연결'))
.catch(err => console.log(err))


app.get('/', (req,res) => res.send('Hello World! '))

app.post('/register', (req,res) => {

    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
   
    const user = new User(req.body) // 클라이언트 정보를 받아온다 bodyParser을 이용해서

    user.save((err,userInfo) =>{  //이 부분은 mongodb에서 가져온 데이터(.save)
        if(err) return res.json({ success: false, err}) // 실패했다면 ~
        return res.status(200).json({  //200은 성공했다는 의미
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))