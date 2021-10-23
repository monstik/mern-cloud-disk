const fileService = require("../services/fileService");
const File = require("../models/File");
const User = require("../models/User");
const config = require("config");
const fs = require("fs");


class FileController {
    async createDir(req, res) {
        try {
            const file = await fileService.createDir(req.body, req.user.id)
            return res.json(file);

        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    };

    async fetFiles(req, res) {
        try {
            const {sort} = req.query;

            let files;

            switch (sort) {
                case 'name': {
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name: 1});
                    break;
                }
                case 'type': {
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type: 1});
                    break;
                }
                case 'date': {
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date: 1});
                    break;
                }
                case 'size': {
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({size: -1});
                    break;
                }
                default: {
                    files = await File.find({user: req.user.id, parent: req.query.parent});
                    break;
                }
            }


            return res.json(files);
        } catch (e) {
            return res.status(500).json({message: "Can not get files"})
        }
    };

    async uploadFile(req, res) {
        try {

            const file = req.files.file;
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent});
            const user = await User.findOne({_id: req.user.id});
            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: "There no space on the disk"});
            }

            let path;

            if (parent) {
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`;
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${file.name}`;
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({message: "File already exists"});
            }

            const dbFile = await fileService.uploadFile(user, file, path, parent);
            return res.json(dbFile);

        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    };

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id});
            const path = fileService.getPath(file);
            console.log(path)
            if (fs.existsSync(path)) {
                return res.download(path, file.name);
            }

            return res.status(400).json({message: "Downloaded error"})

        } catch (e) {
            console.log(e);
            return res.status(500).json({message: e.message});
        }
    };

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id});

            if (!file) {
                return res.status(400).json({message: 'File note found'});
            }

            await fileService.deleteFile(file);

            return res.status(200).json({message: "File was deleted"});

        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Dir is not empty"});
        }
    };

    async searchFile(req, res) {
        try {
            const searchName = req.query.search;
            let files = await File.find({user: req.user.id});

            files = files.filter(file => file.name.includes(searchName));

            return res.json(files);


        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Search error"});
        }
    };

    async uploadAvatar(req, res) {
        try {
            const file = req.files.avatar;
            const user = await User.findById(req.user.id);
            const updatedUser = await fileService.uploadAvatar(user, file);
            return res.json(updatedUser);

        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Upload avatar error"});
        }

    };
    async deleteAvatar(req, res) {
        try {

            const user = await User.findById(req.user.id);

            const updatedUser = await fileService.deleteAvatar(user);
            return res.json(updatedUser);

        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Upload avatar error"});
        }

    }

}

module.exports = new FileController();