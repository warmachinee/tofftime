import React from 'react'

export default function ScoreTableChip(props){
  const { dotColor, label } = props

  return(
    <div style={{ display: 'flex', padding: 16 }}>
      <div
        style={{
          width: 18, height: 18, borderRadius: '50%', border: '.5px solid grey',
          backgroundColor: dotColor ? dotColor : 'black',
          marginRight: 8
        }}></div>
      <p style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Monospace', marginTop: 'auto' }}>
        { label ? label : 'Label' }
      </p>
    </div>
  );
}
