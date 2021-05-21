$(document).ready(function() {
  console.log('connected');
});

const msg = $('#tweet-text');
msg.on("input", function() {
  let id = '#' + this.id;
  let count = $(id).val().length;
  let remainingCharacters = 140 - count;
  let characters = $(id).parent().find('.counter');
  
  if (remainingCharacters < 0) {
    characters.css('color', 'red');
    characters.val(remainingCharacters);
  } else {
    characters.css('color', 'black');
    characters.val(remainingCharacters);
  }
})