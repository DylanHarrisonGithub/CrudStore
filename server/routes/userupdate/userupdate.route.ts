import { RouterResponse } from '../../services/router/router.service';
import { ParsedRequest } from '../../services/requestParser/requestParser.service';

import { User } from '../../models/models';

import db from '../../services/db/db.service';

export default async (request: ParsedRequest<
  { id: number, update: { email?: string, avatar?: string, privilege?: string } }
>): Promise<RouterResponse<void>> => {

  var queryResult: { success: boolean, message: string[], query: string } = await db.row.update('user', request.params.update, { id: request.params.id });

  return new Promise(res => res({
    code: 200,
    json: {
      success: queryResult.success, 
      message: queryResult.message
    }
  }))
}