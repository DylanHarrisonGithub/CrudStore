import { RouterResponse } from '../../services/router/router.service';
import { ParsedRequest } from '../../services/requestParser/requestParser.service';

import file from '../../services/file/file.service';

export default (request: ParsedRequest): Promise<RouterResponse<string[]>> => new Promise(res => {

  request.files[Object.keys(request.files)[0]].mv('public/products/' + Object.keys(request.files)[0], async (err: any) => {
    if (err) {
      res({ code: 200, json: { success: false, messages: ["SERVER - ROUTES - UPLOADPRODUCTIMAGE - Failed to upload file."]} }); 
    } else {
      res({ code: 200, json: { 
        success: true, 
        messages: ["SERVER - ROUTES - UPLOADPRODUCTIMAGE - Product image successfully uploaded!"],
        body: await file.readDirectory('public/products')
      }}); 
    }
  });
  
});