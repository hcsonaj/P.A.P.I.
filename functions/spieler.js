module.exports = (message, con, MessageEmbed) => {

  var user = message.author.username + '#' + message.author.discriminator;

  con.query(`SELECT pap_leiten.title, pap_leiten.discord_name, pap_leiten.date_playing, pap_leiten.currentPlayer, pap_leiten.maxplayer, pap_systems.name FROM pap_leiten, pap_spieler, pap_systems WHERE pap_leiten.active = '1' AND pap_systems.id = pap_leiten.system AND pap_spieler.runde = pap_leiten.id AND pap_spieler.discord_name = '` + user + `'`,(err,result)=>{

    if(err){ throw err }

    const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')
 
    embedTemplate.setTitle('P.A.P.I. - Deine Anmeldungen auf der Webseite');
    embedTemplate.setAuthor('P.A.P.I.', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");

    if (result.length >= 1) {
      result.forEach(value => {
        const string = value.discord_name + '\n' + value.date_playing + '\n' + value.currentPlayer + "/" + value.maxplayer + "\n" + value.name;
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
    message.delete();  

  });

}