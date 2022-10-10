import React from "react";

type CardType = {
  src: string, alt: string, name: string, description: string
}

export type ProductCardProps = {
  queryID?: string | undefined;
  card?: CardType
} & (
  | { queryID: string; }
  | { card: CardType }
);

const api = '';

// "https://placeimg.com/400/225/arch"
const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {

  const [card, setCard] = React.useState<CardType>({ 
    src: props.card?.src || "https://placeimg.com/250/180/arch", 
    alt: props.card?.alt || "img source missing", 
    description: props.card?.description || "Buy these shoes now! or else ...",
    name: props.card?.name || "Product Name"
  });
  
  React.useEffect(() => {
    if (props.queryID) {
      // run db query for card by id
      const fetchData = async () => {
        const response = await fetch('');
        setCard((await response.json()));
      }
      fetchData().catch(e => console.log(e));
    }
  }, []);

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src={card.src} alt={card.alt} /></figure>
      <div className="card-body">
        <h2 className="card-title">{card.name}</h2>
        <p>{card.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;