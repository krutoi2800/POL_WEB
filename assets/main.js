document.querySelectorAll('[data-local-photo]').forEach(img=>{let filename=img.dataset.localPhoto;let test=new Image();test.onload=()=>{img.src='assets/'+filename;img.parentElement.classList.add('loaded')};test.src='assets/'+filename});
const search=document.querySelector('#search');if(search){const categories=['Все','iPhone','Mac','iPad','AirPods','Watch','Другое'];const products=[{"name": "iPhone 18 Pro", "category": "iPhone"}, {"name": "iPhone 18 Pro Max", "category": "iPhone"}, {"name": "iPhone Duo", "category": "iPhone"}, {"name": "iPhone Air", "category": "iPhone"}, {"name": "iPhone 17", "category": "iPhone"}, {"name": "iPhone 17e", "category": "iPhone"}, {"name": "iPhone 16", "category": "iPhone"}, {"name": "iPhone 16 Plus", "category": "iPhone"}, {"name": "iPhone 16e", "category": "iPhone"}, {"name": "iPhone 15", "category": "iPhone"}, {"name": "iPhone 15 Plus", "category": "iPhone"}, {"name": "MacBook Neo", "category": "Mac"}, {"name": "MacBook Air 13″ M5", "category": "Mac"}, {"name": "MacBook Air 15″ M5", "category": "Mac"}, {"name": "MacBook Pro 14″ M6", "category": "Mac"}, {"name": "MacBook Pro 14″ M5", "category": "Mac"}, {"name": "MacBook Pro 16″ M5 Pro / Max", "category": "Mac"}, {"name": "iMac", "category": "Mac"}, {"name": "Mac mini", "category": "Mac"}, {"name": "Mac Studio", "category": "Mac"}, {"name": "Mac Pro", "category": "Mac"}, {"name": "iPad Pro", "category": "iPad"}, {"name": "iPad Air", "category": "iPad"}, {"name": "iPad", "category": "iPad"}, {"name": "iPad mini", "category": "iPad"}, {"name": "AirPods 5", "category": "AirPods"}, {"name": "AirPods Pro 3", "category": "AirPods"}, {"name": "AirPods Max 2", "category": "AirPods"}, {"name": "Apple Watch Series 12", "category": "Watch"}, {"name": "Apple Watch Ultra 4", "category": "Watch"}, {"name": "Apple Watch SE 3", "category": "Watch"}, {"name": "Apple Vision Pro", "category": "Другое"}, {"name": "AirTag", "category": "Другое"}, {"name": "Apple TV 4K", "category": "Другое"}, {"name": "HomePod", "category": "Другое"}, {"name": "HomePod mini", "category": "Другое"}, {"name": "Apple Pencil Pro", "category": "Другое"}, {"name": "Magic Keyboard", "category": "Другое"}, {"name": "Studio Display", "category": "Другое"}];let filter='Все',view='all';let fav=JSON.parse(localStorage.getItem('poly_fav')||'[]'),cart=JSON.parse(localStorage.getItem('poly_cart')||'[]');const grid=document.querySelector('#productGrid'),filters=document.querySelector('#filters');const icons={'iPhone':'📱','Mac':'💻','iPad':'▣','AirPods':'🎧','Watch':'⌚','Другое':'✦'};function save(){localStorage.setItem('poly_fav',JSON.stringify(fav));localStorage.setItem('poly_cart',JSON.stringify(cart))}function render(){filters.innerHTML='';categories.forEach(c=>{const b=document.createElement('button');b.className='chip'+(filter===c?' active':'');b.textContent=c;b.onclick=()=>{filter=c;render()};filters.append(b)});grid.innerHTML='';let items=products.filter(p=>(filter==='Все'||p.category===filter)&&p.name.toLowerCase().includes(search.value.toLowerCase())&&(view==='all'||(view==='fav'?fav:cart).includes(p.name)));items.forEach(p=>{const d=document.createElement('article');d.className='product';const visual=document.createElement('div');visual.className='product-visual';visual.textContent=icons[p.category];const name=document.createElement('strong');name.textContent=p.name;const cat=document.createElement('small');cat.textContent=p.category;const actions=document.createElement('div');actions.className='actions';const add=document.createElement('button');add.textContent=cart.includes(p.name)?'✓ В корзине':'+ В корзину';add.onclick=()=>{cart=cart.includes(p.name)?cart.filter(n=>n!==p.name):[...cart,p.name];save();render()};const like=document.createElement('button');like.textContent=fav.includes(p.name)?'♥':'♡';like.setAttribute('aria-label','Избранное');like.onclick=()=>{fav=fav.includes(p.name)?fav.filter(n=>n!==p.name):[...fav,p.name];save();render()};actions.append(add,like);d.append(visual,name,cat,actions);grid.append(d)});if(!items.length)grid.textContent='По вашему запросу ничего не найдено.';document.querySelector('#favCount').textContent=fav.length;document.querySelector('#cartCount').textContent=cart.length}search.addEventListener('input',render);document.querySelector('#showFav').onclick=()=>{view='fav';render()};document.querySelector('#showCart').onclick=()=>{view='cart';render()};document.querySelector('#showAll').onclick=()=>{view='all';filter='Все';search.value='';render()};render()}
// Public browser key: protected by Supabase RLS. Never place secret/service_role keys here.
const SUPABASE_URL='https://buumftvmejfurrffncum.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_4qYC2Ax0fk-GPcC-mlC8Ig_EZFqwLiV';
const reviewForm=document.querySelector('#reviewForm');
if(reviewForm){
  const reviewStatus=document.querySelector('#reviewStatus');
  const reviewsList=document.querySelector('#reviewsList');
  const submitButton=reviewForm.querySelector('button[type="submit"],button');
  const endpoint=SUPABASE_URL+'/rest/v1/reviews';
  const headers={'apikey':SUPABASE_PUBLISHABLE_KEY,'Authorization':'Bearer '+SUPABASE_PUBLISHABLE_KEY};
  function showReview(review){
    const card=document.createElement('div');card.className='review';
    const name=document.createElement('b');name.textContent=review.name;
    const message=document.createElement('p');message.textContent=review.message;
    const date=document.createElement('small');date.textContent=new Date(review.created_at).toLocaleDateString('ru-RU');
    card.append(name,message,date);reviewsList.append(card);
  }
  async function loadReviews(){
    reviewsList.replaceChildren();
    const loading=document.createElement('p');loading.className='note';loading.textContent='Загружаем отзывы…';reviewsList.append(loading);
    try{
      const response=await fetch(endpoint+'?select=id,name,message,created_at&order=created_at.desc&limit=100',{headers});
      if(!response.ok)throw new Error('HTTP '+response.status);
      const reviews=await response.json();reviewsList.replaceChildren();
      if(!reviews.length){const empty=document.createElement('p');empty.className='note';empty.textContent='Пока нет отзывов. Вы можете оставить первый!';reviewsList.append(empty)}
      else reviews.forEach(showReview);
    }catch(error){reviewsList.replaceChildren();const note=document.createElement('p');note.className='note';note.textContent='Не удалось загрузить отзывы. Проверьте подключение к интернету и настройки Supabase.';reviewsList.append(note);console.error('Reviews load:',error)}
  }
  reviewForm.addEventListener('submit',async event=>{
    event.preventDefault();
    const data=new FormData(reviewForm);
    const name=String(data.get('name')||'').trim();
    const message=String(data.get('message')||'').trim();
    if(name.length<1||name.length>50||message.length<1||message.length>600){reviewStatus.textContent='Введите имя (до 50 символов) и отзыв (до 600 символов).';return}
    submitButton.disabled=true;reviewStatus.textContent='Отправляем отзыв…';
    try{
      const response=await fetch(endpoint,{method:'POST',headers:{...headers,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify({name,message})});
      if(!response.ok)throw new Error('HTTP '+response.status);
      reviewForm.reset();reviewStatus.textContent='Спасибо! Ваш отзыв опубликован.';await loadReviews();
    }catch(error){reviewStatus.textContent='Не удалось отправить отзыв. Попробуйте позже.';console.error('Reviews submit:',error)}
    finally{submitButton.disabled=false}
  });
  loadReviews();
}
const booking=document.querySelector('#bookingForm');if(booking)booking.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#bookingStatus').textContent='Демо-форма работает, но запись не отправлена. Для реальной записи нужен Telegram-бот или сервер.'});