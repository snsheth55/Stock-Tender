const pg = require('pg');

const db = {}; // db schema object
const url = ''; // postgres://student:ilovetesting@localhost/postgresql-raw'

pg.connect(
  url,
  (err, db_) => {
    if (err) throw new Error(err);
    db.conn = db_;
  }
);
