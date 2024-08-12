import { Form, Input } from "antd";

interface LabelProps {
  labelName: string;
  name: string;
}
const Label: React.FC<LabelProps> = ({ labelName, name }) => {
  return (
    <div className="signUp-form-label">
      <Form layout="vertical"
      labelCol={{span: 4}}>
        
        <Form.Item name={name}
        label={labelName}
      >
        <Input style={{ borderRadius: "4px", height: "40px" }} />
      </Form.Item>
      </Form>
      
    </div>
  );
};

export default Label;
