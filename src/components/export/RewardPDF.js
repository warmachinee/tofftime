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

import MenuItem from '@material-ui/core/MenuItem';

export default function RewardPDF(props){
  const { data, matchClass, reward, sess, sortBy, menuClose, mainClassSelected } = props
  const rewardSelected = reward && !('status' in reward) && reward.filter( item =>{
    return ( item.classno === matchClass.classno )
  })

  function handleDownload(){
    var matchClassName = (
      data.mainclass[parseInt(mainClassSelected) - 1].type === 'group' ?
      matchClass.classname
      :
      API._handleAmateurClass(matchClass.classno)
    )
    pdfMake.createPdf(PDFFile()).download('Reward ' + matchClassName + '.pdf');
  }

  function PDFFile(){
    var classname = data.mainclass[parseInt(mainClassSelected) - 1].type === 'group' ? matchClass.classname : API._handleAmateurClass(matchClass.classno)
    let temp = []
    let player = []
    for(var i = 0;i < rewardSelected.length;i++){
      var arr = []
      arr.push(
        {text: rewardSelected[i].fullname + '\t' + rewardSelected[i].lastname, alignment: 'left', margin: [16, 0, 0, 0]},
      )
      if(data.mainclass[parseInt(mainClassSelected) - 1].type === 'group'){
        arr.push(
          {text: rewardSelected[i].par},
        )
      }else{
        arr.push(
          {text: rewardSelected[i].hc},
          {text: rewardSelected[i][data.scorematch === 0 ? 'net36sys' : 'sf36sys']},
        )
      }
      arr.push(
        {text: rewardSelected[i].prize, fillColor: COLOR.grey[300], alignment: 'right', bold: true, margin: [8, 0, 8, 0]},
        {text: ''}
      )
      player.push(arr)
    }

    let labelBody = [
      {
        text: ( API._getWord(sess && sess.language).First_name ),
        color: 'white', fillColor: COLOR.grey[900], alignment: 'left', margin: [16, 0, 0, 0]
      }, ...(
        data.mainclass[parseInt(mainClassSelected) - 1].type === 'group' ?
        [{text: 'PAR', color: 'white', fillColor: COLOR.grey[900]}]
        :
        [
          {text: 'HC', color: 'white', fillColor: COLOR.grey[900]},
          {text: data.scorematch === 0 ? 'NET' : 'SF', color: 'white', fillColor: COLOR.grey[900]}
        ]
      ),
      {text: ( API._getWord(sess && sess.language).Prize ), color: 'white', fillColor: COLOR.grey[900], margin: [8, 0, 8, 0]},
      {text: ( API._getWord(sess && sess.language).Sign ), color: 'white', fillColor: COLOR.grey[900]},
    ]

    let label = [
      [
        {text: `${( API._getWord(sess && sess.language).Prize )}\t`, fontSize: 36},
        {text: data.title, fontSize: 30},
      ],
      {
        text: `${( API._getWord(sess && sess.language).Group )}\t` + classname,
        fontSize: 28, bold: true, margin: [0, 0, 0, 8]
      },
      {
        style: 'table',
  			table: {
  				widths: ['*', ...(
            data.mainclass[parseInt(mainClassSelected) - 1].type === 'group' ? [50] : [50, 50]
          ), 'auto', '30%'],
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

  function handleClick(){
    menuClose()
    handleDownload()
  }

  return(
    <MenuItem disabled={!(rewardSelected && rewardSelected.length > 0) || (reward && ('status' in reward))} onClick={handleClick} color="primary">
      { API._getWord(sess && sess.language).Reward }
    </MenuItem>
  );
}
