
const navButton=document.querySelector('#menuButton'),navLinks=document.querySelector('#navLinks');
if(navButton){navButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');navButton.setAttribute('aria-expanded',String(open))});navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')))}
function toast(text){const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),3200)}
document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();toast('Демонстрация: заявка не отправлена. Для настоящих заявок нужен сервер или сервис форм.');form.reset()}));

const products=[{"name": "iPhone 18 Pro", "category": "iPhone", "price": 79000}, {"name": "iPhone 18 Pro Max", "category": "iPhone", "price": 83200}, {"name": "iPhone Duo", "category": "iPhone", "price": 87400}, {"name": "iPhone Air", "category": "iPhone", "price": 91600}, {"name": "iPhone 17", "category": "iPhone", "price": 95800}, {"name": "iPhone 17e", "category": "iPhone", "price": 100000}, {"name": "iPhone 16", "category": "iPhone", "price": 104200}, {"name": "iPhone 16 Plus", "category": "iPhone", "price": 108400}, {"name": "iPhone 16e", "category": "iPhone", "price": 112600}, {"name": "iPhone 15", "category": "iPhone", "price": 116800}, {"name": "iPhone 15 Plus", "category": "iPhone", "price": 121000}, {"name": "MacBook Neo", "category": "Mac", "price": 99000}, {"name": "MacBook Air 13″ M5", "category": "Mac", "price": 103200}, {"name": "MacBook Air 15″ M5", "category": "Mac", "price": 107400}, {"name": "MacBook Pro 14″ M6", "category": "Mac", "price": 111600}, {"name": "MacBook Pro 14″ M5", "category": "Mac", "price": 115800}, {"name": "MacBook Pro 16″ M5 Pro / Max", "category": "Mac", "price": 120000}, {"name": "iMac", "category": "Mac", "price": 124200}, {"name": "Mac mini", "category": "Mac", "price": 128400}, {"name": "Mac Studio", "category": "Mac", "price": 132600}, {"name": "Mac Pro", "category": "Mac", "price": 136800}, {"name": "iPad Pro", "category": "iPad", "price": 39000}, {"name": "iPad Air", "category": "iPad", "price": 43200}, {"name": "iPad", "category": "iPad", "price": 47400}, {"name": "iPad mini", "category": "iPad", "price": 51600}, {"name": "AirPods 5", "category": "AirPods", "price": 15900}, {"name": "AirPods Pro 3", "category": "AirPods", "price": 20100}, {"name": "AirPods Max 2", "category": "AirPods", "price": 24300}, {"name": "AirPods 4", "category": "AirPods", "price": 28500}, {"name": "Apple Watch Series 12", "category": "Watch", "price": 29900}, {"name": "Apple Watch Ultra 4", "category": "Watch", "price": 34100}, {"name": "Apple Watch SE 3", "category": "Watch", "price": 38300}, {"name": "Apple Vision Pro", "category": "Other", "price": 9900}, {"name": "AirTag", "category": "Other", "price": 14100}, {"name": "Apple TV 4K", "category": "Other", "price": 18300}, {"name": "HomePod", "category": "Other", "price": 22500}, {"name": "HomePod mini", "category": "Other", "price": 26700}, {"name": "Apple Pencil Pro", "category": "Other", "price": 30900}, {"name": "Magic Keyboard", "category": "Other", "price": 35100}, {"name": "Studio Display", "category": "Other", "price": 39300}];
const categories=['Все','iPhone','Mac','iPad','AirPods','Watch','Other'];
const names={'Other':'Другое'};
let active='Все',view='all';
function read(key){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}}
let favorites=read('itech_favorites'),cart=read('itech_cart');
function save(){localStorage.setItem('itech_favorites',JSON.stringify(favorites));localStorage.setItem('itech_cart',JSON.stringify(cart))}
const grid=document.getElementById('productGrid'),filterBox=document.getElementById('filters'),search=document.getElementById('search');
function render(){
 filterBox.replaceChildren();
 categories.forEach(c=>{let b=document.createElement('button');b.className='chip'+(c===active?' active':'');b.textContent=names[c]||c;b.onclick=()=>{active=c;render()};filterBox.append(b)});
 let term=search.value.trim().toLowerCase();
 let list=products.filter(p=>(active==='Все'||p.category===active)&&p.name.toLowerCase().includes(term)&&(view==='all'||(view==='fav'?favorites:cart).includes(p.name)));
 grid.replaceChildren();
 for(const p of list){
 const card=document.createElement('article');card.className='product';
 const img=document.createElement('img');img.src='assets/'+p.category+'.svg';img.alt='Авторская иллюстрация категории '+p.category;img.loading='lazy';
 const info=document.createElement('div');info.className='product-info';
 const small=document.createElement('small');small.textContent=names[p.category]||p.category;
 const h=document.createElement('h3');h.textContent=p.name;
 const price=document.createElement('strong');price.textContent='от '+p.price.toLocaleString('ru-RU')+' ₽*';
 const buttons=document.createElement('div');buttons.className='product-buttons';
 const fav=document.createElement('button');fav.textContent=favorites.includes(p.name)?'♥ В избранном':'♡ Избранное';fav.className=favorites.includes(p.name)?'added':'';
 fav.onclick=()=>{favorites=favorites.includes(p.name)?favorites.filter(n=>n!==p.name):[...favorites,p.name];save();render()};
 const add=document.createElement('button');add.textContent=cart.includes(p.name)?'✓ В корзине':'+ В корзину';add.className=cart.includes(p.name)?'added':'';
 add.onclick=()=>{cart=cart.includes(p.name)?cart.filter(n=>n!==p.name):[...cart,p.name];save();render();toast('Корзина демонстрационная: реальные покупки недоступны')};
 buttons.append(fav,add);info.append(small,h,price,buttons);card.append(img,info);grid.append(card);
 }
 document.getElementById('resultCount').textContent='Найдено товаров: '+list.length;
 document.getElementById('empty').hidden=list.length!==0;
 document.getElementById('favCount').textContent=favorites.length;
 document.getElementById('cartCount').textContent=cart.length;
 [['showAll','all'],['showFavorites','fav'],['showCart','cart']].forEach(([id,v])=>document.getElementById(id).classList.toggle('selected',view===v));
}
search.addEventListener('input',render);
document.getElementById('showAll').onclick=()=>{view='all';render()};
document.getElementById('showFavorites').onclick=()=>{view='fav';render()};
document.getElementById('showCart').onclick=()=>{view='cart';render()};
render();
