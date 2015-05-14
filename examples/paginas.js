/**
 * Module Dependencies
 */

var xray = require('..');

/**
 * Use
 */

xray('http://www.paginasamarillas.com.ar/b/veterinarias/ciudad-de-buenos-aires/')
  .select([{
    $root: '.m-results-business',
    title: '.m-results-business--name a',
    address: '.m-results-business--address',
    url: '.m-results-business--online a',
    desc: '.m-results-business--services',
    services: '.m-services',
    openTime: '.m-opening-hours',
    coords: '.m-results-business--map-link[onclick]',
    tel: '.m-bip-otras-direcciones--telefonos p',
    img: '.media-container-img[src]'
  }])
  .paginate('.m-results-pagination li > a:last-child[href]')
  .limit(1)
  //.write('out.json')
  .run(function(err, json) {
    if (err) throw err;
    json.forEach(function(vet){
      vet.title = vet.title.replace(/(\r\n|\n|\r|\t)/gm,'').trim();
      vet.address = vet.address.replace(/(\r\n|\n|\r|\t)/gm,'').trim();
      vet.desc = vet.desc.replace(/(\r\n|\n|\r|\t)/gm,'').trim();
      if (vet.services) {
        vet.services = vet.services.replace(/(\r\n|\n|\r|\t)/gm,'').trim();
      };
      vet.openTime = vet.openTime.replace(/(\r\n|\n|\r|\t)/gm,'').trim();
      //vet.coords   = {};
      if(vet.coords) {
        //console.log(vet.coords.split('|')[2].split('&')[0].split(',')[0])
        //console.log(vet.coords.split('|')[2].split('&')[0].split(',')[1])
        var lat = vet.coords.split('|')[2].split('&')[0].split(',')[0];
        var long = vet.coords.split('|')[2].split('&')[0].split(',')[1];
        vet.coords = {};
        vet.coords.latitude = lat;
        vet.coords.longitude = long;
        //vet.coords.latitude  = vet.address.split('|').split('&').split(',');
        //vet.coords.longitude = vet.address.split('|').split('&').split(',');
      }
      console.log(JSON.stringify(vet, null, 2));
    });
    //console.log(JSON.stringify(json, null, 2));
  })
