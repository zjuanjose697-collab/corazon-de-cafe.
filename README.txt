CORAZÓN DE CAFÉ — CARTA CON PANEL DE EDICIÓN
=============================================

ARCHIVOS
- index.html: página y ventana privada de administración.
- styles.css: diseño adaptable a celular y computador.
- script.js: productos, precios, fotos y panel de edición.

CÓMO ABRIR
1. Descomprime este ZIP.
2. En Visual Studio Code, usa Archivo > Abrir carpeta y abre esta carpeta.
3. Si aparece Restricted Mode, confía en la carpeta si reconoces los archivos.
4. Instala/activa Live Server, abre index.html y pulsa Go Live.

CÓMO EDITAR LA CARTA
1. En la web, pulsa "Administrar".
2. Escribe la clave: XIOMY123
3. Elige el producto.
4. Cambia el precio o selecciona una foto desde tu computador.
5. Pulsa "Guardar cambios".

El botón "Descargar respaldo" exporta las ediciones como JSON.
"Restablecer carta" elimina los cambios guardados en ese navegador.

IMPORTANTE — PROTOTIPO
Esta versión guarda cambios en el almacenamiento local del navegador. Por eso, los cambios se ven en el mismo navegador/computador y no se sincronizan automáticamente con otros celulares o clientes.
La clave está en el JavaScript del navegador; no debe considerarse una protección segura en una web pública. Antes de usarlo en Render con datos reales, se recomienda implementar autenticación en el servidor y una base de datos/almacenamiento de imágenes para que solo el dueño pueda editar y los cambios se compartan a todos.
El QR definitivo se genera cuando la web esté publicada en Render.
