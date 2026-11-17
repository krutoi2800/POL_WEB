
const navButton=document.querySelector('#menuButton'),navLinks=document.querySelector('#navLinks');
if(navButton){navButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');navButton.setAttribute('aria-expanded',String(open))});navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')))}
function toast(text){const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),3200)}
document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();toast('Демонстрация: заявка не отправлена. Для настоящих заявок нужен сервер или сервис форм.');form.reset()}));
document.querySelectorAll('[data-demo-order]').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.demoOrder+' — демонстрационное меню, заказ недоступен.')));