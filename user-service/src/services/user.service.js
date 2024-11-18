import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: {
        newsCategories: [String],
        technology: ['email', 'telegram'], 
    },
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