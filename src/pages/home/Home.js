import { useAuthContext } from "../../hooks/useAuthContext";
import "./Home.css";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <div className="home">
      Home page
      <div>
        <div>{user.name}</div>
        <div>{user.age}</div>
      </div>
    </div>
  );
}
