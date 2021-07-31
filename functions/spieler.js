module.exports = (message, con, MessageEmbed) => {

  var user = message.author.username + '#' + message.author.discriminator;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  con.query(`SELECT pap_leiten.title, pap_leiten.discord_name, pap_leiten.date_playing, pap_leiten.currentPlayer, pap_leiten.maxplayer, pap_systems.name FROM pap_leiten, pap_spieler, pap_systems WHERE pap_leiten.active = '1' AND pap_systems.id = pap_leiten.system AND pap_spieler.runde = pap_leiten.id AND pap_spieler.discord_name = '` + user + `'`,(err,result)=>{

    if(err){ throw err }

    const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')
 
    embedTemplate.setTitle('P.A.P.I. - Deine Anmeldungen auf der Webseite');
    embedTemplate.setAuthor('P.A.P.I.', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");

    if (result.length >= 1) {
      result.forEach(value => {
        if (value.date_playing != "0000-00-00 00:00:00") {
          var niceDate = new Date(value.date_playing);
          var nicerDate = niceDate.toLocaleDateString('de-DE', options);
        } else {
          var nicerDate = "- Datum unsicher -";
        }
        const string = value.discord_name + '\n' + nicerDate + '\n' + value.currentPlayer + "/" + value.maxplayer + "\n" + value.name;
        embedTemplate.addFields(
          { name: value.title, value: '```' + string + '```' }
        )
      })
    } else {
      embedTemplate.addFields(
        { name: 'Upps', value: '```' + 'Du hast gerade keine aktiven Anmeldungen. Schnell, such dir eine Runde!' + '```' }
      )
    }

    embedTemplate.setFooter('P.A.P.I. - Bot');  
    message.reply({ embeds: [embedTemplate] });
    setTimeout(function () {message.delete();}, 200);   

  });

}