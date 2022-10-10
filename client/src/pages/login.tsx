import React from "react";

import ValidationService from "../services/validation.service";

const Login: React.FC<any> = (props: any) => {
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
            <input type="text" placeholder="info@site.com" className="input input-bordered" />
          </label>
          <label className="label">
            <span className="label-text">Your Password</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Password</span>
            <input type="password" placeholder="password" className="input input-bordered" />
          </label>
          <button className="btn btn-wide mx-auto mt-8">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login;