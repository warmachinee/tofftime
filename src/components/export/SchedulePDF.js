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

export default function SchedulePDF(props){
  const { data, matchDetail, sess } = props
  return(
    <Button onClick={()=>handleDownload(data, matchDetail, sess)} color="primary">
      PDF
    </Button>
  );
}

function handleDownload(data, matchDetail, sess){
  pdfMake.createPdf(PDFFile(data, matchDetail, sess)).download('Schedule.pdf');
}

function PDFFile(data, matchDetail, sess){
  let temp = []
  let player = []
  for(var i = 0;i < data.length;i++){
    var arr = []
    arr.push(
      {text: data[i].teamno},
      {text: (
        matchDetail.team.filter( item =>{
          return item.teamno === data[i].teamno
        }).map( md => md.teamname )
      )},
      {text: data[i].fullname + '\t' + data[i].lastname, alignment: 'left', margin: [16, 0, 0, 0]},
      {text: (
        matchDetail.team.filter( item =>{
          return item.teamno === data[i].teamno
        }).map( md => md.note )
      )}
    )
    player.push(arr)
  }

  let labelBody = (
    [
      {text: ( ( sess && sess.language === 'TH' ) ? "ทีม" : 'Team' ), fillColor: '#e0e0e0'},
      {text: ( ( sess && sess.language === 'TH' ) ? "เวลา" : 'Time' ), fillColor: '#e0e0e0'},
      {
        text: ( ( sess && sess.language === 'TH' ) ? "ชื่อ - นามสกุล" : 'Full Name' ),
        fillColor: '#e0e0e0', alignment: 'left', margin: [16, 0, 0, 0]
      },
      {text: ( ( sess && sess.language === 'TH' ) ? "หมายเหตุ" : 'Note' ), fillColor: '#e0e0e0', margin: [8, 0, 8, 0]},
    ]
  )

  let label = [
    [
      {text: `${( sess && sess.language === 'TH' ) ? "ตารางเวลา" : 'Schedule'}\t`, fontSize: 36},
      {text: data.title, fontSize: 30},
    ],
    {text: matchDetail.title + '\t', fontSize: 28, bold: true, margin: [0, 0, 0, 24]},
    {text: matchDetail.location + `(${matchDetail.locationversion})` + '\t', fontSize: 24, bold: true, margin: [0, 0, 0, 24]},
    {
      text: `${( sess && sess.language === 'TH' ) ? "วันที่" : 'Date' }\t${API._dateToString(matchDetail.date)}` + '\t',
      fontSize: 24, bold: true, margin: [0, 0, 0, 24]
    },
    {
      style: 'table',
			table: {
				widths: [ 50, 70, '*', '30%' ],
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
