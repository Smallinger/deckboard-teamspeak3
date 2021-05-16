/**
 * @autor Marc Schirrmann <https://github.com/Smallinger>
 */
const { TeamSpeakClient } = require("node-ts");
const { Extension, log, INPUT_METHOD, PLATFORMS } = require('deckboard-kit');
var apiKey = "";
var isClientID = 0;
var isInputMuted = 0;
var isOutputMuted = 0;
var isAway = 0;

// create client!
const client = new TeamSpeakClient("localhost", 25639);
// Error Handling
client.on('error', function(error){
	if(error.code == 'ECONNREFUSED'){
		log.error('TeamSpeak not Running, or ClientQuery not active!')
	}else {
		log.error(error)
	}
});

class Teamspeak3Extension extends Extension {
	constructor() {
		super();
		this.name = 'TeamSpeak 3';
		this.platforms = [PLATFORMS.WINDOWS, PLATFORMS.MAC];
		this.inputs = [
			{
				label: 'Toggle AFK',
				value: 'toggle-afk',
				icon: 'user-slash',
				color: '#2a3b68'
			},
			{
				label: 'Toggle Mic',
				value: 'toggle-microphone',
				icon: 'microphone',
				color: '#2a3b68'
			},
			{
				label: 'Toggle Sound',
				value: 'toggle-sound',
				icon: 'headphones',
				color: '#2a3b68'
			},
		];
		this.configs = {
			clientQueryApiKey: {
				type: "array",
				name: 'ClientQuery API Key:',
				descriptions: '',
				value: ['Copy your APIKEY HERE you can find it under Tools -> Options -> Addons -> ClientQuery Settings\nAfter that click on "Save" and restart deckboard']
			}
		};
	}	
	async toggleAFKClient() {
		try {
			await client.connect();
			await client.setTimeout(500);
			apiKey = this.configs.clientQueryApiKey.value[0];
			await client.send('auth', {apikey: `${apiKey}`});
			await client.send('use');
			var clid = await client.send('whoami');
			isClientID = clid.response[0].clid;
			var cvbafk = await client.send('clientvariable', {clid: isClientID, client_away: '' });
			isAway = cvbafk.response[0].client_away;
			if (isAway == 0) {
				await client.send('clientupdate',{client_away: 1})
				isAway = 1;
			} else {
				await client.send('clientupdate',{client_away: 0})
				isAway = 0;
			}
		} catch (e) {
			log.error(e)
		}
	}

	async muteInputClient() {
		try {
			await client.connect();
			await client.setTimeout(500);
			apiKey = this.configs.clientQueryApiKey.value[0];
			await client.send('auth', {apikey: `${apiKey}`});
			var clid = await client.send('whoami');
			isClientID = clid.response[0].clid;
			var cvbim = await client.send('clientvariable', {clid: isClientID, client_input_muted: '' });
			isInputMuted = cvbim.response[0].client_input_muted;
			if (isInputMuted == 0) {
				await client.send('clientupdate',{client_input_muted: 1})
				isInputMuted = 1;
			} else {
				await client.send('clientupdate',{client_input_muted: 0})
				isInputMuted = 0;
			}
		} catch (e) {
			log.error(e)
		}
	}

	async muteOutputClient() {
		try {
			await client.connect();
			await client.setTimeout(500);
			apiKey = this.configs.clientQueryApiKey.value[0];
			await client.send('auth', {apikey: `${apiKey}`});
			var clid = await client.send('whoami');
			isClientID = clid.response[0].clid;
			var cvbom = await client.send('clientvariable', {clid: isClientID, client_output_muted: '' });
			isOutputMuted = cvbom.response[0].client_output_muted;
			if (isOutputMuted == 0) {
				await client.send('clientupdate',{client_output_muted: 1})
				isOutputMuted = 1;
			} else {
				await client.send('clientupdate',{client_output_muted: 0})
				isOutputMuted = 0;
			}
		} catch (e) {
			log.error(e)
		}
	}

	execute(action) {
		switch (action) {
			case 'toggle-afk':
				this.toggleAFKClient();
				break;
			case 'toggle-microphone':
				this.muteInputClient();
				break;
			case 'toggle-sound':
				this.muteOutputClient();
				break;
			default:
				break;
		}
	};
}

module.exports = new Teamspeak3Extension();
