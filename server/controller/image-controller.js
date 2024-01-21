import dotenv from 'dotenv';
dotenv.config();
import File from "../models/file.js";

const SERVER_URL = process.env.SERVER_URL;

export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
    }
    try {
        const res = await File.create(fileObj);
        response.status(200).json({ path: `${SERVER_URL}/file/${res._id}` });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const downloadImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);
        file.downloadContent++;
        await file.save();

        response.download(file.path, file.name);
    } catch (error) {
        return response.status(500).json({ error: error.messages });
    }
}