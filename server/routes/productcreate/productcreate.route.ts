import { RouterResponse } from '../../services/router/router.service';
import { ParsedRequest } from '../../services/requestParser/requestParser.service';

import { Product } from '../../models/models';

import db from '../../services/db/db.service';

export default async (request: ParsedRequest<Product>): Promise<RouterResponse<Product | undefined>> => {

  const { id, ...rest } = request.params;
  const prod = { ...rest }; // why does this work?

  var queryResult = await db.row.create<Product>('product', prod);

  return new Promise(res => res({
    code: 200,
    json: {
      success: queryResult.success, 
      messages: [
        queryResult.success ? 
          `SERVER - ROUTES - PRODUCTCREATE - Successfully created product ${queryResult.body?.id}.` 
        : 
          `SERVER - ROUTES - PRODUCTCREATE - Failed to create product ${request.params.name}.`,
        ...queryResult.messages
      ],
      body: queryResult.body
    }
  }))
}