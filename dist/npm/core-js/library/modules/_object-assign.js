"use strict";var getKeys=require("./_object-keys.js"),gOPS=require("./_object-gops.js"),pIE=require("./_object-pie.js"),toObject=require("./_to-object.js"),IObject=require("./_iobject.js"),$assign=Object.assign;module.exports=!$assign||require("./_fails.js")(function(){var e={},s={},t=Symbol(),r="abcdefghijklmnopqrst";return e[t]=7,r.split("").forEach(function(e){s[e]=e}),7!=$assign({},e)[t]||Object.keys($assign({},s)).join("")!=r})?function(e,s){for(var t=toObject(e),r=arguments.length,i=1,o=gOPS.f,c=pIE.f;r>i;)for(var j,n=IObject(arguments[i++]),a=o?getKeys(n).concat(o(n)):getKeys(n),g=a.length,b=0;g>b;)c.call(n,j=a[b++])&&(t[j]=n[j]);return t}:$assign;