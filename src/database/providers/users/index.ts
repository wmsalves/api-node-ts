import * as getByEmail from './getByEmail';
import * as create from './create';



export const UsersController = {
  ...getByEmail,
  ...create,
};