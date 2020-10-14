import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
import bodyParser from "body-parser";
const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(todoRoutes);

const uri: string = `mongodb://localhost:27017`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose
	.connect(uri, options)
	.then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
	.catch((error) => {
		throw error;
	});
