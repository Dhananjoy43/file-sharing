import express from "express";
import cors from 'cors'
import router from "./routes/route.js";
import DBconnect from "./database/db.js";
const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router)

app.listen(PORT, () => {
    try {
        DBconnect();
        console.log(`Server is running at https://localhost:${PORT}`);
    } catch (error) {
        console.error("Connection lost to server!");
    }
})
