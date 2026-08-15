import{_ as e,c as t,d as n,g as r,i,m as a,o,p as s,r as c,s as l,v as u,y as d}from"./cart.Bo63CbOY.js";function f(e=``){let t=`/mbmapg/`,n=e.replace(/^\//,``);return n?`${t}${n}`:t}function p(){return!1}function m(e){let t=`https://artodad.github.io`.replace(/\/+$/,``),n=f(e);return`${t}${n.startsWith(`/`)?n:`/${n}`}`}function h(t){let n=[],r={source:`mbmapg-shop`},i=0,a=0;t.items.forEach(t=>{let o=e(t.productSlug);if(!o)return;let s=d(o,t.variantId);if(s>0&&n.push({price_data:{currency:`usd`,product_data:{name:u(o,t.variantId)},unit_amount:s},quantity:t.quantity}),o.slug===`pizza-lunch`){i+=1;let e=String(i),n=t.custom?.studentFirst?.trim()??``,a=t.custom?.studentLast?.trim()??``,o=t.custom?.room?.trim()??``;r[`studentFirst_${e}`]=n,r[`studentLast_${e}`]=a,r[`room_${e}`]=o,r[`company_${e}`]=[n,o].filter(Boolean).join(` `)}o.slug===`teachers-pizza`&&(a+=1),t.custom?.note?.trim()&&(r[`note_${t.id}`]=t.custom.note.trim())}),a&&(r.teachersPizza=String(a));let o=i>0?[{key:`studentFirst`,label:{type:`custom`,custom:`Student first name`},type:`text`},{key:`studentLast`,label:{type:`custom`,custom:`Student last name`},type:`text`},{key:`room`,label:{type:`custom`,custom:`Room #`},type:`text`}]:[{key:`student_note`,label:{type:`custom`,custom:`Student first name & room # (optional)`},type:`text`,optional:!0}];return{mode:`payment`,paymentRequired:c(t)>0&&n.length>0,line_items:n,metadata:r,success_url:m(`checkout/success`),cancel_url:m(`checkout/cancel`),custom_fields:o}}function g(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}var _=document.getElementById(`checkout-app`);if(_){let c=_.dataset.shop??`/mbmapg/shop`,f=_.dataset.cart??`/mbmapg/cart`,m=_.dataset.meet??`/mbmapg/events/welcome-back-meet-greet`,v=_.dataset.email??`info@mbmapg.org`,y=_.dataset.api??`/mbmapg/api/create-checkout-session`,b=_.dataset.connected===`true`&&p();function x(){let n=t(),i=n.items.map(t=>{let n=e(t.productSlug),i=n?u(n,t.variantId,t.sliceCount):t.productSlug,a=n?d(n,t.variantId):0,o=[t.custom?.studentFirst||t.custom?.studentLast?`Student: ${t.custom.studentFirst??``} ${t.custom.studentLast??``}`.trim():``,t.custom?.room?`Room: ${t.custom.room}`:``,t.custom?.note?`Note: ${t.custom.note}`:``].filter(Boolean).join(`; `);return`- ${i} × ${t.quantity} = ${r(a*t.quantity)}${o?` (${o})`:``}`});return i.push(`Subtotal: ${r(o(n))}`),i.join(`
`)}function S(){let e=encodeURIComponent(`Hello,\n\nI would like to place this shop order:\n\n${x()}\n`);return`mailto:${v}?subject=MBMA%20PG%20shop%20order&body=${e}`}function C(){if(!_)return;let v=t();if(v.items.length===0){_.innerHTML=`<p class="cart-empty">Your cart is empty. <a href="${c}">Continue shopping</a></p>`;return}let x=i(v),C=v.items.map(t=>{let n=e(t.productSlug),i=n?u(n,t.variantId,t.sliceCount):t.productSlug,o=n?d(n,t.variantId):0,s=n&&a(t,n).length>=0&&n.requiredFields.includes(`studentFirst`)?`<div class="line-fields">
                <label>Student first name <input type="text" data-field="studentFirst" data-id="${t.id}" value="${g(t.custom?.studentFirst??``)}" required /></label>
                <label>Student last name <input type="text" data-field="studentLast" data-id="${t.id}" value="${g(t.custom?.studentLast??``)}" required /></label>
                <label>Room # <input type="text" data-field="room" data-id="${t.id}" value="${g(t.custom?.room??``)}" required /></label>
              </div>`:`<div class="line-fields">
                <label>Student first name &amp; room # (optional) <input type="text" data-field="note" data-id="${t.id}" value="${g(t.custom?.note??``)}" /></label>
              </div>`;return`<tr>
            <td>
              <strong>${g(i)}</strong>
              × ${t.quantity}
              ${s}
            </td>
            <td>${r(o*t.quantity)}</td>
          </tr>`}).join(``),w=x?`<p class="banner-info" role="status">No payment needed — contact the board.</p>`:``,T=x?`<p class="checkout-actions">
            <a class="btn btn-gold" href="${S()}">Email the board</a>
            <a class="btn" href="${f}">Back to cart</a>
          </p>`:`<p class="checkout-actions">
            <a class="btn btn-gold" data-email-board href="${S()}">Email the board</a>
            <a class="btn" href="${m}">Pay at Meet &amp; Greet</a>
            ${b?`<button type="button" class="btn" data-pay-online>Continue to payment</button>`:``}
            <a class="btn" href="${f}">Back to cart</a>
          </p>`;_.innerHTML=`
        ${w}
        <h2>Order summary</h2>
        <table class="cart-table">
          <thead><tr><th>Item</th><th>Total</th></tr></thead>
          <tbody>${C}</tbody>
        </table>
        <p class="cart-subtotal">Subtotal: <strong>${r(o(v))}</strong></p>
        <p id="checkout-errors" class="banner-warn" hidden></p>
        ${T}
      `,_.querySelectorAll(`input[data-field]`).forEach(e=>{e.addEventListener(`input`,()=>{let t=e.dataset.id,r=e.dataset.field;if(!t||!r)return;l(i=>n(i,t,{[r]:e.value}));let i=_.querySelector(`[data-email-board]`);i&&(i.href=S())})}),_.querySelector(`[data-pay-online]`)?.addEventListener(`click`,async()=>{if(!p())return;let e=t(),n=s(e),r=document.getElementById(`checkout-errors`);if(!n.ok){r&&(r.hidden=!1,r.textContent=n.errors.join(` `));return}let i=h(e),a=await fetch(y,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(i)});r&&(r.hidden=!1,r.textContent=a.ok?`Checkout session created.`:`Payments are not connected yet.`)})}C()}