const fileModel = require("../../models/file.model");

module.exports.addFile = async (body) => {
    try {
      const data =  await fileModel.create(body);
    } catch (error) {
      throw Error(error);
    }
  };

  module.exports.getFile = async (query) => {
    try {

      let { page, limit } = query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
  
      const skip = (page - 1) * limit;
      const files = await fileModel.find().skip(skip).limit(limit);
      const totalDocuments = await fileModel.countDocuments();
  
      return {
        data: files,
        currentPage: page,
        totalFile: totalDocuments
      };
    } catch (error) {
      throw Error(error);
    }
  };

module.exports.updateFile = async(params,body) => {
  try{
    const {id} = params
    return await fileModel.findByIdAndUpdate(id,body)
  }catch(error) {
    throw Error(error);

  }
}

module.exports.deleteFile = async(body) => {
    try{
      
        const ids = body.ids;
       return await fileModel.deleteMany({ _id: { $in: ids } });
    }catch(error) {
        throw Error(error)
    }
}


//   if (req.file) {
//     req.body.fileImage = req.file?.path;
//   }
