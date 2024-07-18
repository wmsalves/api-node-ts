import * as updateById from "./updateById";
import * as deleteById from "./deleteById";
import * as getById from "./getById";
import * as create from "./create";
import * as getAll from "./getAll";

export const PersonController = {
  ...updateById,
  ...deleteById,
  ...getById,
  ...getAll,
  ...create,
};
