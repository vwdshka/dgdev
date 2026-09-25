// "/" only exists to send people to /en or /el, so it gets its own bare root layout.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#1c1512", color: "#f1e6d6", fontFamily: "ui-monospace, monospace" }}>
        {children}
      </body>
    </html>
  );
}
