const express = require('express');
const router = express.Router();
let cors = require('cors');
const nodemailer = require('nodemailer');
/* const bodyparser = require('body-parser'); */
require('dotenv').config()

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
/* app.use(bodyparser.urlencoded({ extended: false })); */
app.use("/", router);

app.listen(port, () => {
    console.log('escuchando');
})

const config = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_KEY
    },
});

config.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.nombre;
    const correo = req.body.email;
    const message = req.body.mensaje;
    const mail = {
        from: name,
        to: 'yairreynaldo8@gmail.com',
        subject: 'Envio Portafolio',
        html: `<p>Name: ${name}</p>
        <p>Email: ${correo}</p>
        <p>Mensaje: ${message}</p>`,
    };

    config.sendMail(mail, (error) => {
        if (error) {
            res.json(error);
        } else {
            res.json({ code: 200, status: "message sent" });
        }
    })
})