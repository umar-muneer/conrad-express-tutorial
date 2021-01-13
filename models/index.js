const Sequelize = require("sequelize");
const username = process.env.USER;
const password = process.env.PASS;
const sequelize = new Sequelize("sequelize_demo", username, password, {
  dialect: "mysql",
  pool: {
    max: 5,
    min: 1,
  },
});
const Teacher = sequelize.define(
  "teachers",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    timestamps: true,
  }
);
const Student = sequelize.define(
  "students",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    timestamps: true,
  }
);
const Course = sequelize.define(
  "courses",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    teacher_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    timestamps: true,
  }
);
const CourseStudent = sequelize.define("course_students", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  student_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  course_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  grade: {
    type: Sequelize.STRING,
    defaultValue: "not-graded-yet",
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
const defineAssociations = () => {
  Course.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });
  Teacher.hasMany(Course, { foreignKey: "teacher_id", as: "courses" });
  Course.belongsToMany(Student, {
    through: CourseStudent,
    foreignKey: "course_id",
    as: "students",
  });
  Student.belongsToMany(Course, {
    through: CourseStudent,
    foreignKey: "student_id",
    as: "students",
  });
  CourseStudent.belongsTo(Course, {foreignKey: "course_id"});
  CourseStudent.belongsTo(Student, {foreignKey: "student_id"});
};
const initDb = async () => {
  await sequelize.query("select version()");
  console.log("i am in!!!");
  await sequelize.sync({ alter: true }); // Don't ever do this in production, or local for that matter :P
  defineAssociations();
};
module.exports = {
  initDb,
  Teacher,
  Student,
  Course,
  CourseStudent,
};
