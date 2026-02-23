export default function GrainyBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#e9ecf1]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(74% 70% at 10% 42%, rgba(157, 172, 255, 0.3) 0%, rgba(157, 172, 255, 0) 72%),
            radial-gradient(62% 58% at 86% 90%, rgba(152, 171, 255, 0.26) 0%, rgba(152, 171, 255, 0) 76%),
            radial-gradient(68% 48% at 52% 44%, rgba(255, 255, 255, 0.84) 0%, rgba(255, 255, 255, 0.16) 60%, rgba(235, 239, 245, 0.08) 100%),
            linear-gradient(135deg, #dde1e7 0%, #f5f7fb 42%, #e7ebf2 100%)
          `,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/16 via-transparent to-[#dbe1ee]/18" />
    </div>
  );
}
