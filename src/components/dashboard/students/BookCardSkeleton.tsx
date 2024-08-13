import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export const BookCardSkeleton = () => {
  return (
    <div>
      <Skeleton height="15rem" className="mb-3" />
      <Skeleton className="" count={2} />
    </div>
  );
}