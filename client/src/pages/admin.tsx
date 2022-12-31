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
  const [products, setProducts] = React.useState<Product[]>([]);
  const [reviews, setReviews] = React.useState<Review[]>([]);

  const quickGet = async <T = void,>(route: string): Promise<T | void> => HttpService.get<T>(route).then(res => {
    //console.log(res);
    if (res.success && res.body) {
      modalContext.toast!('success', `GET request to ${route} successful.`);
      res.messages?.forEach(m => modalContext.toast!('success', m));
      return res.body;
    } else {
      modalContext.toast!('warning', `GET request to ${route} failed.`);
      res.messages.forEach(m => modalContext.toast!('warning', m));
    }
  });

  // React.useEffect(() => {}, []);

  return (
    <div className="card w-5/6 bg-base-100 shadow-xl mx-auto my-2">
      <h1 className="text-center text-4xl font-bold">Admin</h1>

      {/* ------------------------------------------------------- AVATAR IMAGES ------------------------------------------------------- */}
      <ToggleableContainer title="AVATAR IMAGES" color1='green-500'>
        <AvatarImages avatarImages={avatars} setAvatarImages={setAvatars} quickGet={quickGet}></AvatarImages>
      </ToggleableContainer>

      {/* ------------------------------------------------------- PRODUCT IMAGES ------------------------------------------------------- */}
      <ToggleableContainer title="PRODUCT IMAGES" color1='blue-500'>
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

      <hr />
      
      {/* ------------------------------------------------------- REVIEWS ------------------------------------------------------- */}
      <Gallery title="Reviews"></Gallery>
      <hr />
    </div>
  );
}

export default Admin;
