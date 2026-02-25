import express from 'express';
import cors from 'cors'
import { projectRoutes } from './routes/projectRoutes.js';
import { statRoutes } from './routes/statRoutes.js';
import { testimonialRoutes } from './routes/testimonialRoutes.js';
import { clientRoutes } from './routes/clientRoutes.js';
import { teamRoutes } from './routes/teamRoutes.js';
import { contactRoutes } from './routes/contactRoutes.js';
import { adminLogin } from './controllers/adminAuthController.js';
import { phaseRoutes } from './routes/phaseRoutes.js';

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use("/api/projects", projectRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/team", teamRoutes);
app.use("/api",contactRoutes);
app.use('/api/login',adminLogin);
app.use('/api/phase',phaseRoutes);

export {app};