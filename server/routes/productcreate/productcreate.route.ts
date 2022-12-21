import { RouterResponse } from '../../services/router/router.service';
import { ParsedRequest } from '../../services/requestParser/requestParser.service';

import { Product } from '../../models/models';

import db from '../../services/db/db.service';

export default async (request: ParsedRequest<Product>): Promise<RouterResponse<Product | undefined>> => {

  const { id, ...rest } = request.params;
  const prod = { ...rest }; // why does this work?

  var queryResult: { success: boolean, message: string[], query: string, result?: Product } = await db.row.create<Product>('product', prod);

  return new Promise(res => res({
    code: 200,
    json: {
      success: queryResult.success, 
      message: queryResult.message,
      body: queryResult.result
    }
  }))
}