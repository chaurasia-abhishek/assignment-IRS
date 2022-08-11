const connetToMongo = require('./components/database');
const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const path=require('path')

connetToMongo();
const app = express();
const port = 4040;
app.use(fileUpload())
app.use(cors())
app.use(express.json())
app.use('/static',express.static('static'))
app.get('/', (req, res) => { res.send('hello') })
app.use('/api/user',require('./components/routes/user'))
app.use('/api/task',require('./components/routes/task'))
app.listen(port, () => {
    console.log(`app is hosting port @${port}`);
})