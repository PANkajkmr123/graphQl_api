"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const vendorDefs = (0, apollo_server_1.gql) `
scalar Date
scalar Number
type Vendor {
    name:String
    email:String
    phoneNumber:Number 
    createdAt:Date
    updatedAt:Date
    _id:String
    count:Int
    token:String
    image:String
    totalSum:Int
}
type VendorDetails {
    vendor:Vendor!
    message:String
    code:Int!
}

type VendorList {
    vendorList:[Vendor!]
    totalCount:Int!
    message:String
    code:Int!
}

input VendorInput {
    name:String
    email:String
    phoneNumber:Number 
    password:String
}

input editVendorInput {
    name:String
    email:String
    phoneNumber:Number 
    image:String
}
input loginInput {
    email:String
    password:String
}
type Query {
    getVendor(ID:ID):VendorDetails!
    vendor(perPage:Int,page:Int):VendorList!
}

type Mutation{
    createVendor(vendorInput:VendorInput):Vendor!
    loginVendor(loginInput:loginInput):VendorDetails!
    deleteVendor(ID:ID!):Boolean
    editVendor(ID:ID!,vendorInput:editVendorInput):Boolean
}`;
exports.default = vendorDefs;
//# sourceMappingURL=vendor.js.map