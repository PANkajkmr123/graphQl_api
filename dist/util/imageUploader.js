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
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'dzo5a6job',
    api_key: process.env.API_KEY || '574872753785159',
    api_secret: process.env.API_SECRET || 'zeCKvoHK9yO2L-GYfuc3DfLdfTg'
});
const image_uploader = (file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('enenenenne');
    const { createReadStream, filename } = yield file.file;
    const uploadOptions = {
        folder: 'uploads',
        public_id: filename, // Optional: Set a specific public_id for the uploaded image
    };
    createReadStream()
        .pipe(cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) {
            return (error);
        }
        else {
            console.log(result.secure_url, "result.secure_url");
            return ({
                secure_url: result.secure_url,
            });
        }
    }));
});
module.exports = image_uploader;
//# sourceMappingURL=imageUploader.js.map