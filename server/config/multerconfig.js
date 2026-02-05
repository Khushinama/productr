import multer from "multer";
import path from "path";
import crypto from "crypto";

// Generate unique filename
const generateFileName = (originalName) => {
  const ext = path.extname(originalName);
  const random = crypto.randomBytes(10).toString("hex");
  return `${Date.now()}-${random}${ext}`;
};

// ================= PROFILE IMAGE STORAGE =================
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, generateFileName(file.originalname));
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const uploadProfileImage = multer({
  storage: profileStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ================= PRODUCT IMAGE STORAGE =================
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, generateFileName(file.originalname));
  },
});

export const uploadProductImages = multer({
  storage: productStorage,
  fileFilter: imageFilter,
  limits: { files: 5 },
});
