import React from 'react';
import Gallery from '../../gallery/gallery';

import HttpService, { HttpServiceReturnType } from '../../../services/http.service';
import { ModalContext } from '../../modal/modal';

import config from '../../../config/config';

import { Product } from '../../../models/models';
import ProductForm from '../../product-form/product-form';
import ProductCard from '../../product-card/product-card';

type Props = {
  products: Product[],
  productImages: string[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  quickGet: <T = void>(route: string) => Promise<T | void>
};

const Products: React.FC<Props> = ({products, productImages, setProducts, quickGet}) => {

  const modalContext = React.useContext(ModalContext);
  const init = React.useRef(true);

  React.useEffect(() => {
    if (init.current) {
      quickGet<Product[]>('products').then(res => setProducts(res || []));
      init.current = false;
    }
  }, [products]);

  return (
    <span>

      <div className="md:flex md:items-center mt-4">
        <div className="md:w-1/3">
          <button 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-3 my-5 rounded"
            onClick={() => {
              (new Promise<Product>((res, rej) => {
                modalContext.modal!({node: (
                  <ProductForm resolve={res} productImageList={productImages}/>
                ), resolve: res, reject: rej});
              })).then(async result => {
                modalContext.modal!();
                const newProductResponse = await HttpService.post<Product>('productcreate', result);
                if (newProductResponse.success && newProductResponse.body) {
                  setProducts(prev => [ newProductResponse.body!, ...prev]);
                }
                newProductResponse.messages.forEach(m => modalContext.toast!(newProductResponse.success ? 'success' : 'warning', m));
              }).catch(err => {});
            }}
          >
            CREATE NEW PRODUCT
          </button>
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
                    HttpService.delete<void>('deleteproduct', { id: product.id }).then(res => {
                      if (res.success) {
                        
                        res.messages.forEach(m => modalContext.toast!('success', m));
                      } else {
                        modalContext.toast!('warning', `Unable to delete product ${product.name}`);
                        res.messages.forEach(m => modalContext.toast!('warning', m));
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

    </span>
  );
}

export default Products;