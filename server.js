const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
const morgan = require('morgan')
const params = require('params')

const User = require('./models/user');
const Citas = require('./models/cita');
const Pacientes = require('./models/paciente')
const UserMeeting = require('./models/usermeeting')

const JWT_SECRET = 'ssafarq34aksbdfoib2o3ufoqwbqwrfo*)&(ˆ*&&ˆ**&ˆ*kjnskhfkjsfaisdf'

mongoose.connect('mongodb+srv://dvaldez:admin@dbtest.m9l4j.mongodb.net/dbtest?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})

const app = express();
app.use(morgan(':method :url :status :response-time ms'))
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json())
app.use(cors())

app.listen(3000, () => {
    console.log('Server up at port 3000')
})




// PETICIONES POST
app.post('/api/register', async (req, res) => {
    const { username, password: plainTextPassword, nombre, apellido, cedula, rol, estado } = req.body;

    let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'consultasomnihealth@gmail.com',
                pass: 'uLTRAml*z'
            }
        });

        let mailOptions = {
            from: 'consultasomnihealth@gmail.com',
            to: username,
            subject: 'Acceso API - OmniHealt',
            html: `
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title>
    </title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }
        
        .ReadMsgBody {
            width: 100%;
        }
        
        .ExternalClass {
            width: 100%;
        }
        
        .ExternalClass * {
            line-height: 100%;
        }
        
        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        
        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
    <!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Open Sans" rel="stylesheet" type="text/css">
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Open Sans);
    </style>
    <!--<![endif]-->
    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
            }
        }
    </style>
    <style type="text/css">
        [owa] .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
        }
    </style>
    <style type="text/css">
        @media only screen and (max-width:480px) {
            table.full-width-mobile {
                width: 100% !important;
            }
            td.full-width-mobile {
                width: auto !important;
            }
        }
    </style>
</head>

<body style="background-color:#f8f8f8;">
    <div style="background-color:#f8f8f8;">
        <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-bottom:0px;padding-top:0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:0px 0px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                            <div style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:left;color:#797e82;">
                                                <p style="text-align: center; margin: 10px 0;">Problemas para cargar|
                                                    <a target="_blank" rel="noopener noreferrer" href="#"></a><span style="color:#797e82; text-decoration: underline"> Ver versión en línea </span></p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td style="font-size:0px;padding:10px 25px;padding-top:0px;padding-right:0px;padding-bottom:40px;padding-left:0px;word-break:break-word;">
                                            <p style="border-top:solid 7px #407BFF;font-size:1;margin:0px auto;width:100%;">
                                            </p>
                                            <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 7px #407BFF;font-size:1;margin:0px auto;width:600px;" role="presentation" width="600px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="width:110px;">
                                                            <img alt="" height="auto" src="https://portal.omnihealth.com.do/img/Grupo%20128@2x.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;" title="" width="110" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:40px;padding-right:50px;padding-bottom:0px;padding-left:50px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="width:300px;">
                                                            <img alt="" height="auto" src="https://www.mailjet.com/wp-content/uploads/2019/07/Welcome-02.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;" title="" width="300" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-bottom:70px;padding-top:30px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-right:50px;padding-bottom:0px;padding-left:50px;word-break:break-word;">
                                            <div style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#797e82;">
                                                <h1 style="text-align:center; color: #000000; line-height:32px">¡Bienvenido ${nombre}! Estamos muy contentos de tenerte a bordo.</h1>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-right:50px;padding-bottom:0px;padding-left:50px;word-break:break-word;">
                                            <div style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#797e82;">
                                                <p style="margin: 10px 0; text-align: center;">Ahora puede comenzar a crear citas.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:10px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                <tr>
                                                    <td align="center" bgcolor="#407BFF" role="presentation" style="border:none;border-radius:100px;cursor:auto;padding:15px 25px 15px 25px;background:#407BFF;" valign="middle">
                                                        <a href="#" style="background:#407BFF;color:#ffffff;font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;" target="_blank">
                                                            <b style="font-weight:700"><b style="font-weight:700">Empezar</b></b>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-bottom:0px;padding-top:20px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                                            <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
      >
        <tr>
      
              <td>
            <![endif]-->
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                <tr>
                                                    <td style="padding:4px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#407BFF;border-radius:6px;width:30;">
                                                            <tr>
                                                                <td style="font-size:0;height:30;vertical-align:middle;width:30;">
                                                                    <a href="[[SHORT_PERMALINK]]" target="_blank">
                                                                        <img height="30" src="http://www.mailjet.com/saas-templates-creator/static/img/facebook_white.png" style="border-radius:6px;" width="30" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                <tr>
                                                    <td style="padding:4px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#407BFF;border-radius:6px;width:30;">
                                                            <tr>
                                                                <td style="font-size:0;height:30;vertical-align:middle;width:30;">
                                                                    <a href="[[SHORT_PERMALINK]]" target="_blank">
                                                                        <img height="30" src="http://www.mailjet.com/saas-templates-creator/static/img/twitter_white.png" style="border-radius:6px;" width="30" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                <tr>
                                                    <td style="padding:4px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#407BFF;border-radius:6px;width:30;">
                                                            <tr>
                                                                <td style="font-size:0;height:30;vertical-align:middle;width:30;">
                                                                    <a href="[[SHORT_PERMALINK]]" target="_blank">
                                                                        <img height="30" src="http://www.mailjet.com/saas-templates-creator/static/img/linkedin_white.png" style="border-radius:6px;" width="30" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso | IE]>
              </td>
            
          </tr>
        </table>
      <![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:0px 20px 0px 20px;padding-top:0px;padding-bottom:0px;word-break:break-word;">

                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
    </div>
</body>

</html>`
        }

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('ERROR AL ENVIAR CORREO', err)
            }
            else {
                console.log('EMAIL SEND')
            }
        })

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 6) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 6 characters' })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({
            username,
            password,
            nombre,
            apellido,
            cedula,
            rol,
            estado
        })
        console.log('User created:', response)
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'ESTE USUARIO YA SE ENCUENTRA REGISTRADO', code: 400 }),
            res.statusCode = 400
        }
        throw error   
    }

    res.json({status: 200})
    res.status(200)
})

app.post('/api/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Contraseña Incorrecta' })
    }

    if (plainTextPassword.length < 6) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 6 characters' })
    }
    
    try {
        const user = jwt.verify(token, JWT_SECRET)

        const _id = user.id
        const password = await bcrypt.hash(plainTextPassword, 10)
        await User.updateOne(
            { _id },
            {
                $set: { password }
            }
        )
        res.json({ status: 'Contraseña Actualizada' })
    } catch {
        res.json({ status: 'error', error: ';))' })
    }
})

app.post('/api/login', async (req, res) => {

    const { username, password } = req.body

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'consultasomnihealth@gmail.com',
                pass: 'uLTRAml*z'
            }
        });

        let mailOptions = {
            from: 'consultasomnihealth@gmail.com',
            to: username,
            subject: 'Inicio De Sesión - OmniHealt',
            text: `Se ha realizado un inicio de sesión con tu cuenta en la fecha: ${new Date()}`
        }

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('ERROR AL ENVIAR CORREO', err)
            }
            else {
                console.log('EMAIL SEND')
            }
        })

    const user = await User.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: 400, error: 'Usuario/Contraseña incorrectos' })
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET)
        return res.json({ status: 200, message: 'Inicio de sesión exitoso', jwt: token, username: user.username, user: user.nombre + ' ' + user.apellido, rol: user.rol, cedula: user.cedula, id: user._id, estado: user.estado })
        
    }

    res.json({ status: 400, error: 'Usuario o Contraseña Incorrecto' })
})


app.post('/api/login-meeting', async (req, res) => {
    const { username, password, sala } = req.body

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    console.log(makeid(50))

    const user = await UserMeeting.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            sala: user.sala,
            meeting: 'https://consulta.omnihealth.com.do/'+makeid(50)
        }, JWT_SECRET)
        return res.json({ status: 200, jwt: token, meeting: 'https://consulta.omnihealth.com.do/'+makeid(50) })
    }

    res.json({ status: 400, error: 'Usuario o Contraseña Incorrecto' })



})



app.post('/api/paciente', async (req, res) => {
    const { identificacion, nombre, apellido, fechaDeNacimiento, genero, correoElectronico, telefono, direccion, user_creation } = req.body;

    try {
        const response = await Pacientes.create({
            identificacion,
            nombre,
            apellido,
            fechaDeNacimiento,
            genero,
            correoElectronico,
            telefono,
            direccion,
            user_creation
        })

        res.json({
            status: 200,
            message: 'Paciente Creado',
            response
        })
        console.log('Paciente Creado', response)
    } catch (err) {
        return res.json({
            status: 'Error', err
        }),
        console.log('Se ha producido un error', err)
    }
})

app.post('/api/:_id/pacientes', async (req, res) => {
    const newPaciente = new Pacientes(req.body)
    const user = await User.findById(req.params)
    newPaciente.pacientes = user
    await newPaciente.save()
    user.pacientes.push(newPaciente)
    await user.save()
    res.send(user)
})

app.post('/api/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Contraseña Incorrecta' })
    }

    if (plainTextPassword.length < 6) {
        return res.json({ status: 'error', error: 'Su contraseña es menor a 6 caracteres' })
    }
    
    try {
        const user = jwt.verify(token, JWT_SECRET)

        const _id = user.id
        const password = await bcrypt.hash(plainTextPassword, 10)
        await User.updateOne(
            { _id },
            {
                $set: { password }
            }
        )
        res.json({ message: 'Contraseña Actualizada', status: 200 })
    } catch {
        res.json({ status: 400, error: 'SE HA PRODUCIDO UN ERROR' })
    }
})
app.options('*', cors())

app.post('/api/cita/:_id', async (req, res) => {
    const nuevaCita = new Citas(req.body)
    const paciente = await Pacientes.findById(req.params)
    nuevaCita.citas = paciente
    await nuevaCita.save()
    paciente.citas.push(nuevaCita)
    await paciente.save()
    res.send(paciente)
    console.log(nuevaCita)

    let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'consultasomnihealth@gmail.com',
                pass: 'uLTRAml*z'
            }
        });

        let mailOptions = {
            from: 'consultasomnihealth@gmail.com',
            to: paciente.correoElectronico,
            subject: 'Cita Agendada - OmniHealt',
            html: `
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title>
    </title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }
        
        .ReadMsgBody {
            width: 100%;
        }
        
        .ExternalClass {
            width: 100%;
        }
        
        .ExternalClass * {
            line-height: 100%;
        }
        
        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        
        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
    <!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Open Sans" rel="stylesheet" type="text/css">
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Open Sans);
    </style>
    <!--<![endif]-->
    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
            }
        }
    </style>
    <style type="text/css">
        [owa] .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
        }
    </style>
    <style type="text/css">
        @media only screen and (max-width:480px) {
            table.full-width-mobile {
                width: 100% !important;
            }
            td.full-width-mobile {
                width: auto !important;
            }
        }
    </style>
</head>

<body style="background-color:#f8f8f8;">
    <div style="background-color:#f8f8f8;">
        <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-bottom:0px;padding-top:0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:0px 0px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                            <div style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:left;color:#797e82;">
                                                <p style="text-align: center; margin: 10px 0;">Problemas para cargar|
                                                    <a target="_blank" rel="noopener noreferrer" href="#"></a><span style="color:#797e82; text-decoration: underline"> Ver versión en línea</span></p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td style="font-size:0px;padding:10px 25px;padding-top:0px;padding-right:0px;padding-bottom:40px;padding-left:0px;word-break:break-word;">
                                            <p style="border-top:solid 7px #407BFF;font-size:1;margin:0px auto;width:100%;">
                                            </p>
                                            <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 7px #407BFF;font-size:1;margin:0px auto;width:600px;" role="presentation" width="600px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="width:110px;">
                                                            <img alt="" height="auto" src="https://portal.omnihealth.com.do/img/Grupo%20128@2x.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;" title="" width="110" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:40px;padding-right:50px;padding-bottom:0px;padding-left:50px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="width:300px;">
                                                            <img alt="" height="auto" src="http://9pl9.mjt.lu/tplimg/9pl9/b/yvrt/t65sn.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;" title="" width="300" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-bottom:70px;padding-top:30px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-right:50px;padding-bottom:0px;padding-left:50px;word-break:break-word;">
                                            <div style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#797e82;">
                                                <h1 style="text-align:center; color: #000000; line-height:32px">Hola ${nuevaCita.nombre},</h1>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-right:50px;padding-bottom:0px;padding-left:50px;word-break:break-word;">
                                            <div style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#797e82;">
                                                <p style="margin: 10px 0; text-align: center;">${nuevaCita.nombre} la invitacion para tu cita el ${nuevaCita.fecha} ${nuevaCita.hora}.</p>
                                                <p style="margin: 10px 0; text-align: center;">Haga clic en el botón de abajo para ingresar a la cita. Si tiene problemas, comuníquese con nuestro equipo de soporte.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:10px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                <tr>
                                                    <td align="center" bgcolor="#407BFF" role="presentation" style="border:none;border-radius:100px;cursor:auto;padding:15px 25px 15px 25px;background:#407BFF;" valign="middle">
                                                        <a href="https://consulta.omnihealth.com.do/${nuevaCita.meeting}" style="background:#407BFF;color:#ffffff;font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;" target="_blank">
                                                            <b style="font-weight:700"><b style="font-weight:700">Agendar</b></b>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
        <div style="Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-bottom:0px;padding-top:20px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                                            <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
      >
        <tr>
      
              <td>
            <![endif]-->
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                <tr>
                                                    <td style="padding:4px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#407BFF;border-radius:6px;width:30;">
                                                            <tr>
                                                                <td style="font-size:0;height:30;vertical-align:middle;width:30;">
                                                                    <a href="[[SHORT_PERMALINK]]" target="_blank">
                                                                        <img height="30" src="http://www.mailjet.com/saas-templates-creator/static/img/facebook_white.png" style="border-radius:6px;" width="30" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                <tr>
                                                    <td style="padding:4px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#407BFF;border-radius:6px;width:30;">
                                                            <tr>
                                                                <td style="font-size:0;height:30;vertical-align:middle;width:30;">
                                                                    <a href="[[SHORT_PERMALINK]]" target="_blank">
                                                                        <img height="30" src="http://www.mailjet.com/saas-templates-creator/static/img/twitter_white.png" style="border-radius:6px;" width="30" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                <tr>
                                                    <td style="padding:4px;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#407BFF;border-radius:6px;width:30;">
                                                            <tr>
                                                                <td style="font-size:0;height:30;vertical-align:middle;width:30;">
                                                                    <a href="[[SHORT_PERMALINK]]" target="_blank">
                                                                        <img height="30" src="http://www.mailjet.com/saas-templates-creator/static/img/linkedin_white.png" style="border-radius:6px;" width="30" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso | IE]>
              </td>
            
          </tr>
        </table>
      <![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:0px 20px 0px 20px;padding-top:0px;padding-bottom:0px;word-break:break-word;">

                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
    </div>
</body>

</html>`
        }

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('ERROR AL ENVIAR CORREO', err)
            }
            else {
                console.log('EMAIL SEND')
            }
        })
})





// PETICIONES GET

app.get('/api/pacientes', async (req, res) => {
    // const paciente = await Pacientes.find( usercreation: req.params.user_creation).populate('citas')
    // res.send(paciente)
    const paciente = await Pacientes.find({}).populate('citas')
    res.send(paciente)
})

app.get('/api/data/paciente/', async (req, res) => {
    const paciente = await Pacientes.find(req.query)
    res.send(paciente)
})

app.get('/api/paciente/:_id', async (req, res) => {
    const paciente = await Pacientes.findById(req.params)
    res.send(paciente)
})

app.get('/api/:_id/user/info', async (req, res) => {
    const user = await User.findById(req.params).populate({
        path: 'pacientes',
        populate: {
            path: 'citas'
        }
    })
    res.send(user)
})

app.get('/api/:_id/cita', async (req, res) => {
    const cita = await Citas.findById(req.params)
    res.send(cita)
})


app.get('/api/users', async (req, res) => {
    const users = await User.find({})
    res.send(users)
})

app.get('/api/citas/', async (req, res) => {
    const citas = await Citas.find(req.query)
    res.send(citas)
})




// PETICIONES DELETE

app.delete('/api/user/:_id', async (req, res) => {
    User.findByIdAndRemove({ _id: req.params._id })
        .then(function (user) {
        res.send(user)
    })
})

app.delete('/api/paciente/:_id', async (req, res) => {
    Pacientes.findByIdAndRemove({ _id:req.params._id })
        .then(function (paciente) {
        res.send(paciente)
    })
})

app.delete('/api/cita/paciente', async (req, res) => {
    Citas.deleteOne({ identificacion: req.body.identificacion }).then(function(){ 
    console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 
})


app.get('/api/user-meeting', async (req, res) => {
    UserMeeting.find({}, async (err, userMeeting) => {
        if (err) {
            res.send('HA OCURRIDO UN ERROR');
            next()
        }
        res.json(userMeeting);
    })
})

app.post('/api/register-meeting', async (req, res) => {
    console.log(req.body)
    const { username, password: plainTextPassword, nombre, apellido, estado, referencia } = req.body

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'consultasomnihealth@gmail.com',
                pass: 'uLTRAml*z'
            }
        });

        let mailOptions = {
            from: 'consultasomnihealth@gmail.com',
            to: username,
            subject: 'Acceso API - OmniHealt',
            text: `Se ha realizado el registro de su acceso al API OmniHealth. Estas son sus credenciales, Usuario: ${username}, Contraseña: ${plainTextPassword}`
        }

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('ERROR AL ENVIAR CORREO', err)
            }
            else {
                console.log('EMAIL SEND')
            }
        })

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 6) {
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 6 characters' })
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    console.log(makeid(50))

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await UserMeeting.create({
            username,
            password,
            nombre,
            apellido,
            estado
        })
        console.log('User created:', response)
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'Username already in use' })
        }
        throw error
        
        
    }

    res.json({
        status: 200
    })
})
app.options('*', cors())

app.delete('/api/user-meeting/:_id', async (req, res) => {
    UserMeeting.findByIdAndRemove({ _id: req.params._id })
        .then(function (usermeeting) {
        res.send(usermeeting)
    })
})
app.options('*', cors())

app.delete('/api/cita/:nombre', async (req, res) => {
    Citas.findOneAndDelete({ nombre: req.params.nombre }, function (err) {
        if (!err) {
            res.send('ELIMINADO')
        } else {
            res.send(err)
        }
    })
})

// PETICIONES PUT

app.put('/api/citas/:_id', async (req, res) => {
    Citas.findByIdAndUpdate({ _id: req.params._id }, req.body)
        .then(function () {
            Citas.findOne({ _id: req.params.id })
                .then(function (citas) {
                    res.send(citas)
                    
            })
    })
})

app.put('/api/paciente/:_id', async (req, res) => {
    Pacientes.findByIdAndUpdate({ _id: req.params._id }, req.body)
        .then(function () {
            Pacientes.findOne({ _id: req.params._id })
                .then(function (paciente) {
                res.send(paciente)
            })
    })
})

app.put('/api/user/:_id', async (req, res) => {
    User.findByIdAndUpdate({ _id: req.params._id }, req.body)
        .then(function () {
            User.findOne({ _id: req.params._id })
                .then(function (user) {
                res.send(user)
            })
    })
})