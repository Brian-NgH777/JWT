import * as Minio from 'minio';

export default class MinioHelper {
    private static minioClient: Minio.Client;

    static getInstance() {
        if (!MinioHelper.minioClient) {
            MinioHelper.minioClient = new Minio.Client({
                endPoint: process.env.MINIO_HOST || 'localhost',
                port: process.env.MINIO_PORT ? Number(process.env.MINIO_PORT) : 9000,
                useSSL: process.env.MINIO_SSL ? Boolean(Number(process.env.MINIO_SSL)) : false,
                accessKey: process.env.MINIO_ACCESS_KEY || '',
                secretKey: process.env.MINIO_SECRET_KEY || ''
            });
        }
        return MinioHelper.minioClient;
    }
}
