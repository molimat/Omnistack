import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import Login from "./pages/Login";
import Timeline from "./pages/Timeline";
import New from "./pages/New";

const Routes = createAppContainer(
  createSwitchNavigator({
    //Esse switch navigator impede o swap entre as pages, ou seja, você nao pode ficar indo e voltando através destas paginas. O botão voltar fica inativo.
    Login,
    App: createStackNavigator({ Timeline, New }) //isso vai criar um menu superior
  })
);

export default Routes;
