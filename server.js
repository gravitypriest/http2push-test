const express = require('express');
const spdy    = require('spdy');
const fs      = require('fs');

const app = express();

const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
};

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.use(express.static('.'));

let testNo = 0;
app.use('/pshuu', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    setInterval(() => {
        res.push('/notifications/' + testNo, {}, (err, stream) => {
            // console.log(stream);
            if (err) {
                console.log(err);
                return;
            }
            stream.end(JSON.stringify({test: testNo}));
            res.write('data:/notifications/'+ testNo + '\n\n');
            testNo += 1;
        });
    }, 1000);
});

spdy.createServer(options, app).listen(8080, () =>{
    console.log('Server running...');
});