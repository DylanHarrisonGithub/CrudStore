import React from "react";
import { useParams, useSearchParams } from 'react-router-dom';
import Gallery from "../components/gallery/gallery";

const products = [


  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

const Browse: React.FC<any> = (props: any) => {

  const [searchParams] = useSearchParams();
  const { category } = useParams();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

          <Gallery title={category || searchParams.get('search') || "All"}>

            <span>
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={products[0].imageSrc}
                  alt={products[0].imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={products[0].href}>
                      {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                      {products[0].name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{products[0].color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{products[0].price}</p>
              </div>
            </span>

            <span>
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={products[0].imageSrc}
                  alt={products[0].imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={products[0].href}>
                      {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                      {products[0].name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{products[0].color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{products[0].price}</p>
              </div>
            </span>
            

          </Gallery>
        
      </div>
    </div>
  )
}

export default Browse;