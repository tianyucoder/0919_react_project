//照片墙
import React, {Component} from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import {reqDeletePicture} from '../../api'
import {BASE_URL} from '../../config'

//某些时候图片上传会失败，为了展示缩略图，就要将图片转为base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, //是否展示图片预览框
    previewImage: '', //指定的是预览哪个图片（1.url地址(推荐)，2.base64编码）
		//fileList是所有上传后的图片
		fileList: [],
	};
	
	//用户获取所有已经上传完文件的名字
	getImgNames = ()=>{
		let result = []
		this.state.fileList.forEach((fileObj)=>{
			result.push(fileObj.name)
		})
		return result
	}

	//图片预览框关闭按钮的回调
  handleCancel = () => this.setState({previewVisible: false});

	//预览图片按钮的回调
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

	//图片的状态发生变化时，就会调用handleChange（例如：上传成功、上传失败、删除图片）
  handleChange = async ({file,fileList}) => {
		if(file.status === 'done'){
			const {name,url} = file.response.data
			fileList[fileList.length-1].name = name
			fileList[fileList.length-1].url = url
		}
		else if(file.status === 'removed'){
			let result = await reqDeletePicture(file.name)
			const {status,msg} = result
			if(status === 0) message.success('删除成功！')
			else message.error(msg)
		}
		this.setState({fileList});
	}

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
					action= {BASE_URL+'/manage/img/upload'}//服务器地址--必须
					method="post"//上传图片发送请求的方式--必须
					name="image" //参数名---必须
          listType="picture-card" //“墙的效果”
          fileList={fileList} //文件列表
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
