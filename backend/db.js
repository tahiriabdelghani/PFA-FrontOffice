const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(process.env.DB, connectionParams)
        .then(() => console.log("MongoDB conected ..."))
        .catch((err) => console.log(err));
}