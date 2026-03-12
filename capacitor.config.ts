import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.evnlabs.crystalmirror',
    appName: 'Crystal Mirror',
    webDir: 'dist',
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            launchAutoHide: true,
            backgroundColor: '#0D2B1A', // Forest koyu yeşil arka plan
            androidSplashResourceName: 'splash',
            androidScaleType: 'CENTER_CROP',
            showSpinner: false,
            splashFullScreen: true,
            splashImmersive: true,
        },
        AdMob: {
            // Publisher App ID
            appId: "ca-app-pub-4190858087915294~3199832496"
        }
    }
};

export default config;
