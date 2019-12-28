import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  MobileStepper,

} from '@material-ui/core';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Close as CloseIcon,

} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 720,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
  },
  img: {
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  dialogContentRoot: {
    padding: 0
  },
  paperWidthMd: {
    maxWidth: 720
  },
  paperFullWidth: {
    width: '100%'
  },
  paperScrollPaper: {
    margin: 0
  },

}));

export default function UserTutorial(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    API, sess, token, setCSRFToken, handleSess, open, scroll = 'paper',
    handleClose, fullWidth, titleDivider, elementId
  } = props
  const [ activeStep, setActiveStep ] = React.useState(0);
  const tutorialSteps = [0,1,2,3,4,5].map( d =>{ return `https://file.${API._webURL()}/system/tutorial/tutorial${d}.jpg` })
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  async function handleGetUserinfo(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      handleClose()
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  async function tutorialClose(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'tutorial', {
        action: 'loginfirst',
        toggle: 'true'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleGetUserinfo()
    })
  }

  React.useEffect(()=>{
    setActiveStep(0)
  },[ open ])

  return (
    <Dialog
      fullWidth={window.innerWidth}
      open={open}
      onClose={tutorialClose}
      scroll={scroll}
      classes={{
        paperWidthMd: classes.paperWidthMd,
        paperFullWidth: classes.paperFullWidth,
        paperScrollPaper: classes.paperScrollPaper
      }}>
      <DialogTitle disableTypography
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <Button variant="outlined" onClick={tutorialClose}>
          { API._getWord(props.sess && props.sess.language).Skip }
        </Button>
      </DialogTitle>
      <DialogContent
        classes={{ root: classes.dialogContentRoot }}
        id={ elementId ? elementId : "template-dialog"} dividers={titleDivider}>
        <div style={{ marginTop: 16 }}>
          <div className={classes.root}>
            <img
              className={classes.img}
              src={tutorialSteps[activeStep]}
            />
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                ( activeStep === maxSteps - 1 ) ?
                <Button size="small" variant="outlined" onClick={tutorialClose}>
                  { API._getWord(props.sess && props.sess.language).Done }
                </Button>
                :
                <Button size="small" onClick={handleNext}>
                  { API._getWord(props.sess && props.sess.language).Next }
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  { API._getWord(props.sess && props.sess.language).Back }
                </Button>
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
