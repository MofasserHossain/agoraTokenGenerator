const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const appID = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_APP_CERTIFICATE;

// token expire time, hardcode to 3600 seconds = 1 hour
const expirationTimeInSeconds = 3600;
const role = RtcRole.PUBLISHER;

const generateRtcToken = async function (req, res) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  const channelName = req.query.channelName;
  // use 0 if uid is not specified
  const uid = req.query.uid;
  if (!channelName || !uid) {
    return res.status(400).json({ error: 'channel name and uid is required' });
  }
  const key = await RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
  res.status(200).json({ token: key, channelName: channelName });
};

module.exports = generateRtcToken;
