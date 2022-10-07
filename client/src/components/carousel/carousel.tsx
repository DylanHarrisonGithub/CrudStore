import React from "react";

const Carousel: React.FC<any> = (props: any) => {
  return (
    <div className="m-2">
      <h2>Product Category</h2>
      <div className="carousel carousel-center  bg-neutral rounded-box">
        <div className="carousel-item m-2 hover:m-1">
          <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
        </div> 
        <div className="carousel-item m-2">
          <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
        </div> 
        <div className="carousel-item m-2">
          <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
        </div> 
        <div className="carousel-item m-2">
          <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
        </div> 
        <div className="carousel-item m-2">
          <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
        </div> 
        <div className="carousel-item m-2">
          <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
        </div> 
        <div className="carousel-item m-2">
          <img src="https://placeimg.com/250/180/arch" className="rounded-box" />
        </div>
      </div>
    </div>
   
  )
}

export default Carousel;