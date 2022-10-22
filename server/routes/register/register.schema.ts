export default {
  email: {
    type: 'string',
    isEmail: true
  },
  password: {
    minLength: 8,
    type: 'string',
    isPassword: true
  }
}