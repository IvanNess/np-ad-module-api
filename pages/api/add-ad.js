// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from '../../init-middleware'

const mongoose = require('mongoose')
const AdSchema = require('../../mongo/ad-schema-model')

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: process.env.ORIGIN,
    credentials: true
    // origin: false
  })
)

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const dbConnection = mongoose.connection
dbConnection.on('error', console.error.bind(console, 'connection error:'))
dbConnection.once('open', async function () {
    console.log('db connected!!!')
})

export default async(req, res) => {
    // Run cors
    await cors(req, res)

    const data = req.body

    try {
        const ad = await AdSchema.find({ name: req.body.name }).exec()

        if(ad.length === 0){
            const ad = new AdSchema({
                clickCount: 1,
                name: req.body.name,
                lastDate: [new Date()],
            })
            try {
                await ad.save()
                res.status(200).json('first click was added')
            } catch (error) {
                res.status(500).json('ad record saving error in db.')        
            }
        } else{
            const found = ad[0]
            await found.addRecord(new Date())
            res.status(200).json('one more click was added')
        }

    } catch (error) {
        res.status(500).json('ad record finding error in db.')        
    }    
}
