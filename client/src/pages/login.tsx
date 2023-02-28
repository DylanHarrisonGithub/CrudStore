import React from "react";
import { useNavigate } from 'react-router-dom';

import HttpService from "../services/http.service";
import AuthService from "../services/auth.service";

import { ModalContext } from "../components/modal/modal";

const Login: React.FC<any> = (props: any) => {

  const [form, setForm] = React.useState<{email: string, password: string}>({email: "", password: ""});

  const updateForm = (key: string, value: string) => setForm({ ...form, [key]: value });

  const modalContext = React.useContext(ModalContext);

  const navigate = useNavigate();

  const submit = () => {
    HttpService.post<{ token: string }>('login', { email: form.email, password: form.password }).then(async res => {     
      if (!res.success) {
        console.log(res);
        modalContext.toast?.('error', 'Error occured attempting to login.');
        res.messages.forEach(m => modalContext.toast!('warning', m));
      } else {
        if (res.body?.token) {
          res.messages.forEach(m => modalContext.toast?.('success', m));
          await AuthService.storeToken(res.body.token);
          navigate('/home');
        } else {
          modalContext.toast?.('error', 'Error occured attempting to login.');
          res.messages.forEach(m => modalContext.toast?.('error', m));
        }
      }
    }).catch(err => {
      console.log(err);
      modalContext.toast?.('error', 'Unknown error occured attempting to login.');
      modalContext.toast?.('error', err.toString());
    });
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