import { NavLink } from "react-router-dom";
import {
  IconHome,
  IconBank,
  IconReceipt,
  IconInvoice,
  IconContacts,
} from "./icons";

const ITEMS = [
  { to: "/", label: "Home", Icon: IconHome, end: true },
  { to: "/bank", label: "Bank", Icon: IconBank, end: false },
  { to: "/ausgaben", label: "Ausgaben", Icon: IconReceipt, end: false },
  { to: "/rechnungen", label: "Rechnungen", Icon: IconInvoice, end: false },
  { to: "/kontakte", label: "Kontakte", Icon: IconContacts, end: false },
];

export default function BottomNav() {
  return (
    <nav className="bottomnav">
      {ITEMS.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            "bottomnav__item" + (isActive ? " is-active" : "")
          }
        >
          <Icon size={24} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
