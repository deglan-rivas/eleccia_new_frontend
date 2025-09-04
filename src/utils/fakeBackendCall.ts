export const fakeBackendCall = (data = {}, delay = 2000) => {
  return new Promise((resolve) => {
    // Simula éxito
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Simulación de respuesta exitosa",
        data
      });
    }, delay);

    // (Opcional) puedes agregar lógica para simular error:
    // setTimeout(() => reject(new Error("Error simulado")), delay);
  });
};