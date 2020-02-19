import React, {Component} from 'react';
import {EditorState,convertToRaw,ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(), //初始化的编辑器
  }

	//当编辑器发生改变时候的回调（用户输入东西的时候）
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
	};
	
	//获取用户输入的富文本
	getRichText = ()=>{
		const {editorState} = this.state;
		return draftToHtml(convertToRaw(editorState.getCurrentContent()))
	}

	//将服务器返回的html变成富文本编辑器
	setRichText = (html)=>{
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState})
    }
	}

  render() {
    const {editorState} = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          //wrapperClassName="demo"
					//editorClassName="demo"
					editorStyle={{
						border:'1px solid black',
						minHeight:'200px',
						padding:'0px 10px',
						lineHeight:'15px'
					}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
			
    );
  }
}