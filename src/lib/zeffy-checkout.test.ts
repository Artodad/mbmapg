import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import {
  ZEFFY_COARSE_POINTER_QUERY,
  ZEFFY_EMBED_SRC,
  ZEFFY_IFRAME_TITLE,
  ZEFFY_SMALL_SCREEN_QUERY,
  prefersFullPageZeffy,
  zeffyCheckoutBoot,
} from './zeffy-checkout.ts';

const desktop = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  platform: 'MacIntel',
  maxTouchPoints: 0,
  coarsePointer: false,
  smallScreen: false,
};

test('desktop fine pointer keeps the Zeffy modal', () => {
  assert.equal(prefersFullPageZeffy(desktop), false);
});

test('iPhone, iPad, and iPadOS desktop UA use the full ticketing page', () => {
  assert.equal(
    prefersFullPageZeffy({
      ...desktop,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',
      platform: 'iPhone',
      maxTouchPoints: 5,
    }),
    true,
  );
  assert.equal(
    prefersFullPageZeffy({
      ...desktop,
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)',
      platform: 'iPad',
      maxTouchPoints: 5,
    }),
    true,
  );
  assert.equal(
    prefersFullPageZeffy({
      ...desktop,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      platform: 'MacIntel',
      maxTouchPoints: 5,
    }),
    true,
  );
});

test('coarse pointer and narrow windows use the full ticketing page', () => {
  assert.equal(prefersFullPageZeffy({ ...desktop, coarsePointer: true }), true);
  assert.equal(prefersFullPageZeffy({ ...desktop, smallScreen: true }), true);
});

type Link = {
  name: string;
  href: string;
  form: string | null;
  removeAttribute(attr: string): void;
};

function boot(options: {
  userAgent?: string;
  platform?: string;
  maxTouchPoints?: number;
  media?: Record<string, boolean>;
  iframe?: boolean;
}) {
  const links: Link[] = [
    {
      name: 'Order',
      href: 'https://www.zeffy.com/en-US/ticketing/pizza-lunch-fridays-fundraiser',
      form: 'https://www.zeffy.com/embed/ticketing/pizza-lunch-fridays-fundraiser?modal=true',
      removeAttribute(attr: string) {
        if (attr === 'zeffy-form-link') this.form = null;
      },
    },
  ];
  const listeners: { type: string; fn: (event: unknown) => void; capture: boolean }[] = [];
  const written: string[] = [];
  let iframe = options.iframe ?? false;
  const document = {
    readyState: 'loading',
    querySelectorAll(selector: string) {
      if (selector === 'a[zeffy-form-link]') return links.filter((link) => link.form);
      return [];
    },
    querySelector(selector: string) {
      if (selector === `iframe[title="${ZEFFY_IFRAME_TITLE}"]` && iframe) return { title: ZEFFY_IFRAME_TITLE };
      return null;
    },
    addEventListener(type: string, fn: (event: unknown) => void, capture?: boolean) {
      listeners.push({ type, fn, capture: Boolean(capture) });
    },
    write(markup: string) {
      written.push(markup);
    },
  };
  const media = options.media ?? {};
  vm.runInNewContext(zeffyCheckoutBoot, {
    window: {
      matchMedia(query: string) {
        return { matches: Boolean(media[query]) };
      },
    },
    document,
    navigator: {
      userAgent: options.userAgent ?? desktop.userAgent,
      platform: options.platform ?? desktop.platform,
      maxTouchPoints: options.maxTouchPoints ?? desktop.maxTouchPoints,
    },
  });
  return {
    links,
    listeners,
    written,
    setIframe(present: boolean) {
      iframe = present;
    },
  };
}

function clickListener(listeners: { type: string; fn: (event: unknown) => void }[]) {
  const listener = listeners.find((entry) => entry.type === 'click');
  assert.ok(listener, 'desktop boot installs a click guard');
  return listener.fn;
}

test('full-page boot strips the modal attribute and does not load the embed', () => {
  const phone = boot({
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',
    platform: 'iPhone',
    maxTouchPoints: 5,
    media: { [ZEFFY_COARSE_POINTER_QUERY]: true, [ZEFFY_SMALL_SCREEN_QUERY]: true },
  });
  assert.equal(phone.links[0]?.form, null);
  assert.equal(phone.links[0]?.href, 'https://www.zeffy.com/en-US/ticketing/pizza-lunch-fridays-fundraiser');
  assert.equal(phone.written.length, 0);
  assert.equal(
    phone.listeners.some((entry) => entry.type === 'click'),
    false,
  );
  const ready = phone.listeners.find((entry) => entry.type === 'DOMContentLoaded');
  assert.ok(ready);
  phone.links[0]!.form = 'https://www.zeffy.com/embed/ticketing/pizza-lunch-fridays-fundraiser?modal=true';
  ready.fn({});
  assert.equal(phone.links[0]?.form, null);
});

test('iPadOS desktop UA boot strips the modal', () => {
  const ipad = boot({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    platform: 'MacIntel',
    maxTouchPoints: 5,
  });
  assert.equal(ipad.links[0]?.form, null);
  assert.equal(ipad.written.length, 0);
});

test('narrow and coarse desktops also leave the ticketing href alone', () => {
  const narrow = boot({ media: { [ZEFFY_SMALL_SCREEN_QUERY]: true } });
  const coarse = boot({ media: { [ZEFFY_COARSE_POINTER_QUERY]: true } });
  assert.equal(narrow.links[0]?.form, null);
  assert.equal(coarse.links[0]?.form, null);
  assert.equal(narrow.written.length, 0);
  assert.equal(coarse.written.length, 0);
});

test('desktop boot keeps the modal attribute and loads Zeffy', () => {
  const page = boot({});
  assert.equal(
    page.links[0]?.form,
    'https://www.zeffy.com/embed/ticketing/pizza-lunch-fridays-fundraiser?modal=true',
  );
  assert.equal(page.written.length, 1);
  assert.equal(page.written[0], `<script src="${ZEFFY_EMBED_SRC}"></script>`);
  assert.equal(page.listeners.some((entry) => entry.type === 'click' && entry.capture), true);
});

test('desktop click guard cancels only primary clicks on the trigger once the iframe exists', () => {
  const page = boot({});
  const onClick = clickListener(page.listeners);
  const trigger = {
    tagName: 'A',
    closest(selector: string) {
      return selector === 'a[zeffy-form-link]' ? trigger : null;
    },
  };
  const child = {
    tagName: 'SPAN',
    closest(selector: string) {
      return selector === 'a[zeffy-form-link]' ? trigger : null;
    },
  };

  const beforeIframe = { target: trigger, button: 0, preventDefault() { this.cancelled = true; }, cancelled: false };
  onClick(beforeIframe);
  assert.equal(beforeIframe.cancelled, false);

  page.setIframe(true);
  const opening = { target: child, button: 0, preventDefault() { this.cancelled = true; }, cancelled: false };
  onClick(opening);
  assert.equal(opening.cancelled, true);

  const modified = {
    target: trigger,
    button: 0,
    metaKey: true,
    preventDefault() { this.cancelled = true; },
    cancelled: false,
  };
  onClick(modified);
  assert.equal(modified.cancelled, false);

  const iframeTarget = {
    tagName: 'IFRAME',
    closest() {
      throw new Error('iframe clicks must not be treated as the Buy link');
    },
    button: 0,
  };
  onClick({ target: iframeTarget, button: 0, preventDefault() {} });

  onClick({ target: { tagName: 'P', closest: () => null }, button: 0, preventDefault() {} });
  onClick({ target: 'text', button: 0, preventDefault() {} });
});
