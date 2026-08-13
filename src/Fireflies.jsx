export default function Fireflies({ count = 18 }) {
  const flies = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 6 + Math.random() * 6;
    const size = 3 + Math.random() * 3;

    return (
      <span
        key={i}
        className="firefly"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    );
  });

  return <div className="fireflies" aria-hidden="true">{flies}</div>;
}