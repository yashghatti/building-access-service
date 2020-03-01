var ewelinkApi = require("ewelink-api");
const Zeroconf = require('ewelink-api/classes/Zeroconf');
const frontDoor = '10005a5133';

module.exports.unlockFrontDoorByAPI = async (username, pasword) => {
    const connection = new ewelinkApi({
      email: username,
      password: pasword,
      region: 'us',
    });

    /* get all devices */
    const doorSwitch = await connection.setDevicePowerState(frontDoor,'on');
    console.log("=> Unlock initiated:", doorSwitch);
    return doorSwitch;
};

module.exports.unlockFrontDoorByLAN = async () => {
    const devicesCache = await Zeroconf.loadCachedDevices();
    const arpTable = await Zeroconf.loadArpTable();

    /* create the connection using cache files */
    const connection = new ewelinkApi({ devicesCache, arpTable });

    /* turn device on */    
    await connection.setDevicePowerState(frontDoor, 'on');
};