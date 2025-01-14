import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userReducer";
import { examsApiSlice } from "../../../services/api/examsSlice";
import { ctApiSlice } from "../../../services/api/ctSlice";
import { toast } from "react-toastify";

const StudentInfoModal = ({ close, next }: any) => {
  const [formData, setFormData] = useState<any>({
    email: "",
    surname: "",
    first_name: "",
    other_name: "",
    gender: "",
    telegram_phone: "",
    whatsapp_number: "",
    parent_name: "",
    parent_phone: "",
    desired_course: "",
    institution: "",
    subject_combination: "",
    weak_subject: "",
    main_challenge: "",
    fear: "",
    payment_date: "",
    sender_name: "",
    bank_name: "",
    referral_source: "",
    reason_for_joining: "",
    birthday: "",
    receipt_files: [],
  });

  const [errors, setErrors] = useState<any>({});

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
        first_name: firstname,
        surname: lastname,
        email: user.email,
        subject_combination: subjects?.map((s: any) => s.name).join(", "),
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

  const [saveProfile] = ctApiSlice.useSaveProfileMutation();

  const validatePhoneNumber = (phone: string) => {
    // Basic phone number validation (ensure it's a number and has at least 10 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validation checks
    const newErrors: any = {};
    const requiredFields = [
      "surname",
      "first_name",
      "other_name",
      "gender",
      "telegram_phone",
      "whatsapp_number",
      "parent_name",
      "parent_phone",
      "desired_course",
      "institution",
      "weak_subject",
      "main_challenge",
      "fear",
      "payment_date",
      "sender_name",
      "bank_name",
      "referral_source",
      "reason_for_joining",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    // Phone number validation for telegram and whatsapp numbers
    if (formData.telegram_phone && !validatePhoneNumber(formData.telegram_phone)) {
      newErrors.telegram_phone = "Please enter a valid phone number (10-15 digits).";
    }
    if (formData.whatsapp_number && !validatePhoneNumber(formData.whatsapp_number)) {
      newErrors.whatsapp_number = "Please enter a valid phone number (10-15 digits).";
    }

    console.log(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // stop form submission if there are errors
    }

    try {
      const response = await saveProfile(formData as any);
      if (!response.data.error) {
        toast.success(response.data.message);
        close();
        next();
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while submitting the form.");
    }
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
        <label className="text-gray-700 block mb-0">Email*</label>
        <input
          type="email"
          name="email"
          readOnly
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border text-gray-400 border-gray-300 rounded mb-4"
        />
        {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

        {/* Surname */}
        <label className="text-gray-700 block mb-0">SURNAME*</label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.surname && <p className="text-red-500 text-sm mb-4">{errors.surname}</p>}

        {/* First Name */}
        <label className="text-gray-700 block mb-0">FIRST NAME*</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.first_name && <p className="text-red-500 text-sm mb-4">{errors.first_name}</p>}

        {/* Other Name */}
        <label className="text-gray-700 block mb-0">OTHER NAME*</label>
        <input
          type="text"
          name="other_name"
          value={formData.other_name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.other_name && <p className="text-red-500 text-sm mb-4">{errors.other_name}</p>}

        {/* Gender */}
        <label className="text-gray-700 block mb-0">GENDER*</label>
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="MALE"
              onChange={handleInputChange}
            />
            MALE
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              onChange={handleInputChange}
            />
            FEMALE
          </label>
        </div>
        {errors.gender && <p className="text-red-500 text-sm mb-4">{errors.gender}</p>}

        {/* Subject Combination */}
        <label className="text-gray-700 block mb-0">SUBJECT COMBINATION*</label>
        <input
          type="text"
          name="subject_combination"
          value={formData.subject_combination}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-400"
          readOnly
        />
        {errors.subject_combination && <p className="text-red-500 text-sm mb-4">{errors.subject_combination}</p>}

        {/* Weak Subject */}
        <label className="text-gray-700 block mb-0">WEAK SUBJECT?*</label>
        <select
          name="weak_subject"
          value={formData.weak_subject}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select an option</option>
          {subjects?.map((s: any) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.weak_subject && <p className="text-red-500 text-sm mb-4">{errors.weak_subject}</p>}

        {/* Phone Number Fields */}
        <div>
          <label className="text-gray-700 block mb-0">TELEGRAM PHONE NUMBER*</label>
          <input
            type="text"
            name="telegram_phone"
            value={formData.telegram_phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          {errors.telegram_phone && <p className="text-red-500 text-sm mb-4">{errors.telegram_phone}</p>}
        </div>

        <div>
          <label className="text-gray-700 block mb-0">WHATSAPP NUMBER*</label>
          <input
            type="text"
            name="whatsapp_number"
            value={formData.whatsapp_number}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          {errors.whatsapp_number && <p className="text-red-500 text-sm mb-4">{errors.whatsapp_number}</p>}
        </div>
        {/* Parent Name */}
        <label className="text-gray-700 block mb-0">PARENT/GUARDIAN NAME*</label>
        <input
          type="text"
          name="parent_name"
          value={formData.parent_name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.parent_name && <p className="text-red-500 text-sm mb-4">{errors.parent_name}</p>}

        {/* Parent Phone */}
        <label className="text-gray-700 block mb-0">PARENT/GUARDIAN ACTIVE NO*</label>
        <input
          type="text"
          name="parent_phone"
          value={formData.parent_phone}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.parent_phone && <p className="text-red-500 text-sm mb-4">{errors.parent_phone}</p>}

        {/* Desired Course */}
        <label className="text-gray-700 block mb-0">DESIRED COURSE*</label>
        <input
          type="text"
          name="desired_course"
          value={formData.desired_course}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.desired_course && <p className="text-red-500 text-sm mb-4">{errors.desired_course}</p>}

        {/* Institution */}
        <label className="text-gray-700 block mb-0">INSTITUTION/SCHOOL OF CHOICE*</label>
        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.institution && <p className="text-red-500 text-sm mb-4">{errors.institution}</p>}

        {/* Main Challenge */}
        <label className="text-gray-700 block mb-0">MAIN CHALLENGE*</label>
        <input
          type="text"
          name="main_challenge"
          value={formData.main_challenge}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.main_challenge && <p className="text-red-500 text-sm mb-4">{errors.main_challenge}</p>}

        {/* Fear */}
        <label className="text-gray-700 block mb-0">FEAR*</label>
        <input
          type="text"
          name="fear"
          value={formData.fear}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.fear && <p className="text-red-500 text-sm mb-4">{errors.fear}</p>}

        {/* Payment Date */}
        <label className="text-gray-700 block mb-0">DATE OF PAYMENT*</label>
        <input
          type="date"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.payment_date && <p className="text-red-500 text-sm mb-4">{errors.payment_date}</p>}


        {/* Payment Date */}
        <label className="text-gray-700 block mb-0">SENDER NAME*</label>
        <input
          type="text"
          name="sender_name"
          value={formData.sender_name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.sender_name && <p className="text-red-500 text-sm mb-4">{errors.sender_name}</p>}

        {/* Payment Date */}
        <label className="text-gray-700 block mb-0">BANK NAME*</label>
        <input
          type="text"
          name="bank_name"
          value={formData.bank_name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.bank_name && <p className="text-red-500 text-sm mb-4">{errors.bank_name}</p>}



        {/* Payment Receipt Upload */}
        <label className="text-gray-700 block mb-0">
          UPLOAD YOUR PAYMENT RECEIPT*
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={(e: any) => handleFileChange(e, "receipt_files")}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {errors.receipt_files && <p className="text-red-500 text-sm mb-4">{errors.receipt_files}</p>}

        {/* Referral Source */}
        <label className="text-gray-700 block mb-0">
          HOW DID YOU COME ACROSS CT?*
        </label>
        <select
          name="referral_source"
          value={formData.referral_source}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
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
        {errors.referral_source && <p className="text-red-500 text-sm mb-4">{errors.referral_source}</p>}

        {/* Reason for Joining */}
        <div>
          <label className="text-gray-700 block mb-0">
            WHAT MADE YOU JOIN CT?*
          </label>
          <textarea
            name={"reason_for_joining"}
            value={formData.reason_for_joining}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Your answer"
          />
          {errors.reason_for_joining && <p className="text-red-500 text-sm mb-4">{errors.reason_for_joining}</p>}
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