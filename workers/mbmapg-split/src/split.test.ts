import assert from 'node:assert/strict';
import { test } from 'node:test';
import { handleRequest } from './index.ts';
import {
  copyForwardHeaders,
  isMoneyPath,
  resolveConfig,
  rewriteAstroPath,
  splitTarget,
} from './split.ts';

test('money paths match prefixes and trailing segments only', () => {
  for (const path of [
    '/shop',
    '/shop/',
    '/shop/pizza',
    '/donate',
    '/donate/thanks',
    '/checkout',
    '/checkout/pay',
    '/cart',
    '/cart/add',
    '/my-account',
    '/my-account/orders',
    '/_api',
    '/_api/v1/cart',
    '/files/theme',
    '/files/theme/logo.png',
  ]) {
    assert.equal(isMoneyPath(path), true, path);
  }

  for (const path of ['/', '/receipt', '/give', '/shopping', '/donation', '/files', '/api']) {
    assert.equal(isMoneyPath(path), false, path);
  }
});

test('ASTRO_BASE_PREFIX defaults to /mbmapg and empty means root Astro', () => {
  assert.equal(resolveConfig({}).astroBasePrefix, '/mbmapg');
  assert.equal(resolveConfig({ ASTRO_BASE_PREFIX: '' }).astroBasePrefix, '');
  assert.equal(resolveConfig({ ASTRO_BASE_PREFIX: '/' }).astroBasePrefix, '');
  assert.equal(resolveConfig({ ASTRO_BASE_PREFIX: '/mbmapg/' }).astroBasePrefix, '/mbmapg');
});

test('Astro rewrite prepends GH Pages prefix unless already present', () => {
  assert.equal(rewriteAstroPath('/', '/mbmapg'), '/mbmapg/');
  assert.equal(rewriteAstroPath('/receipt', '/mbmapg'), '/mbmapg/receipt');
  assert.equal(rewriteAstroPath('/mbmapg/receipt', '/mbmapg'), '/mbmapg/receipt');
  assert.equal(rewriteAstroPath('/receipt', ''), '/receipt');
  assert.equal(rewriteAstroPath('/', ''), '/');
});

test('splitTarget sends money to Wix and the rest to Astro with prefix', () => {
  const env = {
    ASTRO_ORIGIN: 'https://artodad.github.io',
    ASTRO_BASE_PREFIX: '/mbmapg',
    WIX_ORIGIN: 'https://wix-origin.mbmapg.org',
  };

  assert.equal(
    splitTarget('https://worker.test/receipt?sent=1', env).href,
    'https://artodad.github.io/mbmapg/receipt?sent=1',
  );
  assert.equal(splitTarget('https://worker.test/', env).href, 'https://artodad.github.io/mbmapg/');
  assert.equal(
    splitTarget('https://worker.test/shop/pizza', env).href,
    'https://wix-origin.mbmapg.org/shop/pizza',
  );
  assert.equal(
    splitTarget('https://worker.test/donate', env).href,
    'https://wix-origin.mbmapg.org/donate',
  );
});

test('splitTarget with empty ASTRO_BASE_PREFIX keeps root-relative Astro paths', () => {
  const env = {
    ASTRO_ORIGIN: 'https://mbmapg.pages.dev',
    ASTRO_BASE_PREFIX: '',
    WIX_ORIGIN: 'https://wix-origin.mbmapg.org',
  };
  assert.equal(
    splitTarget('https://worker.test/receipt', env).href,
    'https://mbmapg.pages.dev/receipt',
  );
  assert.equal(splitTarget('https://worker.test/shop', env).href, 'https://wix-origin.mbmapg.org/shop');
});

test('copyForwardHeaders sets Host to the origin host', () => {
  const request = new Request('https://mbmapg-split.example.workers.dev/receipt', {
    headers: { host: 'mbmapg-split.example.workers.dev', cookie: 'sid=1' },
  });
  const headers = copyForwardHeaders(request, 'artodad.github.io');
  assert.equal(headers.get('Host'), 'artodad.github.io');
  assert.equal(headers.get('cookie'), 'sid=1');
});

test('handleRequest proxies method, body, and origin Host', async () => {
  const calls: { url: string; method: string; host: string | null; body: string }[] = [];
  const fetchImpl: typeof fetch = async (input, init) => {
    const url = input instanceof URL ? input.href : String(input);
    const headers = new Headers(init?.headers);
    const body = typeof init?.body === 'string' ? init.body : init?.body ? await new Response(init.body).text() : '';
    calls.push({
      url,
      method: init?.method ?? 'GET',
      host: headers.get('Host'),
      body,
    });
    return new Response('ok');
  };

  await handleRequest(
    new Request('https://mbmapg-split.example.workers.dev/checkout/pay', {
      method: 'POST',
      headers: { 'content-type': 'application/json', host: 'mbmapg-split.example.workers.dev' },
      body: '{"n":1}',
    }),
    { WIX_ORIGIN: 'https://wix-origin.mbmapg.org' },
    fetchImpl,
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://wix-origin.mbmapg.org/checkout/pay');
  assert.equal(calls[0].method, 'POST');
  assert.equal(calls[0].host, 'wix-origin.mbmapg.org');
  assert.equal(calls[0].body, '{"n":1}');
});
