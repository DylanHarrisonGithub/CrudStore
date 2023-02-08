import { Schema, COMMON_REGEXES } from '../../services/validation/validation.service';

const registerSchema: Schema = {
  email: {
    type: COMMON_REGEXES.EMAIL,
    attributes: {
      required: true,
      strLength: { minLength: 6 }
    }
  },
  password: {
    type: COMMON_REGEXES.PASSWORD_STRONGEST,
    attributes: {
      required: false,
      strLength: { minLength: 8 }
    }
  },
  dummy: {
    type: 'string'
  }
};

export default registerSchema;