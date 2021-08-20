module.exports = (client) => {

  const channelID_welcome = "826746959917219840";
  const channelID_rollenvergabe = "871336259803553792";

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  client.on("guildMemberAdd", (member) => {

    const neonheart = client.emojis.cache.find(emoji => emoji.name === "neonheart");

    const texts = [
      'Herzlich Willkommen <@' + member.id + '>. :blush:\n\nSchau in der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' vorbei um dir den Discord freizuschalten. Wenn du Fragen hast dann immer her damit. :speech_balloon:\n\nBesuche auch gerne unsere Website :globe_with_meridians: https://pen-and-paper.info/, hier findest du viele Infos rund um Pen&Paper sowie aktuelle Rundenaushänge.\n\nWir freuen uns auf eine tolle Zeit mit dir. <:neonheart:' + neonheart + '>',
      'Hallo <@' + member.id + '>. Schön, dass du da bist. <:neonheart:' + neonheart + '>\n\nSchau gerne in der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' vorbei und wähle eine Rolle aus, um dir den Discord freizuschalten.:blush:\n\nBesuche unsere Website :globe_with_meridians: https://pen-and-paper.info/ um mehr über Pen & Paper zu erfahren und aktuelle Rundenaushänge zu entdecken.\n\nWenn du Fragen hast dann frag einfach, wir beantworten sie dir gerne. :speech_balloon:',
      'Schön, dass du da bist <@' + member.id + '>. <:neonheart:' + neonheart + '>\n\nIn der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' kannst du dir den Discord freischalten. :blush:\n\nSchau gerne auch auf unserer Website :globe_with_meridians: https://pen-and-paper.info/ und entdecke interessante Infos rund um Pen & Paper sowie aktuelle Rundenaushänge.\n\nDu hast noch Fragen? Dann schreib uns gerne! :speech_balloon:',
      'Herzlich Willkommen <@' + member.id + '>. Schön, dass du da bist!  <:neonheart:' + neonheart + '>\n\nSchau in der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' vorbei, um dir den Discord freizuschalten. :blush:\n\nBesuche unsere Website https://pen-and-paper.info/ für aktuelle Rundenaushänge und mehr Infos.\n\n:game_die:Du hast Fragen rund um Pen&Paper, den Discord oder wie das hier funktioniert? Dann schreib und gerne. :speech_balloon:',
      'Moin <@' + member.id + '>! Schön, dass du da bist. <:neonheart:' + neonheart + '>\n\nWähle in der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' eine Rolle aus und schalte dir so unseren Discord frei.:blush:\n\nKennst du schon unsere Website :globe_with_meridians: https://pen-and-paper.info/? Hier gibts einiges zu entdecken, schau unbedingt mal vorbei!\n\n:game_die: Bei Fragen schreib uns einfach, wir helfen dir gerne weiter.:speech_balloon:'
    ]

    const messageToBeSend = texts[getRandomInt(0,4)];

    const channel = member.guild.channels.cache.get(channelID_welcome);

    setTimeout(function(){ channel.send({ content: messageToBeSend }); }, 30000);

  })

}