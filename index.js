$(document).ready(function() {
  const $primaryPublicationsContainer = $("#primary-publications");
  const $secondaryPublicationsContainer = $("#secondary-publications");
  if ($primaryPublicationsContainer.length) {
    $primaryPublicationsContainer.html(profileData.primaryPublications.slice(0, 10).map(pub => renderPublication(pub, 'primary')).join(""));
  }
  if ($secondaryPublicationsContainer.length) {
    $secondaryPublicationsContainer.html(profileData.secondaryPublications.slice(0, 10).map(pub => renderPublication(pub, 'secondary')).join(""));
  }

  const $primaryProjectsContainer = $("#primary-projects");
  const $secondaryProjectsContainer = $("#secondary-projects");
  if ($primaryProjectsContainer.length) {
    $primaryProjectsContainer.html(profileData.primaryProjects.slice(0, 3).map(project => renderProject(project, 'primary')).join(""));
  }
  if ($secondaryProjectsContainer.length) {
    $secondaryProjectsContainer.html(profileData.secondaryProjects.slice(0, 3).map(project => renderProject(project, 'secondary')).join(""));
  }

  const $presentationsContainer = $("#presentation-list");
  if ($presentationsContainer.length) {
    $presentationsContainer.html(profileData.presentations.slice(0, 5).map(presentation => renderPresentation(presentation, 'primary')).join(""));
  }

  const $servicesContainer = $("#service-list");
  if ($servicesContainer.length) {
    $servicesContainer.html(renderList(profileData.services));
  }

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
});
