cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/com.rjfun.cordova.plugin.admob/www/AdMob.js",
        "id": "com.rjfun.cordova.plugin.admob.AdMob",
        "clobbers": [
            "window.plugins.AdMob"
        ]
    },
    {
        "file": "plugins/com.telerik.plugins.wkwebview/www/wkwebview.js",
        "id": "com.telerik.plugins.wkwebview.wkwebview",
        "clobbers": [
            "wkwebview"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-game-center/www/gamecenter.js",
        "id": "cordova-plugin-game-center.GameCenter",
        "clobbers": [
            "gamecenter"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.google.admobsdk": "6.12.2",
    "com.google.playservices": "19.0.0",
    "com.ionic.keyboard": "1.0.4",
    "com.rjfun.cordova.plugin.admob": "2.1.7",
    "com.telerik.plugins.wkwebview": "0.6.5",
    "cordova-plugin-device": "1.0.1",
    "cordova-plugin-game-center": "0.4.1",
    "cordova-plugin-splashscreen": "2.1.0",
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-webserver": "1.0.3"
}
// BOTTOM OF METADATA
});