const conn = require('./index.js')

module.exports = {
  addData(data) {
    conn.query('select count(*) as count from lagou where companyId = ? limit 0, 1', data.companyId, (err, res) => {
      if (err) return;
      if (res[0].count == 0) {
        conn.query('insert into lagou set ?', data)
      }
    })
  }
}