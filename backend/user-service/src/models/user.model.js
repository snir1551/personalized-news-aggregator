import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    preferences: {
        newsCategories: { type: [String], default: [] },
        technology: { type: [String], default: [] }, 
    },
    chatid: { type: String },
});


userSchema.pre('save', async function (next) {
    
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      return next(err);
    }
});
  

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


export const User = mongoose.model('User', userSchema);