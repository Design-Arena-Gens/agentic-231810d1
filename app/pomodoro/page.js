'use client';
import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';

const toMMSS = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

export default function PomodoroPage() {
  const [settings, setSettings] = useLocalStorage('pomodoro:settings', { focus: 25, short: 5, long: 15, cyclesBeforeLong: 4 });
  const [state, setState] = useLocalStorage('pomodoro:state', { mode: 'focus', secondsLeft: settings.focus * 60, cycle: 1, running: false });

  useEffect(() => {
    if (!state.running) return;
    const id = setInterval(() => setState(prev => ({ ...prev, secondsLeft: Math.max(0, prev.secondsLeft - 1) })), 1000);
    return () => clearInterval(id);
  }, [state.running, setState]);

  useEffect(() => {
    if (state.secondsLeft === 0) {
      nextPhase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.secondsLeft]);

  const durationFor = (mode) => ({ focus: settings.focus * 60, short: settings.short * 60, long: settings.long * 60 })[mode];

  const start = () => setState(prev => ({ ...prev, running: true }));
  const pause = () => setState(prev => ({ ...prev, running: false }));
  const reset = () => setState(prev => ({ ...prev, secondsLeft: durationFor(prev.mode), running: false }));

  const setMode = (mode) => setState(prev => ({ ...prev, mode, secondsLeft: durationFor(mode), running: false }));

  const nextPhase = () => {
    setState(prev => {
      if (prev.mode === 'focus') {
        const nextCycle = prev.cycle + 1;
        const useLong = nextCycle % settings.cyclesBeforeLong === 0;
        return { ...prev, mode: useLong ? 'long' : 'short', secondsLeft: durationFor(useLong ? 'long' : 'short'), running: false, cycle: nextCycle };
      }
      return { ...prev, mode: 'focus', secondsLeft: durationFor('focus'), running: false };
    });
  };

  const progress = useMemo(() => 1 - state.secondsLeft / durationFor(state.mode), [state.secondsLeft, state.mode]);

  return (
    <div>
      <h1>Pomodoro</h1>
      <div className="panel" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 56, fontWeight: 700 }}>{toMMSS(state.secondsLeft)}</div>
        <div className="small" style={{ marginBottom: 12 }}>{state.mode.toUpperCase()} {state.mode==='focus' ? `(cycle ${state.cycle})` : ''}</div>
        <div style={{ height: 8, background: '#1a2447', borderRadius: 999 }}>
          <div style={{ width: `${Math.round(progress * 100)}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', borderRadius: 999 }} />
        </div>
        <div className="row" style={{ justifyContent: 'center', marginTop: 12 }}>
          {!state.running ? <button className="btn" onClick={start}>Start</button> : <button className="btn secondary" onClick={pause}>Pause</button>}
          <button className="btn ghost" onClick={reset}>Reset</button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Settings</h3>
        <div className="row">
          <label style={{ minWidth: 140 }}>Focus (min)</label>
          <input className="input" type="number" min="1" value={settings.focus} onChange={e=> setSettings({ ...settings, focus: Number(e.target.value) }) } />
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <label style={{ minWidth: 140 }}>Short break (min)</label>
          <input className="input" type="number" min="1" value={settings.short} onChange={e=> setSettings({ ...settings, short: Number(e.target.value) }) } />
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <label style={{ minWidth: 140 }}>Long break (min)</label>
          <input className="input" type="number" min="1" value={settings.long} onChange={e=> setSettings({ ...settings, long: Number(e.target.value) }) } />
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <label style={{ minWidth: 140 }}>Cycles before long</label>
          <input className="input" type="number" min="1" value={settings.cyclesBeforeLong} onChange={e=> setSettings({ ...settings, cyclesBeforeLong: Number(e.target.value) }) } />
        </div>
      </div>
    </div>
  );
}
