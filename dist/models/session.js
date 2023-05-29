"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: String },
    role: { type: String },
    token: { type: String },
    status: { type: Boolean }
}, {
    timestamps: true,
    versionKey: false
});
const sessionModel = (0, mongoose_1.model)('Sesion', schema);
module.exports = sessionModel;
//# sourceMappingURL=session.js.map