import { YOGA_FORM_MODEL } from "./yoga_form.model.js"; 
 
 class Yoga_formService {
   
  async create(data) {
    return await YOGA_FORM_MODEL.create(data);
  }

  async getAll() {
    return await YOGA_FORM_MODEL.find().sort({ createdAt: -1 });
  }
}

export default new Yoga_formService();
