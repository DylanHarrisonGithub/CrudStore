import React from 'react';
import Gallery from '../components/gallery/gallery';

import config from '../config/config';

import HttpService from '../services/http.service';



const Admin: React.FC<any> = (props: any) => {

  const [avatars, setAvatars] = React.useState<string[]>([]);

  React.useEffect(() => {
    HttpService.get<{
      success: boolean,
      message: string[],
      body: string[]
    }>('avatarlist').then(res => setAvatars(res.response!.body));
  }, []);
  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto my-2">
      <h1>admin page</h1>
      <hr />
      <h1>Avatar Images</h1>
      {
        avatars.map(a => <img className="inline-block" key={a} width={64} height={64} src={config.ASSETS[config.ENVIRONMENT] + `avatars/${a}`}></img>)
      }
      <hr />
      <h1>Product Images</h1>
      <Gallery ></Gallery>
      <hr />
      <h1>Users</h1>
      <Gallery ></Gallery>
      <hr />
      <h1>Products</h1>
      <Gallery ></Gallery>
      <hr />
    </div>
  );
}

export default Admin;
