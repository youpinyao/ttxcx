var global=require("./_global.js"),macrotask=require("./_task.js").set,Observer=global.MutationObserver||global.WebKitMutationObserver,process=global.process,Promise=global.Promise,isNode="process"==require("./_cof.js")(process);module.exports=function(){var e,r,o,s=function(){var s,t;for(isNode&&(s=process.domain)&&s.exit();e;){t=e.fn,e=e.next;try{t()}catch(s){throw e?o():r=void 0,s}}r=void 0,s&&s.enter()};if(isNode)o=function(){process.nextTick(s)};else if(Observer){var t=!0,a=document.createTextNode("");new Observer(s).observe(a,{characterData:!0}),o=function(){a.data=t=!t}}else{o=function(){macrotask.call(global,s)}}return function(s){var t={fn:s,next:void 0};r&&(r.next=t),e||(e=t,o()),r=t}};