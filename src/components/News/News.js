import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import * as API from '../../api'

import NewsListItem from './NewsListItem'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'auto',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 16,
    [theme.breakpoints.up(900)]: {
      maxWidth: 300,
      marginTop: 0,
      maxHeight: 350,
    },
    [theme.breakpoints.up(1000)]: {
      maxWidth: 300,
      marginTop: 0,
      maxHeight: 400,
    },
  },
}));

export default function News(props) {
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
  const tempData = [
    {
      id: 10,
      img: 'https://www.b4thematch.com/wp-content/uploads/2019/07/562000006430701.jpg',
      title: '15 ปีที่รอคอย “แลชลีย์” ปลดล็อกแชมป์แรกในชีวิตสวิงร็อคเก็ต',
      subtitle: '',
      from: 'b4thematch.com'
    },
    {
      id: 11,
      img: 'https://static.siamsport.co.th/news/2019/07/04/news20190704170723.jpg',
      title: '4มือดีโลกตอบรับหวดสวิงดับเบิ้ลยูจีซี-เอสเอสบีซีแชมเปี้ยนส์2019',
      subtitle: '',
      from: 'www.siamsport.co.th'
    },
    {
      id: 12,
      img: 'https://www.thairath.co.th/media/4DQpjUtzLUwmJZZPGTgjgRjqETf77iR9S973eqonzCAu.webp',
      title: 'กอล์ฟสแควร์ 03/06/62',
      subtitle: '',
      from: 'thairath.co.th'
    },
    {
      id: 13,
      img: 'https://www.b4thematch.com/wp-content/uploads/2019/07/562000006605601.jpg',
      title: '“แฮร์ริงตัน” หวด 8 อันเดอร์ ขึ้นนำวันแรกสวิงไอริชฯ',
      subtitle: '',
      from: 'b4thematch.com'
    },
    {
      id: 13,
      img: 'https://s.isanook.com/sp/0/rp/r/w700/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL3NwLzAvdWQvMTgwLzkwMTkxNC9tby5qcGc=.jpg',
      title: '"โปรโม" จบอันดับ 9 ร่วมศึก Meijer เท่าปีที่แล้ว',
      subtitle: '',
      from: 'sanook.com'
    }
  ]

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmainpage', {
        action: 'news',
    }, (csrf, d) =>{
      /*
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })*/
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    //handleFetch()
  },[ ])

  return (
    <List className={classes.root}>
      {tempData.map( d=>
        <div key={d.title}>
          <NewsListItem data={d} key={d}/>
          <Divider />
        </div>
      )}
    </List>
  );
}
