const express = require('express');
const fs      = require('fs');

const app = express();

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.use(express.static('.'));

let testNo = 0;
app.use('/pshuu', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    setInterval(() => {
        res.write('data:' + testNo + '\n\n', () => {
            testNo += 1;
        });
    }, 1000);
});

app.listen(8080, () =>{
    console.log('Server running...');
});