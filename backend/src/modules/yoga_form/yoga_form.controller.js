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

      const pdfBuffer = req.file?.buffer;

      const adminEmail = process.env.ADMIN_EMAIL?.trim();
      const userEmail = data.phone?.email?.trim();

      console.log("ADMIN_EMAIL =", adminEmail);
      console.log("USER_EMAIL =", userEmail);

      if (!adminEmail) {
        console.log("ADMIN_EMAIL not found in .env");
      } else if (pdfBuffer) {
        await this.transporter.sendMail({
          from: `"Yoga Institute" <${process.env.EMAIL_USER}>`,
          to: adminEmail,
          subject: "New Yoga Registration Form Submitted",
          text: `
A new Yoga Application Form has been submitted.

Name: ${data.name}
Email: ${data.phone?.email}
Mobile: ${data.phone?.mobile}
          `,
          attachments: [
            {
              filename: "application.pdf",
              content: pdfBuffer
            }
          ]
        });
      }

      // SEND EMAIL TO APPLICANT 
      if (userEmail) {
        await this.transporter.sendMail({
          from: `"Yoga Institute" <${process.env.EMAIL_USER}>`,
          to: userEmail,
          subject: "We have received your application",
          html: `
            <p>Dear <b>${data.name}</b>,</p>
            <p>Thank you for applying for the 45th Yoga Teacher Training Course.</p>
            <p>We have successfully received your application form.</p>
            <p>Our team will contact you soon.</p>
            <br/>
            <p>Regards,<br/>Sri Divya Jivan Sanskrutik Sangh</p>
          `
        });
      } else {
        console.log("User email not provided — skipping user email sending.");
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
