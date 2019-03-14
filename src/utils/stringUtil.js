export function decamelize(str, separator){
	separator = typeof separator === 'undefined' ? '_' : separator;
	let res = str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
        return res.charAt(0).toUpperCase() + res.slice(1);
}