import React from 'react';
import {name as appName} from './app.json';
import { AppRegistry, View } from 'react-native';
import { Root } from "native-base";
import { Provider } from 'mobx-react'
import Stores from './app/core/stores/BaseStore';
import Routes from './app/core/routes/Routes';

const ProviderConfigured = () => (
    <Provider {...Stores}>
        <View style={{ flex: 1 }}>
            <Root>
                <Routes />
            </Root>
        </View>
    </Provider>
);

AppRegistry.registerComponent(appName, () => ProviderConfigured);
