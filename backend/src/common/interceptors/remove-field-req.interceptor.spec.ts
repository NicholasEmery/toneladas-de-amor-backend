import { RemovePasswordInterceptor } from "./remove-field-req.interceptor";
import { ExecutionContext, CallHandler } from "@nestjs/common";
import { of } from "rxjs";

describe("RemovePasswordInterceptor", () => {
  let interceptor: RemovePasswordInterceptor;

  beforeEach(() => {
    interceptor = new RemovePasswordInterceptor();
  });

  it("should be defined", () => {
    expect(interceptor).toBeDefined();
  });

  it("deve remover o campo password de um objeto simples", (done) => {
    const context = {} as ExecutionContext;
    const callHandler = {
      handle: () => of({ id: 1, name: "User", password: "secret" }),
    } as CallHandler;
    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(result).toEqual({ id: 1, name: "User" });
      done();
    });
  });

  it("deve remover o campo password de um array de objetos", (done) => {
    const context = {} as ExecutionContext;
    const callHandler = {
      handle: () =>
        of([
          { id: 1, name: "User1", password: "secret1" },
          { id: 2, name: "User2", password: "secret2" },
        ]),
    } as CallHandler;
    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(result).toEqual([
        { id: 1, name: "User1" },
        { id: 2, name: "User2" },
      ]);
      done();
    });
  });

  it("deve remover o campo password de objetos aninhados", (done) => {
    const context = {} as ExecutionContext;
    const callHandler = {
      handle: () =>
        of({
          id: 1,
          user: { name: "User", password: "secret" },
          group: [{ name: "Group", password: "groupsecret" }],
        }),
    } as CallHandler;
    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(result).toEqual({
        id: 1,
        user: { name: "User" },
        group: [{ name: "Group" }],
      });
      done();
    });
  });

  it("deve retornar dados inalterados se não houver campo password", (done) => {
    const context = {} as ExecutionContext;
    const callHandler = {
      handle: () => of({ id: 1, name: "User" }),
    } as CallHandler;
    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(result).toEqual({ id: 1, name: "User" });
      done();
    });
  });
});
