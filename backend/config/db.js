const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://allwintitus491:AyB6Zitj4iGmD8dE@cluster0.c5aft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Database Connected Sucessfully')
}).catch((error)=>{
    console.log('database connection failed')
})