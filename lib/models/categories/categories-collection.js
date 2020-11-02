const categorySchema = require('./categories-schema.js'); 

class Categories {
  async read(query) {
      return await categorySchema.find(query);
  }

  async create(newRecord) {
      return await newRecord.save();
  };

  async update(_id, newData) {
      await categorySchema.findOneByIdAndUpdate(_id, newData);
  };

  async delete(_id) {
      await categorySchema.findOneByIdAndDelete(_id);
  };
};

module.exports = Categories;