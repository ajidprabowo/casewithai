import { SessionScore } from '@/types';
import { getScoreColor } from '@/lib/utils';

interface ScoreCardProps {
  score: SessionScore;
}

const dimensions = [
  { key: 'structure', label: 'Structure' },
  { key: 'analysis', label: 'Analysis' },
  { key: 'communication', label: 'Communication' },
  { key: 'math', label: 'Math & Quant' },
] as const;

export default function ScoreCard({ score }: ScoreCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* Overall */}
      <div className="text-center mb-6 pb-6 border-b border-gray-100">
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Overall Score</div>
        <div className={`text-6xl font-bold font-display ${getScoreColor(score.overall)}`}>
          {Math.round(score.overall)}
        </div>
        <div className="text-sm text-gray-500 mt-1">out of 100</div>
      </div>

      {/* Dimensions */}
      <div className="space-y-4 mb-6">
        {dimensions.map(({ key, label }) => {
          const dim = score[key];
          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className={`text-sm font-bold ${getScoreColor(dim.score)}`}>
                  {Math.round(dim.score)}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-700"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{dim.feedback}</p>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-accent-light rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-700 leading-relaxed">{score.summary}</p>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">Strengths</div>
          <ul className="space-y-1">
            {score.strengths.map((s, i) => (
              <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">Improve</div>
          <ul className="space-y-1">
            {score.improvements.map((s, i) => (
              <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                <span className="text-orange-400 mt-0.5">→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
