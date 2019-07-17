import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import teal from '@material-ui/core/colors/teal';

import ic_slide1 from '../img/slide1.png'
import ic_sw from '../img/sw.jpg'
import ic_ssw from '../img/ssw.jpg'
import ic_gsw from '../img/gsw.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  title: {
    textAlign: 'center', color: teal[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  detailDate: {
    textAlign: 'left', color: teal[600],
    fontSize: 16, fontStyle: 'oblique', fontFamily: 'monospace'
  },
  detailLocation: {
    textAlign: 'left', color: teal[800],
    fontSize: 18,
  },
  detailHead: {
    textAlign: 'left', color: teal[800],
    fontSize: 18,
    [theme.breakpoints.up(500)]: {
      fontSize: 20,
    },
  },
  detailText: {
    textAlign: 'left', color: teal[800],
    fontSize: 18,
    [theme.breakpoints.up(500)]: {
      fontSize: 20,
    },
  },
  detailCredit: {
    textAlign: 'right',
    fontSize: 16,
    margin: 0
  },
  link: {
    marginTop: 'auto',
    marginLeft: 8,
    fontSize: 16,
    fontStyle: 'oblique',
  },
  detailBox: {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  back: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(teal[600], 0.25),
    },
  },
  backIcon: {
    fontSize: '2rem',
    color: teal[800],
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
  },
  img: {
    width: '100%',
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }

}))

export default function GeneralDetail(props){
  const classes = useStyles();
  //const { } = props
  //const [ data, setData ] = React.useState(null)

  const temp = [
    {
      label: 'ผู้ชนะ SNT 4-2019 วันที่ 4 กรกฎาคม 2562 ณ Watermill Golf Club & Resort',
      picture: ic_slide1,
      detail: [
        <React.Fragment>
          <Typography component="div">
            <Box className={classes.title} fontWeight={600} m={1}>
              ผู้ชนะ SENIOR NATION TOUR 4 - 2019<br />
            </Box>
          </Typography>
          <Typography component="div" className={classes.detailBox}>
            <Box className={classes.detailDate} fontWeight={600} m={1}>
              4 ก.ค. 62
            </Box>
            <Box className={classes.detailLocation} fontWeight={600} m={1}>
              ณ สนามวอเตอร์มิลล์ กอล์ฟแอนด์การ์เดน
            </Box>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Box className={classes.detailText} fontWeight={600} m={1}>
                ผู้ชนะประเภท Senior Professional<br />
              </Box>
              <Box className={classes.detailText} m={1}>
                โปรประทีป ค้ายาดี<br/>
                OUT = 37 IN = 36 Total = 73 PAR = 1
              </Box>
              <img src={ic_sw} style={{ width: '100%' }}/>
            </div>
            <Box className={classes.detailText} fontWeight={600} m={1}>
              ผู้ชนะประเภท Super Senior Professional<br />
            </Box>
            <Box className={classes.detailText}m={1}>
              โปรภัศดา บุรณศิรี<br/>
              OUT = 33 IN = 34 Total = 67 PAR = -5
            </Box>
            <img src={ic_ssw} style={{ width: '100%' }}/>
            <Box className={classes.detailText} fontWeight={600} m={1}>
              ผู้ชนะประเภท Grand Senior Professional<br />
            </Box>
            <Box className={classes.detailText} m={1}>
              โปรสมนัส จันทนะ<br/>
              OUT = 39 IN = 38 Total = 77 PAR = 5
            </Box>
            <img src={ic_gsw} style={{ width: '100%' }} />
            <div style={{ display: 'flex', marginTop: 36, marginBottom: 64 }}>
              <Link href={'https://www.tofftime.com/match/16725831'} className={classes.link}>
                ผลคะแนนย้อนหลัง
              </Link>
            </div>
          </Typography>
        </React.Fragment>
        ,
      ]
    },
    {
      label: 'SNT ระเบิดศึกดวลสวิงอาชีพอาวุโส วันที่ 4 กรกฎาคม 2562 ณ Watermill Golf Club & Resort',
      picture: ic_slide1,
      detail: [
        <React.Fragment>
          <Typography component="div">
            <Box className={classes.title} fontWeight={600} m={1}>
              SENIOR NATION TOUR 4 - 2019<br />
            </Box>
          </Typography>
          <Typography component="div" className={classes.detailBox}>
            <Box className={classes.detailDate} fontWeight={600} m={1}>
              4 ก.ค. 62
            </Box>
            <Box className={classes.detailLocation} fontWeight={600} m={1}>
              ณ สนามวอเตอร์มิลล์ กอล์ฟแอนด์การ์เดน
            </Box>
            <Box className={classes.detailText} fontWeight={600} m={1}>
              สำหรับนักกีฬากอล์ฟ 50 อัพ
            </Box>
          </Typography>
        </React.Fragment>
        ,
      ]
    },
  ]
  const tempNews = [
    {
      label: '15 ปีที่รอคอย “แลชลีย์” ปลดล็อกแชมป์แรกในชีวิตสวิงร็อคเก็ต',
      picture: 'https://www.b4thematch.com/wp-content/uploads/2019/07/562000006430701.jpg',
      detail: [
        <React.Fragment>
          <Typography component="div" className={classes.detailBox}>
            <Box className={classes.detailText} m={1}>
              เนต แลชลีย์ นักกอล์ฟมือ 353 ของโลกชาวอเมริกัน เดินทางมาถึงวันแห่งความสำเร็จหลังเก็บสกอร์รวมเป็น 25 อันเดอร์พาร์ ก่อนเข้าป้ายคว้าแชมป์ พีจีเอ ทัวร์ ใบแรกในชีวิตกับรายการ ร็อคเก็ต มอร์ตเกจ คลาสสิค เมื่อจบรอบสุดท้าย

              ศึกกอล์ฟ พีจีเอ ทัวร์ รายการ “ร็อคเก็ต มอร์ตเกจ คลาสสิค” ชิงเงินรางวัลรวม 7.3 ล้านเหรียญสหรัฐ (ประมาณ 225 ล้านบาท) ณ สนาม ดีทรอยต์ กอล์ฟ คลับ เมืองดีทรอยต์ รัฐมิชิแกน พาร์ 72 ประเทศสหรัฐอเมริกา โดยวันที่ 30 มิถุนายน ที่ผ่านมา เป็นการประชันวงสวิงรอบสุดท้าย

              ปรากฏว่าไม่พลิกผันเมื่อ เนต แลชลีย์ ผู้นำตลอด 3 วัน ลงสนามเก็บเพิ่มอีก 2 อันเดอร์ จากการตี 4 เบอร์ดี เสีย 2 โบกี จบวันสกอร์รวมเป็น 25 อันเดอร์พาร์ ส่งให้เจ้าตัวเข้าป้ายหยิบแชมป์แรกในชีวิตพร้อมเงินรางวัล 1.3 ล้านเหรียญสหรัฐ (ประมาณ 39 ล้านบาท) และสิทธิลงเล่นเมเจอร์ บริติช โอเพน ที่ไอร์แลนด์เหนือ เดือนกรกฏาคมนี้

              ชีวิตของ แลชลีย์ วัย 36 ปี ต้องเผชิญกับความเศร้าหลังครอบครัวและแฟนสาวของเขาเสียชีวิตจากอุบัติเหตุเครื่องบินตกเมื่อ 15 ปีที่แล้วก่อนเทิร์นโปร แต่สุดท้ายเจ้าตัวก็สลัดความโศกเศร้า ลุกขึ้นมาจับไม้กอล์ฟ เข้าสู่การเทิร์นโปรและลงแข่งขันอาชีพจนมาถึงวันที่รอคอย

              “มันเป็นความตื้นตันอย่างยิ่ง” แลชลีย์ กล่าวหลังรับแชมป์ “ผมรู้สึกขอบคุณตัวเองเหลือเกินที่เข้ามาลงแข่งขันกอล์ฟ การคว้าแชมป์ พีจีเอ ทัวร์ กลายเป็นฝันแห่งความจริงและดีใจมากที่ทำสำเร็จแล้วในวันนี้”

              ส่วนผลงานของเหล่ามือดัง แพทริค รีด ซูเปอร์สตาร์เจ้าถิ่น วันสุดท้ายเก็บอีก 2 อันเดอร์ สกอร์รวม 17 อันเดอร์พาร์ จบอันดับ 5 ร่วม และ ฮิเดกิ มัตสึยาม่า มือ 1 ชาวญี่ปุ่น สกอร์ 15 อันเดอร์พาร์ ปิดฉากอันดับ 13 ร่วม
            </Box>
            <div style={{ display: 'flex', marginTop: 36, marginBottom: 64 }}>
              <Box className={classes.detailCredit} m={1}>
                Credit
              </Box>
              <Link href={'https://www.b4thematch.com/%e0%b8%82%e0%b9%88%e0%b8%b2%e0%b8%a7%e0%b8%81%e0%b8%ad%e0%b8%a5%e0%b9%8c%e0%b8%9f/%e0%b8%82%e0%b9%88%e0%b8%b2%e0%b8%a7%e0%b8%81%e0%b8%ad%e0%b8%a5%e0%b9%8c%e0%b8%9f-251/'} className={classes.link}>
                b4thematch
              </Link>
            </div>
          </Typography>
        </React.Fragment>
        ,
      ]
    },
    {
      label: '4มือดีโลกตอบรับหวดสวิงดับเบิ้ลยูจีซี-เอสเอสบีซีแชมเปี้ยนส์2019',
      picture: 'https://static.siamsport.co.th/news/2019/07/04/news20190704170723.jpg',
      detail: [
        <React.Fragment>
          <Typography component="div" className={classes.detailBox}>
            <Box className={classes.detailHead} fontWeight={600} m={1}>
              บรู๊คส์ โคปก้า, ดัสติน จอห์นสัน, รอรี่ย์ แม็คอิลรอย และ จัสติน โรส 4 นักกอล์ฟระดับท๊อปของโลก ประกาศยืนยันแล้วว่าเตรียมจะมาร่วมล่าแชมป์รายการใหญ่แห่งปีของทวีป เอเชีย ในรายการ "ดับเบิ้ลยูจีซี-เอสเอสบีซี แชมเปี้ยนส์ 2019" ที่จะมีการแข่งขันที่ ฉีชาน สาธารณรัฐประชาชนจีน ในระหว่างวันที่ 31 ต.ค.- 3 พ.ย.นี้<br /><br />
            </Box>
            <Box className={classes.detailText} m={1}>
              รายการนี้ ซานเดอร์ ชาฟเฟิล เป็นเจ้าของตำแหน่งแชมป์ ซึ่งในปีนี้นอกจากเขาจะเดินทางมาป้องกันแชมป์แล้ว ล่าสุด 4 สวิงมือดีสุดของโลกอย่าง บรู๊คส์ โคปก้า, ดัสติน จอห์นสัน, รอรี่ย์ แม็คอิลรอย และ จัสติน โรส ก็พร้อมแล้วที่จะมาร่วมล่าแชมป์ด้วย<br /><br />

              การแข่งขันกอล์ฟ ดับเบิ้ลยูจีซี-เอสเอสบีซี แชมเปี้ยนส์ 2019 นับเป็นรายการยักษ์ใหญ่ที่สุดของ ทวีป เอเชีย ซึ่งหนนี้จัดขึ้นเป็นครั้งที่ 15 แล้ว ณ สนาม ฉีชาน อินเตอร์เนชั่นเนล กอล์ฟ คลับ ชิงเงินรางวัลถึง 10.25 ล้านเหรียญสหรัฐ (ราวๆ 301,247,500 บาท) ซึ่งได้มีการจำหน่ายบัตรเข้าชมอย่างเป็นทางการแล้วในวันนี้<br /><br />

              ชาฟเฟิล ซึ่งคว้าแชมป์ได้เมื่อปีที่แล้ว ก่อนที่จะมาคว้าชัยชนะในรายการ เซนทรี ทัวร์นาเม้นท์ ออฟ แชมเปี้ยนส์ ในพีจีเอ ทัวร์ และรั้งอันดับ 2 ใน เดอะ มาสเตอร์ส และอันดับ 3 ในรายการ ยูเอส โอเพ่น เมื่อเดือนที่ผ่านมา เผยว่า {"การคว้าชัยชนะที่รายการนี้เมื่อปีที่แล้วมันเป็นอะไรที่ลืมไม่ลงเลย เพราะเป็นการเอาชนะต่อหน้าครอบครัวมันสุดยอดมาก การก้าวเข้ามาสู่สนามที่เต็มไปด้วยนักกอล์ฟระดับโลกแบบนี้ มันย่อมต้องเกิดแรงกดดันแน่นอน แต่ผมก็พร้อมเต็มที่ในการลงป้องกันแชมป์ในครั้งนี้ เมื่อปีที่แล้วมันเป็นอะไรที่น่าเหลือเชื่อมาก และผมก็ดีใจมากที่สุดยอดนักกอล์ฟระดับโลกทั้ง 4 คนจะมาร่วมลงแข่งด้วยในปีนี้"}<br /><br />

              โค้ปก้า สวิงเบอร์ 1 ของโลกคนปัจจุบัน ที่เพิ่งจะคว้าแชมป์ เมเจอร์ ที่ 4 ให้ตัวเองเมื่อต้นซีซั่น กล่าวว่า {"ผมยินดี และตอบตกลงที่จะมาแข่งที่ ฉีชาน ซึ่งผมเคยคว้าที่ 2 เมื่อปี 2017 และรู้ว่าสนามแห่งนี้เหมาะกับสไตล์การเล่นของผม และผมรักพลังงานบวกที่ดีจากแฟนกอล์ฟชาวจีนที่มอบให้ด้วย และผมคิดว่ารายการนี้สำคัญไม่แพ้รายการระดับ เมเจอร์ เลยด้วย"}<br /><br />

               โจนาธาน คาสเซิลแมน หัวหน้า โกลบอล แบรนด์ พาร์ทเนอร์ชิพ ของ เอชเอสบีซี เผยว่า {"เรามีความยินดีที่จะประกาศว่า 4 มือท๊อปของโลก และแชมป์เก่า ชาฟเฟิล จะมาร่วมลงแข่งในปีนี้ มันนับเป็นนิมิตรหมายอันดีสำหรับการแข่งขัน ในการจะยกระดับขึ้น เมื่อมีนักกอล์ฟมือดีระดับโลกมาร่วมหวด ให้สมกับที่ทุกคนกล่าวว่ารายการนี้เป็น เมเจอร์ อันดับ 1 ของทวีป เอเชีย"}<br /><br />
            </Box>
            <div style={{ display: 'flex', marginTop: 36, marginBottom: 64 }}>
              <Box className={classes.detailCredit} m={1}>
                Credit
              </Box>
              <Link href={'https://www.siamsport.co.th/golf/other/view/139194'} className={classes.link}>
                siamsport
              </Link>
            </div>
          </Typography>
        </React.Fragment>
        ,
      ]
    },
    {
      label: 'กอล์ฟสแควร์ 03/06/62',
      picture: 'https://www.thairath.co.th/media/4DQpjUtzLUwmJZZPGTgjgRjqETf77iR9S973eqonzCAu.webp',
      detail: [
        <React.Fragment>
          <Typography component="div" className={classes.detailBox}>
            <Box className={classes.detailHead} fontWeight={600} m={1}>
              ป้องกันแชมป์ไม่ได้ “โปรเม” เอรียา จุฑานุกาล ทำได้เพียงผ่านการตัดตัวเข้ารอบ ได้เล่นครบ 4 วัน ในกอล์ฟเมเจอร์หญิง ยูเอส วีเมนส์ โอเพ่น ที่สนาม คันทรีคลับ ออฟ ชาร์ลส์ตัน เมืองชาร์ลส์ตัน รัฐเซาท์แคโรไลนา ประเทศสหรัฐอเมริกา<br /><br />
            </Box>
            <Box className={classes.detailText} m={1}>
              ขณะที่ฝั่งพีจีเอทัวร์ “โปรอาร์ม” กิรเดช อภิบาลรัตน์ ก็ฝ่าด่านเข้ารอบได้สำเร็จ ในกอล์ฟ เดอะ เมโมเรียล ทัวร์นาเมนต์ ที่สนาม มูริฟิลด์ วิลเลจ กอล์ฟคลับ เมืองดับลิน รัฐโอไฮโอ ประเทศสหรัฐอเมริกา แต่สัปดาห์นี้ซึ่งมีแข่งในรายการ แคนาเดียน โอเพ่น ในแคนาดา “โปรอาร์ม” หยุดพักเพื่อ รอรายการเมเจอร์ ยูเอส โอเพ่น ที่จะเล่นกัน 13-16 มิ.ย.<br /><br />

              กอล์ฟสมัครเล่นรายการ ไต้หวัน อเมเจอร์ กอล์ฟ แชมเปียนชิป สนามกอล์ฟ หนานฟ่ง กอล์ฟ คลับ ทีมชายไทยไปคว้าแชมป์มาครอง แต่เสียดายในประเภทบุคคล ทั้ง “มาร์ค” วันชัย หลวงนิติกุล และ “เอด้า” นพรัฐ พานิชผล ที่นำอยู่ดีๆมาพังเอาใน 2 วันสุดท้าย เลยจบที่ 6 และ 14 ตามลำดับ ส่วนทีมหญิง สาวไทยได้อันดับ 3 ประเภททีม ขณะที่บุคคลนั้น “ซิม” ณัฐกฤตา วงศ์ทวีลาภ รั้งอันดับ 4 และ “จีน” อาฒยา ฐิติกุล ได้อันดับ 6<br /><br />

              กอล์ฟอาชีพหญิงรายการใหญ่ในเมืองไทย เลดีส์ ยูโรเปียน ไทยแลนด์ แชมเปียนชิป 2019 ซึ่งจะหวดกัน 20-23 มิ.ย. ที่สนามฟีนิกซ์ โกลด์ กอล์ฟ แอนด์ คันทรีคลับ เมืองพัทยา ชิงเงินรางวัลรวม 12 ล้านบาท นัดแถลงข่าว 4 มิ.ย.นี้ ที่สนาม เริ่ม 11.00 น.<br /><br />

              สุริยะ ตันติวิวัฒน์ นายกสมาคมศิษย์เก่าวิศว– กรรมศาสตร์ ม.ขอนแก่น นำทีมแถลงข่าวจัดการ แข่งขัน “กอล์ฟประเพณี 5 เกียร์” ประจำปี 2562 พฤหัสฯที่ 6 มิ.ย. เวลา 11.00 น. ที่สนามฟลอร่า วิลล์กอล์ฟ แอนด์ คันทรีคลับ ต.บาง–คูวัด ปทุมธานี ส่วนวันแข่งจริง 22 มิ.ย.<br /><br />


              บ.ช้างอินเตอร์เนชันแนล ร่วมกับ สมาคมสนามกอล์ฟไทย และ ททท. จัดการแข่งขันกอล์ฟสมัครเล่นรายการ “ช้างคลับ แชมเปียนชิป 2019” ซึ่งนักกอล์ฟที่จะเข้าร่วมต้องมีอายุ 24 ปีขึ้นไป จัดรอบคัดเลือก 25 สนามทั่วประเทศ ช่วง มิ.ย. ถึง ส.ค. รอบชิงชนะเลิศที่สโมสรราชพฤกษ์คลับ 19 ส.ค. ลุ้นได้สิทธิ์ไปเที่ยวและออกรอบที่เมืองคุนหมิงด้วย ดูรายละเอียดได้ที่ <br /><br />
            </Box>
            <div style={{ display: 'flex', marginTop: 36, marginBottom: 64 }}>
              <Box className={classes.detailCredit} m={1}>
                Credit
              </Box>
              <Link href={'https://www.thairath.co.th/sport/others/1582400'} className={classes.link}>
                thairath
              </Link>
            </div>
          </Typography>
        </React.Fragment>
        ,
      ]
    },
    {
      label: '“แฮร์ริงตัน” หวด 8 อันเดอร์ ขึ้นนำวันแรกสวิงไอริชฯ',
      picture: 'https://www.b4thematch.com/wp-content/uploads/2019/07/562000006605601.jpg',
      detail: [
        <React.Fragment>
          <Typography component="div" className={classes.detailBox}>
            <Box className={classes.detailText} m={1}>
              ปแดร็ก แฮร์ริงตัน ก้านเหล็กเจ้าถิ่น ขึ้นนำวันแรก ศึก ยูโรเปียน ทัวร์ รายการ “ดูไบ ดิวตี ฟรี ไอริช โอเพน” ที่สาธารณรัฐไอร์แลนด์ ขณะที่ ธงชัย ใจดี หนึ่งเดียวของ ไทย รั้งอันดับ 68 ร่วม<br /><br />

              ศึกกอล์ฟ ยูโรเปียน ทัวร์ รายการ “ดูไบ ดิวตี ฟรี ไอริช โอเพน” ณ สนาม ลาฮินช์ กอล์ฟ คลับ เมืองลาฮินช์ ระยะ 7,036 หลา พาร์ 70 ชิงเงินรางวัลรวม 7 ล้านเหรียญสหรัฐ (ประมาณ 215 ล้านบาท) วันพฤหัสบดีที่ 4 กรกฎาคม เป็นการประชันวงสวิง รอบแรก <br /><br />

              ปรากฏว่า เปแดร็ก แฮร์ริงตัน แชมป์ปี 2007 เข้าร่วมทัวร์นาเมนต์ที่ 8 ของฤดูกาล หลังมีปัญหาบาดเจ็บข้อมือ หวด 8 เบอร์ดี รวม 3 หลุมติด ตั้งแต่ 8-10 เสีย 1 โบกี สกอร์ 7 อันเดอร์พาร์ 63 <br /><br />

              ขณะที่ ซานเดอร์ ลอมบาร์ด จาก แอฟริกาใต้ เร่งช่วงท้าย เก็บ 3 จาก 7 เบอร์ดี หลุมที่ 16-18 เสีย 1 โบกี จบวัน 6 อันเดอร์พาร์ 64 ตามด้วยอันดับ 3 ร่วม เหว็ด ออร์มสบี, ไมค์ ลอเรนโซ-เวรา, ปาร์ก เฮียววอน, ธอร์บียอร์น โอเลเซน, ลี สแลตเทอรี, เอ็ดดี เพ็พเพอเรลล์ และ คริส เพสลีย์ เก็บคนละ 5 อันเดอร์พาร์ 65<br /><br />

              ส่วน “โปรช้าง” ธงชัย ใจดี มือ 477 ของโลก เสีย 2 โบกี ก่อนทวงคืน 2 เบอร์ดี ที่หลุม 17 กับ 18 รวมอีเวนพาร์ 70 เท่ากับเพื่อนร่วมอาชีพอีก 21 คน
            </Box>
            <div style={{ display: 'flex', marginTop: 36, marginBottom: 64 }}>
              <Box className={classes.detailCredit} m={1}>
                Credit
              </Box>
              <Link href={'https://www.b4thematch.com/%e0%b8%82%e0%b9%88%e0%b8%b2%e0%b8%a7%e0%b8%81%e0%b8%ad%e0%b8%a5%e0%b9%8c%e0%b8%9f/%e0%b8%82%e0%b9%88%e0%b8%b2%e0%b8%a7%e0%b8%81%e0%b8%ad%e0%b8%a5%e0%b9%8c%e0%b8%9f-253/'} className={classes.link}>
                b4thematch
              </Link>
            </div>
          </Typography>
        </React.Fragment>
        ,
      ]
    },
    {
      label: '"โปรโม" จบอันดับ 9 ร่วมศึก Meijer เท่าปีที่แล้ว',
      picture: 'https://s.isanook.com/sp/0/rp/r/w700/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL3NwLzAvdWQvMTgwLzkwMTkxNC9tby5qcGc=.jpg',
      detail: [
        <React.Fragment>
          <Typography component="div" className={classes.detailBox}>
            <Box className={classes.detailText} m={1}>
              “โปรโม” โมรียา จุฑานุกาล ปิดฉากกอล์ฟ LPGA Tour รายการ Meijer LPGA Classic for Simply Give ที่สหรัฐอเมริกา คว้าอันดับ 9 ร่วม ด้วยผลงาน 13 อันเดอร์พาร์ 275 ขณะที่ “โปรเมียว” ปาจรีย์ อนันต์นฤการ คว้าอันดับ 39 ร่วม สกอร์ 7 อันเดอร์พาร์ 281<br /><br />

              โปรโมออกสตาร์ทรอบสุดท้ายมีสกอร์ 11 อันเดอร์พาร์ ในอันดับ 11 ร่วม วันสุดท้ายเปิดฉากด้วยการเสียโบกี้ 3 หลุมแรกต่อเนื่อง ก่อนแก้ตัวด้วย 3 เบอร์ดี้ใน 3 หลุมถัดมา และเมื่อเข้า 9 หลุมหลัง หลังจากเปิดด้วยโบกี้ที่หลุม 10 ก็ไปเก็บเบอร์ดี้ที่หลุม 17 ต่อด้วยอีเกิ้ลปิดท้ายที่หลุม 18 พาร์ 5 ทำให้จบวันทำเพิ่ม 2 อันเดอร์พาร์ สกอร์รวมเป็น 13 อันเดอร์พาร์ 275 เท่ากับอดีตมือ 1 โลกอย่างเฝิง ซ่านซ่าน จากจีน และรยู โซยอน จากเกาหลีใต้ คว้าอันดับ 9 ร่วมเช่นเดียวกับปีที่แล้ว<br /><br />

              ด้านโปรเมียวจบ 3 วันแรกทำสกอร์ 5 อันเดอร์พาร์ ในอันดับ 44 ร่วม รอบสุดท้ายทำ 3 เบอร์ดี้รวดที่หลุม 4, 5, 6 ก่อนไปเสียโบกี้ที่หลุม 16 พาร์ 4 ทำให้เก็บเพิ่ม 2 อันเดอร์พาร สกอร์รวมเป็น 7 อันเดอร์พาร์ 281 คว้าอันดับ 39 ร่วมเช่นเดียวกับปาร์ก ซุง ฮยุน มือ 3 โลกชาวเกาหลีใต้<br /><br />

              สำหรับตำแหน่งแชมป์เป็นของบรู๊ก เฮนเดอร์สัน โปรมือ 8 ของโลกชาวแคนาดา อดีตแชมป์รายการนี้เมื่อปี 2017 ซึ่งนำม้วนเดียวจบมาตั้งแต่รอบแรก โดยเฮนเดอร์สันจบวันสุดท้ายด้วยสกอร์รวม 21 อันเดอร์พาร์ 267 เฉือนอันดับ 2 ร่วม นาสะ ฮาตาโอกะ (ญี่ปุ่น), ซู โอห์ (ออสเตรเลีย), เล็กซี่ ธอมป์สัน (สหรัฐอเมริกา) และบริททานี่ อัลโตมาเร่ (สหรัฐอเมริกา) ซึ่งต่างทำสกอร์ 20 อันเดอร์พาร์ 268 เท่ากัน เพียงสโตรกเดียว นับเป็นแชมป์ที่ 2 ของเฮนเดอร์สันในปีนี้ต่อจากรายการ LOTTE Championship เมื่อเดือนเมษายน<br /><br />

              ด้านมือ 1 โลก โค จิน ยอง จากเกาหลีใต้ จบที่ 23 ร่วม สกอร์ 11 อันเดอร์พาร์ 277 และมินจี ลี มือ 2 โลกชาวออสเตรเลีย อันดับ 16 ร่วม เท่ากับอดีตมือ 1 โลก ลิเดีย โค จากนิวซีแลนด์ และปาร์ก อินบี จากเกาหลีใต้ ต่างทำได้ 12 อันเดอร์พาร์ 276 เท่ากัน ส่วน ปัณณรัตน์ ธนพลบุญรัศมิ์ สาวไทยอีกรายที่ผ่านการตัดตัว คว้าอันดับ 81 สกอร์ 1 โอเวอร์พาร์ 28<br /><br />
            </Box>
            <div style={{ display: 'flex', marginTop: 36, marginBottom: 64 }}>
              <Box className={classes.detailCredit} m={1}>
                Credit
              </Box>
              <Link href={'https://www.sanook.com/sport/901914/'} className={classes.link}>
                sanook
              </Link>
            </div>
          </Typography>
        </React.Fragment>
        ,
      ]
    },
  ]
  const type = ( props.computedMatch.params.detailparam >= 10? 'News' : 'Announce' )
  const data = (type === 'News')? tempNews[ props.computedMatch.params.detailparam - 10 ] :temp[ props.computedMatch.params.detailparam - 1 ]


  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmainpage', {
        action: 'match',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      /*
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      */
    })
  }

  React.useEffect(()=>{
    //handleFetch()
  },[ ])

  return(
    <Paper className={classes.root}>
      <div style={{ width: '100%' }}>
        <IconButton className={classes.back} onClick={()=>window.history.go(-1)}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      </div>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          {data.label}
        </Box>
      </Typography>
      <img src={data.picture} className={classes.img} />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          {data.detail}
        </Box>
      </Typography>
    </Paper>
  );
}
