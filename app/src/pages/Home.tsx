import ScreenShell from '@/components/ScreenShell';
import TopBar from '@/components/TopBar';
import ExpressBar from '@/components/ExpressBar';
import CategoryCard from '@/components/CategoryCard';
import { getGreeting } from '@/lib/utils';

const SOLO = [
  {
    icon: 'breathing' as const,
    accent: '--fb-calm',
    accentSoft: '--fb-calm-soft',
    label: 'Breathing',
    blurb: 'Slow it down, on cue.',
    to: '/breathing',
  },
  {
    icon: 'reflection' as const,
    accent: '--fb-reflection',
    accentSoft: '--fb-reflection-soft',
    label: 'Reflection',
    blurb: 'One small thing to notice.',
    to: '/reflection',
  },
  {
    icon: 'sound' as const,
    accent: '--fb-sound',
    accentSoft: '--fb-sound-soft',
    label: 'Sound Scape',
    blurb: 'Forty-five seconds of elsewhere.',
    to: '/sounds',
  },
  {
    icon: 'nature' as const,
    accent: '--fb-nature',
    accentSoft: '--fb-nature-soft',
    label: 'Nature & Animals',
    blurb: 'Look at something not on a screen.',
    to: '/video',
  },
];

const SOCIAL = [
  {
    icon: 'conversation' as const,
    accent: '--fb-sunglow',
    accentSoft: '--fb-sunglow-soft',
    label: 'Conversation Starter',
    blurb: 'Carry a question into the room.',
    to: '/conversation',
  },
  {
    icon: 'gratitude' as const,
    accent: '--fb-sunset',
    accentSoft: '--fb-sunset-soft',
    label: 'Gratitude Ripples',
    blurb: 'Send one short thanks.',
    to: '/gratitude',
  },
];

export default function Home() {
  return (
    <ScreenShell>
      <TopBar />

      <div style={{ marginTop: 22, marginBottom: 18 }} className="animate-fade-in">
        <h1
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 800,
            fontSize: 'var(--fb-size-hero)',
            lineHeight: 1.02,
            letterSpacing: 'var(--fb-track-tight)',
            color: 'var(--fb-text-1)',
            margin: 0,
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          {getGreeting()}, Iris
          <span
            aria-hidden
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--fb-sunglow)',
              display: 'inline-block',
              transform: 'translateY(-3px)',
            }}
          />
        </h1>
      </div>

      <div className="animate-fade-in-d1">
        <ExpressBar />
      </div>

      <Section label="By yourself" delay="d2">
        {SOLO.map((c) => (
          <CategoryCard key={c.label} {...c} />
        ))}
      </Section>

      <Section label="With someone" delay="d3">
        {SOCIAL.map((c) => (
          <CategoryCard key={c.label} {...c} />
        ))}
      </Section>
    </ScreenShell>
  );
}

function Section({
  label,
  delay,
  children,
}: {
  label: string;
  delay: 'd2' | 'd3';
  children: React.ReactNode;
}) {
  return (
    <div className={`animate-fade-in-${delay}`}>
      <div
        style={{
          marginTop: 26,
          marginBottom: 10,
          fontFamily: 'var(--fb-font-body)',
          fontWeight: 800,
          fontSize: 14,
          letterSpacing: '-0.015em',
          color: 'var(--fb-text-1)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
        }}
      >
        {children}
      </div>
    </div>
  );
}
