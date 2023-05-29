"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require('apollo-server-express');
const imageDefs = gql `
scalar Upload

type Mutation {
  uploadImage(file: Upload): Boolean
}

`;
exports.default = imageDefs;
//# sourceMappingURL=image.js.map