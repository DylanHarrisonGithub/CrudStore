import { RouterResponse } from '../../services/router/router.service';
import { ParsedRequest } from '../../services/requestParser/requestParser.service';

import file from '../../services/file/file.service';

export default (request: ParsedRequest): Promise<RouterResponse> => new Promise(res => {

  request.files[Object.keys(request.files)[0]].mv('public/avatars/' + Object.keys(request.files)[0], async (err: any) => {
    if (err) {
      res({ code: 200, json: { success: false, messages: ["SERVER - ROUTES - UPLOADAVATAR - Failed to upload file."].concat(err.toString())} }); 
    } else {

      file.readDirectory(`public/avatars`).then(sr => {
        res({
          code: 200,
          json: {
            success: sr.success,
            messages: [
              sr.success ?
                "SERVER - ROUTES - AVATARLIST - Successfully loaded avatar list!"
              :
                `Server - Routes - AVATARLIST - Failed to load avatar list.`,
              ...sr.messages,
              "SERVER - ROUTES - UPLOADAVATAR - Avatar successfully uploaded!"
            ],
            body: sr.body
          }
        })
      });

    }
  });
  
});