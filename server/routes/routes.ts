
export interface Route {
  method: string[],
  privelege: string[],
  schema: any,
  route: (request: any) => any
}

export default {
}