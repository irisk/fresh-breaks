import ScreenShell from '@/components/ScreenShell';
import SubBar from '@/components/SubBar';
import PatternCard from '@/components/PatternCard';
import { exercises } from '@/data/breathing';

export default function BreathingPicker() {
  return (
    <ScreenShell>
      <SubBar eyebrow="Breathing" eyebrowDotColor="var(--fb-calm)" />

      <div className="animate-fade-in" style={{ marginTop: 22 }}>
        <h1
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 800,
            fontSize: 'var(--fb-size-h1)',
            lineHeight: 1.05,
            letterSpacing: 'var(--fb-track-tight)',
            color: 'var(--fb-text-1)',
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          {'Three patterns.\nPick one.'}
        </h1>
        <p
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 400,
            fontSize: 'var(--fb-size-body)',
            color: 'var(--fb-text-2)',
            lineHeight: 1.45,
            marginTop: 10,
            marginBottom: 0,
            maxWidth: 320,
          }}
        >
          Each ends on its own. No streak. No notification telling you to come back.
        </p>
      </div>

      <div
        className="animate-fade-in-d1"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginTop: 22,
        }}
      >
        {exercises.map((ex, i) => (
          <PatternCard key={ex.id} exercise={ex} featured={i === 0} />
        ))}
      </div>
    </ScreenShell>
  );
}
