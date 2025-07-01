import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

function removePasswordField(data: unknown, seen: Set<unknown> = new Set()): unknown {
  if (Array.isArray(data)) {
    return data.map((item) => removePasswordField(item, seen));
  }
  if (data && typeof data === "object" && data !== null) {
    if (seen.has(data)) return data; // Evita loop infinito
    seen.add(data);
    const rest: Record<string, unknown> = {};
    for (const key in data) {
      if (key === "password") continue;
      rest[key] = removePasswordField((data as Record<string, unknown>)[key], seen);
    }
    seen.delete(data);
    return rest;
  }
  return data;
}

export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data: unknown) => removePasswordField(data)));
  }
}
