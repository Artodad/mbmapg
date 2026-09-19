import { copyForwardHeaders, splitTarget, type SplitEnv } from './split.ts';

export interface Env extends SplitEnv {}

type FetchImpl = typeof fetch;

const METHODS_WITHOUT_BODY = new Set(['GET', 'HEAD']);

export async function handleRequest(
  request: Request,
  env: Env,
  fetchImpl: FetchImpl = fetch,
): Promise<Response> {
  const target = splitTarget(request.url, env);
  const host = target.host;
  const headers = copyForwardHeaders(request, host);
  const init: RequestInit & { duplex?: 'half' } = {
    method: request.method,
    headers,
    redirect: 'manual',
  };
  if (!METHODS_WITHOUT_BODY.has(request.method.toUpperCase()) && request.body) {
    init.body = request.body;
    init.duplex = 'half';
  }

  try {
    return await fetchImpl(target, init);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'upstream fetch failed';
    return new Response(`mbmapg-split: could not reach ${target.origin} (${message})`, {
      status: 502,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }
}

export default {
  fetch(request: Request, env: Env) {
    return handleRequest(request, env);
  },
};
