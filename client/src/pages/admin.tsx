import React from 'react';
import Gallery from '../components/gallery/gallery';

import config from '../config/config';

import HttpService from '../services/http.service';

import { ModalContext } from '../components/modal/modal';

import { User, Product, Review } from '../models/models';
import UserForm from '../components/user-form/user-form';
import ProductCard from '../components/product-card/product-card';
import ProductForm from '../components/product-form/product-form';
import ToggleableContainer from '../components/toggleable-container/toggleable-container';
import AvatarImages from '../components/admin/avatar-images/avatar-images';
import ProductImages from '../components/admin/product-images/product-images';
import Users from '../components/admin/users/users';
import Products from '../components/admin/products/products';

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
    
    // quickGet<Product[]>('products').then(res => setProducts(res || []));
  }, []);

  return (
    <div className="card w-5/6 bg-base-100 shadow-xl mx-auto my-2">
      <h1 className="text-center text-4xl font-bold">Admin</h1>

      {/* ------------------------------------------------------- AVATAR IMAGES ------------------------------------------------------- */}
      <ToggleableContainer title="AVATAR IMAGES">
        <AvatarImages avatarImages={avatars} setAvatarImages={setAvatars} quickGet={quickGet}></AvatarImages>
      </ToggleableContainer>

      {/* ------------------------------------------------------- PRODUCT IMAGES ------------------------------------------------------- */}
      <ToggleableContainer title="PRODUCT IMAGES" color1='accent'>
        <ProductImages productImages={productImages} setProductImages={setProductImages} quickGet={quickGet}></ProductImages>
      </ToggleableContainer>

      {/* ------------------------------------------------------- USERS ------------------------------------------------------- */}

      <ToggleableContainer title="Users" color1='purple-500'>
        <Users users={users} avatarImages={avatars} setUsers={setUsers} quickGet={quickGet}></Users>
      </ToggleableContainer>

      {/* ------------------------------------------------------- PRODUCTS ------------------------------------------------------- */}

      <ToggleableContainer title="Products" color1='red-500'>
        <Products products={products} productImages={productImages} setProducts={setProducts} quickGet={quickGet}></Products>
      </ToggleableContainer>

      {/* <div className="md:flex md:items-center mt-4">
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
      
      </Gallery> */}

      <hr />
      
      {/* ------------------------------------------------------- REVIEWS ------------------------------------------------------- */}
      <Gallery title="Reviews"></Gallery>
      <hr />
    </div>
  );
}

export default Admin;
