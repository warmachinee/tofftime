import React from 'react'
import { primary } from './../../api/palette'

import {
  Typography,
} from '@material-ui/core';

export default function LabelText(props){
  const { text = 'No text', paddingTop = 16, paddingLeft = 12 } = props

  return(
    <div style={{ paddingTop: paddingTop, paddingLeft: paddingLeft }}>
      <Typography variant="h5"
        style={{
          borderBottom: `4px solid ${primary[600]}`,
          width: /Chrome/.test(navigator.userAgent) ? 'fit-content' : '100px',
          width: 'fit-content',
          padding: 16,
          paddingBottom: 8,
          paddingLeft: 8,
        }}>
        {text}
      </Typography>
    </div>
  );
}
