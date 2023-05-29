"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: Number },
    password: { type: String },
    count: { type: Number },
    image: { type: String },
}, {
    timestamps: true,
    versionKey: false
});
const vendorModel = (0, mongoose_1.model)('vendor', schema);
module.exports = vendorModel;
//# sourceMappingURL=vendor.js.map