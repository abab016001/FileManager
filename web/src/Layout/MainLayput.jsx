import Header from "@/component/Header";
import SideNav from "@/component/SideNav";
import Main from "@/component/Main";
import { Scene } from '@/config/setting.json';
import { useState } from "react";

function MainLayout() {
  const [scene, setScene] = useState(Scene.Resource.cd);

  const LoadScene = (sceneName) => {
    setScene(sceneName);
  }

  return (
    <div className="container">
      <Header LoadScene={LoadScene} />
      <main>
        <Main Scene={scene} />
      </main>
    </div>
  );
}

export default MainLayout;