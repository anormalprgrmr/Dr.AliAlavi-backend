var express = require('express')
var db = require('./db')
var jwt = require('jsonwebtoken')
var jwtUtil = require('./jwt')

var app = express()

const adminUsername = 'Admin'
const adminPassword = 'Admin'
const secretKey = '5b69489ecf45d9736986cdc402b20165d496210b94c6f53b78446a51e4d4100c032d3845f1d65d25613c88deeb978e085cbfa95b87dbf97e304995443b9f3db2'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validateToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    console.log(process.env.SECRET_KEY);
    
    if(authHeader){

        const token = authHeader.split(' ')[1]

        jwt.verify(token,secretKey,(err,payload) => {
            if (err) {
                console.log('*********** '+payload)
                console.log('*********** '+secretKey)
                console.log('*********** '+token)
                console.log('*********** '+err)
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            } else {
                req.user = payload.username;
                next();
            }
        })

    } else {
        res.status(401).json({
        success: false,
        message: 'Token is not provided',
    });
  }
}

app.post('/get-token',(req,res)=>{

    const {username,password} = req.body

    if(username === adminUsername & password === adminPassword){
        const token = jwtUtil.generateAccessToken({"username":username})
        res.json({
            success: true,
            message: 'Authentication successful!',
            token: token, 
        })
    } else {
        res.status(401).json({
        success: false,
        message: 'Invalid username or password',
        })
    }
})

app.post('/api/add-appoinment',async (req,res)=>{

    data = req.body

    try {
        const result = await db.query(`INSERT INTO nobat (date,time,firstname,lastname,description,phonenumber,status)
        VALUES ('${data.date}','${data.time}','${data.firstname}','${data.lastname}','${data.description}','${data.phonenumber}','${data.status}');`)
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error!')
    }
})

app.get('/admin/data',validateToken,async (req,res)=>{
    try {
        const result = await db.query('SELECT * FROM nobat')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error!')
    }
})

app.post('/admin/change-status',validateToken,async (req,res)=>{
    try {
        data = req.body
        const {id,status} = req.body
        db.query(`UPDATE nobat 
            set status = '${status}'
            WHERE id = '${id}'
            `)
        res.json({
            "message":"succesful"
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error!')
    }
})

app.listen(8081,()=>{
    console.log('Server is running on port 8081')
})