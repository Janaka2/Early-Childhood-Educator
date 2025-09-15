// Load external scripts dynamically
function loadScript(src){
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

(function(){
  const isDE = /\/de\//.test(location.pathname);
  const inLang = /(\/en\/|\/de\/)/.test(location.pathname);
  const depth = inLang ? '../' : ''; // for root vs language folder

  document.addEventListener('DOMContentLoaded', async () => {
    try{
      await loadScript('https://unpkg.com/aos@2.3.1/dist/aos.js');
      await loadScript('https://unpkg.com/feather-icons');
      if (window.AOS) AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
      if (window.feather) feather.replace();
    }catch(e){ console.warn('Lib load error', e); }

    // Consent banner (DE/EN)
    const consentKey = 'll-photo-consent-v1';
    if(!localStorage.getItem(consentKey)){
      const bar = document.createElement('div');
      bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#fff8e1;border-top:2px solid #ffd166;padding:12px;z-index:50';
      const msg = isDE
        ? 'Wir verwenden Fotos nur mit schriftlicher Einwilligung der Eltern. Einstellungen jederzeit änderbar.'
        : 'We use photos only with prior written parental consent. You can change preferences anytime.';
      const privacyHref = depth + (isDE ? 'de' : 'en') + '/legal/privacy.html';
      bar.innerHTML = `
        <div class="container mx-auto px-6 text-sm flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>${msg}</span>
          <div class="flex gap-2">
            <button id="consent-ok" class="btn-playful px-4 py-2 tw-bg-primary text-white">OK</button>
            <a href="${privacyHref}" class="underline">${isDE ? 'Datenschutz' : 'Privacy'}</a>
          </div>
        </div>`;
      document.body.appendChild(bar);
      document.getElementById('consent-ok').onclick = () => { localStorage.setItem(consentKey, '1'); bar.remove(); };
    }
  });
})();