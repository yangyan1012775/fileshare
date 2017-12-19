const query = (sql: string, con: any) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err: any, result: any) => {
      con.end();
      resolve(result);
    });
  });
};

export default query;
