var ewelinkApi = require("ewelink-api")
const frontDoor = '10005a5133';

module.exports.unlockFrontDoor = async (username, pasword) => {
    const connection = new ewelinkApi({
      email: username,
      password: pasword,
      region: 'us',
    });

    /* get all devices */
    const doorSwitch = await connection.setDevicePowerState(frontDoor,'on')
    console.log("=> Unlock initiated:", doorSwitch);
    return doorSwitch;
};


