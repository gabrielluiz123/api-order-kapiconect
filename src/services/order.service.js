const orderModel = require("../models/order/order.model");

exports.get = async (query, skip, limit) => {
    try{
        const orders = await orderModel.find(query).skip(skip).limit(limit);
        return orders;
    }catch(e){
        throw Error(e);
    }
}

exports.getById = async (id) => {
    try{
        const orders = await orderModel.find({_id: id});
        return orders.length > 0 ? orders[0] : orders;
    }catch(e){
        throw Error(e);
    }
}

exports.post = async (body) => {
    try{
        const orders = await orderModel.create(body);
        return orders;
    }catch(e){
        throw Error(e);
    }
}

exports.patch = async (body, id) => {
    try{
        const orders = await orderModel.findByIdAndUpdate(id, body, {new: true});
        return orders;
    }catch(e){
        throw Error(e);
    }
}

exports.delete = async (id) => {
    try{
        const orders = await orderModel.findByIdAndRemove(id);
        return orders;
    }catch(e){
        throw Error(e);
    }
}