import { FaCopy } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { copyToClipboard } from "../../../utils/clipboard";
import { toast } from "react-toastify";
import { selectUser } from "../../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { networkApiSlice } from "../../../services/api/networkSlice";
import { PulseLoader } from "react-spinners";

const UserTable = ({ users }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">
              S/N
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user: any, index: number) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {new Date(user.created_at).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Referral() {
  const { user } = useSelector(selectUser);
  console.log(user);

  const link = `${import.meta.env.VITE_APP_HOME_URL}/signup?ref=${
    user?.referral_code || ""
  }`;
  const referralsData = networkApiSlice.useGetReferralsQuery();
  const referrals = referralsData?.data?.data;
  const isLoading = referralsData?.isLoading;

  const handleCopyClick = () => {
    copyToClipboard(link);
    toast.info("Copied to clipboard");
  };

  return (
    <div className="py-12">
      <h3 className="text-2xl lg:text-3xl text-gray-800 capitalize">
        Refer friends and earn rewards
      </h3>
      <div className="flex gap-x-3 text-gray-800">
        <div className="rounded-[16px] mt-5 mb-10 py-3 px-5 w-fit">
          <p>{link}</p>
        </div>
        <button
          onClick={handleCopyClick}
          className="rounded-[16px] active:scale-[0.95] active:ring bg-primary text-white ring-white duration-300 flex items-center gap-x-2 mt-5 mb-10 py-3 px-5 w-fit"
        >
          copy <FaCopy className="text-white" />
        </button>
      </div>
      <div className={`rounded-[16px] bg-white p-5  ${!referrals && "min-h-[20rem] flex items-center justify-center"}`}>
        {isLoading ? (
          <PulseLoader size={8} />
        ) : referrals?.length ? (
          <UserTable users={referrals} />
        ) : (
          <div className="flex flex-col items-center py-10">
            <FaTableList size={100} color="#e3e3e3" />
            <p className="text-gray-800 text-2xl">
              Your referals will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
