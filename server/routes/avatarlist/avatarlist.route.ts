import { RouterResponse } from '../../services/router/router.service';

import file from '../../services/file/file.service';

export default async (request: any): Promise<RouterResponse<string[]>> => {

  const aList = await file.readDirectory('/public/avatars');

  return new Promise(res => res({
    code: 200,
    json: {
      success: true, 
      messages: ["SERVER - ROUTES - AVATARLIST - Successfully loaded avatar list!"],
      body: aList
    }
  }))
}