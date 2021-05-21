/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//The HTML template for the new tweet
const createTweetElement = function(tweetObj) {
  const header = 
  `<header>
    <div class='user'>
      <img src=${tweetObj.user.avatars}'>${tweetObj.user.name}
    </div>
    <span>${tweetObj.user.handle}</span>
  </header>`

  const footer = 
  `<footer>${timeago.format(tweetObj.created_at)}
    <span>
      <i class="far fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </span>
  </footer>`

  return `
    <article class='tweet'>
      ${header}
      ${escape(tweetObj.content.text)}
      ${footer}
    </article>
  `
}

//Prepends the tweets array into the main page body
const renderTweets = function(tweetsArr) {
  for (const tweet of tweetsArr) {
    const $tweet = createTweetElement(tweet);
    $('.tweet-container').prepend($tweet);
  }
  return;
}

//Modifies the form input so that everything is represented as text and not HTML
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Once the user hits submit their tweet will flow into the database
//The existing tweets will be cleared and reuploaded with the new tweet included at the top
const loadTweets = function() {
  $('.tweet-container').empty();
  $.get('/tweets', function(data) {
    renderTweets(data);
  })
}

//Loads initial tweets
loadTweets();

//Posts new tweets
$('.new-tweet form').submit(function(event) {
  const msg = $(this).serialize();

  if (msg === 'text=') {
    $('#error').text('Enter your tweet here');
    $('#error').slideDown();
  } else if ($('.counter').val() < 0) {
    $('#error').text('Your tweet cannot exceed 140 characters');
    $('#error').slideDown();
  } else {
    $('#error').css('display', 'none');
    $.post('/tweets', msg).then(() => {
      console.log('successful post');
      loadTweets();
    })
  }
  return event.preventDefault();
})


//When user hits the 'write a new tweet' it will display the tweet create section
$('.create-tweet').on("click", () => {
  return $('.new-tweet').slideToggle('slow')
})