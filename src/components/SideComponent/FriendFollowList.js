import React from "react";
import Loadable from 'react-loadable';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import * as COLOR from './../../api/palette'
import { Scrollbars } from "react-custom-scrollbars";

import {
  Avatar,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider
} from "@material-ui/core";

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../LabelText'),
  loading: () => null
});

import Skeleton from '@material-ui/lab/Skeleton';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 250;
const drawerHeight = '100%';

const useStyles = makeStyles(theme => ({
  root: {

  },
  drawer: {
    width: drawerWidth,
    height: drawerHeight,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    height: '90%',
    marginTop: 64
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    },
    height: '90%',
    marginTop: 64
  },
  list: {
    height: '50%',
    overflow: "auto",
    scrollbarWidth: 0
  },
  label: {
    padding: 10,
    paddingBottom: 8,
    borderBottom: `4px solid ${COLOR.primary[600]}`,
  },
  avatar: {
    fontSize: 36
  },
  avatarImage: {
    width: 36,
    height: 36,
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(750)]: {
      flexDirection: 'row',
    },
  },

}));

export default function FriendFollowList(props) {
  const classes = useStyles();
  const { API } = props
  const [ open, setOpen ] = React.useState(false);
  // friend data
  const itemFriend = [
    {
      id: 1,
      fullname: 'Sarunrat',
      lastname: 'Baifern Ong',
      picture: 'https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-1/p240x240/47242413_2244905482228034_5689942205242802176_n.jpg?_nc_cat=111&_nc_oc=AQmGtWAew68XDrs4ktro2e9bZ9fcMe8HU3GO2rC7_YUeVOq9mbqSZ84ktlZ8-BS4arM&_nc_ht=scontent.fbkk5-3.fna&oh=9bef05f9b7f5118ad4aec17338bdf01d&oe=5DD80794'
    },
    {
      id: 2,
      fullname: 'Top\'s',
      lastname: 'Phanuwat',
      picture: 'https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-1/c60.0.240.240a/p240x240/55575786_313161282735220_1719393606088785920_n.jpg?_nc_cat=109&_nc_oc=AQk69I4FtfLsKeSrjx8XBxF7zoDKmY7HI5WGepcFkaeOYz70uK_lCAn3r9UhxeU-tTE&_nc_ht=scontent.fbkk5-1.fna&oh=cd582ddb8d9ed9321973aad015016535&oe=5DC9A16C'
    },
    {
      id: 3,
      fullname: 'แกม',
      lastname: 'เบลอ',
      picture: 'https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-1/p240x240/60615243_1444593305681699_7469427063842144256_n.jpg?_nc_cat=111&_nc_oc=AQlyLPeaHNfmWebimTnykDXyBpV4_oEUZFKMRlNTk8mywgVuAkk5MPRS2UnFmjIrQhI&_nc_ht=scontent.fbkk5-3.fna&oh=fca7d0dc0f9ba2e05d106a3781fc3e8f&oe=5E01B1A5'
    },
    {
      id: 4,
      fullname: 'Khiangduen',
      lastname: 'Ponconbury',
      picture: 'https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.0-1/p240x240/25659689_2005926376352387_6849486638258396817_n.jpg?_nc_cat=104&_nc_oc=AQmnkdpwi2CcIC6Fwi6sKPEixPJqsskGz7mheWiX3CKVDJRT9iADmspSb-fKMHWI8s0&_nc_ht=scontent.fbkk5-5.fna&oh=75d910d6685e833572080161b4f04108&oe=5DD7A5CC'
    },
    {
      id: 5,
      fullname: 'Phataranitz',
      lastname: 'Sripramodya',
      picture: 'https://scontent.fbkk5-7.fna.fbcdn.net/v/t1.0-1/p240x240/53502718_10216110320462825_6436859012544724992_n.jpg?_nc_cat=108&_nc_oc=AQneU3zov7Q5p2tzrwbO5LB0jzq2t2WIKZa-AqUsQh-k3FIO0TXQvilwwQ5VGyMxkz8&_nc_ht=scontent.fbkk5-7.fna&oh=6bf30e1e00c184418914ed6116f19b3d&oe=5E13DB48'
    },
  ];

  // follow data
  const itemFollow = [
    {
      id: 1,
      name: 'LPGA',
      picture: 'https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.0-1/p160x160/13445828_10153537116465684_4688442666918657754_n.png?_nc_cat=110&_nc_oc=AQmJ6mqercK1YmlCRpSz-dUcufdW6Mqytgztq3qD73HLTFF2wKR4XgS1wvtsV7Njz7U&_nc_ht=scontent.fbkk5-4.fna&oh=b538351ec6ce10f8c5cf16a09feed5f2&oe=5E09E620'
    },
    {
      id: 2,
      name: 'PGA TOUR',
      picture: 'https://scontent.fbkk5-2.fna.fbcdn.net/v/t1.0-1/p160x160/69613851_10156096671356330_2790251909305335808_n.jpg?_nc_cat=1&_nc_oc=AQlEG5U-5YVy7mdjh_7iF2rB6Y3DT1fHNCSgWG9x0Ut7kiTbgfimuNu2I4rdKrQFals&_nc_ht=scontent.fbkk5-2.fna&oh=06bf1af2e1fd00acb528b003f4e45aa3&oe=5E002D94'
    },
    {
      id: 3,
      name: 'Chang',
      picture: 'https://scontent.fbkk5-2.fna.fbcdn.net/v/t1.0-1/p160x160/67903342_10162284471660338_4526690891972214784_n.jpg?_nc_cat=1&_nc_oc=AQn8sJANpvcG4-Kck6AgsZcH_OpvOWhxQ5ry7yEQtjhYBDoqG5HDaAfsMwbVxZaynWg&_nc_ht=scontent.fbkk5-2.fna&oh=5a508877747179856a4c4b0038fffde8&oe=5E0BC1E8'
    },
    {
      id: 4,
      name: 'KOG Diamond Cobra',
      picture: 'https://scontent.fbkk5-2.fna.fbcdn.net/v/t1.0-1/p240x240/67247706_629939414182654_8439059576371806208_n.png?_nc_cat=1&_nc_oc=AQlR4Hn5QpA5tOJPhReU486I5jl_Sn9ImHDzHzrDoJUZkMjMdsqb1I4s1TUFleAXqEg&_nc_ht=scontent.fbkk5-2.fna&oh=3908b58b2cb57c9119658756c9608725&oe=5DCE3182'
    },
    {
      id: 5,
      name: 'Garena RoV Tournament',
      picture: 'https://scontent.fbkk5-2.fna.fbcdn.net/v/t1.0-1/p240x240/67969906_663779964125451_6327388795909963776_n.jpg?_nc_cat=1&_nc_oc=AQmuZUs--B92o9h7n7GwuGFxk3tii_m6wvtH48oy9DV59lDPqYi5sjUYidGXumQ7ZHg&_nc_ht=scontent.fbkk5-2.fna&oh=cdc8f6c613fecbac0e304a569e03e177&oe=5E153D01'
    },
    {
      id: 6,
      name: 'EVOS Debut',
      picture: 'https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-1/p240x240/39522283_248289175825750_7801481499575844864_n.png?_nc_cat=109&_nc_oc=AQmFEzQobPy6TYy-Cekmb939kgIVcNbJxhcNwFHi7DqxIP5FDu-4qsIKJou6yRaXDUc&_nc_ht=scontent.fbkk5-1.fna&oh=d1e597c5b6df522c40d26c704f9a0ebe&oe=5DD748F4'
    },

  ];

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      { window.innerWidth >= 1300 ?
        <Drawer
          anchor="right"
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
          {...!/iPad|iPhone|iPod|Android/.test(navigator.userAgent)?
            {
              onMouseEnter: ()=>handleDrawerOpen(),
              onMouseLeave: ()=>handleDrawerClose(),
            } : null
          }>
          <Typography className={classes.label}>Friend</Typography>
          <List className={classes.list}>
              { false ?
                <Scrollbars autoHide>
                  {
                    itemFriend.map(item => (
                      <ListItem key={item.id} button className={classes.listItem}>
                        <ListItemAvatar>
                          {/* Change picture friend here */}
                          { item.picture ?
                            /*
                            <Avatar className={classes.avatarImage}
                              src={API._getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />*/
                            <Avatar className={classes.avatarImage}
                              src={item.picture} />
                            :
                            <AccountCircleIcon classes={{ root: classes.avatar }} />
                          }
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography className={classes.name} variant="body2">
                                {item.fullname}
                              </Typography>
                              <Typography className={classes.name} variant="body2">
                                {item.lastname}
                              </Typography>
                            </React.Fragment>
                          } />
                      </ListItem>
                    ))
                  }
                </Scrollbars>
                :
                Array.from(new Array(3)).map((item, i) => (
                  <ListItem key={i} className={classes.listItem}>
                    <Skeleton variant="circle" width={36} height={36} />
                    { open && <Skeleton style={{ marginLeft: 16 }} width="80%"/>}
                  </ListItem>
                ))
              }
          </List>
          <Divider />
          <Typography className={classes.label}>Follow</Typography>
          <List className={classes.list}>
            { false ?
              <Scrollbars autoHide>
                {itemFollow.map(item => (
                  <ListItem key={item.id} button
                    className={classes.listItem}
                    style={{ paddingTop: 12, paddingBottom: 12 }}>
                    <ListItemAvatar>
                      {/* Change picture follow here */}
                      { item.picture ?
                        /*
                        <Avatar className={classes.avatarImage}
                          src={API._getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />*/
                        <Avatar className={classes.avatarImage}
                          src={item.picture} />
                        :
                        <AccountCircleIcon classes={{ root: classes.avatar }} />
                      }
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography className={classes.name} variant="body2">{item.name}</Typography>} />
                  </ListItem>
                ))}
              </Scrollbars>
              :
              Array.from(new Array(3)).map((item, i) => (
                <ListItem key={i} className={classes.listItem}>
                  <Skeleton variant="circle" width={36} height={36} />
                  { open && <Skeleton style={{ marginLeft: 16 }} width="80%"/>}
                </ListItem>
              ))
            }
          </List>
          <Divider />
        </Drawer>
        :
        <div className={classes.grid}>
          <div style={{ width: '100%' }}>
            <LabelText text="Friend" />
            <List>
              {
                Array.from(new Array(3)).map((item, i) => (
                  <ListItem key={i} className={classes.listItem}>
                    <Skeleton variant="circle" width={36} height={36} />
                    <Skeleton style={{ marginLeft: 16 }} width="80%"/>
                  </ListItem>
                ))
              }
            </List>
          </div>
          <div style={{ width: '100%' }}>
            <LabelText text="Follow" />
            <List>
              {
                Array.from(new Array(3)).map((item, i) => (
                  <ListItem key={i} className={classes.listItem}>
                    <Skeleton variant="circle" width={36} height={36} />
                    <Skeleton style={{ marginLeft: 16 }} width="80%"/>
                  </ListItem>
                ))
              }
            </List>
          </div>
        </div>
      }
    </div>
  );
}
