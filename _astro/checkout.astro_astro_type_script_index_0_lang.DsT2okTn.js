import{_ as e,a as t,f as n,g as r,h as i,n as a,o,p as s,r as c,s as l,u,v as d}from"./cart.CZ0D6L0s.js";function f(e=``){let t=`/mbmapg/`,n=e.replace(/^\//,``);return n?`${t}${n}`:t}function p(){return!1}function m(e){let t=`https://artodad.github.io`.replace(/\/+$/,``),n=f(e);return`${t}${n.startsWith(`/`)?n:`/${n}`}`}function h(t){let n=[],i={source:`mbmapg-shop`},o=0,s=0;t.items.forEach(t=>{let a=r(t.productSlug);if(!a)return;let c=d(a,t.variantId);if(c>0&&n.push({price_data:{currency:`usd`,product_data:{name:e(a,t.variantId)},unit_amount:c},quantity:t.quantity}),a.slug===`pizza-lunch`){o+=1;let e=String(o),n=t.custom?.studentFirst?.trim()??``,r=t.custom?.studentLast?.trim()??``,a=t.custom?.room?.trim()??``;i[`studentFirst_${e}`]=n,i[`studentLast_${e}`]=r,i[`room_${e}`]=a,i[`company_${e}`]=[n,a].filter(Boolean).join(` `)}a.slug===`teachers-pizza`&&(s+=1),t.custom?.note?.trim()&&(i[`note_${t.id}`]=t.custom.note.trim())}),s&&(i.teachersPizza=String(s));let c=o>0?[{key:`studentFirst`,label:{type:`custom`,custom:`Student first name`},type:`text`},{key:`studentLast`,label:{type:`custom`,custom:`Student last name`},type:`text`},{key:`room`,label:{type:`custom`,custom:`Room #`},type:`text`}]:[{key:`student_note`,label:{type:`custom`,custom:`Student first name & room # (optional)`},type:`text`,optional:!0}];return{mode:`payment`,paymentRequired:a(t)>0&&n.length>0,line_items:n,metadata:i,success_url:m(`checkout/success`),cancel_url:m(`checkout/cancel`),custom_fields:c}}function g(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}var _=document.getElementById(`checkout-app`);if(_){let a=_.dataset.shop??`/mbmapg/shop`,f=_.dataset.cart??`/mbmapg/cart`,m=_.dataset.meet??`/mbmapg/events/welcome-back-meet-greet`,v=_.dataset.email??`info@mbmapg.org`,y=_.dataset.api??`/mbmapg/api/create-checkout-session`,b=_.dataset.connected===`true`&&p();function x(){let n=l(),a=n.items.map(t=>{let n=r(t.productSlug),a=n?e(n,t.variantId,t.sliceCount):t.productSlug,o=n?d(n,t.variantId):0,s=[t.custom?.studentFirst||t.custom?.studentLast?`Student: ${t.custom.studentFirst??``} ${t.custom.studentLast??``}`.trim():``,t.custom?.room?`Room: ${t.custom.room}`:``,t.custom?.note?`Note: ${t.custom.note}`:``].filter(Boolean).join(`; `);return`- ${a} × ${t.quantity} = ${i(o*t.quantity)}${s?` (${s})`:``}`});return a.push(`Subtotal: ${i(t(n))}`),a.join(`
`)}function S(){let e=encodeURIComponent(`Hello,\n\nI would like to place this shop order:\n\n${x()}\n`);return`mailto:${v}?subject=MBMA%20PG%20shop%20order&body=${e}`}function C(){if(!_)return;let v=l();if(v.items.length===0){_.innerHTML=`<p class="cart-empty">Your cart is empty. <a href="${a}">Continue shopping</a></p>`;return}let x=c(v),C=v.items.map(t=>{let n=r(t.productSlug),a=n?e(n,t.variantId,t.sliceCount):t.productSlug,o=n?d(n,t.variantId):0,c=n&&s(t,n).length>=0&&n.requiredFields.includes(`studentFirst`)?`<div class="line-fields">
                <label>Student first name <input type="text" data-field="studentFirst" data-id="${t.id}" value="${g(t.custom?.studentFirst??``)}" required /></label>
                <label>Student last name <input type="text" data-field="studentLast" data-id="${t.id}" value="${g(t.custom?.studentLast??``)}" required /></label>
                <label>Room # <input type="text" data-field="room" data-id="${t.id}" value="${g(t.custom?.room??``)}" required /></label>
              </div>`:`<div class="line-fields">
                <label>Student first name &amp; room # (optional) <input type="text" data-field="note" data-id="${t.id}" value="${g(t.custom?.note??``)}" /></label>
              </div>`;return`<tr>
            <td>
              <strong>${g(a)}</strong>
              × ${t.quantity}
              ${c}
            </td>
            <td>${i(o*t.quantity)}</td>
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
        <p class="cart-subtotal">Subtotal: <strong>${i(t(v))}</strong></p>
        <p id="checkout-errors" class="banner-warn" hidden></p>
        ${T}
      `,_.querySelectorAll(`input[data-field]`).forEach(e=>{e.addEventListener(`input`,()=>{let t=e.dataset.id,n=e.dataset.field;if(!t||!n)return;o(r=>u(r,t,{[n]:e.value}));let r=_.querySelector(`[data-email-board]`);r&&(r.href=S())})}),_.querySelector(`[data-pay-online]`)?.addEventListener(`click`,async()=>{if(!p())return;let e=l(),t=n(e),r=document.getElementById(`checkout-errors`);if(!t.ok){r&&(r.hidden=!1,r.textContent=t.errors.join(` `));return}let i=h(e),a=await fetch(y,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(i)});r&&(r.hidden=!1,r.textContent=a.ok?`Checkout session created.`:`Payments are not connected yet.`)})}C()}