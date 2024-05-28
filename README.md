# Mike 🤖

Mike es un bot de Discord que proporciona varias funcionalidades útiles para gestionar tu servidor de Discord. Este bot incluye comandos para gestionar idiomas, moderación, y más.

## ✨ Características

- 🌐 Cambiar el idioma del bot.
- 🛡️ Sistema de moderación y registros.
- ⚙️ Responder a comandos personalizados.
- 🔗 Integraciones con varias API.

## 📋 Requisitos

- 📦 Node.js v14 o superior.
- 📦 npm (Node Package Manager).
- 👤 Una cuenta de Discord y un servidor donde tengas permisos de administrador.
- 🛠️ Un bot de Discord configurado en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications).

## 🚀 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/MichaelQhdez/Mike-Bot.git
   cd Mike-Bot
   ```
   
2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo .env en la raíz del proyecto y añade tu token de bot de Discord:
   ```env
   DISCORD_TOKEN=your-bot-token-here
   ```

4. Crea un archivo config.json en la carpeta `config` y configura tu ID de cliente y de servidor, el prefijo y el idioma por defecto del bot:
   ```json
   {
      "clientId": "your-client-id-here",
      "guildId": "your-guild-id-here",
      "language": "default-bot-language",
      "prefix": "bot-prefix"
   }
   ```

5. Inicia el bot:

   ```bash
   node index.js
   ```

## 🔗 Invitación 

- Puedes invitar a **Mike** a tu servidor a través de este [Enlace](https://discord.com/oauth2/authorize?client_id=1241620050683891752&permissions=8&scope=bot+applications.commands)

## 🤝 Contribuciones
- Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cualquier cambio importante antes de enviar un pull request.


### *¡Gracias por usar el bot! 🎉*
