'use strict';

const productSchema = require('./products-schema.js');

/*
Imports the schema
Exports a class with CRUD methods, coded to work with your schema
    read() performs a find() query in your schema
    create() performs a save() query in your schema for a new record
    update() performs a findOneByIdAndUpdate() operation in your schema for an existing record
    delete() performs a findOneByIdAndDelete() in your schema for a new record
*/

class Products {
    async read(query) {
        return await productSchema.find(query);
    }

    async create(newRecord) {
        return await newRecord.save();
    };

    async update(_id, newData) {
        await productSchema.findOneByIdAndUpdate(_id, newData);
    };

    async delete(_id) {
        await productSchema.findOneByIdAndDelete(_id);
    };
};

module.exports = Products;