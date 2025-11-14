import multer from "multer";

const storage = multer.memoryStorage();

// Define accepted file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and PDF files are allowed"), false);
  }
};

// Define fields for Admission Form Document Upload
const uploadImageKit = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
}).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "birthCertificate", maxCount: 1 },
  { name: "transferCertificate", maxCount: 1 },
  { name: "reportCard", maxCount: 1 },
  { name: "casteCertificate", maxCount: 1 },
]);

export default uploadImageKit;
