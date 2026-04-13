"use client";

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64Safe = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const raw = atob(base64Safe);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

function isVapidKeyMismatchError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return (
    msg.includes("applicationServerKey") ||
    msg.includes("gcm_sender_id") ||
    msg.includes("Registration failed")
  );
}

export async function subscribeToPush() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const reg = await navigator.serviceWorker.ready;
  const applicationServerKey = urlBase64ToUint8Array(
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
  );

  async function doSubscribe() {
    return reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
  }

  let subscription: PushSubscription;
  try {
    subscription = await doSubscribe();
  } catch (err) {
    if (!isVapidKeyMismatchError(err)) {
      throw err;
    }
    const existing = await reg.pushManager.getSubscription();
    if (existing) {
      await existing.unsubscribe();
    }
    subscription = await doSubscribe();
  }

  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.getKey("p256dh")
        ? btoa(
            String.fromCharCode(
              ...new Uint8Array(subscription.getKey("p256dh")!)
            )
          )
        : "",
      auth: subscription.getKey("auth")
        ? btoa(
            String.fromCharCode(...new Uint8Array(subscription.getKey("auth")!))
          )
        : "",
    },
  };
}
