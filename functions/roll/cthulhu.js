module.exports = (client, args, message, MessageEmbed) => {

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function doTheRoll() {

    const diceThrow = getRandomInt(1,101);
    var result = "";

    const toRoll = args[0];

    if (isNaN(parseInt(toRoll))){
      message.reply({ content: 'Mit Buchstaben kann ich den Wurf nicht vergleichen. Bitte nutze eine Zahl.'});
      return;
    }
    
    var result = 0;
    var resultDescription = '<@' + message.author.id + '> hat folgende Ergebnisse geworfen:\n\n';

    if (diceThrow === 1) {
      resultDescription += "```[" + diceThrow + "]```" + "\n\n**KRITISCHER ERFOLG**";
    } else if (diceThrow === 100) {
      resultDescription += "```[" + diceThrow + "]```" + "\n\n**KRITISCHER FEHLSCHLAG**";
    } else if (diceThrow >= 2 && diceThrow <= 10) {
      resultDescription += "```[" + diceThrow + "]```" + "\n\n**GROẞER ERFOLG**";
    } else if (diceThrow <= toRoll) {
      resultDescription += "```[" + diceThrow + "]```" + "\n\n**ERFOLG**";
    } else if (diceThrow > toRoll) {
      resultDescription += "```[" + diceThrow + "]```" + "\n\n**FEHLSCHLAG**";
    }

    const embedTemplate = new MessageEmbed()
          .setColor('#6f1f94')

    embedTemplate.setTitle('Cthulhu-Ergebnis');
    embedTemplate.setDescription(resultDescription);
    embedTemplate.setAuthor('P.A.P.I.');
    embedTemplate.setFooter('P.A.P.I. - Der Premium-Bot', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");    

    message.reply({ embeds: [embedTemplate] })

  }

  doTheRoll();

}