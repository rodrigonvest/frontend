import { Card, PreviewBadge } from "./UI";

export default function FeatureCard({ title, description, status = "Em breve" }: { title: string; description: string; status?: string }) {
  return (
    <Card className="flex flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold text-fg">{title}</h2>
        <PreviewBadge label={status} />
      </div>
      <p className="mt-2 text-[13px] leading-6 text-fg-muted">{description}</p>
    </Card>
  );
}

export function FeatureGrid({ items }: { items: Array<{ title: string; description: string; status?: string }> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <FeatureCard key={item.title} {...item} />
      ))}
    </div>
  );
}
