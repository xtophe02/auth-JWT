const Authentication = require('./controllers/authentication')
module.exports = function(app) {
    app.get('/', (req,res,next)=>{
        res.send(['hello world', 'teste'])
    }),
    app.post('/signup', Authentication.signup)
}