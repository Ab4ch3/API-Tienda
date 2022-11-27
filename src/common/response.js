// Se va a encargar de dar respuesta en una estructura fija para cada petecion

// importamos la libreria http-erros que nos ayuda a dar repuestas solo sobre los errores
const createError = require("http-errors");

module.exports.Response = {
  // generamos una respuesta standar en todos nuestros modulos
  success: (res, status = 200, message = "OK", body = {}) => {
    res.status(status).json({ message, body });
  },
  error: (res, error = null) => {
    // aqui estamos usando el http-errors
    // Aqui si le enviamos un error el nos devolvera ese error , sino nos devolver el que colocamos por defecto
    const { statusCode, message } = error
      ? error
      : new createError.InternalServerError();
    res.status(statusCode).json({ message });
  },
};
