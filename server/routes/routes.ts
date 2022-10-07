import { ParsedRequest } from "../services/requestParser/requestParser.service";
import { RouterResponse } from "../services/router/router.service";

export interface Route {
  method: string[],
  contentType: string,
  privelege: string[],
  schema: any,
  route: (request: ParsedRequest) => RouterResponse
}

const routes: { [key: string]: Route } = {
}

export default routes;