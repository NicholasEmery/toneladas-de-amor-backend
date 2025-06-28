import { Test, TestingModule } from "@nestjs/testing";
import { AsaasApiService } from "./asaas-api.service";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";

describe("AsaasApiService", () => {
  let service: AsaasApiService;
  let httpService: { post: jest.Mock; get: jest.Mock };

  beforeEach(async () => {
    httpService = {
      post: jest.fn(),
      get: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsaasApiService, { provide: HttpService, useValue: httpService }],
    }).compile();
    service = module.get<AsaasApiService>(AsaasApiService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve fazer POST com headers corretos", () => {
    httpService.post.mockReturnValue(of({ data: "ok" }));
    const data = { foo: "bar" };
    service.post("/endpoint", data).subscribe((res) => {
      expect(res.data).toBe("ok");
    });
    expect(httpService.post).toHaveBeenCalledWith(
      expect.stringContaining("/endpoint"),
      data,
      expect.objectContaining({ headers: expect.objectContaining({ accept: "application/json" }) }),
    );
  });

  it("deve fazer GET com headers corretos", () => {
    httpService.get.mockReturnValue(of({ data: "ok" }));
    service.get("/endpoint", { test: 1 }).subscribe((res) => {
      expect(res.data).toBe("ok");
    });
    expect(httpService.get).toHaveBeenCalledWith(
      expect.stringContaining("/endpoint"),
      expect.objectContaining({
        headers: expect.objectContaining({ accept: "application/json" }),
        params: { test: 1 },
      }),
    );
  });
});
