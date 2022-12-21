import React, { useState } from 'react';

import config from '../../config/config';

import { Product } from '../../models/models';

interface ProductProps {
  product?: Product,
  productImageList: string[],
  resolve: (product: Product) => any
}

const ProductForm: React.FC<ProductProps> = (props) => {

  const [product, setProduct] = useState<Product>(props.product || 
    { id: 0, name: '', maker: '', price: 0, deal: 0, description: '', image: props.productImageList[0], tags: '', stars: 0, reviews: 0 }
  );

  return (
    <form className="w-full max-w-sm">

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-product-image"
          >
            <img src={config.ASSETS[config.ENVIRONMENT] + `products/${product.image}`} className="w-32 h-32 float-right" />
          </label>
        </div>
        <div className="md:w-2/3">
          <select
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-product-image"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProduct(prev => ({ ...prev, image: e.target.value}))}
            value={product.image}
          >
            {
              props.productImageList.map(a => (<option key={a} value={a}>{a}</option>))
            }
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-maker"
                >
                  Maker
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-maker"
                  type="text"
                  placeholder="Product Maker"
                  value={product.maker}
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => ({ ...prev, maker: event.target.value}))}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-name"
                >
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-name"
                  type="text"
                  placeholder="guest"
                  value={product.name}
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => ({ ...prev, name: event.target.value}))}
                />
              </div>
            </div>


          </div>


          <div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-price"
                >
                  Price
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-price"
                  type="text"
                  placeholder="guest"
                  value={product.price}
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => ({ ...prev, price: parseFloat(event.target.value)}))}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-deal"
                >
                  Deal
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-deal"
                  type="text"
                  placeholder="guest"
                  value={product.deal}
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => ({ ...prev, deal: parseFloat(event.target.value)}))}
                />
              </div>
            </div>


          </div>
      </div>  

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-tags"
          >
            Tags
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-tags"
            type="text"
            placeholder="Product Maker"
            value={product.tags}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => ({ ...prev, tags: event.target.value}))}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-description"
          >
            Description
          </label>
        </div>
        <div className="md:w-2/3">
          <textarea
            rows={2}
            className="resize-none bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-description"
            placeholder="Product Maker"
            value={product.description}
            onInput={(event: React.ChangeEvent<HTMLTextAreaElement>) => setProduct(prev => ({ ...prev, description: event.target.value}))}
          />
          
        </div>
      </div>   

      <div className="container flex flex-col items-center">
        <div className="md:w-1/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-5 mx-auto rounded"
            type="button"
            onClick={() => props.resolve(product)}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
