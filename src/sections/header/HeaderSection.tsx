import "./HeaderSection.css";
import phone from "../../assets/phone.png";
function HeaderSection() {
  return (
    <header className="header-section">
      <h1>
        רישוי עסקים מהמשרד ומכל מקום <span>אפליקציית שטח למפקח</span>
      </h1>
      <div className="image-container">
        <img src={phone} alt="phone" />
      </div>
    </header>
  );
}

export default HeaderSection;
