import { RouterResponse } from '../../services/router/router.service';
import { ParsedRequest } from '../../services/requestParser/requestParser.service';

import file from '../../services/file/file.service';

export default async (request: ParsedRequest): Promise<RouterResponse> => {

  if (!(request.params.filename)) {
    return new Promise(res => res({ 
      code: 400, 
      json: {
        success: false, 
        messages: ["SERVER - ROUTES - DELETEAVATAR - Filename not provided."],
      } 
    }));
  }

  try {
    const res = await file.delete(`public/avatars/` + request.params.filename);
    return new Promise(res => res({ code: 200, json: { success: true, messages: [`SERVER - ROUTES - DELETEAVATAR - Avatar image ${request.params.filename} successfully deleted.`]} }));
  } catch (err: any) {
    return new Promise(res => res({ code: 404, json: { success: false, messages: [
      `SERVER - ROUTES - DELETEAVATAR - Avatar image ${request.params.filename} could not be deleted.`,
      err.toString()
    ]} }));
  }
  
};