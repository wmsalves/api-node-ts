import { server } from "./server";

server.listen(process.env.PORT, () =>{
    console.log(`Server is running on port: ${3000}`);
});