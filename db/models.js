const Sequalize = require('sequelize');
const db = new Sequalize(process.env.DATABASE_URL);

const User = db.define('user', {
  name: Sequalize.TEXT
});

User.belongsTo(User, { as: 'Manager' });

db.sync({ force: true })
  .then(() => {
    return Promise.all([
      User.create({ name: 'Dave' }),
      User.create({ name: 'Jeff' }),
      User.create({ name: 'Bill' })
    ]);
  })
  .then(Users => {
    const Dave = Users[0];
    const Jeff = Users[1];
    const Bill = Users[2];

    Bill.setManager(Dave);
  });


module.exports = User;

