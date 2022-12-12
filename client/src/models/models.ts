export type User = {
  id: number,
  email: string, 
  privilege: string,
  avatar: string,
}

export type Product = {
  id: number,
  name: string,
  maker: string,
  price: number,
  deal: number,
  description: string,
  image: string,
  tags: string,
  stars: number,
  reviews: number
}

export type Review = {
  id: number,
  userID: number,
  productID: number,
  stars: number,
  text: string
}