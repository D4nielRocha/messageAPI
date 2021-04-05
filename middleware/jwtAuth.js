const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz  = require ('express-jwt-authz');


//load the configuration settings from the
const authConfig = require('../config/auth_config.json');


const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cached: true,
        rateLimit: true,
        jwksRequestPerMinute: 5,
        jwksUri: `${authConfig.issuer}.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    scope: 'openid email profile',
    issuer: authConfig.issuer,
    algorithms: authConfig.algorithms
});


const checkAuth = (permissions) => jwtAuthz(permissions, {customScopeKey: "permissions"});


module.exports = {
    authConfig,
    checkJwt,
    checkAuth
}