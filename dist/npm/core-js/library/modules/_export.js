var global=require("./_global.js"),core=require("./_core.js"),ctx=require("./_ctx.js"),hide=require("./_hide.js"),PROTOTYPE="prototype",$export=function(e,r,t){var o,n,p,i=e&$export.F,x=e&$export.G,c=e&$export.S,l=e&$export.P,u=e&$export.B,a=e&$export.W,$=x?core:core[r]||(core[r]={}),s=$[PROTOTYPE],P=x?global:c?global[r]:(global[r]||{})[PROTOTYPE];x&&(t=r);for(o in t)(n=!i&&P&&void 0!==P[o])&&o in $||(p=n?P[o]:t[o],$[o]=x&&"function"!=typeof P[o]?t[o]:u&&n?ctx(p,global):a&&P[o]==p?function(e){var r=function(r,t,o){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(r);case 2:return new e(r,t)}return new e(r,t,o)}return e.apply(this,arguments)};return r[PROTOTYPE]=e[PROTOTYPE],r}(p):l&&"function"==typeof p?ctx(Function.call,p):p,l&&(($.virtual||($.virtual={}))[o]=p,e&$export.R&&s&&!s[o]&&hide(s,o,p)))};$export.F=1,$export.G=2,$export.S=4,$export.P=8,$export.B=16,$export.W=32,$export.U=64,$export.R=128,module.exports=$export;