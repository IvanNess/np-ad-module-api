const mongoose = require('mongoose')

const limitRecords = 5

const adSchema = new mongoose.Schema({
    name: String,
    clickCount: Number,
    lastDates: [String]
})

adSchema.methods.addRecord = function(date){
    this.clickCount = this.clickCount + 1
    this.lastDates = [...this.lastDates, date]
    if(this.lastDates.length > limitRecords){
        this.lastDates = this.lastDates.slice(this.lastDates.length - limitRecords)
    }
    this.save()
    return this
}

module.exports = mongoose.models.AdSchema || mongoose.model('AdSchema', adSchema)

// module.exports = AdSchema

// module.exports = mongoose.models.Users || mongoose.model('Users', UsersSchema)
