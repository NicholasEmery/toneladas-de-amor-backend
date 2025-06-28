import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

function removePasswordField(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map(removePasswordField);
  }
  if (data && typeof data === "object" && data !== null) {
    const rest = { ...(data as Record<string, unknown>) };
    if ("password" in rest) {
      delete rest.password;
    }
    for (const key in rest) {
      rest[key] = removePasswordField(rest[key]);
    }
    return rest;
  }
  return data;
}

export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data: unknown) => removePasswordField(data)));
  }
}
