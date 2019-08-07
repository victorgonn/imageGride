import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from '../../view/home/Home';

const Routes = createStackNavigator(
    {
        home: {
            screen: Home,
        }
    },
    {
        headerMode: 'none',
    }
);

export default createAppContainer(Routes);
