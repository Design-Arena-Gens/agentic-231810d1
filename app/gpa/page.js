'use client';
import { useLocalStorage } from '../../lib/useLocalStorage';

const gradeToPoints = (g) => ({
  A+: 4.0, A: 4.0, A-: 3.7,
  'B+': 3.3, B: 3.0, 'B-': 2.7,
  'C+': 2.3, C: 2.0, 'C-': 1.7,
  'D+': 1.3, D: 1.0, F: 0
})[g] ?? 0;

const GRADES = ['A+','A','A-','B+','B','B-','C+','C','C-','D+','D','F'];

export default function GPAPage() {
  const [rows, setRows] = useLocalStorage('gpa:rows', [
    { id: 1, course: 'Math', credits: 3, grade: 'A' },
  ]);

  const add = () => setRows([{ id: Date.now(), course: '', credits: 3, grade: 'A' }, ...rows]);
  const remove = (id) => setRows(rows.filter(r => r.id !== id));
  const update = (id, patch) => setRows(rows.map(r => r.id === id ? { ...r, ...patch } : r));

  const totals = rows.reduce((acc, r) => {
    const pts = gradeToPoints(r.grade) * Number(r.credits || 0);
    return { quality: acc.quality + pts, credits: acc.credits + Number(r.credits || 0) };
  }, { quality: 0, credits: 0 });

  const gpa = totals.credits > 0 ? (totals.quality / totals.credits) : 0;

  return (
    <div>
      <h1>GPA Calculator</h1>
      <div className="panel">
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <button className="btn" onClick={add}>Add Course</button>
          <div><span className="badge">GPA: {gpa.toFixed(2)}</span></div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Credits</th>
              <th>Grade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={4} className="small">Add courses to calculate GPA.</td></tr>
            )}
            {rows.map(r => (
              <tr key={r.id}>
                <td>
                  <input className="input" value={r.course} onChange={e=> update(r.id, { course: e.target.value })} placeholder="Course name" />
                </td>
                <td style={{ width: 120 }}>
                  <input className="input" type="number" min="0" value={r.credits} onChange={e=> update(r.id, { credits: Number(e.target.value) })} />
                </td>
                <td style={{ width: 160 }}>
                  <select className="select" value={r.grade} onChange={e=> update(r.id, { grade: e.target.value })}>
                    {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </td>
                <td style={{ width: 80 }}>
                  <button className="btn secondary" onClick={() => remove(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
