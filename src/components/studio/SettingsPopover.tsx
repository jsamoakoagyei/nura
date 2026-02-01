import { Settings, Volume2, VolumeX, Vibrate } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFeedbackSettings } from "@/hooks/useFeedbackSettings";
import { feedbackTap } from "@/lib/feedback";

export function SettingsPopover() {
  const {
    soundEnabled,
    hapticEnabled,
    setSoundEnabled,
    setHapticEnabled,
  } = useFeedbackSettings();

  const handleSoundToggle = (checked: boolean) => {
    setSoundEnabled(checked);
    // Play a test sound when enabling
    if (checked) {
      feedbackTap();
    }
  };

  const handleHapticToggle = (checked: boolean) => {
    setHapticEnabled(checked);
    // Trigger test haptic when enabling
    if (checked) {
      feedbackTap();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-medium text-sm">Feedback Settings</h4>
            <p className="text-xs text-muted-foreground">
              Control sound and haptic feedback
            </p>
          </div>

          <div className="space-y-3">
            {/* Sound Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                )}
                <Label htmlFor="sound-toggle" className="text-sm cursor-pointer">
                  Sound effects
                </Label>
              </div>
              <Switch
                id="sound-toggle"
                checked={soundEnabled}
                onCheckedChange={handleSoundToggle}
              />
            </div>

            {/* Haptic Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vibrate className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="haptic-toggle" className="text-sm cursor-pointer">
                  Haptic feedback
                </Label>
              </div>
              <Switch
                id="haptic-toggle"
                checked={hapticEnabled}
                onCheckedChange={handleHapticToggle}
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground pt-2 border-t">
            Haptic feedback works on supported mobile devices
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
