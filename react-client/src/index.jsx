import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import LoginD from './components/LoginD.jsx';
import Home from './components/Home.jsx';
import Create from './components/Create.jsx';
import Profile from './components/Profile.jsx';
import ShowItem from './components/ItemsShow.jsx';
import AddItems from './components/AddItems.jsx';
import Messages from './components/Messages.jsx';
import {Nav, Navbar, NavItem, MenuItem, NavDropdown, browserHistory} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      user:[]
    }
    this.loginAuthen = this.loginAuthen.bind(this);
  }

  componentDidMount() {
    var that = this;
    $.ajax({
      url: '/loginAuth',
      method: 'GET',
    })
    .done (function (data) {
      that.setState({
        user: data
      });
    })
    .fail(function( jqXHR, textStatus ) {
      alert( "No login seassion found");
    });
  }

  loginAuthen(obj) {
    var that = this;
    $.ajax({
      url: '/login',
      method: 'POST',
      data: obj
    })
    .done (function (data) {
      alert('Login successfully');
      that.setState({
        user: data
      });
    })
    .fail(function( jqXHR, textStatus ) {
      alert( "Wrong Login information, please check your username & password ");
    });
  }

  render () {
    return (
    <Router history={browserHistory}>
      <div className="container-fluid">
        <Navbar bsStyle='inverse' collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              Give & Take
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/">
                Home
              </NavItem>
              <NavItem eventKey={2} >
                <Link to="/AllItems">All items</Link>
              </NavItem>
              <NavItem eventKey={2} >
                <Link to="/AddItem">Add item</Link>
              </NavItem>
              <NavItem eventKey={2} >
                <Link to="/SendMessage">Send Message</Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={3} title="User Menu" id="dropdown">
                <MenuItem eventKey={3.1}><Link to="/login">Login</Link></MenuItem>
                <MenuItem eventKey={3.2}><Link to="/profile">Profile</Link></MenuItem>
                <MenuItem eventKey={3.3}><Link to="/create">Create Account</Link></MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3} href="/logout">Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" render={()=><Home user={this.state.user}/>}/>
        <Route path="/login" render={()=><LoginD loginAuthen={this.loginAuthen}/>}/>
        <Route path="/create" render={()=><Create />}/>
        <Route path="/addItem" render={()=><AddItems />}/>
        <Route path="/AllItems" render={()=><ShowItem />}/>
        <Route path="/SendMessage" render={()=><Messages username={this.state.user.username}/>}/>
        <Route path="/profile" render={()=><Profile username={this.state.user.username}/>}/>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));