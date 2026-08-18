"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { funds, patients, type Fund } from "@/lib/data";
import "./board.css";

type FilterKey = "all" | "hot" | "warm" | "ok";

const TABS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hot", label: "Expiring" },
  { key: "warm", label: "Awaiting PA" },
  { key: "ok", label: "Ready to enroll" },
];

const PILL_CLASS: Record<string, string> = {
  copay: "pill p-copay",
  pap: "pill p-pap",
  ins: "pill p-ins",
  fund: "pill p-fund",
  none: "",
};

function showActionToast(label: string) {
  toast(`${label} — this would open the relevant portal or form in the full product.`);
}

function FundTile({
  fund,
  alertOn,
  onToggleAlert,
}: {
  fund: Fund;
  alertOn: boolean;
  onToggleAlert: () => void;
}) {
  return (
    <div className="fund">
      <div>
        <div className="fund-name">{fund.name}</div>
        <div className="fund-dx">{fund.diagnosis}</div>
      </div>
      <div className="fund-row">
        <span className={`status st-${fund.status === "waitlist" ? "wait" : fund.status}`}>
          {fund.status.toUpperCase()}
        </span>
        {fund.status === "closed" ? (
          <button
            className={`bell${alertOn ? " on" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleAlert();
            }}
          >
            {alertOn ? "notify on" : "notify me"}
          </button>
        ) : (
          <span className="fund-when">{fund.statusNote}</span>
        )}
      </div>
    </div>
  );
}

export default function NavigatorPage() {
  const [openId, setOpenId] = useState<string | null>("okafor");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [fundAlerts, setFundAlerts] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(funds.map((f) => [f.id, f.alertOn])),
  );

  const shown = filter === "all" ? patients : patients.filter((p) => p.flag === filter);
  const hotCount = patients.filter((p) => p.flag === "hot").length;
  const warmCount = patients.filter((p) => p.flag === "warm").length;

  return (
    <div className="board">
      <div className="demo-note">Sample data · fictional patients and medications · fund statuses shown are illustrative</div>

      <header className="topbar">
        <div className="wrap topbar-inner">
          <div className="mark">
            Access Board <span>/ Northside Rheumatology</span>
          </div>
          <div className="topbar-meta">
            <span>Mon 17 Aug · 8:42a</span>
            <span>M. Reyes, Financial Navigator</span>
          </div>
        </div>
      </header>

      <section className="monitor">
        <div className="wrap">
          <div className="monitor-head">
            <div className="monitor-title">Foundation fund monitor</div>
            <div className="monitor-sub">
              Checked 6 min ago · <b>2 changes since Friday</b>
            </div>
          </div>
          <div className="funds">
            {funds.map((fund) => (
              <FundTile
                key={fund.id}
                fund={fund}
                alertOn={fundAlerts[fund.id]}
                onToggleAlert={() =>
                  setFundAlerts((prev) => ({ ...prev, [fund.id]: !prev[fund.id] }))
                }
              />
            ))}
          </div>
        </div>
      </section>

      <main className="wrap">
        <div className="list-head">
          <div className="count">
            {shown.length} patients <em>{filter === "all" ? "need action today" : "in this view"}</em>
          </div>
          <div className="tabs" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className="tab"
                role="tab"
                aria-selected={filter === tab.key}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="thead">
          <div>Patient</div>
          <div>Medication</div>
          <div>Where it&apos;s stuck</div>
          <div>Best path</div>
          <div>Clock</div>
          <div></div>
        </div>

        <div className="rows">
          {shown.map((patient) => {
            const isOpen = openId === patient.id;
            const blockerFirst = patient.blockerOrder === "bold-first" ? patient.blockerBold : patient.blockerDetail;
            const blockerSecond = patient.blockerOrder === "bold-first" ? patient.blockerDetail : patient.blockerBold;

            return (
              <article className={`row${isOpen ? " open" : ""}`} data-flag={patient.flag} key={patient.id}>
                <div
                  className="row-main"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : patient.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenId(isOpen ? null : patient.id);
                    }
                  }}
                >
                  <div>
                    <div className="pt-name">{patient.name}</div>
                    <div className="pt-sub">
                      MRN {patient.mrn} · {patient.diagnosis}
                    </div>
                  </div>
                  <div>
                    <div className="drug">{patient.drug}</div>
                    <div className="drug-sub">{patient.drugDose}</div>
                  </div>
                  <div className="blocker">
                    {patient.blockerOrder === "bold-first" ? (
                      <>
                        <b>{blockerFirst}</b> {blockerSecond}
                      </>
                    ) : (
                      <>
                        {blockerFirst} <b>{blockerSecond}</b>
                      </>
                    )}
                  </div>
                  <div>
                    <div className="cost">{patient.pathCost}</div>
                    <div className="cost-sub">
                      {patient.pathLabel ? (
                        <span className={PILL_CLASS[patient.pathPillStyle]}>{patient.pathLabel}</span>
                      ) : (
                        patient.costSubLabel
                      )}
                    </div>
                  </div>
                  <div>
                    <div className={`clock ${patient.clockUrgency === "neutral" ? "" : patient.clockUrgency}`}>
                      {patient.clockLabel}
                    </div>
                    <div className="clock-sub">{patient.clockSub}</div>
                  </div>
                  <div>
                    <button
                      className={`go${patient.ctaStyle === "ghost" ? " ghost" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        showActionToast(patient.ctaLabel);
                      }}
                    >
                      {patient.ctaLabel}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="detail">
                    <div className="detail-head">{patient.detailNote}</div>

                    {patient.options.length > 0 && (
                      <div className="paths">
                        {patient.options.map((option) => (
                          <div className={`path${option.isBest ? " best" : ""}`} key={option.name}>
                            <div className="path-top">
                              <div className="path-name">{option.name}</div>
                              <div className="path-cost">{option.estimatedCost}</div>
                            </div>
                            <div className="path-meta">{option.timeToFill}</div>
                            <ul>
                              {option.pros.map((pro) => (
                                <li className="y" key={pro}>
                                  {pro}
                                </li>
                              ))}
                              {option.cons.map((con) => (
                                <li className="n" key={con}>
                                  {con}
                                </li>
                              ))}
                              {option.info?.map((info) => (
                                <li className="i" key={info}>
                                  {info}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={`why${patient.options.length === 0 ? " flush" : ""}`}>
                      <div className="why-body">
                        <div className="why-label">Recommended sequence</div>
                        <div className="why-text">{patient.recommendedSequence}</div>
                      </div>
                      <div className="why-actions">
                        {patient.actions.map((action) => (
                          <button
                            key={action.label}
                            className={`btn-sm${action.style === "solid" ? " solid" : ""}`}
                            onClick={() => showActionToast(action.label)}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Link href={`/patient/${patient.id}`} className="view-link">
                      View patient status →
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="foot">
          <span>
            {patients.length} open · {hotCount} expiring this week · {warmCount} awaiting plan response
          </span>
          <span>Last sync 8:36a</span>
        </div>
      </main>
    </div>
  );
}
