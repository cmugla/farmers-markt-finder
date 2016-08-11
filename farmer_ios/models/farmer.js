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
    /* trim and lowercase the username before we try to match it */
    _db.one(`
      SELECT *
      FROM farmers
      WHERE email = lower(trim(from $/email/));
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
        console.error('Error ', error);
        res.error = error
        next()
      })
  },

  createUser(req, res, next) {
    console.log(req.body)
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
  }

}


