import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  private _initializationPromise: Promise<void>;

  constructor(private remoteConfig: RemoteConfig) {
    this._initializationPromise = this.init();
  }

  async init() {
    this.remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
    this.remoteConfig.defaultConfig = environment.remoteConfigDefaults;
    try {
      await fetchAndActivate(this.remoteConfig);
    } catch (e) {
      console.error('Remote Config fetch failed', e);
    }
  }

  async getBoolean(key: string): Promise<boolean> {
    await this._initializationPromise;
    return getValue(this.remoteConfig, key).asBoolean();
  }
}
