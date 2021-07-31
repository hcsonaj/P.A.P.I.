const { getVoiceConnection } = require('@discordjs/voice');

module.exports = async (message) => {

  const voiceChannel = message.member.voice.channel;
 
  if(!voiceChannel) return message.channel.send("'Sorry, du musst in einem Voice-Channel sein für diesen Befehl!");

  const connection = getVoiceConnection(message.guild.id);
  await connection.destroy();
  await message.replay({ content: 'Voice-Channel verlassen!' });

}