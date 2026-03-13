import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 3000;

await connectDB();
app.listen(PORT, () => {
  console.log(`Server is active on port ${PORT}`);
});
