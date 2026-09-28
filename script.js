// URL de la API de JSONPlaceholder
const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

// =========================================================================
// 1. MÉTODO FETCH TRADICIONAL (Promesas con .then() y .catch())
// =========================================================================
function ejecutarConFetch() {
  fetch(API_URL)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log('--- 1. Resultado con Método FETCH (.then) ---');
      console.log(datos);
    })
    .catch((error) => console.error('Error en Fetch:', error));
}

// =========================================================================
// 2. MÉTODO ASYNC / AWAIT
// =========================================================================
async function ejecutarConAsyncAwait() {
  try {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
    console.log('--- 2. Resultado con ASYNC / AWAIT ---');
    console.log(datos);
  } catch (error) {
    console.error('Error en Async/Await:', error);
  }
}

// =========================================================================
// 3. MÉTODO CON CALLBACK CLÁSICO (XMLHttpRequest)
// =========================================================================
// Función que usa el objeto nativo XMLHttpRequest para usar callbacks clásicos sin promesas
function peticionConCallback(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Parseamos el JSON y se lo pasamos al callback
      const datos = JSON.parse(xhr.responseText);
      callback(null, datos);
    } else {
      callback('Error en la petición: ' + xhr.status, null);
    }
  };

  xhr.onerror = function () {
    callback('Error de red', null);
  };

  xhr.send();
}

function ejecutarConCallbackClasico() {
  // Llamamos a la función pasando la función callback como segundo parámetro
  peticionConCallback(API_URL, function (error, datos) {
    if (error) {
      console.error('Error en Callback:', error);
      return;
    }
    console.log('--- 3. Resultado con CALLBACK CLÁSICO (XMLHttpRequest) ---');
    console.log(datos);
  });
}

// =========================================================================
// EJECUCIÓN DE LAS 3 FORMAS
// =========================================================================
ejecutarConFetch();
ejecutarConAsyncAwait();
ejecutarConCallbackClasico();