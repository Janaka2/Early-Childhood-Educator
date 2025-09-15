<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="https://unpkg.com/feather-icons"></script>
<script>
document.addEventListener('DOMContentLoaded',()=>{
  AOS.init({duration:800,easing:'ease-in-out',once:true});
  feather.replace();
  const consentKey='ll-photo-consent-v1';
  if(!localStorage.getItem(consentKey)){
    const bar=document.createElement('div');
    bar.style.cssText='position:fixed;bottom:0;left:0;right:0;background:#fff8e1;border-top:2px solid #ffd166;padding:12px;z-index:50';
    bar.innerHTML=`
      <div class="container mx-auto px-6 text-sm flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>Wir verwenden Fotos nur mit schriftlicher Einwilligung der Eltern. Einstellungen jederzeit änderbar.</span>
        <div class="flex gap-2">
          <button id="consent-ok" class="btn-playful px-4 py-2 tw-bg-primary text-white">OK</button>
          <a href="/de/legal/privacy.html" class="underline">Datenschutz</a>
        </div>
      </div>`;
    document.body.appendChild(bar);
    document.getElementById('consent-ok').onclick=()=>{ localStorage.setItem(consentKey,'1'); bar.remove(); };
  }
});
</script>
