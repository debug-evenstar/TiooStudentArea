
import emptyImg from '../../../assets/images/empty-collection.svg';

export default function EmptyCollection({text=""}) {
  return (
    <div className="py-20 flex flex-col mx-auto text-gray-600 items-center justify-center">
      <img src={emptyImg} className="w-[8rem]" />
      <p>{text}</p>
    </div>
  );
}
