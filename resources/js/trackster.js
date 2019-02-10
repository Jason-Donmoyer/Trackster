var Trackster = {};

const API_KEY = '0fba86198a98e565ff819deb78d65a7d';

$(document).ready(function() {
  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('#search-input').val());
  });
});
/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {
  let $trackList = $('#track-list');

  $trackList.empty();

  for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    let track = tracks[trackIndex];
    let mediumAlbumArt = track.image[1]['#text'];
    let htmlTrackRow =
    '<div class="row track">' + 
      '<div class="col-xs-1 col-xs-offset-1 play-button">' + 
        '<a href="' + track.url + '" target="_blank">' +
          '<i class="fa fa-play-circle-o fa-2x"></i>' +
        '</a>' +
      '</div>' +
      '<div class="col-xs-4">' + track.name + '</div>' +
      '<div class="col-xs-2">' + track.artist + '</div>' +
      '<div class="col-xs-2"><img src="' + mediumAlbumArt + '"></div>' +
      '<div class="col-xs-2">' + track.listeners + '</div>' +
    '</div>';

    $trackList.append(htmlTrackRow);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
    success: function(response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};