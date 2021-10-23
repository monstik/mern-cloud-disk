const userService = require("../services/userService");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


class UserController {

    async registration(req, res) {
        try {
            await userService.registration(req.body);
            return res.status(200).json({message: "User was created"});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    };

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const candidate = await User.findOne({email: email});

            if (!candidate) {
                return res.status(404).json({message: 'User not found'});
            }
            const isPassword = await bcrypt.compare(password, candidate.password);

            if (!isPassword) {
                return res.status(401).json({message: 'Invalid password'});
            }
            const user = await userService.login(candidate);
            return res.json(user)
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    };

    async auth(req, res) {
        try {
            const candidate = await User.findOne({_id: req.user.id});
            const user = await userService.auth(candidate);
            return res.json(user);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    };
}

module.exports = new UserController();