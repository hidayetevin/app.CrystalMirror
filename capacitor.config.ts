import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.yourcompany.crystalmirror',
    appName: 'Crystal Mirror',
    webDir: 'dist',
    bundledWebRuntime: false,
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
            // Configuration for AdMob in Capacitor
        }
    }
};

export default config;
