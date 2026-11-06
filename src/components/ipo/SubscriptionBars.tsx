import { IpoSubscription } from "@/lib/types";
import { formatSubscription } from "@/lib/format";
import { Progress } from "@/components/ui/Progress";

interface SubscriptionBarsProps {
  subscription: IpoSubscription;
}

export function SubscriptionBars({ subscription }: SubscriptionBarsProps) {
  const categories = [
    { label: "Qualified Institutional (QIB)", value: subscription.qib, color: "bg-purple-400" },
    { label: "Non-Institutional (NII / HNI)", value: subscription.nii, color: "bg-blue-400" },
    { label: "Retail Individual (RII)", value: subscription.retail, color: "bg-accent" },
  ];

  return (
    <div className="space-y-4">
      {/* Total Box */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-card2 border border-line">
        <span className="font-heading font-bold text-sm text-tx">
          Total Subscription Demand
        </span>
        <span className="text-xl font-heading font-extrabold text-accent tabular-nums">
          {formatSubscription(subscription.total)}
        </span>
      </div>

      {/* Individual Bars */}
      <div className="space-y-3 pt-1">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-mut font-medium">{cat.label}</span>
              <span className="text-tx font-bold tabular-nums">
                {formatSubscription(cat.value)}
              </span>
            </div>
            <Progress
              value={cat.value}
              max={40}
              indicatorClassName={cat.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
