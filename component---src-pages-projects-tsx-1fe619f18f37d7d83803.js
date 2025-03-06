"use strict";(self.webpackChunktravnikov_dev=self.webpackChunktravnikov_dev||[]).push([[789],{2761:function(e,s,t){t.r(s),t.d(s,{Head:function(){return y},default:function(){return f}});var a=t(6540),r=t(4794),o=t(2659),n=t(1524),c=t(7271),i=t(7826),l=t(9277),d=t(1179),m=t(1074),p=t(4999),g=t(3976),u=t(6807),v=t(5593);function f(e){let{data:s}=e;const t=[];return a.createElement(u.A,null,a.createElement(o.m,{size:"lg",py:"xl"},a.createElement(n.a,{mb:"xl"},a.createElement(c.h,{order:1,mb:"md"},"Projects"),a.createElement(i.E,{size:"lg"},"A showcase of my work as a senior frontend developer, including indie projects, browser extensions, and professional work.")),t.length>0?a.createElement(l.r,{cols:{base:1,sm:2,md:3},spacing:{base:"md",sm:"lg"}},t.map((e=>a.createElement(r.Link,{key:e.id,to:`/projects/${e.slug}`,style:{textDecoration:"none",color:"inherit"}},a.createElement(d.Z,{shadow:"sm",padding:"lg",radius:"md",withBorder:!0},e.image&&a.createElement(d.Z.Section,null,a.createElement(m._,{src:e.image.publicURL,height:160,alt:e.title})),a.createElement(p.Y,{justify:"space-between",mt:"md",mb:"xs"},a.createElement(i.E,{fw:500},e.title),a.createElement(g.E,{color:"blue"},e.category)),a.createElement(i.E,{size:"sm",color:"dimmed",lineClamp:3},e.description)))))):a.createElement(l.r,{cols:{base:1,sm:2,md:3},spacing:{base:"md",sm:"lg"}},[1,2,3,4,5,6].map((e=>a.createElement(d.Z,{key:e,shadow:"sm",padding:"lg",radius:"md",withBorder:!0},a.createElement(d.Z.Section,null,a.createElement(n.a,{h:160,bg:"gray.2"})),a.createElement(p.Y,{justify:"space-between",mt:"md",mb:"xs"},a.createElement(i.E,{fw:500},"Project ",e),a.createElement(g.E,{color:"blue"},"Web App")),a.createElement(i.E,{size:"sm",color:"dimmed"},"This is a placeholder for a project description. Projects will be loaded from Markdown files.")))))))}function y(){return a.createElement(v.k,{title:"Projects",description:"Browse through Roman Travnikov's portfolio of frontend development projects including web applications, browser extensions, and more."})}},3976:function(e,s,t){t.d(s,{E:function(){return u}});var a=t(4848),r=(t(6540),t(6324)),o=t(9396),n=t(6344),c=t(6100),i=t(2837),l=t(1524),d=t(8639),m={root:"m_347db0ec","root--dot":"m_fbd81e3d",label:"m_5add502a",section:"m_91fdda9b"};const p={},g=(0,o.V)(((e,{radius:s,color:t,gradient:a,variant:o,size:c,autoContrast:i})=>{const l=e.variantColorResolver({color:t||e.primaryColor,theme:e,gradient:a,variant:o||"filled",autoContrast:i});return{root:{"--badge-height":(0,r.YC)(c,"badge-height"),"--badge-padding-x":(0,r.YC)(c,"badge-padding-x"),"--badge-fz":(0,r.YC)(c,"badge-fz"),"--badge-radius":void 0===s?void 0:(0,r.nJ)(s),"--badge-bg":t||o?l.background:void 0,"--badge-color":t||o?l.color:void 0,"--badge-bd":t||o?l.border:void 0,"--badge-dot-color":"dot"===o?(0,n.r)(t,e):void 0}}})),u=(0,d.v)(((e,s)=>{const t=(0,c.Y)("Badge",p,e),{classNames:r,className:o,style:n,styles:d,unstyled:u,vars:v,radius:f,color:y,gradient:b,leftSection:h,rightSection:j,children:E,variant:x,fullWidth:w,autoContrast:N,circle:S,mod:k,...C}=t,Y=(0,i.I)({name:"Badge",props:t,classes:m,className:o,style:n,classNames:r,styles:d,unstyled:u,vars:v,varsResolver:g});return(0,a.jsxs)(l.a,{variant:x,mod:[{block:w,circle:S,"with-right-section":!!j,"with-left-section":!!h},k],...Y("root",{variant:x}),ref:s,...C,children:[h&&(0,a.jsx)("span",{...Y("section"),"data-position":"left",children:h}),(0,a.jsx)("span",{...Y("label"),children:E}),j&&(0,a.jsx)("span",{...Y("section"),"data-position":"right",children:j})]})}));u.classes=m,u.displayName="@mantine/core/Badge"},1179:function(e,s,t){t.d(s,{Z:function(){return j}});var a=t(4848),r=t(6540),o=t(6324),n=t(9396),c=t(6100),i=t(2837),l=t(8639),d=t(6267),m=t(6798);const[p,g]=(0,m.F)("Card component was not found in tree");var u=t(1524),v={root:"m_e615b15f",section:"m_599a2148"};const f={},y=(0,l.v)(((e,s)=>{const t=(0,c.Y)("CardSection",f,e),{classNames:r,className:o,style:n,styles:i,vars:l,withBorder:d,inheritPadding:m,mod:p,...v}=t,y=g();return(0,a.jsx)(u.a,{ref:s,mod:[{"with-border":d,"inherit-padding":m},p],...y.getStyles("section",{className:o,style:n,styles:i,classNames:r}),...v})}));y.classes=v,y.displayName="@mantine/core/CardSection";const b={},h=(0,n.V)(((e,{padding:s})=>({root:{"--card-padding":(0,o.GY)(s)}}))),j=(0,l.v)(((e,s)=>{const t=(0,c.Y)("Card",b,e),{classNames:o,className:n,style:l,styles:m,unstyled:g,vars:u,children:f,padding:j,...E}=t,x=(0,i.I)({name:"Card",props:t,classes:v,className:n,style:l,classNames:o,styles:m,unstyled:g,vars:u,varsResolver:h}),w=r.Children.toArray(f),N=w.map(((e,s)=>"object"==typeof e&&e&&"type"in e&&e.type===y?(0,r.cloneElement)(e,{"data-first-section":0===s||void 0,"data-last-section":s===w.length-1||void 0}):e));return(0,a.jsx)(p,{value:{getStyles:x},children:(0,a.jsx)(d.t,{ref:s,unstyled:g,...x("root"),...E,children:N})})}));j.classes=v,j.displayName="@mantine/core/Card",j.Section=y},1074:function(e,s,t){t.d(s,{_:function(){return u}});var a=t(4848),r=t(6540),o=t(6324),n=t(9396),c=t(6100),i=t(2837),l=t(1524),d=t(8639),m={root:"m_9e117634"};const p={},g=(0,n.V)(((e,{radius:s,fit:t})=>({root:{"--image-radius":void 0===s?void 0:(0,o.nJ)(s),"--image-object-fit":t}}))),u=(0,d.v)(((e,s)=>{const t=(0,c.Y)("Image",p,e),{classNames:o,className:n,style:d,styles:u,unstyled:v,vars:f,onError:y,src:b,radius:h,fit:j,fallbackSrc:E,mod:x,...w}=t,[N,S]=(0,r.useState)(!b);(0,r.useEffect)((()=>S(!b)),[b]);const k=(0,i.I)({name:"Image",classes:m,props:t,className:n,style:d,classNames:o,styles:u,unstyled:v,vars:f,varsResolver:g});return N&&E?(0,a.jsx)(l.a,{component:"img",ref:s,src:E,...k("root"),onError:y,mod:["fallback",x],...w}):(0,a.jsx)(l.a,{component:"img",ref:s,...k("root"),src:b,onError:e=>{y?.(e),S(!0)},mod:x,...w})}));u.classes=m,u.displayName="@mantine/core/Image"},9277:function(e,s,t){t.d(s,{r:function(){return w}});var a=t(4848),r=(t(6540),t(6100)),o=t(2837),n=t(3974),c=t(1524),i=t(2412),l=t(3052),d=t(8459),m=t(7602),p=t(6324),g=t(4294),u=t(3164),v=t(1101),f=t(5074);function y({spacing:e,verticalSpacing:s,cols:t,selector:r}){const o=(0,v.xd)(),n=void 0===s?e:s,c=(0,m.J)({"--sg-spacing-x":(0,p.GY)((0,u.D)(e)),"--sg-spacing-y":(0,p.GY)((0,u.D)(n)),"--sg-cols":(0,u.D)(t)?.toString()}),i=(0,l.H)(o.breakpoints).reduce(((s,a)=>(s[a]||(s[a]={}),"object"==typeof e&&void 0!==e[a]&&(s[a]["--sg-spacing-x"]=(0,p.GY)(e[a])),"object"==typeof n&&void 0!==n[a]&&(s[a]["--sg-spacing-y"]=(0,p.GY)(n[a])),"object"==typeof t&&void 0!==t[a]&&(s[a]["--sg-cols"]=t[a]),s)),{}),d=(0,g.q)((0,l.H)(i),o.breakpoints).filter((e=>(0,l.H)(i[e.value]).length>0)).map((e=>({query:`(min-width: ${o.breakpoints[e.value]})`,styles:i[e.value]})));return(0,a.jsx)(f.K,{styles:c,media:d,selector:r})}function b(e){return"object"==typeof e&&null!==e?(0,l.H)(e):[]}function h({spacing:e,verticalSpacing:s,cols:t}){return function(e){return e.sort(((e,s)=>(0,d.px)(e)-(0,d.px)(s)))}(Array.from(new Set([...b(e),...b(s),...b(t)])))}function j({spacing:e,verticalSpacing:s,cols:t,selector:r}){const o=void 0===s?e:s,n=(0,m.J)({"--sg-spacing-x":(0,p.GY)((0,u.D)(e)),"--sg-spacing-y":(0,p.GY)((0,u.D)(o)),"--sg-cols":(0,u.D)(t)?.toString()}),c=h({spacing:e,verticalSpacing:s,cols:t}),i=c.reduce(((s,a)=>(s[a]||(s[a]={}),"object"==typeof e&&void 0!==e[a]&&(s[a]["--sg-spacing-x"]=(0,p.GY)(e[a])),"object"==typeof o&&void 0!==o[a]&&(s[a]["--sg-spacing-y"]=(0,p.GY)(o[a])),"object"==typeof t&&void 0!==t[a]&&(s[a]["--sg-cols"]=t[a]),s)),{}),l=c.map((e=>({query:`simple-grid (min-width: ${e})`,styles:i[e]})));return(0,a.jsx)(f.K,{styles:n,container:l,selector:r})}var E={container:"m_925c2d2c",root:"m_2415a157"};const x={cols:1,spacing:"md",type:"media"},w=(0,i.P9)(((e,s)=>{const t=(0,r.Y)("SimpleGrid",x,e),{classNames:i,className:l,style:d,styles:m,unstyled:p,vars:g,cols:u,verticalSpacing:v,spacing:f,type:b,...h}=t,w=(0,o.I)({name:"SimpleGrid",classes:E,props:t,className:l,style:d,classNames:i,styles:m,unstyled:p,vars:g}),N=(0,n.C)();return"container"===b?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(j,{...t,selector:`.${N}`}),(0,a.jsx)("div",{...w("container"),children:(0,a.jsx)(c.a,{ref:s,...w("root",{className:N}),...h})})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(y,{...t,selector:`.${N}`}),(0,a.jsx)(c.a,{ref:s,...w("root",{className:N}),...h})]})}));w.classes=E,w.displayName="@mantine/core/SimpleGrid"}}]);
//# sourceMappingURL=component---src-pages-projects-tsx-1fe619f18f37d7d83803.js.map