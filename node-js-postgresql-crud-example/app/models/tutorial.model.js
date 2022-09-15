module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("Employee", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Employee;
};
