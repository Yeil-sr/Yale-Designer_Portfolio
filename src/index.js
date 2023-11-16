require('dotenv').config();

const express = require('express');
const app = express();
const porta = process.env.PORT || 3000; 
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const public = path.join(__dirname, "public");

app.use(express.static(public));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "public/sites/index.html"));
});

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
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // Não use SSL
        requireTLS: true, // Use STARTTLS
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
            
    // Verificar se as variáveis de ambiente estão configuradas corretamente
    console.log('SMTP Host:', process.env.SMTP_HOST);
    console.log('SMTP Port:', process.env.SMTP_PORT);
    console.log('SMTP User:', process.env.SMTP_USER);
    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao verificar a conexão com o servidor de e-mail: ' + error.message);
        } else {
            console.log('Conexão com o servidor de e-mail bem-sucedida');
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Erro ao enviar o e-mail: ' + error.message);
                } else {
                    console.log('E-mail enviado: ' + info.response);
                    res.send('E-mail enviado com sucesso!');
                }
            });
        }
    });
});

app.listen(porta, () => {
    console.log(`Servidor Express rodando na porta ${porta}`);
});
