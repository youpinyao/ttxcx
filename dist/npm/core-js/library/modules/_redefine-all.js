var hide=require("./_hide.js");module.exports=function(e,r,i){for(var d in r)i&&e[d]?e[d]=r[d]:hide(e,d,r[d]);return e};