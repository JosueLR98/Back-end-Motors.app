require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('Database authenticate'))
  .catch((err) => console.log(err));
db.sync({ force: true })
  .then(() => console.log('Data base synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!🐉`);
});
