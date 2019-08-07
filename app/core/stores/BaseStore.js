import AppStore from './AppStore';

class BaseStores {
    constructor() {
        this.appStore = new AppStore();
    }
};

export default new BaseStores();