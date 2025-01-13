import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userReducer";
import { examsApiSlice } from "../../../services/api/examsSlice";

const StudentInfoModal = ({ close, next }: any) => {
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
  const accountExams = examsApiSlice.useGetAccountExamsQuery(null);

  const currentExam = accountExams?.data?.data.find((e: any) =>
    e.name.toLowerCase().includes("jamb")
  );
  const subjects: { id: number; name: string }[] =
    currentExam?.AccountExam.subjects ?? [];

  useEffect(() => {
    if (user) {
      const [firstname, lastname] = user.name.split(" ");
      setFormData({
        ...formData,
        firstName: firstname,
        surname: lastname,
        email: user.email,
        subjects: subjects?.map((s: any) => s.name).join(", "),
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
          className="w-full p-2 border text-gray-400 border-gray-300 rounded mb-4"
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

        {/* First Name */}
        <label className="text-gray-700 block mb-2">OTHER NAME*</label>
        <input
          type="text"
          name="otherName"
          value={formData.otherName}
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

        <div>
          <label className="text-gray-700 block mb-2">
            SUBJECT COMBINATION*
          </label>
          <input
            type="text"
            name={"course"}
            //@ts-ignore
            value={formData.subjects}
            onChange={handleInputChange}
            className={`w-full p-2 border border-gray-300 rounded mb-4 text-gray-400
              `}
            required
            readOnly
          />
        </div>

        <label className="text-gray-700 block mb-2">WEAK SUBJECT?*</label>
        <select
          name="weakSubject"
          value={formData.weakSubject}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        >
          {subjects?.map((s: any) => (
            <option value={s.name}>{s.name}</option>
          ))}
          <option value="">Select an option</option>
        </select>

        {/* Other Fields */}
        {[
          {
            label: "TELEGRAM PHONE NUMBER*",
            name: "telegramPhone",
            readOnly: false,
          },
          {
            label: "WHATSAPP NUMBER*",
            name: "whatsappNumber",
            readOnly: false,
          },
          {
            label: "PARENT/GUARDIAN NAME*",
            name: "parentName",
            readOnly: false,
          },
          {
            label: "PARENT/GUARDIAN ACTIVE NO*",
            name: "parentPhone",
            readOnly: false,
          },
          { label: "DESIRED COURSE*", name: "course", readOnly: true },
          // { label: "DESIRED UTME SCORE*", name: "utmeScore", readOnly: false },
          {
            label: "INSTITUTION/SCHOOL OF CHOICE*",
            name: "institution",
            readOnly: false,
          },
          // { label: "SUBJECTS COMBINATION*", name: "subjects", readOnly: false },
          // { label: "WEAK SUBJECT*", name: "weakSubject", readOnly: false },
          { label: "MAIN CHALLENGE*", name: "mainChallenge", readOnly: false },
          { label: "FEAR*", name: "fear", readOnly: false },
          {
            label: "PAYMENT DETAILS: SENDER'S FULL NAME*",
            name: "senderName",
            readOnly: false,
          },
          {
            label: "PAYMENT DETAILS: SENDER'S BANK NAME*",
            name: "bankName",
            readOnly: false,
          },
          { label: "YOUR BIRTHDAY DATE?", name: "birthday", readOnly: false },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-gray-700 block mb-2">{field.label}</label>
            <input
              type="text"
              name={field.name}
              //@ts-ignore
              value={formData[field.name]}
              onChange={handleInputChange}
              className={`w-full p-2 border border-gray-300 rounded mb-4 ${
                field.readOnly && "text-gray-400"
              }`}
              required
              readOnly={field.readOnly}
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

          <option value="THROUGH THE FREE TUTORIAL">
            THROUGH THE FREE TUTORIAL
          </option>

          <option value="THROUGH SOMEONE STATUS">THROUGH SOMEONE STATUS</option>

          <option value="THROUGH FACEBOOK">THROUGH FACEBOOK</option>

          <option value="THROUGH YOUTUBE">THROUGH YOUTUBE</option>

          <option value="THROUGH INSTAGRAM">THROUGH INSTAGRAM</option>

          <option value="THROUGH AN EX CT STUDENT">
            THROUGH AN EX CT STUDENT
          </option>

          <option value="THROUGH TIKTOK">THROUGH TIKTOK</option>
        </select>

        <div>
          <label className="text-gray-700 block mb-2">
            {" "}
            WHAT MADE YOU JOIN CT?*
          </label>
          <textarea
            name={"joinReason"}
            //@ts-ignore
            value={formData.joinReason}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
            placeholder="Your answer"
          />
        </div>

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

export default StudentInfoModal;
