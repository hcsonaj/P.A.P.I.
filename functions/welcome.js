module.exports = (client) => {

  const channelID_welcome = "835160805603147880";
  const channelID_rollenvergabe = "868544101518307348";

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  client.on("guildMemberAdd", (member) => {

    const texts = [
      'Herzlich Willkommen <@' + member.id + '>. :blush: Schau in der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' vorbei um dir den Discord freizuschalten. Wenn du Fragen hast dann immer her damit. :speech_balloon: Besuche auch gerne unsere Website :globe_with_meridians: https://pen-and-paper.info/, hier findest du viele Infos rund um Pen&Paper sowie aktuelle Rundenaushänge. Wir freuen uns auf eine tolle Zeit mit dir. :neonheart:',
      'Hallo <@' + member.id + '>. Schön, dass du da bist. :neonheart: Schau gerne in der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' vorbei und wähle eine Rolle aus, um dir den Discord freizuschalten.:blush: Besuche unsere Website :globe_with_meridians: https://pen-and-paper.info/ um mehr über Pen&Paper zu erfahren und aktuelle Rundenaushänge zu entdecken. Wenn du Fragen hast dann frag einfach, wir beantworten sie dir gerne. :speech_balloon:',
      'Schön, dass du da bist <@' + member.id + '>. :neonheart: In der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' kannst du dir den Discord freischalten. :blush: Schau gerne auch auf unserer Website :globe_with_meridians: https://pen-and-paper.info/ und entdecke interessante Infos rund um Pen&Paper sowie aktuelle Rundenaushänge.  Du hast noch Fragen? Dann schreib uns gerne! :speech_balloon:',
      'Herzlich Willkommen <@' + member.id + '>. Schön, dass du da bist! :neonheart: Schau in der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' vorbei, um dir den Discord freizuschalten. :blush: Besuche unsere Website https://pen-and-paper.info/ für aktuelle Rundenaushänge und mehr Infos.:game_die: Du hast Fragen rund um Pen&Paper, den Discord oder wie das hier funktioniert? Dann schreib und gerne. :speech_balloon:',
      'Moin <@' + member.id + '>! Schön, dass du da bist.:neonheart: Wähle in der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' eine Rolle aus und schalte dir so unseren Discord frei.:blush: Kennst du schon unsere Website :globe_with_meridians: https://pen-and-paper.info/? Hier gibts einiges zu entdecken, schau unbedingt mal vorbei! :game_die: Bei Fragen schreib uns einfach, wir helfen dir gerne weiter.:speech_balloon:'
    ]

    const messageToBeSend = texts[getRandomInt(0,4)];

    const channel = member.guild.channels.cache.get(channelID_welcome);

    setTimeout(function(){ channel.send({ content: messageToBeSend }); }, 30000);

  })

}