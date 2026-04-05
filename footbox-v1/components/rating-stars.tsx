"use client";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function RatingStars({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          className={`text-4xl transition ${star <= value ? "scale-105 text-green-400" : "text-zinc-700 hover:text-zinc-500"}`}
          aria-label={`Rate ${star}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
