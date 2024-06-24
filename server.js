const express = require('express');
const path = require('path');
const applicantRoute = require('./api/v1/applicantsRouter');
const cmntsRoute = require('./api/v1/commentsRouter');
const msgRoute = require('./api/v1/messagesRouter');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.get("/admin", (req, res) => {
    res.redirect("/admin/login.html")
})
app.use("/applicants", applicantRoute)
app.use("/comments", cmntsRoute)
app.use("/msg", msgRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is runnning on http://localhost:${PORT}`);
})