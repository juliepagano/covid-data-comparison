(this["webpackJsonpcovid-data-comparison"]=this["webpackJsonpcovid-data-comparison"]||[]).push([[0],{52:function(e,a,t){},72:function(e,a,t){},73:function(e,a,t){},74:function(e,a,t){},77:function(e,a,t){},85:function(e,a,t){},86:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t(0),c=t.n(r),i=t(45),s=t.n(i),o=(t(52),t(22)),l=t(5),u=t(21),h=t(7),d=t.n(h),p=t(13),v=t(16),b=t(14),f=t(8),m=t(25),j=t.n(m),w=t(33),O=t(34),g="https://api.covidtracking.com/v2beta";function y(e){return k.apply(this,arguments)}function k(){return(k=Object(b.a)(d.a.mark((function e(a){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(w.a)(a,"yyyy-MM-dd"),e.abrupt("return",j.a.get("".concat(g,"/us/daily/").concat(t,".json")));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(){return x.apply(this,arguments)}function x(){return(x=Object(b.a)(d.a.mark((function e(){var a,t,n,r,c,i,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Date,e.prev=1,e.next=4,y(n);case 4:r=e.sent,e.next=18;break;case 7:if(e.prev=7,e.t0=e.catch(1),404!==(null===e.t0||void 0===e.t0||null===(c=e.t0.response)||void 0===c?void 0:c.status)){e.next=18;break}return e.prev=10,e.next=13,y(Object(O.a)(n,1));case 13:r=e.sent,e.next=18;break;case 16:e.prev=16,e.t1=e.catch(10);case 18:if(!(null===(a=r)||void 0===a||null===(t=a.data)||void 0===t?void 0:t.data)){e.next=20;break}return e.abrupt("return",null===(i=r)||void 0===i||null===(s=i.data)||void 0===s?void 0:s.data);case 20:throw new Error("Unable to load latest US data.");case 21:case"end":return e.stop()}}),e,null,[[1,7],[10,16]])})))).apply(this,arguments)}function S(e,a){return C.apply(this,arguments)}function C(){return(C=Object(b.a)(d.a.mark((function e(a,t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(w.a)(t,"yyyy-MM-dd"),e.abrupt("return",j.a.get("".concat(g,"/states/").concat(a.toLowerCase(),"/").concat(n,".json")));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e){return A.apply(this,arguments)}function A(){return(A=Object(b.a)(d.a.mark((function e(a){var t,n,r,c,i,s,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new Date,e.prev=1,e.next=4,S(a,r);case 4:c=e.sent,e.next=18;break;case 7:if(e.prev=7,e.t0=e.catch(1),404!==(null===e.t0||void 0===e.t0||null===(i=e.t0.response)||void 0===i?void 0:i.status)){e.next=18;break}return e.prev=10,e.next=13,S(a,Object(O.a)(r,1));case 13:c=e.sent,e.next=18;break;case 16:e.prev=16,e.t1=e.catch(10);case 18:if(!(null===(t=c)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.data)){e.next=20;break}return e.abrupt("return",null===(s=c)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.data);case 20:throw new Error("Unable to load latest ".concat(a," data."));case 21:case"end":return e.stop()}}),e,null,[[1,7],[10,16]])})))).apply(this,arguments)}function U(){return E.apply(this,arguments)}function E(){return(E=Object(b.a)(d.a.mark((function e(){var a,t,n,r,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.get("".concat(g,"/states.json"));case 3:n=e.sent,e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:if(!(null===(a=n)||void 0===a||null===(t=a.data)||void 0===t?void 0:t.data)){e.next=10;break}return e.abrupt("return",null===(r=n)||void 0===r||null===(c=r.data)||void 0===c?void 0:c.data);case 10:throw new Error("Unable to load state metadata.");case 11:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}var D=t(29),N=t.n(D),I=t(24),M=t(19),W=t.n(M),H=(t(72),Math.pow(5,2)),P=Math.pow(2,2)*H;var V=function(e){var a,t,c=e.label,i=e.value,s=e.source,o=e.scaleValue,l=e.color,u=e.highlight,h=e.minWidth,d=void 0===h?250:h,p=e.maxWidth,v=void 0===p?500:p,b=e.layout,m=void 0===b?"stack":b,j=Math.ceil(i/o),w=Math.floor((v-2+12)/122),O=Math.ceil(j/P),g=Math.min(w,O),y=Math.ceil(O/g),k=0,_=0,x=function(e,a,t,c){return Object(f.a)(Array(5)).map((function(i,s){var o=a+11*s;return Object(f.a)(Array(5)).map((function(a,i){var u=e+11*i,h=t+5*s+i;return h>=c?null:(k=Math.max(o+8+1,k),_=Math.max(u+8+1,_),Object(n.jsx)(r.Fragment,{children:Object(n.jsx)("rect",{fill:l,fillOpacity:.5,stroke:"#000",strokeWidth:1,width:8,height:8,x:u,y:o,"data-box-key":h})},h))}))}))},S=function(e,a,t,c){return Object(f.a)(Array(2)).map((function(i,s){var o=a+58*s;return Object(f.a)(Array(2)).map((function(a,i){var l=e+58*i,u=t+(2*s+i)*H;return u>=c?null:Object(n.jsx)(r.Fragment,{children:x(l,o,u,c)},u)}))}))},C=(a=1,t=1,Object(f.a)(Array(y)).map((function(e,c){var i=t+122*c;return Object(f.a)(Array(g)).map((function(e,t){var s=a+122*t,o=(c*g+t)*P;return o>=j?null:Object(n.jsx)(r.Fragment,{children:S(s,i,o,j)},o)}))})));return Object(n.jsxs)("figure",{className:W()("SquareChart",Object(I.a)({},m,m)),style:{minWidth:d},children:[c&&Object(n.jsxs)("figcaption",{children:[Object(n.jsx)("span",{className:W()({highlight:u}),children:c})," ",s&&Object(n.jsxs)("span",{className:"SquareChart-source",children:["[",Object(n.jsx)("a",{href:s,children:"source"}),"]"]})]}),Object(n.jsx)("svg",{width:_,height:k,children:C})]})},F=t(30),L=t.n(F),R=(t(73),function(e){var a=e.entries,t=e.scale,r=e.color,c=e.prevScale;return Object(n.jsxs)("section",{className:"ScaleChart",children:[function(){var e=Object(n.jsx)("div",{className:"equals",children:"="}),a=Object(n.jsxs)("div",{className:W()("value",{hasPrev:c}),children:["(",L()(t).format({thousandSeparated:!0,mantissa:0})," ","deaths)"]}),i=Object(n.jsx)(V,{layout:"inline",scaleValue:t,value:t,color:r,minWidth:0});return c?Object(n.jsxs)("div",{className:"Legend",children:[c&&Object(n.jsx)(V,{layout:"inline",scaleValue:c.scale,value:t,color:c.color,minWidth:0}),e,i,a]}):Object(n.jsxs)("div",{className:"Legend",children:[i,e,a]})}(),a.map((function(e){var a=e.label,c=e.isCovid,i=(e.dataType,e.value),s=Object(v.a)(e,["label","isCovid","dataType","value"]),o=L()(i).format({thousandSeparated:!0,mantissa:0});return Object(n.jsx)(V,Object(p.a)({label:"".concat(a," (").concat(o,")"),value:i,scaleValue:t,color:r,highlight:c},s),a)}))]})}),q=(t(74),function(e){var a,t=e.chartScales;return Object(n.jsx)("div",{className:"DataCharts",children:t.map((function(e){var t=e.color,r=e.scale,c=e.entries;if(!c.length)return null;var i=Object(n.jsx)(R,{color:t,scale:r,entries:c,prevScale:a},r);return a={color:t,scale:r},i}))})}),K=[{label:"US motor vehicle traffic deaths in 2019",value:37595,source:"https://www.cdc.gov/nchs/fastats/accidental-injury.htm"},{label:"Deaths from flu and pneumonia in 2019",value:49783,source:"https://www.cdc.gov/nchs/fastats/flu.htm"},{label:"Deaths from homicide in 2019",value:19141,source:"https://www.cdc.gov/nchs/fastats/homicide.htm"},{label:"Unintentional injury deaths in 2019",value:173040,source:"https://www.cdc.gov/nchs/fastats/accidental-injury.htm"},{label:"Deaths from heart disease in 2019",value:659041,source:"https://www.cdc.gov/nchs/fastats/deaths.htm"},{label:"Deaths from cancer in 2019",value:599601,source:"https://www.cdc.gov/nchs/fastats/deaths.htm"},{label:"Total deaths in 2019",value:2854838,source:"https://www.cdc.gov/nchs/fastats/deaths.htm"}],B=[{label:"HIV/AIDS in the US as of 2018",value:7e5,source:"https://www.kff.org/"},{label:"1918 Spanish Flu in the US",value:675e3,source:"https://www.cdc.gov/flu/pandemic-resources/1918-pandemic-h1n1.html"},{label:"1968 Pandemic (H3N2 virus) in the US",value:1e5,source:"https://www.cdc.gov/flu/pandemic-resources/1968-pandemic.html"},{label:"1957-1958 Pandemic (H2N2 virus) in the US",value:116e3,source:"https://www.cdc.gov/flu/pandemic-resources/1968-pandemic.html"},{label:"2009 H1N1 Pandemic in the US",value:12469,source:"https://www.cdc.gov/flu/pandemic-resources/2009-h1n1-pandemic.html"}],J=[{label:"US Covid Data",name:"showUS",dataType:"US_COVID"},{label:"State Covid Data",name:"showStates",dataType:"STATE_COVID"},{label:"Annual US Death Stats",name:"showAnnualDeaths",dataType:"ANNUAL_DEATH_STATS"},{label:"Other Pandemics",name:"showPandemics",dataType:"OTHER_PANDEMICS"},{label:"Wars and Military",name:"showWars",dataType:"WARS"},{label:"Natural Disasters",name:"showNaturalDisasters",dataType:"NATURAL_DISASTERS"},{label:"Terrorism and other acts of violence",name:"showViolence",dataType:"VIOLENCE"}],Q=[{label:"9/11",value:2977,source:"https://en.wikipedia.org/wiki/September_11_attacks"},{label:"Jonestown",value:918,source:"https://en.wikipedia.org/wiki/Jonestown"},{label:"Columbine",value:15,source:"https://en.wikipedia.org/wiki/Columbine_High_School_massacre"},{label:"Waco siege",value:86,source:"https://en.wikipedia.org/wiki/List_of_disasters_in_the_United_States_by_death_toll"},{label:"Oklahoma City Bombings",value:168,source:"https://en.wikipedia.org/wiki/Oklahoma_City_bombing"},{label:"2017 Las Vegas shooting",value:60,source:"https://en.wikipedia.org/wiki/2017_Las_Vegas_shooting#Fatalities"},{label:"Triangle Shirtwaist Factory fire",value:146,source:"https://en.wikipedia.org/wiki/Triangle_Shirtwaist_Factory_fire"}],z=[{label:"US deaths in Vietnam War",value:58209,source:"https://en.wikipedia.org/wiki/United_States_military_casualties_of_war"},{label:"US Deaths in Attack on Pearl Harbor",value:2403,source:"https://en.wikipedia.org/wiki/Attack_on_Pearl_Harbor"},{label:"US deaths in Iraq War",value:4497,source:"https://en.wikipedia.org/wiki/United_States_military_casualties_of_war"},{label:"Deaths in US Civil War",value:655e3,source:"https://en.wikipedia.org/wiki/United_States_military_casualties_of_war"},{label:"US deaths in WWII",value:405399,source:"https://en.wikipedia.org/wiki/United_States_military_casualties_of_war"},{label:"US deaths in WWI",value:116516,source:"https://en.wikipedia.org/wiki/United_States_military_casualties_of_war"}],G=[{label:"Hurricane Katrina",value:1836,source:"https://en.wikipedia.org/wiki/Hurricane_Katrina#Impact"},{label:"1995 Chicago heat wave",value:739,source:"https://en.wikipedia.org/wiki/1995_Chicago_heat_wave"},{label:"1906 San Francisco Earthquake",value:3e3,source:"https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/casualties.php"},{label:"Camp Fire in CA (2018)",value:85,source:"https://en.wikipedia.org/wiki/Camp_Fire_(2018)"}],X=[{color:"green",scale:1,entries:[]},{color:"blue",scale:10,entries:[]},{color:"orange",scale:1e3,entries:[]},{color:"black",scale:1e5,entries:[]}],Y=[{label:"Total deaths from Covid",dataKey:"outcomes.death.total.value"},{label:"Today's deaths from Covid",dataKey:"outcomes.death.total.calculated.change_from_prior_day"}],Z=Object(f.a)(X).reverse();function $(e){return Z.find((function(a){return e>=a.scale}))}var ee=function(e){var a=e.optionsConfig,t=Object(r.useState)(),c=Object(u.a)(t,2),i=c[0],s=c[1],o=Object(r.useState)(),l=Object(u.a)(o,2),h=l[0],m=l[1];return Object(r.useEffect)((function(){function e(){return(e=Object(b.a)(d.a.mark((function e(){var a,t,n,r,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=X.reduce((function(e,a){var t=a.scale;return e.set(t,[]),e}),new Map),(t=function(e,t){e.forEach((function(e){var n=e.value,r=Object(v.a)(e,["value"]);if("number"===typeof n){var c=$(n);c&&a.set(c.scale,[].concat(Object(f.a)(a.get(c.scale)),[Object(p.a)(Object(p.a)({},r),{},{value:n,isCovid:!1,dataType:t})]))}}))})(K,"ANNUAL_DEATH_STATS"),t(B,"OTHER_PANDEMICS"),t(Q,"VIOLENCE"),t(z,"WARS"),t(G,"NATURAL_DISASTERS"),e.prev=7,e.next=10,_();case 10:n=e.sent,Y.forEach((function(e){var t=e.label,r=e.dataKey,c=N()(n,r);if("number"===typeof c){var i=$(c);i&&a.set(i.scale,[].concat(Object(f.a)(a.get(i.scale)),[{label:"US: ".concat(t),value:c,isCovid:!0,dataType:"US_COVID",source:"https://covidtracking.com/"}]))}})),e.next=16;break;case 14:e.prev=14,e.t0=e.catch(7);case 16:return e.prev=16,e.next=19,U();case 19:return r=e.sent,e.next=22,Promise.all(r.map((function(e){return T(e.state_code)})));case 22:e.sent.forEach((function(e){var t=e.state;Y.forEach((function(n){var r=n.label,c=n.dataKey,i=N()(e,c);if("number"===typeof i){var s=$(i);s&&a.set(s.scale,[].concat(Object(f.a)(a.get(s.scale)),[{label:"".concat(t,": ").concat(r),value:i,isCovid:!0,dataType:"STATE_COVID",source:"https://covidtracking.com/"}]))}}))})),e.next=28;break;case 26:e.prev=26,e.t1=e.catch(16);case 28:c=X.map((function(e){var t=e.entries,n=e.scale,r=Object(v.a)(e,["entries","scale"]),c=[].concat(Object(f.a)(t),Object(f.a)(a.get(n))).sort((function(e,a){return e.value-a.value}));return Object(p.a)(Object(p.a)({},r),{},{scale:n,entries:c})})),s(c);case 30:case"end":return e.stop()}}),e,null,[[7,14],[16,26]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(r.useEffect)((function(){if(i){var e=["OTHER"];J.forEach((function(t){var n=t.name,r=t.dataType;a[n]&&e.push(r)}));var t=i.map((function(a,t){var n=a.entries,r=a.scale,c=Object(v.a)(a,["entries","scale"]),i=n.filter((function(a){var t=a.dataType,n=void 0===t?"OTHER":t;return e.includes(n)}));return Object(p.a)(Object(p.a)({},c),{},{scale:r,entries:i})}));m(t)}}),[i,a]),h?Object(n.jsx)(q,{chartScales:h}):null},ae=t(20),te=t.n(ae),ne=(t(77),function(e){var a=e.optionsConfig,t=Object(l.e)(),r=Object(l.f)();return Object(n.jsx)("header",{className:"ControlBar",children:J.map((function(e){var c=e.label,i=e.name;return Object(n.jsxs)("label",{children:[c,Object(n.jsx)("input",{type:"checkbox",name:i,checked:a[i],onChange:function(e){return function(e,a){var n=te.a.parse(r.search,{ignoreQueryPrefix:!0});n[e]=a.currentTarget.checked.toString(),t.push({pathname:r.pathname,search:te.a.stringify(n)})}(i,e)}})]},i)}))})});t(85);var re=function(){var e=Object(l.f)(),a=Object(r.useState)(),t=Object(u.a)(a,2),c=t[0],i=t[1];return Object(r.useEffect)((function(){var a=te.a.parse(e.search,{ignoreQueryPrefix:!0}),t=J.reduce((function(e,t){t.label;var n=t.name;return e[n]="true"===a[n],e}),{});i(t)}),[e]),c?Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)(ne,{optionsConfig:c}),Object(n.jsx)("div",{className:"App-content",children:Object(n.jsx)(ee,{optionsConfig:c})})]}):null},ce=function(){return Object(n.jsx)(o.a,{children:Object(n.jsx)(l.a,{path:"/",children:Object(n.jsx)(re,{})})})},ie=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,87)).then((function(a){var t=a.getCLS,n=a.getFID,r=a.getFCP,c=a.getLCP,i=a.getTTFB;t(e),n(e),r(e),c(e),i(e)}))};s.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(ce,{})}),document.getElementById("root")),ie()}},[[86,1,2]]]);
//# sourceMappingURL=main.40914712.chunk.js.map