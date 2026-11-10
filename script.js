
/* =====================================================
   CORAZÓN DE CAFÉ
   Carta digital y panel de administración
   Fotografías comprimidas y guardadas en Firestore
   ===================================================== */

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
  ["Cappuccino caliente", 7000, "bebidas"],
  ["Cappuccino frío", 8000, "bebidas"],
  ["Café en leche", 3000, "bebidas"],
  ["Café pequeño", 2000, "bebidas"],
  ["Café doble", 4000, "bebidas"],
  ["Malteadas", null, "bebidas"],
  ["Chocolate", 3000, "bebidas"],
  ["Chocolate en leche", 4000, "bebidas"],
  ["Aromáticas (sobre o panela)", 2000, "bebidas"],
  ["Milo", 6000, "bebidas"],
  ["Jugo en leche", 8000, "bebidas"],
  ["Jugo en agua", 7000, "bebidas"],
  ["Té blanco", 7000, "bebidas"],
  ["Té negro", 7000, "bebidas"],

  ["Limonada de mandarina", null, "limonadas"],
  ["Limonada de cereza", null, "limonadas"],
  ["Mango piña", null, "limonadas"],
  ["Mango viche", null, "limonadas"],
  ["Coco", null, "limonadas"],
  ["Coco café", null, "limonadas"],
  ["Frutos rojos", null, "limonadas"],
  ["Uva", null, "limonadas"],
  ["Hierbabuena", null, "limonadas"],
  ["Piña con hierbabuena", null, "limonadas"],

  ["Jugo natural de mango", null, "jugos"],
  ["Jugo natural de maracuyá", null, "jugos"],
  ["Jugo natural de mora", null, "jugos"],
  ["Jugo natural de tomate de árbol", null, "jugos"],

  ["Papitas artesanales — limón", 8000, "mecatos"],
  ["Papitas artesanales — pimienta", 8000, "mecatos"],
  ["Papitas artesanales — natural", 8000, "mecatos"],
  ["Papitas artesanales — chicharrón", 8000, "mecatos"],
  ["Rosquitas", null, "mecatos"],
  ["Papitas", 4000, "mecatos"],
  ["Doritos", 4000, "mecatos"],
  ["Cheesetris", 4000, "mecatos"],
  ["De Todito", 4000, "mecatos"],
  ["Platanitos", 4000, "mecatos"],
  ["Boliqueso", 2500, "mecatos"],
  ["Chokis", 2500, "mecatos"],
  ["Galletas", 2500, "mecatos"],
  ["Limón miel", null, "mecatos"],
  ["Mayonesa", null, "mecatos"],
  ["Barbiquio chicharrón", null, "mecatos"],

  ["Pasteles", 7000, "comidas"],
  ["Palitos", 7000, "comidas"],
  ["Sándwich", null, "comidas"],
  ["Croissant", 4000, "comidas"],
  ["Chorizos", null, "comidas"],
  ["Omelette", null, "comidas"],

  ["Almojábana", null, "reposteria"],
  ["Torta de café", 8000, "reposteria"],
  ["Torta de chocolate", 8000, "reposteria"],
  ["Torta de zanahoria", 8000, "reposteria"],
  ["Torta Red Velvet", 8000, "reposteria"],
  ["Alfajores", null, "reposteria"],
  ["Galletas de chocolate", null, "reposteria"],
  ["Canelazos", null, "reposteria"],

  ["Chococono", 5000, "helados"],
  ["Turrones", 6000, "helados"],
  ["Paleta en agua", 2500, "helados"],
  ["Paleta de mango", 6000, "helados"],
  ["Paleta de piña", 6000, "helados"],
  ["Paleta tres leches", 7000, "helados"],
  ["Paleta Tosh frutos rojos", 7000, "helados"],
  ["Bocato", 8000, "helados"],
  ["Galleta", 5000, "helados"],
  ["Bola de helado", 2500, "helados"],
  ["Brownie con helado", 6000, "helados"],
  ["Postre de frutos rojos", null, "helados"],
  ["Postre de maracuyá", null, "helados"],
  ["Postre de galletas", null, "helados"],

  ["Botella grande de agua", 4000, "embotelladas"],
  ["Botella pequeña de agua", 3000, "embotelladas"],
  ["Soda", 4000, "embotelladas"],
  ["Soda rosada", 7000, "embotelladas"],
  ["Soda verde", 7000, "embotelladas"],
  ["Electrolit", 12000, "embotelladas"],
  ["Vive 100", 6000, "embotelladas"],
  ["Saviloe", 4000, "embotelladas"],
  ["Del Valle", 4000, "embotelladas"],
  ["Agua saborizada", 4000, "embotelladas"],
  ["Monster", 12000, "embotelladas"],

  ["Poker", null, "licores"],
  ["Águila", null, "licores"],
  ["Pilsen", null, "licores"],
  ["Corona", null, "licores"],
  ["Coronita", null, "licores"],
  ["Costeñita", null, "licores"],
  ["Budweiser", null, "licores"],
  ["Cordillera rosada", null, "licores"],
  ["Cordillera verde", null, "licores"],
  ["Cordillera roja", null, "licores"],
  ["Club Colombia", null, "licores"],
  ["Club Colombia lata", null, "licores"],
  ["Stella", null, "licores"],
  ["Like", null, "licores"],
  ["Smirnoff media", null, "licores"],
  ["Copa de vino", null, "licores"],
  ["Buchanan’s", null, "licores"],
  ["Aguardiente media", null, "licores"],
  ["Aguardiente botella", null, "licores"]
];

/* =====================================================
   FUNCIONES GENERALES
   ===================================================== */

const $ = id => document.getElementById(id);

const menuGrid = $("menuGrid");
const categoryBar = $("categoryBar");
const sectionTitle = $("sectionTitle");
const itemCount = $("itemCount");

const firebaseConfig = {
  apiKey: "AIzaSyBQiAZiXpxigyp_NjtBPwlhtOeAagwGINY",
  authDomain: "corazon-de-cafe-ad08b.firebaseapp.com",
  projectId: "corazon-de-cafe-ad08b",
  messagingSenderId: "1050467610067",
  appId: "1:1050467610067:web:2f979cffa29ca3cb935326"
};

/* IMPORTANTE:
   slug se declara antes de construir los productos.
   Así evitamos el error "Cannot access before initialization".
*/

function slug(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function money(value) {
  if (value === null || value === "") {
    return "Consultar";
  }

  return "$" + Number(value).toLocaleString("es-CO");
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

/* =====================================================
   CONEXIÓN FIREBASE
   ===================================================== */

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

  } else {
    console.error("No se cargó Firebase. Revisa los scripts de index.html.");
  }

} catch (error) {
  console.error("Error inicializando Firebase:", error);
}

/* =====================================================
   PRODUCTOS
   ===================================================== */

let activeCategory = "bebidas";
let selectedPhotoFile = null;
let remoteProducts = [];

const defaultProducts = products.map((product, index) => ({
  id: `base_${index}`,
  originalDocId: slug(`${product[2]}-${product[0]}`),
  name: product[0],
  price: product[1],
  category: product[2],
  photoUrl: null,
  available: true,
  isDefault: true
}));

let allProducts = [...defaultProducts];

function normalizedDoc(document) {
  const data = document.data();

  return {
    id: document.id,
    name: data.nombre || data.name || "Producto",
    price: data.precio ?? data.price ?? null,
    category: data.categoria || data.category || "bebidas",
    photoUrl: data.fotoUrl || data.photoUrl || data.foto || null,
    available: data.disponible ?? data.available ?? true,
    isDefault: false
  };
}

/* =====================================================
   PINTAR CATEGORÍAS
   ===================================================== */

function renderCategories() {
  categoryBar.innerHTML = categories.map(category => `
    <button
      class="category-btn ${category.id === activeCategory ? "active" : ""}"
      data-id="${category.id}">
      ${category.label}
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

/* =====================================================
   PINTAR PRODUCTOS
   ===================================================== */

function renderProducts() {
  const category = categories.find(
    item => item.id === activeCategory
  );

  const list = allProducts.filter(product =>
    product.category === activeCategory &&
    product.available !== false
  );

  sectionTitle.textContent = category?.title || "Productos";
  itemCount.textContent = `${list.length} productos`;

  menuGrid.innerHTML = list.map(product => {
    const image = product.photoUrl
      ? `<img
          class="product-image"
          src="${escapeHTML(product.photoUrl)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy">`
      : `<div class="product-image product-placeholder">☕</div>`;

    return `
      <article class="menu-card">
        ${image}

        <div class="product-info">
          <div class="item-name">
            ${escapeHTML(product.name)}
          </div>

          ${product.price == null
            ? '<div class="item-note">Consulta disponibilidad y precio</div>'
            : ""}
        </div>

        <span class="price">
          ${money(product.price)}
        </span>
      </article>
    `;
  }).join("");
}

/* =====================================================
   LEER PRODUCTOS DE FIRESTORE
   ===================================================== */

function refreshProducts() {
  if (!db) {
    renderProducts();
    return;
  }

  db.collection("productos").onSnapshot(snapshot => {
    remoteProducts = snapshot.docs.map(normalizedDoc);

    const productsById = new Map(
      remoteProducts.map(product => [product.id, product])
    );

    const defaults = defaultProducts.map(product => {
      const saved = productsById.get(product.originalDocId);

      return {
        ...product,
        ...(saved || {}),
        id: product.id,
        originalDocId: product.originalDocId,
        isDefault: true
      };
    });

    const defaultIds = new Set(
      defaultProducts.map(product => product.originalDocId)
    );

    const extras = remoteProducts.filter(
      product => !defaultIds.has(product.id)
    );

    allProducts = [...defaults, ...extras];

    renderProducts();

    if (!$("editorView").hidden) {
      populateSelector();
    }

  }, error => {
    console.error("Error leyendo productos:", error);
    renderProducts();
  });
}

/* =====================================================
   ADMINISTRACIÓN
   ===================================================== */

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

$("adminModal").addEventListener("click", event => {
  if (event.target === $("adminModal")) {
    closeModal();
  }
});

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    !$("adminModal").hidden
  ) {
    closeModal();
  }
});

/* =====================================================
   INICIAR SESIÓN
   ===================================================== */

$("loginForm").addEventListener("submit", async event => {
  event.preventDefault();

  const email = $("adminEmail").value.trim();
  const password = $("adminPassword").value;

  if (!auth) {
    $("loginError").textContent =
      "Firebase no está conectado. Verifica la configuración.";
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password);

    $("loginView").hidden = true;
    $("editorView").hidden = false;

    populateSelector();
    loadSelectedProduct();

  } catch (error) {
    console.error("Error de inicio de sesión:", error);

    $("loginError").textContent =
      "No se pudo iniciar sesión. Verifica tu correo y contraseña.";
  }
});

/* =====================================================
   SELECTOR Y EDICIÓN
   ===================================================== */

function populateSelector() {
  const selector = $("productSelector");
  const current = selector.value;

  selector.innerHTML = allProducts.map(product => `
    <option value="${escapeHTML(product.id)}">
      ${escapeHTML(product.name)}
    </option>
  `).join("");

  if (allProducts.some(product => product.id === current)) {
    selector.value = current;
  }
}

function currentProduct() {
  return allProducts.find(
    product => product.id === $("productSelector").value
  ) || allProducts[0];
}

function loadSelectedProduct() {
  const product = currentProduct();

  if (!product) return;

  selectedPhotoFile = null;

  $("productName").value = product.name || "";
  $("productPrice").value = product.price ?? "";
  $("productPhoto").value = "";
  $("saveStatus").textContent = "";

  showPreview(product.photoUrl);
}

function showPreview(photoUrl) {
  const preview = $("editPreview");

  preview.innerHTML = photoUrl
    ? `<img src="${escapeHTML(photoUrl)}" alt="Vista previa">`
    : "<span>Sin foto seleccionada</span>";
}

$("productSelector").addEventListener(
  "change",
  loadSelectedProduct
);

/* =====================================================
   SELECCIONAR FOTOGRAFÍA
   ===================================================== */

$("productPhoto").addEventListener("change", event => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    $("saveStatus").textContent =
      "Selecciona un archivo de imagen.";

    event.target.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    $("saveStatus").textContent =
      "La imagen supera 10 MB. Selecciona otra.";

    event.target.value = "";
    return;
  }

  selectedPhotoFile = file;

  const reader = new FileReader();

  reader.onload = () => {
    showPreview(reader.result);
  };

  reader.readAsDataURL(file);

  $("saveStatus").textContent =
    "Fotografía seleccionada. Pulsa Guardar cambios.";
});

/* =====================================================
   COMPRIMIR IMAGEN
   NO UTILIZA FIREBASE STORAGE
   ===================================================== */

async function compressPhoto(file) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = () => reject(
        new Error("No se pudo leer la imagen.")
      );

      img.src = objectUrl;
    });

    let width = image.naturalWidth;
    let height = image.naturalHeight;

    const maxSide = 800;

    if (Math.max(width, height) > maxSide) {
      const scale = maxSide / Math.max(width, height);

      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    let dataUrl = "";

    const qualities = [0.65, 0.55, 0.45, 0.4, 0.35];

    for (const quality of qualities) {
      canvas.width = width;
      canvas.height = height;

      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      dataUrl = canvas.toDataURL("image/jpeg", quality);

      if (dataUrl.length <= 600000) {
        break;
      }

      width = Math.max(240, Math.round(width * 0.82));
      height = Math.max(240, Math.round(height * 0.82));
    }

    if (dataUrl.length > 650000) {
      throw new Error(
        "La fotografía pesa demasiado. Selecciona una imagen más pequeña."
      );
    }

    return dataUrl;

  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/* =====================================================
   GUARDAR CAMBIOS DEL PRODUCTO
   ===================================================== */

async function saveProduct() {
  const product = currentProduct();

  const name = $("productName").value.trim();
  const rawPrice = $("productPrice").value.trim();

  if (!product) {
    $("saveStatus").textContent =
      "Selecciona un producto.";
    return;
  }

  if (!name) {
    $("saveStatus").textContent =
      "Escribe el nombre del producto.";
    return;
  }

  if (
    rawPrice !== "" &&
    (!Number.isFinite(Number(rawPrice)) || Number(rawPrice) < 0)
  ) {
    $("saveStatus").textContent =
      "Escribe un precio válido.";
    return;
  }

  if (!db || !auth || !auth.currentUser) {
    $("saveStatus").textContent =
      "Inicia sesión para guardar los cambios.";
    return;
  }

  $("saveProduct").disabled = true;

  $("saveStatus").textContent =
    "Guardando cambios...";

  try {
    let photoUrl = product.photoUrl || null;

    if (selectedPhotoFile) {
      photoUrl = await compressPhoto(selectedPhotoFile);
    }

    // CORRECCIÓN DEFINITIVA:
    // El campo de Firestore se llama fotoUrl.
    // La variable que contiene la imagen se llama photoUrl.
    const payload = {
      nombre: name,
      precio: rawPrice === "" ? null : Number(rawPrice),
      categoria: product.category,
      fotoUrl: photoUrl,
      disponible: true,
      actualizadoEn: firebase.firestore.FieldValue.serverTimestamp()
    };

    const documentId = product.isDefault
      ? product.originalDocId
      : product.id;

    await db.collection("productos")
      .doc(documentId)
      .set(payload, { merge: true });

    product.name = name;
    product.price = rawPrice === "" ? null : Number(rawPrice);
    product.photoUrl = photoUrl;

    selectedPhotoFile = null;
    $("productPhoto").value = "";

    populateSelector();
    $("productSelector").value = product.id;

    showPreview(photoUrl);

    $("saveStatus").textContent =
      "¡Producto guardado correctamente!";

  } catch (error) {
    console.error("Error guardando producto:", error);

    $("saveStatus").textContent =
      error.code === "permission-denied"
        ? "Firebase rechazó el cambio. Revisa las reglas de Firestore."
        : `No se pudo guardar: ${error.message}`;

  } finally {
    $("saveProduct").disabled = false;
  }
}

$("saveProduct").addEventListener("click", saveProduct);

/* =====================================================
   ELIMINAR FOTOGRAFÍA
   ===================================================== */

$("removePhoto").addEventListener("click", async () => {
  const product = currentProduct();

  if (!product) return;

  if (!db || !auth || !auth.currentUser) {
    $("saveStatus").textContent =
      "Inicia sesión para modificar el producto.";
    return;
  }

  try {
    const documentId = product.isDefault
      ? product.originalDocId
      : product.id;

    await db.collection("productos")
      .doc(documentId)
      .set({
        nombre: $("productName").value.trim() || product.name,
        precio: product.price ?? null,
        categoria: product.category,
        fotoUrl: null,
        disponible: true
      }, { merge: true });

    product.photoUrl = null;

    showPreview(null);

    $("saveStatus").textContent =
      "Fotografía eliminada correctamente.";

  } catch (error) {
    console.error("Error eliminando fotografía:", error);

    $("saveStatus").textContent =
      "No se pudo eliminar la fotografía. Revisa Firestore.";
  }
});

/* =====================================================
   AGREGAR NUEVO PRODUCTO
   ===================================================== */

$("addProductForm").addEventListener("submit", async event => {
  event.preventDefault();

  const name = $("newProductName").value.trim();
  const category = $("newProductCategory").value;
  const rawPrice = $("newProductPrice").value.trim();

  if (!name) return;

  if (!db || !auth || !auth.currentUser) {
    $("addProductStatus").textContent =
      "Inicia sesión para agregar productos.";
    return;
  }

  if (
    rawPrice !== "" &&
    (!Number.isFinite(Number(rawPrice)) || Number(rawPrice) < 0)
  ) {
    $("addProductStatus").textContent =
      "Escribe un precio válido.";
    return;
  }

  const submitButton = $("addProductForm")
    .querySelector('button[type="submit"]');

  submitButton.disabled = true;

  try {
    const documentId =
      slug(`${category}-${name}`) + "-" + Date.now().toString(36);

    await db.collection("productos")
      .doc(documentId)
      .set({
        nombre: name,
        precio: rawPrice === "" ? null : Number(rawPrice),
        categoria: category,
        fotoUrl: null,
        disponible: true,
        creadoEn: firebase.firestore.FieldValue.serverTimestamp()
      });

    $("addProductForm").reset();

    $("addProductStatus").textContent =
      "Producto agregado correctamente.";

  } catch (error) {
    console.error("Error agregando producto:", error);

    $("addProductStatus").textContent =
      "No se pudo agregar el producto. Revisa Firestore.";

  } finally {
    submitButton.disabled = false;
  }
});

/* =====================================================
   CERRAR SESIÓN
   ===================================================== */

$("logout").addEventListener("click", async () => {
  try {
    if (auth) {
      await auth.signOut();
    }
  } finally {
    closeModal();
  }
});

/* =====================================================
   RESPALDO DE PRODUCTOS
   ===================================================== */

$("exportData").addEventListener("click", () => {
  const backup = {
    exportedAt: new Date().toISOString(),
    products: allProducts
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "respaldo-corazon-de-cafe.json";
  link.click();

  URL.revokeObjectURL(url);
});

$("resetData").addEventListener("click", () => {
  $("saveStatus").textContent =
    "No se borraron datos. Para ocultar un producto, cambia disponible a false en Firestore.";
});

/* =====================================================
   BOTÓN WHATSAPP
   ===================================================== */

$("whatsappButton").href =
  "https://wa.me/573001547647?text=" +
  encodeURIComponent(
    "Hola, Corazón de Café. Quisiera consultar la carta y hacer un pedido."
  );

/* =====================================================
   INICIAR LA PÁGINA
   ===================================================== */

renderCategories();
renderProducts();
refreshProducts();
