module.exports = (client, args, message, MessageEmbed, con) => {

  var question = "";
  var answers = [];
  var tempAnswers = [];
  var isQuestion = false;

  var emojiArray = [
    '1️⃣',
    '2️⃣',
    '3️⃣',
    '4️⃣',
    '5️⃣',
    '6️⃣',
    '7️⃣',
    '8️⃣',
    '9️⃣',
    '🔟'
  ]

  var percentBlocks = [
    '                    ',
    '█                   ',
    '██                  ',
    '███                 ',
    '████                ',
    '█████               ',
    '██████              ',
    '███████             ',
    '████████            ',
    '█████████           ',
    '██████████          ',
    '███████████         ',
    '████████████        ',
    '█████████████       ',
    '██████████████      ',
    '███████████████     ',
    '████████████████    ',
    '█████████████████   ',
    '██████████████████  ',
    '███████████████████ ',
    '████████████████████'
  ]

  var collectedReactions = 0;

  var newArgs = args.join(' ');

  args.forEach(value => {
    if (value.includes('[')) {
      question += value + ' ';
      isQuestion = true;
      return;
    } else if (value.includes(']')) {
      question += value;
      isQuestion = false;
      return;
    }
    if (isQuestion) {
      question += value + ' ';
    }
  })
  question = question.slice(1,-1);

  newArgs = newArgs.substring(newArgs.indexOf("]") + 1);
  tempAnswers = newArgs.split(',');

  var counter = 0;
  tempAnswers.forEach(value => {
    answers[counter] = {
      'name': value.substring(1),
      'reactions': 0
    }
    counter++;
  })

  const embedTemplate = new MessageEmbed()
    .setColor('#6f1f94')

  embedTemplate.setTitle('P.A.P.I. - ' + question);
  embedTemplate.setAuthor('P.A.P.I.', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");

  var answerString = '';

  counter = 0;

  if (answers.length >= 10) {
    message.reply({ content: 'Bitte nur 10 Möglichkeiten angeben...' });
    return;
  }

  answers.forEach(value => {
    answerString += emojiArray[counter] + ' ' + value.name + '\n';
    answerString += '`                    `' + ' -> ***' + '0 %***' + ' - 0' + '\n\n';
    counter++;
  })

  embedTemplate.addFields(
    { name: 'Antwortmöglichkeiten', value: answerString },
    { name: '***ACHTUNG***', value: 'Die Reaktionen brauchen so 1 bis 1.5 Sekunden um registriert zu werden. Klickt also bitte erst auf die nächste Reaktion, wenn sich die Nachricht angepasst hat.'}
  )

  embedTemplate.setFooter('P.A.P.I. - Bot');  


  message.reply({ embeds: [embedTemplate] }).then(sendEmbed => {

    con.query(`INSERT INTO bot_messages (messageID, args, command, data) VALUES ('${sendEmbed.id}', '${JSON.stringify(args)}', '${message.content}', '${JSON.stringify(answers)}')`,(err,result)=>{
      return;
    })

    

    counter = 0;
    answers.forEach(value => {
      sendEmbed.react(emojiArray[counter]);
      counter++;
    })

    const filter = (reaction, user) => {
      return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].includes(reaction.emoji.name) && !user.bot;
    };


    const collector = sendEmbed.createReactionCollector({
      filter,
      time: 3600000,
      dispose: true
    });

    collector.on('collect', (collected, reason) => {
      
      if (reason === 'time') {
        sendEmbed.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

      } else {

        collectedReactions++;

        const embedTemplateReaction = new MessageEmbed()
          .setColor('#6f1f94')
        embedTemplateReaction.setTitle('P.A.P.I. - ' + question);
        embedTemplateReaction.setAuthor('P.A.P.I.', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");

        var indexOfEmoji = 0;
        emojiArray.forEach(function callback(value, index) {
          if (value === collected._emoji.name) {
            indexOfEmoji = index;
            return;
          }
        })

        answers[indexOfEmoji].reactions++;
        
        counter = 0;
        var answerString = '';
        answers.forEach(value => {
          let miniPercent = (value.reactions / collectedReactions) * 100;
          answerString += emojiArray[counter] + ' ' + value.name + '\n';
          answerString += '`' + percentBlocks[(miniPercent/5).toFixed(0)] + '`' + ' -> ***' + miniPercent.toFixed(2) + ' %***' + ' - ' + value.reactions + '\n\n';
          counter++;
        })

        embedTemplateReaction.addFields(
          { name: 'Antwortmöglichkeiten', value: answerString },
          { name: '***ACHTUNG***', value: 'Die Reaktionen brauchen so 1 bis 1.5 Sekunden um registriert zu werden. Klickt also bitte erst auf die nächste Reaktion, wenn sich die Nachricht angepasst hat.'}
        )

        embedTemplateReaction.setFooter('P.A.P.I. - Bot');

        sendEmbed.edit({ embeds: [embedTemplateReaction] });

        setTimeout(function() {
          con.query(`UPDATE bot_messages SET data = '${JSON.stringify(answers)}' WHERE messageID = '${sendEmbed.id}' `,(err,result)=>{
            return;
          })
        }, 500);

        /* var emoji = "";

        let userReaction = collected.forEach(value => {
          emoji = value._emoji.name;
        }); */

      }

        
    })



    collector.on('remove', (collected, reason) => {
      
      if (reason === 'time') {
        sendEmbed.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

      } else {

        collectedReactions--;

        const embedTemplateReaction = new MessageEmbed()
          .setColor('#6f1f94')
        embedTemplateReaction.setTitle('P.A.P.I. - ' + question);
        embedTemplateReaction.setAuthor('P.A.P.I.', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");

        var indexOfEmoji = 0;
        emojiArray.forEach(function callback(value, index) {
          if (value === collected._emoji.name) {
            indexOfEmoji = index;
            return;
          }
        })

        answers[indexOfEmoji].reactions--;
        
        counter = 0;
        var answerString = '';
        answers.forEach(value => {
          if (value.reactions === 0) {
            let miniPercent = 0;
            answerString += emojiArray[counter] + ' ' + value.name + '\n';
            answerString += '`' + percentBlocks[0] + '`' + ' -> ***0 %***' + ' - ' + '0' + '\n\n';
            counter++;
          } else {
            let miniPercent = (value.reactions / collectedReactions) * 100;
            answerString += emojiArray[counter] + ' ' + value.name + '\n';
            answerString += '`' + percentBlocks[(miniPercent/5).toFixed(0)] + '`' + ' -> *' + miniPercent.toFixed(2) + ' %*' + ' - ' + value.reactions + '\n\n';
            counter++;
          }
          
        })

        embedTemplateReaction.addFields(
          { name: 'Antwortmöglichkeiten', value: answerString },
          { name: '***ACHTUNG***', value: 'Die Reaktionen brauchen so 1 bis 1.5 Sekunden um registriert zu werden. Klickt also bitte erst auf die nächste Reaktion, wenn sich die Nachricht angepasst hat.'}

        )

        embedTemplateReaction.setFooter('P.A.P.I. - Bot');

        sendEmbed.edit({ embeds: [embedTemplateReaction] });

        setTimeout(function() {
          con.query(`UPDATE bot_messages SET data = '${JSON.stringify(answers)}' WHERE messageID = '${sendEmbed.id}' `,(err,result)=>{
            return;
          })
        }, 500);

        /* var emoji = "";

        let userReaction = collected.forEach(value => {
          emoji = value._emoji.name;
        }); */

      }

        
    })

  });

  //message.delete();  

}