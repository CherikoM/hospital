import{h as oe,aw as ne,ak as ie,r as y,t as l,F as n,D as ce,x as pe,A as s,y as e,J as m,K as v,O as a,M as ee,z as re,a7 as de,ai as he,aj as ue,ah as _e}from"./index-4bab59ba.js";import{H as fe}from"./index-d608b062.js";import{u as me}from"./hospitalDetail-9be16026.js";import"./good.vue_vue_type_script_setup_true_lang-af487128.js";import"./index-5f6caa8a.js";const ve=(d,g=1e3)=>{let h=null;return function(...o){h&&(clearTimeout(h),h=null),h=setTimeout(()=>{d.apply(this,o)},g)}},se=d=>(he("data-v-81c324b8"),d=d(),ue(),d),ge={class:"register"},ke={class:"content"},ye=se(()=>e("h4",null,"挂号规则",-1)),Ie={class:"time"},be={class:"period"},De={class:"open"},Te={class:"close"},Se={class:"address"},Ce={class:"route"},Re={class:"cancel"},xe={class:"rule"},He=se(()=>e("div",{class:"rule-title"}," 医院预约规则 ",-1)),Ne={class:"department"},Ve={class:"left-nav"},qe=["onClick"],we={class:"dep-container"},Ae={key:0},Be=["onClick"],ze=oe({name:"Register"}),Fe=oe({...ze,setup(d){const g=ne(),h=ie(),o=me(),k=y(0),I=y(),_=y(),te=p=>{k.value=p;const r=_.value[p];I.value.scroll({top:r.offsetTop,behavior:"smooth"})},b=ve(p=>{if(p){const r=p.target.scrollTop,u=_.value;for(let i=0;i<_.value.length;i++)if(u[i].offsetTop<=r&&r<u[i].offsetTop+u[i].offsetHeight){k.value=i;break}}},500),ae=p=>{h.push({path:"/hospital/registration",query:{hoscode:g.query.hoscode,depcode:p.depcode}})};return(p,r)=>{var u,i,D,T,S,C,R,x,H;return l(),n("div",ge,[ce(fe,{hosname:(D=(i=(u=s(o))==null?void 0:u.hospitalInfo)==null?void 0:i.hospital)==null?void 0:D.hosname,hostype:(C=(S=(T=s(o))==null?void 0:T.hospitalInfo)==null?void 0:S.hospital)==null?void 0:C.param.hostypeString,img:(H=(x=(R=s(o))==null?void 0:R.hospitalInfo)==null?void 0:x.hospital)==null?void 0:H.logoData},{default:pe(()=>{var t,c,f,N,V,q,w,A,B,z,F,$,j,E,J,K,L,M,O,G,P,Q,U,W,X,Y;return[e("div",ke,[ye,e("p",Ie,[e("span",be,"预约周期："+a((N=(f=(c=(t=s(o))==null?void 0:t.hospitalInfo)==null?void 0:c.hospital)==null?void 0:f.bookingRule)==null?void 0:N.cycle)+"天",1),ee("  "),e("span",De,"放号时间："+a((A=(w=(q=(V=s(o))==null?void 0:V.hospitalInfo)==null?void 0:q.hospital)==null?void 0:w.bookingRule)==null?void 0:A.releaseTime),1),ee("  "),e("span",Te,"停挂时间："+a(($=(F=(z=(B=s(o))==null?void 0:B.hospitalInfo)==null?void 0:z.hospital)==null?void 0:F.bookingRule)==null?void 0:$.stopTime),1)]),e("p",Se," 具体地址："+a((K=(J=(E=(j=s(o))==null?void 0:j.hospitalInfo)==null?void 0:E.hospital)==null?void 0:J.param)==null?void 0:K.fullAddress),1),e("p",Ce," 规划路线："+a((O=(M=(L=s(o))==null?void 0:L.hospitalInfo)==null?void 0:M.hospital)==null?void 0:O.route),1),e("p",Re," 退号时间：就诊前一工作日"+a((U=(Q=(P=(G=s(o))==null?void 0:G.hospitalInfo)==null?void 0:P.hospital)==null?void 0:Q.bookingRule)==null?void 0:U.quitTime)+"前取消 ",1),e("div",xe,[He,(l(!0),n(m,null,v((Y=(X=(W=s(o))==null?void 0:W.hospitalInfo)==null?void 0:X.bookingRule)==null?void 0:Y.rule,(le,Z)=>(l(),n("p",{key:Z},a(Z+1)+". "+a(le),1))),128))])])]}),_:1},8,["hosname","hostype","img"]),e("div",Ne,[e("div",Ve,[e("ul",null,[(l(!0),n(m,null,v(s(o).hospitalDepartment,(t,c)=>(l(),n("li",{key:t.depcode,class:re({active:c===k.value}),onClick:f=>te(c)},a(t.depname),11,qe))),128))])]),e("div",{ref_key:"dep",ref:I,class:"right-dep",onScroll:r[0]||(r[0]=(...t)=>s(b)&&s(b)(...t))},[e("div",we,[(l(!0),n(m,null,v(s(o).hospitalDepartment,t=>(l(),n("div",{ref_for:!0,ref_key:"subdep",ref:_,class:"subdep",key:t.depcode},[e("h4",null,a(t.depname),1),t.children&&t.children.length>0?(l(),n("ul",Ae,[(l(!0),n(m,null,v(t.children,c=>(l(),n("li",{key:c.depcode,onClick:f=>ae(c)},a(c.depname),9,Be))),128))])):de("",!0)]))),128))])],544)])])}}});const Le=_e(Fe,[["__scopeId","data-v-81c324b8"]]);export{Le as default};
