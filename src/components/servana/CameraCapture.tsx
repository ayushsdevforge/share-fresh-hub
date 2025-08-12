import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CameraCapture({ onCapture }: { onCapture: (dataUrl: string) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (e) {
        setError("Camera permission denied or unsupported. Please enable camera access.");
      }
    })();
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    onCapture(dataUrl);
  };

  return (
    <div className="space-y-3">
      {error ? (
        <p className="text-destructive text-sm" role="alert">{error}</p>
      ) : (
        <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
          <video ref={videoRef} playsInline muted className="h-full w-full object-cover" aria-label="Live camera preview" />
        </div>
      )}
      <div className="flex gap-2">
        <Button onClick={handleCapture} aria-label="Capture live photo">Take photo</Button>
      </div>
      <p className="text-xs text-muted-foreground">For safety, gallery uploads are disabled. Only live captures are permitted.</p>
    </div>
  );
}
