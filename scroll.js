// Show or hide the back-to-top button
$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    $('#back-to-top').fadeIn();
  } else {
    $('#back-to-top').fadeOut();
  }
});

// Scroll to top when the button is clicked
$('#back-to-top').click(function(e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 0);
  window.location.href = '#';
  return false;
});
