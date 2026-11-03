import { useNavigate } from 'react-router-dom';
import Icon, { type IconName } from './Icon';

interface CategoryCardProps {
  icon: IconName;
  /** Tailwind/CSS var name (without `var()`) of the accent color, e.g. "--fb-calm". */
  accent: string;
  /** Background CSS var, e.g. "--fb-calm-soft". */
  accentSoft: string;
  label: string;
  blurb: string;
  to: string;
}

/**
 * Home category card. 16px radius, color-soft fill, icon top-left in accent color,
 * label + blurb bottom-left, 124px min-height.
 */
export default function CategoryCard({
  icon,
  accent,
  accentSoft,
  label,
  blurb,
  to,
}: CategoryCardProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      style={{
        background: `var(${accentSoft})`,
        borderRadius: 'var(--fb-r-m)',
        border: 'none',
        padding: '14px 14px',
        minHeight: 124,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left',
        fontFamily: 'var(--fb-font-body)',
      }}
    >
      <div style={{ color: `var(${accent})` }}>
        <Icon name={icon} size={26} stroke={1.5} />
      </div>
      <div style={{ marginTop: 'auto' }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: 'var(--fb-text-1)',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 11,
            color: 'var(--fb-text-2)',
            lineHeight: 1.4,
            marginTop: 4,
          }}
        >
          {blurb}
        </div>
      </div>
    </button>
  );
}
