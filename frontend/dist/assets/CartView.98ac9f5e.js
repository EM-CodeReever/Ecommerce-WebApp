import{q,z as M,x as o,i as z,o as a,a as l,k as d,f as t,w as C,T as A,b as g,F as $,p as j,u as r,t as u,d as w,g as F,J as v,A as D,B as P}from"./index.1c9c8e03.js";import{N as E}from"./NavbarComponent.f62e799c.js";import{F as H,_ as U}from"./FooterComponent.3afc5c51.js";import{_ as Y}from"./ProductComponent.vue_vue_type_script_setup_true_lang.fb166350.js";import".prisma/client/index-browser";const e=p=>(D("data-v-7664b93e"),p=p(),P(),p),J=e(()=>t("h2",{class:"text-4xl text-gray-200 font-bold p-5 pb-0 text-center"},"Your Cart",-1)),O={class:"flex justify-center"},Q={key:0,class:"alert alert-warning w-fit shadow-lg mt-5 mx-3 md:mx-0"},R=e(()=>t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"stroke-current flex-shrink-0 h-6 w-6",fill:"none",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})],-1)),W=e(()=>t("span",null," Warning: You've made changes to your cart",-1)),G={class:"flex justify-between flex-col lg:flex-row p-5 h-fit"},K={class:"rounded-lg shadow-xl w-full grow mr-5 bg-gray-800 p-3 flex justify-center items-center",style:{height:"500px"}},X={key:1,class:"w-full h-full overflow-y-scroll scroll-style"},Z={key:0,class:"animate-spin m-10 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},tt=e(()=>t("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"grey","stroke-width":"4"},null,-1)),et=e(()=>t("path",{class:"opacity-75",fill:"black",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"},null,-1)),ot=[tt,et],st={class:"card-body p-3"},nt={class:"card-title flex justify-between"},at={class:"card-actions justify-between"},lt={class:"btn-group font-bold"},rt=e(()=>t("label",{class:"mr-3 font-thin"},"Qty",-1)),ct=["onClick"],it={class:"btn-xs btn-primary"},dt=["onClick"],ut=["onClick"],pt=e(()=>t("svg",{class:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1)),ht=[pt],_t={class:"rounded-lg mt-5 lg:mt-0 bg-gray-800 h-60 py-6 px-4 sm:px-6"},mt={class:"flex justify-between text-xl text-white font-medium"},xt=e(()=>t("p",null,"Subtotal",-1)),ft=e(()=>t("p",{class:"mt-0.5 text-sm text-gray-500"},"Shipping and taxes calculated at checkout.",-1)),gt=["disabled"],wt=e(()=>t("span",{"aria-hidden":"true"}," \u2192",-1)),vt=e(()=>t("h2",{class:"text-2xl lg:text-4xl font-extrabold text-center text-gray-200 my-10"},"Drop in your cart for under $1000",-1)),bt=q({__name:"CartView",setup(p){const m=M();let S={id:0,name:"",price:0,description:"",createdAt:new Date,updatedAt:new Date,categoryId:0,rating:0,stock:0,thumbnail:""},b=o(m.cart);console.log(m.cart);let c=o(0),y=o(),k=o(),V=o(),n=o();o(),o([]),o();let i=o();function yt(h){}function B(){window.location.href="/categories"}function I(){window.location.href="/checkout"}function x(){b.value.cartItems.forEach(h=>{c.value+=h.product.price*h.quantity}),y.value=c.value*.1,k.value=c.value*.05,V.value=c.value+y.value+k.value}x();function N(){n.value=!1}return(h,_)=>{const L=z("perfect-scrollbar");return a(),l("div",null,[d(E),J,t("span",O,[d(A,{name:"fade",mode:"out-in"},{default:C(()=>[r(n)?(a(),l("div",Q,[t("div",{class:"flex flex-col justify-center items-center sm:flex-row"},[R,W,t("button",{class:"btn btn-sm",onClick:N},"Save Changes")])])):g("",!0)]),_:1})]),t("span",G,[t("div",K,[g("",!0),(a(),l("span",X,[(a(!0),l($,null,j(r(b).cartItems,(s,T)=>(a(),l("div",{class:"card card-side bg-gray-300 text-black shadow-xl h-36 min-w-max mb-3",key:T},[t("figure",null,[r(i)?g("",!0):(a(),l("svg",Z,ot)),t("img",{class:F(`${r(i)?"":"hidden"}`),src:"https://api.lorem.space/image/house?w=200&h=280",onLoad:_[0]||(_[0]=f=>v(i)?i.value=!0:i=!0)},null,34)]),t("div",st,[t("h2",nt,[w(u(s.product.name),1),t("span",null,"$"+u(Math.round((s.product.price*s.quantity+Number.EPSILON)*100)/100),1)]),t("p",null,"Unit Price: $"+u(s.product.price),1),t("div",at,[t("div",lt,[rt,t("button",{class:"btn-xs btn-primary",onClick:f=>{s.quantity--,x(),v(n)?n.value=!0:n=!0}},"-",8,ct),t("button",it,u(s.quantity),1),t("button",{class:"btn-xs btn-primary",onClick:f=>{s.quantity++,x(),v(n)?n.value=!0:n=!0}},"+",8,dt)]),t("button",{class:"btn-sm btn-error rounded",onClick:f=>void 0},ht,8,ut)])])]))),128))]))]),t("div",_t,[t("div",mt,[xt,t("p",null,"$"+u(r(c)),1)]),ft,t("button",{class:"btn-success btn rounded w-full font-bold mt-5",onClick:_[1]||(_[1]=s=>I()),disabled:r(m).getProductCount()==0},"Proceed To Checkout",8,gt),t("div",{class:"mt-6 flex justify-center text-center text-sm text-gray-500"},[t("p",null,[w(" or "),t("button",{type:"button",class:"font-medium text-indigo-600 hover:text-indigo-500",onClick:B},[w("Continue Shopping"),wt])])])])]),vt,d(L,{class:"w-full mb-20 mx-auto max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl py-5 px-4 h-fit min-h-fit gap-x-5 grid grid-flow-col grid-rows-1 bg-gray-700 rounded overflow-x-scroll"},{default:C(()=>[(a(),l($,null,j(10,s=>d(Y,{width:"64",product:r(S),class:"flex-none"},null,8,["product"])),64))]),_:1}),d(H)])}}});const Vt=U(bt,[["__scopeId","data-v-7664b93e"]]);export{Vt as default};
