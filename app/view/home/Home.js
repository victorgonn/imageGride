import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {Dimensions, FlatList, StyleSheet, View, Image, Modal, TouchableOpacity, Text} from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';

//region Controle de Renderizacao por Tamanho de Tela
const { width, height } = Dimensions.get('window');
//endregion

const numColumns = 3;

@inject("appStore")
@observer
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.controller  = this.props.appStore;
    }

    componentDidMount() {
        this.controller.loadItens();
    }

    renderLoading(){
        return(
            <Container>
                <Header />
                <Content>
                    <Spinner color='red' />
                </Content>
            </Container>
        );
    }

    loadNewItens =  () => {
        this.controller.loadListItens()
    }

    renderItem = ({ item, index }) => {
        const imgUrl = item.thumbnailUrl ? item.thumbnailUrl : item.url;
        const size = width / numColumns
        return (
            <View
                style={styles.item}
            >
                <TouchableOpacity
                    onPress={() => {
                        this.controller.selectItem(item);
                    }}>
                    <Image
                        source={{ uri: imgUrl +`?w=${ this.props.width * 2 }&buster=${Math.random()}` }}
                        style={{ width: size, height: size }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
        );
    };

    renderModal(){
        if(this.controller.selectedItem != null) {
            return(
                <Modal
                    transparent={false}
                    animationType={'fade'}
                    visible={this.controller.selectedItem != null}
                    onRequestClose={() => {
                        this.controller.closeModal();
                    }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.modelStyle}
                        onPress={() => {
                            this.controller.closeModal();
                        }}>
                        <Text style= {{marginTop:30}}>{this.controller.selectedItem.title}</Text>
                        <Image
                            style={styles.fullImageStyle}
                            source={{ uri: this.controller.selectedItem.url }}
                        />
                    </TouchableOpacity>
                </Modal>
            );
        }
        return null;
    }

    renderList(){
        return(
            <View style={{flex: 1, height: height}}>
                {this.renderModal()}
                <FlatList
                    initialNumToRender={21}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.controller.lstImages.slice()}
                    style={styles.container}
                    bounces={false}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                    onEndReached={this.loadNewItens}
                    onEndReachedThreshold={0.01}
                />
            </View>
        );
    }

    render() {
        if(this.controller.isloading) {
            return this.renderLoading();
        }
        else{
            return this.renderList();
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        backgroundColor: '#989796',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain',
    },
    modelStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    closeButtonStyle: {
        width: 25,
        height: 25,
        top: 9,
        right: 9,
        position: 'absolute',
    },
});
