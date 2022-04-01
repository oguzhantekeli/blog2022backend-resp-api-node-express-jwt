const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors"); //cors policy error handling
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDb } = require("./config/db");
connectDb(); //database connection config dosyası
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//extended değeri nested data gönderimini kontrol eder
//ör [{text:"abc",list:{
//     listitem1:item1,
//     listitem2:item2
//      }
//     }]

const whitelist = [
  "http://localhost:3000",
  "https://blog2022app.herokuapp.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
//bu error handler routes dan sonra gelmeli
// default olarak express error handler html olarak döner. onu değiştirip kendi error handler
// fonksiyonumuzu kullandık
app.listen(port, () => console.log(`SERVER STARTED AT PORT ${port}`));
