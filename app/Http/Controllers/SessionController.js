'use strict';

const User = use('App/Model/User');
const Hash = use('hash');

class SessionController {

  * store(req, res) {
    const { username: email, password } = req.all();

    try {
      const user = yield User.findBy('email', email);
      yield Hash.verify(password, user.password);
      const token = yield req.auth.generate(user);
    } catch (e) {

    } finally {

    }
  }
}

module.exports = SessionController;
