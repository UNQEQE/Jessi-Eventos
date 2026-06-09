export const CryptoUtils = {
  genKey() {
    const arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    return btoa(String.fromCharCode(...arr));
  },

  encrypt(text, key) {
    const k = atob(key);
    let out = '';
    for (let i = 0; i < text.length; i++) {
      out += String.fromCharCode(text.charCodeAt(i) ^ k.charCodeAt(i % k.length));
    }
    const ts = Date.now().toString(36);
    return btoa(ts + '|' + out);
  },

  decrypt(token, key) {
    try {
      const k = atob(key);
      const raw = atob(token);
      const sep = raw.indexOf('|');
      const enc = raw.slice(sep + 1);
      let out = '';
      for (let i = 0; i < enc.length; i++) {
        out += String.fromCharCode(enc.charCodeAt(i) ^ k.charCodeAt(i % k.length));
      }
      return out;
    } catch {
      return null;
    }
  },
};
