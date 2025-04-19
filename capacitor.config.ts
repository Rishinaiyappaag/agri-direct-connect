
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.57f52470a3f743a89b5f6c7e6beec62b',
  appName: 'agri-direct-connect',
  webDir: 'dist',
  server: {
    url: 'https://57f52470-a3f7-43a8-9b5f-6c7e6beec62b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null,
    }
  }
};

export default config;
