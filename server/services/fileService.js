const fs = require("fs");
const File = require("../models/File");
const config = require("config");
const Uuid = require("uuid");


class FileService {

    async createDir({name, type, parent}, user_id) {
        try {
            const file = new File({
                name,
                type,
                parent,
                user: user_id
            });
            const parentFile = await File.findOne({_id: parent});

            if (!parentFile) {
                file.path = name;
                await this.dirCreator(file).then(e => console.log(e));
            } else {
                file.path = `${parentFile.path}\\${file.name}`;
                await this.dirCreator(file);
                parentFile.childs.push(file._id);
                await parentFile.save();
            }
            await file.save();
            return file;
        } catch (e) {
            throw {message: e.message}
        }

    };


    dirCreator(file) {

        const filePath = this.getPath(file);

        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({code: 200, message: 'File was created'});
                } else {
                    return reject({code: 409, message: 'File already exists'});
                }
            } catch (e) {
                return reject({code: 500, message: 'File error'});
            }
        })
    };

    async uploadFile(user, file, path, parent) {
        try {
            user.usedSpace = user.usedSpace + file.size;
            await file.mv(path);

            const type = file.name.split('.').pop();

            let filePath = file.name;

            if(parent){
                filePath = parent.path + '\\' + file.name;
            }

            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            });
            await dbFile.save();
            await user.save();

            return dbFile;
        } catch (e) {
            throw {message: "Upload error"}
        }

    };

    async uploadAvatar(user, file) {
        try {
            const avatarName = Uuid.v4() + ".jpg";
            await file.mv(config.get('staticPath') + "\\" + avatarName);
            user.avatar = avatarName;
            await user.save();
            return user;

        } catch (e) {
            throw {message: "Upload error"}
        }

    };
    async deleteAvatar(user) {
        try {
            fs.unlinkSync(config.get('staticPath') + "\\" + user.avatar);
            user.avatar = null;
            await user.save();
            return user;

        } catch (e) {
            throw {message: "Delete avatar error"}
        }

    };

    async deleteFile(file) {
        try {

        } catch (e) {
            throw {message: "Delete error"}
        }
        const path = this.getPath(file);


        if(file.type === 'dir'){
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }

        await file.remove();


    }


    getPath(file) {
        return config.get('filePath') + '\\' + file.user + '\\' + file.path;
    }
}

module.exports = new FileService();