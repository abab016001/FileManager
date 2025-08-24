import Entry from "@/page/Entry";
import Resource from "@/page/Resource";
import Task from "@/page/Task";
import { Scene } from '@/config/setting.json';

const sceneComponents = {
  [Scene.Entry.cd]: Entry,
  [Scene.Resource.cd]: Resource,
  [Scene.Task.cd]: Task
};

function Main({ Scene: sceneCd }) {
  const Component = sceneComponents[sceneCd];
  return Component ? <Component /> : null;
}

export default Main;