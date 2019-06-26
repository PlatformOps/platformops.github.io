import { InfraAutoRoutingModule } from './infra-auto-routing.module';

describe('InfraAutoRoutingModule', () => {
  let infraAutoRoutingModule: InfraAutoRoutingModule;

  beforeEach(() => {
    infraAutoRoutingModule = new InfraAutoRoutingModule();
  });

  it('should create an instance', () => {
    expect(infraAutoRoutingModule).toBeTruthy();
  });
});
