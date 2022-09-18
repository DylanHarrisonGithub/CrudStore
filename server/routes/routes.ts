
export interface Route {
  method: string[],
  privelege: string[],
  schema: any,
  route: (request: any) => any
}

const routes: { [key: string]: Route } = {
}

export default routes;