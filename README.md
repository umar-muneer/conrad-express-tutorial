# conrad-express-tutorial
A short tutorial about expressjs

## Resources
https://www.npmjs.com/package/express-bunyan-logger

http://expressjs.com/en/resources/middleware/body-parser.html


## Sequelize
https://sequelize.org/v4/
### Plan
* Data modeling
* Define models in sequelize
* Define associations
* find, findAll, create, update, delete
* Instances
* Advanced (hooks, scopes, paranoid, transactions)

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

# How to run the Database
**docker rm -f mysql && docker run --name=mysql -v /Users/umarmuneer/Documents/mysql-data:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=your-root-password mysql**

# How to run the server
**USER=your-db-user PASS=your-db-user-password npx nodemon index.js**

