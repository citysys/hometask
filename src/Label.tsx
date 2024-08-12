import { Form, Input } from "antd";

interface LabelProps {
  labelName: string;
  name: string;
}
const Label: React.FC<LabelProps> = ({ labelName, name }) => {
  return (
    <div className="signUp-form-label">
      <p>{labelName}</p>
      <Form.Item name={name}>
        <Input style={{ borderRadius: "4px", height: "40px" }} />
      </Form.Item>
    </div>
  );
};

export default Label;
