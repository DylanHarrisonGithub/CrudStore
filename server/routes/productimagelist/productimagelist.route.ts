import { RouterResponse } from '../../services/router/router.service';

import file from '../../services/file/file.service';

export default async (request: any): Promise<RouterResponse<{
  success: boolean,
  messages: string[],
  body?: string[]
}>> => {

  const pList = await file.readDirectory('/public/products');

  return new Promise(res => res({
    code: 200,
    json: {
      success: pList.success, 
      messages: [
        pList.success ?
          "SERVER - ROUTES - PRODUCTIMAGELIST - Successfully loaded product image list!"
        :
          `Server - Routes - PRODUCTIMAGELIST - Failed to load product image list.`,
        ...pList.messages
      ],
      body: pList.body
    }
  }));
}