module.exports = async (message) => {

  const voiceChannel = message.member.voice.channel;
 
  if(!voiceChannel) return message.channel.send("'Sorry, du musst in einem Voice-Channel sein für diesen Befehl!");
  await voiceChannel.leave();
  await message.channel.send('Voice-Channel verlassen!');

}