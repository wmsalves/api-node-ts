import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.cities, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).index().notNullable();

      table.comment("Tabela usada para armazenar cidades no sistema");
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.cities}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.cities).then(() => {
    console.log(`# Dropped table ${ETableNames.cities}`);
  });
}
