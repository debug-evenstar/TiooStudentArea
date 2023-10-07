import React, { FC, useState } from "react";
import Button from "../Ui/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  data: any;
}
const ChooseModule: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<any>();
  const handleSelectSubject = (item: any) => {
    setSelectedSubject(item.target.value);
  };
  const openLesson = (item: any) => {
    const selected = data.filter((where:any) => where.id === Number(item))
    if(!!selected[0]?.preview?.length){
      navigate(`/library/${item}`);
    } else toast.info('No available preview for this lesson')
    
  };
  return (
    <>
      <div className="pt-4">
        <div className="h-[250px] oveflow-y-auto">
          {data &&
            data.map((item: any) => (
              <div
                className="flex gap-x-2 mb-3 px-4 lg:px-5 py-3 rounded input-shade "
                key={item.id}
              >
                <input
                  type="radio"
                  name="class"
                  value={item.id}
                  className="w-6 h-6 mt-1"
                  onChange={handleSelectSubject}
                />
                <div>
                  <label className="block fw-600 mt-[1px] text-[17px] text-[#87909EBD]">
                    {item.topic}
                  </label>
                </div>
              </div>
            ))}
        </div>
        {data && !!data.length && (
          <div className="mt-10">
            <Button
              title={"View"}
              disabled={!selectedSubject}
              onClick={() => openLesson(selectedSubject)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChooseModule;
