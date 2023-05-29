"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String },
    phoneNumber: { type: Number },
    email: { type: String },
    details: {
        address: { type: String },
        qualification: { type: String }
    },
    count: { type: Number }
}, {
    timestamps: true,
    versionKey: false
});
const userModel = (0, mongoose_1.model)('User', schema);
module.exports = userModel;
//# sourceMappingURL=user.js.map