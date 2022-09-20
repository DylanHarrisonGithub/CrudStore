
import { RouterResponse } from "server/services/router/router.service";

export interface Route {
  method: string[],
  privelege: string[],
  schema: any,
  route: (request: any) => RouterResponse
}

const routes: { [key: string]: Route } = {
}

export default routes;