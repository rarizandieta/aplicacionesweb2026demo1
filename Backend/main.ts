import { app } from "./app";
import { initDatabase } from "./src/infrastructure/database/initDatabase";
import cors from "cors";

const PORT = 3000;

async function start() {
    await initDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start();
