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
        console.log('Got saved_market successful!', saved_market);
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
  },

  getPostsByFId(req,res,next){
    console.log('==== checking farmer_id has posts ====', req.params);
    _db.one(`
      SELECT EXISTS(
        SELECT *
        FROM farmer_posts
        WHERE farmer_id = $/farmer_id/
      )
      `, req.params)
      .then( r=>{
        console.log("do posts exist? ", r.exists)
        if(r.exists){
          console.log('==== Getting Posts from farmer_id ====', req.params)
          _db.many(`
            SELECT *
            FROM farmer_posts
            WHERE farmer_id = $/farmer_id/
            `, req.params)
            .then( farmer_posts=>{
              console.log('Got Farmer Posts Successful: ', farmer_posts)
              res.rows = farmer_posts;
              next();
            })
        } else {
          res.rows = [{
            farmer_name: '',
            market_name: '',
            content: 'No Posts, yet.',
            post_created: null
          }]
          next()
        }
      })
      .catch(err=>{
        console.log("error getting posts by farmer id ", err)
      })
  }

}
