const express = require('express')
const port = process.env.PORT || 4000
const app = express()
const cors = require('cors')
app.use(cors({origin: true}))
app.use(express.json())
require('./db/conn')

app.get('/', (req, res) =>{
    return res.json("HAI there...")
})

const userRoute = require('./routes/auth')
app.use('/api/users/', userRoute)

const artistsRoute = require('./routes/artist')
app.use('/api/artist/', artistsRoute)

const albumRoute = require('./routes/albums')
app.use('/api/albums/', albumRoute)

const nasheedRoute = require('./routes/nasheed')
app.use('/api/nasheed/', nasheedRoute)


app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
})