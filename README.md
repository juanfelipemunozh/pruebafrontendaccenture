# Prueba Técnica - Todo App Ionic (Accenture)

Esta es una aplicación de lista de tareas (To-Do List) construida con Ionic y Angular, siguiendo los requerimientos de la prueba técnica para Desarrollador Mobile.

## Funcionalidades Implementadas

### Aplicación Base

- **Agregar tareas**: Permite ingresar un título y guardarlo.
- **Marcar como completada**: Checkbox para cambiar el estado de la tarea.
- **Eliminar tareas**: Botón para remover tareas individuales.
- **Persistencia Local**: Uso de `@ionic/storage-angular` para mantener los datos al cerrar la app.

### Categorización (Nuevas Funcionalidades)

- **Gestión de Categorías**: Pantalla dedicada para Crear, Editar y Eliminar categorías.
- **Asignación**: Cada tarea puede ser vinculada a una categoría al ser creada.
- **Filtrado**: Selector en el header para filtrar la lista de tareas por categoría.

### Firebase & Remote Config

- **Integración con Firebase**: Configuración lista en `environment.ts`.
- **Feature Flag**: Implementación de `show_delete_all` a través de Remote Config para habilitar/deshabilitar el botón de "Borrar todo" en la pantalla principal.

### Optimización de Rendimiento

- **Virtual Scroll**: Implementación de `@angular/cdk/scrolling` para manejar listas grandes de manera eficiente.
- **TrackBy**: Optimización de renderizado en Angular mediante `trackByFn`.
- **Lazy Loading / Standalone**: Uso de componentes Standalone para una carga inicial más rápida.

---

## Instrucciones para Compilar y Ejecutar

### Requisitos Previos
- Node.js (v18+)
- Ionic CLI (`npm install -g @ionic/cli`)
- Java JDK y Android Studio (para Android)

### Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install`.

### Ejecución en Navegador
```bash
npx @ionic/cli serve
```

### Compilación para Android
Para generar el archivo APK:
1. Asegúrate de tener configurado el SDK de Android.
2. Ejecuta:
```bash
npx @ionic/cli cordova platform add android
npx @ionic/cli cordova build android
```
El APK se generará en `platforms/android/app/build/outputs/apk/debug/`.

### Compilación para iOS
1. Requiere un entorno macOS con Xcode.
2. Ejecuta:
```bash
npx @ionic/cli cordova platform add ios
npx @ionic/cli cordova build ios
```
Luego abre el proyecto en `.platforms/ios/` con Xcode para generar el IPA.

---

## Respuestas a las Preguntas de la Prueba

### 1. ¿Cuáles fueron los principales desafíos que enfrentaste al implementar las nuevas funcionalidades?
El principal desafío fue la transición de la estructura de componentes tradicional a **Standalone Components** en conjunto con la integración de **Cordova**, ya que las versiones más recientes de Ionic tienden a preferir Capacitor. Además, asegurar que el `Storage` se inicializara correctamente antes de que los componentes intentaran leer datos fue crucial para evitar errores de condición de carrera.

### 2. ¿Qué técnicas de optimización de rendimiento aplicaste y por qué?
- **CDK Virtual Scroll**: Crucial para el manejo de "grandes cantidades de tareas" según el requerimiento, evitando que el DOM se sature con miles de elementos.
- **AOT & Standalone Architecture**: Reduce el bundle size y mejora el tiempo de carga inicial al no requerir el procesamiento de módulos pesados.
- **TrackByFn**: Mejora la eficiencia de las actualizaciones del DOM al informar a Angular qué elementos exactos han cambiado en la lista.

### 3. ¿Cómo aseguraste la calidad y mantenibilidad del código?
- **Servicios Desacoplados**: Lógica de datos (Tasks, Categories, RemoteConfig) separada de los componentes de UI.
- **Modelos fuertemente tipados**: Uso de interfaces en TypeScript para garantizar la integridad de los datos en toda la app.
- **Pruebas Unitarias**: Configuración de `TestBed` para validar que los componentes críticos se instancien correctamente incluso con dependencias complejas como el almacenamiento.
