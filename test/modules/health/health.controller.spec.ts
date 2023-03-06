import { HttpModule } from '@nestjs/axios';
import { HttpHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../../../src/modules/health/health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, TerminusModule],
      controllers: [HealthController],
      providers: [
        {
          provide: HttpHealthIndicator,
          useValue: { pingCheck: jest.fn().mockResolvedValue({ status: 200 }) },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  let healthCheckResultMock = { status: 'ok', info: {}, error: {}, details: {} };

  it('/health/status', async () => {
    const response = await controller.status();
    expect(response).toEqual(healthCheckResultMock);
  });

  it('/health/check', async () => {
    const response = await controller.check();
    healthCheckResultMock = { ...healthCheckResultMock, info: { status: 200 }, details: { status: 200 } };
    expect(response).toEqual(healthCheckResultMock);
  });
});
