require('dotenv').config()
const AuditStrategiqueRoutes = require("./routes/AuditStrategiqueRoutes.js");
const AuthRoutes = require("./routes/auth/index.js");


const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const digitalRouter = require('./routes/digitalRoute');
const culturalRouter = require('./routes/culturalRoute')



const dbConnection = require("./db");

dbConnection();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())


app.use('/api/digital-audit', digitalRouter)
app.use('/api/cultural-audit', culturalRouter)
app.use("/api/audit-strategique", AuditStrategiqueRoutes);
app.use("/", AuthRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server listnening on Port', PORT)
})