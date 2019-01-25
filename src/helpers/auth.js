import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const baearerHeader = req.headers.authorization;

  if (typeof baearerHeader !== 'undefined') {
    const bearer = baearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({
      status: '403',
      message: 'Unauthorized access',
    });
  }
};

const verifyAdmin = (req, res, next) => {
  const baearerHeader = req.headers.authorization;
  if (typeof baearerHeader === 'undefined' || !baearerHeader) {
    res.status(403).json({
      status: '403',
      message: 'Unauthorized access',
    });
  } else {
    const bearer = baearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secretkey', (error, authData) => {
      if (error) {
        res.sendStatus(403);
      }
      if (authData.response.isadmin === true) {
        req.userId = authData.response.id;
        next();
      } else if (authData.response.isadmin === false) {
        res.status(403).json({
          status: '403',
          message: 'Access forbidden',
        });
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const baearerHeader = req.headers.authorization;
  if (typeof baearerHeader === 'undefined' || !baearerHeader) {
    res.status(403).json({
      status: '403',
      message: 'Unauthorized access',
    });
  } else {
    const bearer = baearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secretkey', (error, authData) => {
      if (error) {
        res.status(403).json({
          status: '403',
          message: 'Bad token',
        });
      }
      if (authData.response.isadmin === false) {
        req.userId = authData.response.id;
        next();
      } else if (authData.response.isadmin === true) {
        req.userId = authData.response.id;
        next();
      } else {
        res.status(403).json({
          status: '403',
          message: 'Access forbidden',
        });
      }
    });
  }
};


export default {
  verifyToken,
  verifyAdmin,
  verifyUser,
};
