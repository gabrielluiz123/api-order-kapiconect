const userModel = require("../../models/user.model");

exports.get = async (query) => {
    try{
        const users = await userModel.find(query);
        return users[0];
    }catch(e){
        throw Error(e);
    }
}

exports.list = async (skip, limit) => {
    try{
        const users = await userModel.find({}).skip(skip).limit(limit);
        return users;
    }catch(e){
        throw Error(e);
    }
}

exports.post = async (body) => {
    try{
        const user = await userModel.create(body);
        return user;
    }catch(e){
        throw Error(e);
    }
}