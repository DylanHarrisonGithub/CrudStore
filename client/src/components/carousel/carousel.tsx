import React from "react";

import ProductCard from "../product-card/product-card";

export type CarouselProps = {
  categoryName: string,
  children: React.ReactNode[]
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  return (
    <div className="m-2">
      <h2 className="inline-block">{props.categoryName}</h2>
      <h2 className="inline-block float-right mr-1"><a href={props.categoryName} className="link link-primary">Browse All</a></h2>
      <div className="carousel carousel-center rounded-box">
        {
          props.children.map(node => (
            <div className="carousel-item m-2">
              { node }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Carousel;