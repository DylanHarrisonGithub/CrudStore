import React from "react";

import ValidationService, { Schema, COMMON_REGEXES } from "../services/validation.service";
import HttpService from "../services/http.service";

const userSchema = {
  email: {
    required: true,
    type: 'string',
    minLength: 8,
    isEmail: true
  },
  password: {
    required: true,
    type: 'string',
    minLength: 8,
    isPassword: true
  }
}

const userSchema2: Schema = {
  email: {
    type: COMMON_REGEXES.EMAIL,
    attributes: {
      required: true,
      strLength: { minLength: 8, maxLength: 40 }
    }
  },
  password: {
    type: COMMON_REGEXES.PASSWORD_STRONGEST,
    attributes: {
      required: true,
      strLength: { minLength: 8, maxLength: 40 }
    }
  },
  password2: {
    type: "string",
    attributes: {
      required: true,
      tests: [
        ((root, input) => {
          let t = root.password === input;
          if (t) {
            return { success: true } 
          } else {
            return { success: false, message: ` Passwords do not match!`}
          }
        })
      ]
    }
  }
};

const Register: React.FC<any> = (props: any) => {

  const [form, setForm] = React.useState<{email: string, password: string, password2: string}>({email: "", password: "", password2: ""});
  const [errors, setErrors] = React.useState<{email?: string[], password?: string[], password2?: string[]}>({})

  const updateForm = (key: string, value: string) => setForm({ ...form, [key]: value });

  React.useEffect(() => {
    // useeffect function can't be directly async??
    (async () => {
      const errs = (await ValidationService.validate({ email: form.email, password: form.password, password2: form.password2 }, userSchema2)).body;
      const emailErrs = errs?.filter(e => e.includes('email'));
      const passwordErrs = errs?.filter(e => (e.includes('password') && !(e.includes('password2'))));
      const password2Errs = errs?.filter(e => e.includes(`Passwords do not match!`)).map(e => e.replace('password2', ''));
      // const password2Errs = form.password === form.password2 ? [] : ['passwords do not match'];
      setErrors({
        email: form.email.length > 0 ? emailErrs : undefined,
        password: form.password.length > 0 ? passwordErrs : undefined,
        password2: (form.password2.length > 0 || form.password.length > 0) ? password2Errs : undefined
      });
    })();

  }, [form]);

  const submit = () => {
    HttpService.post('register', { email: form.email, password: form.password }).then(res => console.log(res)).catch(err => console.log(err));
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto my-2">
      <div className="card-body">
        <h2 className="card-title">Register</h2>
        <div className="divider"></div>
        <div className="form-control">

          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Email</span>
            <input 
              type="text" placeholder="info@site.com" className="input input-bordered" value={form.email}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => updateForm('email', event.target.value)}
            />
            {
              (errors.email && errors.email.length > 0) && 
              <ul className="alert-error shadow-lg list-disc list-inside">
                {
                  errors.email.map((e, i) => <li className="pl-4" key={i}>{e}</li>)
                }
              </ul>
            }
          </label>

          <label className="label">
            <span className="label-text">Your Password</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Password</span>
            <input 
              type="password" placeholder="password" className="input input-bordered" value={form.password}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => updateForm('password', event.target.value)}
            />
            {
              (errors.password && errors.password.length > 0) && 
              <ul className="alert-error shadow-lg list-disc list-inside">
                {
                  errors.password.map((e, i) => <li className="pl-4" key={i}>{e}</li>)
                }
              </ul>
            }
          </label>

          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Password</span>
            <input 
              type="password" placeholder="password" className="input input-bordered" value={form.password2}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => updateForm('password2', event.target.value)}
            />
            {
              (errors.password2 && errors.password2.length > 0) && 
              <ul className="alert-error shadow-lg list-disc list-inside">
                {
                  errors.password2.map((e, i) => <li className="pl-4" key={i}>{e}</li>)
                }
              </ul>
            }
          </label>

          <button className="btn btn-wide mx-auto mt-8" 
            disabled={
              ((errors.email && !!(errors.email.length)) || !form.email.length) ||
              ((errors.password && !!(errors.password.length)) || !form.password.length) ||
              ((errors.password2 && !!(errors.password2.length)) || !form.password2.length)
            } 
            onClick={submit}
          >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Register;