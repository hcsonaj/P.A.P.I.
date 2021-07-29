const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
 
module.exports = async (client, args, message, Discord) => {

  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel) return message.channel.send('Sorry, du musst in einem Voice-Channel sein für diesen Befehl!');
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) return message.channel.send('Du hast leider nicht das Recht dazu...melde dich gerne bei uns, wenn du meinst dass das ein Fehler ist.');
  if (!permissions.has('SPEAK')) return message.channel.send('Du hast leider nicht das Recht dazu...melde dich gerne bei uns, wenn du meinst dass das ein Fehler ist.');
  if (!args.length) return message.channel.send('Du musst uns schon mitteilen was du hören willst...');

  const validURL = (str) =>{
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(!regex.test(str)){
          return false;
      } else {
          return true;
      }
  }

  if(validURL(args[0])){

      const  connection = await voiceChannel.join();
      const stream  = ytdl(args[0], {filter: 'audioonly'});

      connection.play(stream, {seek: 0, volume: 1})
      .on('finish', () =>{
          voiceChannel.leave();
      });

      const videoFinder = async () => {
        const videoID = args[0].split("=");
        const title = await ytSearch({ videoId: videoID[1] });
        return (title.title) ? title.title : null;
      }

      const videoTitle = await videoFinder();
      await message.reply(`:thumbsup: Jetzt läuft ***${videoTitle}***`)

      return
  }

  
  const  connection = await voiceChannel.join();

  const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);
      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
  }

  const video = await videoFinder(args.join(' '));

  if(video){
      const stream  = ytdl(video.url, {filter: 'audioonly'});
      connection.play(stream, {seek: 0, volume: 1})
      .on('finish', () =>{
          voiceChannel.leave();
      });

      await message.reply(`:thumbsup: Jetzt läuft: ***${video.title}***`)
  } else {
      message.channel.send('Ich hab leider keine Ergebnisse gefunden...:sad:');
  }
}