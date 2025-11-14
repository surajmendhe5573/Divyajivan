import Yoga_formService from "./yoga_form.service.js";
import { statusCode } from '../../utils/constants/statusCode.js';

export default class Yoga_formController {
  constructor() {
    this.yoga_formService =  Yoga_formService;
  }

  create = async (req, res, next) => {
    try {
       const data = await this.yoga_formService.create(req.body);
       res.success("Application submitted successfully", data, statusCode.CREATED);
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
}
