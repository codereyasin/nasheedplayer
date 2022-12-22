const mongooes  = require('mongoose')
require('dotenv').config()


mongooes.connect(process.env.DB_STRING , {useNewUrlParser: true})
.then(() => console.log('connection is succesfull db'))
.catch((e) => console.log("No Conection"))


