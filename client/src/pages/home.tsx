import React from "react";
import { LoremIpsum } from 'lorem-ipsum';

import Carousel from "../components/carousel/carousel";
import ProductCard from "../components/product-card/product-card";
import Hero from "../components/hero/hero";
import QuickForm from "../components/quick-form/quick-form";
import { COMMON_REGEXES } from "../services/validation.service";

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
          Array.from(Array(10)).map((n, i) => (
            <ProductCard key={i.toString()} queryID={''}/>
          ))
        }
      </Carousel >

      <Carousel categoryName="New Products">
        {
          Array.from(Array(10)).map((n, i) => (
            <ProductCard key={(i+100).toString()} queryID={''}/>
          ))
        }
      </Carousel >

      <Carousel categoryName="Deals">
        {
          Array.from(Array(10)).map((n, i) => (
            <ProductCard key={(i+1000).toString()} queryID={''}/>
          ))
        }
      </Carousel >
      <br/>
      <QuickForm<any> 
        schema={{ 
          poopsmith: { type: 'string', attributes: { required: true, strLength: { minLength: 4 } }},
          fartz: { type: COMMON_REGEXES.EMAIL, attributes: { strLength: {maxLength: 10 }} }
          // f3: { type: 'number', attributes: { array: { minLength: 4 }, default: 'test' }},
          // test: {
          //   type: {
          //     t1: { type: 'string', attributes: { strLength: { maxLength: 5 }, range: { max: 'g'}} },
          //     t2: { type: 'string' },
          //     t3: { 
          //       type: {
          //         u1: { type: 'string' },
          //         u2: { type: 'string' }
          //       },
          //       attributes: { array: { minLength: 2 }}
          //     }
          //   }
          // }
        }} 
        onInput={((e, m) => console.log(e, m))}
      />
    </div>
  )
}

export default Home;