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
const session_1 = __importDefault(require("../models/session"));
const vendor_1 = __importDefault(require("../models/vendor"));
const apollo_server_1 = require("apollo-server");
const jwt = require('jsonwebtoken');
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_1 = require("../util/errors");
const http_status_codes_1 = require("http-status-codes");
const vendor_resolvers = {
    Query: {
        getVendor: (_, ID, userId) => __awaiter(void 0, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                if (JSON.stringify(userId) === '{}') {
                    reject(new errors_1.CustomError('Invalid Token', http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION));
                }
                else {
                    const details = yield vendor_1.default.findById({ _id: userId.id });
                    if (details) {
                        details.name = "ssss";
                        details.count = 12;
                        resolve({ vendor: details, message: "Success", code: 200 });
                    }
                    else {
                        reject(new errors_1.CustomError('Vendor is not exists', http_status_codes_1.StatusCodes.BAD_REQUEST));
                    }
                }
            }));
        }),
        vendor(_, count) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var limit = count;
                        let Array = [];
                        const list = yield vendor_1.default.find().sort({ createdAt: -1 }).skip((limit.perPage * limit.page) - limit.perPage).limit(limit.perPage);
                        const totalCount = yield vendor_1.default.count();
                        if (list.length) {
                            list.map((data) => {
                                if (data.name == "Aashu") {
                                    data.totalSum = 2;
                                }
                                Array.push(data);
                            });
                        }
                        resolve({
                            totalCount: totalCount,
                            vendorList: Array,
                            message: "Record fetch successfully",
                            code: http_status_codes_1.StatusCodes.OK
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                }));
            });
        }
    },
    Mutation: {
        //add
        createVendor(_, vendorInput) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = vendorInput;
                const { name, email, phoneNumber, password } = data.vendorInput;
                const body = {
                    "name": name,
                    "email": email,
                    "phoneNumber": phoneNumber
                };
                const details = yield vendor_1.default.findOne({ email: email });
                if (details) {
                    throw new apollo_server_1.ApolloError('Vendor is already exists');
                }
                else {
                    const pass = bcrypt_1.default.hashSync(password, 10);
                    body.password = pass;
                    const res = yield vendor_1.default.create(body);
                    const token = jwt.sign({
                        id: res.id,
                        role: "Vendor",
                        userId: res._id
                    }, 'str34eet', { expiresIn: '30d' });
                    yield session_1.default.create({ role: "Vendor", userId: res._id, status: true, token: token });
                    res.token = token;
                    return (res);
                }
            });
        },
        //login
        loginVendor(_, loginInput) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const input = loginInput;
                    const details = yield vendor_1.default.findOne({ email: input.loginInput.email });
                    if (details) {
                        var match = bcrypt_1.default.compareSync(input.loginInput.password, details.password);
                        if (match == false) {
                            throw new Error('Wrong Password');
                        }
                        else {
                            const token = jwt.sign({
                                id: details.id,
                                role: "Vendor",
                                userId: details._id
                            }, 'str34eet', { expiresIn: '30d' });
                            yield session_1.default.create({ role: "Vendor", userId: details._id, status: true, token: token });
                            details.token = token;
                            return {
                                vendor: details,
                                message: 'Login successfully',
                                code: 200
                            };
                        }
                    }
                    else {
                        throw new Error('Eamil is not Exists');
                    }
                }
                catch (err) {
                    throw new Error(err.message);
                }
            });
        },
        //edit
        editVendor(_, ID) {
            return __awaiter(this, void 0, void 0, function* () {
                // if (JSON.stringify(user) === '{}') {
                //     throw new AuthenticationError('Token Expired')
                // } else {
                const data = ID;
                console.log(data.ID, "LSLS");
                const { name, email, phoneNumber } = data.vendorInput;
                const res = (yield vendor_1.default.updateOne({ _id: data.ID }, { name: name, email: email, phoneNumber: phoneNumber })).modifiedCount;
                return res;
                // }
            });
        },
        //delete
        deleteVendor(_, ID) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = ID;
                const id = data.ID;
                const res = (yield vendor_1.default.deleteOne({ _id: id })).deletedCount;
                return { res };
            });
        },
    }
};
exports.default = vendor_resolvers;
//# sourceMappingURL=vendor.js.map