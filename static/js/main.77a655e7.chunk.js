(this.webpackJsonppath_finding=this.webpackJsonppath_finding||[]).push([[0],[,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),o=n.n(c),s=n(7),r=n.n(s),a=(n(12),n(13),n(3)),i=n(2),l=(n(14),n(0));function u(e){var t=e.row,n=e.col,c=e.isStart,o=e.isEnd,s=e.isWall,r=e.isHover,a=e.onMouseDown,i=e.onMouseUp,u=e.onMouseEnter,d=e.onMouseLeave,j=o?"node-end":c?"node-start":s?"node-wall":"",v=r?"node-hover":"";return Object(l.jsx)("div",{id:"node-".concat(t,"-").concat(n),className:"node ".concat(j," ").concat(v),onMouseDown:function(){return a(t,n)},onMouseEnter:function(){return u(t,n)},onMouseLeave:function(){return d(t,n)},onMouseUp:function(){return i(t,n)}})}n(16);var d=function(e){return Object(l.jsx)("div",{className:"popup-box",children:Object(l.jsxs)("div",{className:"box",children:[Object(l.jsx)("span",{className:"close-icon",onClick:e.handleClose,children:"x"}),e.content]})})},j=(n(17),n(4)),v=function(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)},b=function(e){e.sort((function(e,t){return t.cost-e.cost}))},h=function(e,t){var n=[],c=e.col,o=e.row;return o>0&&n.push(t[o-1][c]),o<t.length-1&&n.push(t[o+1][c]),c>0&&n.push(t[o][c-1]),c<t[0].length-1&&n.push(t[o][c+1]),n.filter((function(e){return!e.isVisited&&!e.isWall}))};function f(e){for(var t=[],n=e;n;)t.unshift(n),n=n.previousNode;return t}var O=function(e,t,n){for(var c={},o={},s=0;s<n.length;++s)for(var r=0;r<n[s].length;++r){var a=n[s][r];c[a.id]=v(t,a),o[a.id]=a===e?0:1/0}return[o,c]},m=function(e,t){for(var n=Object.values(e),c=n[0],o=0,s=n;o<s.length;o++){var r=s[o];(r.cost<c.cost||r.cost===c.cost&&t[r.id]<t[c.id])&&(c=r)}return c};var x=function(e,t){for(var n=0;n<t.length;++n)for(var c=0;c<t[n].length;++c){var o=t[n][c];o.cost=v(e,o)}};function g(){for(var e=Object(c.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],s=Object(c.useState)(!1),r=Object(i.a)(s,2),v=r[0],g=r[1],w=Object(c.useState)(!1),p=Object(i.a)(w,2),N=p[0],S=p[1],E=Object(c.useState)(!1),C=Object(i.a)(E,2),W=C[0],y=C[1],k=Object(c.useState)(!1),M=Object(i.a)(k,2),B=M[0],T=M[1],V=Object(c.useState)(!0),A=Object(i.a)(V,2),F=A[0],I=A[1],D=Object(c.useState)(25),L=Object(i.a)(D,2),H=L[0],P=L[1],R=Object(c.useState)(50),z=Object(i.a)(R,2),G=z[0],U=z[1],J=Object(c.useState)(!1),_=Object(i.a)(J,2),q=_[0],K=_[1],Q=Object(c.useState)({row:12,col:5}),X=Object(i.a)(Q,2),Y=X[0],Z=X[1],$=Object(c.useState)(!1),ee=Object(i.a)($,2),te=ee[0],ne=ee[1],ce=Object(c.useState)({row:12,col:45}),oe=Object(i.a)(ce,2),se=oe[0],re=oe[1],ae=Object(c.useState)([]),ie=Object(i.a)(ae,2),le=ie[0],ue=ie[1],de=[],je=10;je<=30;je++)de.push(je);for(var ve=[],be=10;be<=70;be++)ve.push(be);var he=Object(c.useCallback)((function(){for(var e=[],t=0;t<H;++t){for(var n=[],c=0;c<G;++c)n.push(fe(t,c,{start:Y,end:se,walls:le}));e.push(n)}return e}),[H,G,Y,se,le]);Object(c.useEffect)((function(){var e=he();o(e)}),[he]);var fe=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=n.start,o=n.end,s=n.walls,r=e===c.row&&t===c.col,a=e===o.row&&t===o.col;return{row:e,col:t,isStart:r,isEnd:a,isVisited:!1,isWall:s.length&&e<s.length&&t<s[0].length&&s[e][t],isHover:!1,previousNode:null,cost:1/0,id:"row"+e.toString()+"col"+t.toString()}},Oe=function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,c=function(t){setTimeout((function(){var n=e[t];n.isStart||n.isEnd||(document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-visited")}),12*t*n)},o=0;o<e.length;++o)c(o);setTimeout((function(){me(t)}),12*e.length*n)},me=function(e){for(var t=function(t){setTimeout((function(){var n=e[t];n.isStart||n.isEnd?t===e.length-1&&(S(!0),y(!1)):document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-shortest-path"}),50*t)},n=0;n<e.length;++n)t(n)},xe=function(e,t,n){document.getElementById("node-".concat(t,"-").concat(n)).className="node ".concat(e)},ge=function(e,t,n){var c=e.slice(),o=c[t][n],s=Object(a.a)(Object(a.a)({},o),{},{isWall:F&&!o.isStart&&!o.isEnd});c[t][n]=s},we=function(e){for(var t=0;t<n.length;++t)for(var c=0;c<n[0].length;++c){if(n[t][c].isStart&&"start"===e)return[t,c];if(n[t][c].isEnd&&"end"===e)return[t,c]}return!1},pe=function(){for(var e=[],t=0;t<n.length;++t){e[t]=[];for(var c=0;c<n[0].length;++c)e[t][c]=n[t][c].isWall,n[t][c].isStart||n[t][c].isEnd||n[t][c].isWall||xe("",t,c)}return e},Ne=function(){var e=pe();ue(e),S(!1),I(!0),T(!1)},Se=function(){W||T(!B)},Ee=function(){K(!1),ne(!1);var e=we("start");xe("node-start",e[0],e[1]);var t=we("end");xe("node-end",t[0],t[1])};return Object(l.jsxs)("div",{children:[Object(l.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),Object(l.jsx)("button",{onClick:Se,className:"settings",children:Object(l.jsx)("span",{className:"fa fa-gear"})}),Object(l.jsxs)("div",{className:"header",children:[!W&&!N&&!(q||te)&&Object(l.jsxs)("div",{children:[Object(l.jsx)("button",{className:"headerButton",onClick:function(){var e=n[Y.row][Y.col],t=n[se.row][se.col],c=function(e,t,n){var c=[],o=[t];t.cost=0;do{b(o);var s=o.pop();if(s.isVisited=!0,c.push(s),s===n)return c;var r,a=h(s,e),i=Object(j.a)(a);try{for(i.s();!(r=i.n()).done;){var l=r.value;o.includes(l)||(l.previousNode=s,l.cost=s.cost+1,o.push(l))}}catch(u){i.e(u)}finally{i.f()}}while(o.length);return c}(n,e,t),o=f(t);Oe(c,o),y(!0)},children:"Dijkstra's Algorithm"}),Object(l.jsx)("button",{className:"headerButton",onClick:function(){var e=n[Y.row][Y.col],t=n[se.row][se.col],c=function(e,t,n){var c=[],o={},s=O(t,n,e),r=Object(i.a)(s,2),a=r[0],l=r[1];t.cost=l[t.id],o[t.id]=t;do{var u=m(o,a);if(delete o[u.id],u.isVisited=!0,c.push(u),u===n)return c;var d,v=h(u,e),b=Object(j.a)(v);try{for(b.s();!(d=b.n()).done;){var f=d.value,x=a[u.id]+1;x<a[f.id]&&(a[f.id]=x,f.cost=x+l[f.id],f.previousNode=u,o[f.id]||(o[f.id]=f))}}catch(g){b.e(g)}finally{b.f()}}while(0!==Object.keys(o).length);return c}(n,e,t),o=f(t);Oe(c,o,1.5),y(!0)},children:"A* Algorithm"}),Object(l.jsx)("button",{className:"headerButton",onClick:function(){var e=n[Y.row][Y.col],t=n[se.row][se.col],c=function(e,t,n){x(n,e);var c=[],o=[t];do{b(o);var s=o.pop();if(s.isVisited=!0,c.push(s),s===n)return c;var r,a=h(s,e),i=Object(j.a)(a);try{for(i.s();!(r=i.n()).done;){var l=r.value;o.includes(l)||(l.previousNode=s,o.push(l))}}catch(u){i.e(u)}finally{i.f()}}while(o.length);return c}(n,e,t),o=f(t);Oe(c,o,2),y(!0)},children:"Greedy Best-First Search"})]}),N&&!(q||te)&&Object(l.jsx)("button",{onClick:Ne,children:"Reset Grid"}),(q||te)&&Object(l.jsxs)("div",{children:[q&&Object(l.jsx)("h3",{style:{marginTop:"0px",color:"green"},children:"Select New Start Node"}),te&&Object(l.jsx)("h3",{style:{marginTop:"0px",color:"red"},children:"Select New End Node"}),Object(l.jsx)("button",{onClick:Ee,children:"Cancel"})]}),Object(l.jsx)("br",{})]}),Object(l.jsx)("div",{className:"grid",children:n.map((function(e,t){return Object(l.jsx)("div",{children:e.map((function(e,t){var c=e.row,o=e.col,s=e.isStart,r=e.isEnd,a=e.isWall,i=e.isHover;return Object(l.jsx)(u,{col:o,row:c,isStart:s,isEnd:r,isWall:a,mouseIsPressed:v,isHover:i,onMouseDown:function(e,t){return function(e,t){if(!q||n[e][t].isWall||n[e][t].isEnd)if(!te||n[e][t].isWall||n[e][t].isStart){if(te||q)return void alert("Please choose another space");if(!v&&!N&&!W){ge(n,e,t);var c=pe();ue(c)}}else{var o=we("end");n[o[0]][o[1]].isEnd=!1,re({row:e,col:t}),ne(!1)}else{var s=we("start");n[s[0]][s[1]].isStart=!1,Z({row:e,col:t}),K(!1)}g(!v)}(e,t)},onMouseEnter:function(e,t){return function(e,t){if(!q||n[e][t].isEnd||n[e][t].isWall)if(!te||n[e][t].isStart||n[e][t].isWall){if(v||n[e][t].isWall||n[e][t].isStart||n[e][t].isEnd||n[e][t].isVisited||N||W||!F?F||!n[e][t].isWall||N||W||xe("node-hover-red",e,t):xe("node-hover",e,t),v&&F&&!N&&!W){ge(n,e,t);var c=pe();ue(c)}}else xe("node-hover-end",e,t);else xe("node-hover-start",e,t)}(e,t)},onMouseLeave:function(e,t){return function(e,t){if((v||n[e][t].isWall||n[e][t].isStart||n[e][t].isEnd||n[e][t].isVisited)&&(!q&&!te||n[e][t].isStart||n[e][t].isEnd||n[e][t].isWall)?n[e][t].isWall&&xe("node-wall",e,t):xe("",e,t),v&&!F&&!N&&!W){ge(n,e,t);var c=pe();ue(c)}}(e,t)},onMouseUp:function(e,t){return function(e,t){if(g(!1),!(F||N||W)){ge(n,e,t);var c=pe();ue(c)}}(e,t)}},t)}))},t)}))}),B&&Object(l.jsx)(d,{content:Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"column",children:Object(l.jsx)("b",{children:"Reset All"})}),Object(l.jsx)("div",{className:"column",children:Object(l.jsx)("button",{onClick:function(){N&&Ne(),ue([]),I(!0),T(!1)},children:Object(l.jsx)("span",{className:"fa fa-refresh"})})})]}),Object(l.jsx)("br",{}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"column",children:F?Object(l.jsx)("b",{children:"Remove Walls"}):Object(l.jsx)("b",{children:"Add Walls"})}),Object(l.jsxs)("div",{className:"column",children:[Object(l.jsx)("button",{onClick:function(){N&&Ne(),I(!F),T(!1),g(!1),Ee()},children:Object(l.jsx)("span",{className:F?"fa fa-bomb":"fa fa-wrench"})}),"  "]})]}),Object(l.jsx)("br",{}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"column",children:Object(l.jsx)("b",{children:"Grid Size"})}),Object(l.jsxs)("div",{className:"column",children:[Object(l.jsxs)("div",{className:"row",style:{marginBottom:"10px"},children:[Object(l.jsx)("div",{className:"column",children:Object(l.jsx)("b",{style:{fontSize:"15px"},children:"Rows"})}),Object(l.jsx)("div",{className:"column",children:Object(l.jsx)("b",{style:{fontSize:"15px"},children:"Columns"})})]}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"column",children:Object(l.jsx)("select",{name:"row-select",value:H,onChange:function(e){P(e.target.value);var t=1;if(Y.row>=e.target.value&&(e.target.value-t===se.row&&Y.col===se.col&&t++,n[e.target.value-t][Y.col].isWall=!1,Z(Object(a.a)(Object(a.a)({},Y),{},{row:e.target.value-t}))),se.row>=e.target.value&&((e.target.value-t===Y.row||Y.row>=e.target.value)&&Y.col===se.col&&t++,n[e.target.value-t][se.col].isWall=!1,re(Object(a.a)(Object(a.a)({},se),{},{row:e.target.value-t}))),N)Ne();else{var c=pe();ue(c)}},children:de.map((function(e){return Object(l.jsx)("option",{value:e,children:e},e)}))})}),Object(l.jsx)("div",{className:"column",children:Object(l.jsx)("select",{name:"col-select",value:G,onChange:function(e){U(e.target.value);var t=1;if(Y.col>=e.target.value&&(e.target.value-t===se.col&&Y.row===se.row&&t++,n[Y.row][e.target.value-t].isWall=!1,Z(Object(a.a)(Object(a.a)({},Y),{},{col:e.target.value-t}))),se.col>=e.target.value&&((e.target.value-t===Y.col||Y.col>=e.target.value)&&Y.row===se.row&&t++,n[se.row][e.target.value-t].isWall=!1,re(Object(a.a)(Object(a.a)({},se),{},{col:e.target.value-t}))),N)Ne();else{var c=pe();ue(c)}},children:ve.map((function(e){return Object(l.jsx)("option",{value:e,children:e},e)}))})})]})]})]}),Object(l.jsx)("br",{}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"column",children:Object(l.jsx)("button",{onClick:function(){N&&Ne(),Ee(),T(!1),K(!0),ne(!1),I(!0);var e=we("start");xe("node-hover-start",e[0],e[1])},children:"Change Start Node"})}),Object(l.jsx)("div",{className:"column",children:Object(l.jsx)("button",{onClick:function(){N&&Ne(),Ee(),T(!1),ne(!0),K(!1),I(!0);var e=we("end");xe("node-hover-end",e[0],e[1])},children:"Change End Node"})})]})]}),handleClose:Se})]})}var w=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)(g,{})})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),o(e),s(e),r(e)}))};r.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(w,{})}),document.getElementById("root")),p()}],[[18,1,2]]]);
//# sourceMappingURL=main.77a655e7.chunk.js.map