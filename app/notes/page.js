'use client';
import { useLocalStorage } from '../../lib/useLocalStorage';

export default function NotesPage() {
  const [notes, setNotes] = useLocalStorage('notes:v1', '');

  return (
    <div>
      <h1>Notes</h1>
      <div className="panel">
        <textarea className="textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Write anything..." />
        <div className="small" style={{ marginTop: 8 }}>Autosaved to your browser.</div>
      </div>
    </div>
  );
}
