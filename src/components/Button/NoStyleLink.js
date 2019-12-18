import React from 'react';
import { Link } from "react-router-dom";

export default function NoStyleLink(props){
  return <Link {...props} style={{ textDecoration: 'none', color: 'inherit', ...props.style }}>{props.children}</Link>
}
