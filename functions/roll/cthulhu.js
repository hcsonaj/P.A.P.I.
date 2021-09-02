module.exports = (client, args, message, MessageEmbed, reactionID) => {

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var dice_good = ['NULL'];
  var dice_bad = ['NULL'];

  dice_good[0] = client.emojis.cache.find(emoji => emoji.name === "dice_good_0");
  dice_good[1] = client.emojis.cache.find(emoji => emoji.name === "dice_good_1");
  dice_good[2] = client.emojis.cache.find(emoji => emoji.name === "dice_good_2");
  dice_good[3] = client.emojis.cache.find(emoji => emoji.name === "dice_good_3");
  dice_good[4] = client.emojis.cache.find(emoji => emoji.name === "dice_good_4");
  dice_good[5] = client.emojis.cache.find(emoji => emoji.name === "dice_good_5");
  dice_good[6] = client.emojis.cache.find(emoji => emoji.name === "dice_good_6");
  dice_good[7] = client.emojis.cache.find(emoji => emoji.name === "dice_good_7");
  dice_good[8] = client.emojis.cache.find(emoji => emoji.name === "dice_good_8");
  dice_good[9] = client.emojis.cache.find(emoji => emoji.name === "dice_good_9");

  dice_bad[0] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_0");
  dice_bad[1] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_1");
  dice_bad[2] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_2");
  dice_bad[3] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_3");
  dice_bad[4] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_4");
  dice_bad[5] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_5");
  dice_bad[6] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_6");
  dice_bad[7] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_7");
  dice_bad[8] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_8");
  dice_bad[9] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_9");

  cutehulhu = client.emojis.cache.find(emoji => emoji.name === "cutehulhu");
  dice_cthulhu_1 = client.emojis.cache.find(emoji => emoji.name === "dice_cthulhu_1");
  dice_cthulhu_100 = client.emojis.cache.find(emoji => emoji.name === "dice_cthulhu_100");


  function doTheRoll() {

    const diceThrow = getRandomInt(1,101);
    var result = "";

    const toRoll = args[0];

    if (isNaN(parseInt(toRoll))){
      message.reply({ content: 'Mit Buchstaben kann ich den Wurf nicht vergleichen. Bitte nutze eine Zahl.'});
      return;
    }
    
    var result = 0;
    if (reactionID != null) {
      var resultDescription = '\n\n<@' + reactionID + '> hat folgende Ergebnisse geworfen:\n\n';
    } else {
      var resultDescription = '\n\n<@' + message.author.id + '> hat folgende Ergebnisse geworfen:\n\n';
    }

    var diceThrowArray = [];
    var diceResult = "";

    if (diceThrow > 9) {
      diceThrowArray = diceThrow.toString().split('');
    } else {
      diceThrowArray[0] = diceThrow;
    }

    let toRollFifth = (toRoll / 5).toFixed(0);
    let toRollHalf = (toRoll / 2).toFixed(0);



    const embedTemplate = new MessageEmbed()
          .setColor('#6f1f94')


    if (diceThrow === 1) {

      resultDescription += '<:dice_cthulhu_1:' + dice_cthulhu_1 + '> auf eine ' + toRoll + "\n\n**KRITISCHER ERFOLG**\n\n";

    } else if (toRoll >= 50 && diceThrow === 100) {

      resultDescription += '<:dice_cthulhu_100:' + dice_cthulhu_100 + '> auf eine ' + toRoll + "\n\n**KRITISCHER FEHLSCHLAG**\n\n";

    } else if (toRoll < 50 && diceThrow > 94) {

      diceThrowArray.forEach(value => {
        diceResult += '<:dice_bad_' + value + ':' + dice_bad[value] + '>';
      })

      resultDescription += diceResult + '> auf eine ' + toRoll + "\n\n**KRITISCHER FEHLSCHLAG**\n\n";

    } else if (diceThrow <= toRollFifth) {

      diceThrowArray.forEach(value => {
        diceResult += '<:dice_good_' + value + ':' + dice_good[value] + '>';
      })

      resultDescription += diceResult + ' auf eine ' + toRoll + "\n\n**EXTREMER ERFOLG**\n\n";

    } else if (diceThrow <= toRollHalf) {

      diceThrowArray.forEach(value => {
        diceResult += '<:dice_good_' + value + ':' + dice_good[value] + '>';
      })

      resultDescription += diceResult + ' auf eine ' + toRoll + "\n\n**SCHWIERIGER ERFOLG**\n\n";

    } else if (diceThrow <= toRoll) {

      diceThrowArray.forEach(value => {
        diceResult += '<:dice_good_' + value + ':' + dice_good[value] + '>';
      })

      resultDescription += diceResult + ' auf eine ' + toRoll + "\n\n**ERFOLG**\n\n";

    } else if (diceThrow > toRoll) {

      diceThrowArray.forEach(value => {
        diceResult += '<:dice_bad_' + value + ':' + dice_bad[value] + '>';
      })

      resultDescription += diceResult + ' auf eine ' + toRoll + "\n\n**FEHLSCHLAG**\n\n";

    }


    embedTemplate.setTitle('<:cutehulhu:' + cutehulhu + '> Cthulhu-Ergebnis <:cutehulhu:' + cutehulhu + '>');
    embedTemplate.setDescription(resultDescription);
    embedTemplate.setFooter('P.A.P.I. - Der Premium-Bot', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");   

    message.reply({ embeds: [embedTemplate] }).then(sentEmbed => {

      sentEmbed.react(cutehulhu);

    });

  }

  doTheRoll();

}