const mongoose = require("mongoose");


// Connexion à la base de données MongoDB
const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connectée ...."))
    .catch(err => console.log("Erreur de connexion : ", err))

    
}

module.exports = connectDB;