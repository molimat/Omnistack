import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Timeline from "./pages/Timeline";

class App extends Component {
  render() {
    return (
      //o metodo exact força que a page tenha somente aquela rota, isso evita o padrao de comeca com. Por exemplo, /timeline começa com / e isso faz com que possa abrir paginas erradas.
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
