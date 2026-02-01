import express from 'express';
import cors from 'cors'
import { projectRoutes } from './routes/projectRoutes.js';
import { statRoutes } from './routes/statRoutes.js';
import { testimonialRoutes } from './routes/testimonialRoutes.js';
import { clientRoutes } from './routes/clientRoutes.js';
import { teamRoutes } from './routes/teamRoutes.js';

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:[process.env.FRONTEND_URL],
}))

app.use("/api/projects", projectRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/team", teamRoutes);

export {app};