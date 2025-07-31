import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

export default function Spinner() {
  return (
    <div className="flex w-full justify-center py-3">
      <LineSpinner size="30" stroke="6" speed="1" color="gray" />
    </div>
  );
}
