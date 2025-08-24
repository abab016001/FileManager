import { useState, useRef } from 'react';
import { openFolderWindow } from '../service/dialogService';
import style from './resource.module.css';
function ResourceAdd({ handleCancle, handleEnter, validate }) {
  const [tagName, setTagName] = useState("");
  const [tagPath, setTagPath] = useState("");
  const validateRef = useRef(null);

  const inputName = (e) => {
    setTagName(e.target.value);
    clearValidateText();
  };

  const inputPath = async () => {
    const { canceled, folderPath } = await openFolderWindow();
    if (!canceled) {
      setTagPath(folderPath);
    }
    clearValidateText();
  }

  const clearValidateText = () => {
    validateRef.current.textContent = "";
  }

  const processEnter = () => {
    const name = tagName;
    const path = tagPath;
    handleEnter({ name, path })
  }

  return (
    <div className={style['add-wrapper']}>
      <h1>新標籤</h1>
      <label>標籤名稱: <input type="text" onChange={(e) => inputName(e)} /></label>
      <button onClick={inputPath}>標籤路徑</button>
      <span className={style['add-wrapper-path-txt']}>{tagPath}</span>
      <span className={style['add-wrapper-validate']} ref={validateRef}>{validate}</span>
      <div className="f-row f-jce">
        <button onClick={handleCancle}>取消</button>
        <button onClick={processEnter}>建立</button>
      </div>
    </div>
  )
}

export default ResourceAdd;