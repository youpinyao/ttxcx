var isObject=require("./_is-object.js"),anObject=require("./_an-object.js"),check=function(t,e){if(anObject(t),!isObject(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};module.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,c){try{c=require("./_ctx.js")(Function.call,require("./_object-gopd.js").f(Object.prototype,"__proto__").set,2),c(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,r){return check(t,r),e?t.__proto__=r:c(t,r),t}}({},!1):void 0),check:check};