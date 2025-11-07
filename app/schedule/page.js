'use client';
import { useLocalStorage } from '../../lib/useLocalStorage';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function SchedulePage() {
  const [cells, setCells] = useLocalStorage('schedule:v1', Array.from({ length: 7 }, () => Array.from({ length: 8 }, () => '')));

  const update = (d, h, v) => {
    const next = cells.map(row => row.slice());
    next[d][h] = v;
    setCells(next);
  };

  return (
    <div>
      <h1>Weekly Schedule</h1>
      <div className="panel" style={{ overflowX: 'auto' }}>
        <table className="table" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th>Day / Slot</th>
              {Array.from({ length: 8 }, (_, i) => <th key={i}>Slot {i+1}</th>)}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((d, di) => (
              <tr key={d}>
                <td style={{ whiteSpace: 'nowrap' }}>{d}</td>
                {Array.from({ length: 8 }, (_, hi) => (
                  <td key={hi}>
                    <input className="input" value={cells[di][hi]} onChange={e => update(di, hi, e.target.value)} placeholder="Class / Task" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="small" style={{ marginTop: 8 }}>Tip: Use each slot for a class period or time block.</div>
      </div>
    </div>
  );
}
