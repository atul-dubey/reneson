import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String },
  linkedin: { type: String },
  github: { type: String },
  image: { type: String },
});

const teamModel = mongoose.model("team", teamSchema);

export {teamModel}