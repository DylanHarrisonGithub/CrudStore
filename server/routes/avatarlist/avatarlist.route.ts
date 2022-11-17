import { RouterResponse } from '../../services/router/router.service';

import file from '../../services/file/file.service';

export default async (request: any): Promise<RouterResponse> => {

  const aList = await file.readDirectory('/public/avatars');

  return new Promise(res => res({
    code: 200,
    json: {
      success: true, 
      message: ["avatarlist route works!"],
      body: aList
    }
  }))
}