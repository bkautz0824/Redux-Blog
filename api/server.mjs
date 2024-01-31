import express from 'express';
import cors from 'cors';
import db from './database.mjs'
import path from 'path'
import userRouter from './routes/user.mjs';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json())

app.use(cors())

db.connect()


app.use("/users", userRouter)


app.use(express.static("../build"));
app.get('/*', (req, res) => {
console.log(path)
console.log('path!!!!')
  console.log(__dirname)
  console.log(__filename)
res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
  if (err) {
    res.status(500).send(__dirname)
  }
})
})
// }





const server = app.listen(5000, () => {console.log('server is running on port 5000')})