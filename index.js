const express = require('express');
mysql = require('mysql');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Are you ready?'));

app.listen(port, () =>
	console.log(`P.A.P.I. hört auf http://localhost:${port}`)
);

// ================= MYSQL-CONNECTION =================

var con = mysql.createPool({
	host: 'sql84.your-server.de',
	user: 'wp_penjan_1_w',
	password: 'GsCMvu7Rub7tRcn7',
	database: 'wp_penjan_db1',
	charset: 'utf8mb4_unicode_ci',
	connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000
});

con.getConnection(function(err) {
	if (err) throw err;
	console.log('Datenbank-Verbindung steht!');
});

// ================= START BOT CODE ===================

const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES ]
});

const prefix = '!papi ';
var cleanURL;

client.on('ready', () => {

	console.log(`Angemeldet als: ${client.user.tag}!`);
	client.user.setActivity('!papi', { type: 'LISTENING' });

	const welcome = require('./functions/welcome.js');
	welcome(client);

	const role = require('./functions/role.js');
	role(client);

  const parti = require('./functions/newParti.js');
	parti(client, con);

});

client.on('messageCreate', function(message) {

	//if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	var cleanType = '';
	var cleanBeginner = '';

  var isAdmin = false;

  if (message.member.roles.cache.some(role => role.name === 'Pen-And-Paper.info-Team')) {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

	const messageChannelID = message.author.lastMessageChannelID;

	switch (command) {
		/* case 'update': {
      if (isAdmin) {
        const update = require('./functions/update.js');
			  update(client, message, con, MessageEmbed);
      } else {
        message.reply({content: 'Heyyy, du hast einen Befehl gefunden der nur für Administratoren ist. Herzlichen Glückwunsch!'})
      }
			break;
		} */
    case 'calc': {
      if (isAdmin) {
        const calc = require('./functions/calc.js');
			  calc(message, args, MessageEmbed);
      } else {
        message.reply({content: 'Heyyy, du hast einen Befehl gefunden der nur für Administratoren ist. Herzlichen Glückwunsch!'})
      }
			break;
		}
    case 'post': {
      if (args[0]){
        const post = require('./functions/post.js');
        post(client, args, message, con, MessageEmbed);
      } else {
        message.reply({content: 'Bitte gibt eine URL mit an, sonst funktioniert dieser Command nicht.\n\n`!papi post *url*`'})
      }
			break;
		}
    case 'spieler': {
			const spieler = require('./functions/spieler.js');
			spieler(message, con, MessageEmbed);
			break;
		}
    case 'leiter': {
			const leiter = require('./functions/leiter.js');
			leiter(message, con, MessageEmbed);
			break;
		}
    case 'gen': {
			const gen = require('./functions/generate.js');
			gen(message, args, MessageEmbed);
			break;
		}
		case 'roll': {
			const rollSimple = require('./functions/roll/simple.js');
			rollSimple(client, args, message, MessageEmbed);
			break;
		}
    case 'r': {
      if (args[0] === 'sr') {
        args.shift();
        const shadowrun = require('./functions/roll/shadowrun.js');
        shadowrun(client, args, message, MessageEmbed);
      } else if (args[0] === 'ct') {
        args.shift();
        const cthulhu = require('./functions/roll/cthulhu.js');
        cthulhu(client, args, message, MessageEmbed);
      } else {
        message.reply({ content: 'Upps, hier fehlt mir das Spielsystem auf das ich würfeln soll. Mögliche Spielsysteme:\n\nShadowrun => !papi r sr {x}\n\nCthulhu => !papi r ct {x}'});
      }
      break;
    }
    case 'poll': {
			const poll = require('./functions/poll.js');
			poll(client, args, message, MessageEmbed, con);
			break;
		}
		case 'help': {
			const help = require('./functions/help.js');
			help(client, message, args, MessageEmbed);
			break;
		}
		case 'stats': {
      if (isAdmin) {
        const stats = require('./functions/stats.js');
        stats(client, message, MessageEmbed);
      } else {
        message.reply({ content: 'Heyyy, du hast einen Befehl gefunden der nur für Administratoren ist. Herzlichen Glückwunsch!'})
      }
			break;
		}
    case 'music': {
      /* if (args[0] === "play") {
        args.shift();
        const play = require('./functions/music/play.js');
        play(client, args, message);    
      } else if (args[0] === "stop") {
        args.shift();
        const stop = require('./functions/music/play.js');
        stop(message);    
      } else {
	      message.reply(
				  { content: 'Das war leider kein offizieller Command. Für Hilfe nutze bitte den Command **!papi help**'}
			  );
      } */
      message.reply({ content: 'Heyyy, du hast einen Befehl gefunden der nur für Administratoren ist. Herzlichen Glückwunsch!'})
      break;
      
		}
		default: {
			message.reply(
				{ content: 'Das war leider kein offizieller Command. Für Hilfe nutze bitte den Command **!papi help**'}
			);
			break;
		}
	}
});

var counter = 0;

client.on('messageReactionAdd', async (reaction, user) => {

	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Ich konnte eine Nachricht nicht wiederfinden finden: ', error);
			return;
		}
	}

  if (reaction.message.channel.id != '871336259803553792' && counter === 0) {

    if (reaction._emoji.name === '🎲' && !user.bot) {
      
      if (reaction.message.author.id != '862014814745264188') {
        return;
      }

      var messageId = reaction.message.reference.messageId;
      var channelId = reaction.message.reference.channelId;
      client.channels.cache.get(channelId).fetch(messageId).then(cnl => {
        cnl.messages.fetch(messageId).then(msg => {

          const commandBody2 = msg.content.slice(prefix.length);
	        const args2 = commandBody2.split(' ');
	        const command2 = args2.shift().toLowerCase();

          counter++;
          setTimeout(() => {
            counter = 0;
          }, 2000)

          const rollSimple = require('./functions/roll/simple.js');
			    rollSimple(client, args2, msg, MessageEmbed, user.id);

        })
      });

    } else if (reaction._emoji.name === 'cutehulhu' && !user.bot) {
      
      if (reaction.message.author.id != '862014814745264188') {
        return;
      }

      var messageId = reaction.message.reference.messageId;
      var channelId = reaction.message.reference.channelId;
      client.channels.cache.get(channelId).fetch(messageId).then(cnl => {
        cnl.messages.fetch(messageId).then(msg => {

          const commandBody2 = msg.content.slice(prefix.length);
	        const args2 = commandBody2.split(' ');
	        const command2 = args2.shift().toLowerCase();

          counter++;
          setTimeout(() => {
            counter = 0;
          }, 2000)

          args2.shift();

          const cthulhu = require('./functions/roll/cthulhu.js');
          cthulhu(client, args2, msg, MessageEmbed, user.id);

        })
      });

    } else if (['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].includes(reaction._emoji.name) && !user.bot) {

      if (reaction.message.author.id != '862014814745264188') {
        return;
      }

      var data;
      var argsPoll;

      con.query(`SELECT * FROM bot_messages WHERE messageID = '${reaction.message.id}'`,async (err,result)=>{

        data = JSON.parse(result[0].data);
        users = JSON.parse(result[0].users);
        argsPoll = result[0].args;

        const redo_poll = require('./functions/redo/redo-poll.js');
			  redo_poll(client, argsPoll, reaction.message, MessageEmbed, con, data, users, user, reaction._emoji.name, '+');

      });

    }

  }
	
});


client.on('messageReactionRemove', async (reaction, user) => {

	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Ich konnte eine Nachricht nicht wiederfinden finden: ', error);
			return;
		}
	}

  if (reaction.message.channel.id != '871336259803553792' && counter === 0) {

    if (['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].includes(reaction._emoji.name) && !user.bot) {

      if (reaction.message.author.id != '862014814745264188') {
        return;
      }

      var data;
      var argsPoll;

      con.query(`SELECT * FROM bot_messages WHERE messageID = '${reaction.message.id}'`,async (err,result)=>{

        data = JSON.parse(result[0].data);
        users = JSON.parse(result[0].users);
        argsPoll = result[0].args;

        const redo_poll = require('./functions/redo/redo-poll.js');
			  redo_poll(client, argsPoll, reaction.message, MessageEmbed, con, data, users, user, reaction._emoji.name, '-');

      });

    }

  }

});

// You really don't want your token here since your repl's code
// is publically available. We'll take advantage of a Repl.it
// feature to hide the token we got earlier.

client.login(process.env['DISCORD_TOKEN']);