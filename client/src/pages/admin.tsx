import React from 'react';
import Gallery from '../components/gallery/gallery';

import config from '../config/config';

import HttpService from '../services/http.service';

import { ModalContext } from '../components/modal/modal';
import { response } from 'express';

const Admin: React.FC<any> = (props: any) => {

  const modalContext = React.useContext(ModalContext);

  const [avatars, setAvatars] = React.useState<string[]>([]);
  const [productImages, setProductImages] = React.useState<string[]>([]);

  const fetchAvatarFilenames = () => HttpService.get<{
    success: boolean,
    message: string[],
    body: string[]
  }>('avatarlist').then(res => {
    (res.response?.success && res.response?.body) && (() => { 
      setAvatars(res.response.body); 
      modalContext.toast!('success', 'Successfully loaded avatar filenames.');
      res.response.message?.forEach(m => modalContext.toast!('success', m));
    })();
    !(res.response?.success) && (() => {
      res.response?.message?.forEach(m => modalContext.toast!('warning', m));
      modalContext.toast!('warning', 'Unable to load avatar filenames. See console'); 
      console.log(res);
    })();
  });

  const fetchProductImageFilenames = () => HttpService.get<{
    success: boolean,
    message: string[],
    body: string[]
  }>('productimagelist').then(res => {
    if (res.response?.success && res.response.body) {
      setProductImages(res.response.body); 
      modalContext.toast!('success', 'Successfully loaded product image filenames.');
      res.response.message?.forEach(m => modalContext.toast!('success', m));
    } else {
      res.response?.message?.forEach(m => modalContext.toast!('warning', m));
      modalContext.toast!('warning', 'Unable to load product image filenames. See console'); 
      console.log(res);
    }
  });

  React.useEffect(() => {
    fetchAvatarFilenames();
    fetchProductImageFilenames();
  }, []);

  return (
    <div className="card w-5/6 bg-base-100 shadow-xl mx-auto my-2">
      <h1 className="text-center text-4xl font-bold">Admin</h1>

      <hr />

      {/* ------------------------------------------------------- AVATAR IMAGES ------------------------------------------------------- */}
      <Gallery title="Avatar Images">
        {
          avatars.map(a => (
            <span key={a} className="relative">
              <p 
                className="absolute -right-3 -top-3 bg-red-500 p-1 rounded-full w-6 h-6 cursor-pointer border-2 border-black"
                onClick={() => (modalContext.modal!({prompt: `Are you sure you want to delete\n ${a}?`, options: ["yes", "no"]}))!.then(res => {
                  if (res === "yes") {
                    HttpService.delete<{
                      success: boolean,
                      message: string[]
                    }>('deleteavatar', { filename: a }).then(res => {
                      if (res.response?.success) {
                        setAvatars(avatarList => avatarList.filter(avatarListFilename => avatarListFilename !== a));
                        res.response.message?.forEach(m => modalContext.toast!('success', m));
                      } else {
                        modalContext.toast!('warning', `Unable to delete avatar ${a}`);
                        res.response?.message?.forEach(m => modalContext.toast!('warning', m));
                      }
                    });
                  }
                }).catch(e => {})}
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">X</span>
              </p>
              <img className="inline-block" width={64} height={64} src={config.ASSETS[config.ENVIRONMENT] + `avatars/${a}`}></img>
            </span>
          ))
        }
      </Gallery>
      <input 
        type="file" 
        className="m-5 file-input file-input-bordered file-input-primary w-full max-w-xs" 
        onChange={e => e.target.files?.[0] && HttpService.upload<{
          success: boolean,
          message: string[],
          body: string[]
        }>('uploadavatar', e.target.files[0]).then(res => {
          (res.response?.success && res.response?.body) && (() => {
            setAvatars(res.response!.body);
            modalContext.toast!('success', 'Successfully loaded avatar filenames.');
            res.response.message?.forEach(m => modalContext.toast!('success', m));
          })();
          !(res.response?.success) && (() => {
            res.response?.message?.forEach(m => modalContext.toast!('warning', m));
            modalContext.toast!('warning', 'Unable to load avatar filenames. See console'); 
            console.log(res);
          })();
        })}
      />
      <hr />


      {/* ------------------------------------------------------- PRODUCT IMAGES ------------------------------------------------------- */}
      <Gallery title="Product Images">
        {
          productImages.map(a => (
            <span key={a} className="relative">
              <p 
                className="absolute -right-3 -top-3 bg-red-500 p-1 rounded-full w-6 h-6 cursor-pointer border-2 border-black"
                onClick={() => (modalContext.modal!({prompt: `Are you sure you want to delete\n ${a}?`, options: ["yes", "no"]}))!.then(res => {
                  if (res === "yes") {
                    HttpService.delete<{
                      success: boolean,
                      message: string[]
                    }>('deleteproductimage', { filename: a }).then(res => {
                      if (res.response?.success) {
                        setProductImages(productImageList => productImageList.filter(productImageFilename => productImageFilename !== a))
                        res.response.message?.forEach(m => modalContext.toast!('success', m));
                      } else {
                        modalContext.toast!('warning', `Unable to delete product image ${a}`);
                        res.response?.message?.forEach(m => modalContext.toast!('warning', m));
                      }
                    });
                  }
                }).catch(e => {})}
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">X</span>
              </p>
              <img className="inline-block" width={64} height={64} src={config.ASSETS[config.ENVIRONMENT] + `products/${a}`}></img>
            </span>
          ))
        }
      </Gallery>
      <input 
        type="file" 
        className="m-5 file-input file-input-bordered file-input-primary w-full max-w-xs" 
        onChange={e => e.target.files?.[0] && HttpService.upload<{
          success: boolean,
          message: string[],
          body: string[]
        }>('uploadproductimage', e.target.files[0]).then(res => {
          (res.response?.success && res.response?.body) && (() => {
            setProductImages(res.response!.body);
            res.response.message?.forEach(m => modalContext.toast!('success', m));
          })();
          !(res.response?.success) && (() => {
            modalContext.toast!('warning', 'Unable to load product image filenames. See console');
            res.response?.message?.forEach(m => modalContext.toast!('warning', m));
            console.log(res);
          })();
        })}
      />
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
