import app from "./app.js";
import { InitModel } from "./config/database/associations.js";
import { authenticated, syncOn } from "./config/database/database.js";
import envs from "./config/enviroments/enviorements.js";

async function main() {
  try {
    await authenticated();
    InitModel()
    await syncOn();
  } catch (error) {
    console.log(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`connection port: ${envs.PORT}`);
});
