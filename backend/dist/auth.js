"use strict";
exports.__esModule = true;
exports.handleAuthentication = void 0;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
exports.handleAuthentication = function (req, res) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, 'meat-api-password');
        res.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        res.status(403).json({ message: 'Dados inválidos.' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
