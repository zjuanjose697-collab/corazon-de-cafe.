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

const $ = id => document.getElementById(id);

const menuGrid = $("menuGrid");
const categoryBar = $("categoryBar");
const sectionTitle = $("sectionTitle");
const itemCount = $("itemCount");

const firebaseConfig = {
  apiKey: "AIzaSyBQiAZiXpxigyp_NjtBPwlhtOeAagwGINY",
  authDomain: "corazon-de-cafe-ad08b.firebaseapp.com",
  projectId: "corazon-de-cafe-ad08b",
  storageBucket: "corazon-de-cafe-ad08b.firebasestorage.app",
  messagingSenderId: "1050467610067",
  appId: "1:1050467610067:web:2f979cffa29ca3cb935326"
};

// ============================================
// CONEXIÓN CON FIREBASE
// ============================================

let db = null;
let auth = null;
let storage = null;
let firebaseReady = false;

try {
  if (window.firebase) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    db = firebase.firestore();
    auth = firebase.auth();

    firebaseReady = true;

  } else {
    console.error("No se cargó el SDK de Firebase.");
  }

} catch (error) {
  console.error("Firebase no pudo inicializarse:", error);
}

// ============================================
// VARIABLES GENERALES
// ============================================

let activeCategory = "bebidas";
let selectedPhotoFile = null;
let remoteProducts = [];
let productsReady = false;

const defaultProducts = products.map((p, i) => ({
  id: `base_${i}`,
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

const slug = s =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function escapeHTML(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

// ============================================
// LECTURA DE PRODUCTOS DE FIRESTORE
// ============================================

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

function renderCategories() {
  categoryBar.innerHTML = categories.map(c => `
    <button class="category-btn ${c.id === activeCategory ? "active" : ""}"
      data-id="${c.id}">
      ${c.label}
    </button>
  `).join("");

  categoryBar.querySelectorAll("button").forEach(b => {
    b.addEventListener("click", () => {
      activeCategory = b.dataset.id;
      renderCategories();
      renderProducts();
    });
  });
}

// ============================================
// MOSTRAR PRODUCTOS
// ============================================

function renderProducts() {
  const cat = categories.find(c => c.id === activeCategory);

  const list = allProducts.filter(p =>
    p.category === activeCategory && p.available !== false
  );

  sectionTitle.textContent = cat?.title || "Productos";
  itemCount.textContent = `${list.length} productos`;

  menuGrid.innerHTML = list.map(p => {
    const img = p.photoUrl
      ? `<img class="product-image"
          src="${escapeHTML(p.photoUrl)}"
          alt="${escapeHTML(p.name)}"
          loading="lazy">`
      : `<div class="product-image product-placeholder">☕</div>`;

    return `
      <article class="menu-card">
        ${img}
        <div class="product-info">
          <div class="item-name">${escapeHTML(p.name)}</div>
          ${p.price == null || p.price === ""
            ? '<div class="item-note">Consulta disponibilidad y precio</div>'
            : ""}
        </div>
        <span class="price ${p.price == null || p.price === "" ? "ask" : ""}">
          ${money(p.price)}
        </span>
      </article>
    `;
  }).join("");
}

// ============================================
// SINCRONIZAR PRODUCTOS CON FIRESTORE
// ============================================

function refreshProducts() {
  if (!db) {
    renderProducts();
    return;
  }

  db.collection("productos").onSnapshot(snapshot => {
    remoteProducts = snapshot.docs.map(normalizedDoc);

    const byName = new Map(
      remoteProducts.map(p => [
        `${p.category}::${p.name.toLocaleLowerCase()}`,
        p
      ])
    );

    const defaults = defaultProducts.map(p =>
      byName.get(`${p.category}::${p.name.toLocaleLowerCase()}`) || p
    );

    const extras = remoteProducts.filter(p =>
      !defaultProducts.some(d =>
        d.category === p.category &&
        d.name.toLocaleLowerCase() === p.name.toLocaleLowerCase()
      )
    );

    allProducts = [...defaults, ...extras];

    productsReady = true;
    renderProducts();

    if (!$("editorView").hidden) {
      populateSelector();
    }

  }, error => {
    console.error("Error leyendo productos:", error);
    renderProducts();
  });
}

// ============================================
// PANEL DE ADMINISTRACIÓN
// ============================================

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

// ============================================
// INICIAR SESIÓN
// ============================================

$("loginForm").addEventListener("submit", async e => {
  e.preventDefault();

  const email = $("adminEmail").value.trim();
  const password = $("adminPassword").value;

  if (!auth) {
    $("loginError").textContent =
      "Firebase no está conectado. Recarga la página.";
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
      "No se pudo iniciar sesión. Verifica el correo y la contraseña.";
  }
});

// ============================================
// EDITAR PRODUCTOS
// ============================================

function populateSelector() {
  const sel = $("productSelector");
  const current = sel.value;

  sel.innerHTML = allProducts.map(p => `
    <option value="${escapeHTML(p.id)}">
      ${escapeHTML(p.name)} —
      ${escapeHTML(
        categories.find(c => c.id === p.category)?.title || p.category
      )}
    </option>
  `).join("");

  if (allProducts.some(p => p.id === current)) {
    sel.value = current;
  }
}

function currentProduct() {
  return allProducts.find(p =>
    p.id === $("productSelector").value
  ) || allProducts[0];
}

function loadSelectedProduct() {
  const p = currentProduct();

  if (!p) return;

  selectedPhotoFile = null;

  $("productPrice").value = p.price ?? "";
  $("productPhoto").value = "";
  $("saveStatus").textContent = "";

  showPreview(p.photoUrl);
}

function showPreview(src) {
  const preview = $("editPreview");

  preview.innerHTML = src
    ? `<img src="${escapeHTML(src)}" alt="Vista previa de la foto">`
    : "<span>Sin foto seleccionada</span>";
}

$("productSelector").addEventListener("change", loadSelectedProduct);

// ============================================
// SELECCIONAR FOTOGRAFÍA
// ============================================

$("productPhoto").addEventListener("change", e => {
  const file = e.target.files && e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    $("saveStatus").textContent =
      "Selecciona un archivo de imagen.";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    $("saveStatus").textContent =
      "La imagen supera 5 MB. Elige una más pequeña.";

    e.target.value = "";
    return;
  }

  selectedPhotoFile = file;

  const reader = new FileReader();

  reader.onload = () => showPreview(reader.result);
  reader.readAsDataURL(file);

  $("saveStatus").textContent =
    "Foto lista. Pulsa Guardar cambios.";
});

// ============================================
// COMPRIMIR FOTOGRAFÍAS SIN FIREBASE STORAGE
// ============================================

async function uploadPhoto(file, productId) {
  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onerror = () => reject(
      new Error("No se pudo leer la fotografía.")
    );

    reader.onload = () => {

      const img = new Image();

      img.onerror = () => reject(
        new Error("La imagen no es válida.")
      );

      img.onload = () => {

        try {
          const canvas = document.createElement("canvas");

          let width = img.width;
          let height = img.height;

          const maxDimension = 800;

          if (width > maxDimension || height > maxDimension) {
            const scale = Math.min(
              maxDimension / width,
              maxDimension / height
            );

            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.65;

          let imageData = canvas.toDataURL(
            "image/jpeg",
            quality
          );

          while (imageData.length > 650000 && quality > 0.25) {
            quality = Math.max(0.25, quality - 0.10);

            imageData = canvas.toDataURL(
              "image/jpeg",
              quality
            );
          }

          if (imageData.length > 650000) {
            reject(new Error(
              "La fotografía es demasiado grande. Selecciona otra."
            ));
            return;
          }

          resolve(imageData);

        } catch (error) {
          reject(error);
        }
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

// ============================================
// GUARDAR CAMBIOS DEL PRODUCTO
// ============================================

async function saveProduct() {

  const p = currentProduct();
  const raw = $("productPrice").value.trim();

  if (!db || !auth || !firebaseReady) {
    $("saveStatus").textContent =
      "Firebase no está conectado. Verifica la conexión e inténtalo de nuevo.";
    return;
  }

  if (!auth.currentUser) {
    $("saveStatus").textContent =
      "Tu sesión expiró. Cierra sesión e inicia nuevamente.";
    return;
  }

  if (!p) {
    $("saveStatus").textContent =
      "Selecciona un producto.";
    return;
  }

  if (
    raw !== "" &&
    (!Number.isFinite(Number(raw)) || Number(raw) < 0)
  ) {
    $("saveStatus").textContent =
      "Escribe un precio válido.";
    return;
  }

  $("saveProduct").disabled = true;
  $("saveStatus").textContent = "Guardando en Firebase…";

  try {

    let photoUrl = p.photoUrl || null;

    if (selectedPhotoFile) {
      photoUrl = await uploadPhoto(selectedPhotoFile, p.id);
    }

    const payload = {
      nombre: p.name,
      precio: raw === "" ? null : Number(raw),
      categoria: p.category,
      fotoUrl: photoUrl,
      disponible: true,
      actualizadoEn: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (p.isDefault) {

      const docId = slug(`${p.category}-${p.name}`);

      await db.collection("productos")
        .doc(docId)
        .set(payload, { merge: true });

    } else {

      await db.collection("productos")
        .doc(p.id)
        .set(payload, { merge: true });
    }

    selectedPhotoFile = null;
    $("productPhoto").value = "";

    $("saveStatus").textContent =
      "¡Guardado! Los clientes verán el cambio al actualizar la carta.";

  } catch (error) {

    console.error(
      "Error guardando producto:",
      error.code,
      error.message,
      error
    );

    $("saveStatus").textContent =
      `Error al guardar: ${error.code || "desconocido"} — ${error.message || "Revisa las reglas de Firebase."}`;

  } finally {
    $("saveProduct").disabled = false;
  }
}

$("saveProduct").addEventListener("click", saveProduct);

// ============================================
// QUITAR FOTOGRAFÍA
// ============================================

$("removePhoto").addEventListener("click", async () => {

  const p = currentProduct();

  if (!p) return;

  if (!db || !auth || !auth.currentUser) {
    $("saveStatus").textContent =
      "Firebase no está conectado o tu sesión expiró.";
    return;
  }

  try {

    const payload = {
      nombre: p.name,
      precio: p.price ?? null,
      categoria: p.category,
      fotoUrl: null,
      disponible: true
    };

    const id = p.isDefault
      ? slug(`${p.category}-${p.name}`)
      : p.id;

    await db.collection("productos")
      .doc(id)
      .set(payload, { merge: true });

    showPreview(null);

    $("saveStatus").textContent =
      "Foto quitada de la carta.";

  } catch (e) {

    console.error(
      "Error quitando foto:",
      e.code,
      e.message,
      e
    );

    $("saveStatus").textContent =
      `Error: ${e.code || "desconocido"} — ${e.message || "No se pudo quitar la foto."}`;
  }
});

// ============================================
// AGREGAR NUEVOS PRODUCTOS
// ============================================

$("addProductForm").addEventListener("submit", async e => {

  e.preventDefault();

  const name = $("newProductName").value.trim();
  const category = $("newProductCategory").value;
  const raw = $("newProductPrice").value.trim();

  if (!name) return;

  if (!db || !auth || !firebaseReady) {
    $("addProductStatus").textContent =
      "Firebase no está conectado. Revisa la conexión con Firebase.";
    return;
  }

  if (!auth.currentUser) {
    $("addProductStatus").textContent =
      "Tu sesión expiró. Inicia sesión nuevamente.";
    return;
  }

  if (
    raw !== "" &&
    (!Number.isFinite(Number(raw)) || Number(raw) < 0)
  ) {
    $("addProductStatus").textContent =
      "Escribe un precio válido.";
    return;
  }

  const submitButton = $("addProductForm")
    .querySelector('button[type="submit"]');

  submitButton.disabled = true;

  $("addProductStatus").textContent =
    "Agregando producto…";

  try {

    const id =
      slug(`${category}-${name}`) +
      "-" +
      Date.now().toString(36);

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
      "Producto agregado correctamente. Ya aparece en la carta.";

  } catch (error) {

    console.error(
      "Error agregando producto a Firestore:",
      error.code,
      error.message,
      error
    );

    $("addProductStatus").textContent =
      `Error al agregar: ${error.code || "desconocido"} — ${error.message || "Revisa las reglas de Firestore."}`;

  } finally {

    submitButton.disabled = false;
  }
});

// ============================================
// CERRAR SESIÓN
// ============================================

$("logout").addEventListener("click", async () => {

  try {
    if (auth) {
      await auth.signOut();
    }

  } finally {
    closeModal();
  }
});

// ============================================
// RESPALDO Y UTILIDADES
// ============================================

$("resetData").addEventListener("click", () => {

  $("saveStatus").textContent =
    "Para retirar un producto, cambia su campo disponible a false en Firestore. No se borrarán datos por accidente.";

});

$("exportData").addEventListener("click", () => {

  const blob = new Blob([
    JSON.stringify({
      exportedAt: new Date().toISOString(),
      products: allProducts
    }, null, 2)
  ], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "respaldo-corazon-de-cafe.json";

  a.click();

  URL.revokeObjectURL(url);
});

// ============================================
// BOTÓN DE WHATSAPP
// ============================================

$("whatsappButton").href =
  "https://wa.me/573001547647?text=" +
  encodeURIComponent(
    "Hola, Corazón de Café. Quisiera consultar la carta y hacer un pedido."
  );

// ============================================
// INICIAR APLICACIÓN
// ============================================

renderCategories();
renderProducts();
refreshProducts();
