/** Zeffy’s own modal switches to a full-bleed iframe below this width. */
export const ZEFFY_SMALL_SCREEN_QUERY = '(max-width: 768px)';

export const ZEFFY_COARSE_POINTER_QUERY = '(pointer: coarse)';

export const ZEFFY_EMBED_SRC =
  'https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js';

export const ZEFFY_IFRAME_TITLE = 'Form powered and secured by Zeffy';

export type ZeffyCheckoutInput = {
  userAgent: string;
  platform: string;
  maxTouchPoints: number;
  coarsePointer: boolean;
  smallScreen: boolean;
};

/**
 * Phones and narrow windows skip the modal iframe and follow the ticketing href.
 * iPadOS reports a desktop Macintosh UA, so a touch-capable MacIntel device counts as iOS.
 */
export function prefersFullPageZeffy(input: ZeffyCheckoutInput): boolean {
  const ios =
    /iPad|iPhone|iPod/.test(input.userAgent) ||
    (input.platform === 'MacIntel' && input.maxTouchPoints > 1);
  return ios || input.coarsePointer || input.smallScreen;
}

/**
 * Standalone boot script for shop and pizza checkout.
 * Full-page clients strip `zeffy-form-link` and never install the click guard.
 * Desktop keeps the popup: Zeffy does not cancel the anchor href, and the iframe
 * exists (hidden) as soon as the embed initializes, so the opening click must be cancelled.
 * In-form Continue taps are not clicks on this anchor; the guard is also absent on the
 * full-page path so it cannot cancel them there.
 */
export const zeffyCheckoutBoot = `(function () {
  var smallScreenQuery = ${JSON.stringify(ZEFFY_SMALL_SCREEN_QUERY)};
  var coarsePointerQuery = ${JSON.stringify(ZEFFY_COARSE_POINTER_QUERY)};
  var embedSrc = ${JSON.stringify(ZEFFY_EMBED_SRC)};
  var iframeTitle = ${JSON.stringify(ZEFFY_IFRAME_TITLE)};

  function mediaMatches(query) {
    return typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
  }

  function prefersFullPage() {
    var ua = navigator.userAgent || '';
    var platform = navigator.platform || '';
    var touches = navigator.maxTouchPoints || 0;
    var ios = /iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && touches > 1);
    return ios || mediaMatches(coarsePointerQuery) || mediaMatches(smallScreenQuery);
  }

  function stripModalLinks() {
    var links = document.querySelectorAll('a[zeffy-form-link]');
    for (var i = 0; i < links.length; i++) links[i].removeAttribute('zeffy-form-link');
  }

  if (prefersFullPage()) {
    stripModalLinks();
    document.addEventListener('DOMContentLoaded', stripModalLinks);
    return;
  }

  document.addEventListener(
    'click',
    function (event) {
      var target = event.target;
      if (!target || typeof target.closest !== 'function') return;
      if (target.tagName === 'IFRAME') return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var trigger = target.closest('a[zeffy-form-link]');
      if (!trigger) return;
      if (!document.querySelector('iframe[title="' + iframeTitle + '"]')) return;
      event.preventDefault();
    },
    true
  );

  // Parser-blocking insert so Zeffy still runs on DOMContentLoaded.
  // A dynamically appended script can arrive after that event and never open the popup.
  if (document.readyState === 'loading') {
    document.write('<script src="' + embedSrc + '"><\\/script>');
  }
})();
`;
