import React from 'react'
import ReactDOM from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import {
  EditorState,
  AtomicBlockUtils,
  RichUtils,
  Entity,
  Modifier,
  CompositeDecorator,
  ContentState,

} from 'draft-js';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';

import { convertFromHTML, convertToHTML } from "draft-convert"

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();
const decorator = composeDecorators(
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });
const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
const resizeablePlugin = createResizeablePlugin();
const plugins = [
  blockDndPlugin,
  focusPlugin,
  imagePlugin,
  linkifyPlugin,
  resizeablePlugin,

];

import * as BTN from './Button'
import * as COLOR from './../api/palette'

import {
  ToggleButton,
  ToggleButtonGroup,

} from '@material-ui/lab';

import {
  CloudUpload,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Title,

} from '@material-ui/icons';

const H1Comp = () =>{
  return <span style={{ fontSize: 16, fontWeight: 'bold' }}>H1</span>
}
const H2Comp = () =>{
  return <span style={{ fontSize: 16, fontWeight: 'bold' }}>H2</span>
}
const H3Comp = () =>{
  return <span style={{ fontSize: 16, fontWeight: 'bold' }}>H3</span>
}
const H4Comp = () =>{
  return <span style={{ fontSize: 16, fontWeight: 'bold' }}>H4</span>
}
const H5Comp = () =>{
  return <span style={{ fontSize: 16, fontWeight: 'bold' }}>H5</span>
}
const H6Comp = () =>{
  return <span style={{ fontSize: 16, fontWeight: 'bold' }}>H6</span>
}

const variantIcon = {
  'header-one': H1Comp,
  'header-two': H2Comp,
  'header-three': H3Comp,
  'header-four': H4Comp,
  'header-five': H5Comp,
  'header-six': H6Comp,
  blockquote: FormatQuote,
  'ul-item': FormatListBulleted,
  'ol-item': FormatListNumbered,
  'code-block': Code
};

const variantInlineIcon = {
  BOLD: FormatBold,
  ITALIC: FormatItalic,
  UNDERLINE: FormatUnderlined,
};

const BLOCK_TYPES = [
  {
    label: 'H1',
    style: 'header-one'
  },
  {
    label: 'H2',
    style: 'header-two'
  },
  {
    label: 'H3',
    style: 'header-three'
  },
  {
    label: 'H4',
    style: 'header-four'
  },
  {
    label: 'H5',
    style: 'header-five'
  },
  {
    label: 'H6',
    style: 'header-six'
  },
  {
    label: 'Blockquote',
    style: 'blockquote'
  },
  {
    label: 'UL',
    style: 'ul-item'
  },
  {
    label: 'OL',
    style: 'ol-item'
  },
  {
    label: 'Code Block',
    style: 'code-block'
  },
  /*
  {
    label: 'Link',
    style: 'link'
  }*/
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  return (
    <div>
      {BLOCK_TYPES.map(
        (type, index) =>
        <StyleButton
          index={index}
          key={type.label}
          active={blockType.includes(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style} />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD'
  }, {
    label: 'Italic',
    style: 'ITALIC'
  }, {
    label: 'Underline',
    style: 'UNDERLINE'
  }, /*{
    label: 'Monospace',
    style: 'CODE'
  }*/
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <ToggleButtonGroup
      value={[]}
      exclusive
      aria-label="text alignment">
      {INLINE_STYLES.map(
        (type, index) =>
        <StyleInlineButton
          index={index}
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style} />
      )}
    </ToggleButtonGroup>
  );
};

const AlignmentControls = (props) =>{
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  function getToggleValue(){
    if(/,/.test(blockType)){
      const splitedBlock = blockType.split(',')
      return splitedBlock[1]
    }
    return null
  }

  return (
    <ToggleButtonGroup
      value={getToggleValue()}
      exclusive
      onChange={ (event, newAlignment) => props.onToggle(newAlignment)}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
        <FormatAlignLeft />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <FormatAlignCenter />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <FormatAlignRight />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function StyleButton(props){
  const Icon = variantIcon[props.style];

  function onToggle(e){
    e.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <ToggleButton
      value={props.style}
      style={{
        ...props.active && { backgroundColor: 'rgba(0, 0, 0, 0.12)', color: 'rgba(0, 0, 0, 0.54)' },
        padding: '0px 11px 0px 12px',
        ...(props.index !== BLOCK_TYPES.length - 1) && { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
        ...(props.index !== 0) && {
          borderLeft: '1px solid transparent',
          marginLeft: -1,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }
      }}
      onClick={onToggle}>
      <Icon />
    </ToggleButton>
  );
}

function StyleInlineButton(props){

  const Icon = variantInlineIcon[props.style];

  function onToggle(e){
    e.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <ToggleButton
      value={props.style}
      style={{
        ...props.active && { backgroundColor: 'rgba(0, 0, 0, 0.12)', color: 'rgba(0, 0, 0, 0.54)' },
        padding: '0px 11px 0px 12px',
        ...(props.index !== INLINE_STYLES.length - 1) && { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
        ...(props.index !== 0) && {
          borderLeft: '1px solid transparent',
          marginLeft: -1,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }
      }}
      onClick={onToggle}>
      <Icon />
    </ToggleButton>
  );
}

/*
const Audio = (props) => {
  const { data } = props
  return <audio controls src={data.src} />;
};

const Image = (props) => {
  const { data } = props
  return <img id={data.name} src={data.src} alt={data.name} />;
};

const Video = (props) => {
  const { data } = props
  return <video controls src={data.src} />;
};

const Media = (props) => {
  if(props.block.getEntityAt(0)){
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const data = entity.getData();
    const type = entity.getType();
    let media;
    if (type === 'audio') {
      media = <Audio data={data} />;
    } else if (type === 'image') {
      media = <Image data={data} />;
    } else if (type === 'video') {
      media = <Video data={data} />;
    }
    return media;
  }
  return null
};
*/

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const editorStyle = {
  fontFamily: 'roboto',
  margin: '1rem auto',
  padding: '0.5rem',
  border: '1px solid #999',
}

export default function RichTextEditor(props){
  const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty())
  const parentRef = React.useRef(null);
  const editorRef = React.useRef(null);
  const [ dataHTML, setDataHTML ] = React.useState(null);
  const [ currentImg, setCurrentImg ] = React.useState(null);

  function focusEditor() {
    editorRef.current.focus();
  }

  function handlePicture(e){
    const file = event.target.files[0]
    if(/image/.test(file.type)){
      uploadFiles(file)
    }else{
      alert(`Not support file ${file.type} yet.`)
    }
  }

  function toggleBlockType(blockType){
    onChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  function toggleInlineStyle(inlineStyle){
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  function toggleAlignment(align){
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    if(/,/.test(blockType)){
      var splitedBlock = blockType.split(',')
      onChange(RichUtils.toggleBlockType(editorState, `${splitedBlock[0]},${align}`))
    }else{
      onChange(RichUtils.toggleBlockType(editorState, `${blockType},${align}`))
    }
  }

  function onImageTagClick(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    /*
    if(/draftJsEmojiPlugin__image__192TI draftJsFocusPlugin__focused__3Mksn|atomic/.test(target.className)){
      if(target.tagName === 'FIGURE'){
        target = target.querySelector('img')
      }
      const currentTarget = target
      if(currentImg){
        if(currentImg.id){
          currentTarget.id = null
          setCurrentImg(currentTarget)
        }else{
          currentTarget.id = 'active-atomic'
          setCurrentImg(currentTarget)
        }
      }else{
        currentTarget.id = 'active-atomic'
        setCurrentImg(currentTarget)
      }
    }*/
  }
/*
  React.useEffect(()=>{
    if(currentImg){ console.log(currentImg); }
    document.addEventListener('click', onImageTagClick);
    return ()=>{
      document.removeEventListener('click', onImageTagClick);
    }
  },[ currentImg ])

  React.useEffect(()=>{
    //
  },[ document.getElementsByClassName('atomic').length ])
*/
  function getBlockStyle(block){
    const blockType = block.getType()
    switch (true) {
      case ( /blockquote|ul-item|ol-item|code-block/.test(blockType) ):
        return blockType;
        break;
      case ( /header/.test(blockType) ):
        if(/,/.test(blockType)){
          var splitedBlock = blockType.split(',')
          return `${splitedBlock[0]} ${getBlockAlign(blockType)}`
        }else{
          return `${blockType}`
        }
        break;
      case ( /atomic/.test(blockType) ):
        return `${blockType}`;
        break;
      case ( /link/.test(blockType) ):
        return `${blockType}`;
        break;
      default:
        return getBlockAlign(blockType);
    }
  }

  function getBlockAlign(blockType){
    switch (true) {
      case ( /left/.test(blockType)):
        return 'alignLeft'
        break;
      case ( /center/.test(blockType)):
        return 'alignCenter'
        break;
      case ( /right/.test(blockType)):
        return 'alignRight'
        break;
      default:
        return null;
    }
  }

  function handleKeyCommand(command){
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }

  function handleDroppedFiles(selection, files){
    files.forEach((file) => {
      uploadDroppedFiles(file, selection)
    });
  }

  function handlePastedFiles(files){
    files.forEach((file) => {
      uploadFiles(file)
    });
  }

  function uploadFiles(file){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    const resultFile = file
    reader.onloadend = function (){
      Object.assign(resultFile, { src: reader.result });
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', resultFile);
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
      setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
      focusEditor()
    }
  }

  function uploadDroppedFiles(file, selection){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    const resultFile = file
    reader.onloadend = function (){
      Object.assign(resultFile, { src: reader.result });
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', resultFile);
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
      setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
      focusEditor()
    }
  }

  function onTab(e){
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
  }

  function onChange(e){
    setEditorState(e)
  }

  function getReturnedHTML(){
    const contentState = editorState.getCurrentContent();
    //setDataHTML(stateToHTML(contentState))
    //setDataHTML(contentState)
    setDataHTML(dataFromConvertToHTML(contentState))
  }

  function handleShowData(){
    const contentState = editorState.getCurrentContent();
    //console.log(stateToHTML(contentState));
    console.log(dataFromConvertToHTML(contentState));
  }

  function dataFromConvertToHTML(contentState){
    const html = convertToHTML({
      styleToHTML: (style) => {
        switch (style) {
          case 'BOLD':
            return <span style={{ fontWeight: 'bold' }} />;
            break;
          case 'ITALIC':
            return <span style={{ fontStyle: 'italic' }} />;
            break;
          case 'UNDERLINE':
            return <span style={{ textDecoration: 'underline' }} />;
            break;
          default:
            return <span />
        }
      },
      blockToHTML: (block) => {
        const type = block.type
        switch (true) {
          case ( /header-one/.test(type) ):
            return (
              <h1 style={{
                fontSize: '6rem',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: '-0.01562em',
                textAlign: type.split(',').length > 1 ? type.split(',')[1] : 'left'
              }} />
            )
            break;
          case ( /header-two/.test(type) ):
            return (
              <h2 style={{
                fontSize: '3.75rem',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: '-0.01562em',
                textAlign: type.split(',').length > 1 ? type.split(',')[1] : 'left'
              }} />
            )
            break;
          case ( /header-three/.test(type) ):
            return (
              <h3 style={{
                fontSize: '3rem',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                lineHeight: 1.04,
                letterSpacing: '0em',
                textAlign: type.split(',').length > 1 ? type.split(',')[1] : 'left'
              }} />
            )
            break;
          case ( /header-four/.test(type) ):
            return (
              <h4 style={{
                fontSize: '2.125rem',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                lineHeight: 1.17,
                letterSpacing: '0.00735em',
                textAlign: type.split(',').length > 1 ? type.split(',')[1] : 'left'
              }} />
            )
            break;
          case ( /header-five/.test(type) ):
            return (
              <h5 style={{
                fontSize: '1.5rem',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                lineHeight: 1.33,
                letterSpacing: '0em',
                textAlign: type.split(',').length > 1 ? type.split(',')[1] : 'left'
              }} />
            )
            break;
          case ( /header-six/.test(type) ):
            return (
              <h6 style={{
                fontSize: '1.25rem',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: '0.0075em',
                textAlign: type.split(',').length > 1 ? type.split(',')[1] : 'left'
              }} />
            )
            break;
          case ( /blockquote/.test(type) ):
            return <blockquote style={{
                borderLeft: '5px solid #eee',
                color: '#666',
                fontFamily: 'Hoefler Text,Georgia,serif',
                fontStyle: 'italic',
                margin: '16px 0',
                padding: '10px 20px',
              }} />
            break;
          case ( /ul-item/.test(type) ):
            return <div style={{
                display: 'list-item',
                listStyleType: 'disc',
                margin: '0 0 10px calc(25px + 1.5em)',
                padding: 0,
              }} />
            break;
          case ( /ol-item/.test(type) ):
            return <div style={{
                display: 'flex',
                listStyleType: 'none',
                margin: '0 0 10px calc(25px + 1.5em)',
                padding: 0,
                '&:before': {
                  counterIncrement: 'ol-counter',
                  content: 'counter(ol-counter) ". "',
                }
              }} />
            break;
          case ( /code-block/.test(type) ):
            return <pre style={{
                backgroundColor: 'rgba(0,0,0,.05)',
                fontFamily: 'Inconsolata,Menlo,Consolas,monospace',
                fontSize: 16,
                padding: 20,
              }} />
            break;
          case ( /atomic/.test(type) ):
            return <div style={{ display: 'flex', justifyContent: 'space-around' }} />
            break;
          case ( /link/.test(type) ):
            return <p style={{
                color: '#1e88e5',
              }} />
            break;
          default:
            return <p>{block.text}<br></br></p>
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.url}>{originalText}</a>;
        }
        if (entity.type === 'IMAGE') {
          return (
            <img src={entity.data.src} style={{
                maxWidth: '100%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }} />
          );
        }
        return originalText;
      }
    })(contentState);
    return html
  }

  function convertDataHTML(){
    //ReactHtmlParser(dataHTML)
    //console.log(dataHTML);
    return ReactHtmlParser(dataHTML)
  }

  React.useEffect(() => {
    focusEditor()
  }, [ ]);

  return (
    <div style={{ margin: 36, position: 'relative' }}>
      <div style={{ fontSize: 36, marginBottom: 100 }}>This is Rich Text Editor</div>
      <div ref={parentRef} style={{ margin: '16px 0' }}>
        <div style={{ position: 'sticky', top: 0, background: 'white', padding: '16px 0' }}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType} />
          <div style={{ display: 'flex', marginTop: 16, marginBottom: 16  }}>
            <AlignmentControls
              editorState={editorState}
              onToggle={toggleAlignment} />
            <div style={{ width: 8 }} />
            <InlineStyleControls
              editorState={editorState}
              onToggle={toggleInlineStyle} />
          </div>
          <div>
            <BTN.Primary
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-block',
              }}>
              <input
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  opacity: 0,
                  display: 'inline-block',
                  zIndex: 1,
                  width: '100%',
                  height: '100%'
                }}
                type="file" onChange={handlePicture} />
              <CloudUpload />
            </BTN.Primary>
          </div>
        </div>
        <div style={editorStyle} className="draftJsEditorContent">
          <Editor
            ref={editorRef}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            handleKeyCommand={handleKeyCommand}
            editorState={editorState}
            onChange={onChange}
            onTab={onTab}
            spellCheck={false/*true*/}
            handlePastedFiles={handlePastedFiles}
            handleDroppedFiles={handleDroppedFiles}
            plugins={plugins} />
        </div>
      </div>
      <BTN.Primary onClick={getReturnedHTML}>
        Save
      </BTN.Primary>
      <BTN.PrimaryText onClick={handleShowData}>
        Show data
      </BTN.PrimaryText>
      <div className="draftJsEditorContent">
        { dataHTML &&
          convertDataHTML()
        }
      </div>
    </div>
  );
}
