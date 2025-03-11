import "./Header.css";
import phone from "../../assets/phone.png";
function Header() {
  return (
    <header className="header">
      <h1>
        רישוי עסקים מהמשרד ומכל מקום <span>אפליקציית שטח למפקח</span>
      </h1>
      <div className="image-container">
        <img src={phone} alt="phone" />
      </div>
    </header>
  );
}

export default Header;
