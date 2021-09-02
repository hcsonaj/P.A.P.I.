module.exports = (client, args, message, con, MessageEmbed) => {

  htmlEntities = require("html-entities"); 

  function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt|ouml|auml|szlig|ndash|uuml|ccedil);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">",
        "ouml" : "ö",
        "auml" : "ä",
        "szlig" : "ß",
        "ndash" : "-",
        "uuml" : "ü",
        "ccedil" : "ç"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
  }

  const rundeID = args[0].split("=");

  var errorCount = 0;

  con.query(`SELECT pap_leiten.id, pap_leiten.title, pap_leiten.description, pap_leiten.image, pap_leiten.discord_name, pap_leiten.date_playing, pap_leiten.campain, pap_leiten.oneshot, pap_leiten.multishot, pap_leiten.beginners, pap_leiten.currentPlayer, pap_leiten.maxplayer, pap_systems.name FROM pap_leiten, pap_systems WHERE pap_leiten.id = '${rundeID[1]}' AND pap_systems.id = pap_leiten.system`,async (err,result)=>{

    if(err){ throw err }

    if(result.length === 0) {
      errorCount++;
      return;
    }

    const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')

    cleanURL = result[0].image.replaceAll(' ', '%20');

    if (result[0].oneshot === 1) { cleanType = "Oneshot"; }
    if (result[0].campain === 1) { cleanType = "Kampagne"; }
    if (result[0].multishot === 1) { cleanType = "Multishot"; }
    if (result[0].beginners === 1) { cleanBeginner = "JA"; } else { cleanBeginner = "NEIN"; }
    

    var cleanDescription = htmlEntities.decode(result[0].description).replace(/(<([^>]+)>)/gi, "");

    embedTemplate.setURL("https://pen-and-paper.info/event/?id=" + result[0].id);
    embedTemplate.setTitle(decodeEntities(result[0].title));
    embedTemplate.setDescription(decodeEntities(cleanDescription).substring(0, 500) + ' [...]');
    embedTemplate.setImage(cleanURL);
    if(result[0].date_playing != "0000-00-00 00:00:00") {
      let niceDate = new Date(result[0].date_playing);
      niceDate.setHours(niceDate.getHours() - 2);
      embedTemplate.setTimestamp(niceDate);
    }
    embedTemplate.addFields(
      { name: 'System', value: '```' + result[0].name + '```' },
      { name: 'Typ', value: '```' + cleanType + '```' , inline: true },
      { name: 'Spieler (Stand: Post-Datum)', value: '```' + result[0].currentPlayer + ' / ' + result[0].maxplayer + '```', inline: true },
      { name: 'für Beginner', value: '```' + cleanBeginner + '```', inline: true }
    )
    embedTemplate.setFooter(result[0].discord_name, "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");  
    message.reply({ embeds: [embedTemplate] });

    con.query(`UPDATE pap_leiten SET posted = '1' WHERE id = '${result[0].id}'`,(err,result)=>{
      return;
    })   

  });
  
  if (errorCount === 1) {

  con.query(`SELECT pap_leiten.id, pap_leiten.title, pap_leiten.description, pap_leiten.image, pap_leiten.discord_name, pap_leiten.date_playing, pap_leiten.campain, pap_leiten.oneshot, pap_leiten.multishot, pap_leiten.beginners, pap_leiten.currentPlayer, pap_leiten.maxplayer, pap_leiten.system FROM pap_leiten, pap_systems WHERE pap_leiten.id = '${rundeID[1]}'`,async (err,result)=>{

    if(err){ throw err }

    if(result.length === 0) {
      errorCount++;
      return;
    }

    const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')

    cleanURL = result[0].image.replaceAll(' ', '%20');

    if (result[0].oneshot === 1) { cleanType = "Oneshot"; }
    if (result[0].campain === 1) { cleanType = "Kampagne"; }
    if (result[0].multishot === 1) { cleanType = "Multishot"; }
    if (result[0].beginners === 1) { cleanBeginner = "JA"; } else { cleanBeginner = "NEIN"; }
    

    var cleanDescription = htmlEntities.decode(result[0].description).replace(/(<([^>]+)>)/gi, "");

    embedTemplate.setURL("https://pen-and-paper.info/event/?id=" + result[0].id);
    embedTemplate.setTitle(decodeEntities(result[0].title));
    embedTemplate.setDescription(decodeEntities(cleanDescription).substring(0, 500) + ' [...]');
    embedTemplate.setImage(cleanURL);
    if(result[0].date_playing != "0000-00-00 00:00:00") {
      let niceDate = new Date(result[0].date_playing);
      let nicerDate = niceDate.toLocaleDateString('de-DE', options);
      embedTemplate.setTimestamp(nicerDate);
    }
    embedTemplate.addFields(
      { name: 'System', value: '```' + result[0].system + '```' },
      { name: 'Typ', value: '```' + cleanType + '```' , inline: true },
      { name: 'Spieleranzahl', value: '```' + result[0].currentPlayer + ' / ' + result[0].maxplayer + '```', inline: true },
      { name: 'für Beginner', value: '```' + cleanBeginner + '```', inline: true }
    )
    embedTemplate.setFooter(result[0].discord_name, "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");  
    message.reply({ embeds: [embedTemplate] }); 

    con.query(`UPDATE pap_leiten SET posted = '1' WHERE id = '${result[0].id}'`,(err,result)=>{
      return;
    })

  });
  
  }

  setTimeout(function () {message.delete();}, 3000);  

  if (errorCount > 0) {
    message.reply({ content: 'Keine Runde mit der ID gefunden!' });
  }

}