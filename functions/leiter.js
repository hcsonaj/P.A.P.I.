module.exports = (message, con, MessageEmbed) => {

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


  var today = new Date();
  var month = today.getMonth();
  if (month.length === 1) {
    month = "0" + (parseInt(today.getMonth()) + 1);
  } else {
    month = (parseInt(today.getMonth()) + 1);
  }
  today = today.getFullYear() + "-" + month + "-" + today.getDate(); 

  var user = message.author.username + '#' + message.author.discriminator;

  con.query(`SELECT pap_leiten.title, pap_leiten.discord_name, pap_leiten.date_playing, pap_leiten.currentPlayer, pap_leiten.maxplayer, pap_systems.name FROM pap_leiten, pap_systems WHERE pap_leiten.date_playing >= '${today}' AND pap_leiten.active = '1' AND pap_systems.id = pap_leiten.system AND pap_leiten.discord_name = '` + user + `'`,(err,result)=>{

    if(err){ throw err }

    const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')
 
    embedTemplate.setTitle('Deine Spielrunden auf unserer Webseite');
    embedTemplate.setAuthor('P.A.P.I.');

    if (result.length >= 1) {
      result.forEach(value => {
        if (value.date_playing != "0000-00-00 00:00:00") {
          var niceDate = new Date(value.date_playing);
          var nicerDate = niceDate.toLocaleDateString('de-DE', options);
        } else {
          var nicerDate = "- Datum unsicher -";
        }
        
        const string = value.currentPlayer + "/" + value.maxplayer + "\n" + value.name + '\n' + nicerDate;
        embedTemplate.addFields(
          { name: value.title, value: '```' + string + '```' }
        )
      })
    } else {
      embedTemplate.addFields(
        { name: 'Upps', value: '```' + 'Du hast gerade keine aktiven Spielrunden. Schnell, leg doch eine an!' + '```' }
      )
    }
    
    embedTemplate.setFooter('P.A.P.I. - Der Premium-Bot', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");  
    message.reply({ embeds: [embedTemplate] });
    setTimeout(function () {message.delete();}, 500);   

  });

}