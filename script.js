/*
Author: Daniel Rosel
Date: 3/6/2020
*/
const table = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', ' ']
function encrypt(message,key) {
    console.warn("ENCRYPTING: " + message)
    message=message.toLocaleLowerCase()
    var res = []
    const bias = key
    var wl = []
    key = key.toString()
    var keyMIN = 0
    for (n=0;n<key.length;n++) {                     // min key gen
        for (o=0;o<key.length;o++) { // multi ops
            wl.push(parseInt(key.charAt(o))*parseInt(key.charAt(keyMIN)))
            wl.push(key*parseInt(key.charAt(keyMIN)))
        }
        keyMIN++
    }
    const weights = [] 
    for (x=0;x<message.length;x++) { //create weights            
        weights.push(wl[x]) 
    }
    //console.log(weights, bias)
    for (c in message) {
        res.push(table.indexOf(message[c])*weights[c]+bias)
    }
    res.push(parseInt(key))
    return btoa(res)
}
function decrypt(message) {
    console.warn("DECRYPTING")
    tdc = message
    tdc[tdc.length-1]
    var chars = []
    for (pos=0;pos<tdc.length-1;pos++) {
        chars.push(tdc[pos]-tdc[tdc.length-1])
    }
    var wl = []
    var key = tdc[tdc.length-1].toString()
    var keyMIN = 0
    for (n=0;n<key.length;n++) {                     // min key gen
        for (o=0;o<key.length;o++) { // multi ops
            wl.push(parseInt(key.charAt(o))*parseInt(key.charAt(keyMIN)))
            wl.push(key*parseInt(key.charAt(keyMIN)))
        }
        keyMIN++
    }
    let res = []    
    for (ch=0;ch<tdc.length-1;ch++) {
        res.push(table[chars[ch]/wl[ch]])
    }
    return res.join("")
}