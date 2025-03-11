import "./ContactSection.css";
import logo from "../../assets/logo.png";
import ContactForm from "../../components/contact-form/ContactForm";
function ContactSection() {
  return (
    <section className="content-section">
      <img src={logo} alt="logo" />
      <div className="content-header">
        <div>
          <h2>צור חשבון</h2>
          <p>לחברות או אדם פרטי</p>
        </div>
        <p>*שים לב כל השדות הם שדות חובה</p>
      </div>
      <ContactForm />
    </section>
  );
}

export default ContactSection;
