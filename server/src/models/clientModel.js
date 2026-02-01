import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
});

const clientModel = mongoose.model("client", clientSchema);

export {clientModel}