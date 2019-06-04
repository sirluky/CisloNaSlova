/**
 * @param cislo - zadejte cele cislo od -9999 - 9999, jina cisla nejsou podporovana,
 * - enter an INT between -9999 - 9999, other values aren't already supported
 */
function cislonaslova(cislo = 0) {
  if (typeof cislo === 'string') cislo = parseInt(cislo.trim());
  let zaporne;
  cislo = parseInt(cislo);
  if (cislo < 0) {
    cislo = -cislo;
    zaporne = true;
  }

  if (cislo === 0) return 'nula';
  var slovnik = {
    jednotky: ['', 'jedna', 'dva', 'tři', 'čtyři', 'pět', 'šest', 'sedm', 'osm', 'devět'],
    nact: ['', 'jede', 'dva', 'tři', 'čtr', 'pat', 'šest', 'sedm', 'osm', 'devate'],
    desitky: ['', 'deset', 'dvacet', 'třicet', 'čtyřicet', 'padesát', 'šedesát', 'sedmdesát', 'osmdesát', 'devadesát'],
    stovky: ['', 'sto', 'dvě stě', 'tři sta', 'čtyři sta', 'pět set', 'šest set', 'sedm set', 'osm set', 'devět set'],
    tisice: ['', 'tisíc', 'tisíce', 'tisíce', 'tisíce', 'tisíc', 'tisíc', 'tisíc', 'tisíc', 'tisíc'],
  };
  var arrcislo = cislo.toString().split('');

  arrcislo = arrcislo.map(function(e) {
    return parseInt(e);
  });
  var delkacisla = arrcislo.length;
  var soucasnecislo = 1;

  var poslednicislo = 0;

  for (var i = arrcislo.length - 1; i >= 0; i--) {
    var c = arrcislo[i];

    switch (soucasnecislo++) {
      case 1:
        poslednicislo = c;
        c = slovnik.jednotky[c];
        c = c === 'nula' && delkacisla > 1 ? 'nula' : c;
        break;
      case 2:
        if (c === 1 && poslednicislo !== 0) {
          arrcislo[i + 1] = 'náct';
          c = slovnik.nact[poslednicislo];
        } else {
          c = slovnik.desitky[c] + ' ';
        }
        break;
      case 3:
        c = slovnik.stovky[c] + ' ';
        break;
      case 4:
        c = c === 1 ? slovnik.tisice[c] : slovnik.jednotky[c] + ' ' + slovnik.tisice[c];
        c += ' ';
        break;
    }
    arrcislo[i] = c;
  }
  var spaceAllowed = false;
  var posledniupravy = arrcislo
    .join('')
    .split('')
    .filter(function(e) {
      if (e !== ' ') {
        spaceAllowed = true;
        return true;
      }
      if (spaceAllowed === true) {
        spaceAllowed = false;
        return true;
      }
    })
    .join('');
  if (posledniupravy[posledniupravy.length - 1] === ' ') {
    posledniupravy = posledniupravy.slice(0, posledniupravy.length - 1);
  }
  if (zaporne) {
    posledniupravy = 'mínus ' + posledniupravy;
  }
  return posledniupravy;
}
module.exports = cislonaslova;
