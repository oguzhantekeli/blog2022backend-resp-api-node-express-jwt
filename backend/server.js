const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/data", require("./routes/dataRoutes"));
app.use(errorHandler); //bu error handler routes dan sonra gelmeli

app.listen(port, () => console.log(`SERVER STARTED AT PORT ${port}`));
