const express = require('express');
mysql = require('mysql');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Are you ready?'));

app.listen(port, () =>
	console.log(`P.A.P.I. hört auf http://localhost:${port}`)
);

// ================= MYSQL-CONNECTION =================

mysql = require('mysql');
var con = mysql.createPool({
	host: 'sql84.your-server.de',
	user: 'wp_penjan_1_w',
	password: 'GsCMvu7Rub7tRcn7',
	database: 'wp_penjan_db1',
	charset: 'utf8mb4_unicode_ci'
});

con.getConnection(function(err) {
	if (err) throw err;
	console.log('Datenbank-Verbindung steht!');
});

// ================= START BOT CODE ===================

const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const prefix = '!papi ';
var cleanURL;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('!papi', { type: 'LISTENING' });

	const welcome = require('./functions/welcome.js');
	welcome(client);

	const role = require('./functions/role.js');
	role(client);
});

client.on('message', function(message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	var cleanType = '';
	var cleanBeginner = '';

  var isAdmin = false;

  if (message.member.roles.cache.some(role => role.name === 'Admin')) {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

	const messageChannelID = message.author.lastMessageChannelID;

	switch (command) {
		case 'update': {
      if (isAdmin) {
        message.delete();
        const update = require('./functions/update.js');
			  update(client, message, con, Discord);
      } else {
        message.reply('Heyyy, du hast einen Befehl gefunden der nur für Administratoren ist. Herzlichen Glückwunsch!')
      }
			break;
		}
    case 'post': {
      if (isAdmin) {
        message.delete();
        const post = require('./functions/post.js');
			  post(client, args, message, con, Discord);
      } else {
        message.reply('Heyyy, du hast einen Befehl gefunden der nur für Administratoren ist. Herzlichen Glückwunsch!')
      }
			break;
		}
    case 'spieler': {
			message.delete();
			const spieler = require('./functions/spieler.js');
			spieler(message, con, Discord);
			break;
		}
    case 'leiter': {
			message.delete();
			const leiter = require('./functions/leiter.js');
			leiter(message, con, Discord);
			break;
		}
		case 'bump': {
      if (isAdmin) {
        message.delete();
        const bump = require('./functions/bump.js');
        bump(client);
      } else {
        message.reply('Heyyy, du hast einen Befehl gefunden der nur für Administratoren ist. Herzlichen Glückwunsch!')
      }
			break;
		}
		case 'roll': {
			const rollSimple = require('./functions/roll/simple.js');
			rollSimple(client, args, message, Discord);
			break;
		}
		case 'help': {
			message.delete();
			const help = require('./functions/help.js');
			help(client, message, Discord);
			break;
		}
		case 'stats': {
      if (isAdmin) {
        message.delete();
        const stats = require('./functions/stats.js');
        stats(client, message, Discord);
      } else {
        message.reply('Heyyy, du hast einen Befehl gefunden der nur für Administratoren ist. Herzlichen Glückwunsch!')
      }
			break;
		}
    case 'play': {
      message.delete();
			const play = require('./functions/music/play.js');
			play(client, args, message, Discord);
			break;
		}
    case 'stop': {
			message.delete();
			const stop = require('./functions/music/stop.js');
			stop(message);
			break;
		}
		default: {
			message.reply(
				'Das war leider kein offizieller Command. Für Hilfe nutze bitte den Command **!papi help**'
			);
			break;
		}
	}
});

// You really don't want your token here since your repl's code
// is publically available. We'll take advantage of a Repl.it
// feature to hide the token we got earlier.
client.login(process.env['DISCORD_TOKEN']);
