const db = require('./db');

const User = db.sequelize.define('Users', {
    FirstName: {
        type: db.Sequelize.STRING
    },

    LastName: {
        type: db.Sequelize.STRING
    }
});

User.sync({force: true}).then(() => {
    return User.create({
        FirstName: 'Dionathan',
        LastName: 'Cordova'
    })
})