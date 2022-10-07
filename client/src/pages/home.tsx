import React from "react";
import Carousel from "../components/carousel/carousel";

import Hero from "../components/hero/hero";

const Home: React.FC<any> = (props: any) => {
  return (
    <div>
      <Hero />
      <br/>
      <Carousel />
      <Carousel />
      <Carousel />
    </div>
  )
}

export default Home;