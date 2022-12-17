import React from "react";
import config from "../../config/config";

import { Product } from "../../models/models";

export type ProductCardProps = {
  queryID?: string | undefined;
  product?: Product
} & (
  | { queryID: string }
  | { product: Product }
);

const api = '';

// "https://placeimg.com/400/225/arch"
const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {

  const [product, setProduct] = React.useState<Product>(
    { 
      id: props.product?.id || 0, 
      name: props.product?.name || 'Coffee Maker', 
      maker: props.product?.maker || 'DuPont', 
      price: props.product?.price || 123, 
      deal: props.product?.deal || 0,
      description: props.product?.description || 'This thing makes coffee!', 
      image: props.product?.image || "https://placeimg.com/400/220/arch?t=" + Math.floor(Math.random()*100000).toString(),
      tags: props.product?.tags || 'coffee, appliance, beverages', 
      stars: props.product?.stars || 3, 
      reviews: props.product?.reviews || 0 
    }
  );
    
  //   { 
  //   src: props.card?.src || "https://placeimg.com/250/180/arch", 
  //   alt: props.card?.alt || "img source missing", 
  //   description: props.card?.description || "Buy these shoes now! or else ...",
  //   name: props.card?.name || "Product Name",
  // });
  
  React.useEffect(() => {
    // if (props.queryID) {
    //   // run db query for card by id
    //   const fetchData = async () => {
    //     const response = await fetch('');
    //     setProduct((await response.json()));
    //   }
    //   fetchData().catch(e => console.log(e));
    // }
    if (props.product) {
      setProduct(props.product);
    }
  }, [props.product]);

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure><img src={config.ASSETS[config.ENVIRONMENT] + `products/${product.image}`} alt={"img source missing"} /></figure>
      <div className="card-body">
        <h2 className="card-title">{`${product.maker} ${product.name}`}</h2>
        <p>{product.description}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Add To Cart</button>
        </div> */}
      </div>
    </div>
  )
}

export default ProductCard;