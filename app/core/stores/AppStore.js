import { observable } from 'mobx';
import { getImageList } from '../service/Services';
import { Toast } from 'native-base';

export default class AppStore {
    @observable lstAllImages;
    @observable lstImages;
    @observable isloading;
    @observable itensCount;
    @observable currentLoadedCount;
    @observable selectedItem;

    constructor() {
        this.lstAllImages = [];
        this.lstImages = [];
        this.isloading = false;
        this.itensCount = 21
        this.currentLoadedCount = 0;
        this.selectedItem = null;
    }

    loadItens(){
        this.isloading = true;
        getImageList().then((result) => {
            this.lstAllImages = result.data;
            this.itensCount =  this.lstAllImages.length;
            this.updateCountItensPerPage()
            this.lstImages = this.lstAllImages.slice(0,21);
            this.currentLoadedCount = this.itensCount;
            this.isloading = false;
        }).catch((error) => {
            this.isloading = false;
            Toast.show({
                text: "Deu ruim",
                buttonText: "Okay",
                position: "top",
                type: "danger"
            });
        })
    }

    updateCountItensPerPage(){
        if(this.lstAllImages.length < 20)  this.itensCount = this.lstAllImages.length
    }

    loadListItens(){
      if(this.currentLoadedCount < this.lstAllImages.length){
            this.lstImages =  this.lstImages.concat(this.lstAllImages.slice(0,21));
        }
        else{
            this.lstImages =  this.lstImages.concat(this.lstAllImages.slice(0,this.lstAllImages.length));
        }
    }

    selectItem(item){
        this.selectedItem = item;
    }

    closeModal(){
        this.selectedItem = null
    }

}
