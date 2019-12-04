const express = require('express');
const bodyparser = require('body-parser');
const PORT = 8000;
const app = express();
app.use(bodyparser.json());

app.get('/api/list', function(req, res){
    res.send('hey');
})




app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`);
});