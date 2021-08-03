module.exports = (client, args2, message, MessageEmbed, con, data, sendEmoji, type) => {

  var question = "";
  var answers = data;
  var tempAnswers = [];
  var isQuestion = false;
  args = JSON.parse(args2);

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
  answers.forEach(value => {
    collectedReactions += parseInt(value.reactions);
  })

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

  if (type === '+') { collectedReactions++; }
  else if (type === '-') { collectedReactions--; }

  const embedTemplateReaction = new MessageEmbed()
    .setColor('#6f1f94')
  embedTemplateReaction.setTitle('P.A.P.I. - ' + question);
  embedTemplateReaction.setAuthor('P.A.P.I.', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");

  var indexOfEmoji = 0;
  emojiArray.forEach(function callback(value, index) {
    if (value === sendEmoji) {
      indexOfEmoji = index;
      return;
    }
  })

  if (type === '+') { answers[indexOfEmoji].reactions++; }
  else if (type === '-') { answers[indexOfEmoji].reactions--; }
  
  
  counter = 0;
  var answerString = '';
  answers.forEach(value => {
    if (value.reactions === 0) {
      let miniPercent = 0;
      answerString += emojiArray[counter] + ' ' + value.name + '\n';
      answerString += '`' + percentBlocks[0] + '`' + ' -> ***0 %***' + ' - ' + value.reactions + '\n\n';
      counter++;
    } else {
      let miniPercent = (value.reactions / collectedReactions) * 100;
      answerString += emojiArray[counter] + ' ' + value.name + '\n';
      answerString += '`' + percentBlocks[(miniPercent/5).toFixed(0)] + '`' + ' -> ***' + miniPercent.toFixed(2) + ' %***' + ' - ' + value.reactions + '\n\n';
      counter++;
    }
  })

  embedTemplateReaction.addFields(
    { name: 'Antwortmöglichkeiten', value: answerString },
    { name: '***ACHTUNG***', value: 'Die Reaktionen brauchen so 1 bis 1.5 Sekunden um registriert zu werden. Klickt also bitte erst auf die nächste Reaktion, wenn sich die Nachricht angepasst hat.'}
  )

  embedTemplateReaction.setFooter('P.A.P.I. - Bot');

  message.edit({ embeds: [embedTemplateReaction] });

  setTimeout(function() {
    con.query(`UPDATE bot_messages SET data = '${JSON.stringify(answers)}' WHERE messageID = '${message.id}' `,(err,result)=>{
      return;
    }) 
  }, 500)
  

  //message.delete();  

}