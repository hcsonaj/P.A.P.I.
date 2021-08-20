module.exports = (client, args, message, MessageEmbed) => {

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function doTheRoll() {

    var toSplit = "";

    if (args[0]) {

      if (!args[0].includes('d') && !args[0].includes('w')) {
        message.reply({ content: 'Wupps, da hast du dich wohl vertippt. Da war kein *d* oder ein *w* in deinem Command für den "Dice" oder "Würfel"'});
        return;
      }

      if (!args[0].includes('d') && args[0].includes('w')) {
        toSplit = "w";
      } else if (args[0].includes('d') && !args[0].includes('w')) {
        toSplit = "d";
      }
      const rollActual = args[0].split(toSplit);

      if (isNaN(parseInt(rollActual[0])) || isNaN(parseInt(rollActual[1]))){
        message.reply({ content: 'Mit Buchstaben kann ich noch nicht würfeln. Bitte nutze vor und nach den *d* eine Zahl.'});
        return;
      }
      
      var result = 0;
      var resultDescription = '<@' + message.author.id + '> hat folgende Ergebnisse geworfen:\n\n```';
      var resultMod = "";

      for (let i = 0; i < rollActual[0]; i++) {

        tempRoll = getRandomInt(1,(parseInt(rollActual[1]) + 1))
        result += tempRoll;
        resultDescription += '[' + tempRoll + '] ';

      }

      if (args.length > 1) {

        if (args.length == 2) {

          newArgs = args[1].split('');

          resultDescription += newArgs[0] + ' [' + newArgs[1] + ']';
          if (newArgs[0] === "+") { result = +result + +newArgs[1] }
          else if (newArgs[0] === "-") { result = +result - +newArgs[1] }
          else if (newArgs[0] === "*") { result = +result * +newArgs[1] }
          else if (newArgs[0] === "/") { result = +result / +newArgs[1] }

        } else {

          resultDescription += args[1] + ' [' + args[2] + ']';
          if (args[1] === "+") { result = +result + +args[2] }
          else if (args[1] === "-") { result = +result - +args[2] }
          else if (args[1] === "*") { result = +result * +args[2] }
          else if (args[1] === "/") { result = +result / +args[2] }

        }


      }

      resultDescription += '```\n\nGesamtergebnis: **' + result.toFixed(0) + '**';

      const embedTemplate = new MessageEmbed()
          .setColor('#6f1f94')

      embedTemplate.setTitle('Würfelergebnis');
      embedTemplate.setDescription(resultDescription);
      embedTemplate.setAuthor('P.A.P.I.');
      embedTemplate.setFooter('P.A.P.I. - Der Premium-Bot', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");      

      message.reply({ embeds: [embedTemplate] }).then(sentEmbed => {

        sentEmbed.react("🎲");

      });

    } else {
      message.reply({content: 'Falsche Eingabe: `!papi roll xdy`'})
    }

  }

  doTheRoll();

}