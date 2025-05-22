import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

function removePassword(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removePassword);
  }
  if (obj && typeof obj === "object") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...rest } = obj;
    for (const key in rest) {
      rest[key] = removePassword(rest[key]);
    }
    return rest;
  }
  return obj;
}

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => removePassword(data)));
  }
}
