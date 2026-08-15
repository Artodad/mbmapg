import{_ as e,a as t,c as n,f as r,g as i,l as a,o,s,v as c,y as l}from"./cart.BEF0gXwx.js";function u(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}var d=document.getElementById(`cart-app`);if(d){let f=d.dataset.shop??`/mbmapg/shop`,p=d.dataset.checkout??`/mbmapg/checkout`;function m(){if(!d)return;let h=n();if(h.items.length===0){d.innerHTML=`<p class="cart-empty">Your cart is empty. <a href="${f}">Continue shopping</a></p>`;return}d.innerHTML=`
        <table class="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${h.items.map(t=>{let n=e(t.productSlug),r=u(n?c(n,t.variantId,t.sliceCount):t.productSlug),a=n?l(n,t.variantId):0,o=n?`${f.replace(/\/$/,``)}/${n.slug}`:f,s=[t.custom?.studentFirst||t.custom?.studentLast?u(`${t.custom.studentFirst??``} ${t.custom.studentLast??``}`.trim()):``,t.custom?.room?u(`Room ${t.custom.room}`):``,t.custom?.note?u(t.custom.note):``].filter(Boolean).join(` · `);return`<tr data-id="${t.id}">
            <td>
              <a href="${o}">${r}</a>
              ${s?`<div class="muted">${s}</div>`:``}
            </td>
            <td>${i(a)}</td>
            <td>
              <input class="qty-input" type="number" min="1" step="1" value="${t.quantity}" data-qty />
            </td>
            <td>${i(a*t.quantity)}</td>
            <td><button type="button" class="btn-text" data-remove>Remove</button></td>
          </tr>`}).join(``)}</tbody>
        </table>
        <p class="cart-subtotal">Subtotal (${t(h)} item${t(h)===1?``:`s`}): <strong>${i(o(h))}</strong></p>
        <p class="checkout-actions">
          <a class="btn btn-gold" href="${p}">Checkout</a>
          <a class="btn" href="${f}">Continue shopping</a>
        </p>
      `,d.querySelectorAll(`[data-qty]`).forEach(e=>{e.addEventListener(`change`,()=>{let t=e.closest(`tr`)?.dataset.id;t&&(s(n=>r(n,t,Number(e.value))),m())})}),d.querySelectorAll(`[data-remove]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`tr`)?.dataset.id;t&&(s(e=>a(e,t)),m())})})}m()}