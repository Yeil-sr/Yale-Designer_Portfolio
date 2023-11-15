require('dotenv').config();

const express = require('express');
const app = express();
const porta = process.env.PORT || 443 ; 
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const public = path.join(__dirname, "public");

app.use(express.static(public));
app.use(bodyParser.urlencoded({ extended: true })); 


app.post('/envio', (req, res) => {
    const { nome, emailCliente, fone, celular, assunto, preferencia, mensagem } = req.body;

    const mailOptions = {
        from: emailCliente, 
        to: process.env.SMTP_USER, 
        subject: 'Formulário de Contato - ' + assunto,
        text: `
            Nome: ${nome}
            E-mail: ${emailCliente} 
            Telefone: ${fone}
            Celular: ${celular}
            Assunto: ${assunto}
            Preferência de Contato: ${preferencia}
            
            Mensagem:
            ${mensagem}
        `
    };

    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar o e-mail');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.send('E-mail enviado com sucesso!');
        }
    });
});

app.listen(porta, () => {
    console.log(`Servidor Express rodando na porta ${porta}`);
});
