import{a as e,d as t,g as n,h as r,i,l as a,m as o,n as s,o as c,p as l}from"./cart.B6qp4JSn.js";function u(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}var d=document.getElementById(`checkout-app`);if(d){let f=d.dataset.shop??`/mbmapg/shop`,p=d.dataset.cart??`/mbmapg/cart`,m=d.dataset.meet??`/mbmapg/events/welcome-back-meet-greet`,h=d.dataset.email??`parentsgroup@mbmapg.org`;function g(){let e=c(),t=e.items.map(e=>{let t=o(e.productSlug),i=t?r(t,e.variantId,e.sliceCount):e.productSlug,a=t?n(t,e.variantId):0,s=[e.custom?.studentFirst||e.custom?.studentLast?`Student: ${e.custom.studentFirst??``} ${e.custom.studentLast??``}`.trim():``,e.custom?.room?`Room: ${e.custom.room}`:``,e.custom?.note?`Note: ${e.custom.note}`:``].filter(Boolean).join(`; `);return`- ${i} × ${e.quantity} = ${l(a*e.quantity)}${s?` (${s})`:``}`});return t.push(`Subtotal: ${l(i(e))}`),t.join(`
`)}function _(){let e=encodeURIComponent(`Hello,\n\nI would like to place this shop order:\n\n${g()}\n`);return`mailto:${h}?subject=MBMA%20PG%20shop%20order&body=${e}`}function v(){if(!d)return;let g=c();if(g.items.length===0){d.innerHTML=`<p class="cart-empty">Your cart is empty. <a href="${f}">Continue shopping</a></p>`;return}let v=s(g),y=g.items.map(e=>{let i=o(e.productSlug),a=i?r(i,e.variantId,e.sliceCount):e.productSlug,s=i?n(i,e.variantId):0,c=i&&t(e,i).length>=0&&i.requiredFields.includes(`studentFirst`)?`<div class="line-fields">
                <label>Student first name <input type="text" data-field="studentFirst" data-id="${e.id}" value="${u(e.custom?.studentFirst??``)}" required /></label>
                <label>Student last name <input type="text" data-field="studentLast" data-id="${e.id}" value="${u(e.custom?.studentLast??``)}" required /></label>
                <label>Room # <input type="text" data-field="room" data-id="${e.id}" value="${u(e.custom?.room??``)}" required /></label>
              </div>`:`<div class="line-fields">
                <label>Student first name &amp; room # (optional) <input type="text" data-field="note" data-id="${e.id}" value="${u(e.custom?.note??``)}" /></label>
              </div>`;return`<tr>
            <td>
              <strong>${u(a)}</strong>
              × ${e.quantity}
              ${c}
            </td>
            <td>${l(s*e.quantity)}</td>
          </tr>`}).join(``),b=v?`<p class="banner-info" role="status">No payment needed — contact the board.</p>`:``,x=`<p class="checkout-actions">
            <a class="btn btn-gold" data-email-board href="${_()}">Email ${h}</a>
            <a class="btn" href="${m}">Meet &amp; Greet details</a>
            <a class="btn" href="${p}">Back to order list</a>
          </p>`;d.innerHTML=`
        ${b}
        <h2>Order summary</h2>
        <table class="cart-table">
          <thead><tr><th>Item</th><th>Total</th></tr></thead>
          <tbody>${y}</tbody>
        </table>
        <p class="cart-subtotal">Subtotal: <strong>${l(i(g))}</strong></p>
        <p id="checkout-errors" class="banner-warn" hidden></p>
        ${x}
      `,d.querySelectorAll(`input[data-field]`).forEach(t=>{t.addEventListener(`input`,()=>{let n=t.dataset.id,r=t.dataset.field;if(!n||!r)return;e(e=>a(e,n,{[r]:t.value}));let i=d.querySelector(`[data-email-board]`);i&&(i.href=_())})})}v()}