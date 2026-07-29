import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";

export async function signup (req, res, next) {
    try {
        const hash = await bcrypt.hash(req.body.password, 10 );
        const user = new User({
            email: req.body.email,
            password: hash
        });
        await user.save();
        res.status(201).json({message: 'User created!'});
        
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function login (req, res, next) {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }

        const valid = await bcrypt.compare(req.body.password, user.password);
        
        if(!valid) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(200).json({
            userId: user._id,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}