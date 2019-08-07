import React, { PureComponent } from 'react';
import { View,  Image } from 'react-native';


export default class ImageGridItem extends PureComponent {
    constructor(props) {
        super(props);

        console.log()
    }

    render() {
        return (
            <View style={this.props.style}>
                <Image
                    source={{ uri: `${this.props.item.thumbnailUrl}?w=${ this.props.width * 2 }&buster=${Math.random()}` }}
                    style={{ width: this.props.width, height: this.props.width }}
                    resizeMode="cover"
                />
            </View>
        );
    }
}
