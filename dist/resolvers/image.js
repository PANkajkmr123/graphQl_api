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
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const errors_1 = require("../util/errors");
const http_status_codes_1 = require("http-status-codes");
const vendor_1 = __importDefault(require("../models/vendor"));
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const image_resolvers = {
    Upload: graphql_upload_minimal_1.GraphQLUpload,
    Mutation: {
        uploadImage: (_, file, userId) => __awaiter(void 0, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    console.log(userId, "s;lslslsl");
                    if (JSON.stringify(userId) === '{}') {
                        console.log(userId, "flfllflflfllf");
                        reject(new errors_1.CustomError('Token Expired', http_status_codes_1.StatusCodes.BAD_GATEWAY));
                    }
                    else {
                        if (!(file.file)) {
                            reject(new errors_1.CustomError('Please Upload Image', http_status_codes_1.StatusCodes.BAD_GATEWAY));
                        }
                        else {
                            const { createReadStream, filename } = yield file.file;
                            const uploadOptions = {
                                folder: 'uploads',
                                public_id: filename, // Optional: Set a specific public_id for the uploaded image
                            };
                            createReadStream()
                                .pipe(cloudinary.uploader.upload_stream(uploadOptions, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    const updateProfile = (yield vendor_1.default.updateOne({ _id: userId.id }, { image: result.secure_url })).modifiedCount;
                                    resolve(updateProfile);
                                }
                            })));
                        }
                    }
                }
                catch (err) {
                    reject(err);
                }
            }));
        }),
    },
};
exports.default = image_resolvers;
// uploadImage: async (_: any, { file }: any) => {
//     try {
//         //   console.log(process.env.CLOUD_NAME,"dldl")
//         //   const path = require('path');
//         //   const mainDir = path.dirname(require.main?.filename)
//         //   const fileName = `${mainDir}/graphql/public/image/traditional-food-around-the-world-Travlinmad.jpg`
//         //   console.log(fileName, "slsls")
//         //   const result = await cloudinary.v2.uploader.upload(fileName);
//         const { createReadStream, filename } = await file;
//         const stream = createReadStream();
//         console.log(stream, "d;ldld", createReadStream, "dldldldld", filename)
//         const uploadOptions = {
//             folder: 'your_folder_name', // Optional folder name
//             public_id: filename, // Use the filename as the public ID
//             overwrite: true,
//             resource_type: 'auto', // Determine resource type dynamically based on file content
//         };
//         // Upload the image to Cloudinary
//         const result = await cloudinary.uploader.upload(stream, uploadOptions);
//         // Return the uploaded image details
//         return {
//             // name:file.name,
//             public_id: "result.public_id",
//             secure_url: "result.secure_url",
//             format: "result.format,"
//         };
//     } catch (err) {
//         console.log(err)
//     }
// }
//# sourceMappingURL=image.js.map