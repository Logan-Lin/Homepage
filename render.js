function renderPublication(pub, type) {
  return `<div class="list-group-item px-0">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <p class="d-inline-block mb-0 venue-name ${type === 'primary' ? 'primary-text' : 'secondary-text'}">
                  ${pub.tags.join("<span class='text-muted'> | </span>")}
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
              <p class="d-inline-block mb-0 venue-name ${type === 'primary' ? 'primary-text' : 'secondary-text'}">
                ${project.tags.join("<span class='text-muted'> | </span>")}
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
              <p class="d-inline-block mb-0 venue-name ${type === 'primary' ? 'primary-text' : 'secondary-text'}">
                ${present.tags.join("<span class='text-muted'> | </span>")}
              </p>
              <div class="d-flex gap-2">
                ${renderLinks(present.links)}
              </div>
            </div>
            <h5 class="mb-1 paper-title">${present.title}</h5>
          </div>`;
}

function renderBlog(blog) {
  return `<div class="list-group-item px-0">
            <a class="mb-1 paper-title blog-link" href="/blog/html/${blog.path}.html">${blog.title}</a> | <span class="paper-title text-muted">${blog.badge}</span>
            <p class="card-text mb-auto tldr">${blog.tldr}</p>
          </div>`;
}

function renderLinks(links) {
  let linksHtml = '';
  for (const [key, url] of Object.entries(links)) {
    // Convert camelCase to Title Case (e.g., paperLink -> Paper)
    linksHtml += `<a class="link icon-link icon-link-hover paper-link link-secondary" href="${url}" target="_blank" rel="noopener noreferrer">${key}</a>`;
  }
  return linksHtml;
}

function renderList(list) {
  return `<ul class="mb-2 px-2 px-md-4">
            ${list.map(item => `<li class="">${item}</li>`).join("")}
          </ul>`;
}