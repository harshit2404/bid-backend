const fs = require('fs')
const files = fs.readdirSync(__dirname)

module.exports = (app)=>{
    
files.forEach(file=>{
    if(file=='index.js') return;
    app.use(require(`./${file}`))
})


}