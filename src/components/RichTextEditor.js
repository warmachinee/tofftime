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
const plugins = [
  blockDndPlugin,
  focusPlugin,
  imagePlugin,
  linkifyPlugin,

];

import * as BTN from './Button'
import * as COLOR from './../api/palette'

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const BLOCK_TYPES = [
  {
    label: 'H1',
    style: 'header-one'
  }, {
    label: 'H2',
    style: 'header-two'
  }, {
    label: 'H3',
    style: 'header-three'
  }, {
    label: 'H4',
    style: 'header-four'
  }, {
    label: 'H5',
    style: 'header-five'
  }, {
    label: 'H6',
    style: 'header-six'
  }, {
    label: 'Blockquote',
    style: 'blockquote'
  }, {
    label: 'UL',
    style: 'unordered-list-item'
  }, {
    label: 'OL',
    style: 'ordered-list-item'
  }, {
    label: 'Code Block',
    style: 'code-block'
  }
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  return (
    <div>
      {BLOCK_TYPES.map(
        (type) => <StyleButton
          key={type.label}
          active={blockType.includes(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
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
  }, {
    label: 'Monospace',
    style: 'CODE'
  }
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div>
      {INLINE_STYLES.map(
        type => <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const AlignmentControls = (props) =>{
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  return (
    <div>
      <StyleButton
        active={/left/.test(blockType)}
        label={'Left'}
        onToggle={props.onToggle}
        style={'left'}
      />
      <StyleButton
        active={/center/.test(blockType)}
        label={'Center'}
        onToggle={props.onToggle}
        style={'center'}
      />
      <StyleButton
        active={/right/.test(blockType)}
        label={'Right'}
        onToggle={props.onToggle}
        style={'right'}
      />
    </div>
  );
}

function StyleButton(props){

  function onToggle(e){
    e.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <BTN.PrimaryOutlined style={{ ...props.active && { backgroundColor: '#333' } }} onClick={onToggle}>
      {props.label}
    </BTN.PrimaryOutlined>
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
      console.log();
      onChange(RichUtils.toggleBlockType(editorState, `${splitedBlock[0]},${align}`))
    }else{
      onChange(RichUtils.toggleBlockType(editorState, `${blockType},${align}`))
    }
  }

  function getBlockStyle(block){
    const blockType = block.getType()
    switch (true) {
      case ( /blockquote/.test(blockType) ):
        return `superFancyBlockquote ${getBlockAlign(blockType)}`;
        break;
      case ( /header-one/.test(blockType) ):
        return `header-one ${getBlockAlign(blockType)}`
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
        console.log('style ', style);
        if (style === 'BOLD') {
          return <span style={{ color: 'blue' }} />;
        }
      },
      blockToHTML: (block) => {
        const type = block.type
        switch (true) {
          case ( /header-one/.test(type) ):
            return (
              <p style={{ fontSize: 36, fontWeight: 'bold',
                textAlign: type.split(',').length > 1 ? type.split(',')[1] : 'left'
              }} />
            )
            break;
          default:
            return <p />
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.url}>{originalText}</a>;
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
        <div style={{ position: 'sticky', top: 0, background: 'white' }}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
          <AlignmentControls
            editorState={editorState}
            onToggle={toggleAlignment}
          />
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
            <CloudUploadIcon />
          </BTN.Primary>
        </div>
        <div style={editorStyle}>
          <Editor
            ref={editorRef}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            handleKeyCommand={handleKeyCommand}
            editorState={editorState}
            onChange={onChange}
            onTab={onTab}
            spellCheck={true}
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
      <div className="draftJsContent">
        { dataHTML &&
          convertDataHTML()
        }
      </div>
    </div>
  );
}
