    const User=require('../models/users')

    //Register user
    const registerUser = async (req, res) => {
        const user = new User(req.body);

        try {
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token });
        } catch (e) {
            res.status(400).send(e);
        }
    };
    //login user
    const loginUser=async(req,res)=>{
        try{
            const user=await User.findByCredentials(req.body?.email,req.body?.password);
            const token=await user.generateAuthToken();
            res.send({user,token});
        }catch(e){
            res.status(401).send(e)
        }
    }
    //logout a user from the current session
    const logoutUser=async(req,res)=>{
        try{
            req.user.tokens=req.user.tokens.filter((token) => token.token !== req.token);
            await req.user.save();
            res.send();
        }catch(e){
            res.status(500).send();
        }
    }


    module.exports={
        registerUser,
        loginUser,
        logoutUser,
    }