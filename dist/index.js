"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./database/knex");
const server_1 = require("./server");
const startServer = () => {
    server_1.server.listen(process.env.PORT || 3000, () => {
        console.log(`App rodando na porta ${process.env.PORT || 3000}`);
    });
};
if (process.env.IS_LOCALHOST !== 'true') {
    console.log('Running migrations');
    knex_1.Knex.migrate
        .latest()
        .then(() => {
        knex_1.Knex.seed.run()
            .then(() => startServer())
            .catch(console.log);
    })
        .catch(console.log);
}
else {
    startServer();
}
//# sourceMappingURL=index.js.map