import React from "react";
import HttpService from "../services/http.service";

import ValidationService from "../services/validation.service";

const Login: React.FC<any> = (props: any) => {

  const [form, setForm] = React.useState<{email: string, password: string}>({email: "", password: ""});

  const updateForm = (key: string, value: string) => setForm({ ...form, [key]: value });

  const submit = () => {
    HttpService.post('login', { email: form.email, password: form.password }).then(res => console.log(res)).catch(err => console.log(err));
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto my-2">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        <div className="divider"></div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Email</span>
            <input type="text" placeholder="info@site.com" className="input input-bordered"
               value={form.email}
               onInput={(event: React.ChangeEvent<HTMLInputElement>) => updateForm('email', event.target.value)}
            />
          </label>
          <label className="label">
            <span className="label-text">Your Password</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Password</span>
            <input type="password" placeholder="password" className="input input-bordered" 
              value={form.password}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => updateForm('password', event.target.value)}
            />
          </label>
          <button className="btn btn-wide mx-auto mt-8"
            disabled={!(form.email.length && form.password.length)}
            onClick={submit}
          >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login;