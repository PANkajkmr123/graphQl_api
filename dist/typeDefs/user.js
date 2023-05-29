"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const userDefs = (0, apollo_server_1.gql) `
type User {
    name:String
    email:String
    phoneNumber:Int 
    createdAt:String
    updatedAt:String
    _id:String
    count:Int
}

input UserInput {
    name:String
    email:String
    phoneNumber:Int
    address:String
    qualification:String
    }

type Query {
    getUser(ID:ID!):User!
    user(count:Int):[User]
}

type Mutation{
    createUser(userInput:UserInput):User!
    deleteUser(ID:ID!):Boolean
    editUser(ID:ID!,userInput:UserInput):Boolean
}`;
exports.default = userDefs;
//# sourceMappingURL=user.js.map