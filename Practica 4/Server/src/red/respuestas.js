exports.succes = function (req, res, mensaje = '', status = 200) {
    res.status(status).send({
        error:false,
        status: status,
        body: mensaje
    })    }

exports.error = function (req, res, mensaje = 'Error interno en el servidor', status = 500) {
    res.status(status).send({
        error:true,
        status: status,
        body: mensaje
    })    }