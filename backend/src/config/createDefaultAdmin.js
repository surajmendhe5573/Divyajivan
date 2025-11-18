import bcrypt from "bcryptjs";
import { USER_MODEL } from "../modules/user/user.model.js";

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await USER_MODEL.findOne({ role: "Admin" });

    if (existingAdmin) {
      console.log("✔ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("adMin@1811", 10);

    await USER_MODEL.create({
      username: "superadmin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "Admin"
    });

    console.log("🔥 Default Admin Created Successfully:");
    console.log("Username: superadmin");
    console.log("Password: adMin@1811");

  } catch (err) {
    console.error("Failed to create default admin:", err);
  }
};

export default createDefaultAdmin;
