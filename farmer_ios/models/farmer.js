const _db     = require('./connection');
const bcrypt  = require('bcrypt');
const salt    = bcrypt.genSaltSync(10);

const createSecure = (password)=>
  new Promise( (resolve,reject)=>
    bcrypt.genSalt( (err, salt)=>
      bcrypt.hash(password, salt, (err, hash)=>
        err? reject(err) : resolve(hash)
      )
    )
  )

module.exports = {

  /* GET user */
  getUserByUsername(req, res, next) {
    console.log('===== get Farmer =====', req.body)
    _db.one(`
      SELECT *
      FROM farmers
      WHERE email = $/username/;
      `, req.body)
      .then( user=>{

        if(bcrypt.compareSync(req.body.password, user.password_digest)){
          res.user = user;
        }else{
          res.error = true
        }
        console.log(res.user)
        next()

      })
      /* NOTE: NO USERS or all ERRORS*/
      .catch( error=>{
        console.error('Error getting user ', error);
        res.error = error
        next()
      })
  },

  createUser(req, res, next) {
    console.log('===== create Farmer =====', req.body)
    createSecure(req.body.password)
      .then( hash=>{
        _db.one(`
          INSERT INTO farmers (name, email, market_name, password_digest)
          VALUES ($1, $2, $3, $4)
          returning *;`,[req.body.name, req.body.username, req.body.market_name, hash]
        )
        .then( newUser=> {
          console.log(newUser)
          res.user = newUser;
          next()
        })
        .catch( err=> {
          console.log('error signing up', err)
          next()
        })

      });
  },

  addFarmerPost(req,res,next){
    console.log('===== add farmer_post =====', req.body);
    _db.one(`
      INSERT INTO farmer_posts (farmer_id, market_id, content)
      VALUES ($/farmer_id/, $/market_name/, $/content/)
      RETURNING *;`, req.body)
      .then( farmer_post=>{
        console.log('Added farmer_post successful!');
        res.rows = farmer_post;
        next();
      })
      .catch( error=>{
        console.error('Error in adding farmer_post:', error);
      });
  },

  getPosts(req,res,next){
    console.log('===== get all posts =====', req.body);
    _db.one(`
      SELECT * FROM farmer_posts WHERE farmer_id = $/farmer_id/
      `, req.params)
      .then( farmer_posts=>{
        console.log('Got farmer_posts successfully');
        res.rows = farmer_posts;
        next()
      })
      .catch( error=>{
        console.error('Error in getting posts ', error)
      })
  }

}


