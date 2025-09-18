#!/bin/sh

# Reemplazar el archivo JS con variables reales de entorno
cat <<EOF > /usr/share/nginx/html/config.js
window.env = {
  VITE_API_BASE_URL: "$VITE_API_BASE_URL",
  VITE_FILES_BASE_URL: "$VITE_FILES_BASE_URL"
};
EOF

# Iniciar nginx
nginx -g "daemon off;"
