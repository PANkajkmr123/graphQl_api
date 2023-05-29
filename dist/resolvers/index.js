"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("./image"));
const user_1 = __importDefault(require("./user"));
const vendor_1 = __importDefault(require("./vendor"));
const resolvers = [user_1.default, vendor_1.default, image_1.default];
exports.default = resolvers;
//# sourceMappingURL=index.js.map