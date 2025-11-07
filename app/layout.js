import './globals.css';

export const metadata = {
  title: 'Student Study Hub',
  description: 'All-in-one tools for students to plan, focus, and track progress.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <div className="container">
            <a className="brand" href="/">?? Study Hub</a>
            <nav className="nav">
              <a href="/tasks">Tasks</a>
              <a href="/pomodoro">Pomodoro</a>
              <a href="/notes">Notes</a>
              <a href="/gpa">GPA</a>
              <a href="/schedule">Schedule</a>
            </nav>
          </div>
        </header>
        <main className="container" style={{ paddingTop: 24 }}>{children}</main>
        <footer className="footer">
          <div className="container">? {new Date().getFullYear()} Study Hub</div>
        </footer>
      </body>
    </html>
  );
}
