import mongoose from "mongoose";

const yogaFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address:{ type: String },
  phone: {
    residence: String,
    office: String,
    mobile: String,
    email: String
  },
  birthDate: Date,
  sex: { type: String, enum: ["Male", "Female"] },
  maritalStatus: String,
  education: String,
  profession: String,
  languagesKnown: [String],
  hobbies: [String],
  previousYogaKnowledge: String,
  teachingExperience: String,

  anyAddiction: {
    hasAddiction: { type: Boolean, default: false },
    addictionDetails: String
  },

  illness: {
    hasIllness: { type: Boolean, default: false },
    illnessDetails: String,
    treatmentDetails: String, 
  },

  spiritualGuru: {
    hasSpiritualGuru: { type: Boolean, default: false },
    spiritualGuruName: { type: String },
  },

  instituteService: {
      associated: { type: Boolean, default: false },
      instituteName: { type: String },
      natureOfService: { type: String },
    },

  paymentDetails: {
      amountPaid: { type: Number },
      paymentMode: { type: String, enum: ["Cheque", "DD", "Online", "Cash"] },
      bankName: { type: String },
      paymentDate: { type: Date },
      transactionId: { type: String },
    },
    status: { type: String, default: "Submitted", enum: ["Submitted", "Under Review", "Approved", "Rejected"]},  

}, {timestamps:true});

export const YOGA_FORM_MODEL = mongoose.model("yoga-form", yogaFormSchema);
