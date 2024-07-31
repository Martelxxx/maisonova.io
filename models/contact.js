// models/contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    desiredDate: { type: Date, required: true },
    serviceType: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;