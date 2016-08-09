const request = require('request');

module.exports = {

  getData(req,res,next){
    request({
      url:'https://data.ny.gov/resource/farmersmarkets.json',
      method:'get',
      json:true,
      qs: {
        zip: req.query.zip
      }
    },(err,response,body)=>{
      if(err) throw err;
      res.results = body;
      next();
    })
  },

  getZip(req,res,next){
    let latlng = `${req.query.latitude},${req.query.longitude}`
    console.log(latlng)
    request({
      url:'http://maps.googleapis.com/maps/api/geocode/json',
      method:'get',
      json:true,
      qs: {
        "latlng": latlng
      }
    }, (err, response, body)=>{
      if(err) throw err;
      console.log(body)
      let addressComponents = body.results[0].address_components
      addressComponents.map((component)=>{
        if(component.types.includes("postal_code")) {
          res.results = component.short_name;
        }
      })
      next();
    })
  }
}

// P=Spring(operating in April or May) M=Summer(operating in June, July, Aug, Sept, Oct, Nov) X=Extended Season(operating in Dec) W=Winter(operating in Jan, Feb, March) YR=Year-round(continually operating at the same location all year long)
