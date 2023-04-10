import{q as H,x as r,O,o as p,a as f,k as h,f as e,w as N,T as V,u as s,e as d,K as i,J as k,t as x,b,d as U,D as R,G as E,A as I,B as T}from"./index.1c9c8e03.js";import{N as j}from"./NavbarComponent.f62e799c.js";import{F,_ as z}from"./FooterComponent.3afc5c51.js";import".prisma/client/index-browser";const l=m=>(I("data-v-2514cd6d"),m=m(),T(),m),L={class:"container mx-auto mt-10 pb-10"},Z={class:"flex flex-wrap justify-center"},$={class:"w-full max-w-lg"},G={key:0,class:"flex flex-col break-words bg-gray-200 border rounded lg:rounded-lg shadow-md"},J=l(()=>e("div",{class:"font-semibold bg-gray-800 text-gray-200 rounded lg:rounded-t-lg lg:rounded-b-none py-3 px-6 mb-0"},[e("h1",{class:"text-center"},"Sign Up")],-1)),K={class:"w-full p-6"},M={class:"flex flex-wrap mb-6"},Y=l(()=>e("label",{for:"first_name",class:"block text-gray-700 text-sm font-bold mb-2"}," First Name ",-1)),Q=l(()=>e("label",{for:"last_name",class:"block text-gray-700 text-sm font-bold mb-2"}," Last Name ",-1)),W={class:"flex flex-wrap mb-6"},X=l(()=>e("label",{for:"email",class:"block text-gray-700 text-sm font-bold mb-2"}," Email Address ",-1)),ee={class:"flex flex-wrap mb-6"},te=l(()=>e("label",{for:"password",class:"block text-gray-700 text-sm font-bold mb-2"}," Password ",-1)),se=l(()=>e("label",{for:"password_confirmation",class:"block text-gray-700 text-sm font-bold mb-2"}," Re-enter Password ",-1)),ae={class:"text-red-500 text-xs italic"},oe={class:"flex flex-wrap mb-6"},le=l(()=>e("label",{for:"phone_number",class:"block text-gray-700 text-sm font-bold mb-2"}," Phone Number ",-1)),ne={class:"flex flex-wrap"},re=l(()=>e("label",{for:"date_of_birth",class:"block text-gray-700 text-sm font-bold mb-2"}," Date of Birth ",-1)),de={class:"text-red-500 text-md italic"},ie={class:"flex items-center justify-end"},ue={key:0,class:"bg-gray-200 h-fit rounded-lg p-5"},ce={key:0},pe=l(()=>e("p",{class:"font-bold text-3xl text-center text-gray-800"},"Email Verification",-1)),fe={class:"font-medium text-lg my-3 text-center text-gray-700"},me={class:"font-medium"},_e={class:"flex justify-center"},he={class:"flex justify-between items-center"},xe={class:"text-red-500 text-md italic"},be={key:1},we=l(()=>e("p",{class:"font-bold text-3xl text-center text-green-700"},"Email Verified!",-1)),ge={class:"flex justify-center items-center mt-5"},ye=H({__name:"SignUpView",setup(m){R();let u=r(""),c=r(""),g=r(!1),y=r(!1),_=r(""),v=r(""),w=r(!1);r("");let t=r({firstName:"",lastName:"",email:"",passwordHash:"",phoneNumber:"",dateOfBirth:new Date,gender:"RATHER_NOT_SAY",createdAt:new Date,updatedAt:new Date,id:"",role:O.Role.USER});function S(n){return n.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?!0:(u.value="Invalid email format",!1)}function A(n){return!!n.match(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/)}function B(n){return!!n.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)}function C(){return t.value.email===""||t.value.passwordHash===""||c.value===""||t.value.firstName===""||t.value.lastName===""||t.value.phoneNumber===""||t.value.dateOfBirth===null?(u.value="Please fill out all fields",!1):t.value.passwordHash!==c.value?(u.value="Passwords do not match",!1):B(t.value.phoneNumber)?S(t.value.email)?A(t.value.passwordHash)?!0:(u.value="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number",!1):(u.value="Invalid email format",!1):(u.value="Invalid phone number format",!1)}async function D(){C()?g.value=!0:console.log("Form is not valid")}async function P(){{let n=await E.signUp(t.value);n.status?w.value=!0:v.value=n.message}}async function q(){y.value=!0}return(n,a)=>(p(),f("section",null,[h(j),e("div",L,[e("div",Z,[e("div",$,[h(V,{name:"fade",mode:"out-in",appear:"",onAfterLeave:q},{default:N(()=>[s(g)?b("",!0):(p(),f("div",G,[J,e("div",K,[e("div",M,[Y,d(e("input",{class:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"first_name",type:"text",placeholder:"First Name","onUpdate:modelValue":a[0]||(a[0]=o=>s(t).firstName=o),required:""},null,512),[[i,s(t).firstName]]),Q,d(e("input",{class:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"last_name",type:"text",placeholder:"Last Name","onUpdate:modelValue":a[1]||(a[1]=o=>s(t).lastName=o),required:""},null,512),[[i,s(t).lastName]])]),e("div",W,[X,d(e("input",{class:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"email",type:"text",placeholder:"email@example.com","onUpdate:modelValue":a[2]||(a[2]=o=>s(t).email=o),required:""},null,512),[[i,s(t).email]])]),e("div",ee,[te,d(e("input",{class:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"password",type:"password",placeholder:"******************","onUpdate:modelValue":a[3]||(a[3]=o=>s(t).passwordHash=o),required:""},null,512),[[i,s(t).passwordHash]]),se,d(e("input",{class:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"password_confirmation",type:"password",placeholder:"******************","onUpdate:modelValue":a[4]||(a[4]=o=>k(c)?c.value=o:c=o),required:""},null,512),[[i,s(c)]]),e("p",ae,x(s(t).passwordHash===s(c)?"":"Passwords do not match"),1)]),e("div",oe,[le,d(e("input",{class:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"phone_number",type:"text",placeholder:"(123) 456-7890","onUpdate:modelValue":a[5]||(a[5]=o=>s(t).phoneNumber=o),required:""},null,512),[[i,s(t).phoneNumber]])]),e("div",ne,[re,d(e("input",{class:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"date_of_birth",type:"date",placeholder:"Date of Birth","onUpdate:modelValue":a[6]||(a[6]=o=>s(t).dateOfBirth=o),required:""},null,512),[[i,s(t).dateOfBirth]])]),e("p",de,x(s(u)),1),e("div",ie,[e("button",{class:"btn btn-info",onClick:a[7]||(a[7]=o=>D())}," Register ")])])]))]),_:1}),h(V,{name:"fade",mode:"out-in"},{default:N(()=>[s(y)?(p(),f("div",ue,[s(w)?b("",!0):(p(),f("span",ce,[pe,e("p",fe,[U("A 5 digit Verification code was just sent to "),e("span",me,x(s(t).email),1),U(" , check your email and enter the code here to continue the sign-up process")]),e("span",_e,[d(e("input",{type:"text","onUpdate:modelValue":a[8]||(a[8]=o=>k(_)?_.value=o:_=o),class:"input input-ghost border-gray-800"},null,512),[[i,s(_)]])]),e("span",he,[e("p",xe,x(s(v)),1),e("button",{class:"btn btn-info",onClick:P},"Verify")])])),s(w)?(p(),f("span",be,[we,e("span",ge,[e("button",{class:"btn",onClick:a[9]||(a[9]=()=>{})},"GO TO login")])])):b("",!0)])):b("",!0)]),_:1})])])]),h(F)]))}});const Ue=z(ye,[["__scopeId","data-v-2514cd6d"]]);export{Ue as default};