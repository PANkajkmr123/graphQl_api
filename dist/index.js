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
// import './pre-start';
require('dotenv').config();
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const jwt = require('jsonwebtoken');
const cors_1 = __importDefault(require("cors"));
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const database_1 = __importDefault(require("./util/database"));
const errors_1 = require("./util/errors");
const http_status_codes_1 = require("http-status-codes");
const PORT = process.env.PORT || 5000;
var app = (0, express_1.default)();
(0, database_1.default)();
//Apollo server connection
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.default,
            resolvers: resolvers_1.default,
            context: ({ req }) => {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const authHeader = req.headers.authorization;
                    const role = req.headers.role;
                    if (authHeader) {
                        try {
                            const decoded = jwt.verify(authHeader, 'str34eet');
                            if (!decoded) {
                                reject(new errors_1.CustomError('Invalid Token', http_status_codes_1.StatusCodes.BAD_REQUEST));
                            }
                            else {
                                if (!role) {
                                    reject(new errors_1.CustomError('Invalid Role? Role must be [User,Vendor]', http_status_codes_1.StatusCodes.BAD_REQUEST));
                                }
                                else {
                                    if (role == decoded.role) {
                                        resolve(decoded);
                                    }
                                    else {
                                        reject(new errors_1.CustomError('Invalid Role', http_status_codes_1.StatusCodes.BAD_REQUEST));
                                    }
                                }
                            }
                        }
                        catch (err) {
                            reject(new apollo_server_express_1.AuthenticationError(err.message));
                        }
                    }
                    // If there is no authorization header, return an empty object in the context
                    resolve({});
                }));
            },
        });
        app.use((0, graphql_upload_minimal_1.graphqlUploadExpress)());
        yield server.start();
        // Apply any desired middleware to the Express app
        // Example: CORS middleware
        app.use((0, cors_1.default)());
        // Apply the Apollo Server middleware to the app
        server.applyMiddleware({ app });
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}
startApolloServer().catch((err) => {
    console.error('Failed to start Apollo Server:', err);
});
// mongoose.connect(MONGODB)
//     .then(() => {
//         console.log('Mongodb connected');
//         return app.listen({ port: process.env.PORT })
//     })
//     .then((res) => {
//         console.log(`server is running at ${process.env.PORT}`)
//     })
//# sourceMappingURL=index.js.map