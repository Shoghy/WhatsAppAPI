import { catchUnwindAsync } from "rusting-js";
import type { Result } from "rusting-js/enums";

export function SafeFetch(
  ...params: Parameters<typeof fetch>
): Promise<Result<Response, Error>> {
  return catchUnwindAsync(() => fetch(...params));
}
