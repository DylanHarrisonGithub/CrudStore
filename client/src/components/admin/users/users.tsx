import React from 'react';
import Gallery from '../../gallery/gallery';

import HttpService, { HttpServiceReturnType } from '../../../services/http.service';
import { ModalContext } from '../../modal/modal';

import config from '../../../config/config';

import { User } from '../../../models/models';
import UserForm from '../../user-form/user-form';

type Props = {
  users: User[],
  avatarImages: string[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  quickGet: <T = void>(route: string) => Promise<T | void>
};

const Users: React.FC<Props> = ({users, avatarImages, setUsers, quickGet}) => {

  const modalContext = React.useContext(ModalContext);
  const init = React.useRef(true);

  React.useEffect(() => {
    if (init.current) {
      quickGet<User[]>('userlist').then(res => setUsers(res || []));
      init.current = false;
    }
  }, [users]);

  return (
    <span>

      <table className="table-auto m-5">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Privilege</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                <img src={config.ASSETS[config.ENVIRONMENT] + `avatars/${user.avatar}`} className="w-8 h-8 rounded-full" />
              </td>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.privilege}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    (new Promise<User>((res, rej) => {
                      modalContext.modal!({node: (
                        <UserForm user={user} resolve={res} avatarList={avatarImages}/>
                      ), resolve: res, reject: rej});
                    })).then(async ({ id, ...rest }) => {
                      modalContext.modal!();
                      // const { id, ...rest } = result;
                      const updateResponse = await HttpService.patch<{success: boolean, message: string[]}>('userupdate', { id: user.id, update: rest});
                      updateResponse.response?.message.forEach(m => modalContext.toast!(updateResponse.response?.success ? 'success' : 'warning', m));
                      if (updateResponse.response?.success) {
                        quickGet<User[]>('userlist').then(res => setUsers(res || []));
                      }
                    }).catch(err => {});
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    const confirmed = (await modalContext.modal!({ prompt: `Are you sure you want to delete user: ${user.email}?`, options: ['yes', 'no']})!) === 'yes';
                    confirmed && HttpService.delete<{success: boolean, message: string[]}>('userdelete', { id: user.id }).then(res => {
                      res.response?.message.forEach(m => modalContext.toast!(res.response?.success ? 'success' : 'warning', m));
                      quickGet<User[]>('userlist').then(res => setUsers(res || []));
                    });
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </span>
  );
}

export default Users;