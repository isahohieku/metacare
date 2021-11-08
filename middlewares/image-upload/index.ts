import multer, { Multer } from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

export interface MulterFile extends Express.Multer.File {
    location: string;
}

class UploadImage {

    public constructor() { }

    public handleUploadS3(): Multer {
        const { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, BUCKET } = process.env;
        const s3 = new aws.S3({
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            accessKeyId: AWS_ACCESS_KEY_ID
        });

        const upload = multer({
            storage: multerS3({
                s3,
                acl: 'public-read',
                bucket: BUCKET as string,
                metadata: function (req: any, file: any, cb: any): void {
                    cb(null, { fieldName: file.fieldname });
                },
                key: function (req: any, file: any, cb: any): void {
                    cb(null, Date.now().toString());
                }
            })
        });

        return upload;
    }
}

export default new UploadImage();