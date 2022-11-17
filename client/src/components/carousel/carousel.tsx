import React from "react";
import { Link } from 'react-router-dom';

export type CarouselProps = {
  categoryName: string,
  children: React.ReactNode[]
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {

  const ref = React.useRef<HTMLDivElement>(null);

  // const [scroll, setScroll] = React.useState<number>(0);

  return (
    <div className="relative m-2">
      <h2 className="inline-block">{props.categoryName}</h2>
      <h2 className="inline-block float-right mr-1"><Link to={"/browse/"+props.categoryName.replaceAll(' ', '')} className="link link-primary">Browse All</Link></h2>
      
      <div className="carousel carousel-center rounded-box" ref={ref}>
        {
          props.children.map((node, i) => (
            <div className="carousel-item m-2" key={i} id={props.categoryName.replaceAll(' ', '')+i}>
              { node }
            </div>
          ))
        }
      </div>

      <a 
        className="absolute z-10 btn btn-circle text-4xl left-5 top-1/2 p-8" 
        // href={'#'+props.categoryName.replaceAll(' ', '')+((scroll + props.children.length-1) % props.children.length)}
        // onClick={() => setScroll(s => (s + props.children.length-1) % props.children.length)}
        onClick={()=>{ ref.current!.scrollLeft -= .6*ref.current!.clientWidth; }}
      >
        <span className="absolute -translate-y-1/2 top-1/2 -translate-x-1/6">❮</span>
      </a>

      <a 
        className="absolute z-10 btn btn-circle text-4xl right-5 top-1/2 p-8"
        // href={'#'+props.categoryName.replaceAll(' ', '')+((scroll + 1) % props.children.length)}
        // onClick={() => setScroll(s => (s + 1) % props.children.length)}
        onClick={()=>{ ref.current!.scrollLeft += .6*ref.current!.clientWidth; }}
      >
        <span className="absolute -translate-y-1/2 top-1/2 -translate-x-1/6">❯</span>
      </a>
    </div>
  )
}

export default Carousel;