import{j as d,p as C,q as R}from"./DebouncedInput-fe7e44fa.js";import{D as y,b as E,f as I,u as T,a as _,c as g}from"./fruits-d7e0407f.js";import{r}from"./index-f1f749bf.js";import"./index-96c5f47c.js";import"./_commonjsHelpers-042e6b4d.js";import"./extends-98964cd2.js";const f=()=>({table:{disable:!0}}),z={title:"DataTable/DataTable Submit All",component:y,args:{config:{sortable:!0,width:"100%",height:"100%",virtual:!1},header:{captionPadding:"1rem",tableCaption:"Fruits"},filters:{globalFilter:!0}},argTypes:{data:f(),columns:f(),table:f()}},x=E({}),b=t=>{const[o,i]=j(),[c,p]=r.useState(I),h=T({...t,meta:{updateData:(e,u,l)=>{i(),p(a=>a.map((s,n)=>n===e?{...a[e],[u]:l}:s))}},data:c,columns:[..._,{accessorKey:"unit",header:"Unit",cell:({getValue:e,row:u,column:l,table:a})=>{const s=e(),[n,D]=r.useState("");r.useEffect(()=>{D(s)},[s]);const[v]=g(x),V=u.id;return v[V]?d("input",{type:"text",value:n,onChange:m=>{D(m.target.value)},onBlur:()=>{var m,S;(S=(m=a.options)==null?void 0:m.meta)==null||S.updateData(u.index,l.id,n)}}):e()}},{id:"edit",cell:e=>{const[u,l]=g(x);return d("button",{onClick:()=>{l(a=>{const s=e.row.id,n=a[s]??!1;return{...a,[s]:!n}})},children:"edit"})}}]});return C(R,{children:[d(P,{table:h}),d(y,{...t,table:h})]})};function P({table:t}){const[o]=g(x);return d("button",{onClick:()=>{const i=Object.keys(o).reduce((c,p)=>(o[p]&&c.push(t.getRow(p).original),c),[]);console.log(i)},children:"Submit All"})}function j(){const t=r.useRef(!0),o=t.current,i=r.useCallback(()=>{t.current=!1},[]);return r.useEffect(()=>{t.current=!0}),[o,i]}var A,k,w;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`(props: any) => {
  const [_, skipAutoResetPageIndex] = useSkipper();
  const [data, setData] = useState(fruitsData);
  const table = useDataTable<Fruit>({
    ...props,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex();
        setData(old => {
          return old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value
              };
            }
            return row;
          });
        });
      }
    },
    data,
    columns: [...fruitColumns, {
      accessorKey: 'unit',
      header: 'Unit',
      cell: ({
        getValue,
        row,
        column,
        table
      }) => {
        const initialValue = getValue();
        const [value, setValue] = useState('');

        // If the initialValue is changed external, sync it up with our state
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);
        const [edits] = useAtom(editsAtom);
        const id = row.id;
        if ((edits as any)[id]) {
          return <input type="text" value={value} onChange={e => {
            setValue(e.target.value);
          }} onBlur={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            table.options?.meta?.updateData(row.index, column.id, value);
          }} />;
        }
        return getValue();
      }
    }, {
      id: 'edit',
      cell: props => {
        const [_, setEdits] = useAtom(editsAtom);
        return <button onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setEdits(old => {
            const id = props.row.id;
            const stored = (old as any)[id] ?? false;
            return {
              ...old,
              [id]: !stored
            };
          });
        }}>
              edit
            </button>;
      }
    }]
  });
  return <>
      <SubmitAllButton table={table} />
      <DataTableRaw {...props} table={table} />
    </>;
}`,...(w=(k=b.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};const G=["SubmitAll"];export{b as SubmitAll,G as __namedExportsOrder,z as default};
//# sourceMappingURL=DataTableRaw.stories-1cf090ed.js.map
