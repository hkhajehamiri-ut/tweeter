/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "This is just to see what we can see here! Alors, on va jeter un coup d'oeil et decider quoi faire ensuite 🤪"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@willie"
//     },
//     "content": {
//       "text": "Je pense , donc je suis!"
//     },
//     "created_at": 1461113959088
//   }
// ]

//To escape the script tweets that could be sent by users and wipe the innerhtml
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const createTweetElement = function (tweetObject) {
  //using the escape function to get only the innerhtml of the user input and pass it into the p tag
  const $safeHtml = `<p id='tweet-text'>${escape(tweetObject.content.text)}</p>`;
  const markup =
    `<article class="tweet-container">
  <header class="tweet-header">

  <img src="${tweetObject.user.avatars}" alt="girl-avatar" class="tweet-avatar">
  <p id="user-name">${tweetObject.user.name}</p>
  <p id="user-handle">${tweetObject.user.handle}</p>
  </header>
    
${$safeHtml}
  
    <footer id="tweet-footer">
  <div id="icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
  <p id="time-stamp">${tweetObject.created_at}</p>
</footer>
    </article>`

  
  return markup;

}

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const $tweetContainer = $('.all-tweets');
  $tweetContainer.empty();
  for (const user of tweets) {
    $tweetContainer.prepend(createTweetElement(user));
  }
}
const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
}

$(document).ready(function () {

  loadTweets();
  $('#tweet-form').submit(function (event) {
    event.preventDefault();

      const $userTweet = $('#tweet-box');
      //Serialize gives a string
      const dataReceived = $('#tweet-form').serialize();
      if ($userTweet.val().length >= 140) {
        alert(`Your tweet is too long and can't be posted!`);
      } else if ($userTweet.val().length === 0) {
        alert(`Did you forget to type your tweet?`);
      } else {
        //$.ajax(route, data, cb(){}); 
        $.post('/tweets', dataReceived, function (){
          // TODO: clear text area I guess?
          loadTweets();
        });
      }
    });
  });

