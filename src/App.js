import React, { Component } from 'react';
import './App.css';

import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
  IconName,
  ButtonGroup,
  Popover,
  Position,
  Menu,
  MenuItem,
  MenuDivider,
  Icon,
  Tabs,
  Tab,
  Intent,
  Card,
  PopoverInteractionKind
} from "@blueprintjs/core";

import { IconNames } from '@blueprintjs/icons';
import { ICON } from '@blueprintjs/core/lib/esm/common/classes';

import Dashboard from './views/Dashboard';


const Mail = Card;

const routes = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    component: 'Dashboard'
  },
  {
    name: 'Mail',
    icon: 'envelope',
    component: 'Mail'
  },
  {
    name: 'Global Express',
    icon: 'git-repo',
    children: [{
      name: 'Dashboard',
      icon: 'dashboard',
      component: 'Dashboard'
    },
    {
      name: 'Teste',
      icon: 'selection',
      component: null
    }]
  },
  {
    name: 'Help',
    icon: 'help',
    component: null
  }
]


class App extends Component {
  state = {
    route: null,
    theme: 'light',
    sidebar: true
  }

  components = {
    'Dashboard': Dashboard,
    'Mail': Mail
  }

  toggleSidebar = () => {
    this.setState((state, props) => {
      return { ...state, sidebar: !state.sidebar }
    })
  }

  toggleTheme = () => {
    this.setState((state, props) => {
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
    })
  }

  navigateTo = (route) => {
    console.log(route);

    this.setState((state, props) => {
      return { ...state, route: route }
    })
  }

  renderRouteButton(route) {
    if (route.children) {
      return <Popover content={<Menu>{route.children.map(subroute => (
        this.state.route && this.state.route.path[0] === route && this.state.route.path[1] === subroute ?
          <MenuItem icon={subroute.icon} text={subroute.name} key={subroute.name} active shouldDismissPopover={false} /> :
          <MenuItem icon={subroute.icon} text={subroute.name} key={subroute.name} shouldDismissPopover={false} onClick={() => this.navigateTo({
            path: [route, subroute],
            component: subroute.component ? this.components[subroute.component] : null
          })}
          />
      ))}</Menu>} position={Position.RIGHT_BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
        {this.state.route && this.state.route.path[0] === route ?
          <Button key={route.name} intent={Intent.PRIMARY} icon={route.icon} text={this.state.sidebar ? route.name : null} rightIcon={this.state.sidebar ? "caret-right" : null} /> :
          <Button key={route.name} intent={Intent.NONE} icon={route.icon} text={this.state.sidebar ? route.name : null} rightIcon={this.state.sidebar ? "caret-right" : null} />
        }
      </Popover>
    }
    else
      return this.state.route && this.state.route.path[0] === route ?
        <Button key={route.name} intent={Intent.PRIMARY} icon={route.icon} text={this.state.sidebar ? route.name : null} /> :
        <Button key={route.name} intent={Intent.NONE} icon={route.icon} text={this.state.sidebar ? route.name : null} onClick={() => this.navigateTo({
          path: [route],
          component: route.component ? this.components[route.component] : null
        })} />

  }

  render() {
    const RouteComponent = this.state.route ? this.state.route.component : null;

    return (
      <div className={`App ${this.state.theme === 'dark' ? 'bp3-dark' : ''}`} >
        <header className="bp3-dark">
          <Button icon='menu' minimal onClick={this.toggleSidebar} active={this.state.sidebar} />
          <Button icon={this.state.theme === 'light' ? 'moon' : 'flash'} minimal onClick={this.toggleTheme} />

          <div className="breadcrumb">
            <span><Button icon="home" text="Home" minimal onClick={() => this.navigateTo(null)} /></span>
            {this.state.route && this.state.route.path.map(routeItem =>
              <span><Button icon={routeItem.icon} text={routeItem.name} minimal /></span>
            )}
          </div>
        </header>
        <main>
          <div className="sidebar">
            <ButtonGroup alignText={Alignment.LEFT} vertical large>
              {routes.map(route => (
                this.renderRouteButton(route)
              ))}
            </ButtonGroup>
          </div>
          <div className="content scrollable">
            {RouteComponent && <RouteComponent />}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
