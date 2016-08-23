'use strict';

const User = use('App/Model/User');
const E = require('node-exceptions');
const Hash = use('Hash');

class SessionController {

  * store(req, res) {
    const { username: email, password } = req.all();

    try {
      const user = yield User.findBy('email', email);
      const passwordValid = yield Hash.verify(password, user.password);

      if (!passwordValid) {
        throw new E();
      }

      const token = yield req.auth.generate(user);
      res.json({ access_token: token });
    } catch (e) {
      res.status(401).json({
        errors: [
          {
            status: 401,
            title: 'login failed',
          },
        ],
      });
    }
  }
}

module.exports = SessionController;
