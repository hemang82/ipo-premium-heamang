import { IpoPeer } from "@/lib/types";

interface PeerTableProps {
  peers: IpoPeer[];
  currentCompanyName: string;
}

export function PeerTable({ peers, currentCompanyName }: PeerTableProps) {
  if (!peers || peers.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-line text-mut uppercase font-semibold text-xs">
            <th className="py-2.5 px-3">Company</th>
            <th className="py-2.5 px-3 text-right">P/E Ratio</th>
            <th className="py-2.5 px-3 text-right">RoE (%)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line/40">
          {peers.map((peer, idx) => (
            <tr key={idx} className="hover:bg-card2/50 transition-colors">
              <td className="py-2.5 px-3 font-semibold text-tx">
                {peer.name}
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums text-mut font-medium">
                {peer.pe.toFixed(1)}x
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums text-mut font-medium">
                {peer.roe.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
