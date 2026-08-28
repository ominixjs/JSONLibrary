import "dotenv/config";
import app from "./index.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server iniciado na porta " + PORT);
});
