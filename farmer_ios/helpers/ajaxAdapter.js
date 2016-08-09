export default class AjaxAdapter{

  constructor(fetch){
    if(!fetch) throw "We need the Fetch library to make this work, bru.";
  }

  getMrkts(zip){
    return fetch(`http://localhost:3000/mkts?zip=${zip}`).then(r => r.json()).then(r=>r)
  }

}
