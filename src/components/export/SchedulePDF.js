import React from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as API from './../../api'
import * as COLOR from './../../api/palette'
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
  pdfMake.createPdf(PDFFile(data, matchDetail, sess)).download(`Schedule ${matchDetail.title} (${matchDetail.matchid}).pdf`);
}

function PDFFile(data, matchDetail, sess){
  let temp = []
  let player = []
  for(var i = 0;i < data.length;i++){
    var arr = []
    arr.push(
      {text: data[i].teamno, ...( !(data[i].teamno%2 === 0) && {fillColor: COLOR.grey[300] })},
      {text: (
        matchDetail.team.filter( item =>{
          return item.teamno === data[i].teamno
        }).map( md => md.teamname )
      ), ...( !(data[i].teamno%2 === 0) && {fillColor: COLOR.grey[300] })},
      {text: data[i].fullname + '\t' + data[i].lastname, alignment: 'left',
        margin: [16, 0, 0, 0], ...( !(data[i].teamno%2 === 0) && {fillColor: COLOR.grey[300] })},
      {text: (
        matchDetail.team.filter( item =>{
          return item.teamno === data[i].teamno
        }).map( md => md.note )
      ), ...( !(data[i].teamno%2 === 0) && {fillColor: COLOR.grey[300] })}
    )
    player.push(arr)
  }

  let labelBody = (
    [
      {text: ( API._getWord(sess && sess.language).Team ), color: 'white', fillColor: COLOR.grey[900] },
      {text: ( API._getWord(sess && sess.language).Time ), color: 'white', fillColor: COLOR.grey[900]},
      {
        text: ( API._getWord(sess && sess.language).First_name ),
        color: 'white', fillColor: COLOR.grey[900], alignment: 'left', margin: [16, 0, 0, 0]
      },
      {text: ( API._getWord(sess && sess.language).Note ), color: 'white', fillColor: COLOR.grey[900], margin: [8, 0, 8, 0]},
    ]
  )

  let label = [
    [
      {text: `${API._getWord(sess && sess.language).Schedule}\t`, fontSize: 36},
    ],
    {text: matchDetail.title + '\t', fontSize: 30, bold: true},
    {text: `${API._getWord(sess && sess.language).Course}\t${matchDetail.location} (${matchDetail.locationversion})\t`, fontSize: 24},
    {
      text: `${API._getWord(sess && sess.language).Date}\t${API._dateToString(matchDetail.date)}` + '\t',
      fontSize: 24, margin: [0, 0, 0, 8]
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
