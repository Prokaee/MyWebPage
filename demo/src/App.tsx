import { Outlet, Route, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Dashboard from "./screens/Dashboard";
import Ausgaben from "./screens/Ausgaben";
import BelegDetail from "./screens/BelegDetail";
import Rechnungen from "./screens/Rechnungen";
import NeueRechnung from "./screens/NeueRechnung";
import RechnungVorschau from "./screens/RechnungVorschau";
import Bank from "./screens/Bank";
import Kontakte from "./screens/Kontakte";
import KontaktNeu from "./screens/KontaktNeu";
import Capture from "./screens/scan/Capture";
import Recognizing from "./screens/scan/Recognizing";
import ReviewExtraction from "./screens/scan/ReviewExtraction";
import ConfirmBooking from "./screens/scan/ConfirmBooking";
import BookingDone from "./screens/scan/BookingDone";

/** Layout mit Bottom-Navigation (die 5 Haupt-Tabs). */
function TabLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}

export default function App() {
  return (
    <div className="phone">
      <Routes>
        <Route element={<TabLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="ausgaben" element={<Ausgaben />} />
          <Route path="rechnungen" element={<Rechnungen />} />
          <Route path="bank" element={<Bank />} />
          <Route path="kontakte" element={<Kontakte />} />
        </Route>

        {/* Vollbild-Screens ohne Bottom-Nav */}
        <Route path="ausgaben/:id" element={<BelegDetail />} />
        <Route path="rechnungen/neu" element={<NeueRechnung />} />
        <Route path="rechnungen/:id" element={<RechnungVorschau />} />
        <Route path="kontakte/neu" element={<KontaktNeu />} />
        <Route path="scan" element={<Capture />} />
        <Route path="scan/erkennung" element={<Recognizing />} />
        <Route path="scan/pruefen" element={<ReviewExtraction />} />
        <Route path="scan/kontierung" element={<ConfirmBooking />} />
        <Route path="scan/fertig" element={<BookingDone />} />
      </Routes>
    </div>
  );
}
