global.tokens = {};

global.tokens.csiga = ["biga"];
global.tokens.valami = ["valawhat"];

/*Object.entries(global.tokens).forEach(entry => {
    let key = entry[0];
    if (key == "csiga"){
        console.log(entry[1]);
    }else{
        console.log("nope");
    }

}) */

for (const key in global.tokens) {
 //  let value = global.tokens[key];
    console.log(global.tokens[key] + '=' + key);

}


//console.log(global.tokens);