import BlockUI from "@/component/BlockUI";
import ResourceAdd from "./ResourceAdd";
import { useState, useEffect } from "react";
import { Util } from "../logic/util";
import { Fn } from "@/logic/ResourceLogic.js";

function Resource() {
  const [tagList, setTagList] = useState([]);
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editTag, setEditTag] = useState(null);
  const [validate, setValidate] = useState("");

  /** 初始化 */
  useEffect(() => {
    getAllTags();
    Util.YYYMMDD("1140824231832331");
  }, []);

  const clickAdd = () => {
    setValidate("");
    setAddShow(true);
  }

  const addCancle = () => setAddShow(false);

  const addEnter = async ({ name, path }) => {
    const v = Fn.validate({ name, path });
    if (v) {
      setValidate(v);
      return;
    };
    if (tagList.includes(name)) {
      setValidate("標籤名稱已存在!");
      return;
    }
    const { result } = await Fn.processTagAddSave({ name, path });
    if (result.data) {
      alert("新增成功");
      getAllTags();
    } else {
      alert("新增失敗");
    }
    setAddShow(false);
  }

  const getAllTags = async () => {
    const { result } = await Fn.processQueryTags(null);
    setTagList(result.data);
  }

  const allGridClick = (e) => {
    const { checked } = e.target;
    const gridboxs = [...document.querySelectorAll("#resource-grid-table [role=gridbox]")];
    gridboxs.forEach(item => item.checked = checked);
  }

  const clickEdit = (e) => {
    const ID = e.getAttribute("data-id");
    setEditShow();
  }

  const editCancle = () => setEditShow(false);
  const editEnter = () => {

  }
  return (
    <div>
      <header className="f-row f-jcsb">
        <div layout="left">
          <div id="resource-root"></div>
        </div>
        <div layout="right">
          <input type="text" />
          <button>查詢</button>
          <button onClick={clickAdd}>新增標籤</button>
        </div>
      </header>
      <main>
        <table className="w-100" id="resource-grid-table">
          <thead>
            <tr>
              <td width="2%"><input type="checkbox" onClick={(e) => allGridClick(e)} /></td>
              <td width="20%"><span>名稱</span></td>
              <td width="50%"><span>路徑</span></td>
              <td width="12%"><span>建立日期時間</span></td>
              <td width="12%"><span>異動日期時間</span></td>
              <td width="4%"><span>...</span></td>
            </tr>
          </thead>
          <tbody>
            {
              tagList.map((item, index) => (
                <tr key={index}>
                  <td><input type="checkbox" data-id={item.ID} role="gridbox" /></td>
                  <td><span role="NAME">{item.NAME}</span></td>
                  <td><span role="PATH">{item.PATH}</span></td>
                  <td><span role="CREATE_DATETIME">{Util.YYYMMDD(item.CREATE_DATETIME)}</span></td>
                  <td><span role="UPDATE_DATETIME">{Util.YYYMMDD(item.UPDATE_DATETIME)}</span></td>
                  <td><button data-id={item.ID} onClick={clickEdit}>編輯</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </main>
      {
        addShow && (
          <BlockUI handleCancle={addCancle}>
            <ResourceAdd handleCancle={addCancle} handleEnter={addEnter} validate={validate} />
          </BlockUI>
        )
      }
      {
        editShow && (
          <BlockUI handleCancle={editCancle}>
            <ResourceAdd handleCancle={editCancle} handleEnter={editEnter} validate={validate} />
          </BlockUI>
        )
      }
    </div>
  )
}

export default Resource;