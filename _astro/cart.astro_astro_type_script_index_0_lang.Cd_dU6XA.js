import{a as e,g as t,h as n,i as r,m as i,o as a,p as o,r as s,s as c,u as l}from"./cart.B6qp4JSn.js";function u(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}var d=document.getElementById(`cart-app`);if(d){let f=d.dataset.shop??`/mbmapg/shop`,p=d.dataset.checkout??`/mbmapg/checkout`;function m(){if(!d)return;let h=a();if(h.items.length===0){d.innerHTML=`<p class="cart-empty">Your order list is empty. <a href="${f}">Back to shop</a></p>`;return}d.innerHTML=`
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
          <tbody>${h.items.map(e=>{let r=i(e.productSlug),a=u(r?n(r,e.variantId,e.sliceCount):e.productSlug),s=r?t(r,e.variantId):0,c=r?`${f.replace(/\/$/,``)}/${r.slug}`:f,l=[e.custom?.studentFirst||e.custom?.studentLast?u(`${e.custom.studentFirst??``} ${e.custom.studentLast??``}`.trim()):``,e.custom?.room?u(`Room ${e.custom.room}`):``,e.custom?.note?u(e.custom.note):``].filter(Boolean).join(` · `);return`<tr data-id="${e.id}">
            <td>
              <a href="${c}">${a}</a>
              ${l?`<div class="muted">${l}</div>`:``}
            </td>
            <td>${o(s)}</td>
            <td>
              <input class="qty-input" type="number" min="1" step="1" value="${e.quantity}" data-qty />
            </td>
            <td>${o(s*e.quantity)}</td>
            <td><button type="button" class="btn-text" data-remove>Remove</button></td>
          </tr>`}).join(``)}</tbody>
        </table>
        <p class="cart-subtotal">Subtotal (${s(h)} item${s(h)===1?``:`s`}): <strong>${o(r(h))}</strong></p>
        <p class="checkout-actions">
          <a class="btn btn-gold" href="${p}">How to complete this order</a>
          <a class="btn" href="${f}">Back to shop</a>
        </p>
      `,d.querySelectorAll(`[data-qty]`).forEach(t=>{t.addEventListener(`change`,()=>{let n=t.closest(`tr`)?.dataset.id;n&&(e(e=>l(e,n,Number(t.value))),m())})}),d.querySelectorAll(`[data-remove]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.closest(`tr`)?.dataset.id;n&&(e(e=>c(e,n)),m())})})}m()}