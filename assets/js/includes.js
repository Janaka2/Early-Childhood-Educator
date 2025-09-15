// Inject header/footer with language-aware, relative paths
async function inject(selector, url){
  const host = document.querySelector(selector);
  if(!host) return;
  try{
    const res = await fetch(url, { cache: 'no-store' });
    host.innerHTML = await res.text();
    // Replace feather icons if available
    if (window.feather) window.feather.replace();
  }catch(e){
    console.warn('Include failed', url, e);
  }
}

(function(){
  const inLang = /(\/en\/|\/de\/)/.test(location.pathname);
  const isDE = /\/de\//.test(location.pathname);
  const prefix = inLang ? '../' : '';
  const partDir = isDE ? 'partials-de' : 'partials-en';
  window.addEventListener('DOMContentLoaded', () => {
    inject('#site-header', prefix + partDir + '/header.html');
    inject('#site-footer', prefix + partDir + '/footer.html');
  });
})();