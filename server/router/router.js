module.exports = (app) => {
    app.get('/get', (req, res) => {
        res.send('TEST get');
    });
    app.post('/post', (req, res) => {
        res.send('TEST post');
    });
    app.put('/put', (req, res) => {
        res.send('TEST put');
    });
    app.delete('/delete', (req, res) => {
        res.send('TEST delete');
    })
};