import React from 'react';
import Gallery from '../../gallery/gallery';

import HttpService from '../../../services/http.service';
import { ModalContext } from '../../modal/modal';

import config from '../../../config/config';

type Props = {
  productImages: string[],
  setProductImages: React.Dispatch<React.SetStateAction<string[]>>,
  quickGet: <T = void>(route: string) => Promise<T | void>
};

const ProductImages: React.FC<Props> = ({productImages, setProductImages, quickGet}) => {

  const modalContext = React.useContext(ModalContext);
  const init = React.useRef(true);

  React.useEffect(() => {
    if (init.current) {
      quickGet<string[]>('productimagelist').then(res => setProductImages(res || []));
      init.current = false;
    }
  }, [productImages]);

  return (
    <span>

      <Gallery title="Product Images">
        {
          productImages.map(a => (
            <span key={a} className="relative">
              <p 
                className="absolute -right-3 -top-3 bg-red-500 p-1 rounded-full w-6 h-6 cursor-pointer border-2 border-black"
                onClick={() => (modalContext.modal!({prompt: `Are you sure you want to delete\n ${a}?`, options: ["yes", "no"]}))!.then(res => {
                  if (res === "yes") {
                    HttpService.delete<void>('deleteproductimage', { filename: a }).then(res => {
                      if (res.success) {
                        setProductImages(productImageList => productImageList.filter(productImageFilename => productImageFilename !== a))
                        res.messages.forEach(m => modalContext.toast!('success', m));
                      } else {
                        modalContext.toast!('warning', `Unable to delete product image ${a}`);
                        res.messages.forEach(m => modalContext.toast!('warning', m));
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
        onChange={e => e.target.files?.[0] && HttpService.upload<string[]>('uploadproductimage', e.target.files[0]).then(res => {
          (res.success && res.body) && (() => {
            setProductImages(res.body);
            res.messages.forEach(m => modalContext.toast!('success', m));
          })();
          !(res.success) && (() => {
            modalContext.toast!('warning', 'Unable to load product image filenames. See console');
            res.messages.forEach(m => modalContext.toast!('warning', m));
            console.log(res);
          })();
        })}
      />

    </span>
  );
}

export default ProductImages;