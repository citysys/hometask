import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Col,
} from "antd";

import { GoogleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

interface Values {
  id: string;
}
interface City {
  city_name: string;
}
interface CityStreets {
  id: number;
  city_name: string;
  street_code: number;
  street_name: string;
  street_name_status: string;
  official_code: number;
}
const { Option } = Select;
export default function FormComponent() {
  const [form] = Form.useForm();
  const [cities, setCities] = useState<City[]>([]);
  const [streets, setStreets] = useState<CityStreets[]>([]);

  const handleSubmit = () => {
    return alert("ההרשמה בוצעה בהצלחה");
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `https://data.gov.il/api/3/action/datastore_search?resource_id=1b14e41c-85b3-4c21-bdce-9fe48185ffca`
        );

        const uniqueCities = response.data.result.records
          .reduce((acc: City[], city: City) => {
            if (!acc.some((c) => c.city_name === city.city_name)) {
              acc.push(city);
            }
            return acc;
          }, [])
          .sort((a: City, b: City) => a.city_name.localeCompare(b.city_name));

        setCities(uniqueCities);
        console.log(response.data.result.records);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const handleCityChange = async (city: City) => {
    // Fetch streets based on the selected city
    try {
      const response = await axios.get(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=1b14e41c-85b3-4c21-bdce-9fe48185ffca`
      );

      const streetsByCity: CityStreets[] = [];
      for (
        let index = 0;
        index < response.data.result.records.length;
        index++
      ) {
        if (response.data.result.records[index].city_name === city) {
          streetsByCity.push(response.data.result.records[index]);
        }
      }
      setStreets(streetsByCity);
    } catch (error) {
      console.error("Error fetching streets:", error);
    }
  };

  const validateIsraeliID = (id: string) => {
    if (id.length !== 9) return false;

    const idDigits = id.split("").map(Number);
    const sum = idDigits.reduce((acc, digit, index) => {
      let step = digit * (index % 2 === 0 ? 1 : 2);
      if (step > 9) step -= 9;
      return acc + step;
    }, 0);

    return sum % 10 === 0;
  };
  const onIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idValue = e.target.value;

    if (validateIsraeliID(idValue)) {
      form.setFields([
        {
          name: "id",
          errors: [],
        },
      ]);
    } else {
      form.setFields([
        {
          name: "id",
          errors: ["תעודת זהות לא תקינה"],
        },
      ]);
    }
  };
  const onFinish = (values: Values) => {
    if (!validateIsraeliID(values.id)) {
      form.setFields([
        {
          name: "id",
          errors: ["תעודת זהות לא תקינה"],
        },
      ]);
      return;
    }
  };
  return (
    <div className="form-container">
      <Form
        layout="vertical"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img
          className="city-logo"
          src="src\assets\logoCity.png"
          alt="citySystemsLogo"
        />

        <Row className="form-header">
          <Col>
            <h1>{"צור חשבון"}</h1>
            <Row
              className="row-form"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{"לחברות או אדם פרטי"}</p>
              <p style={{ color: "red" }}>
                {" שים לב כל השדות הם שדות חובה *"}
              </p>
            </Row>
          </Col>
        </Row>

        <Row className="row-form">
          <Col span={11}>
            <Form.Item name={"fullName"} label={"שם מלא"} labelAlign="right">
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form onFinish={onFinish} form={form}>
              <Form.Item name={"id"} label={"תעודת זהות"}>
                <Input onChange={onIDChange} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row className="row-form">
          <Col>
            <Form.Item
              name={"dateOfBirth"}
              label={"(DD/MM/YY) תאריך לידה"}
              labelAlign="right"
            >
              <DatePicker
                style={{ borderRadius: "6px", height: "35px", width: "350px" }}
                placeholder=" "
                format="DD/MM/YYYY"
                inputReadOnly={true}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name={"email"} label={"אימייל"}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row className="row-form">
          <Col span={11}>
            <Form.Item name={"city"} label={"עיר"}>
              <Select onChange={handleCityChange}>
                {cities.map((city) => (
                  <Option key={city.city_name} value={city.city_name}>
                    {city.city_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name={"street"} label={"רחוב"}>
              <Select disabled={!streets.length}>
                {streets.map((street) => (
                  <Option key={street.id} value={street.street_name}>
                    {street.street_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name={"home number"} label={"מספר בית"}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row className="row-form">
          <Col span={11}>
            <Form.Item name={"password"} label={"סיסמא"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name={"validatePassword"} label={"אימות סיסמא"}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Checkbox
          style={{
            alignSelf: "end",
            margin: "2px",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <p>זכור אותי</p>
        </Checkbox>
        <Checkbox
          style={{
            alignSelf: "end",
            margin: "2px",
            marginBottom: "14px",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          קראתי ואני מאשר את {<a href="lorem">תנאי השימוש</a>}
        </Checkbox>
        <Row className="row-form">
          <Button
            type="default"
            style={{
              width: "300px",
              height: "40px",
              backgroundColor: "#2c384e",
              color: "white",
            }}
          >
            להתחברות עם חשבון גוגל {<GoogleOutlined twoToneColor="" />}{" "}
          </Button>
          <Button
            type="primary"
            style={{ width: "300px", height: "40px" }}
            onClick={handleSubmit}
          >
            צור חשבון
          </Button>
        </Row>
        <Row style={{ margin: "25px" }}>
          <Button type="link">
            <img
              style={{ height: "45px", padding: "10px" }}
              src="src\assets\GetItOnGooglePlay_Badge_Web_color_English.png"
              alt="googlePlayButton"
            />
          </Button>
          <Button type="link">
            <img
              style={{ height: "45px", padding: "10px" }}
              src="src\assets\Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
              alt="appleAppStoreButton"
            />
          </Button>
        </Row>
      </Form>
    </div>
  );

  // return (
  //   <div className="form-container">
  //     <img
  //       className="city-logo"
  //       src="src\assets\logoCity.png"
  //       alt="citySystemsLogo"
  //     />
  //     <div className="form-header">
  //       <h1>צור חשבון</h1>
  //       <p style={{ textAlign: "end" }}>לחברות או אדם פרטי</p>
  //     </div>
  //     <div className="row-form">
  //       <Label labelName="שם מלא" name={"fullName"} />
  //       <Form
  //         form={form}
  //         onFinish={onFinish}
  //         className="signUp-form-label"
  //         layout="vertical"
  //       >
  //         <Form.Item name={"id"} label={"תעודת זהות"}>
  //           <Input
  //             style={{ borderRadius: "4px", height: "40px", marginTop: "3px" }}
  //             onChange={onIDChange}
  //           />
  //         </Form.Item>
  //       </Form>
  //     </div>
  //     <div className="row-form">
  //       <div className="signUp-form-label">
  //         <p>{"(MM/DD/YY) תאריך לידה"}</p>
  //         <Form.Item name={"dateOfBirth"}>
  //           <DatePicker
  //             style={{ borderRadius: "4px", height: "40px", width: "360px" }}
  //             placeholder=" "
  //             format="DD/MM/YYYY"
  //             inputReadOnly={true}
  //           />
  //         </Form.Item>
  //       </div>
  //       <Label labelName="אימייל" name={"email"} />
  //     </div>
  //     <div className="row-form">
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           textAlign: "right",
  //         }}
  //       >
  //         <p>עיר</p>
  //         <Form.Item
  //           name="city"
  //           rules={[{ message: "נא לבחור עיר" }]}
  //           className="signUp-form-label"
  //         >
  //           <Select
  //             onChange={handleCityChange}
  //             style={{ height: "40px", width: "360px" }}
  //           >
  //             {cities.map((city) => (
  //               <Option key={city.city_name} value={city.city_name}>
  //                 {city.city_name}
  //               </Option>
  //             ))}
  //           </Select>
  //         </Form.Item>
  //       </div>

  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "row-reverse",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <div style={{ marginLeft: "58px", textAlign: "right" }}>
  //           <p className="">רחוב</p>
  //           <Form.Item name="street" rules={[{ message: "נא לבחור רחוב" }]}>
  //             <Select
  //               disabled={!streets.length}
  //               style={{ height: "40px", width: "200px" }}
  //             >
  //               {streets.map((street) => (
  //                 <Option key={street.id} value={street.street_name}>
  //                   {street.street_name}
  //                 </Option>
  //               ))}
  //             </Select>
  //           </Form.Item>
  //         </div>
  //         <div style={{ textAlign: "right" }}>
  //           <p>מספר בית</p>
  //           <Form.Item name="homeNumber">
  //             <Input
  //               style={{ borderRadius: "4px", width: "100px", height: "40px" }}
  //             />
  //           </Form.Item>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="row-form">
  //       <Label labelName="סיסמא" name={"password"} />
  //       <Label labelName="אימות סיסמא" name={"authPassword"} />
  //     </div>

  //     <Checkbox
  //       style={{
  //         alignSelf: "end",
  //         margin: "2px",
  //         display: "flex",
  //         flexDirection: "row-reverse",
  //       }}
  //     >
  //       <p>זכור אותי</p>
  //     </Checkbox>
  //     <Checkbox
  //       style={{
  //         alignSelf: "end",
  //         margin: "2px",
  //         marginBottom: "14px",
  //         display: "flex",
  //         flexDirection: "row-reverse",
  //       }}
  //     >
  //       קראתי ואני מאשר את {<a href="lorem">תנאי השימוש</a>}
  //     </Checkbox>
  //     <div className="row-form">
  //       <Button
  //         type="default"
  //         style={{
  //           width: "300px",
  //           height: "40px",
  //           backgroundColor: "#2c384e",
  //           color: "white",
  //         }}
  //       >
  //         להתחברות עם חשבון גוגל {<GoogleOutlined twoToneColor="" />}{" "}
  //       </Button>
  //       <Button
  //         type="primary"
  //         style={{ width: "300px", height: "40px" }}
  //         onClick={handleSubmit}
  //       >
  //         צור חשבון
  //       </Button>
  //     </div>
  //     <div style={{ alignSelf: "center", padding: "25px" }}>
  //       יש לך חשבון קיים ?<a href="lorem">להתחברות</a>
  //     </div>
  //     <div style={{ padding: "4px" }}>
  //       <Button type="link">
  //         <img
  //           style={{ height: "45px", padding: "10px" }}
  //           src="src\assets\GetItOnGooglePlay_Badge_Web_color_English.png"
  //           alt="googlePlayButton"
  //         />
  //       </Button>
  //       <Button type="link">
  //         <img
  //           style={{ height: "45px", padding: "10px" }}
  //           src="src\assets\Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
  //           alt="appleAppStoreButton"
  //         />
  //       </Button>
  //     </div>
  //   </div>
  // );
}
