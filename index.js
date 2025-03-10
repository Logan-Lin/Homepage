function renderPublication(pub, type) {
  return `<div class="list-group-item px-0">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <p class="d-inline-block mb-0 venue-name ${type === 'primary' ? 'text-danger-emphasis' : 'text-primary-emphasis'}">
                  ${pub.venue} <span class="text-muted">|</span> ${pub.year}
                </p>
                <div class="d-flex gap-2">
                  ${renderLinks(pub.links)}
                </div>
              </div>
              <h5 class="mb-1 paper-title">${pub.title}</h5>
              <p class="card-text mb-auto author-name">${pub.authors}</p>
            </div>`;
}

function renderProject(project, type) {
  return `<div class="list-group-item px-0">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <p class="d-inline-block mb-0 venue-name ${type === 'primary' ? 'text-danger-emphasis' : 'text-primary-emphasis'}">
                ${project.venue}
              </p>
              <div class="d-flex gap-2">
                ${renderLinks(project.links)}
              </div>
            </div>
            <h5 class="mb-1 paper-title">${project.title}</h5>
            <p class="card-text mb-auto project-desc">${project.desc}</p>
          </div>`;
}

function renderPresentation(present, type) {
  return `<div class="list-group-item px-0">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <p class="d-inline-block mb-0 venue-name ${type === 'primary' ? 'text-danger-emphasis' : 'text-primary-emphasis'}">
                ${present.venue} <span class="text-muted">|</span> ${present.location}
              </p>
              <div class="d-flex gap-2">
                ${renderLinks(present.links)}
              </div>
            </div>
            <h5 class="mb-1 paper-title">${present.title}</h5>
          </div>`;
}

function renderLinks(links) {
  let linksHtml = '';
  for (const [key, url] of Object.entries(links)) {
    // Convert camelCase to Title Case (e.g., paperLink -> Paper)
    linksHtml += `<a class="icon-link icon-link-hover paper-link link-secondary" href="${url}" target="_blank" rel="noopener noreferrer">${key}</a>`;
  }
  return linksHtml;
}

function renderList(list) {
  return `<ul class="mb-2 px-2 px-md-4">
            ${list.map(item => `<li class="">${item}</li>`).join("")}
          </ul>`;
}

$(document).ready(function() {
  const $primaryPublicationsContainer = $("#primary-publications");
  const $secondaryPublicationsContainer = $("#secondary-publications");
  if ($primaryPublicationsContainer.length) {
    $primaryPublicationsContainer.html(profileData.primaryPublications.map(pub => renderPublication(pub, 'primary')).join(""));
  }
  if ($secondaryPublicationsContainer.length) {
    $secondaryPublicationsContainer.html(profileData.secondaryPublications.map(renderPublication).join(""));
  }

  const $primaryProjectsContainer = $("#primary-projects");
  const $secondaryProjectsContainer = $("#secondary-projects");
  if ($primaryProjectsContainer.length) {
    $primaryProjectsContainer.html(profileData.primaryProjects.map(project => renderProject(project, 'primary')).join(""));
  }
  if ($secondaryProjectsContainer.length) {
    $secondaryProjectsContainer.html(profileData.secondaryProjects.map(renderProject).join(""));
  }

  const $presentationsContainer = $("#presentation-list");
  if ($presentationsContainer.length) {
    $presentationsContainer.html(profileData.presentations.map(presentation => renderPresentation(presentation, 'primary')).join(""));
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
    return false;
  });
});
