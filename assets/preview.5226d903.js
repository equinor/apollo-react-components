import{k as s,y as o,L as m,w as c,X as v}from"./iframe.e7aa5b54.js";module&&module.hot&&module.hot.decline&&module.hot.decline();var p="links",{document:i,HTMLElement:u}=c,L=e=>o.getChannel().emit(v,e),l=e=>{let{target:t}=e;if(!(t instanceof u))return;let d=t,{sbKind:r,sbStory:a}=d.dataset;(r||a)&&(e.preventDefault(),L({kind:r,story:a}))},n=!1,h=()=>{n||(n=!0,i.addEventListener("click",l))},k=()=>{n&&(n=!1,i.removeEventListener("click",l))},w=s({name:"withLinks",parameterName:p,wrapper:(e,t)=>(h(),o.getChannel().once(m,k),e(t))}),b=[w];export{b as decorators};
//# sourceMappingURL=preview.5226d903.js.map
