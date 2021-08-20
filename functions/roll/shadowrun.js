module.exports = (client, args, message, MessageEmbed) => {

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var resultArray = [];
  var schicksalArray = [];
  var rollCount = 0;
  var success = 0;
  var failure = 0;

  var dice_main = ['NULL'];
  var dice_good = ['NULL'];
  var dice_bad = ['NULL'];
  var dice_special = ['NULL']

  dice_main[1] = client.emojis.cache.find(emoji => emoji.name === "dice_main_1");
  dice_main[2] = client.emojis.cache.find(emoji => emoji.name === "dice_main_2");
  dice_main[3] = client.emojis.cache.find(emoji => emoji.name === "dice_main_3");
  dice_main[4] = client.emojis.cache.find(emoji => emoji.name === "dice_main_4");
  dice_main[5] = client.emojis.cache.find(emoji => emoji.name === "dice_main_5");
  dice_main[6] = client.emojis.cache.find(emoji => emoji.name === "dice_main_6");

  dice_special[1] = client.emojis.cache.find(emoji => emoji.name === "dice_special_1");
  dice_special[2] = client.emojis.cache.find(emoji => emoji.name === "dice_special_2");
  dice_special[3] = client.emojis.cache.find(emoji => emoji.name === "dice_special_3");
  dice_special[4] = client.emojis.cache.find(emoji => emoji.name === "dice_special_4");
  dice_special[5] = client.emojis.cache.find(emoji => emoji.name === "dice_special_5");
  dice_special[6] = client.emojis.cache.find(emoji => emoji.name === "dice_special_6");
  
  dice_good[5] = client.emojis.cache.find(emoji => emoji.name === "dice_good_5");
  dice_good[6] = client.emojis.cache.find(emoji => emoji.name === "dice_good_6");

  dice_bad[1] = client.emojis.cache.find(emoji => emoji.name === "dice_bad_1");

  function doTheRoll() {

    var toSplit = "";
    var countOnes = 0;
    var countSix = 0;

    if (args[0]) {

      const rollActual = args[0];

      if (isNaN(parseInt(rollActual))){
        message.reply({ content: 'Mit Buchstaben kann ich noch nicht würfeln. Bitte nutze eine Zahl.'});
        return;
      }
      
      var result = 0;
      var resultDescription = '<@' + message.author.id + '> hat folgende Ergebnisse geworfen:\n\n';
      var resultDescription2 = '';
      var resultMod = "";

      if (rollCount > 0) {

        countOnes = 0;
        countSix = 0;

        resultArray.forEach((value, key) => {
          if (value === 6) {
            tempRoll = getRandomInt(1,7);
            if (tempRoll > 4) { success++; }
            else if (tempRoll === 1) { countOnes++; failure++; }
            else { failure++; }
            result += tempRoll;
            if (tempRoll > 4) {
              resultDescription2 += '<:dice_good_' + tempRoll + ':' + dice_good[tempRoll] + '> ';
            } else if (tempRoll === 1) {
              resultDescription2 += '<:dice_bad_' + tempRoll + ':' + dice_bad[tempRoll] + '> ';
            } else {
              resultDescription2 += '<:dice_main_' + tempRoll + ':' + dice_main[tempRoll] + '> ';
            }
            if (tempRoll === 6) { countSix++; }
            resultArray[key] = tempRoll;
          } else {
            result += value;
            if (value > 4) {
              resultDescription += '<:dice_good_' + value + ':' + dice_good[value] + '> ';
            } else if (value === 1) {
              resultDescription += '<:dice_bad_' + value + ':' + dice_bad[value] + '> ';
            } else {
              resultDescription += '<:dice_main_' + value + ':' + dice_main[value] + '> ';
            }
            resultArray[key] = value;
            //if (value > 4) { success++; } else { failure++; }
          }
        })

        if (schicksalArray.length > 0) {
          resultDescription += '\n\nSchicksalswürfe: ';
          schicksalArray.forEach(value => {
            if (value === 6) {
              tempRoll = getRandomInt(1,7);
              if (rollCount === 1 && tempRoll > 5) { success = success + 3 }
              else if (rollCount > 1 && tempRoll > 4) { success++; }
              else if (rollCount === 1 && tempRoll === 5) { success++; }
              else if (tempRoll === 1) { countOnes++; failure++; }
              result += tempRoll;
              resultDescription += '<:dice_special_' + tempRoll + ':' + dice_special[tempRoll] + '> ';
              if (tempRoll > 4) { success++; } else { failure++; }
              if (tempRoll === 6) { countSix++; }
            } else {
              result += value;
              resultDescription += '<:dice_special_' + value + ':' + dice_special[value] + '> ';
              if (value > 4) { success++; } else { failure++; }
            }
          })
        }

      } else {

        for (let i = 0; i < parseInt(rollActual); i++) {

          tempRoll = getRandomInt(1,7);
          result += tempRoll;
          if (tempRoll > 4) {
            resultDescription += '<:dice_good_' + tempRoll + ':' + dice_good[tempRoll] + '> ';
          } else if (tempRoll === 1) {
            resultDescription += '<:dice_bad_' + tempRoll + ':' + dice_bad[tempRoll] + '> ';
          } else {
            resultDescription += '<:dice_main_' + tempRoll + ':' + dice_main[tempRoll] + '> ';
          }
          
          resultArray[i] = tempRoll;

          if (tempRoll > 4) { success++; }
          else { failure++; }

        }

        resultArray.forEach(value => {
          if (value === 1) {
            countOnes++;
          } else if (value === 6) {
            countSix++;
          }
        })

      }

      

      if (args.length > 1 && rollCount === 0) {

        resultDescription += '\n\nSchicksalswürfe: ';

        if (args.length > 2) {

          newArgs = args[1].split(' ');

          for (let i = 0; i < parseInt(newArgs[1]); i++) {

            tempRoll = getRandomInt(1,7);
            result += tempRoll;
            resultDescription += '<:dice_special_' + tempRoll + ':' + dice_special[tempRoll] + '> ';
            schicksalArray[i] = tempRoll;

            if (tempRoll > 4) {
              success = success + 3;
            } else {
              failure++;
            }

          }
          

        } else {

          newArgs = args[1].split('');

          for (let i = 0; i < parseInt(newArgs[1]); i++) {

            tempRoll = getRandomInt(1,7);
            result += tempRoll;
            resultDescription += '<:dice_special_' + tempRoll + ':' + dice_special[tempRoll] + '> ';
            schicksalArray[i] = tempRoll;

            if (tempRoll > 4) {
              success = success + 3;
            } else {
              failure++;
            }

          }
          

        }


      }

      if (countOnes > rollActual) {
        if (success === 0) {
          resultDescription += '\n\n**Patzer mit: ' + countOnes + ' Einsen**';
        } else {
          resultDescription += '\n\n**Kritischer Patzer mit: ' + countOnes + ' Einsen und 0 Erfolgen**';
        }
      } else {
        if (success > 0) {
          resultDescription += '\n\n**Erfolg mit ' + success + ' Erfolgen**';
        } else {
          resultDescription += '\n\n**Patzer mit ' + failure + ' Fehlwürfen**';
        }
      }
      

      const embedTemplate = new MessageEmbed()
          .setColor('#6f1f94')

      embedTemplate.setTitle('Shadowrun-Ergebnis');
      if (rollCount > 0) {
        embedTemplate.setDescription(resultDescription + '\n\nExplodierte Sechser:\n' + resultDescription2);
      } else {
        embedTemplate.setDescription(resultDescription);
      }
      embedTemplate.setAuthor('P.A.P.I.');
      embedTemplate.setThumbnail('https://pen-and-paper.info/wp-content/uploads/2021/08/Shadowrun.png');
      embedTemplate.setFooter('P.A.P.I. - Der Premium-Bot', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");    

      rollCount++;  

      message.reply({ embeds: [embedTemplate] }).then(sentEmbed => {

        if (countSix > 0) {

          sentEmbed.react("💥");

          const filter = (reaction, user) => {
            return ['💥'].includes(reaction.emoji.name) && !user.bot;
          };


          const collector = sentEmbed.createReactionCollector({
            filter,
            max: 1,
            time: 3600000
          });

          collector.on('end', (collected, reason) => {
            
            if (reason === 'time') {
              sentEmbed.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

            } else {

              var emoji = "";

              let userReaction = collected.forEach(value => {
                emoji = value._emoji.name;
              });

              if (emoji === '💥') {
                doTheRoll();
              }
            }

              
          })

        } 

      });

    } else {
      message.reply({content: 'Falsche Eingabe: `!papi r sr {x}`'})
    }

  }

  doTheRoll();

}