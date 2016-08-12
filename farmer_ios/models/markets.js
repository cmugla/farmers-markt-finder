const _db     = require('./connection');

module.exports = {

  getMIdFromFId(req,res,next){
    console.log('===== get market_id =====', req.params);
    _db.one(`
      SELECT market_id FROM farmers WHERE farmer_id = $/farmerId/`, req.params)
      .then( market_id=>{
        console.log('Got market_id successful: ', market_id);
        res.rows = market_id;
        next();
      })
      .catch( error=>{
        console.error('Error in adding saved_market:', error);
      });
  },

  getMarketByMarketId(req,res,next){
    console.log('===== get saved_market =====', req.params);
    _db.one(`
      SELECT * FROM save_markets WHERE market_id = $/marketId/`, req.params)
      .then( saved_market=>{
        console.log('Got saved_market successful!');
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
