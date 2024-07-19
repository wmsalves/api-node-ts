import * as deleteById from "./deleteById";
import * as updateById from "./updateById";
import * as getById from "./getById";
import * as create from "./create";
import * as getAll from "./getAll";
import * as count from "./count";

export const PersonProvider = {
  ...deleteById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
  ...count,
};
