const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'your_username',
  password: 'your_password',
  host: 'your_host',
  port: 'your_port',
  database: 'your_database_name',
});

module.exports = pool;
