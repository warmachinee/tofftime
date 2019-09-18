import React from 'react';
import { primary, grey } from './../../api/palette'

import {
  Box, Paper
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';


export default function NewsCardSkeleton(props) {

  return(
    <Paper
      style={{
        position: 'relative',
        margin: '12px 0',
        marginRight: 8,
        display: 'flex',
        boxSizing: 'border-box',
        transition: '.2s',
        flexDirection: 'column',
        WebkitFlexDirection: 'column',
        ...( window.innerWidth >= 600 )?
        (
          {
            flexDirection: 'row',
            WebkitFlexDirection: 'row',
            maxHeight: 350,
            height: window.innerWidth * .25,
          }
        ):
        (
          ( window.innerWidth >= 1000 )?
          (
            {
              height: window.innerWidth * .2,
            }
          ):null
        )
      }}>
      <div style={{ width: window.innerWidth >= 600 ? 300 : '100%' }}>
        <Skeleton
          style={{
            boxSizing: 'border-box',
            backgroundColor: grey[300],
            margin: 0,
            width: '100%', height: window.innerWidth >= 500 ? '100%' : 200
          }}/>
      </div>
      <Box
        style={{
          width: '100%',
          padding: '12px 0',
          paddingRight: 16,
          paddingLeft: 12,
          overflow: 'hidden',
          boxSizing: 'border-box',
          ... ( window.innerWidth >= 600 )? { width: '50%' } : null
        }}>
        <Skeleton width="100%" height={28}/>
        <Skeleton width="20%" height={14}/>
        <Skeleton width="70%"/>
        <Skeleton width="90%"/>
        <Skeleton width="90%"/>
      </Box>
    </Paper>
  );
}
