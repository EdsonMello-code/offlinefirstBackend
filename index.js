const express = require('express')
const fs = require('node:fs')
const moment = require('moment')

const app = express()

app.use(express.json())

app.post('/products', async (req, res) => {
    const current = moment().utc().format('Y_M_D')
    const fileName = current + '.json';

    
    fs.writeFile(fileName,  JSON.stringify(req.body) , err => {
        console.log(err)
    },);

    return res.json({
        message: 'Product created'
    },);
});

app.get('/products', async (req, res) => {
    const now = Date.now();
    
    const current = moment().utc().format('Y_M_D')
    const fileName = current + '.json';

    fs.existsSync(fileName) || fs.writeFileSync(fileName,  '[]' );

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            return res.json({
                message: err
            },);
        }
        return res.json(JSON.parse(data),);
    },);
});



app.listen(3000, () =>console.log('Server is running on port 3000'))