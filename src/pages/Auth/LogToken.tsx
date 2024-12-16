import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeCirclesLoading } from "../../old-components/Ui/Loading";
import { storeLocalToken } from "../../services/helpers";
import { useAppDispatch } from "../../redux/store";
import { saveUser } from "../../redux/reducers/userReducer";
import { toast } from "react-toastify";
import { useLazyVerifyTokenQuery } from "../../services/api/authSlice";
import { FailureCheck } from "../../old-components/Ui/AlertCheck";
import { ScaleLoader } from "react-spinners";
import { ConfigureLibrary } from "@Praxeum-ai/LearnBlocks";

const LogToken = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [verify] = useLazyVerifyTokenQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const verifyToken = async (data: any) => {
    setIsBusy(true);
    await verify(data)
      .then((res: any) => {
        if (res.isSuccess) {
          // clear stuff first
          localStorage.removeItem("token");
          localStorage.removeItem("persist:rootpal");
          dispatch(
            saveUser({
              token: token,
              name: res.data.data.name,
              AccountId: res.data.data.id,
              account_type: res.data.data.account_type,
              email: res.data.data.email,
              phone: res.data.data.phone,
              schoolName: res.data.data.schoolName,
              studentClass: res.data.data.studentClass,
              studentClassArm: res.data.data.studentClassArm,
              status: res.data.data.status,
              term: res.data.data.term,
              subjectsCount: res.data.data.subjectsCount,
              referral_code: res.data.data.referral_code,
              flag: res.data.data.flag,
              verification_status: res.data.data.verification_status,
              school: res.data.data.schoolStudent,
              independent: res.data.data.student_type,
              metadata: res.data.data.metadata,
            })
          );
          if (token) {
            localStorage.setItem("token", token);
            ConfigureLibrary.save({
              baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
              authType: "student",
              token: token ? token : "",
            });
          }
          navigate("/student/dashboard");
        } else {
          toast.error(res.error.data.message);
          setIsBusy(false);
          setFailed(true);
        }
      })
      .catch((err) => {
        toast.error(err?.error?.data?.message);
        setIsBusy(false);
        setFailed(true);
      });
  };
  useEffect(() => {
    if (token) {
      verifyToken(token);
    } // eslint-disable-next-line
  }, [token]);
  return (
    <>
      <>
        <div className="h-screen flex justify-center items-center">
          <div className="">
            <div className="">
              {isBusy && (
                <div className="">
                  <div className="flex justify-center">
                    <ScaleLoader
                      height={30}
                      speedMultiplier={1.3}
                      color="#9c29b2"
                    />
                  </div>
                </div>
              )}
              {failed && (
                <div className="h-screen w-full fixed z-[1000000] bg-white inset-0 flex items-center justify-center flex-col">
                  <p className="text-2xl text-center fw-600">
                    Failed Login Attempt
                  </p>
                  <div className="mt-6 lg:mt-12">
                    <FailureCheck />
                  </div>
                  <div className="lg:w-5/12 mx-auto text-center">
                    <p className="text-center px-2 lg:px-0">
                      We're sorry, but it looks like your session token has
                      expired, please login to gain access to your dashboard.
                    </p>
                    <div className="lg:w-10/12 mt-8 mx-auto">
                      <a
                        href={`${import.meta.env.VITE_APP_HOME_URL}/login`}
                        className="btn-like"
                      >
                        Return to Login
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default LogToken;
