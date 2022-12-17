import { RouterResponse } from '../../services/router/router.service';
import { ParsedRequest } from '../../services/requestParser/requestParser.service';

import { User } from '../../models/models';

import db from '../../services/db/db.service';

export default async (request: ParsedRequest): Promise<RouterResponse<
  { id: number, email: string, avatar: string, privilege: string }[] | void
>> => {

  var queryResult: { success: boolean, message: string[], query: string, result?: User[] };

  if (request.params.id) {
    if (request.params.numrows) {
      queryResult = await db.row.stream<User[]>('user', request.params.id, request.params.numrows)
    } else {
      queryResult = await db.row.read<User[]>('user', { id: request.params.id });
    }
  } else {
    queryResult = await db.row.read<User[]>('user');
  }
  

  return new Promise(res => res({
    code: 200,
    json: {
      success: queryResult.success, 
      message: queryResult.message,
      body: queryResult.result?.map(({id, email, avatar, privilege}) => ({ id: id, email: email, avatar: avatar, privilege: privilege }))
    }
  }))
}