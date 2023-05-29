const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'dzo5a6job',
    api_key: process.env.API_KEY || '574872753785159',
    api_secret: process.env.API_SECRET || 'zeCKvoHK9yO2L-GYfuc3DfLdfTg'
});


const image_uploader = async(file : any) => {
    console.log('enenenenne')
    const { createReadStream, filename } = await file.file;
    const uploadOptions = {
        folder: 'uploads', // Optional: Set a folder name for organizing your uploads
        public_id: filename, // Optional: Set a specific public_id for the uploaded image
    };
    createReadStream()
        .pipe(cloudinary.uploader.upload_stream(uploadOptions, (error: any, result: any) => {
            if (error) {
                return (error);
            } else {
                console.log(result.secure_url,"result.secure_url")
                return ({
                    secure_url: result.secure_url,
                });
            }
        }));
}

export = image_uploader;

