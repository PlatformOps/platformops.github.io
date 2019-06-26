import { AppAutoRoutingModule } from './app-auto-routing.module';

describe('AppAutoRoutingModule', () => {
  let appAutoRoutingModule: AppAutoRoutingModule;

  beforeEach(() => {
    appAutoRoutingModule = new AppAutoRoutingModule();
  });

  it('should create an instance', () => {
    expect(appAutoRoutingModule).toBeTruthy();
  });
});
