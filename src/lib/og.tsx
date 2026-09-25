import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Link previews (LinkedIn, Slack, iMessage...), rendered to PNG at build time. The renderer needs
// real font files, not woff2, so these come from @fontsource; Greek and Latin are separate subsets.
export const size = { width: 1200, height: 630 };

const c = {
  bg: "#1c1512",
  line: "#3d2f27",
  ink: "#f1e6d6",
  muted: "#b8a490",
  accent: "#e8894a",
  ochre: "#d9a441",
};

async function fonts() {
  const file = (pkg: string, name: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", name));
  const faces = [
    ["Commissioner", "commissioner", 400],
    ["Commissioner", "commissioner", 700],
    ["JetBrains Mono", "jetbrains-mono", 400],
    ["JetBrains Mono", "jetbrains-mono", 700],
  ] as const;
  return Promise.all(
    faces.flatMap(([name, pkg, weight]) =>
      ["latin", "greek"].map(async (subset) => ({
        name,
        weight,
        style: "normal" as const,
        data: await file(pkg, `${pkg}-${subset}-${weight}-normal.woff`),
      })),
    ),
  );
}

function Frame({ label, children, left, right }: { label: string; children: React.ReactNode; left: string; right: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: c.bg,
        backgroundImage: `radial-gradient(circle at 88% 8%, rgba(232,137,74,0.22), transparent 45%), radial-gradient(circle at 5% 100%, rgba(217,164,65,0.12), transparent 40%)`,
        color: c.ink,
        fontFamily: "Commissioner",
      }}
    >
      <div style={{ display: "flex", flex: 1, flexDirection: "column", padding: "56px 72px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "JetBrains Mono", fontSize: 24 }}>
          <div style={{ display: "flex", fontWeight: 700 }}>
            dg<span style={{ color: c.accent }}>.</span>dev
          </div>
          <div style={{ display: "flex", color: c.muted }}>{label}</div>
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center" }}>{children}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px dashed ${c.line}`,
            padding: "24px 0 32px",
            fontFamily: "JetBrains Mono",
            fontSize: 22,
            color: c.muted,
          }}
        >
          <div style={{ display: "flex", color: c.ink }}>{left}</div>
          <div style={{ display: "flex" }}>{right}</div>
        </div>
      </div>
      <div style={{ display: "flex", height: 10, background: c.accent }} />
    </div>
  );
}

export async function homeImage({ role, place, label }: { role: string; place: string; label: string }) {
  return new ImageResponse(
    (
      <Frame
        label={label}
        left="TypeScript · React · Python · Java"
        right={place}
      >
        <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 28, color: c.muted }}>
          <span style={{ color: c.accent }}>~/kifissia</span>&nbsp;$ whoami
        </div>
        <div style={{ display: "flex", marginTop: 18, fontSize: 112, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1 }}>
          David Gavriilidis
        </div>
        <div style={{ display: "flex", marginTop: 28, fontFamily: "JetBrains Mono", fontSize: 30 }}>{role}</div>
      </Frame>
    ),
    { ...size, fonts: await fonts() },
  );
}

export async function caseImage({
  name,
  tagline,
  numbers,
  label,
}: {
  name: string;
  tagline: string;
  numbers: string[][];
  label: string;
}) {
  return new ImageResponse(
    (
      <Frame
        label={label}
        left="David Gavriilidis"
        right="github.com/vwdshka"
      >
        <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: name.length > 16 ? 64 : 88, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
          {name}
        </div>
        <div style={{ display: "flex", marginTop: 24, maxWidth: 1000, fontSize: 36, lineHeight: 1.3 }}>{tagline}</div>
        <div style={{ display: "flex", alignItems: "flex-start", marginTop: 40, gap: 56 }}>
          {numbers.slice(0, 3).map(([k, v]) => (
            <div key={k} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 36, fontWeight: 700, lineHeight: 1.2, color: c.ochre }}>{v}</div>
              <div style={{ display: "flex", marginTop: 6, fontFamily: "JetBrains Mono", fontSize: 20, color: c.muted }}>{k}</div>
            </div>
          ))}
        </div>
      </Frame>
    ),
    { ...size, fonts: await fonts() },
  );
}
