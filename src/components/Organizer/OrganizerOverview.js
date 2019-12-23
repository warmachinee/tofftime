import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles } from '@material-ui/core/styles';
import { primary, grey } from './../../api/palette'

import {
  Paper,
  Avatar,
  Typography,
  Button,

} from '@material-ui/core';

import {
  AccountCircle as AccountCircleIcon,

} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },
  paper: {
    marginTop: 16,
    padding: theme.spacing(2),
    display: 'flex',
    borderRadius: 0,
    flexWrap: 'wrap'
  },
  imageGrid: {
    margin: 12,
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    fontSize: 120,
    [theme.breakpoints.down(500)]: {
      fontSize: 60,
    },
  },
  avatarImage: {
    width: 120,
    height: 120,
    [theme.breakpoints.down(500)]: {
      width: 60,
      height: 60,
    },
  },
  pageDetailGrid: {
    display: 'flex',
    flexGrow: 1,
    alignSelf: 'center',
    flexWrap: 'wrap',
    WebkitFlexWrap: 'wrap',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
  },
  pageDetail: {
    marginLeft: 8,
  },
  pageTitle: {

  },
  followers: {
    color: grey[500]
  },
  followButton: {
    marginRight: 8,
    marginTop: 16
  },
  aboutPage: {
    display: 'flex',
    padding: '12px 0px',
    flexDirection: 'column',
    [theme.breakpoints.up(800)]: {
      flexDirection: 'row',
    },
  },
  aboutDetail: {
    position: 'relative',
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
  },
  aboutLabel: {
    maxWidth: 100,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: `4px solid ${primary[600]}`,
    borderRight: 'none',
    paddingRight: 8,
    whiteSpace: 'nowrap',
    [theme.breakpoints.up(800)]: {
      marginRight: 12,
      paddingRight: 12,
      borderRight: `4px solid ${primary[600]}`,
      borderBottom: 'none',
      paddingBottom: 8,
    },
  },
  moreThan600: {
    [theme.breakpoints.down(600)]: {
      display: 'none'
    },
  },
  lessThan600: {
    [theme.breakpoints.up(600)]: {
      display: 'none'
    },
  },

}));

function DetailComponent(props){
  const { id, detail } = props

  return(
    <div id={id} className="ql-container ql-snow" style={{ border: 'none' }}>
      <div className="ql-editor" style={{ overflow: 'hidden', height: 'auto', padding: '2px 15px 0 15px' }}>
        {ReactHtmlParser(detail)}
      </div>
    </div>
  );
}

export default function OrganizerOverview(props) {
  const classes = useStyles();
  const { API, BTN, sess, token, setCSRFToken, isSupportWebp, handleSnackBar, isFollow, setIsFollow, data, setData, pageid, handlePageData } = props
  const [ moreState, setMoreState ] = React.useState(false)
  const aboutElement = document.getElementById(`about-page-${pageid}`)

  async function handleToggleFollow(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'uusersystem' , {
        action: 'pagefollow',
        pageid: pageid,
    }, function(csrf, d){
      setCSRFToken(csrf)
    })
    await handleFetch()
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      ( sess && sess.status === 1 ) ? 'ploadpage' : 'mloadpage' , {
        action: 'detail',
        pageid: parseInt(props.computedMatch.params.pageid),
    }, function(csrf, d){
      setCSRFToken(csrf)
      if(d.length > 1){
        setData(d[0])
        handlePageData(d[0])
        document.title = `${d[0].pagename} - T-off Time Organizer`
        setIsFollow(d[1].subscribe)
      }else{
        setData('No page')
      }
    })
  }

  return (
    <div className={classes.root}>
      { data &&
        <Paper className={classes.paper}>
          <div style={{ display: 'flex', flex: 1 }}>
            <div className={classes.imageGrid}>
              { data.logo ?
                <Avatar className={classes.avatarImage}
                  src={API._getPictureUrl(data.logo) + ( isSupportWebp? '.webp' : '.jpg' )} />
                :
                <AccountCircleIcon classes={{ root: classes.avatar }} />
              }
            </div>
            <div className={classes.pageDetailGrid}>
              <div className={classes.pageDetail}>
                <Typography gutterBottom variant="h5" className={classes.pageTitle}>
                  {data.pagename}
                </Typography>
                <Typography gutterBottom variant="body2" className={classes.followers}>
                  {data.subscriber} { (
                    API._getWord(sess && sess.language).follower
                  ) + ( data.subscriber > 1 ? ( API._getWord(sess && sess.language).s ) : '')}
                </Typography>
                { data.pagedetail && data.pagedetail !== '<p></p>' && data.pagedetail !== '<p><br></p>' &&
                  <div className={classes.moreThan600}>
                    <div className={classes.aboutPage}>
                      <div>
                        <Typography variant="body1" className={classes.aboutLabel}>{ API._getWord(sess && sess.language).About }</Typography>
                      </div>
                      <div>
                        <div className={classes.aboutDetail} style={{ maxHeight: moreState ? '100%' : 140, transition: '.2s' }}>
                          <DetailComponent id={`about-page-${pageid}`} detail={data.pagedetail} />
                        </div>
                        { aboutElement && aboutElement.offsetHeight > 140 &&
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <BTN.PrimaryText onClick={()=>setMoreState(!moreState)}>
                              { API._getWord(sess && sess.language)[moreState ? 'Collapse' : 'More' ] }
                            </BTN.PrimaryText>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          { data && sess &&
            (
              ( data.hostid === sess.userid ) ?
              <div className={classes.followButton}>
                <BTN.NoStyleLink to={`/organizer/${pageid}`}>
                  <BTN.Primary size="large">
                    { API._getWord(sess && sess.language).Edit }
                  </BTN.Primary>
                </BTN.NoStyleLink>
              </div>
              :
              <div className={classes.followButton}>
                { ( sess.status !== 1 )?
                  <BTN.NoStyleLink to="/login">
                    <BTN.Primary size="large">
                      { API._getWord(sess && sess.language).Follow_BTN }
                      <div style={{ marginLeft: 12 }}>
                        {data.subscriber && data.subscriber.length > 0 ? data.subscriber : ''}
                      </div>
                    </BTN.Primary>
                  </BTN.NoStyleLink>
                  :
                  <React.Fragment>
                    { isFollow ?
                      <BTN.Following size="large" onClick={handleToggleFollow}>
                        { API._getWord(sess && sess.language).Following }
                      </BTN.Following>
                      :
                      <BTN.Primary size="large"
                        onClick={handleToggleFollow}>
                        { API._getWord(sess && sess.language).Follow_BTN }
                        <div style={{ marginLeft: 12 }}>
                          {data.subscriber && data.subscriber.length > 0 ? data.subscriber : ''}
                        </div>
                      </BTN.Primary>
                    }
                  </React.Fragment>
                }
              </div>
            )
          }
          { data.pagedetail && data.pagedetail !== '<p></p>' && data.pagedetail !== '<p><br></p>' &&
            <div className={classes.lessThan600}>
              <div className={classes.aboutPage} style={{ marginLeft: 16 }}>
                <div>
                  <Typography variant="body1" className={classes.aboutLabel}>{ API._getWord(sess && sess.language).About }</Typography>
                </div>
                <div>
                  <div className={classes.aboutDetail} style={{ maxHeight: moreState ? '100%' : 140, transition: '.2s' }}>
                    <DetailComponent id={`about-page-${pageid}`} detail={data.pagedetail} />
                  </div>
                  { aboutElement && aboutElement.offsetHeight > 140 &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <BTN.PrimaryText onClick={()=>setMoreState(!moreState)}>
                        { API._getWord(sess && sess.language)[moreState ? 'Collapse' : 'More' ] }
                      </BTN.PrimaryText>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </Paper>
      }
    </div>
  );
}
