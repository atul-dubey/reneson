import mongoose from 'mongoose'

const statSchema = new mongoose.Schema({
  label: { type: String, required: true }, 
  value: { type: Number, required: true }, 
});

const statModel= mongoose.model("stat", statSchema);

export {statModel}