const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const history = require("connect-history-api-fallback");
app = express();
// app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

if (port === 3000) {
  const dotenv = require("dotenv").config();
}

app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); 

app.use(bodyParser.json());

app.use(history());


const mainRoutes = require("./routes/initialRoutes"),
  profileRoutes = require("./routes/profileRoutes"),
  authorizationRoutes = require("./routes/authorizationRoutes"),
  authorizationAdminRoutes = require("./routes/authorizationAdminRoutes"),
  paymentRoutes = require("./routes/paymentRoutes"),
  taskRoutes = require("./routes/taskRoutes"),
  adminRoutes = require("./routes/adminRoutes"),
  faqRoutes = require("./routes/faqRoutes"),
  noticesRoutes = require("./routes/noticesRoutes"),
  ratingsRoutes = require("./routes/ratingsRoutes"),
  scheduleRoutes = require("./routes/scheduleRoutes"),
  contactRoutes = require("./routes/contactRoutes");

app.use(mainRoutes);
app.use(profileRoutes);
app.use(authorizationRoutes);
app.use(authorizationAdminRoutes);
app.use(paymentRoutes);
app.use(taskRoutes);
app.use(adminRoutes);
app.use(faqRoutes);
app.use(noticesRoutes);
app.use(ratingsRoutes);
app.use(scheduleRoutes);
app.use(contactRoutes);


// history({
//   rewrites: [
//     { from: /\/pricing/, to: '/pricing.html'}
//   ]
// });
// app.use(history());
// app.use('/', express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
