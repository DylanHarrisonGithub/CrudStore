import React from 'react';
import Gallery from '../components/gallery/gallery';

import config from '../config/config';

import HttpService from '../services/http.service';

import { ModalContext } from '../components/modal/modal';

import { User, Product, Review } from '../models/models';
import UserForm from '../components/user-form/user-form';
import ProductCard from '../components/product-card/product-card';
import ProductForm from '../components/product-form/product-form';

const Admin: React.FC<any> = (props: any) => {

  const modalContext = React.useContext(ModalContext);

  const [avatars, setAvatars] = React.useState<string[]>([]);
  const [productImages, setProductImages] = React.useState<string[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);

  const [products, setProducts] = React.useState<Product[]>([
    // { id: 0, name: 'Beef Jerky', maker: 'Jack Link\'s', price: 123, deal: 0, description: 'Beefy, chewy meat snacks', image: `71iqio6veyS._SL1500_.jpg`, tags: '', stars: 3, reviews: 0 }
  ]);
  const [reviews, setReviews] = React.useState<Review[]>([]);

  const quickGet = async <T = void,>(route: string): Promise<T | void> => HttpService.get<{
    success: boolean, message: string[], body: T
  }>(route).then(res => {
    if (res.response?.success && res.response.body) {
      modalContext.toast!('success', `GET request to ${route} successful.`);
      res.response.message?.forEach(m => modalContext.toast!('success', m));
      return res.response.body;
    } else {
      modalContext.toast!('warning', `GET request to ${route} failed.`);
      res.response?.message?.forEach(m => modalContext.toast!('warning', m));
    }
  });

  React.useEffect(() => {
    quickGet<string[]>('avatarlist').then(res => setAvatars(res || []));
    quickGet<string[]>('productimagelist').then(res => setProductImages(res || []));
    quickGet<User[]>('userlist').then(res => setUsers(res || []));
    quickGet<Product[]>('products').then(res => setProducts(res || []));
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
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-5 my-5 rounded m-5 file-input file-input-bordered file-input-primary w-full max-w-xs" 
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
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-5 my-5 rounded m-5 file-input file-input-bordered file-input-primary w-full max-w-xs" 
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

      {/* ------------------------------------------------------- USERS ------------------------------------------------------- */}
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-3 ml-3">Users</h1>
      <table className="table-auto m-5">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Privilege</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                <img src={config.ASSETS[config.ENVIRONMENT] + `avatars/${user.avatar}`} className="w-8 h-8 rounded-full" />
              </td>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.privilege}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    (new Promise<User>((res, rej) => {
                      modalContext.modal!({node: (
                        <UserForm user={user} resolve={res} avatarList={avatars}/>
                      ), resolve: res, reject: rej});
                    })).then(async ({ id, ...rest }) => {
                      modalContext.modal!();
                      // const { id, ...rest } = result;
                      const updateResponse = await HttpService.patch<{success: boolean, message: string[]}>('userupdate', { id: user.id, update: rest});
                      updateResponse.response?.message.forEach(m => modalContext.toast!(updateResponse.response?.success ? 'success' : 'warning', m));
                      if (updateResponse.response?.success) {
                        quickGet<User[]>('userlist').then(res => setUsers(res || []));
                      }
                    }).catch(err => {});
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    const confirmed = (await modalContext.modal!({ prompt: `Are you sure you want to delete user: ${user.email}?`, options: ['yes', 'no']})!) === 'yes';
                    confirmed && HttpService.delete<{success: boolean, message: string[]}>('userdelete', { id: user.id }).then(res => {
                      res.response?.message.forEach(m => modalContext.toast!(res.response?.success ? 'success' : 'warning', m));
                      quickGet<User[]>('userlist').then(res => setUsers(res || []));
                    });
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* ------------------------------------------------------- PRODUCTS ------------------------------------------------------- */}
      <div className="md:flex md:items-center mt-4">
        <div className="md:w-1/3">
          <label
            className="text-2xl font-bold tracking-tight text-gray-900 ml-3 inline-block"
            htmlFor="inline-product-search"
          >
            Products
          </label>
        </div>
       
        <div className="md:w-2/3 mr-3">

          <input
            className="bg-gray-200 text-right appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-product-search"
            type="text"
            placeholder="Product Search"
            value={''}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {}}
          />
        </div>

      </div>
      <button 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-5 my-5 rounded"
        onClick={() => {
          (new Promise<Product>((res, rej) => {
            modalContext.modal!({node: (
              <ProductForm resolve={res} productImageList={productImages}/>
            ), resolve: res, reject: rej});
          })).then(async result => {
            modalContext.modal!();
            const newProductResponse = await HttpService.post<{success: boolean, message: string[], body?: Product}>('productcreate', result);
            if (newProductResponse.response?.success && newProductResponse.response?.body) {
              setProducts(prev => [ newProductResponse.response!.body!, ...prev]);
            }
            newProductResponse.response?.message.forEach(m => modalContext.toast!(newProductResponse.response?.success ? 'success' : 'warning', m));
            //setProducts(prev => [ result, ...prev]);
          }).catch(err => {});
        }}
      >
        CREATE NEW PRODUCT
      </button>
      
      <Gallery>
        {
          products.map((product, key) => (
            <div
              key={key}
              className='relative'
            >
              <p 
                className="absolute -right-3 -top-3 bg-red-500 p-1 rounded-full w-6 h-6 cursor-pointer border-2 border-black z-10"
                onClick={() => (modalContext.modal!({prompt: `Are you sure you want to delete\n ${product.name}?`, options: ["yes", "no"]}))!.then(res => {
                  if (res === "yes") {
                    HttpService.delete<{
                      success: boolean,
                      message: string[]
                    }>('deleteproduct', { id: product.id }).then(res => {
                      if (res.response?.success) {
                        
                        res.response.message?.forEach(m => modalContext.toast!('success', m));
                      } else {
                        modalContext.toast!('warning', `Unable to delete product ${product.name}`);
                        res.response?.message?.forEach(m => modalContext.toast!('warning', m));
                      }
                    });
                  }
                }).catch(e => {})}
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">X</span>
              </p>
              <p 
                className="absolute right-5 -top-3 bg-green-300 p-1 rounded-full w-6 h-6 cursor-pointer border-2 border-black z-10"
                onClick={() => {
                  (new Promise<Product>((res, rej) => {
                    modalContext.modal!({node: (
                      <ProductForm product={product} resolve={res} productImageList={productImages}/>
                    ), resolve: res, reject: rej});
                  })).then(result => {
                    setProducts(prev => prev.map(prod => (prod.id !== result.id) ? prod : result));
                    console.log('blah blah', products); 
                    modalContext.modal!();
                  }).catch(err => {});
                }}
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-6'> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M16.757 3l-2 2H5v14h14V9.243l2-2V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12.757zm3.728-.9L21.9 3.516l-9.192 9.192-1.412.003-.002-1.417L20.485 2.1z"/> </g> </svg>
                </span>
              </p>
              <ProductCard key={key} product={product}/>
            </div>
          ))
        }
      
      </Gallery>

      <hr />
      
      {/* ------------------------------------------------------- REVIEWS ------------------------------------------------------- */}
      <Gallery title="Reviews"></Gallery>
      <hr />
    </div>
  );
}

export default Admin;
