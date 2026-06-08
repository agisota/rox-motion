/**
 * STATE-FIRST KIT — AgentRunHeader
 *
 * Terminal/agent topbar showing the current transition + runtime + monad
 * sufficiency + trace + validator. Styling from components.css (.sf-runhead).
 *
 * Usage:
 *   <AgentRunHeader
 *     transition="T2 · implement fix"
 *     runtime={["repo", "shell"]}
 *     monadSufficiency={{ complete: 8, total: 10 }}
 *     traceStatus="recording" validatorStatus="not run" />
 */

interface AgentRunHeaderProps {
  transition: string;
  runtime: string[];
  monadSufficiency: { complete: number; total: number };
  traceStatus: string;
  validatorStatus: string;
}

export function AgentRunHeader({
  transition,
  runtime,
  monadSufficiency,
  traceStatus,
  validatorStatus,
}: AgentRunHeaderProps) {
  const sufficient = monadSufficiency.complete >= monadSufficiency.total;
  return (
    <div className="sf-runhead">
      <div className="sf-runhead__top">
        <div className="sf-runhead__dots">
          {["#CC5F57", "#DFB36A", "#57A95A"].map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
        </div>
        <div className="sf-runhead__title">
          <span className="sf-tr">{transition}</span>
        </div>
      </div>
      <div className="sf-runhead__stats">
        <Stat k="runtime" v={runtime.join(" + ")} cls="sf-rt" />
        <Stat
          k="monad"
          v={`${monadSufficiency.complete}/${monadSufficiency.total} sufficient`}
          cls={sufficient ? "sf-ok" : "sf-warn"}
        />
        <Stat k="trace" v={traceStatus} cls="sf-tr" />
        <Stat k="validator" v={validatorStatus} />
      </div>
    </div>
  );
}

function Stat({ k, v, cls }: { k: string; v: string; cls?: string }) {
  return (
    <div className="sf-rstat">
      <span className="sf-k">{k} · </span>
      <span className={`sf-v ${cls ?? ""}`}>{v}</span>
    </div>
  );
}
