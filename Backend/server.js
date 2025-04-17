require('dotenv').config();
const app = require('./src/app')

const PORT = process.env.PORT;



app.listen(PORT,()=>{
    console.log(`app listening at http://localhost:${PORT}`)
})