<script>
async function inject(selector, url){
  const host=document.querySelector(selector);
  if(!host) return;
  try{ const res=await fetch(url,{cache:'no-store'}); host.innerHTML=await res.text(); }
  catch(e){ console.warn('Include failed', url, e); }
}
window.addEventListener('DOMContentLoaded',()=>{
  inject('#site-header','/partials/header.html');
  inject('#site-footer','/partials/footer.html');
});
</script>
