const express = require('express');
const path = require('path');

const app = express();


var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'app/public')));

require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);

app.listen(PORT, function(){
  console.log(`App is now listening on PORT ${PORT}`)
})