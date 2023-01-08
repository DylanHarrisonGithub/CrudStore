import { RouterResponse } from '../../services/router/router.service';

import file from '../../services/file/file.service';

export default async (request: any): Promise<RouterResponse<string[]>> => {

  const aList = await file.readDirectory('/public/avatars');

  return new Promise(res => res({
    code: 200,
    json: {
      success: aList.success, 
      messages: [
        aList.success ?
          "SERVER - ROUTES - AVATARLIST - Successfully loaded avatar list!"
        :
          `Server - Routes - AVATARLIST - Failed to load avatar list.`,
        ...aList.messages
      ],
      body: aList.body
    }
  }))
}