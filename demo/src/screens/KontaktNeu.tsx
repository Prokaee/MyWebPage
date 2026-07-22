import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store/AppStore";
import { makeId } from "../data/seed";
import type { KontaktTyp } from "../types";
import BackHeader from "../components/BackHeader";

export default function KontaktNeu() {
  const navigate = useNavigate();
  const { addKontakt } = useApp();
  const [name, setName] = useState("");
  const [typ, setTyp] = useState<KontaktTyp>("Kunde");
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");

  const save = () => {
    if (!name.trim()) return;
    addKontakt({ id: makeId(), name: name.trim(), typ, uid: uid.trim() || undefined, email: email.trim() || undefined });
    navigate("/kontakte", { replace: true });
  };

  return (
    <div className="screen">
      <BackHeader title="Neuer Kontakt" to="/kontakte" />

      <div className="tabs" style={{ marginBottom: "var(--space-5)" }}>
        {(["Kunde", "Lieferant"] as KontaktTyp[]).map((t) => (
          <button key={t} className={"tab" + (typ === t ? " is-active" : "")} onClick={() => setTyp(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="form-row">
        <label className="input-label">Name *</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Firmen-/Kontaktname" autoFocus />
      </div>
      <div className="form-row">
        <label className="input-label">UID (optional)</label>
        <input className="input" value={uid} onChange={(e) => setUid(e.target.value)} placeholder="ATU…" />
      </div>
      <div className="form-row">
        <label className="input-label">E-Mail (optional)</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="office@…" />
      </div>

      <button className="btn btn--primary mt-4" disabled={!name.trim()} onClick={save}>
        Kontakt speichern
      </button>
    </div>
  );
}
