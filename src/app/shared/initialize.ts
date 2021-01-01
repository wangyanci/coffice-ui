import { AppConfig } from './config';

export function InitializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
