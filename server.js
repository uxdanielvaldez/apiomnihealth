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
            text: `Usted ha sido agendado para una cita en la fecha: ${nuevaCita.fecha} y en la hora ${nuevaCita.hora}. Para acceder a esta cita utilice el siguiente enlace: https://consulta.omnihealth.com.do/${nuevaCita.meeting}`
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
    Citas.find({ identificacion: req.body.identificacion }).remove().exec()
    res.send('Eliminado')
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