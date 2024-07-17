import { Knex } from './database/knex';
import { server } from './server';


const startServer = () => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`App rodando na porta ${process.env.PORT || 3000}`);
  });
};


if (process.env.IS_LOCALHOST !== 'true') {
  console.log('Running migrations');

  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed.run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}