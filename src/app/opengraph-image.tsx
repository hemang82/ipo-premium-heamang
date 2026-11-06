import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A1022",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          border: "8px solid #27345C",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "300px",
            top: "0px",
            background: "rgba(232, 180, 160, 0.15)",
            filter: "blur(90px)",
            borderRadius: "50%",
          }}
        />

        {/* Diamond Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#E8B4A0",
              transform: "rotate(45deg)",
              borderRadius: "8px",
            }}
          />
          <span
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#EEF1FA",
              letterSpacing: "-0.03em",
            }}
          >
            ipo<span style={{ color: "#E8B4A0" }}>-premium</span>
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: "#EEF1FA",
            marginBottom: "32px",
          }}
        >
          Know the premium before you apply
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              padding: "10px 22px",
              background: "rgba(74, 222, 128, 0.15)",
              color: "#4ADE80",
              borderRadius: "9999px",
              fontSize: "18px",
              fontWeight: 700,
              border: "1px solid rgba(74, 222, 128, 0.3)",
            }}
          >
            ● Live IPO GMP Today
          </div>
          <div
            style={{
              padding: "10px 22px",
              background: "rgba(232, 180, 160, 0.15)",
              color: "#E8B4A0",
              borderRadius: "9999px",
              fontSize: "18px",
              fontWeight: 700,
              border: "1px solid rgba(232, 180, 160, 0.3)",
            }}
          >
            Allotment Status Guide
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
