import {
  MiniSelectTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSettings } from "@/hooks/useSettings";
import type { ChatMode } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { detectIsMac } from "@/hooks/useChatModeToggle";

export function ChatModeSelector() {
  const { settings, updateSettings } = useSettings();

  const selectedMode = settings?.selectedChatMode || "build";

  const handleModeChange = (value: string) => {
    updateSettings({ selectedChatMode: value as ChatMode });
  };

  const getModeDisplayName = (mode: ChatMode) => {
    switch (mode) {
      case "build":
        return "Build";
      case "ask":
        return "Ask";
      case "agent":
        return "Agent";
      default:
        return "Build";
    }
  };
  const isMac = detectIsMac();

  return (
    <Select value={selectedMode} onValueChange={handleModeChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <MiniSelectTrigger
            data-testid="chat-mode-selector"
            className={cn(
              "h-6 w-fit px-1.5 py-0 text-xs-sm font-medium shadow-none gap-0.5",
              selectedMode === "build"
                ? "bg-background hover:bg-muted/50 focus:bg-muted/50"
                : "bg-primary/10 hover:bg-primary/20 focus:bg-primary/20 text-primary border-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 dark:focus:bg-primary/30",
            )}
            size="sm"
          >
            <SelectValue>{getModeDisplayName(selectedMode)}</SelectValue>
          </MiniSelectTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col">
            <span>Open mode menu</span>
            <span className="text-xs text-gray-200 dark:text-gray-500">
              {isMac ? "⌘ + ." : "Ctrl + ."} to toggle
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
      <SelectContent align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
        <SelectItem value="build">
          <div className="flex flex-col items-start">
            <span className="font-medium">Build</span>
            <span className="text-xs text-muted-foreground">
              Generate and edit code
            </span>
          </div>
        </SelectItem>
        <SelectItem value="ask">
          <div className="flex flex-col items-start">
            <span className="font-medium">Ask</span>
            <span className="text-xs text-muted-foreground">
              Ask questions about the app
            </span>
          </div>
        </SelectItem>
        <SelectItem value="agent">
          <div className="flex flex-col items-start">
            <span className="font-medium">Agent (experimental)</span>
            <span className="text-xs text-muted-foreground">
              Agent can use tools (MCP) and generate code
            </span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
