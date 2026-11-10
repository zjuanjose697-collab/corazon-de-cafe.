// Corazón de Café: carta y panel de edición.
// DEMO: la clave se valida en el navegador y no protege datos en un servidor.
const ADMIN_PASSWORD = "XIOMY123";
const STORAGE_KEY = "corazonCafeMenuEditsV1";
const categories = [
 {id:"bebidas",label:"☕ Bebidas",title:"Bebidas"},
 {id:"limonadas",label:"🍋 Limonadas y especiales",title:"Limonadas y bebidas especiales"},
 {id:"jugos",label:"🥭 Jugos naturales",title:"Jugos naturales"},
 {id:"mecatos",label:"🍟 Mecatos",title:"Mecatos"},
 {id:"comidas",label:"🥐 Comidas",title:"Comidas"},
 {id:"reposteria",label:"🍰 Tortas y repostería",title:"Tortas y repostería"},
 {id:"helados",label:"🍨 Helados y postres",title:"Helados y postres"},
 {id:"embotelladas",label:"🥤 Otras bebidas",title:"Otras bebidas"},
 {id:"licores",label:"🍺 Licores",title:"Licores"}
];
const products = [
 ["Cappuccino caliente",7000,"bebidas"],["Cappuccino frío",8000,"bebidas"],["Café en leche",3000,"bebidas"],["Café pequeño",2000,"bebidas"],["Café doble",4000,"bebidas"],["Malteadas",null,"bebidas"],["Chocolate",3000,"bebidas"],["Chocolate en leche",4000,"bebidas"],["Aromáticas (sobre o panela)",2000,"bebidas"],["Milo",6000,"bebidas"],["Jugo en leche",8000,"bebidas"],["Jugo en agua",7000,"bebidas"],["Té blanco",7000,"bebidas"],["Té negro",7000,"bebidas"],
 ["Limonada de mandarina",null,"limonadas"],["Limonada de cereza",null,"limonadas"],["Mango piña",null,"limonadas"],["Mango viche",null,"limonadas"],["Coco",null,"limonadas"],["Coco café",null,"limonadas"],["Frutos rojos",null,"limonadas"],["Uva",null,"limonadas"],["Hierbabuena",null,"limonadas"],["Piña con hierbabuena",null,"limonadas"],
 ["Jugo natural de mango",null,"jugos"],["Jugo natural de maracuyá",null,"jugos"],["Jugo natural de mora",null,"jugos"],["Jugo natural de tomate de árbol",null,"jugos"],
 ["Papitas artesanales — limón",8000,"mecatos"],["Papitas artesanales — pimienta",8000,"mecatos"],["Papitas artesanales — natural",8000,"mecatos"],["Papitas artesanales — chicharrón",8000,"mecatos"],["Rosquitas",null,"mecatos"],["Papitas",4000,"mecatos"],["Doritos",4000,"mecatos"],["Cheesetris",4000,"mecatos"],["De Todito",4000,"mecatos"],["Platanitos",4000,"mecatos"],["Boliqueso",2500,"mecatos"],["Chokis",2500,"mecatos"],["Galletas",2500,"mecatos"],["Limón miel",null,"mecatos"],["Mayonesa",null,"mecatos"],["Barbiquio chicharrón",null,"mecatos"],
 ["Pasteles",7000,"comidas"],["Palitos",7000,"comidas"],["Sándwich",null,"comidas"],["Croissant",4000,"comidas"],["Chorizos",null,"comidas"],["Omelette",null,"comidas"],
 ["Almojábana",null,"reposteria"],["Torta de café",8000,"reposteria"],["Torta de chocolate",8000,"reposteria"],["Torta de zanahoria",8000,"reposteria"],["Torta Red Velvet",8000,"reposteria"],["Alfajores",null,"reposteria"],["Galletas de chocolate",null,"reposteria"],["Canelazos",null,"reposteria"],
 ["Chococono",5000,"helados"],["Turrones",6000,"helados"],["Paleta en agua",2500,"helados"],["Paleta de mango",6000,"helados"],["Paleta de piña",6000,"helados"],["Paleta tres leches",7000,"helados"],["Paleta Tosh frutos rojos",7000,"helados"],["Bocato",8000,"helados"],["Galleta",5000,"helados"],["Bola de helado",2500,"helados"],["Brownie con helado",6000,"helados"],["Postre de frutos rojos",null,"helados"],["Postre de maracuyá",null,"helados"],["Postre de galletas",null,"helados"],
 ["Botella grande de agua",4000,"embotelladas"],["Botella pequeña de agua",3000,"embotelladas"],["Soda",4000,"embotelladas"],["Soda rosada",7000,"embotelladas"],["Soda verde",7000,"embotelladas"],["Electrolit",12000,"embotelladas"],["Vive 100",6000,"embotelladas"],["Saviloe",4000,"embotelladas"],["Del Valle",4000,"embotelladas"],["Agua saborizada",4000,"embotelladas"],["Monster",12000,"embotelladas"],
 ["Poker",null,"licores"],["Águila",null,"licores"],["Pilsen",null,"licores"],["Corona",null,"licores"],["Coronita",null,"licores"],["Costeñita",null,"licores"],["Budweiser",null,"licores"],["Cordillera rosada",null,"licores"],["Cordillera verde",null,"licores"],["Cordillera roja",null,"licores"],["Club Colombia",null,"licores"],["Club Colombia lata",null,"licores"],["Stella",null,"licores"],["Like",null,"licores"],["Smirnoff media",null,"licores"],["Copa de vino",null,"licores"],["Buchanan’s",null,"licores"],["Aguardiente media",null,"licores"],["Aguardiente botella",null,"licores"]
];
const $ = id => document.getElementById(id);
const menuGrid=$("menuGrid"), categoryBar=$("categoryBar"), sectionTitle=$("sectionTitle"), itemCount=$("itemCount");
let activeCategory="bebidas", edits=loadEdits(), selectedPhotoData=null;

function loadEdits(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}catch{return {}}}
function saveEdits(){localStorage.setItem(STORAGE_KEY,JSON.stringify(edits))}
function productKey(p){return p[2]+"::"+p[0]}
function productState(p){return {...{name:p[0],price:p[1],category:p[2],photo:null},...(edits[productKey(p)]||{})}}
function money(n){return n==null||n===""?"Consultar":"$"+Number(n).toLocaleString("es-CO")}
function renderCategories(){
 categoryBar.innerHTML=categories.map(c=>`<button class="category-btn ${c.id===activeCategory?"active":""}" data-id="${c.id}">${c.label}</button>`).join("");
 categoryBar.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.id;renderCategories();renderProducts()}));
}
function renderProducts(){
 const cat=categories.find(c=>c.id===activeCategory), list=products.filter(p=>p[2]===activeCategory);
 sectionTitle.textContent=cat.title; itemCount.textContent=`${list.length} productos`;
 menuGrid.innerHTML=list.map(p=>{
   const s=productState(p);
   const img=s.photo?`<img class="product-image" src="${s.photo}" alt="${s.name}">`:`<div class="product-image product-placeholder" aria-hidden="true">☕</div>`;
   return `<article class="menu-card">${img}<div class="product-info"><div class="item-name">${escapeHTML(s.name)}</div>${s.price==null||s.price===""?'<div class="item-note">Consulta disponibilidad y precio</div>':""}</div><span class="price ${s.price==null||s.price===""?"ask":""}">${money(s.price)}</span></article>`;
 }).join("");
}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function openModal(){$("adminModal").hidden=false;document.body.classList.add("modal-open");$("loginView").hidden=false;$("editorView").hidden=true;$("adminPassword").value="";$("loginError").textContent="";setTimeout(()=>$("adminPassword").focus(),50)}
function closeModal(){$("adminModal").hidden=true;document.body.classList.remove("modal-open");selectedPhotoData=null;$("productPhoto").value=""}
$("openAdmin").addEventListener("click",openModal);
$("closeAdmin").addEventListener("click",closeModal);
$("adminModal").addEventListener("click",e=>{if(e.target===$("adminModal"))closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("adminModal").hidden)closeModal()});
$("loginForm").addEventListener("submit",e=>{
 e.preventDefault();
 if($("adminPassword").value===ADMIN_PASSWORD){$("loginView").hidden=true;$("editorView").hidden=false;populateSelector();loadSelectedProduct()}
 else $("loginError").textContent="La contraseña no es correcta. Intenta de nuevo.";
});
function populateSelector(){
 $("productSelector").innerHTML=products.map((p,i)=>`<option value="${i}">${escapeHTML(p[0])} — ${categories.find(c=>c.id===p[2]).title}</option>`).join("");
}
function currentProduct(){return products[Number($("productSelector").value)||0]}
function loadSelectedProduct(){
 const p=currentProduct(),s=productState(p);selectedPhotoData=null;
 $("productPrice").value=s.price==null?"":s.price;
 $("productPhoto").value="";$("saveStatus").textContent="";
 showPreview(s.photo);
}
function showPreview(src){
 const preview=$("editPreview");
 preview.innerHTML=src?`<img src="${src}" alt="Vista previa de la foto">`:"<span>Sin foto seleccionada</span>";
}
$("productSelector").addEventListener("change",loadSelectedProduct);
$("productPhoto").addEventListener("change",e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 if(!file.type.startsWith("image/")){$("saveStatus").textContent="Selecciona un archivo de imagen.";return}
 if(file.size>1.5*1024*1024){$("saveStatus").textContent="La imagen supera 1,5 MB. Elige una imagen más pequeña.";e.target.value="";return}
 const reader=new FileReader();
 reader.onload=()=>{selectedPhotoData=reader.result;showPreview(selectedPhotoData);$("saveStatus").textContent="Foto lista. Pulsa Guardar cambios."};
 reader.onerror=()=>{$("saveStatus").textContent="No se pudo leer la imagen."};
 reader.readAsDataURL(file);
});
$("saveProduct").addEventListener("click",()=>{
 const p=currentProduct(),key=productKey(p),raw=$("productPrice").value.trim();
 if(raw!==""&&(!Number.isFinite(Number(raw))||Number(raw)<0)){$("saveStatus").textContent="Escribe un precio válido.";return}
 const prior=productState(p);
 edits[key]={...prior,price:raw===""?null:Number(raw),photo:selectedPhotoData!==null?selectedPhotoData:prior.photo};
 try{saveEdits();renderProducts();$("saveStatus").textContent="Cambios guardados en este navegador."}
 catch(err){$("saveStatus").textContent="No se pudo guardar. La foto puede ser muy grande; prueba una imagen más pequeña.";return}
 loadSelectedProduct();
});
$("removePhoto").addEventListener("click",()=>{
 const p=currentProduct(),key=productKey(p),prior=productState(p);
 edits[key]={...prior,photo:null};selectedPhotoData=null;
 try{saveEdits();showPreview(null);renderProducts();$("saveStatus").textContent="Foto eliminada."}
 catch{$("saveStatus").textContent="No se pudo guardar el cambio."}
});
$("logout").addEventListener("click",()=>{closeModal()});
$("resetData").addEventListener("click",()=>{
 if(!confirm("¿Restablecer todos los precios y fotos editados en este navegador?"))return;
 edits={};localStorage.removeItem(STORAGE_KEY);renderProducts();loadSelectedProduct();$("saveStatus").textContent="Carta restablecida.";
});
$("exportData").addEventListener("click",()=>{
 const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),edits},null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="respaldo-corazon-de-cafe.json";a.click();URL.revokeObjectURL(url);
});
$("whatsappButton").href="https://wa.me/573001547647?text="+encodeURIComponent("Hola, Corazón de Café. Quisiera consultar la carta y hacer un pedido.");
renderCategories();renderProducts();
