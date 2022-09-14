import express from "express";
import cors from "cors";
import morgan from "morgan"
import notesRoutes from './routes/notes.routes.js';

const app = express();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())


app.use(notesRoutes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

export default app;