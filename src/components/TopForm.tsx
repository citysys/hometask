import { FC } from "react";

const TopForm: FC = () => {
    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
            <div>
                <img src="/citysys-logo.svg" className="web-logo" />
                <h3>צור חשבון</h3>
                <h4>לחברות או אדם פרטי</h4>
            </div>
            <p className="require-text">
                *שים לב כל השדות הם שדות חובה
            </p>
        </div>
    );
}

export default TopForm;

