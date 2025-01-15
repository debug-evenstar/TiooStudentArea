import Nav, { SubNav } from "../../components/layouts/nav";
import { useEffect, useState } from "react";
import { studentPages } from "../../constants/sidelinks";
import { examsApiSlice } from "../../services/api/examsSlice";
import { dashboardApiSlice } from "../../services/api/dashboardSlice";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import StudentInfoModal from "../../components/dashboard/common/StudentInfoModal";
import ProfileImageModal from "../../components/dashboard/common/ProfileImageModal";
import WhatsAppPromptModal from "../../components/dashboard/common/WhatsapPrompt";

const perMonth = 8000;
const perDuration = 20000;

const BankTransferModal = ({ isOpen, onClose, amount, next, text }: any) => {
  if (!isOpen) return null;

  const handleClick = () => {
    next();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center urbanist bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-2">
          Pay with Bank Transfer
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Amount to be paid{" "}
          <span className="text-gray-900">₦{amount?.toLocaleString()}</span>
        </p>

        {/* Account Details */}
        <div className="bg-[#F4F4F4] rounded-lg p-4 px-8 mb-4 flex flex-col">
          <p className="text-sm text-gray-500 mb-2">
            <span className="">Bank Name:</span>
            <br />
            <span className="text-gray-800">Access Bank</span>
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <span className="">Account Name:</span>
            <br />
            <span className="text-gray-800">Ajayi Michael Ilemobayo</span>
          </p>
          <div className="text-sm text-gray-500 ">
            <span className="inline-block">Account Number:</span>
            <br />
            <div className="flex w-full items-center justify-between">
              <span className="text-gray-800">1522543372</span>
              <button
                className="ml-2 p-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
                onClick={() => {
                  navigator.clipboard.writeText("0098765446");
                  toast.info("copied");
                }}
              >
                <FaCopy />
              </button>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-900 text-center mb-4">
          Note: Kindly transfer the exact amount to the designated account
          <br className="hidden lg:block" />
          details
        </p>

        {/* Button */}
        <button
          className="w-full py-2 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 shadow-md"
          onClick={handleClick}
        >
          Payment made
        </button>
      </div>
    </div>
  );
};

const SummaryCard = ({ selectedSubjects, selectedBooks, target }: any) => {
  const totalCourses = selectedSubjects.length;
  // const totalBooks = selectedBooks.length;

  return (
    <div className="bg-white lg:rounded-[24px] shadow-lg p-6 ">
      <h2 className="text-lg font-semibold text-gray-700 mb-8">Summary</h2>
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Total Subjects</span>
          <span className="font-medium">{totalCourses}</span>
        </div>
        {/* <div className="flex justify-between">
          <span>Total Mock Exams</span>
          <span className="font-medium">{totalBooks}</span>
        </div> */}
        <div className="flex justify-between">
          <span>Price per Month</span>
          <span className="font-medium">₦ {perMonth.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Duration of tutorials(10 weeks)</span>
          <span className="font-medium">₦ {perDuration.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-8 border-t pt-4 flex justify-between text-gray-700">
        <span className="font-medium text-lg">Total</span>
        <span className="font-semibold text-lg">
          ₦ {(target == "monthly" ? perMonth : perDuration).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const TermsAndPayment = ({ isChecked, onCheckboxChange, onClick }: any) => {
  return (
    <div className="bg-white lg:rounded-[24px] shadow-lg p-6 text-center">
      <div className="flex items-center justify-center space-x-2 mb-4 text-gray-700">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={onCheckboxChange}
          className="w-5 h-5 accent-primary"
        />
        <label htmlFor="terms" className="text-sm">
          By clicking here I agree with all of your{" "}
          <span className="text-primary cursor-pointer">
            Terms & Conditions
          </span>
        </label>
      </div>
      <button
        disabled={!isChecked}
        onClick={onClick}
        className={`w-full py-3 rounded-full text-white font-medium ${
          isChecked
            ? "bg-primary hover:bg-primary-dark"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Proceed To Payment
      </button>
    </div>
  );
};

function SubjectSelection({
  selectedSubjects,
  setSelectedSubjects,
  selectedBooks,
  setSelectedBooks,
  target,
  setTarget,
}: any) {
  const [selectAll, setSelectAll] = useState(true);
  const [books, setBooks] = useState([]);

  const handleSubjectToggle = (subject: any) => {
    return;
    if (selectedSubjects.some((s: any) => s.id === subject.id)) {
      setSelectedSubjects((prev: any) =>
        prev.filter((s: any) => s.id !== subject.id)
      );
    } else {
      setSelectedSubjects((prev: any) => [...prev, subject]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(subjects);
    }
    setSelectAll(!selectAll);
  };

  const handleBookToggle = (id: any) => {
    if (selectedBooks.includes(id)) {
      setSelectedBooks((prev: any) => prev.filter((i: any) => i !== id));
    } else {
      setSelectedBooks((prev: any) => [...prev, id]);
    }
  };

  const accountExams = examsApiSlice.useGetAccountExamsQuery(null);

  const currentExam = accountExams?.data?.data.find((e: any) =>
    e.name.toLowerCase().includes("jamb")
  );
  const subjects: { id: number; name: string }[] =
    currentExam?.AccountExam.subjects ?? [];

  const { data, isLoading, refetch } =
    dashboardApiSlice.useGetLibraryBooksQuery(null);

  useEffect(() => {
    setBooks(
      data?.data?.filter(
        (book: any) => book.book_type?.toLowerCase() == "past questions"
      )
    );
  }, [data]);

  useEffect(() => {
    setSelectedSubjects(subjects);
    console.log(subjects, selectedSubjects);
  }, [subjects]);

  return (
    <div className="p-6 rounded-lg quicksand text-gray-700">
      <h2 className="text-lg font-semibold mb-4">
        These are the subjects you are subscribing to!
      </h2>
      <div className="flex items-center gap-6 mb-4">
        <label className="cursor-pointer">
          Monthly
          <input
            type="checkbox"
            checked={target == "monthly"}
            onChange={() => setTarget("monthly")}
            className="accent-primary ml-2"
          />
        </label>
        <label className="cursor-pointer">
          Duration (10weeks)
          <input
            type="checkbox"
            checked={target == "duration"}
            onChange={() => setTarget("duration")}
            className="accent-primary ml-2"
          />
        </label>
      </div>
      <div className="space-y-3">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className={`flex items-center justify-between border rounded-2xl px-4 py-2 cursor-pointer ${
              selectedSubjects.some((s: any) => s.id === subject.id)
                ? "border-primary"
                : "border-gray-300"
            }`}
            onClick={() => handleSubjectToggle(subject)}
          >
            <span>{subject.name}</span>
            <input
              type="radio"
              // checked={selectedSubjects.some((s: any) => s.id === subject.id)}
              checked={selectedSubjects.some((s: any) => s.id === subject.id)}
              readOnly
              className="accent-primary"
            />
          </div>
        ))}
      </div>
      {/* <div className="mt-6">
        <h3 className="font-semibold mb-3">Past Questions & Answers</h3>
        <div className="grid grid-cols-2 gap-4">
          {books?.map((book: any, index) => (
            <label
              key={index}
              className="flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBooks.includes(book.id)}
                onChange={() => handleBookToggle(book.id)}
                className="accent-primary"
              />
              {book.name}
            </label>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default function Subscription() {
  const [sideOpen, setSideOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<any>([]);
  const [selectedBooks, setSelectedBooks] = useState<any>([]);
  const [isChecked, setIsChecked] = useState(false);
  2;
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [total, setTotal] = useState(0);
  const [text, setText] = useState("");

  const [target, setTarget] = useState("monthly");

  const [formModal, setFormModal] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [whatsappModal, setWhatsappModal] = useState(false);

  useEffect(() => {
    const totalCourses = selectedSubjects.length;
    const totalBooks = selectedBooks.length;
    const total = totalCourses * 3500 + totalBooks * 1000;
    setTotal(total);

    setText("DOCUMENTATION");
  }, [selectedSubjects, selectedBooks]);

  const handleProceedToPayment = () => {
    if (isChecked) {
      setIsModalOpen(true); // Open the modal
    } else {
      toast.error("You need to agree to the terms and conditions.");
    }
  };

  const template = `https://api.whatsapp.com/send?phone=2347018481060&text=${encodeURIComponent(
    text
  )}`;

  const openWhatsapp = () => {
    const newTab = window.open(template, "_blank");
    newTab?.focus();
  };

  return (
    <div className="flex min-h-screen outfit-font bg-[#f9f7f3]">
      <main className="flex flex-col w-full">
        <Nav hasBack pages={studentPages} {...{ sideOpen, setSideOpen }} />
        <div className="px-0 lg:px-20 relative w-full pb-10">
          <p className="quicksand font-[600] text-[24px] py-7 text-center">
            Your free session is over
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 quicksand">
            <div className="bg-white h-full lg:rounded-[24px] shadow-lg py-5 px-3 lg:px-8">
              <SubjectSelection
                {...{
                  selectedSubjects,
                  setSelectedSubjects,
                  selectedBooks,
                  setSelectedBooks,
                  target,
                  setTarget,
                }}
              />
            </div>
            <div className="flex flex-col gap-8 h-full lg:rounded-[24px] lg:ml-28">
              <SummaryCard {...{ selectedSubjects, target, selectedBooks }} />
              <TermsAndPayment
                isChecked={isChecked}
                onClick={handleProceedToPayment}
                onCheckboxChange={() => setIsChecked(!isChecked)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <BankTransferModal
        isOpen={isModalOpen}
        text={text}
        next={() => setFormModal(true)}
        amount={target == "monthly" ? perMonth : perDuration}
        onClose={() => setIsModalOpen(false)} 
      />

      {formModal && (
        <StudentInfoModal
          next={() => setPhotoModal(true)}
          close={() => setFormModal(false)}
        />
      )}

      {
        <ProfileImageModal
          isOpen={photoModal}
          next={() => setWhatsappModal(true)}
          onClose={() => setPhotoModal(false)}
        />
      }

      {
        <WhatsAppPromptModal
          isOpen={whatsappModal}
          back={() => { setPhotoModal(true); setWhatsappModal(false)}}
          onWhatsAppClick={openWhatsapp}
          onClose={() => setWhatsappModal(false)}
        />
      }
    </div>
  );
}
