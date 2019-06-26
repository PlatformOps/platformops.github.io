import { AppAutoModule } from './app-auto.module';

describe('AppAutoModule', () => {
  let appAutoModule: AppAutoModule;

  beforeEach(() => {
    appAutoModule = new AppAutoModule();
  });

  it('should create an instance', () => {
    expect(appAutoModule).toBeTruthy();
  });
});
