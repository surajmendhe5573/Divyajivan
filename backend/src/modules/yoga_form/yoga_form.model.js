import mongoose from "mongoose";

const yogaFormSchema = new mongoose.Schema({
  salutation: { type: String, enum: ["Mr", "Mrs", "Miss", "Ms", "Dr", "Other"], required: true},
  name: { type: String, required: true },
  address:{ type: String },
  phone: {
  residence: { type: String },
  office: { type: String },
  mobile: { type: String },
  email: { type: String },
},
  birthDate: { type: Date },
  sex: { type: String, enum: ["Male", "Female"] },
  maritalStatus: { type: String },
  education: { type: String },
  profession: { type: String },
  languagesKnown: [String],
  hobbies: [String],
  previousYogaKnowledge: { type: String },
  teachingExperience: { type: String },

  anyAddiction: {
    hasAddiction: { type: Boolean, default: false },
    addictionDetails:{ type: String },
  },

  illness: {
    hasIllness: { type: Boolean, default: false },
    illnessDetails: { type: String },
    treatmentDetails: { type: String },
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
