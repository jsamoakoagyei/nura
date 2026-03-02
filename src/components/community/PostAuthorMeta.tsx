import { User, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostAuthorMetaProps {
  isAnonymous: boolean;
  displayName?: string | null;
  createdAt: string;
  iconSize?: "sm" | "md";
}

export function PostAuthorMeta({
  isAnonymous,
  displayName,
  createdAt,
  iconSize = "sm",
}: PostAuthorMetaProps) {
  const iconClass = iconSize === "md" ? "w-4 h-4" : "w-3 h-3";

  return (
    <span className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
      <User className={iconClass} />
      <span>{isAnonymous ? "Anonymous" : displayName || "Member"}</span>
      <span>•</span>
      <Clock className="w-3 h-3" />
      <span>
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </span>
    </span>
  );
}
