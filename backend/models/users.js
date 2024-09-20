const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },email:{
        unique:true,
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                 throw new Error('Email is In valid!!!');
            }
        }
    },password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("password is invalid and 'password' cannot be the password")
            }

            //Regular Expression to check if the password contains the atleast one letter one number and one special charrecter
            const hasLetter=/[a-zA-Z]/.test(value);

            const hasNumber=/\d/.test(value);

            const hasSpecialChar=/[!@#$%^&*(),.?":{}|<>]/.test(value);

            if(!hasLetter){
                throw new Error("Password Must contain atleast one letter");
            }
           
            if(!hasNumber){
                throw new Error("Password must contain atleast one number");

            }

            if(!hasSpecialChar){
                throw new Error("Password must contains atleast one Special Charecters");
            }
        }
    },tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true,

})

userSchema.methods.generateAuthToken=async function(){
    
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'thisismyfirstfullstackproject')

    user.tokens=user.tokens.concat({token})
    await user.save()

    return token

}
userSchema.statics.findByCredentials=async(email,password)=>{
   
    const user=await User.findOne({email})

    if(!user){
        throw new Error('unable to login')
    }

    const isMatch=await bcrypt.compare(password,user.password)
     if(!isMatch){
        throw new Error('unable to Login')
     }

     return user
}


userSchema.pre("save",async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)

    }
    next()
})

const User=mongoose.model('User',userSchema);
module.exports=User;