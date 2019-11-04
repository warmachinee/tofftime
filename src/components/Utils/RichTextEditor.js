import React from 'react';
import ReactQuill, { Quill } from 'react-quill';

var QuillFont = Quill.import('formats/font');

QuillFont.whitelist = ['inconsolata', 'roboto', 'mirza', 'arial', 'monospace'];

Quill.register(QuillFont, true);

const modules = {
	toolbar: [
    [{ 'font': [false].concat(QuillFont.whitelist) }],
		/*
    [{ 'size': ['small', false, 'large', 'medium', 'huge'] }],*/
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
		[{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
		['link', 'image', 'video'],
    ['clean']
  ]
};

const formats = [
  'font',
	/*
  'size',*/
	'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'align',
  'color', 'background',
	'link', 'image', 'video'
];

export default function RichTextEditor(props){
	const { HTMLData, handleGetHTML } = props
  const [ comments, setComments ] = React.useState(HTMLData ? HTMLData : '')
	const quillRef = React.useRef(null)

  function rteChange(content, delta, source, editor){
		setComments(editor.getHTML())
  }

	React.useEffect(()=>{
		handleGetHTML(comments)
		if(quillRef.current){
			quillRef.current.focus();
		}
	},[ comments ])

  return (
		<ReactQuill
			ref={quillRef}
			modules={modules}
			formats={formats}
			onChange={rteChange}
			value={comments || ''}
			theme="snow" />
  );
}
