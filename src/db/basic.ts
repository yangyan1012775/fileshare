import * as mysql from 'mysql';
import cbFunc from '../cb/cb';

const init = (db: any) => {
  const options = {
    database: db,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USERNAME,
  };
    
  const con = mysql.createConnection(options);
  return new Promise((resolve, reject) => {
    con.connect(cbFunc(() => {
<<<<<<< HEAD
=======

>>>>>>> 5acc6ee1796b00fe105d9c0e06a3e408070b0e50
      resolve(con);
    }));
  });

};

export default init;
