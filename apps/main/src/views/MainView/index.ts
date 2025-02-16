import dynamic from "next/dynamic";

const MainView = dynamic(() => import("./component-root"));

export default MainView