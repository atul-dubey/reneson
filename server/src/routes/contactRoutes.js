import express from 'express'
import { submitContactForm } from '../controllers/contactController.js';

const contactRoutes=express.Router();

contactRoutes.post('/contact',submitContactForm);

export {contactRoutes};