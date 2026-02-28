import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  icon: String,
  title: String,
  desc: String,
  bg: String,
  iconColor: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  featuresList: [String]
}, { _id: false });

const brandSchema = new mongoose.Schema({
  heroImage: { type: String }
}, { timestamps: true });

export default mongoose.model('Brand', brandSchema);
