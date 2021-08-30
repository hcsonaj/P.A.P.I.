const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource, StreamType } = require('@discordjs/voice');

 
module.exports = async (client, args, message) => {

  
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel) return message.channel.send({content: 'Sorry, du musst in einem Voice-Channel sein für diesen Befehl!'});
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) return message.channel.send({content: 'Du hast leider nicht das Recht dazu...melde dich gerne bei uns, wenn du meinst dass das ein Fehler ist.'});
  if (!permissions.has('SPEAK')) return message.channel.send({content: 'Du hast leider nicht das Recht dazu...melde dich gerne bei uns, wenn du meinst dass das ein Fehler ist.'});
  if (!args.length) return message.channel.send({content: 'Du musst uns schon mitteilen was du hören willst...'});
  

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guildId,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });


  const validURL = (str) =>{
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(!regex.test(str)){
          return false;
      } else {
          return true;
      }
  }

  if(validURL(args[0])){

      message.reply({ content: `Gib mir ein paar Sekunden...`})

      const stream  = createAudioResource(ytdl(args[0], {filter: 'audioonly'}), {
        inputType: StreamType.WebmOpus,
      });

      player.play(stream, { highWaterMark: 50 });
      connection.subscribe(player);

      const videoFinder = async () => {
        const videoID = args[0].split("=");
        const title = await ytSearch({ videoId: videoID[1] });
        return (title.title) ? title.title : null;
      }

      const videoTitle = await videoFinder();
      await message.reply(`:thumbsup: Jetzt läuft ***${videoTitle}***`);
      await message.delete();

      return
  }

  message.reply({ content: `Ich suche...`})

  const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);
      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
  }

  const video = await videoFinder(args.join(' '));

  if(video){

    const stream  = createAudioResource(ytdl(video.url, {filter: 'audioonly'}), {
      inputType: StreamType.WebmOpus,
    });

    player.play(stream, { highWaterMark: 70 });
    connection.subscribe(player);

    await message.reply({ content: `:thumbsup: Jetzt läuft: ***${video.title}***`})
    await message.delete();

  } else {
      message.channel.send({ content: 'Ich hab leider keine Ergebnisse gefunden...:sad:'});
  }

}