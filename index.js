function renderPublication(pub, type) {
  return `<div class="row g-0 border rounded overflow-hidden flex-md-row mb-2 position-relative">
            <div class="col d-flex flex-column position-static paper-container">
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
            </div>
          </div>`;
}

function renderLinks(links) {
  let linksHtml = '';
  for (const [key, url] of Object.entries(links)) {
    // Convert camelCase to Title Case (e.g., paperLink -> Paper)
    linksHtml += `<a class="icon-link icon-link-hover paper-link" href="${url}" target="_blank" rel="noopener noreferrer">${key}</a>`;
  }
  return linksHtml;
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
});
