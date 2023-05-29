"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const apollo_server_1 = require("apollo-server");
const user_resolvers = {
    Query: {
        getUser(_, ID) {
            return __awaiter(this, void 0, void 0, function* () {
                var id = ID;
                console.log(id, "id", id.ID);
                const details = yield user_1.default.findById({ _id: id.ID });
                if (details) {
                    console.log(details, "details1222");
                    details.name = "ssss";
                    details.count = 12;
                    return details;
                }
                else {
                    throw new apollo_server_1.ApolloError('User is not exists');
                }
            });
        },
        user(_, count) {
            return __awaiter(this, void 0, void 0, function* () {
                var limit = count;
                const list = yield user_1.default.find().sort({ createdAt: -1 }).limit(limit.amount);
                return list;
            });
        }
    },
    Mutation: {
        //add
        createUser(_, userInput) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = userInput;
                const { name, email, phoneNumber, address, qualification } = data.userInput;
                const body = {
                    "name": name,
                    "email": email,
                    "phoneNumber": phoneNumber,
                    "details": {
                        "address": address,
                        "qualification": qualification
                    }
                };
                const details = yield user_1.default.findOne({ email: email });
                if (details) {
                    throw new apollo_server_1.ApolloError('User is already exists');
                }
                else {
                    const res = (yield user_1.default.create(body)).save();
                    return { res };
                }
            });
        },
        //edit
        editUser(_, ID, userInput) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = ID;
                const { name, email, phoneNumber } = data.userInput;
                const id = data.ID;
                const res = (yield user_1.default.updateOne({ _id: id }, { name: name, email: email, phoneNumber: phoneNumber })).modifiedCount;
                return res;
            });
        },
        //delete
        deleteUser(_, ID) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = ID;
                const id = data.ID;
                const res = (yield user_1.default.deleteOne({ _id: id })).deletedCount;
                return { res };
            });
        },
    }
};
exports.default = user_resolvers;
//# sourceMappingURL=user.js.map