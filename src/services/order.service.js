const orderModel = require("../models/order/order.model");

exports.get = (query, skip, page, id=null) => {
    try{
        const orders = await orderModel.find(id ? { id } : query);
        return orders;
    }catch(e){
        throw Error(e);
    } 
}