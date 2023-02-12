import express from 'express';
import { Router } from 'express';
import multer from 'multer';
import { convertCsvToJson } from './convertCsvToJson';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const route = Router();

const app = express();
app.use(express.json());
app.use(route);

route.post('/csv', upload.single('file'), (request, response) => {
    const csv = request.file?.buffer.toString('utf-8');
    const result = convertCsvToJson(csv!);
    try {
        return response.status(200).json(result)
    } catch (error) {   
        console.log(`Internal error: ${error}`)
    }
});

const port:number = 3001;
app.listen(port, () => console.log(`Server is Running 🚀️`));