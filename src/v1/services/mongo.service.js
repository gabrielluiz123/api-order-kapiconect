exports.get = async (query, skip, limit, model) => {
    try{
        console.log(query)
        const result = await model.find(query).skip(skip).limit(limit);
        return result;
    }catch(e){
        throw Error(e);
    }
}

exports.getById = async (id, model) => {
    try{
        const result = await model.findById(id);
        return result;
    }catch(e){
        throw Error(e);
    }
}

exports.post = async (body, model) => {
    try{
        const result = await model.create(body);
        return result;
    }catch(e){
        throw Error(e);
    }
}

exports.patch = async (body, id, model) => {
    try{
        const result = await model.findByIdAndUpdate(id, body, {new: true});
        return result;
    }catch(e){
        throw Error(e);
    }
}

exports.delete = async (id, model) => {
    try{
        const result = await model.findByIdAndRemove(id);
        return result;
    }catch(e){
        throw Error(e);
    }
}