export default class AjaxAdapter{

  constructor(fetch){
    if(!fetch) throw "We need the Fetch library to make this work, bru.";
  }

  getMrktsZip(zip){
    return fetch(`http://localhost:3000/mkts?zip=${zip}`)
      .then(r => r.json())
      .then(r=>r)
  }

  getMrktById(market_id){
    return fetch(`http://localhost:3000/saveMkts/${market_id}`)
      .then(r=>r.json())
      .then(r=>r)
  }

  getMDataByFId(farmer_id){
    return fetch(`http://localhost:3000/saveMkts/farmer/${farmer_id}`)
      .then(r=>r.json())
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

  signUpFarmer(farmer_info) {
    return fetch(`http://localhost:3000/userapi/users`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(farmer_info)
      })
      .then((r) => r.json())
  }

  loginFarmer(login_info) {
    return fetch("http://localhost:3000/userapi/authenticate", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login_info)
      })
      .then((r) => r.json())
  }

  addPost(postContent) {
    return fetch(`http://localhost:3000/userapi/posts`, {
        method:'post',
        headers: {
          "Content-type" : "application/json; charset=UTF-8"
        },
        body: JSON.stringify(postContent)
      })
      .then(r=>r.json())
      .then(r=>r)
  }

  getPostsByMName(market_name) {
    return fetch(`http://localhost:3000/userapi/posts?market_name=${market_name}`)
      .then(r=>r.json())
      .then(r=>r)
  }

  addMarket(market_info){
    return fetch(`http://localhost:3000/saveMkts`, {
      method: 'post',
      headers: {
        "Content-type" : "application/json; charset=UTF-8"
      },
      body: JSON.stringify(market_info)
    })
    .then(r=>r.json())
    .then(r=>r)
  }

  updateFarmer(data){
    return fetch(`http://localhost:3000/userapi/users`, {
      method: 'put',
      headers: {
        "Content-type" : "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
    .then(r=>r.json())
    .then(r=>r)
  }

}
