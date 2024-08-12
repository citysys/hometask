import "./adsSection.scss";

interface AdsSectionProps {
  type?: string;
}

export default function AdsSection({ type }: AdsSectionProps) {
  const sectionClass = type === "login" ? "loginDisplay" : "signInDisplay";

  return (
    <div className={`adsSection ${sectionClass}`}>
      <h1>רישוי עסקים מהמשרד ומכל מקום אפליקציית שטח למפקח</h1>
      <div className="phoneWrapper">
        <div className="phoneImage"></div>
        <div className="phoneImage"></div>
        <div className="phoneImage"></div>
      </div>
    </div>
  );
}
