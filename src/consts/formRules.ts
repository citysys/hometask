import { Rule } from "antd/es/form";

export const EMAIL_RULE: Rule = { type: "email", message: 'הדוא"ל לא תקין!' };
export const REQUIRED_RULE: Rule = { required: true, message: "שדה זה הוא חובה!" };
