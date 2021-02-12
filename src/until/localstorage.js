export default {
    set: (name, object) => {
        localStorage.setItem(name, JSON.stringify(object));
    },
    get: (name) => {
        return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : false;
    },
    clear: () => {
        localStorage.clear();
    },
    remove: (name) => {
        localStorage.removeItem(name);
    }
};
