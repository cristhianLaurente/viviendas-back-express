import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let validRoles = {
    values:["ADMIN_ROLE","USER_ROLE"],
    message:"{VALUE} it is not a valid role " 
}
export const userSchema: Schema = new Schema({
    name: {
        type: String,
        required:[true,"is required name"]
    },
    lastname:{
        type: String,
        required:true
    },
    email: {
        type: String,
        unique:true,
        required:[true,"is required email"]
    },
    password: {
        type:String,
        required:true  
    },
    role:{
        type:String,
        default:"USER_ROLE",
        enum:validRoles    
    }

    // asd
})
userSchema.plugin(uniqueValidator,{
    message:"{PATH} must be unique"
})  

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject
}