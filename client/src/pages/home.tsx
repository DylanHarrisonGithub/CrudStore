import React from "react";
import { LoremIpsum } from 'lorem-ipsum';

import Carousel from "../components/carousel/carousel";
import ProductCard from "../components/product-card/product-card";
import Hero from "../components/hero/hero";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 12,
    min: 8
  }
});

const Home: React.FC<any> = (props: any) => {
  return (
    <div>
      <Hero />
      <br/>
      <Carousel categoryName="Top Sellers">
        {
          Array.from(Array(10)).map(n => (
            <ProductCard card={{
              src: "https://placeimg.com/400/220/arch?t=" + Math.floor(Math.random()*100000).toString(), 
              alt: "alt",
              name: lorem.generateWords(1),
              description: lorem.generateSentences(2)
            }}/>
          ))
        }
      </Carousel >

      <Carousel categoryName="New Products">
        {
          Array.from(Array(10)).map(n => (
            <ProductCard card={{
              src: "https://placeimg.com/400/220/arch?t=" + Math.floor(Math.random()*100000).toString(), 
              alt: "alt",
              name: lorem.generateWords(1),
              description: lorem.generateSentences(2)
            }}/>
          ))
        }
      </Carousel >

      <Carousel categoryName="Deals">
        {
          Array.from(Array(10)).map(n => (
            <ProductCard card={{
              src: "https://placeimg.com/400/220/arch?t=" + Math.floor(Math.random()*100000).toString(), 
              alt: "alt",
              name: lorem.generateWords(1),
              description: lorem.generateSentences(2)
            }}/>
          ))
        }
      </Carousel >
    </div>
  )
}

export default Home;