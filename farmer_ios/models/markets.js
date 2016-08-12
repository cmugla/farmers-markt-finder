const _db     = require('./connection');

module.exports = {

  getMarketByFarmerId(req,res,next){
    console.log('===== get saved_market =====', req.params);
    _db.one(`
      SELECT * FROM save_markets WHERE farmer_id = $/farmerId/`, req.params)
      .then( saved_market=>{
        console.log('Added saved_market successful!');
        res.rows = saved_market;
        next();
      })
      .catch( error=>{
        console.error('Error in adding saved_market:', error);
      });
  },

  addMarket(req,res,next){
    console.log('===== add saved_market =====', req.body);
    _db.one(`
      INSERT INTO save_markets (farmer_id, market_name, address_line_1, city, state, operation_hours, operation_season)
      VALUES ($/farmer_id/, $/market_name/, $/address_line_1/, $/city/, $/state/, $/operation_hours/, $/operation_season/)
      RETURNING *;`, req.body)
      .then( saved_market=>{
        console.log('Added saved_market successful!');
        res.rows = saved_market;
        next();
      })
      .catch( error=>{
        console.error('Error in adding saved_market:', error);
      });
  }

}
