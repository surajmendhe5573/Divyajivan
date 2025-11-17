import Yoga_formService from "./yoga_form.service.js";
import { statusCode } from '../../utils/constants/statusCode.js';
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default class Yoga_formController {
  constructor() {
    this.yoga_formService = Yoga_formService;

    // Mail transporter
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER?.trim(),
        pass: process.env.EMAIL_PASS?.trim()
      }
    });
  }

  create = async (req, res, next) => {
  try {
    const data = await this.yoga_formService.create(req.body);

    const userEmail = data.phone?.email?.trim();
    const userName = data.name;
    
    const pdfBuffer = req.file?.buffer;

    // SEND EMAIL TO USER ONLY
    if (userEmail) {
      await this.transporter.sendMail({
        from: `"Yoga Institute" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "We have received your application",
        html: `
          <p>Dear <b>${userName}</b>,</p>
          <p>Thank you for submitting your application.</p>
          <p>We have successfully received your form.</p>
          <p>Our team will contact you shortly.</p>
          <br/>
          <p>Regards,<br/>Sri Divya Jivan Sanskrutik Sangh <br/>Ahmedabad</p>
        `,
        attachments: pdfBuffer ? [
          {
            filename: "your-application.pdf",
            content: pdfBuffer,
          }
        ] : []
      });
    } else {
      console.log("User email not provided — skipping email sending.");
    }

    return res.success(
      "Application submitted successfully",
      data,
      statusCode.CREATED
    );

  } catch (err) {
    next(err);
  }
};

  getAll = async (req, res, next) => {
    try {
      const data = await this.yoga_formService.getAll();
      res.success("Get All Yoga Forms", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const form = await this.yoga_formService.delete(req.params.id);
      if (!form) return res.fail("Form not found");

      res.success("Form deleted successfully", statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
