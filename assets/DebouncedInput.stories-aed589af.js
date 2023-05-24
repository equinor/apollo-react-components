import{H as u,p as t,j as a,y as i}from"./DebouncedInput-7e679ee1.js";import{r as d}from"./index-f1f749bf.js";import"./index-96c5f47c.js";import"./_commonjsHelpers-042e6b4d.js";const b={title:"DataTable/Debounced Input",component:u},e=p=>{const[r,l]=d.useState("");return t("div",{children:[a(u,{...p,value:r,placeholder:"Write something",onChange:c=>l(String(c))}),a("br",{}),t(i,{variant:"body_short",children:[a("strong",{children:"Debounced value:"})," ",r.length?r:"No value"]})]})};var o,s,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`props => {
  const [value, setValue] = useState('');
  return <div>
      <DebouncedInput {...props} value={value} placeholder="Write something" onChange={value => setValue(String(value))} />
      <br />
      <Typography variant="body_short">
        <strong>Debounced value:</strong> {value.length ? value : 'No value'}
      </Typography>
    </div>;
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const y=["Basic"];export{e as Basic,y as __namedExportsOrder,b as default};
//# sourceMappingURL=DebouncedInput.stories-aed589af.js.map
