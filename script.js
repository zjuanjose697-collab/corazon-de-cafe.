
// CORAZÓN DE CAFÉ
// Carta digital y panel privado de administración.
// Las fotografías se comprimen y se guardan directamente en Firestore.

const ADMIN_PASSWORD = "XIOMY123";

const categories = [
  { id: "bebidas", label: "☕ Bebidas", title: "Bebidas" },
  { id: "limonadas", label: "🍋 Limonadas y especiales", title: "Limonadas y bebidas especiales" },
  { id: "jugos", label: "🥭 Jugos naturales", title: "Jugos naturales" },
  { id: "mecatos", label: "🍟 Mecatos", title: "Mecatos" },
  { id: "comidas", label: "🥐 Comidas", title: "Comidas" },
  { id: "reposteria", label: "🍰 Tortas y repostería", title: "Tortas y repostería" },
  { id: "helados", label: "🍨 Helados y postres", title: "Helados y postres" },
  { id: "embotelladas", label: "🥤 Otras bebidas", title: "Otras bebidas" },
  { id: "licores", label: "🍺 Licores", title: "Licores" }
];

const products = [
  ["Cappuccino caliente",7000,"bebidas"],
  ["Cappuccino frío",8000,"bebidas"],
  ["Café en leche",3000,"bebidas"],
  ["Café pequeño",2000,"bebidas"],
  ["Café doble",4000,"bebidas"],
  ["Malteadas",null,"bebidas"],
  ["Chocolate",3000,"bebidas"],
  ["Chocolate en leche",4000,"bebidas"],
  ["Aromáticas (sobre o panela)",2000,"bebidas"],
  ["Milo",6000,"bebidas"],
  ["Jugo en leche",8000,"bebidas"],
  ["Jugo en agua",7000,"bebidas"],
  ["Té blanco",7000,"bebidas"],
  ["Té negro",7000,"bebidas"],

  ["Limonada de mandarina",null,"limonadas"],
  ["Limonada de cereza",null,"limonadas"],
  ["Mango piña",null,"limonadas"],
  ["Mango viche",null,"limonadas"],
  ["Coco",null,"limonadas"],
  ["Coco café",null,"limonadas"],
  ["Frutos rojos",null,"limonadas"],
  ["Uva",null,"limonadas"],
  ["Hierbabuena",null,"limonadas"],
  ["Piña con hierbabuena",null,"limonadas"],

  ["Jugo natural de mango",null,"jugos"],
  ["Jugo natural de maracuyá",null,"jugos"],
  ["Jugo natural de mora",null,"jugos"],
  ["Jugo natural de tomate de árbol",null,"jugos"],

  ["Papitas artesanales — limón",8000,"mecatos"],
  ["Papitas artesanales — pimienta",8000,"mecatos"],
  ["Papitas artesanales — natural",8000,"mecatos"],
  ["Papitas artesanales — chicharrón",8000,"mecatos"],
  ["Rosquitas",null,"mecatos"],
  ["Papitas",4000,"mecatos"],
  ["Doritos",4000,"mecatos"],
  ["Cheesetris",4000,"mecatos"],
  ["De Todito",4000,"mecatos"],
  ["Platanitos",4000,"mecatos"],
  ["Boliqueso",2500,"mecatos"],
  ["Chokis",2500,"mecatos"],
  ["Galletas",2500,"mecatos"],
  ["Limón miel",null,"mecatos"],
  ["Mayonesa",null,"mecatos"],
  ["Barbiquio chicharrón",null,"mecatos"],

  ["Pasteles",7000,"comidas"],
  ["Palitos",7000,"comidas"],
  ["Sándwich",null,"comidas"],
  ["Croissant",4000,"comidas"],
  ["Chorizos",null,"comidas"],
  ["Omelette",null,"comidas"],

  ["Almojábana",null,"reposteria"],
  ["Torta de café",8000,"reposteria"],
  ["Torta de chocolate",8000,"reposteria"],
  ["Torta de zanahoria",8000,"reposteria"],
  ["Torta Red Velvet",8000,"reposteria"],
  ["Alfajores",null,"reposteria"],
  ["Galletas de chocolate",null,"reposteria"],
  ["Canelazos",null,"reposteria"],

  ["Chococono",5000,"helados"],
  ["Turrones",6000,"helados"],
  ["Paleta en agua",2500,"helados"],
  ["Paleta de mango",6000,"helados"],
  ["Paleta de piña",6000,"helados"],
  ["Paleta tres leches",7000,"helados"],
  ["Paleta Tosh frutos rojos",7000,"helados"],
  ["Bocato",8000,"helados"],
  ["Galleta",5000,"helados"],
  ["Bola de helado",2500,"helados"],
  ["Brownie con helado",6000,"helados"],
  ["Postre de frutos rojos",null,"helados"],
  ["Postre de maracuyá",null,"helados"],
  ["Postre de galletas",null,"helados"],

  ["Botella grande de agua",4000,"embotelladas"],
  ["Botella pequeña de agua",3000,"embotelladas"],
  ["Soda",4000,"embotelladas"],
  ["Soda rosada",7000,"embotelladas"],
  ["Soda verde",7000,"embotelladas"],
  ["Electrolit",12000,"embotelladas"],
  ["Vive 100",6000,"embotelladas"],
  ["Saviloe",4000,"embotelladas"],
  ["Del Valle",4000,"embotelladas"],
  ["Agua saborizada",4000,"embotelladas"],
  ["Monster",12000,"embotelladas"],

  ["Poker",null,"licores"],
  ["Águila",null,"licores"],
  ["Pilsen",null,"licores"],
  ["Corona",null,"licores"],
  ["Coronita",null,"licores"],
  ["Costeñita",null,"licores"],
  ["Budweiser",null,"licores"],
  ["Cordillera rosada",null,"licores"],
  ["Cordillera verde",null,"licores"],
  ["Cordillera roja",null,"licores"],
  ["Club Colombia",null,"licores"],
  ["Club Colombia lata",null,"licores"],
  ["Stella",null,"licores"],
  ["Like",null,"licores"],
  ["Smirnoff media",null,"licores"],
  ["Copa de vino",null,"licores"],
  ["Buchanan’s",null,"licores"],
  ["Aguardiente media",null,"licores"],
  ["Aguardiente botella",null,"licores"]
];

// ELEMENTOS HTML
const $ = id => document.getElementById(id);

const menuGrid = $("menuGrid");
const categoryBar = $("categoryBar");
const sectionTitle = $("sectionTitle");
const itemCount = $("itemCount");

// FUNCIÓN SLUG CORREGIDA
function slug(s) {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// CONFIGURACIÓN FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBQiAZiXpxigyp_NjtBPwlhtOeAagwGINY",
  authDomain: "corazon-de-cafe-ad08b.firebaseapp.com",
  projectId: "corazon-de-cafe-ad08b",
  messagingSenderId: "1050467610067",
  appId: "1:1050467610067:web:2f979cffa29ca3cb935326"
};

let db = null;
let auth = null;
let firebaseReady = false;

try {
  if (window.firebase) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    db = firebase.firestore();
    auth = firebase.auth();
    firebaseReady = true;
  }
} catch (error) {
  console.error("Firebase no pudo inicializarse:", error);
}

// VARIABLES DE LA CARTA
let activeCategory = "bebidas";
let selectedPhotoFile = null;
let remoteProducts = [];
let productsReady = false;

// PRODUCTOS PREDETERMINADOS
const defaultProducts = products.map((p, i) => ({
  id: `base_${i}`,
  originalDocId: slug(`${p[2]}-${p[0]}`),
  name: p[0],
  price: p[1],
  category: p[2],
  photoUrl: null,
  available: true,
  isDefault: true
}));

let allProducts = [...defaultProducts];

const money = n =>
  n == null || n === ""
    ? "Consultar"
    : "$" + Number(n).toLocaleString("es-CO");

function escapeHTML(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

// NORMALIZAR DOCUMENTOS DE FIRESTORE
function normalizedDoc(d) {
  const x = d.data();

  return {
    id: d.id,
    name: x.nombre || x.name || "Producto",
    price: x.precio ?? x.price ?? null,
    category: x.categoria || x.category || "bebidas",
    photoUrl: x.fotoUrl || x.photoUrl || x.foto || x.photo || null,
    available: x.disponible ?? x.available ?? true,
    isDefault: false
  };
}

// MOSTRAR CATEGORÍAS
function renderCategories() {
  categoryBar.innerHTML = categories.map(c => `
    <button
      class="category-btn ${c.id === activeCategory ? "active" : ""}"
      data-id="${c.id}"
      type="button">
      ${c.label}
    </button>
  `).join("");

  categoryBar.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.id;
      renderCategories();
      renderProducts();
    });
  });
}

// MOSTRAR PRODUCTOS
function renderProducts() {
  const cat = categories.find(c => c.id === activeCategory);

  const list = allProducts.filter(p =>
    p.category === activeCategory && p.available !== false
  );

  sectionTitle.textContent = cat?.title || "Productos";
  itemCount.textContent = `${list.length} productos`;

  menuGrid.innerHTML = list.map(p => {
    const img = p.photoUrl
      ? `<img class="product-image" src="${escapeHTML(p.photoUrl)}" alt="${escapeHTML(p.name)}" loading="lazy">`
      : `<div class="product-image product-placeholder" aria-hidden="true">☕</div>`;

    return `
      <article class="menu-card">
        ${img}
        <div class="product-info">
          <div class="item-name">${escapeHTML(p.name)}</div>
          ${
            p.price == null || p.price === ""
              ? '<div class="item-note">Consulta disponibilidad y precio</div>'
              : ""
          }
        </div>
        <span class="price ${p.price == null || p.price === "" ? "ask" : ""}">
          ${money(p.price)}
        </span>
      </article>
    `;
  }).join("");
}

// ACTUALIZAR PRODUCTOS DESDE FIRESTORE
function refreshProducts() {
  if (!db) {
    renderProducts();
    return;
  }

  db.collection("productos").onSnapshot(snapshot => {
    remoteProducts = snapshot.docs.map(normalizedDoc);

    const byId = new Map(remoteProducts.map(p => [p.id, p]));

    const defaults = defaultProducts.map(p => ({
      ...p,
      ...(byId.get(p.originalDocId) || {}),
      id: p.id,
      originalDocId: p.originalDocId,
      isDefault: true
    }));

    const defaultIds = new Set(defaultProducts.map(p => p.originalDocId));

    const extras = remoteProducts.filter(p => !defaultIds.has(p.id));

    allProducts = [...defaults, ...extras];
    productsReady = true;

    renderProducts();

    if (!$("editorView").hidden) {
      populateSelector();
    }
  }, error => {
    console.error("Error cargando productos:", error);
    renderProducts();
  });
}

// ABRIR Y CERRAR ADMINISTRACIÓN
function openModal() {
  $("adminModal").hidden = false;
  document.body.classList.add("modal-open");
  $("loginView").hidden = false;
  $("editorView").hidden = true;
  $("adminPassword").value = "";
  $("loginError").textContent = "";

  setTimeout(() => $("adminPassword").focus(), 50);
}

function closeModal() {
  $("adminModal").hidden = true;
  document.body.classList.remove("modal-open");
  selectedPhotoFile = null;
  $("productPhoto").value = "";
}

$("openAdmin").addEventListener("click", openModal);
$("closeAdmin").addEventListener("click", closeModal);

$("adminModal").addEventListener("click", e => {
  if (e.target === $("adminModal")) {
    closeModal();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !$("adminModal").hidden) {
    closeModal();
  }
});

// INICIAR SESIÓN
$("loginForm").addEventListener("submit", async e => {
  e.preventDefault();

  const email = $("adminEmail").value.trim();
  const password = $("adminPassword").value;

  if (!auth) {
    $("loginError").textContent =
      "Firebase no está conectado. Recarga la página e inténtalo de nuevo.";
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password);

    $("loginView").hidden = true;
    $("editorView").hidden = false;

    populateSelector();
    loadSelectedProduct();

  } catch (error) {
    console.error(error);

    $("loginError").textContent =
      "No se pudo iniciar sesión. Verifica el correo y la contraseña del administrador.";
  }
});

// SELECTOR DE PRODUCTOS
function populateSelector() {
  const sel = $("productSelector");
  const current = sel.value;

  sel.innerHTML = allProducts.map(p => `
    <option value="${escapeHTML(p.id)}">
      ${escapeHTML(p.name)} — ${
        escapeHTML(categories.find(c => c.id === p.category)?.title || p.category)
      }
    </option>
  `).join("");

  if (allProducts.some(p => p.id === current)) {
    sel.value = current;
  }
}

function currentProduct() {
  return allProducts.find(p => p.id === $("productSelector").value)
    || allProducts[0];
}

// CARGAR PRODUCTO SELECCIONADO
function loadSelectedProduct() {
  const p = currentProduct();

  if (!p) return;

  selectedPhotoFile = null;

  $("productName").value = p.name || "";
  $("productPrice").value = p.price ?? "";
  $("productPhoto").value = "";
  $("saveStatus").textContent = "";

  showPreview(p.photoUrl);
}

// VISTA PREVIA DE FOTOGRAFÍA
function showPreview(src) {
  const preview = $("editPreview");

  preview.innerHTML = src
    ? `<img src="${escapeHTML(src)}" alt="Vista previa de la foto">`
    : "<span>Sin foto seleccionada</span>";
}

$("productSelector").addEventListener("change", loadSelectedProduct);

// SELECCIONAR FOTOGRAFÍA
$("productPhoto").addEventListener("change", e => {
  const file = e.target.files && e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    $("saveStatus").textContent = "Selecciona un archivo de imagen.";
    e.target.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    $("saveStatus").textContent =
      "La imagen supera 10 MB. Elige una más pequeña.";
    e.target.value = "";
    return;
  }

  selectedPhotoFile = file;

  const reader = new FileReader();

  reader.onload = () => showPreview(reader.result);
  reader.readAsDataURL(file);

  $("saveStatus").textContent =
    "Foto lista. Se comprimirá antes de guardarla en Firestore.";
});

// COMPRIMIR FOTOGRAFÍA
// No utiliza Firebase Storage ni servicios externos.
async function compressPhoto(file) {
  const source = await new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error("No se pudo leer la imagen seleccionada."));

    img.src = URL.createObjectURL(file);
  });

  let width = source.naturalWidth;
  let height = source.naturalHeight;

  const maxSide = 800;

  if (Math.max(width, height) > maxSide) {
    const scale = maxSide / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let dataUrl = "";

  for (let attempt = 0; attempt < 5; attempt++) {
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(source, 0, 0, width, height);

    const quality = [0.65, 0.55, 0.45, 0.4, 0.35][attempt];

    dataUrl = canvas.toDataURL("image/jpeg", quality);

    if (dataUrl.length <= 600000) {
      break;
    }

    width = Math.max(240, Math.round(width * 0.82));
    height = Math.max(240, Math.round(height * 0.82));
  }

  URL.revokeObjectURL(source.src);

  if (dataUrl.length > 650000) {
    throw new Error(
      "La foto sigue pesando demasiado. Prueba con una imagen más pequeña."
    );
  }

  return dataUrl;
}

// GUARDAR CAMBIOS DEL PRODUCTO
async function saveProduct() {
  const p = currentProduct();
  const name = $("productName").value.trim();
  const raw = $("productPrice").value.trim();

  if (!p) {
    $("saveStatus").textContent = "Selecciona un producto.";
    return;
  }

  if (!name) {
    $("saveStatus").textContent = "Escribe el nombre del producto.";
    return;
  }

  if (
    raw !== "" &&
    (!Number.isFinite(Number(raw)) || Number(raw) < 0)
  ) {
    $("saveStatus").textContent = "Escribe un precio válido.";
    return;
  }

  if (!db || !auth || !auth.currentUser) {
    $("saveStatus").textContent =
      "Inicia sesión y verifica la conexión con Firebase.";
    return;
  }

  $("saveProduct").disabled = true;
  $("saveStatus").textContent = "Preparando y guardando en Firestore…";

  try {
    let photoUrl = p.photoUrl || null;

    if (selectedPhotoFile) {
      photoUrl = await compressPhoto(selectedPhotoFile);
    }

    const payload = {
      nombre: name,
      precio: raw === "" ? null : Number(raw),
      categoria: p.category,
      fotoUrl: photoUrl,
      disponible: true,
      actualizadoEn: firebase.firestore.FieldValue.serverTimestamp()
    };

    const docId = p.isDefault ? p.originalDocId : p.id;

    await db.collection("productos").doc(docId).set(payload, {
      merge: true
    });

    p.name = name;
    p.price = raw === "" ? null : Number(raw);
    p.photoUrl = photoUrl;

    selectedPhotoFile = null;
    $("productPhoto").value = "";

    populateSelector();
    $("productSelector").value = p.id;

    showPreview(photoUrl);

    $("saveStatus").textContent =
      "¡Guardado! La foto quedó almacenada en Firestore y el menú se actualizará.";

  } catch (error) {
    console.error(
      "Error al guardar producto en Firestore:",
      error.code,
      error.message,
      error
    );

    $("saveStatus").textContent =
      error.code === "permission-denied"
        ? "Firestore rechazó el guardado. Revisa las reglas y que hayas iniciado sesión con el administrador."
        : (error.message || "No se pudo guardar el producto en Firestore.");

  } finally {
    $("saveProduct").disabled = false;
  }
}

$("saveProduct").addEventListener("click", saveProduct);

// ELIMINAR FOTOGRAFÍA
$("removePhoto").addEventListener("click", async () => {
  const p = currentProduct();

  if (!p) return;

  if (!db || !auth || !auth.currentUser) {
    $("saveStatus").textContent =
      "Inicia sesión para modificar productos.";
    return;
  }

  try {
    const name = $("productName").value.trim() || p.name;

    const payload = {
      nombre: name,
      precio: p.price ?? null,
      categoria: p.category,
      fotoUrl: null,
      disponible: true
    };

    const id = p.isDefault ? p.originalDocId : p.id;

    await db.collection("productos").doc(id).set(payload, {
      merge: true
    });

    p.name = name;
    p.photoUrl = null;

    showPreview(null);
    populateSelector();

    $("productSelector").value = p.id;
    $("saveStatus").textContent = "Foto eliminada de Firestore.";

  } catch (e) {
    console.error(e);

    $("saveStatus").textContent =
      e.code === "permission-denied"
        ? "Firestore rechazó el cambio. Revisa las reglas de Firestore."
        : "No se pudo quitar la foto.";
  }
});

// AGREGAR PRODUCTO NUEVO
$("addProductForm").addEventListener("submit", async e => {
  e.preventDefault();

  const name = $("newProductName").value.trim();
  const category = $("newProductCategory").value;
  const raw = $("newProductPrice").value.trim();

  if (!name) return;

  if (!db || !auth || !auth.currentUser) {
    $("addProductStatus").textContent =
      "Inicia sesión para agregar productos.";
    return;
  }

  if (
    raw !== "" &&
    (!Number.isFinite(Number(raw)) || Number(raw) < 0)
  ) {
    $("addProductStatus").textContent = "Escribe un precio válido.";
    return;
  }

  try {
    const id =
      slug(`${category}-${name}`) + "-" + Date.now().toString(36);

    await db.collection("productos").doc(id).set({
      nombre: name,
      precio: raw === "" ? null : Number(raw),
      categoria: category,
      fotoUrl: null,
      disponible: true,
      creadoEn: firebase.firestore.FieldValue.serverTimestamp()
    });

    $("addProductForm").reset();

    $("addProductStatus").textContent =
      "Producto agregado. Ya aparece en la carta.";

  } catch (error) {
    console.error(error);

    $("addProductStatus").textContent =
      "No se pudo agregar. Verifica la conexión y las reglas de Firestore.";
  }
});

// CERRAR SESIÓN
$("logout").addEventListener("click", async () => {
  try {
    if (auth) {
      await auth.signOut();
    }
  } finally {
    closeModal();
  }
});

// RESPALDO DE PRODUCTOS
$("resetData").addEventListener("click", () => {
  $("saveStatus").textContent =
    "Para retirar un producto, cambia su campo disponible a false en Firestore. No se borrarán datos por accidente.";
});

$("exportData").addEventListener("click", () => {
  const blob = new Blob(
    [
      JSON.stringify({
        exportedAt: new Date().toISOString(),
        products: allProducts
      }, null, 2)
    ],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "respaldo-corazon-de-cafe.json";
  a.click();

  URL.revokeObjectURL(url);
});

// WHATSAPP
$("whatsappButton").href =
  "https://wa.me/573001547647?text=" +
  encodeURIComponent(
    "Hola, Corazón de Café. Quisiera consultar la carta y hacer un pedido."
  );

// INICIAR LA PÁGINA
renderCategories();
renderProducts();
refreshProducts();
