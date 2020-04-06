import React from 'react';
import './App.css'
import MyNavbar from './components/MyNavbar'
import Home from "./components/Home"
import MySearchPage from "./components/MySearchPage"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';

import MyCardDetailedPage from './components/MyCardDetailedPage'

class App extends React.Component
{

  constructor(){
    super()
    //Initial value of my state
    this.state={
      allCards:[],
      newsBrand:"",
      switchHidden:false
    }

    this.handleSwitchStateChange=this.handleSwitchStateChange.bind(this)
    this.hideSwitch=this.hideSwitch.bind(this)
    this.showSwitch=this.showSwitch.bind(this)
  }

  componentDidMount()
  {
    localStorage.setItem('switchChangedStatus',"unchanged")
  }

  handleSwitchStateChange() {
    if (localStorage.getItem('switchCheckedStatus')=="checked") 
    {
      if(this.state.newsBrand!="Guardian")
      {
          this.setState({
            newsBrand:"Guardian"
          })
      }
    }
    else if(localStorage.getItem('switchCheckedStatus')=="unchecked")
    {
      if(this.state.newsBrand!="NYTimes")
      {
          this.setState({
            newsBrand:"NYTimes"
          })
      }
    }
  }

  hideSwitch()
  {
    this.setState({
      switchHidden:true
    })
  }

  showSwitch()
  {
    this.setState({
      switchHidden:false
    })
  }

  render()
  { 
    return(

      <div>
        <MyNavbar navSwitchHiderFunction={this.hideSwitch} navSwitchHidden={this.state.switchHidden} handleSwitchStateChange={this.handleSwitchStateChange}/>
        <Switch>
          {/* <Route path="/" render={(props) => <Home {...props} p={localStorage.getItem('switchChangedStatus')} />} exact /> */}
          <Route path="/" render={(props) => <Home {...props} navSwitchShowFunction={this.showSwitch}/>} exact/>
          {/* <Route exact path="/article" component={MyCardDetailedPage}/> */}
          <Route path="/article" render={(props) => <MyCardDetailedPage {...props} navSwitchHiderFunction={this.hideSwitch}/>}/>
          <Route path="/search" component={MySearchPage}/>
        </Switch>
      </div>
    )
  }
}

export default App;