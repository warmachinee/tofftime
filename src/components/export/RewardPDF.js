import React from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as API from './../../api'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew Bold.ttf',
    italics: 'THSarabunNew Italic.ttf',
    bolditalics: 'THSarabunNew BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

import Button from '@material-ui/core/Button';

export default function RewardPDF(props){
  const { data, matchClass, reward, rewardStatus, sess, sortBy } = props
  return(
    <React.Fragment>
      { (reward.length !== 0 && !reward.status) ?
        <Button onClick={()=>handleDownload(matchClass, reward, data, sortBy, sess)} color="primary">
          { ( sess && sess.language === 'TH' ) ? "รางวัล" : 'Reward' }
        </Button>:
        <Button disabled color="primary">{reward.status}</Button>
      }
    </React.Fragment>
  );
}

function handleDownload(matchClass , reward, data, sortBy, sess){
  var matchClassName = data.scorematch !== 0 ? matchClass.classname : API.handleAmateurClass(matchClass.classno)
  pdfMake.createPdf(PDFFile(matchClassName, reward, data, sortBy, sess)).download('Reward ' + matchClassName + '.pdf');
}

function PDFFile(classname, reward, data, sortBy, sess){
  let temp = []
  let player = []
  for(var i = 0;i < reward.length;i++){
    var arr = []
    arr.push(
      {text: reward[i].fullname + '\t' + reward[i].lastname, alignment: 'left', margin: [16, 0, 0, 0]},
    )
    if(data.scorematch === 1){
      arr.push(
        {text: reward[i].par},
      )
    }else{
      arr.push(
        {text: reward[i].hc},
        {text: reward[i].sf36sys},
      )
    }
    arr.push(
      {text: reward[i].prize, fillColor: '#e0e0e0', alignment: 'right', bold: true, margin: [8, 0, 8, 0]},
      {text: ''}
    )
    /*
    arr.push(
      {text: reward[i].fullname + '\t' + reward[i].lastname, alignment: 'left', margin: [16, 0, 0, 0]},
      {text: reward[i][ data.scorematch === 1 ? 'par' : 'sf36sys' ]},
      {text: reward[i].prize, fillColor: '#e0e0e0', alignment: 'right', bold: true, margin: [8, 0, 8, 0]},
      {text: ''}
    )*/
    player.push(arr)
  }

  let labelBody = (
    data.scorematch === 1 ?
    [
      {
        text: ( ( sess && sess.language === 'TH' ) ? "ชื่อ - นามสกุล" : 'Name' ),
        fillColor: '#e0e0e0', alignment: 'left', margin: [16, 0, 0, 0]
      },
      {text: 'PAR', fillColor: '#e0e0e0'},
      {text: ( ( sess && sess.language === 'TH' ) ? "เงินรางวัล" : 'Prize' ), fillColor: '#e0e0e0', margin: [8, 0, 8, 0]},
      {text: ( ( sess && sess.language === 'TH' ) ? "ลายเซ็น" : 'Sign' ), fillColor: '#e0e0e0'},
    ]
    :
    [
      {
        text: ( ( sess && sess.language === 'TH' ) ? "ชื่อ - นามสกุล" : 'Name' ),
        fillColor: '#e0e0e0', alignment: 'left', margin: [16, 0, 0, 0]
      },
      {text: 'HC', fillColor: '#e0e0e0'},
      {text: 'SF', fillColor: '#e0e0e0'},
      {text: ( ( sess && sess.language === 'TH' ) ? "เงินรางวัล" : 'Prize' ), fillColor: '#e0e0e0', margin: [8, 0, 8, 0]},
      {text: ( ( sess && sess.language === 'TH' ) ? "ลายเซ็น" : 'Sign' ), fillColor: '#e0e0e0'},
    ]
  )

  let label = [
    [
      {text: `${( ( sess && sess.language === 'TH' ) ? "เงินรางวัล" : 'Prize' )}\t`, fontSize: 36},
      {text: data.title, fontSize: 30},
    ],
    {
      text: `${( ( sess && sess.language === 'TH' ) ? "ประเภท" : 'Class' )}\t` + classname,
      fontSize: 28, bold: true, margin: [0, 0, 0, 24]
    },
    {
      style: 'table',
			table: {
				widths: data.scorematch === 1 ? ['*', 50, 'auto', '30%'] : ['*', 50, 50, 'auto', '30%'],
				body: [
					labelBody,
          ...player
				]
			}
    },
  ]
  temp.push(label)

  var doc = {
    pageSize: 'A4',
    margin: [0, 20, 0, 20],
    content: temp,
    styles: {
  		table: {
  			alignment: 'center',
        fontSize: 20,
        bold: true,
  		},
  	},
    defaultStyle: {
      font: 'THSarabunNew'
    }
  };
  return doc
}
