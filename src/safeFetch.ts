import { catch_unwind } from "rusting-js";

export function SafeFetch(input: RequestInfo | URL, init?: RequestInit) {
  return catch_unwind(() => fetch(input, init));
}
