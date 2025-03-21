# e-commerce-management

## Descripción
Este proyecto es un sistema de gestión de pedidos para una tienda de productos. Permite a los usuarios realizar compras, gestionar stock y administrar envíos de manera eficiente. 

## Tecnologías Utilizadas
### Backend
- **Node.js** con **Express.js**
- **MongoDB** para almacenamiento de datos
- **JWT** para autenticación segura
- **Redis** para caching
- **Microservicios** opcionales para escalabilidad
- **CI/CD** con GitHub Actions

### Frontend
- **React.js** para una interfaz de usuario dinámica y modular
- **Context API** para gestión del estado
- **React Router** para manejo de rutas

## Estructura del Proyecto
```
📁 proyecto-ecommerce
│
├── 📁 backend
│   ├── 📁 config
│   ├── 📁 controllers
│   ├── 📁 models
│   ├── 📁 routes
│   ├── 📁 middleware
│   ├── server.js
│   └── package.json
│
└── 📁 frontend
    ├── 📁 public
    ├── 📁 src
    │   ├── 📁 components
    │   ├── 📁 pages
    │   ├── 📁 context
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Instalación y Configuración
### Requisitos previos
- Node.js y npm
- MongoDB
- Redis (opcional)

### Instalación
1. Clonar el repositorio:
   ```bash
   https://github.com/anthonytrillo/e-commerce-management.git
   ```
2. Instalar dependencias del backend:
   ```bash
   cd backend
   npm install
   ```
3. Instalar dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Uso
### Backend
Para ejecutar el backend:
```bash
cd backend
npm run dev
```

### Frontend
Para ejecutar el frontend:
```bash
cd frontend
npm run dev
```

## API Endpoints
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/orders` - Crear pedido
- `GET /api/products` - Obtener productos
- `POST /api/shipping` - Gestionar envíos

## Metodología de Trabajo
- **Scrum** con sprints semanales
- **Jira** para gestión de tareas
- **Confluence** para documentación
- **Revisiones de código** periódicas

## Contribución
Si deseas contribuir, crea un fork del repositorio, realiza tus cambios y envía un pull request.

## Licencia
Este proyecto está bajo la licencia MIT.
