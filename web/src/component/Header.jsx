import { Scene } from '@/config/setting.json';

function Header({ LoadScene }) {
  return (
    <div style={{ height: "50px" }}>
      <ul className='f-row'>
        <li onClick={() => LoadScene(Scene.Entry.cd)}>{Scene.Entry.name}</li>
        <li onClick={() => LoadScene(Scene.Resource.cd)}>{Scene.Resource.name}</li>
        <li onClick={() => LoadScene(Scene.Task.cd)}>{Scene.Task.name}</li>
      </ul>
    </div>
  )
}

export default Header;