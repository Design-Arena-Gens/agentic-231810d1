export default function Home() {
  const features = [
    { href: '/tasks', title: 'Tasks', desc: 'Plan assignments and track progress.' },
    { href: '/pomodoro', title: 'Pomodoro', desc: 'Focus timer with breaks to stay productive.' },
    { href: '/notes', title: 'Notes', desc: 'Quick notes synced to your browser.' },
    { href: '/gpa', title: 'GPA', desc: 'Calculate GPA based on courses.' },
    { href: '/schedule', title: 'Schedule', desc: 'Weekly planner to organize your time.' },
  ];

  return (
    <div>
      <section className="panel" style={{ marginBottom: 16 }}>
        <h1 style={{ marginTop: 0 }}>Welcome to Study Hub</h1>
        <p className="small">Lightweight, offline-friendly tools built for students.</p>
        <div style={{ marginTop: 8 }}>
          <span className="badge">No account needed</span>
          <span style={{ marginLeft: 8 }} className="badge">Works offline</span>
        </div>
      </section>

      <div className="grid">
        {features.map((f) => (
          <a key={f.href} className="card" href={f.href}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
