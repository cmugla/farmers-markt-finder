const request = require('request');

module.exports = {

  getData(req,res,next){
   let countryCode = req.params.code
    request({
      url:'https://data.ny.gov/resource/farmersmarkets.json',
      method:'get',
      json:true
    },(err,response,body)=>{
      if(err) throw err;
      res.results = body;
    next();
    })
  }
}

// P=Spring(operating in April or May) M=Summer(operating in June, July, Aug, Sept, Oct, Nov) X=Extended Season(operating in Dec) W=Winter(operating in Jan, Feb, March) YR=Year-round(continually operating at the same location all year long)
