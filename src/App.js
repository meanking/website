import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/style.css';
import './App.css';
import Team from './webpages/components/team';
import Roadmap from './webpages/components/roadmap';
import AppContainer from './webpages/components/appContainer';
import homepage from './webpages/homepage';
import stakedrop from './webpages/components/stakedrop';
import participate from './webpages/components/participate';
import KavaParticipate from './webpages/components/kavaParticipate';
import Footer from './webpages/components/footer';
// import InfoPdf from './webpages/components/pdf';


class App extends Component {
  

  render() {
    const routes = (
      <Switch>
        <Route exact path="/" component={homepage} />
            <Route path="/team" component={Team} />
            <Route path="/roadmap" component={Roadmap} />
            <Route path="/app" component={AppContainer} />
            <Route path="/stakedrop" component={stakedrop} />
            <Route path="/StakeDropCosmos" component={participate} />
            <Route path="/StakeDropKava" component={KavaParticipate} />
            
      </Switch>)
    return (
      <div className={window.location.pathname ?
        window.location.pathname.split('/')[1] :
        'App'}>
                   {routes}
                   <Footer />
        </div>
    );
  }
}

export default App;
