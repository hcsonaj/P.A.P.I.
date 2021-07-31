module.exports = (client) => {

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    const channelID_bump = "868443686009192449";
    var randomTimer = getRandomInt(7200000, 10000000);

    const messageToBeSend = "!d bump";

    const channel = client.channels.cache.get(channelID_bump);

    channel.send(messageToBeSend);

    setInterval(() => {
      randomTimer = getRandomInt(7200000, 10000000);
      channel.send({content: messageToBeSend});
    }, randomTimer);

}