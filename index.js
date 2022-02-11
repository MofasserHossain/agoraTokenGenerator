const express = require('express');
const cors = require('cors');
require('dotenv').config();
const generateRtcToken = require('./controller/RTCTokenController');

const app = express();
app.use(cors());
// app.disable('x-powered-by');
// app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/rtcToken', generateRtcToken);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
