import{a3 as u,o,j as a,Z as i}from"./DebouncedInput-a5a7caa4.js";import{r as d}from"./index-f1f749bf.js";import"./index-96c5f47c.js";import"./_commonjsHelpers-042e6b4d.js";const b={title:"DataTable/Debounced Input",component:u},e=l=>{const[r,p]=d.useState("");return o("div",{children:[a(u,{...l,value:r,placeholder:"Write something",onChange:c=>p(String(c))}),a("br",{}),o(i,{variant:"body_short",children:[a("strong",{children:"Debounced value:"})," ",r.length?r:"No value"]})]})};var t,s,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`props => {
  const [value, setValue] = useState('');
  return <div>
      <DebouncedInput {...props} value={value} placeholder="Write something" onChange={value => setValue(String(value))} />
      <br />
      <Typography variant="body_short">
        <strong>Debounced value:</strong> {value.length ? value : 'No value'}
      </Typography>
    </div>;
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const y=["Basic"];export{e as Basic,y as __namedExportsOrder,b as default};
//# sourceMappingURL=DebouncedInput.stories-8d5ae302.js.map
