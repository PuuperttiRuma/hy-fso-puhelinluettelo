(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),l=(t(20),t(4)),u=t(2),i=t(3),s=t.n(i),m="/api/persons",d=function(){return s.a.get(m).then((function(e){return e.data}))},f=function(e){return s.a.post(m,e).then((function(e){return e.data}))},h=function(e){return s.a.delete("".concat(m,"/").concat(e))},b=function(e,n){return s.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){var n=e.person,t=e.handleDeletePerson;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(){return t(n.id)}},"delete"))},g=function(e){var n=e.persons,t=e.handleDeletePerson;return r.a.createElement("ul",null,n.map((function(e){return r.a.createElement(v,{person:e,key:e.id,handleDeletePerson:t})})))},p=function(e){var n=e.message;if(null===n)return null;var t={color:n.color,fontSize:18,borderStyle:"solid",borderRadius:5,marginBottom:10,padding:5};return r.a.createElement("div",{style:t,className:"databaseMessage"},n.text)},E=function(e){var n=e.addPerson,t=e.dbMessage,a=e.newName,o=e.newNumber,c=e.handleNameChange,l=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,r.a.createElement(p,{message:t}),r.a.createElement("label",null,"name:",r.a.createElement("input",{value:a,onChange:c}))),r.a.createElement("div",null,r.a.createElement("label",null,"number:",r.a.createElement("input",{value:o,onChange:l}))),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},w=function(e){return r.a.createElement("label",null,"search",r.a.createElement("input",{type:"text",value:e.searchName,onChange:e.handleSearchChange}))},j=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),i=Object(u.a)(c,2),s=i[0],m=i[1],v=Object(a.useState)(""),p=Object(u.a)(v,2),j=p[0],O=p[1],C=Object(a.useState)(""),S=Object(u.a)(C,2),N=S[0],y=S[1],x=Object(a.useState)([]),k=Object(u.a)(x,2),D=k[0],P=k[1],M=Object(a.useState)(null),B=Object(u.a)(M,2),T=B[0],A=B[1];Object(a.useEffect)((function(){d().then((function(e){o(e)}))}),[]);Object(a.useEffect)((function(){if(""!==N){var e=t.filter((function(e){return e.name.toLowerCase().includes(N)}));P(e)}else P(t)}),[N,t]);var J=function(e){A(e),setTimeout((function(){return A(null)}),3e3)};return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement("h2",null,"Add a new contact"),r.a.createElement(E,{addPerson:function(e){if(e.preventDefault(),s&&j){var n={name:s,number:j};if(t.some((function(e){return e.name===n.name}))){if(!window.confirm("".concat(s," is already in the phonebook, do you want to replace the old number with a new one?")))return;!function(e){var n=t.find((function(n){return n.name===e.name})),a=Object(l.a)(Object(l.a)({},n),{},{number:j});b(a.id,a).then((function(e){o(t.map((function(n){return n.id!==a.id?n:e}))),J({text:"Updated number of ".concat(a.name),color:"green"})})).catch((function(n){console.error(n),J({text:"The information of ".concat(a.name," has been removed from the server"),color:"red"}),console.log(e),o(t.filter((function(e){return e.id!==a.id})))}))}(n)}else!function(e){f(e).then((function(n){o(t.concat(n)),m(""),O(""),J({text:"Added ".concat(e.name),color:"green"})})).catch((function(e){console.log(e.response.data.error),J({text:e.response.data.error,color:"red"})}))}(n)}},dbMessage:T,newName:s,newNumber:j,handleNameChange:function(e){m(e.target.value)},handleNumberChange:function(e){O(e.target.value)}}),r.a.createElement("h2",null,"Contacts"),r.a.createElement(w,{searchName:N,handleSearchChange:function(e){y(e.target.value.toLowerCase())}}),r.a.createElement(g,{persons:D,handleDeletePerson:function(e){!function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Do you want to delete ".concat(n,"?"))&&h(e).then(o(t.filter((function(n){return n.id!==e}))),J({text:"Deleted ".concat(n),color:"green"})).catch((function(a){console.error(a),J({text:"The information of ".concat(n," has been removed from the server"),color:"red"}),o(t.filter((function(n){return n.id!==e})))}))}(e)}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.08ca852d.chunk.js.map