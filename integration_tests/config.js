const remoteHubConfiguration = {
  url: 'http://hub.crossbrowsertesting.com:80/wd/hub',
  username: 'galbra@gmail.com',
  authkey: 'u893ac2b6bf86b7d',
};

const defaultCapsArgs = {
  // 7 minutes maximum time for all tests - to protect a case of timeout not occur and over charging
  max_duration: 420,
  username: remoteHubConfiguration.username,
  password: remoteHubConfiguration.authkey,
  name: 'Marcel web',
};

let caps = [
  {
    browserName: 'Firefox',
    version: '64',
    platform: 'Windows 10',
    screenResolution: '1366x768',
  },
  {
    browserName: 'Chrome',
    version: '71x64',
    platform: 'Mac OSX 10.14',
    screenResolution: '1366x768',
  },
/*  {
    browserName: 'MicrosoftEdge',
    version: '17',
    platform: 'Windows 10',
    screenResolution: '1920x1080'
  },*/
  {
    browserName: 'Chrome',
    version: '71x64',
    platform: 'Windows 10',
    screenResolution: '1280x720'
  }
];

// Setting default values to all those caps
caps = caps.map((cap) => Object.assign(cap, defaultCapsArgs));

module.exports = {
  desiredCapabilities: caps,
  URL: 'https://staging-web.marcelforart.com/',
  API_URL: 'https://staging.marcelforart.com/api',
  LOGIN: 'integrationtest@marcel.com',
  PASSWORD: 'ghwBXa75JpT3',
  TEST_TIMEOUT: 90000,
  REMOTE_HUB_URL: remoteHubConfiguration.url,
};
