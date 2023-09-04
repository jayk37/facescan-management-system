const express= require('express');
const app = express();
const bcrypt= require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Pvyas123',
      database : 'smartbrain'
    }
  });


// db.select('*').from('users').then(data=>{
//     console.log(data);
// })

const database={
    users:[
        {
            id: '1',
            name: 'john',
            passwd: 'john774',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Howard',
            passwd: 'howard193',
            email: 'howard@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '3',
            name: 'Millie',
            passwd: 'millie012',
            email: 'Millie@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ] 
}

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.json(database.users)
})

app.post('/signin',(req,res)=>{
     
    if(req.body.email===database.users[1].email && req.body.passwd===database.users[1].passwd)
    {
        console.log("Coorect user");
        res.json(database.users[0]);
    }
    else{
        res.status(400).json("Wrong User");
    }
})

app.post('/register',(req,res)=>{
    const {name, email, passwd} = req.body;
    // bcrypt.hash(passwd, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    // console.log(name+"  "+email+"   "+passwd);
    db('users').returning('*').insert({
        email:email,
        name: name,
        joined: new Date()
    }).then(user=>{
        res.json(user[0])
    })
    .catch(err=>res.status(400).json('unable to register'))
})

app.get('/profile/:id',(req,res)=>{
    const { id }= req.params ;
    let found = false;
    db.select('*').from('users').then(user=>{
        console.log(user)
    })
    if(!found){
        res.json("Not Found")
    }
})
app.put('/image',(req,res)=>{
    const { id }= req.body ;
    let found = false;
    database.users.forEach(elem=>{
        if(elem.id === id){
            found=true;
            elem.entries++;
            return res.json(elem.entries);
        }
    })
    if(!found){
        res.json("Not Found")
    }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000,()=>{
    console.log('App is running on port 3000')
})


/*
    //signin---> POST res=success/fail 
    //register--->POST res=user obj
    //profile/:userid--->GET=user
    //image-->PUT--->user 
*/