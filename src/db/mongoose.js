const mongoose = require('mongoose')

mongoose.connect(process.env.LOCAL_DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
})


// const me = new User({
//     name: 'Aman',
//     email: 'aman@demo.com',
//     password: 'asdf@1234'
// })

// me.save().then(() => console.log(me)).catch((err) => console.log(err))

// const task = new Task({
//     description: 'Go to party', 
//     completed: false
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })