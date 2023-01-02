import { RouterResponse } from '../../services/router/router.service';

import file from '../../services/file/file.service';

export default async (request: any): Promise<RouterResponse<string[]>> => {

  const pList = await file.readDirectory('/public/products');

  return new Promise(res => res({
    code: 200,
    json: {
      success: true, 
      messages: [
        "SERVER - ROUTES - PRODUCTIMAGELIST - Successfully loaded product image list!",
      ],
      body: pList
    }
  }))
}