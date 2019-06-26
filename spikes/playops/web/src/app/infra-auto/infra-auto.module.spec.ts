import { InfraAutoModule } from './infra-auto.module';

describe('InfraAutoModule', () => {
  let infraAutoModule: InfraAutoModule;

  beforeEach(() => {
    infraAutoModule = new InfraAutoModule();
  });

  it('should create an instance', () => {
    expect(infraAutoModule).toBeTruthy();
  });
});
