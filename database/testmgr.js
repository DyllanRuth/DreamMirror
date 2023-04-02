var dbmgr = require("./dbmgr");
var db = dbmgr.db;


exports.getNames = () => {
    const sql = "SELECT * FROM users"
    let stmt = db.prepare(sql);
    let res = stmt.all();

    return res;

}

// db.run('INSERT INTO users(username, password) VALUES (?, ?)', [username, password], function(err) {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log('Data inserted into table');
//     }
//   });
  
//   // close the database connection
//   db.close();