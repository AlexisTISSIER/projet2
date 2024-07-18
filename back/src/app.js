require('dotenv').config();
const express = require('express');


const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();


app.use(express.json());

router.get('/', (req, res) => {
    console.log('blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    res.send('Hello, World!');
}); 


app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});