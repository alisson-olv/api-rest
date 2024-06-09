import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const getAll = async () => {
  const result = await Knex(ETableNames.city).select();

  return result;
};
