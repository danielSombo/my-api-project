const express = require("express")
const dotenv = require("dotenv")
const Users = require("./models/UserSchema")
const connectDB = require("./config/connect_db")
dotenv.config()
connectDB();



const app = express()
const PORT = process.env.PORT || 8000

/**MIDDLEWARE */
app.use(express.json());

/**METHODE GET */
app.get("/api/user/find_all_users/", async(req, res) => {
    try {
        const result = await Users.find();
        res.status(200).json(result)
        console.log(result)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})
/**METHODE GET ID */
app.get("/api/user/find_user/:id", async(req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        if (!user) {
            res.status(404).json({ message: "Cet utilisateur n'existe pas."})
        }
        res.status(201).json(user);
        console.log(user)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})
/**METHODE POST */

app.post("/api/user/create_user/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            res.status(400).json({message: "L'un des champs est vide."})
        }
        const user = await Users.create({ name, email, password})
        res.status(201).json(user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})
/**METHODE PUT */
app.put("/api/user/update_user/:id", async(req, res) => {
    try {
        const update_user = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(update_user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}) 
/**METHODE DELETE */
app.delete("/api/user/delete_user/:id", async(req, res) => {
    try {
        const delete_user = await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Utilisateur supprimé"})
        console.log(`L'utilisateur supprimé :`, delete_user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}) 








/**SERVEUR */
app.listen(PORT, () => {
    console.info(`Serveur en marche sur le port ${PORT}`);
})