const path = require("path")
const express = require("express")
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
})

app.listen(5000, () => {
	console.log("Static file server runnig on port 5000")
})