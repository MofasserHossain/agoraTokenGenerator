const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const appID = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_APP_CERTIFICATE;

// token expire time, hardcode to 3600 seconds = 1 hour
const expirationTimeInSeconds = 3600;

const generateRtcToken = async function (req, res) {
  const { channelName, uid, role } = req.query;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // use 0 if uid is not specified
  if (!channelName) {
    return res
      .status(400)
      .json({ status: 'error', message: 'channel name and uid is required' });
  }

  let userRule;
  if (role === 'publisher') {
    userRule = RtcRole.PUBLISHER;
  } else {
    userRule = RtcRole.SUBSCRIBER;
  }
  const newUid = !!uid ? uid : Math.floor(Math.random() * 100000);

  const key = await RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    newUid,
    userRule,
    privilegeExpiredTs
  );
  res.status(200).json({ token: key, channelName: channelName, uid: newUid });
};

module.exports = generateRtcToken;
