//importar el modulo server
const connection = require("../../config/db");
const app = require("../../config/server");
const bcryptjs = require('bcryptjs');
const moment = require('moment'); // Importing the Moment.js module
const { NULL } = require("mysql/lib/protocol/constants/types");

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('../views/home.ejs');
    })

    app.get('/list', (req, res) => {
        connection.query("SELECT * FROM usuarios", (errr, results) => {
            connection.query("SELECT * FROM encuesta", (err, result) => {
                if (err, errr) {
                    res.send(err);
                } else {
                    res.render("../views/prueba.ejs", {
                        usuarios: results,
                        encuesta: result,
                    });
                }
            })
        });
        
    })

    app.get('/informacion', (req, res) => {
        res.render('../views/informacion.ejs');
    })

    app.get('/noticias', (req, res) => {
        res.render('../views/noticias.ejs');
    })

    app.get('/encuesta', (req, res) => {
        if (req.session.loggedin) {
            connection.query("SELECT * FROM usuarios", (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log(req.session.encuestador === 1);
                    res.render("../views/encuesta.ejs", {
                        usuarios: result,
                        login: true,
                        name: req.session.name,
                        rol: req.session.rol,
                        encuestador: req.session.encuestador
                    });
                }
            })
        } else {
            res.render('../views/login.ejs');
        }
    })

    app.get('/encuesta-nav', (req, res) => {
        if (req.session.loggedin) {
            connection.query("SELECT * FROM usuarios", (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log(req.session.encuestador === 1);
                    res.render("../views/encuesta-nav.ejs", {
                        usuarios: result,
                        login: true,
                        name: req.session.name,
                        rol: req.session.rol,
                        encuestador: req.session.encuestador
                    });
                }
            })
        } else {
            res.render('../views/login.ejs');
        }
    })

    //Solicitudes post formulario de registro
    app.post('/encuesta', async (req, res) => {
        if (req.session.loggedin) {
            let { name,lastName,email,typeDocument,tienesSisben,serviciosHogar,nivelEscolar,phone,nroHijos,grupoDelSisben,tieneHijos,estrato, eps, nroDocument, address, mobile, municipality, department, neighborhood, dateofbirth } = req.body;
            console.log(req.body);
            if (tienesSisben === 'hide') {
                tienesSisben = 'No'
            }
            if (municipality === 'hide' || department === 'hide' || neighborhood === 'hide', serviciosHogar === 'hide') {
                municipality, department, neighborhood,serviciosHogar = 'No se selecciono'
            }
            if (grupoDelSisben === '') {
                grupoDelSisben = 'n/a'
            }
            if (tieneHijos === 'hide') {
                tieneHijos = 'No'
            }
            if (nroHijos === '') {
                nroHijos = 0
            }
            if (mobile === '' || phone === '') {
                nroHijos,phone = 0
            }
            if (nivelEscolar === '' || nivelEscolar === null) {
                nivelEscolar = 'No constesto o no se realizo registro'
            }
            connection.query("INSERT INTO encuesta SET?", {
                encuestadorId: req.session.encuestador,
                name: name,
                lastName: lastName,
                email: email,
                estrato:estrato,
                typeDocument: typeDocument,
                nroDocument: nroDocument,
                address: address,
                eps:eps,
                tienesSisben:tienesSisben,
                grupoDelSisben:grupoDelSisben,
                tieneHijos:tieneHijos,
                nroHijos:nroHijos,
                mobile: mobile,
                phone: phone,
                municipality: municipality,
                department: department,
                neighborhood: neighborhood,
                serviciosHogar:serviciosHogar,
                dateofbirth: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                date_create: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                nivelEscolar:nivelEscolar,
                state: true,
                date_update: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }, async (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    connection.query("SELECT * FROM encuesta", (err, result) => {
                        if (err) {
                            res.send(err);
                        } else {
                            console.log(result);
                            res.redirect("/encuesta");
                        }
                    })
                }
            })
        } else {
            res.render('../views/login.ejs');
        }

    })

    app.get('/prueba', (req, res) => {
        if (req.session.loggedin) {
            connection.query("SELECT * FROM encuesta", (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.render("../views/dashboard-full.ejs", {
                        encuesta: result,
                        login: true,
                        name: req.session.name,
                        rol: req.session.rol
                    });
                }
            })
        } else {
            res.render('../views/login.ejs');
        }
    })

    app.get('/dashboard', (req, res) => {
        if (req.session.loggedin) {
            connection.query("SELECT * FROM usuarios", (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.render("../views/dashboard.ejs", {
                        usuarios: result,
                        login: true,
                        name: req.session.name,
                        rol: req.session.rol
                    });
                }
            })
        } else {
            res.render('../views/login.ejs');
        }

    })

    app.get('/restrictedNo', (req, res) => {
        if (req.session.loggedin) {
            connection.query("SELECT * FROM usuarios", (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.render("../views/list.ejs", {
                        usuarios: result,
                        login: true,
                        name: req.session.name,
                        rol: req.session.rol
                    });
                }
            })
        } else {
            res.render('../views/login.ejs');
        }

    })

    app.get("/delete/:id", (req, res) => {
        const id = req.params.id;
        connection.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
            if (err) {
                res.send(err);
            } else {
                connection.query("SELECT * FROM usuarios", (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect("/dashboard");
                    }
                })
            }
        })
    })

    app.post("/edit/:id", (req, res) => {
        const id = req.params.id;
        const { nameComplete, email } = req.body
        console.log(req.body);
        connection.query("UPDATE usuarios SET nameComplete = ?, email = ? WHERE id = ?", [nameComplete, email, id], (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/dashboard");
            }
        })
    })

    app.get('/login', (req, res) => {
        if (req.session.loggedin) {
            connection.query("SELECT * FROM usuarios", (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.render("../views/dashboard.ejs", {
                        usuarios: result,
                        login: true,
                        name: req.session.name,
                        rol: req.session.rol
                    });
                }
            })
        } else {
            res.render('../views/login.ejs');
        }
    })
    app.get('/register', (req, res) => {
        if (req.session.loggedin) {
            res.render("../views/register.ejs", {
                login: true,
                name: req.session.name,
                rol: req.session.rol
            });
        } else {
            res.render('../views/login.ejs');
        }
    })

    app.get('/logout', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    })

    //Solicitudes post formulario de registro
    app.post('/register', async (req, res) => {
        const { name, lastName, email, user, password, rol, state, typeDocument, nroDocument, address, mobile, municipality, department, neighborhood, dateofbirth } = req.body;
        console.log(req.body);
        if (rol === "NULL") {
            rol = "usuario"
        }
        let passwordBcrypt = await bcryptjs.hash(password, 8);

        connection.query("INSERT INTO usuarios SET?", {
            avatar: '',
            name: name,
            lastName: lastName,
            email: email,
            user: user,
            password: passwordBcrypt,
            rol: rol,
            typeDocument: typeDocument,
            nroDocument: nroDocument,
            address: address,
            mobile: mobile,
            municipality: municipality,
            department: department,
            neighborhood: neighborhood,
            dateofbirth: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            date_create: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            state: true,
            date_update: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        }, async (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                connection.query("SELECT * FROM usuarios", (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log(result);
                        res.redirect("/dashboard");
                    }
                })
            }
        })
    })

    app.post('/auth', async (req, res) => {
        const { user, password } = req.body;
        if (user && password) {
            connection.query("SELECT * FROM usuarios WHERE user = ?", [user], async (error, result) => {
                console.log(result[0].password)
                if (result.length === 0 || !(await bcryptjs.compare(password, result[0].password)) || result[0].rol === 'user') {
                    res.render('../views/login.ejs', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o contraseña incorrectas",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'login'
                    })
                } else {
                    req.session.loggedin = true
                    req.session.name = result[0].name
                    req.session.rol = result[0].rol
                    req.session.encuestador = result[0].id
                    connection.query("SELECT * FROM usuarios", (err, result) => {
                        if (err) {
                            res.send(err);
                        } else {
                            console.log(req.session.rol);
                            res.render('../views/dashboard.ejs', {
                                alert: true,
                                alertTitle: "Conexion existosa",
                                alertMessage: "Inicio de sesion correcto",
                                alertIcon: "success",
                                showConfirmButton: false,
                                timer: false,
                                ruta: '',
                                usuarios: result,
                                login: true,
                                name: req.session.name,
                                rol: req.session.rol,
                                encuestador: req.session.encuestador
                            })
                        }
                    })

                }
            })
        }
    })

}
