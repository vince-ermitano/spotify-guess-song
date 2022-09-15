// var fetch = require('node-fetch');

const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
const button3 = document.querySelector('.button3');
const button4 = document.querySelector('.button4');

button1.querySelector('p').innerHTML = '20 Min';
button2.querySelector('p').innerHTML = 'Houstonfornication';
button3.querySelector('p').innerHTML = 'TSU';
button4.querySelector('p').innerHTML = 'Bound 2';

console.log(button1.querySelector('p').innerHTML);

const answer = 'TSU';

const buttons = document.querySelectorAll('.button');
access_token = "BQBdDto88h9yGJlfLf-IcA7-9F_1TAKBR4115Dopgo5BhNVTXXoXDw47Srmo0qex_kp1T5hCerQ8bG3bBp6X8J0h75QzilFbi6jCmt36DhnS9lcgZJpqD31SaH4yQfl6c_oS0rfN7UbqS338Q7FrqtnyfvX3V4JMj4lGDSHGEPG_LBsLN0KAU8QW_AyqTa07828plrqW";
let deviceId;

const baseUrl = "https://api.spotify.com/v1/";

function checkIfAnswerCorrect(event) {
    if (event.currentTarget.querySelector('p').innerHTML === answer) {
        event.currentTarget.style.backgroundColor = 'green';
    } else {
        event.currentTarget.style.backgroundColor = 'red';
    }
    buttons.forEach(button => {
        button.removeEventListener('click', checkIfAnswerCorrect);
        button.removeEventListener('mouseenter', changeBackgroundToAqua);
        button.removeEventListener('mouseleave', changeBackgroundRevert)
    })
}

function changeBackgroundToAqua(event) {
    event.currentTarget.style.backgroundColor = 'aquamarine';
}

function changeBackgroundRevert(event) {
    event.currentTarget.style.backgroundColor = 'white';
}

//add event listener for all buttons 
buttons.forEach(button => {
    button.addEventListener('mouseenter', changeBackgroundToAqua);
    button.addEventListener('mouseleave', changeBackgroundRevert);
    button.addEventListener('click', checkIfAnswerCorrect);
});

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = access_token;
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(access_token); },
      volume: 0.5
    });

    console.log(player);

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        deviceId = device_id;
        console.log(deviceId);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => { 
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });s

    player.connect();

    document.getElementById('togglePlay').onclick = function() {
        player.togglePlay();
    };
    document.getElementById('nextTrack').onclick = function() {
        player.nextTrack();
    };

    const play = ({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken
          }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      };

    document.getElementById('test').onclick = function() {
        console.log('please');
        play({
            playerInstance: player,
            spotify_uri: 'spotify:track:59JWp4PjZ9TRM8cmtaDYB1',
          });
    }

}


// // Ready
// player.addListener('ready', ({ device_id }) => {
//     console.log('Ready with Device ID', device_id);
//   });

//   // Not Ready
// player.addListener('not_ready', ({ device_id }) => {
//     console.log('Device ID has gone offline', device_id);
//   });

// player.addListener('initialization_error', ({ message }) => { 
//     console.error(message);
// });

// player.addListener('authentication_error', ({ message }) => {
//     console.error(message);
// });

// player.addListener('account_error', ({ message }) => {
//     console.error(message);
// });

// player.connect();

// const play = ({
//     spotify_uri,
//     playerInstance: {
//       _options: {
//         getOAuthToken
//       }
//     }
//   }) => {
//     getOAuthToken(access_token => {
//       fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({ uris: [spotify_uri] }),
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${access_token}`
//         },
//       });
//     });
//   };
  
//   play({
//     playerInstance: new Spotify.Player({ name: "..." }),
//     spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
//   });
