import React, { Component } from 'react'

import Heading from '../components/heading';
import Button from '../components/button';

import '../assets/addCodePage.css';
import FileImage from '../assets/images/file-image-regular.svg';

class addCodePage extends Component {

    state = {
        uploaded: false,
        selectedFile: null,
        imgSrc: null,
        imgEntered: false,
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            uploaded: true
        });
        this.fileDisplay(event.target.files[0]);
    }

    fileDisplay = (file) => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                imgSrc: [
                 reader.result   
                ],
                imgEntered: true
            });
        console.log(url);
        }
        
    }

    fileUploadHandler = () => {
        console.log("1:",this.state.selectedFile);
        const fd = new FormData();
        fd.append('image',this.state.selectedFile);
        console.log(fd);
    }

    handleUrl = (event) => {
        this.setState({
            imgSrc: event.target.value
        })
    }

    handleURLSubmit = () => {
        this.setState({
            uploaded: true
        })
    }

    render() {
        return (
            <div>
                <Heading />
                <p className="paraStyle">Drop an image or click to browse</p>
                
                <input type="file" name="file" id="file" className="inputfile" onChange={this.fileSelectedHandler}/>
                {this.state.uploaded ? <img className="imageSelected" src={this.state.imgSrc} alt="selectedImage" /> :<label htmlFor="file"><img src={FileImage} alt="fileimage"></img></label> } 
                
                {this.state.uploaded ? 
                <>
                    <Button name="Crop Image"></Button>
                    <Button name="Upload" click={this.fileUploadHandler}></Button>
                    {this.state.imgEntered ? <p className="displayImgName"> {this.state.selectedFile.name} </p> : null }
                </>
                : 
                <>
                    <label className="labelStyle">Or enter the image URL: </label>
                    <input className="inputStyle" type="text" onChange={this.handleUrl}></input>           
                    <Button name="Submit URL" click={this.handleURLSubmit}></Button>
                </>
                }
            </div>
        )
    }
}

export default addCodePage