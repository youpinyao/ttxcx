var core=require("./../../modules/_core.js"),$JSON=core.JSON||(core.JSON={stringify:JSON.stringify});module.exports=function(r){return $JSON.stringify.apply($JSON,arguments)};