import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

const DropzoneContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  section {
    div {
      cursor: pointer;
      width: 300px;
      height: 240px;
      border: 1px solid #aaa;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 40px;
        height: 40px;
        color: #aaa;
      }
    }
  }
  .imageView {
    display: flex;
    width: 350px;
    height: 240px;
    overflow-x: scroll;
    img {
      max-height: 100%;
      cursor: pointer;
    }
  }
`;
interface FileUploadPropTypes {
  updateImages: (images: Array<string>) => void;
}
export default function FileUpload({
  updateImages,
}: FileUploadPropTypes): JSX.Element {
  const [images, setImages] = useState<string[]>([]);
  const onDrop = (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('image', file);
    });
    axios.post('/api/product/image', formData).then(res => {
      setImages([...images, ...res.data]);
      updateImages([...images, ...res.data]);
    });
  };
  const deleteImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const name = e.currentTarget.src.split('/')[4];
    setImages(images.filter(v => v !== `uploads/${name}`));
    updateImages(images.filter(v => v !== `uploads/${name}`));
  };
  return (
    <DropzoneContainer>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <PlusOutlined />
            </div>
          </section>
        )}
      </Dropzone>
      <div className="imageView">
        {images.map(image => (
          <img
            key={image}
            src={`http://localhost:8000/${image}`}
            alt="image"
            onClick={deleteImage}
          />
        ))}
      </div>
    </DropzoneContainer>
  );
}
