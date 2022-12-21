import { RouterResponse } from '../../services/router/router.service';
import { ParsedRequest } from '../../services/requestParser/requestParser.service';

import { Product } from '../../models/models';

import db from '../../services/db/db.service';

export default async (request: ParsedRequest<{
  afterID?: number,
  numRows?: number,
  search?: string
}>): Promise<RouterResponse<Product[]>> => {


  var queryResult: { success: boolean, message: string[], query: string, result?: Product[] };

  const { afterID, numRows, search } = request.params;

  if (afterID && numRows) {
    queryResult = await db.row.stream<Product[]>('product', afterID, numRows);
  } else {
    queryResult = await db.row.read<Product[]>('product');
  }


  return new Promise(res => res({
    code: 200,
    json: {
      success: queryResult.success, 
      message: queryResult.message,
      body: queryResult.result
    }
  }))
}