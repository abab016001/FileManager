import { Scene } from '@/config/setting.json';
function SideNav({ LoadScene }) {
  return (
    <ul>
      <li onClick={() => LoadScene(Scene.Entry.cd)}>{Scene.Entry.name}</li>
      <li onClick={() => LoadScene(Scene.Resource.cd)}>{Scene.Resource.name}</li>
      <li onClick={() => LoadScene(Scene.Task.cd)}>{Scene.Task.name}</li>
    </ul>
  )
}

export default SideNav;