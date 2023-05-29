"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB = process.env.MONGO_URL || "mongodb+srv://tecorb:kumartec123@tecorb.juv3dbp.mongodb.net/GraphQL_Node?retryWrites=true&w=majority";
const mongodb_connect = () => {
    mongoose_1.default.connect(MONGODB)
        .then(() => console.log('MongoDB Connected Successfully'))
        .catch((err) => console.log('MongoDB Connection Failed'));
};
exports.default = mongodb_connect;
//# sourceMappingURL=database.js.map