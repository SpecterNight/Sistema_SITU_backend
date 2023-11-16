import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
  // Obtener el token de la solicitud
  const authorization = req.get('authorization');
  let token = '';

  // Verificar que el token exista y sea válido
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    token = authorization.split(' ')[1];
  } else {
    return res.status(401).json({ msj: "No autorizado", error: "Token no válido o faltante" });
  }

  try {
    // Verificar el token
    const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY);

    //Si el token no existe se responde con un mensaje de error
    if (!token || !tokenDecoded.user) {
      return res.status(401).json({ msj: "No autorizado", error: "Token no válido o faltante" });
    }

    // Llamar a next() para pasar al siguiente middleware
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msj: "No autorizado", error: "Error al verificar el token" });
  }
};