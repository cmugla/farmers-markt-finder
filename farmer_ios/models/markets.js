const _db     = require('./connection');

module.exports = {

  getMDataFromFId(req,res,next){
    console.log('===== get market_data =====', req.params);
    _db.one(`
      SELECT * FROM farmers WHERE farmer_id = $/farmerId/`, req.params)
      .then( market_data=>{
        console.log('Got market_data successful: ', market_data);
        res.rows = market_data;
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
        console.error('Error in getting saved_market:', error);
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
  },

  deleteMarket(req,res,next){
    console.log('==== delete market from farmer ====', req.body);
    _db.one(`
      UPDATE farmers
      SET market_id = NULL
      WHERE farmer_id = $/farmer_id/
      RETURNING *;
      `, req.body)
      .then( farmer_info=>{
        console.log('Removed market_id: ', farmer_info);
        res.rows = farmer_info;
        next();
      })
  }

}
