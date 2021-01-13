# conrad-express-tutorial
A short tutorial about expressjs

## Resources
https://www.npmjs.com/package/express-bunyan-logger

http://expressjs.com/en/resources/middleware/body-parser.html


## Sequelize
https://sequelize.org/v4/
### Plan
1. Data modeling
2. Define models in sequelize
3. Define associations
4. find, findAll, create, update, delete
5. Audit trails
6. Advanced (hooks, scopes, paranoid)

#### Data Modeling
We have three entities

1. Courses
2. Students
3. Teachers

* A course can have many students
* A student can take many courses
* A course can have one teacher
* A teacher can take many courses

**teachers**
id | int
name | string
createdAt | Date
updatedAt | Date

**students**
id | int
name | string
createdAt | Date
updatedAt | Date

**courses**
id | int
name | string
teacher_id | int
createdAt | Date
updatedAt | Date

**course_student**
id | int
student_id | int
course_id | int
grade | string
createdAt | Date
updatedAt | Date