import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Dashboard from '@material-ui/icons/Dashboard';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import MapIcon from '@material-ui/icons/Map';
import MenuIcon from '@material-ui/icons/Menu';
import TimelineIcon from '@material-ui/icons/Timeline';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducers';
import { ASIDE_WIDTH } from '../../../constants';
import styles from '../jss/material-dashboard-react/components/headerStyle.js';
import { some } from '/imports/ui/constants';
import { goToAction } from '/imports/ui/modules/common/redux/reducer';

const useStyles = makeStyles((theme) => ({
  ...styles,
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${ASIDE_WIDTH}px)`,
    marginLeft: ASIDE_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: ASIDE_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: ASIDE_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -ASIDE_WIDTH,
    marginTop: 60,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props: any) {
  const { routes, open, setOpen } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getMenuIcon = (iconName: string) => {
    switch (iconName) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <MapIcon />;
      case 'timeLine':
        return <TimelineIcon />;
      case 'library':
        return <LibraryBooks />;
    }
  };

  const switchRoutes = (
    <Switch>
      {routes?.map((elm: some, index: number) => {
        return <Route path={elm?.layout + elm?.path} component={elm?.component} key={index} />;
      })}
      <Redirect from="/admin" to="/admin/dashboard" />
    </Switch>
  );

  var links = (
    <List>
      {routes.map((elm: any, index: number) => {
        return !elm.hidden ? (
          <Fragment key={index}>
            <ListItem
              button
              onClick={() => dispatch(goToAction({ pathname: '/admin' + elm.path }))}
            >
              {getMenuIcon(elm.iconName)}
              <ListItemText primary={elm.name} style={{ marginLeft: 5 }} />
            </ListItem>
          </Fragment>
        ) : null;
      })}
    </List>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            APOM
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {links}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div>
          <div>{switchRoutes}</div>
        </div>
      </main>
    </div>
  );
}