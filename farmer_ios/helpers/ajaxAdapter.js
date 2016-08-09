export default class AjaxAdapter{

  constructor(fetch){
    if(!fetch) throw "We need the Fetch library to make this work, bru.";
  }

  getMrktsZip(zip){
    return fetch(`http://localhost:3000/mkts?zip=${zip}`)
      .then(r => r.json())
      .then(r=>r)
  }

  getMrktsLonLat(long, lat) {
    return fetch(`http://localhost:3000/mkts?longitude=${long}&latitude=${lat}`)
      .then(r=>r.json())
      .then(r=>r)
  }

  getZip(long, lat) {
    return fetch(`http://localhost:3000/mkts/location?longitude=${long}&latitude=${lat}`)
      .then(r=>r.json())
      .then(r=>r)
  }

}
