import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import SearchSuggest from './SearchSuggest'
import ReactSwitch from './ReactSwitch'
import {FaBookmark, FaRegBookmark} from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
import {Link} from "react-router-dom";

class MyNavbar extends React.Component {
  constructor()
  {
    super()

    this.state={
      favoritesBookMarkClicked:false
    }
    this.handleFavoritesBookmark=this.handleFavoritesBookmark.bind(this)
  }

  handleFavoritesBookmark()
  {
    this.setState(previousState=>{
      return {
        favoritesBookMarkClicked:!previousState.favoritesBookMarkClicked  
      }
    })
  }
  render()
  {
    let navSwitch
    if(this.props.navSwitchHidden==false)
    {
      navSwitch=<ReactSwitch handleSwitchStateChange={this.props.handleSwitchStateChange}/>
    }
    else
    {
      navSwitch=<div></div>
    }
    let favoritesBookmark=this.state.favoritesBookMarkClicked==false ? <a data-place="bottom" data-tip='Bookmark' data-for="favorites"><FaRegBookmark style={{color:"white"}} onClick={this.handleFavoritesBookmark}></FaRegBookmark></a> : <a data-place="bottom" data-tip='Bookmark' data-for="favorites"><FaBookmark style={{color:"white"}} onClick={this.handleFavoritesBookmark}></FaBookmark></a>
    return (
      <Navbar className="mycustom-gradientblue" bg="dark" expand="lg" variant="dark">
        <SearchSuggest navSwitchHiderFunction={this.props.navSwitchHiderFunction}/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">    
            <Nav.Link as={Link} to="/#/" href="/#/">Home</Nav.Link>
            <Nav.Link as={Link} to="/#/world" href="/#/world">World</Nav.Link>
            <Nav.Link as={Link} to="/#/politics" href="/#/politics">Politics</Nav.Link>
            <Nav.Link as={Link} to="/#/business" href="/#/business">Business</Nav.Link>
            <Nav.Link as={Link} to="/#/technology" href="/#/technology">Technology</Nav.Link>
            <Nav.Link as={Link} to="/#/sports" href="/#/sports">Sports</Nav.Link>
          </Nav>
          {favoritesBookmark}
          <ReactTooltip id="favorites"/>
          {navSwitch}
          
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default MyNavbar