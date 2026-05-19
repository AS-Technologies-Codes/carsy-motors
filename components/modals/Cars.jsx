import CarTypes from "../common/CarTypes";
import AutoModal from "./Automodal";

export default function Page() {
  return (
    <main>
      {/* your page content */}
      <AutoModal>
        <CarTypes />
      </AutoModal>
    </main>
  );
}
