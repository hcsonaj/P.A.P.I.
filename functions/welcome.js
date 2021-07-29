module.exports = (client) => {

  const channelID_welcome = "826515888449781782";
  const channelID_rollenvergabe = "868586831837556807";

  client.on("guildMemberAdd", (member) => {

    const messageToBeSend = 'Herzlich Willkommen <@' + member.id + '> :neonheart: Schau gerne in der ' + member.guild.channels.cache.get(channelID_rollenvergabe).toString() + ' vorbei um dir den Discord freizuschalten. Bei Fragen einfach stellen und schau auch gerne auf unserer Website vorbei https://pen-and-paper.info/';

    const channel = member.guild.channels.cache.get(channelID_welcome);
    channel.send(messageToBeSend);

  })

}