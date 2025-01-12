import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userReducer";

const CTForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    registrationNo: "",
    surname: "",
    firstName: "",
    otherName: "",
    gender: "",
    telegramPhone: "",
    whatsappNumber: "",
    parentName: "",
    parentPhone: "",
    course: "",
    utmeScore: "",
    institution: "",
    subjects: "",
    weakSubject: "",
    mainChallenge: "",
    fear: "",
    paymentDate: "",
    senderName: "",
    bankName: "",
    referral: "",
    reason: "",
    birthday: "",
    receiptFiles: [],
  });

  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      const [firstname, lastname] = user.name.split(" ");
      setFormData({
        ...formData,
        firstName: firstname,
        surname: lastname,
        email: user.email,
      });
    }
  }, [user]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toUpperCase() });
  };

  const handleFileChange = (e: any, key: any) => {
    setFormData({ ...formData, [key]: e.target.files });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="fixed inset-0 bg-gray-400/30 flex items-center justify-center">
      <form
        className="bg-white p-6 h-[90%] overflow-y-auto rounded shadow-md w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold text-gray-700 text-center mb-4">
          CT 2025 UTME (PHASE 2)
        </h1>
        <p className="text-gray-700 text-sm mb-4">
          INPUT ALL RESPONSE IN UPPER CASE. ENSURE YOU FILL YOUR DETAILS
          CORRECTLY BEFORE SUBMISSION.
        </p>

        {/* Email */}
        <label className="text-gray-700 block mb-2">Email*</label>
        <input
          type="email"
          name="email"
          readOnly
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* Registration Number */}
        <label className="text-gray-700 block mb-2">REGISTRATION NO</label>
        <input
          type="text"
          name="registrationNo"
          value={formData.registrationNo}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        {/* Surname */}
        <label className="text-gray-700 block mb-2">SURNAME*</label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* First Name */}
        <label className="text-gray-700 block mb-2">FIRST NAME*</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* Gender */}
        <label className="text-gray-700 block mb-2">GENDER*</label>
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="MALE"
              onChange={handleInputChange}
              required
            />{" "}
            MALE
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              onChange={handleInputChange}
              required
            />{" "}
            FEMALE
          </label>
        </div>

        {/* Other Fields */}
        {[
          { label: "TELEGRAM PHONE NUMBER*", name: "telegramPhone" },
          { label: "WHATSAPP NUMBER*", name: "whatsappNumber" },
          { label: "PARENT/GUARDIAN NAME*", name: "parentName" },
          { label: "PARENT/GUARDIAN ACTIVE NO*", name: "parentPhone" },
          { label: "DESIRED COURSE*", name: "course" },
          { label: "DESIRED UTME SCORE*", name: "utmeScore" },
          { label: "INSTITUTION/SCHOOL OF CHOICE*", name: "institution" },
          { label: "SUBJECTS COMBINATION*", name: "subjects" },
          { label: "WEAK SUBJECT*", name: "weakSubject" },
          { label: "MAIN CHALLENGE*", name: "mainChallenge" },
          { label: "FEAR*", name: "fear" },
          { label: "PAYMENT DETAILS: SENDER'S FULL NAME*", name: "senderName" },
          { label: "PAYMENT DETAILS: SENDER'S BANK NAME*", name: "bankName" },
          { label: "YOUR BIRTHDAY DATE?", name: "birthday" },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-gray-700 block mb-2">{field.label}</label>
            <input
              type="text"
              name={field.name}
              //@ts-ignore
              value={formData[field.name]}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
          </div>
        ))}

        {/* Date of Payment */}
        <label className="text-gray-700 block mb-2">DATE OF PAYMENT*</label>
        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* File Upload */}
        <label className="text-gray-700 block mb-2">
          UPLOAD YOUR PAYMENT RECEIPT*
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={(e: any) => handleFileChange(e, "receiptFiles")}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        {/* Referral */}
        <label className="text-gray-700 block mb-2">
          HOW DID YOU COME ACROSS CT?*
        </label>
        <select
          name="referral"
          value={formData.referral}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        >
          <option value="">Select an option</option>
          <option value="THROUGH YOUR CLASSMATE/FRIEND">
            THROUGH YOUR CLASSMATE/FRIEND
          </option>
          <option value="THROUGH YOUR SIBLING">THROUGH YOUR SIBLING</option>
          <option value="THROUGH YOUR PARENTS/GUARDIAN">
            THROUGH YOUR PARENTS/GUARDIAN
          </option>
          {/* Add other options */}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CTForm;
