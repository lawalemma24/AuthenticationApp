const User = require("../models/userModel")
const bcryptjs = require ('bcryptjs')
const crypto = require('crypto');
const { generateTokenAndsetCookie } = require("../utils/generateAndSetCookies")
const { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } = require("../mailtrap/email")


exports.signup = async (req, res) => {
    const {email, password,name} = req.body
    try {
        if (!email || !password || !name) {
            throw new Error('All fields are required')
        }
        const userAlreadyExists = await User.findOne({ email: email})
        if (userAlreadyExists) {
            return res.status(400).json({
                success : false,
                message : "User already exists"
            })
        }
        const hashedPassword = await bcryptjs.hash(password,10)
        const verficationToken = Math.floor(100000 + Math.random() * 900000);
        // console.log(verficationToken);

        

        const user = new User ({
            email,
            password: hashedPassword,
            name,
            verficationToken,
            verificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000 //24hrs

        })
        await user.save()

        //jwt token
        generateTokenAndsetCookie(res , user._id)
        await sendVerificationEmail(user.email, verficationToken)
        res.status(201).json({
            success : true,
            message : 'user created successfully',
            user : {
                ...user._doc,
                password : undefined,
            },
        })
    } catch (error) {
        res.status(400).json({
            success: false, message:"internal error", error
        })

    }
}

exports.signout = (req,res) => {
    res.clearCookie("token");
   res.status(200).json({
    success: true,
    message: "signout was successful"
   })
}

exports.signin = async (req,res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({succes: false, message: "Invalid credentials"})
        }
        const confirmPassword = await bcryptjs.compare(password,user.password)
        if (!confirmPassword){
            return res.status(400).json({succes: false, message : "Invalid credentials"})
        }
        generateTokenAndsetCookie(res,user._id)

        user.lastLogin = new Date ()
        await user.save()

        res.status(200).json({
            succes: true,
             message : "logged in successfully",
            user : {
                ...user._doc,
                password: undefined,
                resetpasswordToken : undefined,
                resetpasswordTokenExpiresAt : undefined,
            }
            })

    } catch(error){
 console.log("error in signin", error);
        res.status(500).json({
            success: false,
            message : "signin error",
    })
    }
};
exports.verifyEmail = async (req,res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verficationToken : code,   
            verificationTokenExpiresAt : { $gt : Date.now()}
        })
        if (!user) {
            return res.status(400).json({
                success: false, message :"invalid or expired token", error: true
            })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "email verified successfully",
            user : {
                ...user._doc,
                password : undefined,
            }
        })
    } catch (error) {
        console.log("error in verifyEmail", error);
        res.status(500).json({
            success: false,
            message : "server error",
        })
    }

}

exports.forgotPassword = async (req, res) =>{

    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                success: false, message : "user not found"
            }) }
            //generate reset token
            const resetToken = crypto.randomBytes(20).toString("hex");
            const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000
            
            user.resetpasswordToken = resetToken;
            user.resetpasswordTokenExpiresAt = resetTokenExpiresAt;
           
            await user.save();
            

            
            
            
            

            //send email
            await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
            res.status(200).json({
                success: true, message: 'Password reset link sent to your mail',
            })

    } catch (error) {
        console.log("error in reset-password", error);
        res.status(400).json({success: false, message: error.message});
    }

}

exports.resetPassword = async (req , res) =>{
    try {
        const {token} = req.params;
        const {password} = req.body;
    
        const user = await User.findOne({
            resetpasswordToken: token,
            resetpasswordTokenExpiresAt: { $gt: Date.now() },
        })
        if (!user) {
            return res.status(400).json({
                success : false, message :"invalid token"
            })
        }
       // updatepassword
        const hashedPassword = await bcryptjs.hash(password, 10)
    
        user.password = hashedPassword,
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpired = undefined;
        await user.save();
    
        await sendResetSuccessEmail(user.email);
        res.status(200).json({success : true, message : 'Reset Password successfull'});
    
    } catch (error) {
        console.log("error in reset password", error);
        res.status(500).json({success : false, message : error.message});
        
    }   
    
    }

    exports.checkAuth = async (req, res) => {
        try {
            const user = await User.findById(req.userId)
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "user not found"
                })
            }
            res.status(200).json({
                success: true,
                user : {
                    ...user._doc,
                    password : undefined,
                    resetpasswordToken : undefined,
                    // resetpasswordTokenExpiresAt : resetpasswordTokenExpiresAt 
                }
            })
        } catch (error) {
            console.log("error in check Auth", error);
            res.status(500).json({success : false, message : error.message});
            
        }
    }
    
    

