import { RouterResponse } from '../../services/router/router.service';
import { ParsedRequest } from '../../services/requestParser/requestParser.service';

import { User } from '../../models/models';

import db from '../../services/db/db.service';

export default async (request: ParsedRequest<{ id: number }>): Promise<RouterResponse<void>> => {

  var queryResult: { success: boolean, messages: string[] } = await db.row.delete('user', { id: request.params.id });

  return new Promise(res => res({
    code: 200,
    json: {
      success: queryResult.success, 
      messages: queryResult.messages
    }
  }))
}