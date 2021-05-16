# Deckboard-TeamSpeak 3
Allows you to interact with the TeamSpeak 3 Client via the ClientQuery (Telnet) with your Deckboard.

## Requirements
You need to have the [ClientQuery plugin](https://www.myteamspeak.com/addons/943dd816-7ef2-48d7-82b8-d60c3b9b10b3) installed in your TeamSpeak 3 Client in order to use this plugin.
## Install & Configuration 



### Manual Installation
1. Install the latest version from the [releases tab](https://github.com/Smallinger/deckboard-teamspeak3/releases)
2. Copy the downloaded file, an paste it into your C:\Users\<Your Username>\deckboard\extensions
3. Open TeamSpeak go to Tools -> Options -> Addons -> and click on the "Settings" button on the rightside from the ClientQuery Plugin.
4. Copy your API Key.
5. Open Deckboard click on the ⚙ Icon on the upper right corner.
6. Go in the Extensions Tab and then press on the right side on Configs.
7. There is a new field "ClientQuery API Key:" delete everything in it thats only your key is visited.
8. Click on Save and restart Deckboard.
9. Select your specific board and add a new Button, scroll under action down until you find TeamSpeak 3 integration, select your action.

![Instructions](https://raw.githubusercontent.com/Smallinger/deckboard-teamspeak3/main/installtion.gif)

# Changelog

1.0b1 - first Released!

# Credits

Credits go out to [Niklas Mollenhauer](https://github.com/nikeee). I modify his [node-ts Module](https://github.com/nikeee/node-ts) a little bit to get it working.
