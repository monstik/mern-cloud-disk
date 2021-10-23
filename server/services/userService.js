const bcrypt = require("bcryptjs");
const User = require("../models/User");
const fileService = require("../services/fileService");
const File = require("../models/File");
const jwt = require("jsonwebtoken");
const config = require("config");

class UserService {
    async registration({email, name, password}) {
        try {
            const hashPassword = await bcrypt.hash(password, 8);
            const user = new User({email, name, password: hashPassword});
            await user.save();
            await fileService.dirCreator(new File({user: user._id, name: ''}));
            return {message: "User was created"};
        } catch (e) {
            throw {message: 'Server error'};
        }

    };

    async login(user) {
        try {
            const token = jwt.sign({id: user._id}, config.get('secretKey'), {expiresIn: '1h'});
            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            };
        } catch (e) {
            throw {message: 'Server error'};
        }
    };

    async auth(user) {
       try {
           const token = jwt.sign({id: user._id}, config.get('secretKey'), {expiresIn: "1h"});
           return {
               token,
               user: {
                   id: user._id,
                   email: user.email,
                   name: user.name,
                   diskSpace: user.diskSpace,
                   usedSpace: user.usedSpace,
                   avatar: user.avatar

               }
           }
       } catch (e) {
           throw {message: 'Server error'};
       }
    };
}

module.exports = new UserService()