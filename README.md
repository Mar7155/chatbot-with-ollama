# Ollama Local Chat

Interfaz web para conversar con modelos de inteligencia artificial ejecutados localmente mediante [Ollama](https://ollama.com/). El objetivo del proyecto es ofrecer una experiencia de chat privada desde el navegador y, posteriormente, permitir el despliegue de la interfaz en una web que pueda comunicarse con Ollama cuando la PC anfitriona esté encendida.

## Estado actual

La aplicación se encuentra en fase de prototipo visual y de interacción:

- La interfaz de chat está construida con Next.js, React y componentes reutilizables.
- Hay un selector de modelos locales de ejemplo: Llama 3.2, Mistral y Gemma 2.
- Se pueden seleccionar modelos, crear un chat, cambiar entre conversaciones de ejemplo y añadir un modelo desde la interfaz.
- El envío de mensajes agrega la intervención del usuario y genera una respuesta simulada después de un breve intervalo.
- Los mensajes, modelos añadidos y chats se mantienen únicamente en el estado de React; no hay persistencia.
- La URL de Ollama se puede escribir en el formulario de conexión, pero todavía no se utiliza para realizar peticiones.

Por tanto, **la aplicación aún no consume modelos de Ollama**. La integración real es el siguiente paso de desarrollo.

## Tecnologías

- Next.js 16 con App Router
- React 19 y TypeScript
- Tailwind CSS 4
- Motion para animaciones de la interfaz
- Lucide React para iconos
- Componentes locales inspirados en shadcn/ui
- pnpm como gestor de paquetes

## Requisitos

- Node.js compatible con Next.js 16
- pnpm
- Para la futura integración: Ollama instalado en la PC que alojará los modelos

## Instalación y desarrollo

```bash
pnpm install
pnpm dev
```

Después, abre `http://localhost:3000` en el navegador.

También están disponibles los comandos de producción:

```bash
pnpm build
pnpm start
```

## Arquitectura actual

La aplicación es una página cliente única:

```text
app/layout.tsx       Metadatos, idioma y Analytics en producción
app/page.tsx         Interfaz de chat y estado de la sesión
app/globals.css      Tema visual, layout y estilos específicos
components/ui/       Botones, inputs, selectores, mensajes y burbujas
lib/utils.ts         Utilidades compartidas
public/              Recursos estáticos
```

El estado principal vive en `app/page.tsx`:

- `selectedModel`: modelo seleccionado.
- `messages`: mensajes visibles de la conversación.
- `savedModels`: modelos mostrados en el panel lateral.
- `activeChat`: conversación activa.
- `modelUrl`: URL introducida para Ollama, actualmente sin consumo de red.

## Flujo actual de conversación

1. El usuario selecciona uno de los modelos disponibles.
2. Escribe un mensaje en el campo inferior.
3. El mensaje se añade al estado local.
4. Una respuesta de demostración se añade mediante `setTimeout`.
5. La respuesta indica el modelo seleccionado, pero no proviene de ese modelo.

## Integración prevista con Ollama

La integración objetivo debe reemplazar la respuesta simulada por una llamada al endpoint de generación de Ollama, normalmente:

```text
POST http://localhost:11434/api/chat
```

La petición deberá incluir el nombre del modelo y el historial de mensajes. La respuesta deberá transformarse al formato de mensajes que utiliza la interfaz.

### Consideraciones para desarrollo local

- Ollama debe estar ejecutándose en la PC anfitriona.
- El modelo solicitado debe estar descargado en Ollama, por ejemplo mediante `ollama pull <modelo>`.
- Si el navegador y Ollama están en orígenes distintos, habrá que configurar CORS o usar una ruta del servidor Next.js como proxy.
- La URL de Ollama no debería exponerse directamente a Internet sin una capa de autenticación, control de acceso y validación.

### Consideraciones para desplegar la web

Desplegar únicamente el frontend no despliega los modelos. La PC que ejecuta Ollama debe seguir encendida y ser accesible desde el servidor o desde el navegador, según la arquitectura elegida.

Una arquitectura recomendada es:

```text
Navegador
   |
   v
Aplicación Next.js / ruta API proxy
   |
   v
Ollama en la PC anfitriona
   |
   v
Modelo local
```

Antes de producción será necesario decidir cómo se resolverán el acceso remoto, la autenticación, el cifrado HTTPS, la disponibilidad de la PC y el control de usuarios.

## Limitaciones conocidas

- No existe todavía un cliente HTTP para Ollama.
- No hay streaming de tokens.
- No hay manejo de errores de conexión, modelo inexistente o servidor apagado.
- Los chats no se guardan después de recargar la página.
- El botón de adjuntar archivos aún no implementa carga ni análisis.
- El formulario de modelo permite registrar datos visualmente, pero no valida ni prueba la conexión.
- La configuración de Next.js mantiene `ignoreBuildErrors: true`; conviene retirarla cuando el tipado del proyecto esté validado en CI.

## Próximos pasos

1. Extraer el cliente de Ollama a una función o módulo de servidor.
2. Añadir una ruta API de Next.js para proteger la comunicación entre navegador y Ollama.
3. Sustituir la respuesta simulada por `api/chat` y mapear el historial real.
4. Implementar streaming para mostrar la respuesta mientras se genera.
5. Añadir estados de carga, desconexión y error.
6. Persistir conversaciones, inicialmente en almacenamiento local y después en una base de datos si se necesita acceso multiusuario.
7. Definir autenticación y una estrategia segura de acceso cuando la interfaz se publique en Internet.
8. Añadir pruebas para selección de modelo, envío de mensajes y fallos de conexión.

## Licencia

No se ha definido una licencia para este proyecto.