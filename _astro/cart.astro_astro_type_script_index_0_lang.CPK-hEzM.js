import{_ as e,a as t,c as n,d as r,g as i,h as a,l as o,m as s,o as c,s as l}from"./cart.DFWiKgFq.js";function u(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}var d=document.getElementById(`cart-app`);if(d){let f=d.dataset.shop??`/mbmapg/shop`,p=d.dataset.checkout??`/mbmapg/checkout`;function m(){if(!d)return;let h=n();if(h.items.length===0){d.innerHTML=`<p class="cart-empty">Your cart is empty. <a href="${f}">Continue shopping</a></p>`;return}d.innerHTML=`
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
          <tbody>${h.items.map(t=>{let n=a(t.productSlug),r=u(n?i(n,t.variantId):t.productSlug),o=n?e(n,t.variantId):0,c=n?`${f.replace(/\/$/,``)}/${n.slug}`:f,l=[t.custom?.studentFirst||t.custom?.studentLast?u(`${t.custom.studentFirst??``} ${t.custom.studentLast??``}`.trim()):``,t.custom?.room?u(`Room ${t.custom.room}`):``,t.custom?.note?u(t.custom.note):``].filter(Boolean).join(` · `);return`<tr data-id="${t.id}">
            <td>
              <a href="${c}">${r}</a>
              ${l?`<div class="muted">${l}</div>`:``}
            </td>
            <td>${s(o)}</td>
            <td>
              <input class="qty-input" type="number" min="1" step="1" value="${t.quantity}" data-qty />
            </td>
            <td>${s(o*t.quantity)}</td>
            <td><button type="button" class="btn-text" data-remove>Remove</button></td>
          </tr>`}).join(``)}</tbody>
        </table>
        <p class="cart-subtotal">Subtotal (${t(h)} item${t(h)===1?``:`s`}): <strong>${s(c(h))}</strong></p>
        <p class="checkout-actions">
          <a class="btn btn-gold" href="${p}">Checkout</a>
          <a class="btn" href="${f}">Continue shopping</a>
        </p>
      `,d.querySelectorAll(`[data-qty]`).forEach(e=>{e.addEventListener(`change`,()=>{let t=e.closest(`tr`)?.dataset.id;t&&(l(n=>r(n,t,Number(e.value))),m())})}),d.querySelectorAll(`[data-remove]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`tr`)?.dataset.id;t&&(l(e=>o(e,t)),m())})})}m()}