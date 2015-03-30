function initAutoComplete() {
  var inputStart = /** @type {HTMLInputElement} */(
    document.getElementById('form_start'));
  var inputEnd   = /** @type {HTMLInputElement} */(
    document.getElementById('form_end'));
  var options = {
    types: []
  };

  var autocomplete_start = new google.maps.places.Autocomplete(inputStart, options);
  var autocomplete_end   = new google.maps.places.Autocomplete(inputEnd, options);
}

google.maps.event.addDomListener(window, 'load', initAutoComplete);
