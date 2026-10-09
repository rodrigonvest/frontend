export default function ConnectionMap() {
  return (
    <svg viewBox="0 0 320 104" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa com a localização aproximada da conexão" className="size-full">
      <rect width="320" height="104" fill="#0c1b2a" />
      <path d="M0 70 70 52l60 14 70-24 60 16 60-10v56H0Z" fill="#12293a" />
      <path d="M0 18 50 8l40 20-30 22L0 44Z" fill="#102f2c" />
      <path d="M230 0h90v36l-50-8-30-14Z" fill="#102f2c" />
      <g stroke="#1d3a52" strokeWidth="1.2" fill="none">
        <path d="M0 40 110 58 200 38 320 62" />
        <path d="M60 0 110 58 100 104" />
        <path d="M200 0 200 38 230 104" />
        <path d="M0 88 90 78 160 96" />
        <path d="M250 0 280 50 320 44" />
      </g>
      <g stroke="#17324a" strokeWidth=".8" fill="none">
        <path d="M0 24h320M0 60h320M0 84h320M40 0v104M120 0v104M280 0v104" />
      </g>
      <g transform="translate(160 56)">
        <ellipse cx="0" cy="22" rx="7" ry="2.4" fill="#000" opacity=".35" />
        <path d="M0 22C-9 10-13 4-13-3a13 13 0 0 1 26 0c0 7-4 13-13 25Z" fill="#1b8cf0" />
        <circle cx="0" cy="-3" r="5" fill="#0c1b2a" />
      </g>
    </svg>
  );
}
